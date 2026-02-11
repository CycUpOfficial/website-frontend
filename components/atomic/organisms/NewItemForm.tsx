"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { createPostItem } from "@/actions";
import { cn } from "@/lib/utils";

import { FormCard, FormField } from "../molecules";
import { Button, FileInput, Input, Select, Text, Textarea } from "../atoms";
import PhotoUploadField from "./PhotoUploadField";

interface INewItemFormProps {
  type: "donate" | "post";
  className?: string;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50"
    >
      {pending ? "Posting..." : "Post Item"}
    </Button>
  );
};

const NewItemForm = ({ type, className }: INewItemFormProps) => {
  const [state, formAction] = useActionState(createPostItem, null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  return (
    <FormCard
      title={`${type === "donate" ? "Donate" : "Post"} an Item`}
      message={state?.message}
      isSuccess={state?.success}
      action={formAction}
      className={cn("w-full", className)}
    >
      {/* Title */}
      <FormField htmlFor="title" required error={state?.errors?.title}>
        <Input
          id="title"
          name="title"
          placeholder="Title*"
          required
          defaultValue={state?.values?.title}
          hasError={!!state?.errors?.title}
        />
      </FormField>

      {/* Category + Brand */}
      <div className="grid grid-cols-2 gap-4">
        <FormField htmlFor="category" required error={state?.errors?.category}>
          <Select
            id="category"
            name="category"
            required
            defaultValue={state?.values?.category ?? ""}
            hasError={!!state?.errors?.category}
          >
            <option value="">Category*</option>
            <option value="electronics">Electronics</option>
          </Select>
        </FormField>

        <FormField htmlFor="brand">
          <Input
            id="brand"
            name="brand"
            placeholder="Brand"
            defaultValue={state?.values?.brand}
          />
        </FormField>
      </div>

      {/* Type + Condition */}
      <div className="grid grid-cols-2 gap-4">
        <FormField htmlFor="type" required error={state?.errors?.type}>
          <Select
            id="type"
            name="type"
            required
            defaultValue={state?.values?.type ?? ""}
            hasError={!!state?.errors?.type}
          >
            <option value="">Type*</option>
            <option value="sell">Sell</option>
            <option value="donate">Donate</option>
          </Select>
        </FormField>

        <FormField
          htmlFor="condition"
          required
          error={state?.errors?.condition}
        >
          <Select
            id="condition"
            name="condition"
            required
            defaultValue={state?.values?.condition ?? ""}
            hasError={!!state?.errors?.condition}
          >
            <option value="">Condition*</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </Select>
        </FormField>
      </div>

      {/* Address */}
      <FormField htmlFor="address">
        <Input
          id="address"
          name="address"
          placeholder="Address"
          defaultValue={state?.values?.address}
        />
      </FormField>

      {/* City */}
      <FormField htmlFor="city">
        <Input
          id="city"
          name="city"
          placeholder="City"
          defaultValue={state?.values?.city}
        />
      </FormField>

      <PhotoUploadField
        name="photos"
        label="Upload Photos (max 4)"
        error={state?.errors?.photos}
        maxPhotos={4}
        onChange={setPhotoFiles}
      />

      {/* Description */}
      <FormField
        htmlFor="description"
        required
        error={state?.errors?.description}
      >
        <Textarea
          id="description"
          name="description"
          placeholder="Description*"
          defaultValue={state?.values?.description}
          hasError={!!state?.errors?.description}
        />
      </FormField>

      {/* Submit */}
      <div className="mt-8">
        <SubmitButton />
      </div>
    </FormCard>
  );
};

export default NewItemForm;
