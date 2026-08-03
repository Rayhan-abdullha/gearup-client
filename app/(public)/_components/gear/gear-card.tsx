"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";

interface GearCardProps {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  category: string;
  brand: string;
  isAvailable: boolean;
  stock: number;
  rating?: number;
  images: string[];
}

export function GearCard({
  id,
  title,
  description,
  images,
  pricePerDay,
  category,
  brand,
  isAvailable,
  stock,
  rating = 4.5,
}: GearCardProps) {
  return (
    <Link href={`/gear/${id}`}>
      <div className="group cursor-pointer rounded-lg border border-border bg-background overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-background-secondary">
          <Image
            src={
              (images[0] as string) ||
              "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop"
            }
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
          {isAvailable && stock <= 3 && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Low Stock ({stock})
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Brand */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {category}
            </span>
            <span className="text-xs text-foreground-secondary">{brand}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground-secondary line-clamp-2 mb-3">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-border"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-foreground-secondary">
              ({rating})
            </span>
          </div>

          {/* Price & Availability */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">${pricePerDay}</p>
              <p className="text-xs text-foreground-secondary">per day</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isAvailable
                  ? "bg-success bg-opacity-10 text-success"
                  : "bg-red-500 bg-opacity-10 text-red-500"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
