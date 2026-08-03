"use client";

interface ImageInputsProps {
  value: string[];
  onChange: (images: string[]) => void;
}

export default function ImageInputs({ value, onChange }: ImageInputsProps) {
  const handleChange = (index: number, newValue: string) => {
    const updatedImages = [...value];
    updatedImages[index] = newValue;
    onChange(updatedImages);
  };

  const addImageInput = () => {
    onChange([...value, ""]);
  };

  const removeImageInput = (index: number) => {
    // Keep at least one input
    if (value.length === 1) return;

    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Images
      </label>

      <div className="mt-2 space-y-3">
        {value.map((image, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={image}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />

            {value.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageInput(index)}
                className="rounded-lg border border-red-300 px-3 text-red-600 hover:bg-red-50"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addImageInput}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        + Add Image
      </button>
    </div>
  );
}
