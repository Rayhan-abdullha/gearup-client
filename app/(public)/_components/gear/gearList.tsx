"use client";
import { useState, useMemo } from "react";
import { FilterSidebar, FilterState } from "../filter-sidebar";
import { GearCard } from "./gear-card";
import Header from "./Header";

interface Gear {
  id: string;
  title: string;
  description: string;
  brand: string;
  specifications: {
    [key: string]: string;
  };
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
  image: string;
  rating?: number;
  providerId: string;
  categoryId: string;
  category: {
    name: string;
    slug: string;
  };
}
export default function GearList({ gears }: { gears: Gear[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 100],
    availability: "all",
  });

  // Get unique categories and brands
  const categories = Array.from(new Set(gears.map((g) => g.category)));
  const brands = Array.from(new Set(gears.map((g) => g.brand)));

  // Filter gear based on search and filters
  const filteredGear = useMemo(() => {
    return gears.filter((gear) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        gear.title.toLowerCase().includes(searchLower) ||
        gear.description.toLowerCase().includes(searchLower) ||
        gear.brand.toLowerCase().includes(searchLower) ||
        gear.category.name.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(gear.category.slug);

      // Brand filter
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(gear.brand);

      // Price filter
      const matchesPrice =
        gear.pricePerDay >= filters.priceRange[0] &&
        gear.pricePerDay <= filters.priceRange[1];

      // Availability filter
      const matchesAvailability =
        filters.availability === "all" ||
        (filters.availability === "available" && gear.isAvailable) ||
        (filters.availability === "unavailable" && !gear.isAvailable);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesAvailability
      );
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header setSearchQuery={setSearchQuery} />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              categories={categories.map((c) => c.name)}
              brands={brands}
              onFilterChange={setFilters}
            />
          </div>

          {/* Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Available Gear
              </h2>
              <p className="text-foreground-secondary">
                {filteredGear.length}{" "}
                {filteredGear.length === 1 ? "item" : "items"} found
              </p>
            </div>

            {/* Gear Grid */}
            {filteredGear.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGear.map((gear) => (
                  <GearCard
                    key={gear.id}
                    id={gear.id}
                    title={gear.title}
                    description={gear.description}
                    image={gear.image}
                    pricePerDay={gear.pricePerDay}
                    category={gear.category.name}
                    brand={gear.brand}
                    isAvailable={gear.isAvailable}
                    stock={gear.stock}
                    rating={gear.rating}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-background-secondary rounded-lg p-12">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No gear found
                  </h3>
                  <p className="text-foreground-secondary mb-6">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({
                        categories: [],
                        brands: [],
                        priceRange: [0, 100],
                        availability: "all",
                      });
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
