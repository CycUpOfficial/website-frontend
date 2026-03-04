import { DashboardRating } from "@/types";
import { Text } from "../atoms";
import { cn } from "@/lib/utils";

interface FeedbackItemCardProps {
  feedback: DashboardRating;
  className?: string;
}

const FeedbackItemCard = ({ feedback, className }: FeedbackItemCardProps) => {
  const reviewer = feedback.reviewer || "Anonymous";
  const comment = feedback.comment || "No comment provided.";
  const createdAt = feedback.createdAt
    ? new Date(feedback.createdAt).toLocaleDateString()
    : "";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[16px] border border-textSecondary/20 bg-white px-5 py-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Text type="h4" className="text-base font-semibold text-textPrimary">
          {reviewer}
        </Text>
        <Text type="span" className="text-xs text-textSecondary">
          {createdAt}
        </Text>
      </div>
      <Text type="p" className="text-sm text-textSecondary">
        {comment}
      </Text>
      <Text type="span" className="text-sm font-medium text-textPrimary">
        Rating: {feedback.rating}/5
      </Text>
    </div>
  );
};

export default FeedbackItemCard;
