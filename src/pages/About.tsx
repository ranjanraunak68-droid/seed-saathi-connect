import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroFarmer from "@/assets/hero-farmer.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision Agriculture",
      description: "Leveraging GPS and AI technology to provide location-specific seed recommendations that maximize yield potential."
    },
    {
      icon: Users,
      title: "Farmer Empowerment",
      description: "Putting cutting-edge agricultural knowledge directly into the hands of farmers across India."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Ensuring access to only government-certified seeds with proven performance records."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Farmers Served" },
    { number: "25+", label: "States Covered" },
    { number: "300+", label: "Seed Varieties" },
    { number: "30%", label: "Average Yield Increase" }
  ];

  const partners = [
    "Indian Council of Agricultural Research (ICAR)",
    "National Seeds Corporation",
    "State Agricultural Universities",
    "Regional Seed Certification Agencies",
    "Progressive Farmer Organizations"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroFarmer})` }}
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Empowering Farmers with 
              <span className="block">Smart Seed Solutions</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Seed Saathi is India's first GPS-driven seed recommendation platform, 
              combining artificial intelligence with traditional farming knowledge to help 
              farmers make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                To democratize access to precision agriculture by providing every farmer 
                with personalized, location-specific seed recommendations powered by cutting-edge 
                technology and backed by scientific research.
              </p>
              
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A future where every Indian farmer has access to the best possible seeds 
                for their specific location and conditions, leading to increased productivity, 
                sustainability, and prosperity across rural India.
              </p>
            </div>

            <div className="relative">
              <img 
                src={heroFarmer}
                alt="Farmer using technology"
                className="rounded-lg shadow-natural w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-feature">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our mission to transform Indian agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 bg-gradient-to-b from-background to-accent/20 shadow-card hover:shadow-natural transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full mb-6 mx-auto shadow-glow">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gradient-earth">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How We Make It Happen
              </h2>
              <p className="text-lg text-muted-foreground">
                Our approach combines technology, research, and farmer insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Data Collection</h3>
                    <p className="text-muted-foreground">We gather comprehensive data on soil conditions, climate patterns, and regional agricultural practices.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                    <p className="text-muted-foreground">Our machine learning algorithms analyze this data to identify optimal seed varieties for specific locations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Expert Validation</h3>
                    <p className="text-muted-foreground">Agricultural experts and research institutions validate our recommendations for accuracy and reliability.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Farmer Delivery</h3>
                    <p className="text-muted-foreground">We deliver personalized recommendations through our user-friendly platform, complete with market insights.</p>
                  </div>
                </div>
              </div>

              <div className="bg-background/80 backdrop-blur rounded-lg p-8 shadow-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">Technology Stack</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• GPS-based location detection</li>
                  <li>• Machine learning recommendation engine</li>
                  <li>• Real-time weather data integration</li>
                  <li>• Market price analytics</li>
                  <li>• Soil health assessment tools</li>
                  <li>• Mobile-first responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Trusted Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Working with leading agricultural institutions and government bodies 
              to ensure the highest quality recommendations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center p-4 bg-accent/30 rounded-lg">
                  <Award className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground font-medium">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Join the Agricultural Revolution
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Be part of a growing community of farmers who are embracing technology 
            to improve their livelihoods and contribute to food security.
          </p>
          <Button 
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow"
            asChild
          >
            <Link to="/dashboard">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;