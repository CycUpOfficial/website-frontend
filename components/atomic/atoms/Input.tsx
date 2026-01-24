import { cn } from "@/lib/utils";

interface IInputProps {
  required?: boolean;
  type: "number" | "text" | "checkbox";
  placeholder?: string;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IInputProps) => {
  const { className, placeholder, type, value, onChange, disabled, maxLength } =
    props;
  const rootClassName = cn("", className);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };
  return (
    <input
      maxLength={maxLength}
      value={value}
      disabled={disabled}
      onChange={onChangeHandler}
      className={rootClassName}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
