import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-8xl">🍭</div>
        <h1 className="text-4xl font-bold bg-gradient-sweet bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl text-muted-foreground">
          Oops! This sweet treat doesn't exist
        </p>
        <p className="text-muted-foreground">
          The page you're looking for seems to have been eaten up!
        </p>
        <Button asChild variant="hero" size="lg">
          <Link to="/dashboard">
            <Home className="h-4 w-4 mr-2" />
            Return to Sweet Shop
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
