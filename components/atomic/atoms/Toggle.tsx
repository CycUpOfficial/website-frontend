import Button from "./Button";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const Toggle = ({
  enabled,
  onToggle,
  disabled,
  ariaLabel = "Toggle",
}: ToggleProps) => {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled ? "bg-primary" : "bg-textSecondary"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={ariaLabel}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </Button>
  );
};

export default Toggle;