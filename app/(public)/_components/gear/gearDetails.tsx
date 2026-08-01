import Link from "next/link";
import { Star, ChevronLeft, Clock, AlertCircle } from "lucide-react";

import { getSingleGear } from "../../_actions/getSingleGear";
import GearBooking from "./gear-booking";
import GearNotFound from "./gearNotFound";
import { ImageGallery } from "../../_components/gear/image-gallery";

type Review = {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  gearId: string;
  createdAt: string;
  updatedAt: string;
};

type Gear = {
  id: string;
  title: string;
  description: string;
  brand: string;
  specifications: Record<string, string>;
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  images?: string[];

  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };

  reviews?: Review[];
};

type GearDetailProps = {
  id: string;
};

export async function GearDetail({ id }: GearDetailProps) {
  const res = await getSingleGear(id);
  const gear: Gear | null = res?.data;

  if (!gear) {
    return <GearNotFound />;
  }

  const averageRating = gear.reviews?.length
    ? gear.reviews.reduce((total, review) => total + review.rating, 0) /
      gear.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <div className="mb-8">
              {gear.images?.length ? (
                <ImageGallery images={gear.images} title={gear.title} />
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-background-secondary border border-border flex items-center justify-center">
                  <span className="text-foreground-secondary">
                    No image available
                  </span>
                </div>
              )}
            </div>

            {/* Gear Details */}
            <div>
              {/* Category + Brand */}
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                {gear.category?.name} • {gear.brand}
              </p>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {gear.title}
              </h1>

              {/* Description */}
              <p className="text-foreground-secondary leading-relaxed mb-5">
                {gear.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={18}
                        className={
                          index < Math.round(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>

                  <span className="font-semibold text-foreground">
                    {averageRating.toFixed(1)}
                  </span>
                </div>

                <span className="text-sm text-foreground-secondary">
                  ({gear.reviews?.length ?? 0}{" "}
                  {gear.reviews?.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-5">
                Specifications
              </h2>

              {gear.specifications &&
              Object.keys(gear.specifications).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(gear.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4 p-4 bg-background-secondary rounded-lg border border-border"
                    >
                      <span className="text-foreground-secondary capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>

                      <span className="font-medium text-foreground">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 rounded-lg bg-background-secondary border border-border">
                  <p className="text-foreground-secondary">
                    No specifications available.
                  </p>
                </div>
              )}
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-5">
                Reviews
              </h2>

              {gear.reviews?.length ? (
                <div className="space-y-4">
                  {gear.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-5 rounded-lg bg-background-secondary border border-border"
                    >
                      <div className="flex items-center justify-between mb-3">
                        {/* Stars */}
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              size={15}
                              className={
                                index < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-border"
                              }
                            />
                          ))}
                        </div>

                        {/* Date */}
                        <span className="text-xs text-foreground-secondary">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="text-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 rounded-lg bg-background-secondary border border-border">
                  <p className="text-foreground-secondary">No reviews yet.</p>
                </div>
              )}
            </section>
          </div>

          <div>
            <div className="lg:sticky lg:top-6">
              {/* Price */}
              <div className="p-6 bg-background-secondary rounded-xl border border-border mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    ${gear.pricePerDay}
                  </span>

                  <span className="text-foreground-secondary">/day</span>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                {gear.isAvailable && gear.stock > 0 ? (
                  <div className="flex items-center gap-2 p-4 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
                    <div className="w-2 h-2 rounded-full bg-success" />

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

              {/* Booking */}
              <GearBooking
                gearId={gear.id}
                pricePerDay={gear.pricePerDay}
                stock={gear.stock}
                isAvailable={gear.isAvailable}
              />

              {/* Rental Information */}
              <div className="mt-8 p-6 bg-background-secondary rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  Rental Information
                </h3>

                <div className="space-y-4">
                  {/* Daily Rental */}
                  <div className="flex gap-3">
                    <Clock size={18} className="text-primary" />

                    <div>
                      <p className="font-medium text-foreground">
                        Daily Rental
                      </p>

                      <p className="text-sm text-foreground-secondary">
                        ${gear.pricePerDay} per day
                      </p>
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="flex gap-3">
                    <Clock size={18} className="text-primary" />

                    <div>
                      <p className="font-medium text-foreground">
                        Available Stock
                      </p>

                      <p className="text-sm text-foreground-secondary">
                        {gear.stock} unit
                        {gear.stock !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex gap-3">
                    <Clock size={18} className="text-primary" />

                    <div>
                      <p className="font-medium text-foreground">Category</p>

                      <p className="text-sm text-foreground-secondary">
                        {gear.category?.name ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="flex gap-3">
                    <Clock size={18} className="text-primary" />

                    <div>
                      <p className="font-medium text-foreground">Brand</p>

                      <p className="text-sm text-foreground-secondary">
                        {gear.brand}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
