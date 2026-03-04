"use client";

import { useMemo } from "react";

import { SampleProduct } from "@/types";
import { ProfileCommonWrapper } from "../organisms";
import ListingsWrapper from "../organisms/ListingsWrapper";
import { Text } from "../atoms";

interface ListingsPageTemplateProps {
  listings?: SampleProduct[];
  stats?: {
    donated: number;
    posted: number;
    sold: number;
  };
}

const ListingsPageTemplate = ({
  listings,
  stats,
}: ListingsPageTemplateProps) => {
  const items = listings ?? [];
  const counts = stats ?? { donated: 0, posted: 0, sold: 0 };
  const handlerStats = useMemo(
    () => [
      { label: "Donated", value: counts.donated },
      { label: "Posted", value: counts.posted },
      { label: "Sold", value: counts.sold },
    ],
    [counts.donated, counts.posted, counts.sold],
  );

  return (
    <section className="h-[640px] overflow-hidden rounded-[15px] bg-white">
      <ProfileCommonWrapper
        title="My Listings"
        stickyHeader
        className="h-full"
        contentClassName="flex-1 overflow-y-auto px-6 pb-8"
        handlers={
          <div className="flex items-center gap-4">
            {handlerStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <Text
                  type="span"
                  className="text-sm font-semibold text-textPrimary"
                >
                  {stat.value}
                </Text>
                <Text type="span" className="text-sm text-textSecondary">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        }
      >
        <ListingsWrapper listings={items} />
      </ProfileCommonWrapper>
    </section>
  );
};

export default ListingsPageTemplate;
