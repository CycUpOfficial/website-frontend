"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { createPostItem, type FormState, updatePostItem } from "@/actions";
import { cn } from "@/lib/utils";
import { ItemCategory, ItemCity } from "@/types";

import { FormCard, FormField } from "../molecules";
import { Button, Input, Select, Textarea } from "../atoms";
import PhotoUploadField from "./PhotoUploadField";
import PostPurposeSection from "./PostPurposeSection";

interface INewItemFormProps {
  type: "donate" | "post";
  mode?: "create" | "edit";
  itemId?: string;
  initialValues?: Record<string, string | undefined>;
  categories?: ItemCategory[];
  cities?: ItemCity[];
  className?: string;
}

const SubmitButton = ({ mode }: { mode: "create" | "edit" }) => {
  const { pending } = useFormStatus();
  const defaultLabel = mode === "edit" ? "Save Changes" : "Post Item";
  const pendingLabel = mode === "edit" ? "Saving..." : "Posting...";

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50"
    >
      {pending ? pendingLabel : defaultLabel}
    </Button>
  );
};

const NewItemForm = ({
  type,
  mode = "create",
  itemId,
  initialValues,
  categories = [],
  cities = [],
  className,
}: INewItemFormProps) => {
  const actionHandler: (
    state: FormState,
    payload: FormData,
  ) => Promise<FormState> =
    mode === "edit" && itemId
      ? updatePostItem.bind(null, itemId)
      : createPostItem;

  const [state, formAction] = useActionState(actionHandler, null);
  const [, setPhotoFiles] = useState<File[]>([]);
  const values = state?.values ?? initialValues;
  const purposeDefaultValue =
    values?.itemType === "selling" ||
    values?.itemType === "lending" ||
    values?.itemType === "giveaway"
      ? values?.itemType
      : undefined;

  const categoryOptions = categories.flatMap((category) => {
    if (category.children?.length) {
      return category.children.map((child) => ({
        id: child.id,
        label: `${category.name} / ${child.name}`,
      }));
    }

    return [{ id: category.id, label: category.name }];
  });

  return (
    <FormCard
      title={
        mode === "edit"
          ? "Edit Item"
          : `${type === "donate" ? "Donate" : "Post"} an Item`
      }
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
          defaultValue={values?.title}
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
            defaultValue={values?.categoryId ?? ""}
            hasError={!!state?.errors?.categoryId}
          >
            <option value="">Category*</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
            {values?.categoryId &&
              !categoryOptions.some(
                (option) => option.id === values.categoryId,
              ) && (
                <option value={values.categoryId}>{values.categoryId}</option>
              )}
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
            defaultValue={values?.brandName}
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
          defaultValue={values?.condition ?? ""}
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
          defaultValue={values?.address}
          hasError={!!state?.errors?.address}
        />
      </FormField>

      {/* City */}
      <FormField htmlFor="cityId" required error={state?.errors?.cityId}>
        <Select
          id="cityId"
          name="cityId"
          required
          defaultValue={values?.cityId}
          hasError={!!state?.errors?.cityId}
        >
          <option value="">City*</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
          {values?.cityId &&
            !cities.some((city) => String(city.id) === values.cityId) && (
              <option value={values.cityId}>{values.cityId}</option>
            )}
        </Select>
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
          defaultValue={values?.description}
          hasError={!!state?.errors?.description}
        />
      </FormField>

      <PostPurposeSection
        errors={state?.errors}
        values={values}
        defaultValue={purposeDefaultValue}
      />

      {/* Submit */}
      <div className="mt-8">
        <SubmitButton mode={mode} />
      </div>
    </FormCard>
  );
};

export default NewItemForm;
