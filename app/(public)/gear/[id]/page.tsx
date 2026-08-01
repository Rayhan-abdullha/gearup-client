"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Star, MapPin, ChevronLeft, Clock, AlertCircle } from "lucide-react";
import { ImageGallery } from "../../_components/gear/image-gallery";
import { DateRangePicker } from "../../_components/gear/date-range-picker";

// Mock data - in production this would come from an API
const MOCK_GEAR_DETAIL: Record<string, any> = {
  "bb46e813-17ec-4003-b976-3f68e8100c73": {
    id: "bb46e813-17ec-4003-b976-3f68e8100c73",
    title: "Inflatable Paddle Board",
    description: "Portable paddle board with pump and carrying bag.",
    brand: "Aqua Marina",
    category: "Water Sports",
    pricePerDay: 18,
    stock: 6,
    isAvailable: true,
    rating: 4.8,
    reviews: 24,
    images: [
      "https://images.unsplash.com/photo-1618528298382-e1e9f3d82afd?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=800&fit=crop",
    ],
    specifications: {
      length: "10.6 ft",
      width: "2.6 ft",
      material: "PVC",
      weight: "17 lbs",
      capacity: "287 lbs",
      color: "White with Blue Trim",
      thickness: "4.7 inches",
    },
    features: [
      "Drop-Stitch technology for rigidity",
      "Includes aluminum paddle",
      "High-pressure pump included",
      "Carrying bag with shoulder strap",
      "Non-slip EVA deck pad",
      "Bungee cord attachment system",
      "Multiple handles for transport",
      "Perfect for beginners and intermediate",
    ],
    provider: {
      name: "Coastal Sports Rentals",
      location: "Santa Monica Beach, CA",
      phone: "+1 (310) 555-0147",
      rating: 4.9,
      reviews: 156,
    },
    policies: {
      cancellation: "Free cancellation up to 24 hours before rental",
      deposit: "$50 refundable deposit required",
      damages: "Standard wear and tear is covered",
      delivery: "Local delivery available for additional fee",
    },
  },
};

export default function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const gear = MOCK_GEAR_DETAIL[id];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!gear) {
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
  }

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return days * gear.pricePerDay * quantity;
  };

  const handleRentNow = () => {
    if (!startDate || !endDate) {
      alert("Please select rental dates");
      return;
    }
    // In production, this would proceed to checkout
    console.log({
      gearId: gear.id,
      startDate,
      endDate,
      quantity,
      totalPrice: calculateTotalPrice(),
    });
    alert("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Browse
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <ImageGallery images={gear.images} title={gear.title} />
          </div>

          {/* Details */}
          <div>
            {/* Title & Rating */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    {gear.category} • {gear.brand}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {gear.title}
                  </h1>
                </div>
              </div>

              <p className="text-foreground-secondary mb-4">
                {gear.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.floor(gear.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">
                    {gear.rating}
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary">
                  ({gear.reviews} reviews)
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 p-6 bg-background-secondary rounded-lg border border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ${gear.pricePerDay}
                </span>
                <span className="text-foreground-secondary">/day</span>
              </div>
              {calculateTotalPrice() > 0 && (
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-sm text-foreground-secondary mb-1">
                    Total for rental:
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    ${calculateTotalPrice()}
                  </p>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="mb-8">
              {gear.isAvailable ? (
                <div className="flex items-center gap-2 p-4 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <p className="text-success font-medium">
                    {gear.stock} available in stock
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-4 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-20">
                  <AlertCircle size={18} className="text-red-500" />
                  <p className="text-red-500 font-medium">Out of Stock</p>
                </div>
              )}
            </div>

            {/* Date Picker & Booking */}
            <div className="space-y-6">
              <DateRangePicker onDateRangeChange={handleDateRangeChange} />

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-foreground w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(gear.stock, quantity + 1))
                    }
                    disabled={quantity >= gear.stock}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rent Now Button */}
              <button
                onClick={handleRentNow}
                disabled={!gear.isAvailable}
                className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rent Now
              </button>
            </div>

            {/* Provider Info */}
            <div className="mt-8 p-6 bg-background-secondary rounded-lg">
              <h3 className="font-semibold text-foreground mb-4">Provider</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-foreground-secondary">Name</p>
                  <p className="font-medium text-foreground">
                    {gear.provider.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Location</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    {gear.provider.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Rating</p>
                  <p className="font-medium text-foreground">
                    {gear.provider.rating} ⭐ ({gear.provider.reviews} reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Features */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Specifications
            </h2>
            <div className="space-y-3">
              {Object.entries(gear.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                >
                  <span className="text-foreground-secondary capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="font-medium text-foreground">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Features & Inclusions
            </h2>
            <ul className="space-y-2">
              {gear.features.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-background-secondary rounded-lg"
                >
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rental Policies */}
        <div className="mt-16 p-8 bg-background-secondary rounded-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Rental Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(gear.policies).map(([key, value]) => (
              <div key={key}>
                <h3 className="font-semibold text-foreground mb-2 capitalize flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <p className="text-foreground-secondary">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
