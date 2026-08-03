"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { FilterSidebar, FilterState } from "../filter-sidebar";
import { GearCard } from "./gear-card";
import Header from "./Header";
import { Category } from "@/lib/types";
import { getGears } from "../../_actions/getGear";
import { SlidersHorizontal } from "lucide-react";

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
  images: string[];
  rating?: number;
  providerId: string;
  categoryId: string;
  category: {
    name: string;
    slug: string;
  };
}

export default function GearList({
  gears,
  categories,
}: {
  gears: Gear[];
  categories: Category[];
}) {
  const [searchGears, setSearchGears] = useState<Gear[]>(gears);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 100],
    availability: "all",
  });

  const isFirstRender = useRef(true);

  const brands = Array.from(new Set(gears.map((g) => g.brand)));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await getGears({
          searchTerm: searchQuery || undefined,
          category: filters.categories.length > 0 ? filters.categories : [],
          brand: filters.brands.length > 0 ? filters.brands : [],
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          isAvailable:
            filters.availability === "all"
              ? undefined
              : filters.availability === "available"
                ? true
                : false,
        });

        setSearchGears(res?.data ?? []);
      } catch (error) {
        console.error("Failed to search gears:", error);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
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
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </div>

          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Available Gear
              </h2>

              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="cursor-pointer lg:hidden flex items-center gap-2 px-4 py-2 bg-background-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-border/20 transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>

            {/* Gear Grid */}
            {searchGears.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchGears.map((gear, id: number) => (
                  <GearCard
                    key={id}
                    id={gear.id}
                    title={gear.title}
                    description={gear.description}
                    images={gear.images}
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
