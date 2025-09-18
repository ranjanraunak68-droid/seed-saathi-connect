import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Star, MessageSquare, TrendingUp, MapPin, Calendar, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Review {
  id: string;
  rating: number;
  yield_achieved_kg_per_hectare: number | null;
  germination_success_rate: number | null;
  review_text: string | null;
  season_type: "kharif" | "rabi" | "zaid";
  location_state: string;
  location_district: string;
  sowing_date: string | null;
  harvest_date: string | null;
  is_verified: boolean;
  created_at: string;
  seed_varieties: {
    variety_name: string;
    crop_type: string;
    developed_by: string;
  } | null;
  profiles: {
    full_name: string;
  } | null;
}

interface SeedVariety {
  id: string;
  variety_name: string;
  crop_type: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [seedVarieties, setSeedVarieties] = useState<SeedVariety[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [newReview, setNewReview] = useState({
    seed_variety_id: "",
    rating: 5,
    yield_achieved_kg_per_hectare: "",
    germination_success_rate: "",
    review_text: "",
    season_type: "kharif",
    location_state: "",
    location_district: "",
    sowing_date: "",
    harvest_date: ""
  });

  useEffect(() => {
    fetchReviews();
    fetchSeedVarieties();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          yield_achieved_kg_per_hectare,
          germination_success_rate,
          review_text,
          season_type,
          location_state,
          location_district,
          sowing_date,
          harvest_date,
          is_verified,
          created_at,
          seed_varieties!inner(variety_name, crop_type, developed_by),
          profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to handle potential null profiles
      const transformedData = data?.map(item => ({
        ...item,
        profiles: item.profiles || { full_name: 'Anonymous' }
      })) || [];
      
      setReviews(transformedData as Review[]);
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSeedVarieties = async () => {
    try {
      const { data, error } = await supabase
        .from('seed_varieties')
        .select('id, variety_name, crop_type')
        .eq('is_active', true)
        .order('variety_name');

      if (error) throw error;
      setSeedVarieties(data || []);
    } catch (error: any) {
      console.error('Error fetching seed varieties:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!user || !newReview.seed_variety_id || !newReview.location_state || !newReview.location_district) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id,
        seed_variety_id: newReview.seed_variety_id,
        rating: newReview.rating,
        yield_achieved_kg_per_hectare: newReview.yield_achieved_kg_per_hectare ? parseFloat(newReview.yield_achieved_kg_per_hectare) : null,
        germination_success_rate: newReview.germination_success_rate ? parseFloat(newReview.germination_success_rate) : null,
        review_text: newReview.review_text,
        season_type: newReview.season_type as "kharif" | "rabi" | "zaid",
        location_state: newReview.location_state,
        location_district: newReview.location_district,
        sowing_date: newReview.sowing_date || null,
        harvest_date: newReview.harvest_date || null
      });

      if (error) throw error;

      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your experience with other farmers.",
      });

      setIsDialogOpen(false);
      setNewReview({
        seed_variety_id: "",
        rating: 5,
        yield_achieved_kg_per_hectare: "",
        germination_success_rate: "",
        review_text: "",
        season_type: "kharif",
        location_state: "",
        location_district: "",
        sowing_date: "",
        harvest_date: ""
      });
      fetchReviews();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Farmer Reviews & Experiences
              </h1>
              <p className="text-lg text-muted-foreground">
                Real feedback from farmers across India about seed varieties
              </p>
            </div>
            {user && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-hero hover:bg-primary-light">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Share Your Experience</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="seed-variety">Seed Variety *</Label>
                      <Select
                        value={newReview.seed_variety_id}
                        onValueChange={(value) => setNewReview({ ...newReview, seed_variety_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select seed variety" />
                        </SelectTrigger>
                        <SelectContent>
                          {seedVarieties.map((variety) => (
                            <SelectItem key={variety.id} value={variety.id}>
                              {variety.variety_name} ({variety.crop_type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={newReview.location_state}
                          onChange={(e) => setNewReview({ ...newReview, location_state: e.target.value })}
                          placeholder="e.g., Punjab"
                        />
                      </div>
                      <div>
                        <Label htmlFor="district">District *</Label>
                        <Input
                          id="district"
                          value={newReview.location_district}
                          onChange={(e) => setNewReview({ ...newReview, location_district: e.target.value })}
                          placeholder="e.g., Ludhiana"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="season">Season</Label>
                        <Select
                          value={newReview.season_type}
                          onValueChange={(value) => setNewReview({ ...newReview, season_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kharif">Kharif</SelectItem>
                            <SelectItem value="rabi">Rabi</SelectItem>
                            <SelectItem value="zaid">Zaid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sowing-date">Sowing Date</Label>
                        <Input
                          id="sowing-date"
                          type="date"
                          value={newReview.sowing_date}
                          onChange={(e) => setNewReview({ ...newReview, sowing_date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="harvest-date">Harvest Date</Label>
                        <Input
                          id="harvest-date"
                          type="date"
                          value={newReview.harvest_date}
                          onChange={(e) => setNewReview({ ...newReview, harvest_date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="yield">Yield Achieved (kg/hectare)</Label>
                        <Input
                          id="yield"
                          type="number"
                          value={newReview.yield_achieved_kg_per_hectare}
                          onChange={(e) => setNewReview({ ...newReview, yield_achieved_kg_per_hectare: e.target.value })}
                          placeholder="e.g., 4500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="germination">Germination Rate (%)</Label>
                        <Input
                          id="germination"
                          type="number"
                          min="0"
                          max="100"
                          value={newReview.germination_success_rate}
                          onChange={(e) => setNewReview({ ...newReview, germination_success_rate: e.target.value })}
                          placeholder="e.g., 90"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="rating">Rating (1-5 stars)</Label>
                      <Select
                        value={newReview.rating.toString()}
                        onValueChange={(value) => setNewReview({ ...newReview, rating: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>
                              <div className="flex items-center">
                                {renderStars(rating)}
                                <span className="ml-2">{rating} star{rating !== 1 ? 's' : ''}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="review-text">Your Review</Label>
                      <Textarea
                        id="review-text"
                        value={newReview.review_text}
                        onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                        placeholder="Share your experience with this seed variety..."
                        rows={4}
                      />
                    </div>

                    <Button onClick={handleSubmitReview} className="w-full">
                      Submit Review
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-card border-0 bg-background">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {review.seed_varieties.variety_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {review.seed_varieties.crop_type} • {review.seed_varieties.developed_by}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {review.is_verified && (
                      <Badge variant="default">Verified</Badge>
                    )}
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    {review.location_district}, {review.location_state}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    {review.season_type.charAt(0).toUpperCase() + review.season_type.slice(1)} Season
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-muted-foreground mr-2" />
                    {review.yield_achieved_kg_per_hectare ? 
                      `${review.yield_achieved_kg_per_hectare} kg/ha` : 
                      'Yield not reported'
                    }
                  </div>
                </div>

                {review.review_text && (
                  <p className="text-foreground mb-4">{review.review_text}</p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>By {review.profiles?.full_name || 'Anonymous'}</span>
                  <span>{format(new Date(review.created_at), 'MMM dd, yyyy')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reviews.length === 0 && (
          <Card className="shadow-card border-0 bg-background">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No reviews yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to share your farming experience!
              </p>
              {user && (
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-4 bg-gradient-hero hover:bg-primary-light"
                >
                  Write a Review
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reviews;