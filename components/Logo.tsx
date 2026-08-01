import { Zap } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <Zap className="text-primary" size={28} />
      <Link
        href="/"
        className="text-2xl font-bold text-gray-900 dark:text-white"
      >
        GearHub
      </Link>
    </div>
  );
};

export default Logo;
