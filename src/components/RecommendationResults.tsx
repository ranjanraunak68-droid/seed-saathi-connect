import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Star, Shield, Droplets, TrendingUp, Phone, MessageCircle, MapPin } from "lucide-react";
import seedsGrid from "@/assets/seeds-grid.jpg";

interface Seller {
  company_name: string;
  phone: string;
  whatsapp_number?: string;
  status: string;
  icar_verified: boolean;
  government_certified: boolean;
}

interface SellerInventory {
  seller_id: string;
  price_per_kg: number;
  stock_quantity_kg: number;
  is_available: boolean;
  sellers: Seller;
}

interface SeedVariety {
  id: string;
  variety_name: string;
  crop_type: string;
  developed_by: string;
  release_year: number;
  maturity_days: number;
  yield_potential_kg_per_hectare: number;
  germination_percentage: number;
  disease_resistance: string[];
  drought_tolerance: boolean;
  heat_tolerance: boolean;
  certification_type: string;
  description: string;
  special_features: string;
  market_price_per_kg: number;
  recommendation_score: number;
  seller_inventory: SellerInventory[];
}

interface RecommendationData {
  recommendations: SeedVariety[];
  agroclimatic_zone: string;
  recommendation_id: string;
  total_varieties_found: number;
}

interface RecommendationResultsProps {
  data: RecommendationData;
}

const RecommendationResults = ({ data }: RecommendationResultsProps) => {
  const { recommendations, agroclimatic_zone, total_varieties_found } = data;

  const getCertificationBadge = (type: string) => {
    const badges: { [key: string]: { label: string; variant: "default" | "secondary" | "destructive" | "outline" } } = {
      icar_approved: { label: "ICAR Approved", variant: "default" },
      state_certified: { label: "State Certified", variant: "secondary" },
      truthfully_labeled: { label: "Truthfully Labeled", variant: "outline" }
    };
    return badges[type] || { label: type, variant: "outline" };
  };

  const handleContactSeller = (seller: Seller) => {
    if (seller.whatsapp_number) {
      window.open(`https://wa.me/91${seller.whatsapp_number}`, '_blank');
    } else if (seller.phone) {
      window.open(`tel:+91${seller.phone}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card className="shadow-card border-0 bg-gradient-feature">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Smart Recommendations Generated
              </h2>
              <p className="text-muted-foreground">
                Based on your location in <strong>{agroclimatic_zone}</strong> zone, 
                we found <strong>{total_varieties_found}</strong> suitable varieties. 
                Here are the top 3 recommendations:
              </p>
            </div>
            <div className="flex items-center">
              <Sprout className="h-12 w-12 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid gap-6">
        {recommendations.map((variety, index) => (
          <Card key={variety.id} className="shadow-card hover:shadow-glow transition-shadow border-0 bg-background">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="relative w-full lg:w-80 h-64 lg:h-auto">
                <img 
                  src={seedsGrid}
                  alt={variety.variety_name}
                  className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Badge className="bg-background/90 backdrop-blur text-foreground">
                    Rank #{index + 1}
                  </Badge>
                  <div className="bg-background/90 backdrop-blur px-2 py-1 rounded-full flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{variety.recommendation_score}%</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge {...getCertificationBadge(variety.certification_type)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getCertificationBadge(variety.certification_type).label}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {variety.variety_name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Developed by {variety.developed_by} • Released {variety.release_year}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expected Yield:</span>
                        <span className="text-sm font-medium">
                          {variety.yield_potential_kg_per_hectare} kg/hectare
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Maturity:</span>
                        <span className="text-sm font-medium">{variety.maturity_days} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Germination Rate:</span>
                        <span className="text-sm font-medium">{variety.germination_percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Market Price:</span>
                        <span className="text-sm font-medium text-primary">
                          ₹{variety.market_price_per_kg}/kg
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {variety.drought_tolerance && (
                          <Badge variant="secondary">
                            <Droplets className="h-3 w-3 mr-1" />
                            Drought Tolerant
                          </Badge>
                        )}
                        {variety.heat_tolerance && (
                          <Badge variant="secondary">
                            Heat Tolerant
                          </Badge>
                        )}
                        {variety.disease_resistance?.map((disease, i) => (
                          <Badge key={i} variant="outline">
                            {disease}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sellers and Action */}
                  <div>
                    <h4 className="font-semibold mb-3">Available from Verified Sellers</h4>
                    
                    {variety.seller_inventory?.length > 0 ? (
                      <div className="space-y-3">
                        {variety.seller_inventory.slice(0, 2).map((inventory, i) => (
                          <div key={i} className="p-3 bg-accent/30 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium text-sm">{inventory.sellers.company_name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {inventory.sellers.icar_verified && (
                                    <Badge variant="default" className="text-xs">ICAR Verified</Badge>
                                  )}
                                  {inventory.sellers.government_certified && (
                                    <Badge variant="secondary" className="text-xs">Govt. Certified</Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm font-medium text-primary">
                                ₹{inventory.price_per_kg}/kg
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleContactSeller(inventory.sellers)}
                                className="flex-1"
                              >
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </Button>
                              {inventory.sellers.whatsapp_number && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleContactSeller(inventory.sellers)}
                                  className="flex-1"
                                >
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  WhatsApp
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-accent/30 rounded-lg">
                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No sellers in your area yet. Check with local dealers or KVK centers.
                        </p>
                      </div>
                    )}

                    <div className="mt-4">
                      <Button className="w-full bg-gradient-hero hover:bg-primary-light">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Detailed Analysis
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {variety.description && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      {variety.description}
                    </p>
                    {variety.special_features && (
                      <p className="text-sm text-primary mt-2">
                        <strong>Special Features:</strong> {variety.special_features}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card border-0 bg-background">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Track Your Crop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with Plant Saathi for post-sowing monitoring and growth tracking
            </p>
            <Button variant="outline" className="w-full">
              Enable Crop Monitoring
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-background">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Share Your Experience</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help other farmers by sharing your results after harvest
            </p>
            <Button variant="outline" className="w-full">
              Rate & Review Later
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationResults;