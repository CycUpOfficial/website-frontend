"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { createPostItem } from "@/actions";
import { cn } from "@/lib/utils";

import { FormCard, FormField } from "../molecules";
import { Button, Input, Select, Textarea } from "../atoms";
import PhotoUploadField from "./PhotoUploadField";
import PostPurposeSection from "./PostPurposeSection";

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
  const [, setPhotoFiles] = useState<File[]>([]);
  const purposeDefaultValue =
    state?.values?.itemType === "selling" ||
    state?.values?.itemType === "lending" ||
    state?.values?.itemType === "giveaway"
      ? state?.values?.itemType
      : undefined;

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
          maxLength={100}
          defaultValue={state?.values?.title}
          hasError={!!state?.errors?.title}
        />
      </FormField>

      {/* Category + Brand */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          htmlFor="categoryId"
          required
          error={state?.errors?.categoryId}
        >
          <Select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={state?.values?.categoryId ?? ""}
            hasError={!!state?.errors?.categoryId}
          >
            <option value="">Category*</option>
            <option value="1">Electronics</option>
          </Select>
        </FormField>

        <FormField
          htmlFor="brandName"
          required
          error={state?.errors?.brandName}
        >
          <Input
            id="brandName"
            name="brandName"
            placeholder="Brand name*"
            required
            defaultValue={state?.values?.brandName}
            hasError={!!state?.errors?.brandName}
          />
        </FormField>
      </div>

      {/* Type + Condition */}
      <FormField htmlFor="condition" required error={state?.errors?.condition}>
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

      {/* Address */}
      <FormField htmlFor="address" required error={state?.errors?.address}>
        <Input
          id="address"
          name="address"
          placeholder="Address*"
          required
          defaultValue={state?.values?.address}
          hasError={!!state?.errors?.address}
        />
      </FormField>

      {/* City */}
      <FormField htmlFor="cityId" required error={state?.errors?.cityId}>
        <Input
          id="cityId"
          name="cityId"
          type="number"
          min="1"
          placeholder="City ID*"
          required
          defaultValue={state?.values?.cityId}
          hasError={!!state?.errors?.cityId}
        />
      </FormField>

      <PhotoUploadField
        name="photos"
        label="Upload Photos (max 3)"
        error={state?.errors?.photos}
        maxPhotos={3}
        onChange={setPhotoFiles}
      />

      <input type="hidden" name="mainPhotoIndex" value="0" />

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
          maxLength={1000}
          defaultValue={state?.values?.description}
          hasError={!!state?.errors?.description}
        />
      </FormField>

      <PostPurposeSection
        errors={state?.errors}
        values={state?.values}
        defaultValue={purposeDefaultValue}
      />

      {/* Submit */}
      <div className="mt-8">
        <SubmitButton />
      </div>
    </FormCard>
  );
};

export default NewItemForm;
