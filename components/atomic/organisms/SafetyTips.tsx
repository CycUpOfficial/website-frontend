import { safetyTips } from "@/config/constants";
import { Text } from "../atoms";

const SafetyTips = () => {
  return (
    <div className="bg-white rounded-[10px] shadow-md p-10">
      <Text type="h3" className="font-medium text-base text-textPrimary">
        Safety Tips
      </Text>
      <ul className="list-disc marker:text-textSecondary">
        {safetyTips.map((tip, index) => (
          <li key={index}>
            <Text
              type="span"
              className="text-sm font-normal text-textSecondary"
            >
              {tip}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SafetyTips;
