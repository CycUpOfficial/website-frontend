// src/components/organisms/PhotoUploadField.tsx
import { Text } from "../atoms";
import { FormField } from "../molecules";
import PhotoUploader from "../molecules/PhotoUploader";

interface PhotoUploadFieldProps {
  name: string;
  label?: string;
  error?: string[];
  maxPhotos?: number;
  onChange: (files: File[]) => void;
}

const PhotoUploadField = ({
  name,
  label,
  error,
  maxPhotos,
  onChange,
}: PhotoUploadFieldProps) => {
  return (
    <FormField htmlFor={name} error={error}>
      <Text type="h3" className="text-textPrimary font-medium text-[20px]">
        Add Photo
      </Text>

      <Text
        type="p"
        className="max-w-[550px] text-[20px] text-textSecondary font-normal mb-[30px]"
      >
        Add at least 1 photo for the item<br></br> Note: the first photo will be
        set as the featured image.<br></br> You can change the order of the
        photos: drag your photos in your preferred order
      </Text>

      <PhotoUploader
        maxPhotos={maxPhotos}
        onChange={onChange}
        hasError={!!error}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.join(", ")}</p>}

      <Text
        type="p"
        className="max-w-[550px] text-[20px] text-textSecondary font-normal mt-[30px]"
      >
        Formats: *JPG *PNG
      </Text>
    </FormField>
  );
};

export default PhotoUploadField;
