"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { GearItem } from "@/lib/types";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface SpecItem {
  key: string;
  value: string;
}

interface GearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<GearItem>) => void;
  initialData?: GearItem | null;
  categories: Category[];
}

export default function GearModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
}: GearModalProps) {
  const [formData, setFormData] = useState<Partial<GearItem>>({
    title: "",
    brand: "",
    pricePerDay: 0,
    stock: 0,
    isAvailable: true,
    description: "",
    categoryId: "",
  });

  // Local state to manage dynamic key-value specifications
  const [specs, setSpecs] = useState<SpecItem[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        brand: initialData.brand || "",
        pricePerDay: initialData.pricePerDay || 0,
        stock: initialData.stock || 0,
        isAvailable: initialData.isAvailable ?? true,
        description: initialData.description || "",
        categoryId: initialData.categoryId || "",
      });

      if (initialData.specifications) {
        const specArray = Object.entries(initialData.specifications).map(
          ([key, value]) => ({ key, value: String(value) }),
        );
        setSpecs(specArray);
      } else {
        setSpecs([]);
      }
    } else {
      setFormData({
        title: "",
        brand: "",
        pricePerDay: 0,
        stock: 0,
        isAvailable: true,
        description: "",
        categoryId: categories[0]?.id || "",
      });
      setSpecs([{ key: "", value: "" }]);
    }
  }, [initialData, isOpen, categories]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseFloat(value) || 0
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  const handleSpecChange = (
    index: number,
    field: "key" | "value",
    val: string,
  ) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleAddSpec = () => {
    setSpecs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const specificationsObj: Record<string, string> = {};
    specs.forEach((item) => {
      if (item.key.trim()) {
        specificationsObj[item.key.trim()] = item.value.trim();
      }
    });

    const payload = {
      ...formData,
      specifications: specificationsObj,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? "Edit Gear" : "Add New Gear"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Gear Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Inflatable Paddle Board"
            />
          </div>

          {/* Category & Brand */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleInputChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand || ""}
                onChange={handleInputChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Aqua Marina"
              />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Price per Day ($)
              </label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay || ""}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="18.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock || ""}
                onChange={handleInputChange}
                required
                min="0"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="5"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={3}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Describe the item..."
            />
          </div>

          {/* Key-Value Specifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Specifications
              </label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                <Plus size={14} /> Add Spec
              </button>
            </div>

            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Key (e.g. length)"
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecChange(index, "key", e.target.value)
                  }
                  className="w-1/2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 10.6 ft)"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  className="w-1/2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {specs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(index)}
                    className="p-1.5 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable || false}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 accent-blue-600"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mark as available for rental
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {initialData ? "Update Gear" : "Add Gear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
