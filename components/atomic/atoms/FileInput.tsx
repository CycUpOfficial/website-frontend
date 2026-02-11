// src/components/atoms/FileInput.tsx
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  maxFiles?: number;
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ maxFiles = 4, ...props }, ref) => (
    <input
      type="file"
      multiple
      accept=".jpg,.jpeg,.png"
      {...props}
      ref={ref}
      className="hidden"
    />
  ),
);

FileInput.displayName = "FileInput";
export default FileInput;
