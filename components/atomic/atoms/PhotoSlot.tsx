// src/components/atoms/PhotoSlot.tsx
import { cn } from "@/lib/utils";

interface PhotoSlotProps {
  file?: File;
  isAddButton?: boolean;
  onClickAdd?: () => void;
  onRemove?: () => void;
}

const PhotoSlot = ({
  file,
  isAddButton,
  onClickAdd,
  onRemove,
}: PhotoSlotProps) => {
  return (
    <div
      className={`relative w-[170px] h-[170px] rounded-[15px] flex items-center justify-center overflow-hidden ${isAddButton ? "bg-primary-1" : "bg-gray-100"}`}
    >
      {file ? (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt="upload-preview"
            className="w-full h-full object-cover"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ×
            </button>
          )}
        </>
      ) : isAddButton ? (
        <button
          type="button"
          onClick={onClickAdd}
          className="text-[40px] font-medium text-primary"
        >
          +
        </button>
      ) : null}
    </div>
  );
};

export default PhotoSlot;
