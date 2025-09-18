import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Star, Shield, Droplets, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import seedsGrid from "@/assets/seeds-grid.jpg";

interface SeedVariety {
  id: string;
  variety_name: string;
  crop_type: string;
  developed_by: string;
  release_year: number;
  maturity_days: number;
  season_type: string;
  yield_potential_kg_per_hectare: number;
  germination_percentage: number;
  disease_resistance: string[];
  drought_tolerance: boolean;
  heat_tolerance: boolean;
  certification_type: string;
  description: string;
  special_features: string;
  market_price_per_kg: number;
  is_active: boolean;
}

const SeedCatalog = () => {
  const [seeds, setSeeds] = useState<SeedVariety[]>([]);
  const [filteredSeeds, setFilteredSeeds] = useState<SeedVariety[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedCertification, setSelectedCertification] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchSeeds();
  }, []);

  useEffect(() => {
    filterSeeds();
  }, [seeds, searchTerm, selectedCrop, selectedSeason, selectedCertification]);

  const fetchSeeds = async () => {
    try {
      const { data, error } = await supabase
        .from('seed_varieties')
        .select('*')
        .eq('is_active', true)
        .order('yield_potential_kg_per_hectare', { ascending: false });

      if (error) throw error;
      setSeeds(data || []);
    } catch (error: any) {
      console.error('Error fetching seeds:', error);
      toast({
        title: "Error",
        description: "Failed to load seed catalog. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSeeds = () => {
    let filtered = seeds;

    if (searchTerm) {
      filtered = filtered.filter(seed => 
        seed.variety_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seed.developed_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seed.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCrop !== "all") {
      filtered = filtered.filter(seed => seed.crop_type === selectedCrop);
    }

    if (selectedSeason !== "all") {
      filtered = filtered.filter(seed => seed.season_type === selectedSeason);
    }

    if (selectedCertification !== "all") {
      filtered = filtered.filter(seed => seed.certification_type === selectedCertification);
    }

    setFilteredSeeds(filtered);
  };

  const getCropTypes = () => {
    const types = Array.from(new Set(seeds.map(seed => seed.crop_type)));
    return types.map(type => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1)
    }));
  };

  const getCertificationBadge = (type: string) => {
    const badges: { [key: string]: { label: string; variant: "default" | "secondary" | "destructive" | "outline" } } = {
      icar_approved: { label: "ICAR Approved", variant: "default" },
      state_certified: { label: "State Certified", variant: "secondary" },
      truthfully_labeled: { label: "Truthfully Labeled", variant: "outline" }
    };
    return badges[type] || { label: type, variant: "outline" };
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCrop("all");
    setSelectedSeason("all");
    setSelectedCertification("all");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading seed catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Seed Catalog
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our comprehensive catalog of certified seed varieties
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-card border-0 bg-background">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-6 w-6 text-primary mr-2" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search seeds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="All Crops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  {getCropTypes().map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger>
                  <SelectValue placeholder="All Seasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="kharif">Kharif</SelectItem>
                  <SelectItem value="rabi">Rabi</SelectItem>
                  <SelectItem value="zaid">Zaid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCertification} onValueChange={setSelectedCertification}>
                <SelectTrigger>
                  <SelectValue placeholder="Certification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Certifications</SelectItem>
                  <SelectItem value="icar_approved">ICAR Approved</SelectItem>
                  <SelectItem value="state_certified">State Certified</SelectItem>
                  <SelectItem value="truthfully_labeled">Truthfully Labeled</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredSeeds.length} of {seeds.length} varieties
          </p>
        </div>

        {/* Seeds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeeds.map((seed) => (
            <Card key={seed.id} className="shadow-card hover:shadow-glow transition-shadow border-0 bg-background">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={seedsGrid}
                  alt={seed.variety_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge {...getCertificationBadge(seed.certification_type)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getCertificationBadge(seed.certification_type).label}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-background/90 backdrop-blur text-foreground">
                    {seed.crop_type.charAt(0).toUpperCase() + seed.crop_type.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{seed.variety_name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {seed.developed_by} • Released {seed.release_year}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {seed.drought_tolerance && (
                    <Badge variant="secondary">
                      <Droplets className="h-3 w-3 mr-1" />
                      Drought Tolerant
                    </Badge>
                  )}
                  {seed.heat_tolerance && (
                    <Badge variant="secondary">Heat Tolerant</Badge>
                  )}
                  <Badge variant="outline">
                    {seed.season_type.charAt(0).toUpperCase() + seed.season_type.slice(1)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yield Potential:</span>
                    <span className="font-medium">{seed.yield_potential_kg_per_hectare} kg/ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maturity:</span>
                    <span className="font-medium">{seed.maturity_days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Germination:</span>
                    <span className="font-medium">{seed.germination_percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium text-primary">₹{seed.market_price_per_kg}/kg</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-hero hover:bg-primary-light">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSeeds.length === 0 && (
          <Card className="shadow-card border-0 bg-background">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No seeds found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or clear the filters
              </p>
              <Button onClick={clearFilters} variant="outline" className="mt-4">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SeedCatalog;