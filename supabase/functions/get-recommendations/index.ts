import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from JWT
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: user } = await supabaseClient.auth.getUser(token);

    if (!user?.user) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: corsHeaders 
      });
    }

    const { cropType, locationState, locationDistrict, seasonType, sowingMonth, soilData } = await req.json();

    console.log('Recommendation request:', {
      cropType,
      locationState,
      locationDistrict,
      seasonType,
      sowingMonth,
      userId: user.user.id
    });

    // Get user's agro-climatic zone based on location
    const { data: regions } = await supabaseClient
      .from('regions')
      .select('*')
      .contains('states', [locationState]);

    const agroclimaticZone = regions?.[0]?.zone_code || 'TGP';

    // Get seed varieties based on criteria
    let query = supabaseClient
      .from('seed_varieties')
      .select(`
        *,
        seller_inventory(
          seller_id,
          price_per_kg,
          stock_quantity_kg,
          is_available,
          sellers(
            company_name,
            phone,
            whatsapp_number,
            status,
            icar_verified,
            government_certified
          )
        )
      `)
      .eq('crop_type', cropType)
      .eq('season_type', seasonType)
      .eq('is_active', true)
      .contains('suitable_regions', [agroclimaticZone])
      .order('yield_potential_kg_per_hectare', { ascending: false })
      .limit(5);

    // Apply soil type filter if provided
    if (soilData?.soil_type) {
      query = query.contains('suitable_soil_types', [soilData.soil_type]);
    }

    const { data: seedVarieties, error: varietiesError } = await query;

    if (varietiesError) {
      console.error('Error fetching seed varieties:', varietiesError);
      return new Response('Error fetching recommendations', { 
        status: 500,
        headers: corsHeaders 
      });
    }

    // Calculate recommendation scores based on multiple factors
    const scoredRecommendations = seedVarieties?.map(variety => {
      let score = 0;
      
      // Base score from yield potential (normalized to 0-40 points)
      score += (variety.yield_potential_kg_per_hectare / 6000) * 40;
      
      // Germination percentage (0-20 points)
      score += (variety.germination_percentage / 100) * 20;
      
      // Drought tolerance bonus (10 points)
      if (variety.drought_tolerance) score += 10;
      
      // Heat tolerance bonus (5 points)
      if (variety.heat_tolerance) score += 5;
      
      // ICAR certification bonus (10 points)
      if (variety.certification_type === 'icar_approved') score += 10;
      
      // Availability bonus (10 points if available from verified sellers)
      const hasVerifiedSellers = variety.seller_inventory?.some((inv: any) => 
        inv.is_available && 
        inv.sellers?.status === 'active' && 
        (inv.sellers?.icar_verified || inv.sellers?.government_certified)
      );
      if (hasVerifiedSellers) score += 10;
      
      // Disease resistance bonus (5 points)
      if (variety.disease_resistance?.length > 0) score += 5;

      return {
        ...variety,
        recommendation_score: Math.min(100, Math.round(score))
      };
    }).sort((a, b) => b.recommendation_score - a.recommendation_score) || [];

    // Store the recommendation in database for future reference
    const recommendedVarietyIds = scoredRecommendations.slice(0, 3).map(v => v.id);
    
    const { data: recommendation } = await supabaseClient
      .from('recommendations')
      .insert({
        user_id: user.user.id,
        crop_type: cropType,
        season_type: seasonType,
        sowing_month: sowingMonth,
        location_state: locationState,
        location_district: locationDistrict,
        recommended_varieties: recommendedVarietyIds,
        soil_data: soilData,
        recommendation_score: scoredRecommendations[0]?.recommendation_score || 0
      })
      .select()
      .single();

    console.log('Generated recommendations:', {
      count: scoredRecommendations.length,
      topScore: scoredRecommendations[0]?.recommendation_score,
      recommendationId: recommendation?.id
    });

    return new Response(
      JSON.stringify({
        recommendations: scoredRecommendations.slice(0, 3),
        agroclimatic_zone: agroclimaticZone,
        recommendation_id: recommendation?.id,
        total_varieties_found: seedVarieties?.length || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in get-recommendations function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});