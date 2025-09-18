import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Sprout, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import SmartRecommendationForm from "@/components/SmartRecommendationForm";
import RecommendationResults from "@/components/RecommendationResults";
import locationFarming from "@/assets/location-farming.jpg";

const Dashboard = () => {
  const [recommendationData, setRecommendationData] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      toast({
        title: "Welcome to SeedSaathi!",
        description: "Get personalized seed recommendations based on your location and soil conditions.",
      });
    }
  }, [user, toast]);

  const handleRecommendationsGenerated = (data: any) => {
    setRecommendationData(data);
  };

  const resetRecommendations = () => {
    setRecommendationData(null);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Your Smart Farming Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Welcome back, {user?.user_metadata?.full_name || 'Farmer'}! 
                Get AI-powered seed recommendations tailored for your farm.
              </p>
            </div>
            {recommendationData && (
              <Button 
                onClick={resetRecommendations}
                variant="outline"
                className="hidden md:flex"
              >
                New Search
              </Button>
            )}
          </div>
        </div>

        {!recommendationData ? (
          <>
            {/* Recommendation Form */}
            <SmartRecommendationForm onRecommendationsGenerated={handleRecommendationsGenerated} />

            {/* Welcome Card */}
            <Card className="shadow-card border-0 bg-background mt-8">
              <CardContent className="p-12 text-center">
                <img 
                  src={locationFarming}
                  alt="Smart farming with AI"
                  className="w-48 h-32 object-cover rounded-lg mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  AI-Powered Seed Recommendations
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our smart recommendation engine analyzes your soil conditions, local climate, 
                  agro-climatic zone, and current market trends to suggest the best seed varieties 
                  for maximum yield and profitability.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold mb-2">Location Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Agro-climatic zone mapping for region-specific recommendations
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Sprout className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold mb-2">Smart Matching</h4>
                    <p className="text-sm text-muted-foreground">
                      AI algorithms match seeds to your specific soil and climate conditions
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold mb-2">Market Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time market prices and demand forecasting for better decisions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Show Recommendations */}
            <RecommendationResults data={recommendationData} />
            
            {/* Mobile Reset Button */}
            <div className="md:hidden mt-6">
              <Button 
                onClick={resetRecommendations}
                variant="outline"
                className="w-full"
              >
                Start New Search
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;