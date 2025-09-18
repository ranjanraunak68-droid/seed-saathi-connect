export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      plant_saathi_integration: {
        Row: {
          created_at: string
          current_growth_stage: string | null
          expected_harvest_date: string | null
          germination_success_rate: number | null
          health_status: string | null
          id: string
          last_monitored_at: string | null
          monitoring_data: Json | null
          plant_saathi_crop_id: string | null
          seed_variety_id: string
          sowing_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_growth_stage?: string | null
          expected_harvest_date?: string | null
          germination_success_rate?: number | null
          health_status?: string | null
          id?: string
          last_monitored_at?: string | null
          monitoring_data?: Json | null
          plant_saathi_crop_id?: string | null
          seed_variety_id: string
          sowing_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_growth_stage?: string | null
          expected_harvest_date?: string | null
          germination_success_rate?: number | null
          health_status?: string | null
          id?: string
          last_monitored_at?: string | null
          monitoring_data?: Json | null
          plant_saathi_crop_id?: string | null
          seed_variety_id?: string
          sowing_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_saathi_integration_seed_variety_id_fkey"
            columns: ["seed_variety_id"]
            isOneToOne: false
            referencedRelation: "seed_varieties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          farm_size_acres: number | null
          full_name: string
          id: string
          latitude: number | null
          location_district: string | null
          location_state: string | null
          location_village: string | null
          longitude: number | null
          nitrogen_kg_per_hectare: number | null
          organic_carbon: number | null
          phone: string | null
          phosphorus_kg_per_hectare: number | null
          potassium_kg_per_hectare: number | null
          soil_ph: number | null
          soil_type: Database["public"]["Enums"]["soil_type"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          farm_size_acres?: number | null
          full_name: string
          id?: string
          latitude?: number | null
          location_district?: string | null
          location_state?: string | null
          location_village?: string | null
          longitude?: number | null
          nitrogen_kg_per_hectare?: number | null
          organic_carbon?: number | null
          phone?: string | null
          phosphorus_kg_per_hectare?: number | null
          potassium_kg_per_hectare?: number | null
          soil_ph?: number | null
          soil_type?: Database["public"]["Enums"]["soil_type"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          farm_size_acres?: number | null
          full_name?: string
          id?: string
          latitude?: number | null
          location_district?: string | null
          location_state?: string | null
          location_village?: string | null
          longitude?: number | null
          nitrogen_kg_per_hectare?: number | null
          organic_carbon?: number | null
          phone?: string | null
          phosphorus_kg_per_hectare?: number | null
          potassium_kg_per_hectare?: number | null
          soil_ph?: number | null
          soil_type?: Database["public"]["Enums"]["soil_type"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          id: string
          location_district: string
          location_state: string
          recommendation_score: number | null
          recommended_varieties: string[]
          season_type: Database["public"]["Enums"]["season_type"]
          soil_data: Json | null
          sowing_month: number
          user_id: string
          weather_data: Json | null
        }
        Insert: {
          created_at?: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          id?: string
          location_district: string
          location_state: string
          recommendation_score?: number | null
          recommended_varieties: string[]
          season_type: Database["public"]["Enums"]["season_type"]
          soil_data?: Json | null
          sowing_month: number
          user_id: string
          weather_data?: Json | null
        }
        Update: {
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"]
          id?: string
          location_district?: string
          location_state?: string
          recommendation_score?: number | null
          recommended_varieties?: string[]
          season_type?: Database["public"]["Enums"]["season_type"]
          soil_data?: Json | null
          sowing_month?: number
          user_id?: string
          weather_data?: Json | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          created_at: string
          id: string
          rainfall_mm_max: number | null
          rainfall_mm_min: number | null
          states: string[]
          suitable_crops: Database["public"]["Enums"]["crop_type"][]
          temperature_max_c: number | null
          temperature_min_c: number | null
          zone_code: string
          zone_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          rainfall_mm_max?: number | null
          rainfall_mm_min?: number | null
          states: string[]
          suitable_crops: Database["public"]["Enums"]["crop_type"][]
          temperature_max_c?: number | null
          temperature_min_c?: number | null
          zone_code: string
          zone_name: string
        }
        Update: {
          created_at?: string
          id?: string
          rainfall_mm_max?: number | null
          rainfall_mm_min?: number | null
          states?: string[]
          suitable_crops?: Database["public"]["Enums"]["crop_type"][]
          temperature_max_c?: number | null
          temperature_min_c?: number | null
          zone_code?: string
          zone_name?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          disease_issues: string[] | null
          germination_success_rate: number | null
          harvest_date: string | null
          id: string
          is_verified: boolean | null
          location_district: string
          location_state: string
          rating: number
          recommendation_id: string | null
          review_images: string[] | null
          review_text: string | null
          season_type: Database["public"]["Enums"]["season_type"]
          seed_variety_id: string
          sowing_date: string | null
          updated_at: string
          user_id: string
          yield_achieved_kg_per_hectare: number | null
        }
        Insert: {
          created_at?: string
          disease_issues?: string[] | null
          germination_success_rate?: number | null
          harvest_date?: string | null
          id?: string
          is_verified?: boolean | null
          location_district: string
          location_state: string
          rating: number
          recommendation_id?: string | null
          review_images?: string[] | null
          review_text?: string | null
          season_type: Database["public"]["Enums"]["season_type"]
          seed_variety_id: string
          sowing_date?: string | null
          updated_at?: string
          user_id: string
          yield_achieved_kg_per_hectare?: number | null
        }
        Update: {
          created_at?: string
          disease_issues?: string[] | null
          germination_success_rate?: number | null
          harvest_date?: string | null
          id?: string
          is_verified?: boolean | null
          location_district?: string
          location_state?: string
          rating?: number
          recommendation_id?: string | null
          review_images?: string[] | null
          review_text?: string | null
          season_type?: Database["public"]["Enums"]["season_type"]
          seed_variety_id?: string
          sowing_date?: string | null
          updated_at?: string
          user_id?: string
          yield_achieved_kg_per_hectare?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_seed_variety_id_fkey"
            columns: ["seed_variety_id"]
            isOneToOne: false
            referencedRelation: "seed_varieties"
            referencedColumns: ["id"]
          },
        ]
      }
      seed_varieties: {
        Row: {
          certification_type: Database["public"]["Enums"]["certification_type"]
          created_at: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          description: string | null
          developed_by: string
          disease_resistance: string[] | null
          drought_tolerance: boolean | null
          fertilizer_npk: string | null
          germination_percentage: number
          heat_tolerance: boolean | null
          id: string
          irrigation_requirement: string | null
          is_active: boolean | null
          market_price_per_kg: number | null
          maturity_days: number
          release_year: number | null
          season_type: Database["public"]["Enums"]["season_type"]
          seed_image_url: string | null
          seed_rate_kg_per_hectare: number | null
          sowing_depth_cm: number | null
          spacing_cm: string | null
          special_features: string | null
          suitable_regions: string[]
          suitable_soil_types: Database["public"]["Enums"]["soil_type"][]
          updated_at: string
          variety_name: string
          yield_potential_kg_per_hectare: number
        }
        Insert: {
          certification_type: Database["public"]["Enums"]["certification_type"]
          created_at?: string
          crop_type: Database["public"]["Enums"]["crop_type"]
          description?: string | null
          developed_by: string
          disease_resistance?: string[] | null
          drought_tolerance?: boolean | null
          fertilizer_npk?: string | null
          germination_percentage?: number
          heat_tolerance?: boolean | null
          id?: string
          irrigation_requirement?: string | null
          is_active?: boolean | null
          market_price_per_kg?: number | null
          maturity_days: number
          release_year?: number | null
          season_type: Database["public"]["Enums"]["season_type"]
          seed_image_url?: string | null
          seed_rate_kg_per_hectare?: number | null
          sowing_depth_cm?: number | null
          spacing_cm?: string | null
          special_features?: string | null
          suitable_regions: string[]
          suitable_soil_types: Database["public"]["Enums"]["soil_type"][]
          updated_at?: string
          variety_name: string
          yield_potential_kg_per_hectare: number
        }
        Update: {
          certification_type?: Database["public"]["Enums"]["certification_type"]
          created_at?: string
          crop_type?: Database["public"]["Enums"]["crop_type"]
          description?: string | null
          developed_by?: string
          disease_resistance?: string[] | null
          drought_tolerance?: boolean | null
          fertilizer_npk?: string | null
          germination_percentage?: number
          heat_tolerance?: boolean | null
          id?: string
          irrigation_requirement?: string | null
          is_active?: boolean | null
          market_price_per_kg?: number | null
          maturity_days?: number
          release_year?: number | null
          season_type?: Database["public"]["Enums"]["season_type"]
          seed_image_url?: string | null
          seed_rate_kg_per_hectare?: number | null
          sowing_depth_cm?: number | null
          spacing_cm?: string | null
          special_features?: string | null
          suitable_regions?: string[]
          suitable_soil_types?: Database["public"]["Enums"]["soil_type"][]
          updated_at?: string
          variety_name?: string
          yield_potential_kg_per_hectare?: number
        }
        Relationships: []
      }
      seller_inventory: {
        Row: {
          id: string
          is_available: boolean | null
          last_updated: string
          minimum_order_kg: number | null
          price_per_kg: number
          seed_variety_id: string
          seller_id: string
          stock_quantity_kg: number
        }
        Insert: {
          id?: string
          is_available?: boolean | null
          last_updated?: string
          minimum_order_kg?: number | null
          price_per_kg: number
          seed_variety_id: string
          seller_id: string
          stock_quantity_kg?: number
        }
        Update: {
          id?: string
          is_available?: boolean | null
          last_updated?: string
          minimum_order_kg?: number | null
          price_per_kg?: number
          seed_variety_id?: string
          seller_id?: string
          stock_quantity_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "seller_inventory_seed_variety_id_fkey"
            columns: ["seed_variety_id"]
            isOneToOne: false
            referencedRelation: "seed_varieties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seller_inventory_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          address: string
          certification_documents: string[] | null
          company_name: string
          contact_person: string
          created_at: string
          district: string
          email: string | null
          government_certified: boolean | null
          icar_verified: boolean | null
          id: string
          license_number: string
          operating_regions: string[]
          phone: string
          pincode: string
          state: string
          status: Database["public"]["Enums"]["seller_status"] | null
          updated_at: string
          user_id: string | null
          whatsapp_number: string | null
        }
        Insert: {
          address: string
          certification_documents?: string[] | null
          company_name: string
          contact_person: string
          created_at?: string
          district: string
          email?: string | null
          government_certified?: boolean | null
          icar_verified?: boolean | null
          id?: string
          license_number: string
          operating_regions: string[]
          phone: string
          pincode: string
          state: string
          status?: Database["public"]["Enums"]["seller_status"] | null
          updated_at?: string
          user_id?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          address?: string
          certification_documents?: string[] | null
          company_name?: string
          contact_person?: string
          created_at?: string
          district?: string
          email?: string | null
          government_certified?: boolean | null
          icar_verified?: boolean | null
          id?: string
          license_number?: string
          operating_regions?: string[]
          phone?: string
          pincode?: string
          state?: string
          status?: Database["public"]["Enums"]["seller_status"] | null
          updated_at?: string
          user_id?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      certification_type:
        | "icar_approved"
        | "state_certified"
        | "truthfully_labeled"
        | "foundation"
        | "certified"
      crop_type:
        | "wheat"
        | "rice"
        | "cotton"
        | "soybean"
        | "corn"
        | "sugarcane"
        | "tomato"
        | "potato"
        | "onion"
        | "other"
      season_type: "kharif" | "rabi" | "zaid"
      seller_status: "active" | "pending_verification" | "suspended"
      soil_type: "clay" | "sandy" | "loamy" | "black" | "red" | "alluvial"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      certification_type: [
        "icar_approved",
        "state_certified",
        "truthfully_labeled",
        "foundation",
        "certified",
      ],
      crop_type: [
        "wheat",
        "rice",
        "cotton",
        "soybean",
        "corn",
        "sugarcane",
        "tomato",
        "potato",
        "onion",
        "other",
      ],
      season_type: ["kharif", "rabi", "zaid"],
      seller_status: ["active", "pending_verification", "suspended"],
      soil_type: ["clay", "sandy", "loamy", "black", "red", "alluvial"],
    },
  },
} as const
