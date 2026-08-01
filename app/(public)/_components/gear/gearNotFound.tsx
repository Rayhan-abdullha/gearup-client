import { Link } from "lucide-react";

const GearNotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Gear Not Found
        </h1>

        <Link
          href="/"
          className="text-primary hover:text-primary-light transition-colors"
        >
          ← Back to Browse
        </Link>
      </div>
    </div>
  );
};

export default GearNotFound;
