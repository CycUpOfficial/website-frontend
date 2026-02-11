// src/components/molecules/PhotoUploader.tsx
"use client";
import { useRef, useState } from "react";
import { FileInput, PhotoSlot } from "../atoms";

interface PhotoUploaderProps {
  maxPhotos?: number;
  onChange?: (files: File[]) => void;
  hasError?: boolean;
}

const PhotoUploader = ({
  maxPhotos = 4,
  onChange,
  hasError,
}: PhotoUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => inputRef.current?.click();

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).slice(
      0,
      maxPhotos - files.length,
    );
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
    e.target.value = ""; // allow same file re-upload
  };

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const slots = Array.from({ length: maxPhotos }).map((_, index) => {
    const file = files[index];
    const isAddButton = index === files.length && files.length < maxPhotos;
    return (
      <PhotoSlot
        key={index}
        file={file}
        isAddButton={isAddButton}
        onClickAdd={isAddButton ? handleAddClick : undefined}
        onRemove={file ? () => handleRemove(index) : undefined}
      />
    );
  });

  return (
    <div
      className={`flex gap-2.5 ${hasError ? "border-red-500 p-1 rounded-md" : ""}`}
    >
      {slots}
      <FileInput
        ref={inputRef}
        onChange={handleFilesSelected}
        maxFiles={maxPhotos}
      />
    </div>
  );
};

export default PhotoUploader;
