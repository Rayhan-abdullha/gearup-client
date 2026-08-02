"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import GearTable from "../../_components/provider/gear-table";
import GearModal, { Category } from "../../_components/provider/gear-modal";
import type { GearItem } from "@/lib/types";
import { createGear } from "../../_actions/createGear";
import { toast } from "sonner";
import { deleteGear } from "../../_actions/deleteGear";
import { updateGear } from "../../_actions/updateGear";

export default function InventoryClient({
  initialGears,
  categories,
}: {
  initialGears: GearItem[];
  categories: Category[];
}) {
  const [gearList, setGearList] = useState<GearItem[]>(initialGears);
  const [showModal, setShowModal] = useState(false);
  const [editingGear, setEditingGear] = useState<GearItem | null>(null);

  const handleOpenModal = (gear?: GearItem) => {
    setEditingGear(gear || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGear(null);
  };

  const handleSubmit = async (formData: Partial<GearItem>) => {
    if (editingGear) {
      try {
        const result = await updateGear(editingGear.id, formData);
        if (result.success) {
          toast.success("Gear updated successfully!");
          setGearList((prev) =>
            prev.map((gear) => (gear.id === result.id ? result : gear)),
          );
          handleCloseModal();
        } else {
          toast.error(result.message || "Failed to update gear.");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        );
      }
    } else {
      try {
        const result = await createGear(formData);
        if (result.success) {
          toast.success("Gear created successfully!");
          handleCloseModal();
        } else {
          toast.error(result.message || "Failed to create gear.");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        );
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this gear?")) {
      ("use server");
      try {
        const result = await deleteGear(id);
        if (result.success) {
          toast.success("Gear deleted successfully!");
          setGearList((prev) => prev.filter((gear) => gear.id !== id));
        } else {
          toast.error(result.message || "Failed to delete gear.");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Inventory Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your gear listings, pricing, and availability
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Gear
        </button>
      </div>

      <GearTable
        gears={gearList}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <GearModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingGear}
        categories={categories}
      />
    </>
  );
}
