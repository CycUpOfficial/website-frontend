import { Label } from "../atoms";

interface IFormFieldProps {
  label?: string;
  htmlFor: string;
  required?: boolean;
  error?: string[] | undefined;
  children: React.ReactNode; // The Input/Select atom goes here
}

const FormField = ({
  label,
  htmlFor,
  required,
  error,
  children,
}: IFormFieldProps) => {
  return (
    <div>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}

      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error[0]}</p>}
    </div>
  );
};

export default FormField;
