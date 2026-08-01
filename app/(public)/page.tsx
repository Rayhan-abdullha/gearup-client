"use client";
import { useState, useMemo } from "react";

import { FilterSidebar, FilterState } from "./_components/filter-sidebar";
import { GearCard } from "./_components/gear/gear-card";
import Header from "./_components/gear/Header";

const MOCK_GEAR = [
  {
    id: "bb46e813-17ec-4003-b976-3f68e8100c73",
    title: "Inflatable Paddle Board",
    description: "Portable paddle board with pump and carrying bag.",
    brand: "Aqua Marina",
    category: "Water Sports",
    specifications: {
      length: "10.6 ft",
      material: "PVC",
    },
    pricePerDay: 18,
    stock: 6,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1618528298382-e1e9f3d82afd?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "1",
    title: "Camping Tent - 4 Person",
    description: "Weather-resistant dome tent with rainfly included.",
    brand: "Coleman",
    category: "Camping",
    specifications: {
      capacity: "4 Person",
      weight: "8.2 lbs",
    },
    pricePerDay: 25,
    stock: 12,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop",
    rating: 4.6,
  },
  {
    id: "2",
    title: "Mountain Bike - Full Suspension",
    description: 'High-performance mountain bike with 26" wheels.',
    brand: "Trek",
    category: "Cycling",
    specifications: {
      wheelSize: "26 inches",
      suspension: "Full",
    },
    pricePerDay: 45,
    stock: 8,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Kayak - Single Seater",
    description: "Stable and lightweight kayak perfect for beginners.",
    brand: "Lifetime",
    category: "Water Sports",
    specifications: {
      length: "9 ft",
      capacity: "275 lbs",
    },
    pricePerDay: 35,
    stock: 3,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=500&h=500&fit=crop",
    rating: 4.5,
  },
  {
    id: "4",
    title: "Climbing Harness & Gear Set",
    description:
      "Complete rock climbing gear including harness and carabiners.",
    brand: "Black Diamond",
    category: "Climbing",
    specifications: {
      type: "Full Safety Set",
      capacity: "300 lbs",
    },
    pricePerDay: 40,
    stock: 0,
    isAvailable: false,
    image:
      "https://images.unsplash.com/photo-1606856110002-d0991ce78474?w=500&h=500&fit=crop",
    rating: 4.7,
  },
  {
    id: "5",
    title: "Snorkel Gear Set",
    description: "Complete snorkeling set with mask, fins, and snorkel.",
    brand: "Cressi",
    category: "Water Sports",
    specifications: {
      material: "Silicone & Rubber",
      sizes: "Adjustable",
    },
    pricePerDay: 15,
    stock: 15,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c006a276?w=500&h=500&fit=crop",
    rating: 4.4,
  },
  {
    id: "6",
    title: "Backpack - 60L Hiking",
    description: "Durable backpack with rain cover for multi-day hiking.",
    brand: "Osprey",
    category: "Hiking",
    specifications: {
      capacity: "60L",
      weight: "2.5 lbs",
    },
    pricePerDay: 22,
    stock: 10,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: 4.8,
  },
  {
    id: "7",
    title: "Skateboard - Professional",
    description: "Professional grade skateboard with ABEC-7 bearings.",
    brand: "Loaded",
    category: "Skateboarding",
    specifications: {
      wheelSize: "53mm",
      material: "Maple Wood",
    },
    pricePerDay: 20,
    stock: 6,
    isAvailable: true,
    image:
      "https://images.unsplash.com/photo-1616277176819-d91a6a0bc5f1?w=500&h=500&fit=crop",
    rating: 4.6,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 100],
    availability: "all",
  });

  // Get unique categories and brands
  const categories = Array.from(new Set(MOCK_GEAR.map((g) => g.category)));
  const brands = Array.from(new Set(MOCK_GEAR.map((g) => g.brand)));

  // Filter gear based on search and filters
  const filteredGear = useMemo(() => {
    return MOCK_GEAR.filter((gear) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        gear.title.toLowerCase().includes(searchLower) ||
        gear.description.toLowerCase().includes(searchLower) ||
        gear.brand.toLowerCase().includes(searchLower) ||
        gear.category.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(gear.category);

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
              categories={categories}
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
                    category={gear.category}
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
