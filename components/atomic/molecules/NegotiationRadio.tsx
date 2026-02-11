import { Radio, Text } from "../atoms";
import { cn } from "@/lib/utils";

interface NegotiationRadioProps {
  name?: string;
  question?: string;
  defaultValue?: "yes" | "no";
  className?: string;
}

const NegotiationRadio = ({
  name = "openToNegotiation",
  question = "Are you open to negotiation?",
  defaultValue,
  className,
}: NegotiationRadioProps) => {
  const yesId = `${name}-yes`;
  const noId = `${name}-no`;

  return (
    <div className={cn("w-fit flex items-center gap-10", className)}>
      <Text type="p" className="text-textPrimary text-[16px] font-medium">
        {question}
      </Text>
      <div className="flex items-center gap-6">
        <label htmlFor={yesId} className="flex items-center gap-2">
          <Radio
            id={yesId}
            name={name}
            value="yes"
            defaultChecked={defaultValue === "yes"}
          />
          <Text type="span" className="text-textSecondary text-[14px]">
            Yes
          </Text>
        </label>

        <label htmlFor={noId} className="flex items-center gap-2">
          <Radio
            id={noId}
            name={name}
            value="no"
            defaultChecked={defaultValue === "no"}
          />
          <Text type="span" className="text-textSecondary text-[14px]">
            No
          </Text>
        </label>
      </div>
    </div>
  );
};

export default NegotiationRadio;
