import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sprout, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : [])
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-hero rounded-full">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Seed Saathi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.user_metadata?.full_name || 'Farmer'}
                  </span>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button className="bg-gradient-hero hover:bg-primary-light" asChild>
                    <Link to="/auth">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                        isActive(item.href)
                          ? "bg-accent text-primary"
                          : "text-muted-foreground hover:text-primary hover:bg-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          Welcome, {user.user_metadata?.full_name || 'Farmer'}
                        </div>
                        <Button 
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                          variant="outline" 
                          className="w-full"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/auth">Sign In</Link>
                        </Button>
                        <Button className="w-full bg-gradient-hero hover:bg-primary-light" asChild>
                          <Link to="/auth">Get Started</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;