"use client";

import { useState } from "react";
import { DateRangePicker } from "./date-range-picker";
import { createOrder } from "../../_actions/create-order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type GearBookingProps = {
  gearId: string;
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
};

export default function GearBooking({
  gearId,
  pricePerDay,
  stock,
  isAvailable,
}: GearBookingProps) {
  const [pending, setPending] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference = end.getTime() - start.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();

  const totalPrice = days > 0 ? days * pricePerDay * quantity : 0;

  const handleRentNow = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select a valid date range");
      return;
    }

    if (days <= 0) {
      toast.error("End date must be after start date");
      return;
    }
    const bookingData = {
      items: [
        {
          gearId,
          startDate,
          endDate,
          quantity,
        },
      ],
    };

    try {
      setPending(true);
      const res = await createOrder(bookingData);
      if (res.success) {
        toast.success("Booking successful!");
        router.push("/customer-dashboard/rentals");
      } else {
        toast.error(res.message || "Failed to create booking.");
      }
    } catch (error) {
      toast.error("Failed to create booking.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-foreground-secondary mb-2">
          Quantity
        </label>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            disabled={quantity <= 1}
            className="px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            −
          </button>

          <span className="text-2xl font-bold text-foreground w-8 text-center">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((current) => Math.min(stock, current + 1))
            }
            disabled={quantity >= stock}
            className="px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Summary */}
      {days > 0 && (
        <div className="p-5 bg-background-secondary rounded-lg border border-border">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-foreground-secondary">Price per day</span>

              <span className="text-foreground">${pricePerDay}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-foreground-secondary">Rental days</span>

              <span className="text-foreground">{days}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-foreground-secondary">Quantity</span>

              <span className="text-foreground">{quantity}</span>
            </div>

            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>

              <span className="text-2xl font-bold text-primary">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Rent Now */}
      <button
        type="button"
        onClick={handleRentNow}
        disabled={!isAvailable || stock <= 0 || pending}
        className="cursor-pointer w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Processing..." : "Rent Now"}
      </button>
    </div>
  );
}
