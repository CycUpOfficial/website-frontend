"use client";

import { useMemo } from "react";

import { DashboardRating } from "@/types";
import { ProfileCommonWrapper } from "../organisms";
import FeedbacksWrapper from "../organisms/FeedbacksWrapper";
import { Text } from "../atoms";

interface FeedbackPageTemplateProps {
  feedbacks?: DashboardRating[];
}

const mockFeedbacks: DashboardRating[] = [
  {
    id: 1,
    rating: 4,
    comment: "Great seller, item was exactly as described.",
    reviewer: "Nora",
    createdAt: "2026-02-23T10:15:00Z",
  },
  {
    id: 2,
    rating: 5,
    comment: "Smooth transaction and fast response.",
    reviewer: "Liam",
    createdAt: "2026-02-20T14:05:00Z",
  },
  {
    id: 3,
    rating: 3,
    comment: "Item was good, but pickup took longer than expected.",
    reviewer: "Maya",
    createdAt: "2026-02-18T09:30:00Z",
  },
  {
    id: 3,
    rating: 3,
    comment: "Item was good, but pickup took longer than expected.",
    reviewer: "Maya",
    createdAt: "2026-02-18T09:30:00Z",
  },
  {
    id: 3,
    rating: 3,
    comment: "Item was good, but pickup took longer than expected.",
    reviewer: "Maya",
    createdAt: "2026-02-18T09:30:00Z",
  },
  {
    id: 3,
    rating: 3,
    comment: "Item was good, but pickup took longer than expected.",
    reviewer: "Maya",
    createdAt: "2026-02-18T09:30:00Z",
  },
];

const FeedbackPageTemplate = ({ feedbacks }: FeedbackPageTemplateProps) => {
  const items = feedbacks?.length ? feedbacks : mockFeedbacks;
  const totalRatings = items.length;
  const overallRating = useMemo(() => {
    if (!items.length) {
      return 0;
    }

    const total = items.reduce((sum, item) => sum + item.rating, 0);
    return Number((total / items.length).toFixed(1));
  }, [items]);

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
              {totalRatings} reviews
            </Text>
            <Text type="span" className="text-sm text-textSecondary">
              Overall {overallRating}/5
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
