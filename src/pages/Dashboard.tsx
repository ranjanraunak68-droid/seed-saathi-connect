import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Sprout, TrendingUp, AlertCircle, Star } from "lucide-react";
import { useState } from "react";
import locationFarming from "@/assets/location-farming.jpg";
import seedsGrid from "@/assets/seeds-grid.jpg";

const Dashboard = () => {
  const [location, setLocation] = useState("");
  const [isLocationDetected, setIsLocationDetected] = useState(false);

  const handleLocationDetect = () => {
    // Simulated location detection
    setLocation("Ludhiana, Punjab");
    setIsLocationDetected(true);
  };

  const recommendations = [
    {
      name: "HD-3086 (Hybrid Wheat)",
      rating: 4.8,
      traits: ["High Yield", "Disease Resistant", "Early Maturity"],
      expectedYield: "45-50 quintals/hectare",
      marketPrice: "₹2,200-2,400/quintal",
      certification: "ICAR Approved",
      image: seedsGrid
    },
    {
      name: "PBW-725 (Wheat)",
      rating: 4.6,
      traits: ["Drought Tolerant", "Good Quality", "120-day maturity"],
      expectedYield: "40-45 quintals/hectare",
      marketPrice: "₹2,100-2,300/quintal",
      certification: "State Certified",
      image: seedsGrid
    },
    {
      name: "DBW-187 (Durum Wheat)",
      rating: 4.5,
      traits: ["Premium Quality", "Export Grade", "Amber grain"],
      expectedYield: "38-42 quintals/hectare", 
      marketPrice: "₹2,400-2,600/quintal",
      certification: "ICAR Approved",
      image: seedsGrid
    }
  ];

  const marketInsights = [
    {
      crop: "Wheat",
      currentPrice: "₹2,250",
      trend: "up",
      change: "+3.2%",
      forecast: "Prices expected to rise due to export demand"
    },
    {
      crop: "Rice",
      currentPrice: "₹1,890",
      trend: "down", 
      change: "-1.8%",
      forecast: "Seasonal decline, good for procurement"
    },
    {
      crop: "Cotton",
      currentPrice: "₹6,200",
      trend: "up",
      change: "+5.4%",
      forecast: "Strong demand from textile industry"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Farming Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Get personalized seed recommendations and market insights for your location
          </p>
        </div>

        {/* Location Input */}
        <Card className="mb-8 shadow-card border-0 bg-gradient-feature">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 text-primary mr-2" />
              Farm Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="location">Enter your farm location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Village, District, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleLocationDetect}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Auto-Detect
                </Button>
                <Button className="bg-gradient-hero hover:bg-primary-light">
                  <Search className="h-4 w-4 mr-2" />
                  Get Recommendations
                </Button>
              </div>
            </div>
            {isLocationDetected && (
              <div className="mt-4 p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-foreground">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Location detected: <strong>{location}</strong>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Agro-climatic Zone: Trans-Gangetic Plains (Zone IV)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {isLocationDetected && (
          <>
            {/* Seed Recommendations */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Sprout className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-2xl font-bold text-foreground">Recommended Seeds for Your Location</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((seed, index) => (
                  <Card key={index} className="shadow-card hover:shadow-glow transition-shadow border-0 bg-background">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={seed.image}
                        alt={seed.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2 py-1 rounded-full flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{seed.rating}</span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{seed.name}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {seed.traits.map((trait, i) => (
                          <span key={i} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                            {trait}
                          </span>
                        ))}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expected Yield:</span>
                          <span className="font-medium">{seed.expectedYield}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Market Price:</span>
                          <span className="font-medium text-primary">{seed.marketPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Certification:</span>
                          <span className="font-medium">{seed.certification}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-gradient-hero hover:bg-primary-light">
                        Find Dealers
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div>
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-2xl font-bold text-foreground">Market Insights</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {marketInsights.map((market, index) => (
                  <Card key={index} className="shadow-card border-0 bg-background">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-foreground">{market.crop}</h3>
                        <div className={`flex items-center ${market.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          <TrendingUp className={`h-4 w-4 mr-1 ${market.trend === 'down' ? 'rotate-180' : ''}`} />
                          <span className="text-sm font-medium">{market.change}</span>
                        </div>
                      </div>
                      
                      <div className="text-2xl font-bold text-primary mb-2">
                        {market.currentPrice}
                        <span className="text-sm text-muted-foreground font-normal">/quintal</span>
                      </div>
                      
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{market.forecast}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {!isLocationDetected && (
          <Card className="shadow-card border-0 bg-background">
            <CardContent className="p-12 text-center">
              <img 
                src={locationFarming}
                alt="Location-based farming"
                className="w-48 h-32 object-cover rounded-lg mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start by Adding Your Location
              </h3>
              <p className="text-muted-foreground">
                Enter your farm location above to get personalized seed recommendations 
                and market insights tailored to your agro-climatic zone.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;