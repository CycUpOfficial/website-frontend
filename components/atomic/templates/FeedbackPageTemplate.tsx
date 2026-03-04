"use client";

import { DashboardRating } from "@/types";
import { ProfileCommonWrapper } from "../organisms";
import FeedbacksWrapper from "../organisms/FeedbacksWrapper";
import { Text } from "../atoms";

interface FeedbackPageTemplateProps {
  feedbacks?: DashboardRating[];
  totalRatings?: number;
  overallRating?: number;
}

const FeedbackPageTemplate = ({
  feedbacks,
  totalRatings,
  overallRating,
}: FeedbackPageTemplateProps) => {
  const items = feedbacks ?? [];
  const ratingsCount = totalRatings ?? items.length;
  const averageRating =
    overallRating ??
    (items.length
      ? Number(
          (
            items.reduce((sum, item) => sum + item.rating, 0) / items.length
          ).toFixed(1),
        )
      : 0);

  return (
    <section className="h-[640px] overflow-hidden rounded-[15px] bg-white">
      <ProfileCommonWrapper
        title="Feedback"
        stickyHeader
        className="h-full"
        contentClassName="flex-1 overflow-y-auto px-6 pb-8"
        handlers={
          <div className="flex items-center gap-4">
            <Text type="span" className="text-sm text-textSecondary">
              {ratingsCount} reviews
            </Text>
            <Text type="span" className="text-sm text-textSecondary">
              Overall {averageRating}/5
            </Text>
          </div>
        }
      >
        <FeedbacksWrapper feedbacks={items} />
      </ProfileCommonWrapper>
    </section>
  );
};

export default FeedbackPageTemplate;
