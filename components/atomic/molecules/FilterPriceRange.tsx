"use client";

interface FilterPriceRangeProps {
  minPrice: number;
  maxPrice: number;
  priceMax: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onCommit: () => void;
}

const FilterPriceRange = ({
  minPrice,
  maxPrice,
  priceMax,
  onMinChange,
  onMaxChange,
  onCommit,
}: FilterPriceRangeProps) => {
  const rangeLeft = (minPrice / priceMax) * 100;
  const rangeWidth = ((maxPrice - minPrice) / priceMax) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-8">
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded bg-textSecondary/20" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-primary"
          style={{ left: `${rangeLeft}%`, width: `${rangeWidth}%` }}
        />
        <input
          type="range"
          min={0}
          max={priceMax}
          step={10}
          value={minPrice}
          onChange={(event) => onMinChange(Number(event.currentTarget.value))}
          onMouseUp={onCommit}
          onTouchEnd={onCommit}
          className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
        />
        <input
          type="range"
          min={0}
          max={priceMax}
          step={10}
          value={maxPrice}
          onChange={(event) => onMaxChange(Number(event.currentTarget.value))}
          onMouseUp={onCommit}
          onTouchEnd={onCommit}
          className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
        />
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          min={0}
          max={maxPrice}
          value={minPrice}
          onChange={(event) => {
            const value = Number(event.currentTarget.value);
            onMinChange(Number.isNaN(value) ? 0 : value);
          }}
          placeholder="Min"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          type="number"
          min={0}
          max={priceMax}
          value={maxPrice}
          onChange={(event) => {
            const value = Number(event.currentTarget.value);
            onMaxChange(Number.isNaN(value) ? priceMax : value);
          }}
          placeholder="Max"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
};

export default FilterPriceRange;
