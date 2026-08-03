"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  onFilterChange: (filters: FilterState) => void;
  isOpen?: boolean;
  onClose?: () => void;
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
  isOpen = false,
  onClose,
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

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700 lg:border-none">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="cursor-pointer text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <X size={14} />
              Reset
            </button>
          )}

          {/* Close button for Mobile/Tablet overlay */}
          {onClose && (
            <button
              onClick={onClose}
              className="cursor-pointer p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white lg:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between text-gray-900 dark:text-white font-semibold mb-3 hover:text-blue-600 transition-colors"
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
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 cursor-pointer accent-blue-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("brand")}
          className="w-full flex items-center justify-between text-gray-900 dark:text-white font-semibold mb-3 hover:text-blue-600 transition-colors"
        >
          Brand
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.brand ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.brand && (
          <div className="space-y-2">
            {brands.map((brand, id: number) => (
              <label
                key={id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 cursor-pointer accent-blue-600"
                />
                <span className="text-sm capitalize text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-gray-900 dark:text-white font-semibold mb-3 hover:text-blue-600 transition-colors"
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
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">
                Min: ${filters.priceRange[0]}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">
                Max: ${filters.priceRange[1]}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div>
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between text-gray-900 dark:text-white font-semibold mb-3 hover:text-blue-600 transition-colors"
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
                  className="w-4 h-4 cursor-pointer accent-blue-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply Button for Mobile */}
      {onClose && (
        <div className="pt-4 lg:hidden">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-fit sticky top-20 shadow-sm">
        {content}
      </aside>

      {/* Mobile / Tablet Overlay Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer Content Panel (Solid Background Fixed Here) */}
        <div
          className={`absolute inset-y-0 left-0 z-10 w-full max-w-xs bg-white dark:bg-gray-900 p-6 overflow-y-auto transition-transform duration-300 shadow-2xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {content}
        </div>
      </div>
    </>
  );
}
