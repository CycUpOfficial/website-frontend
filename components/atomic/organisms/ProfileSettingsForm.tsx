"use client";

import { useMemo, useRef, useState } from "react";

import { updateUserProfile } from "@/services";
import type { ItemCity, UpdateUserProfileRequest, UserProfile } from "@/types";
import { ProfileSVG } from "@/components/icons";
import { Button, FileInput, Input, Select, Text } from "../atoms";
import { FormCard, FormField } from "../molecules";

interface ProfileSettingsFormProps {
  initialProfile: UserProfile | null;
  cities: ItemCity[];
}

const ProfileSettingsForm = ({
  initialProfile,
  cities,
}: ProfileSettingsFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaults = useMemo(
    () => ({
      firstName: initialProfile?.firstName ?? "",
      familyName: initialProfile?.familyName ?? "",
      address: initialProfile?.address ?? "",
      postalCode: initialProfile?.postalCode ?? "",
      city: initialProfile?.city ?? "",
      phoneNumber: initialProfile?.phoneNumber ?? "",
      profileImage: initialProfile?.profileImage ?? "",
    }),
    [initialProfile],
  );

  const [profileImageValue, setProfileImageValue] = useState(
    defaults.profileImage,
  );

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleSelectedImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const encodedImage =
        typeof reader.result === "string" ? reader.result : "";
      setProfileImageValue(encodedImage);
    };
    reader.readAsDataURL(selectedFile);
    event.target.value = "";
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(undefined);
    setIsSuccess(undefined);

    const payload: UpdateUserProfileRequest = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      familyName: String(formData.get("familyName") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      postalCode: String(formData.get("postalCode") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      phoneNumber: String(formData.get("phoneNumber") ?? "").trim(),
      profileImage:
        String(formData.get("profileImage") ?? "").trim() || undefined,
    };

    const response = await updateUserProfile(payload);

    if (response.success) {
      setIsSuccess(true);
      setMessage("Profile updated successfully.");
    } else {
      setIsSuccess(false);
      setMessage(response.error || "Failed to update profile.");
    }

    setIsSubmitting(false);
  };

  return (
    <FormCard
      title="Profile Settings"
      message={message}
      isSuccess={isSuccess}
      action={handleSubmit}
      className="p-0"
    >
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <div className="flex h-32 w-32 items-center bg-primary justify-center overflow-hidden rounded-full border border-textSecondary/20">
            {profileImageValue ? (
              <img
                src={profileImageValue}
                alt="Current profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <ProfileSVG width={72} height={72} />
            )}
          </div>

          <Button
            type="button"
            onClick={handlePickImage}
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-textSecondary/20 bg-white text-sm font-bold text-primary"
            aria-label="Edit profile image"
          >
            ✎
          </Button>

          <FileInput
            ref={fileInputRef}
            multiple={false}
            onChange={handleSelectedImage}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="First Name" htmlFor="firstName" required>
          <Input
            id="firstName"
            name="firstName"
            required
            placeholder="First name"
            defaultValue={defaults.firstName}
          />
        </FormField>

        <FormField label="Family Name" htmlFor="familyName" required>
          <Input
            id="familyName"
            name="familyName"
            required
            placeholder="Family name"
            defaultValue={defaults.familyName}
          />
        </FormField>
      </div>

      <FormField label="Address" htmlFor="address" required>
        <Input
          id="address"
          name="address"
          required
          placeholder="Address"
          defaultValue={defaults.address}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Postal Code" htmlFor="postalCode" required>
          <Input
            id="postalCode"
            name="postalCode"
            required
            placeholder="Postal code"
            defaultValue={defaults.postalCode}
          />
        </FormField>

        <FormField label="City" htmlFor="city" required>
          <Select id="city" name="city" required defaultValue={defaults.city}>
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
            {defaults.city &&
              !cities.some((city) => city.name === defaults.city) && (
                <option value={defaults.city}>{defaults.city}</option>
              )}
          </Select>
        </FormField>
      </div>

      <FormField label="Phone Number" htmlFor="phoneNumber" required>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          required
          placeholder="Phone number"
          defaultValue={defaults.phoneNumber}
        />
      </FormField>

      <div className="flex items-center justify-between gap-4 pt-2">
        {initialProfile?.email && (
          <Text type="p" className="text-sm text-textSecondary">
            Email: {initialProfile.email}
          </Text>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </FormCard>
  );
};

export default ProfileSettingsForm;
