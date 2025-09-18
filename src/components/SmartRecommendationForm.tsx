import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LocationData {
  state: string;
  district: string;
  village?: string;
  latitude?: number;
  longitude?: number;
}

interface SoilData {
  soil_type?: string;
  soil_ph?: number;
  nitrogen_kg_per_hectare?: number;
  phosphorus_kg_per_hectare?: number;
  potassium_kg_per_hectare?: number;
}

interface SmartRecommendationFormProps {
  onRecommendationsGenerated: (data: any) => void;
}

const SmartRecommendationForm = ({ onRecommendationsGenerated }: SmartRecommendationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState<LocationData>({
    state: "",
    district: "",
    village: ""
  });
  const [farmingInputs, setFarmingInputs] = useState({
    cropType: "",
    seasonType: "",
    sowingMonth: ""
  });
  const [soilData, setSoilData] = useState<SoilData>({});
  const { toast } = useToast();

  const cropTypes = [
    { value: "wheat", label: "Wheat" },
    { value: "rice", label: "Rice" },
    { value: "cotton", label: "Cotton" },
    { value: "soybean", label: "Soybean" },
    { value: "corn", label: "Corn" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "tomato", label: "Tomato" },
    { value: "potato", label: "Potato" },
    { value: "onion", label: "Onion" }
  ];

  const seasonTypes = [
    { value: "kharif", label: "Kharif (Monsoon)" },
    { value: "rabi", label: "Rabi (Winter)" },
    { value: "zaid", label: "Zaid (Summer)" }
  ];

  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "sandy", label: "Sandy" },
    { value: "loamy", label: "Loamy" },
    { value: "black", label: "Black Cotton" },
    { value: "red", label: "Red" },
    { value: "alluvial", label: "Alluvial" }
  ];

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationData({
            ...locationData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            state: "Punjab", // Simulated - would use reverse geocoding
            district: "Ludhiana"
          });
          toast({
            title: "Location Detected",
            description: "Your location has been automatically detected.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to detect location. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Please enter your location manually.",
        variant: "destructive"
      });
    }
  };

  const handleGetRecommendations = async () => {
    if (!farmingInputs.cropType || !farmingInputs.seasonType || !farmingInputs.sowingMonth || !locationData.state || !locationData.district) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('get-recommendations', {
        body: {
          cropType: farmingInputs.cropType,
          seasonType: farmingInputs.seasonType,
          sowingMonth: parseInt(farmingInputs.sowingMonth),
          locationState: locationData.state,
          locationDistrict: locationData.district,
          soilData: soilData
        }
      });

      if (error) {
        throw error;
      }

      onRecommendationsGenerated(data);
      toast({
        title: "Recommendations Generated!",
        description: `Found ${data.recommendations?.length || 0} suitable seed varieties for you.`,
      });
    } catch (error: any) {
      console.error('Error getting recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Location Input */}
      <Card className="shadow-card border-0 bg-gradient-feature">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-6 w-6 text-primary mr-2" />
            Farm Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="e.g., Punjab"
                value={locationData.state}
                onChange={(e) => setLocationData({ ...locationData, state: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="district">District *</Label>
              <Input
                id="district"
                placeholder="e.g., Ludhiana"
                value={locationData.district}
                onChange={(e) => setLocationData({ ...locationData, district: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="village">Village (Optional)</Label>
            <Input
              id="village"
              placeholder="Enter your village name"
              value={locationData.village}
              onChange={(e) => setLocationData({ ...locationData, village: e.target.value })}
            />
          </div>
          <Button
            onClick={handleLocationDetect}
            variant="outline"
            className="w-full md:w-auto"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Auto-Detect Location
          </Button>
        </CardContent>
      </Card>

      {/* Crop Selection */}
      <Card className="shadow-card border-0 bg-background">
        <CardHeader>
          <CardTitle>Crop & Season Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="crop-type">Crop Type *</Label>
              <Select value={farmingInputs.cropType} onValueChange={(value) => setFarmingInputs({ ...farmingInputs, cropType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="season-type">Season *</Label>
              <Select value={farmingInputs.seasonType} onValueChange={(value) => setFarmingInputs({ ...farmingInputs, seasonType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasonTypes.map((season) => (
                    <SelectItem key={season.value} value={season.value}>
                      {season.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sowing-month">Sowing Month *</Label>
              <Select value={farmingInputs.sowingMonth} onValueChange={(value) => setFarmingInputs({ ...farmingInputs, sowingMonth: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Information */}
      <Card className="shadow-card border-0 bg-background">
        <CardHeader>
          <CardTitle>Soil Information (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="soil-type">Soil Type</Label>
              <Select value={soilData.soil_type} onValueChange={(value) => setSoilData({ ...soilData, soil_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="soil-ph">Soil pH</Label>
              <Input
                id="soil-ph"
                type="number"
                step="0.1"
                min="3"
                max="9"
                placeholder="e.g., 6.5"
                value={soilData.soil_ph || ""}
                onChange={(e) => setSoilData({ ...soilData, soil_ph: parseFloat(e.target.value) || undefined })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nitrogen">Nitrogen (kg/hectare)</Label>
              <Input
                id="nitrogen"
                type="number"
                placeholder="e.g., 120"
                value={soilData.nitrogen_kg_per_hectare || ""}
                onChange={(e) => setSoilData({ ...soilData, nitrogen_kg_per_hectare: parseFloat(e.target.value) || undefined })}
              />
            </div>
            <div>
              <Label htmlFor="phosphorus">Phosphorus (kg/hectare)</Label>
              <Input
                id="phosphorus"
                type="number"
                placeholder="e.g., 60"
                value={soilData.phosphorus_kg_per_hectare || ""}
                onChange={(e) => setSoilData({ ...soilData, phosphorus_kg_per_hectare: parseFloat(e.target.value) || undefined })}
              />
            </div>
            <div>
              <Label htmlFor="potassium">Potassium (kg/hectare)</Label>
              <Input
                id="potassium"
                type="number"
                placeholder="e.g., 40"
                value={soilData.potassium_kg_per_hectare || ""}
                onChange={(e) => setSoilData({ ...soilData, potassium_kg_per_hectare: parseFloat(e.target.value) || undefined })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Get Recommendations Button */}
      <Card className="shadow-card border-0 bg-gradient-feature">
        <CardContent className="p-6">
          <Button
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="w-full bg-gradient-hero hover:bg-primary-light text-lg py-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Smart Recommendations...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Get Smart Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartRecommendationForm;