"use client";

import { DashboardRating } from "@/types";
import { cn } from "@/lib/utils";
import { Text } from "../atoms";
import { FeedbackItemCard } from "../molecules";

interface FeedbacksWrapperProps {
  feedbacks: DashboardRating[];
  className?: string;
}

const FeedbacksWrapper = ({ feedbacks, className }: FeedbacksWrapperProps) => {
  if (!feedbacks.length) {
    return (
      <div
        className={cn(
          "flex min-h-[220px] items-center justify-center rounded-[16px] border border-textSecondary/20 bg-white",
          className,
        )}
      >
        <Text type="p" className="text-sm text-textSecondary">
          No feedback yet.
        </Text>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {feedbacks.map((feedback, index) => (
        <FeedbackItemCard
          key={feedback.id ?? `${feedback.reviewer ?? "reviewer"}-${index}`}
          feedback={feedback}
        />
      ))}
    </div>
  );
};

export default FeedbacksWrapper;
