"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  availability: "all" | "available" | "unavailable";
}

export function FilterSidebar({
  categories,
  brands,
  onFilterChange,
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 100],
    availability: "all",
  });

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    category: true,
    brand: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];

    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number, index: 0 | 1) => {
    const newRange: [number, number] = [...filters.priceRange] as [
      number,
      number,
    ];
    newRange[index] = value;
    const newFilters = { ...filters, priceRange: newRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAvailabilityChange = (
    value: "all" | "available" | "unavailable",
  ) => {
    const newFilters = { ...filters, availability: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
      categories: [],
      brands: [],
      priceRange: [0, 100],
      availability: "all",
    };
    setFilters(resetState);
    onFilterChange(resetState);
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100 ? 1 : 0);

  return (
    <div className="bg-background-secondary rounded-lg p-6 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-foreground">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-primary hover:text-primary-light flex items-center gap-1 transition-colors"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between text-foreground font-semibold mb-3 hover:text-primary transition-colors"
        >
          Category
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.category ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 rounded border-border cursor-pointer accent-primary"
                />
                <span className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection("brand")}
          className="w-full flex items-center justify-between text-foreground font-semibold mb-3 hover:text-primary transition-colors"
        >
          Brand
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.brand ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.brand && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 rounded border-border cursor-pointer accent-primary"
                />
                <span className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-foreground font-semibold mb-3 hover:text-primary transition-colors"
        >
          Price Range
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-foreground-secondary mb-2 block">
                Min: ${filters.priceRange[0]}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div>
              <label className="text-xs text-foreground-secondary mb-2 block">
                Max: ${filters.priceRange[1]}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div>
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between text-foreground font-semibold mb-3 hover:text-primary transition-colors"
        >
          Availability
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.availability ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.availability && (
          <div className="space-y-2">
            {[
              { value: "all", label: "All Items" },
              { value: "available", label: "Available" },
              { value: "unavailable", label: "Out of Stock" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="availability"
                  value={value}
                  checked={filters.availability === value}
                  onChange={() =>
                    handleAvailabilityChange(
                      value as "all" | "available" | "unavailable",
                    )
                  }
                  className="w-4 h-4 cursor-pointer accent-primary"
                />
                <span className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
