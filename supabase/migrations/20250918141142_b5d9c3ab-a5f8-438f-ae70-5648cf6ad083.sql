-- Create enum types for better data consistency
CREATE TYPE public.crop_type AS ENUM ('wheat', 'rice', 'cotton', 'soybean', 'corn', 'sugarcane', 'tomato', 'potato', 'onion', 'other');
CREATE TYPE public.soil_type AS ENUM ('clay', 'sandy', 'loamy', 'black', 'red', 'alluvial');
CREATE TYPE public.season_type AS ENUM ('kharif', 'rabi', 'zaid');
CREATE TYPE public.certification_type AS ENUM ('icar_approved', 'state_certified', 'truthfully_labeled', 'foundation', 'certified');
CREATE TYPE public.seller_status AS ENUM ('active', 'pending_verification', 'suspended');

-- Create profiles table for farmer data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  location_state TEXT,
  location_district TEXT,
  location_village TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  farm_size_acres DECIMAL(8, 2),
  soil_type soil_type,
  soil_ph DECIMAL(3, 1),
  organic_carbon DECIMAL(4, 2),
  nitrogen_kg_per_hectare DECIMAL(6, 2),
  phosphorus_kg_per_hectare DECIMAL(6, 2),
  potassium_kg_per_hectare DECIMAL(6, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create regions table for agro-climatic zones
CREATE TABLE public.regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  zone_name TEXT NOT NULL,
  zone_code TEXT UNIQUE NOT NULL,
  states TEXT[] NOT NULL,
  rainfall_mm_min INTEGER,
  rainfall_mm_max INTEGER,
  temperature_min_c DECIMAL(4, 1),
  temperature_max_c DECIMAL(4, 1),
  suitable_crops crop_type[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create seed_varieties table for comprehensive seed catalog
CREATE TABLE public.seed_varieties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variety_name TEXT NOT NULL,
  crop_type crop_type NOT NULL,
  developed_by TEXT NOT NULL,
  release_year INTEGER,
  maturity_days INTEGER NOT NULL,
  season_type season_type NOT NULL,
  yield_potential_kg_per_hectare INTEGER NOT NULL,
  germination_percentage DECIMAL(5, 2) NOT NULL DEFAULT 85.0,
  disease_resistance TEXT[],
  drought_tolerance BOOLEAN DEFAULT FALSE,
  heat_tolerance BOOLEAN DEFAULT FALSE,
  suitable_soil_types soil_type[] NOT NULL,
  suitable_regions TEXT[] NOT NULL,
  seed_rate_kg_per_hectare DECIMAL(6, 2),
  sowing_depth_cm DECIMAL(4, 1),
  spacing_cm TEXT,
  irrigation_requirement TEXT,
  fertilizer_npk TEXT,
  certification_type certification_type NOT NULL,
  seed_image_url TEXT,
  description TEXT,
  special_features TEXT,
  market_price_per_kg DECIMAL(8, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sellers table for verified dealers
CREATE TABLE public.sellers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  pincode TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  certification_documents TEXT[],
  status seller_status DEFAULT 'pending_verification',
  icar_verified BOOLEAN DEFAULT FALSE,
  government_certified BOOLEAN DEFAULT FALSE,
  operating_regions TEXT[] NOT NULL,
  whatsapp_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create seller_inventory table for seed availability
CREATE TABLE public.seller_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  seed_variety_id UUID NOT NULL REFERENCES public.seed_varieties(id) ON DELETE CASCADE,
  price_per_kg DECIMAL(8, 2) NOT NULL,
  stock_quantity_kg DECIMAL(10, 2) NOT NULL DEFAULT 0,
  minimum_order_kg DECIMAL(8, 2) DEFAULT 1,
  is_available BOOLEAN DEFAULT TRUE,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(seller_id, seed_variety_id)
);

-- Create recommendations table for tracking suggestions
CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_type crop_type NOT NULL,
  season_type season_type NOT NULL,
  sowing_month INTEGER NOT NULL CHECK (sowing_month >= 1 AND sowing_month <= 12),
  location_state TEXT NOT NULL,
  location_district TEXT NOT NULL,
  recommended_varieties UUID[] NOT NULL,
  soil_data JSONB,
  weather_data JSONB,
  recommendation_score DECIMAL(4, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table for farmer feedback
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seed_variety_id UUID NOT NULL REFERENCES public.seed_varieties(id) ON DELETE CASCADE,
  recommendation_id UUID REFERENCES public.recommendations(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  yield_achieved_kg_per_hectare DECIMAL(8, 2),
  germination_success_rate DECIMAL(5, 2),
  disease_issues TEXT[],
  review_text TEXT,
  review_images TEXT[],
  sowing_date DATE,
  harvest_date DATE,
  season_type season_type NOT NULL,
  location_state TEXT NOT NULL,
  location_district TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create plant_saathi_integration table for monitoring
CREATE TABLE public.plant_saathi_integration (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seed_variety_id UUID NOT NULL REFERENCES public.seed_varieties(id) ON DELETE CASCADE,
  plant_saathi_crop_id TEXT,
  sowing_date DATE NOT NULL,
  expected_harvest_date DATE,
  current_growth_stage TEXT,
  germination_success_rate DECIMAL(5, 2),
  health_status TEXT,
  last_monitored_at TIMESTAMP WITH TIME ZONE,
  monitoring_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seed_varieties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_saathi_integration ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view and edit their own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = user_id);

-- Create RLS policies for regions (public read access)
CREATE POLICY "Regions are viewable by everyone"
  ON public.regions FOR SELECT
  USING (true);

-- Create RLS policies for seed_varieties (public read access)
CREATE POLICY "Seed varieties are viewable by everyone"
  ON public.seed_varieties FOR SELECT
  USING (is_active = true);

-- Create RLS policies for sellers (public read for verified sellers)
CREATE POLICY "Verified sellers are viewable by everyone"
  ON public.sellers FOR SELECT
  USING (status = 'active');

CREATE POLICY "Sellers can edit their own profile"
  ON public.sellers FOR ALL
  USING (auth.uid() = user_id);

-- Create RLS policies for seller_inventory (public read for available stock)
CREATE POLICY "Available inventory is viewable by everyone"
  ON public.seller_inventory FOR SELECT
  USING (is_available = true);

-- Create RLS policies for recommendations
CREATE POLICY "Users can view their own recommendations"
  ON public.recommendations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recommendations"
  ON public.recommendations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for reviews
CREATE POLICY "Users can view all reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can edit their own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policies for plant_saathi_integration
CREATE POLICY "Users can view and manage their own plant saathi data"
  ON public.plant_saathi_integration FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_location ON public.profiles(location_state, location_district);
CREATE INDEX idx_seed_varieties_crop_season ON public.seed_varieties(crop_type, season_type);
CREATE INDEX idx_seed_varieties_regions ON public.seed_varieties USING GIN(suitable_regions);
CREATE INDEX idx_sellers_status ON public.sellers(status);
CREATE INDEX idx_seller_inventory_availability ON public.seller_inventory(is_available, seed_variety_id);
CREATE INDEX idx_recommendations_user_crop ON public.recommendations(user_id, crop_type);
CREATE INDEX idx_reviews_variety ON public.reviews(seed_variety_id);
CREATE INDEX idx_reviews_location ON public.reviews(location_state, location_district);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seed_varieties_updated_at
  BEFORE UPDATE ON public.seed_varieties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sellers_updated_at
  BEFORE UPDATE ON public.sellers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plant_saathi_integration_updated_at
  BEFORE UPDATE ON public.plant_saathi_integration
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample regions data
INSERT INTO public.regions (zone_name, zone_code, states, rainfall_mm_min, rainfall_mm_max, temperature_min_c, temperature_max_c, suitable_crops) VALUES
('Trans-Gangetic Plains', 'TGP', '{"Punjab", "Haryana", "Delhi", "Western UP"}', 500, 1000, 5.0, 45.0, '{"wheat", "rice", "cotton", "sugarcane"}'),
('Upper Gangetic Plains', 'UGP', '{"Eastern UP", "Bihar"}', 1000, 1500, 8.0, 42.0, '{"wheat", "rice", "potato", "sugarcane"}'),
('Middle Gangetic Plains', 'MGP', '{"Eastern UP", "Bihar", "West Bengal"}', 1200, 1800, 10.0, 40.0, '{"rice", "wheat", "potato", "onion"}'),
('Lower Gangetic Plains', 'LGP', '{"West Bengal", "Assam"}', 1500, 2500, 12.0, 38.0, '{"rice", "wheat", "potato"}'),
('East Coast Plains', 'ECP', '{"Odisha", "Andhra Pradesh", "Tamil Nadu"}', 900, 1400, 15.0, 42.0, '{"rice", "cotton", "sugarcane"}');

-- Insert sample seed varieties
INSERT INTO public.seed_varieties (variety_name, crop_type, developed_by, release_year, maturity_days, season_type, yield_potential_kg_per_hectare, germination_percentage, disease_resistance, drought_tolerance, suitable_soil_types, suitable_regions, seed_rate_kg_per_hectare, sowing_depth_cm, spacing_cm, certification_type, market_price_per_kg, description, special_features) VALUES
('HD-3086', 'wheat', 'ICAR-IARI', 2018, 125, 'rabi', 5000, 92.0, '{"Rust", "Powdery Mildew"}', true, '{"loamy", "clay", "alluvial"}', '{"TGP", "UGP"}', 100.0, 3.0, '22.5 cm rows', 'icar_approved', 45.00, 'High yielding wheat variety suitable for irrigated conditions', 'Heat tolerance, late sowing capability'),
('PBW-725', 'wheat', 'Punjab Agricultural University', 2020, 120, 'rabi', 4500, 90.0, '{"Yellow Rust", "Brown Rust"}', false, '{"loamy", "clay"}', '{"TGP"}', 100.0, 3.0, '22.5 cm rows', 'state_certified', 42.00, 'Premium wheat variety for Punjab conditions', 'Good chapati quality'),
('Pusa Basmati 1718', 'rice', 'ICAR-IARI', 2019, 130, 'kharif', 4200, 85.0, '{"Bacterial Leaf Blight", "Blast"}', false, '{"clay", "loamy"}', '{"TGP", "UGP", "MGP"}', 20.0, 2.0, '20x15 cm', 'icar_approved', 180.00, 'Premium basmati rice with excellent cooking quality', 'Export quality, aromatic'),
('BG-4035', 'cotton', 'Mahyco', 2021, 180, 'kharif', 2200, 88.0, '{"Bollworm"}', true, '{"black", "red", "alluvial"}', '{"TGP", "ECP"}', 1.5, 2.5, '45x15 cm', 'truthfully_labeled', 3500.00, 'Bt cotton hybrid with bollworm resistance', 'High fiber quality, machine pickable'),
('JS-335', 'soybean', 'ICAR-IIOR', 2017, 95, 'kharif', 1800, 85.0, '{"Yellow Mosaic Virus"}', true, '{"black", "red", "loamy"}', '{"MGP", "ECP"}', 75.0, 3.0, '30x10 cm', 'icar_approved', 85.00, 'Early maturing soybean variety', 'High protein content, drought tolerant');