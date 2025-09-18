import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Sprout, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroFarmer from "@/assets/hero-farmer.jpg";
import seedsGrid from "@/assets/seeds-grid.jpg";
import locationFarming from "@/assets/location-farming.jpg";

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: "GPS-Driven Precision",
      description: "Get seed recommendations based on your exact location and agro-climatic zone",
      image: locationFarming,
    },
    {
      icon: Sprout,
      title: "Certified Varieties",
      description: "Access only government-certified seed varieties with proven performance data",
      image: seedsGrid,
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Make informed decisions with real-time price trends and demand forecasts",
      image: seedsGrid,
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Enter Location",
      description: "Share your farm location for precise agro-climatic analysis",
    },
    {
      number: "2",
      title: "Get Recommendations",
      description: "Receive AI-powered seed variety suggestions tailored to your region",
    },
    {
      number: "3",
      title: "Buy Certified Seeds",
      description: "Connect with authorized dealers for guaranteed quality seeds",
    },
  ];

  const benefits = [
    "Increase crop yield by up to 30%",
    "Reduce crop failure risks",
    "Access to latest varieties",
    "Expert agronomic guidance",
    "Market price transparency",
    "Certified seed guarantee",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroFarmer})` }}
        ></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Your GPS-Driven 
              <span className="block bg-gradient-to-r from-primary-glow to-primary-light bg-clip-text text-transparent">
                Seed Advisor
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Get personalized seed recommendations based on your location, 
              soil conditions, and market insights. Powered by AI and trusted by thousands of farmers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow"
                asChild
              >
                <Link to="/dashboard">
                  Start Farming Smarter <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Seed Saathi Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your farming with data-driven seed selection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-8 h-6 w-6 text-primary/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-gradient-feature">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Seed Saathi?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets traditional farming wisdom for optimal results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card transition-shadow duration-300 border-0 bg-background/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-hero rounded-lg mb-4 group-hover:shadow-glow transition-shadow">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Proven Results for Modern Farmers
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of farmers who have transformed their yields and profitability 
                with our data-driven seed recommendations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-gradient-hero hover:bg-primary-light" asChild>
                <Link to="/dashboard">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={seedsGrid}
                alt="Various seed varieties"
                className="rounded-lg shadow-natural w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-earth">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Farmers Across India
            </h2>
            <p className="text-lg text-muted-foreground">
              Real stories from farmers who've transformed their harvests
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                location: "Punjab",
                quote: "Seed Saathi helped me choose the right wheat variety. My yield increased by 25% this season!",
                crop: "Wheat Farmer"
              },
              {
                name: "Priya Sharma",
                location: "Maharashtra",
                quote: "The market insights feature saved me thousands. I planted cotton at just the right time.",
                crop: "Cotton Farmer"
              },
              {
                name: "Mohan Singh",
                location: "Rajasthan",
                quote: "Finally, a platform that understands our local conditions. Highly recommended!",
                crop: "Millet Farmer"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 bg-background/90 backdrop-blur shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.crop} • {testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who trust Seed Saathi for smarter seed selection 
            and better harvests.
          </p>
          <Button 
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow"
            asChild
          >
            <Link to="/register">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;