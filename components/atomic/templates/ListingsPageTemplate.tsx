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

const mockListings: SampleProduct[] = [
  {
    id: "1",
    slug: "vintage-chair",
    title: "Vintage Chair",
    description: "Comfortable and clean vintage chair.",
    images: [{ src: "/placeholder.svg", alt: "Vintage chair" }],
    price: 45,
    location: "Downtown",
    owner: {
      username: "You",
      profilePic: "/placeholder.svg",
      university: "Local University",
      location: "Downtown",
    },
  },
  {
    id: "2",
    slug: "desk-lamp",
    title: "Desk Lamp",
    description: "Bright LED desk lamp.",
    images: [{ src: "/placeholder.svg", alt: "Desk lamp" }],
    price: 15,
    location: "Midtown",
    owner: {
      username: "You",
      profilePic: "/placeholder.svg",
      university: "Local University",
      location: "Midtown",
    },
  },
  {
    id: "3",
    slug: "book-shelf",
    title: "Bookshelf",
    description: "Sturdy wooden bookshelf.",
    images: [{ src: "/placeholder.svg", alt: "Bookshelf" }],
    price: 0,
    location: "Uptown",
    owner: {
      username: "You",
      profilePic: "/placeholder.svg",
      university: "Local University",
      location: "Uptown",
    },
  },
];

const mockStats = {
  donated: 1,
  posted: 1,
  sold: 1,
};

const ListingsPageTemplate = ({
  listings,
  stats,
}: ListingsPageTemplateProps) => {
  const items = listings?.length ? listings : mockListings;
  const counts = stats ?? mockStats;
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
