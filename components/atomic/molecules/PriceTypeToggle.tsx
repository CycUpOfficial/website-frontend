"use client"; // Needs interactivity for clicking

import { useState } from "react";

const options = ["giveaway", "selling", "lending"] as const;
type PriceType = (typeof options)[number];

const PriceTypeToggle = () => {
  const [selected, setSelected] = useState<PriceType>("giveaway");

  return (
    <div className="flex gap-2 mb-4">
      {/* Hidden input ensures the value is submitted with FormData */}
      <input type="hidden" name="priceType" value={selected} />

      {options.map((option) => (
        <button
          key={option}
          type="button" // Ensure clicking doesn't submit the form
          onClick={() => setSelected(option)}
          className={`px-4 py-2 text-sm font-medium rounded-md capitalize ${
            selected === option
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PriceTypeToggle;
