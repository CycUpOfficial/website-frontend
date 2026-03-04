"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { updateUserProfile } from "@/services";
import type { ItemCity, UpdateUserProfileRequest, UserProfile } from "@/types";
import { ProfileSVG } from "@/components/icons";
import { Button, FileInput, Input, Select, Text } from "../atoms";
import { FormCard, FormField } from "../molecules";
import ProfileCommonWrapper from "./ProfileCommonWrapper";

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
      username: initialProfile?.username ?? "",
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

  const [formValues, setFormValues] = useState(defaults);

  const [profileImageValue, setProfileImageValue] = useState(
    defaults.profileImage,
  );

  useEffect(() => {
    setFormValues(defaults);
    setProfileImageValue(defaults.profileImage);
  }, [defaults]);

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

  const handleSubmit = async (_formData: FormData) => {
    setIsSubmitting(true);
    setMessage(undefined);
    setIsSuccess(undefined);

    const payload: UpdateUserProfileRequest = {
      username: formValues.username.trim(),
      firstName: formValues.firstName.trim(),
      familyName: formValues.familyName.trim(),
      address: formValues.address.trim(),
      postalCode: formValues.postalCode.trim(),
      city: formValues.city.trim(),
      phoneNumber: formValues.phoneNumber.trim(),
      profileImage: profileImageValue.trim() || undefined,
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
    <ProfileCommonWrapper
      title="My Info"
      stickyHeader
      className="h-full"
      contentClassName="flex-1 overflow-y-auto"
      handlers={<></>}
    >
      <FormCard
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
              value={formValues.firstName}
              onChange={(event) =>
                setFormValues((previous) => ({
                  ...previous,
                  firstName: event.target.value,
                }))
              }
            />
          </FormField>

          <FormField label="Family Name" htmlFor="familyName" required>
            <Input
              id="familyName"
              name="familyName"
              required
              placeholder="Family name"
              value={formValues.familyName}
              onChange={(event) =>
                setFormValues((previous) => ({
                  ...previous,
                  familyName: event.target.value,
                }))
              }
            />
          </FormField>
        </div>
        <FormField label="Username" htmlFor="username" required>
          <Input
            id="username"
            name="username"
            required
            placeholder="Username"
            value={formValues.username}
            onChange={(event) =>
              setFormValues((previous) => ({
                ...previous,
                username: event.target.value,
              }))
            }
          />
        </FormField>

        <FormField label="Address" htmlFor="address" required>
          <Input
            id="address"
            name="address"
            required
            placeholder="Address"
            value={formValues.address}
            onChange={(event) =>
              setFormValues((previous) => ({
                ...previous,
                address: event.target.value,
              }))
            }
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Postal Code" htmlFor="postalCode" required>
            <Input
              id="postalCode"
              name="postalCode"
              required
              placeholder="Postal code"
              value={formValues.postalCode}
              onChange={(event) =>
                setFormValues((previous) => ({
                  ...previous,
                  postalCode: event.target.value,
                }))
              }
            />
          </FormField>

          <FormField label="City" htmlFor="city" required>
            <Select
              id="city"
              name="city"
              required
              value={formValues.city}
              onChange={(event) =>
                setFormValues((previous) => ({
                  ...previous,
                  city: event.target.value,
                }))
              }
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
              {formValues.city &&
                !cities.some((city) => city.name === formValues.city) && (
                  <option value={formValues.city}>{formValues.city}</option>
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
            value={formValues.phoneNumber}
            onChange={(event) =>
              setFormValues((previous) => ({
                ...previous,
                phoneNumber: event.target.value,
              }))
            }
          />
        </FormField>

        <input type="hidden" name="profileImage" value={profileImageValue} />

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
      </FormCard>{" "}
    </ProfileCommonWrapper>
  );
};

export default ProfileSettingsForm;
