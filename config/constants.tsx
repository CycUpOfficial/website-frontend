import { AlertSvg, NewItemSvg, NotifSvg, StoreSvg } from "@/components/icons";

export const sampleProducts = [
  {
    id: "1",
    slug: "winter-jackets",
    title: "Winter Jackets",
    description:
      "A breathtaking view of the mountains at dawn with golden light painting the peaks.",
    images: [
      {
        src: "/winter-jacket.png",
        alt: "Winter Jackets product image",
      },
      {
        src: "/winter-jacket.png",
        alt: "Winter Jackets product image",
      },
      {
        src: "/winter-jacket.png",
        alt: "Winter Jackets product image",
      },
    ],
    price: 29.99,
    location: "TYS, 78A",
    owner: {
      username: "alex_k",
      profilePic: "/profiles/alex.png",
      university: "University of Turku",
      location: "Turku, Finland",
    },
  },
  {
    id: "2",
    slug: "nike-sneakers",
    title: "Nike Sneakers",
    description: "Modern city buildings showcasing contemporary design.",
    images: [
      {
        src: "/nike-sneakers.png",
        alt: "Nike Sneakers product image",
      },
    ],
    price: 89.99,
    location: "TYS, 78A",
    owner: {
      username: "maria.s",
      profilePic: "/profiles/maria.png",
      university: "Åbo Akademi University",
      location: "Turku, Finland",
    },
  },
  {
    id: "3",
    slug: "single-sofa",
    title: "Single Sofa",
    description:
      "The rhythmic dance of ocean waves captured in perfect timing.",
    images: [
      {
        src: "/sofa.png",
        alt: "Single Sofa product image",
      },
    ],
    price: 45.0,
    location: "TYS, 78A",
    owner: {
      username: "jonas_l",
      profilePic: "/profiles/jonas.png",
      university: "University of Turku",
      location: "Turku, Finland",
    },
  },
  {
    id: "4",
    slug: "hall-center-table",
    title: "Hall Center Table",
    description: "A serene woodland trail covered in autumn leaves.",
    images: [
      {
        src: "/table.png",
        alt: "Hall Center Table product image",
      },
    ],
    price: 24.99,
    location: "TYS, 78A",
    owner: {
      username: "emily_r",
      profilePic: "/profiles/emily.png",
      university: "Turku University of Applied Sciences",
      location: "Turku, Finland",
    },
  },
  {
    id: "5",
    slug: "single-size-bed",
    title: "Single Size Bed",
    description:
      "Golden sand dunes stretching endlessly under a clear blue sky.",
    images: [
      {
        src: "/bed.png",
        alt: "Single Size Bed product image",
      },
    ],
    price: 55.0,
    location: "TYS, 78A",
    owner: {
      username: "ahmad_h",
      profilePic: "/profiles/ahmad.png",
      university: "University of Turku",
      location: "Turku, Finland",
    },
  },
  {
    id: "6",
    slug: "sweat-pants",
    title: "Sweat Pants",
    description: "Stars illuminating the darkness.",
    images: [
      {
        src: "/sweatpants.png",
        alt: "Sweat Pants product image",
      },
    ],
    price: 34.99,
    location: "TYS, 78A",
    owner: {
      username: "lina_p",
      profilePic: "/profiles/lina.png",
      university: "Åbo Akademi University",
      location: "Turku, Finland",
    },
  },
  {
    id: "7",
    slug: "sneakers",
    title: "Sneakers",
    description:
      "Crystal clear water cascading down moss-covered rocks in a tropical paradise.",
    images: [
      {
        src: "/sneakers.png",
        alt: "Sneakers product image",
      },
    ],
    price: 120.0,
    location: "TYS, 78A",
    owner: {
      username: "daniel_m",
      profilePic: "/profiles/daniel.png",
      university: "University of Turku",
      location: "Turku, Finland",
    },
  },
  {
    id: "8",
    slug: "full-set-sound-system",
    title: "Full Set Sound System",
    description: "Delicate pink petals in spring bloom.",
    images: [
      {
        src: "/sound-system.png",
        alt: "Full Set Sound System product image",
      },
    ],
    price: 28.0,
    location: "TYS, 78A",
    owner: {
      username: "sara_n",
      profilePic: "/profiles/sara.png",
      university: "Turku University of Applied Sciences",
      location: "Turku, Finland",
    },
  },
  {
    id: "9",
    slug: "hp-elitebook",
    title: "HP Elitebook",
    description: "Majestic snow-capped mountains reaching toward the clouds.",
    images: [
      {
        src: "/hp-elitebook.png",
        alt: "HP Elitebook product image",
      },
    ],
    price: 65.0,
    location: "TYS, 78A",
    owner: {
      username: "omid_dev",
      profilePic: "/profiles/omid.png",
      university: "University of Turku",
      location: "Turku, Finland",
    },
  },
  {
    id: "10",
    slug: "living-room-carpet",
    title: "Living Room Carpet",
    description: "Boats resting peacefully as the sun dips below the horizon.",
    images: [
      {
        src: "/carpet.png",
        alt: "Living Room Carpet product image",
      },
    ],
    price: 95.0,
    location: "TYS, 78A",
    owner: {
      username: "noah_w",
      profilePic: "/profiles/noah.png",
      university: "Åbo Akademi University",
      location: "Turku, Finland",
    },
  },
  {
    id: "11",
    slug: "headphone",
    title: "Headphone",
    description: "Lush green meadows stretching between rolling hills.",
    images: [
      {
        src: "/headphones.png",
        alt: "Headphone product image",
      },
    ],
    price: 32.0,
    location: "TYS, 78A",
    owner: {
      username: "emma_t",
      profilePic: "/profiles/emma.png",
      university: "Turku University of Applied Sciences",
      location: "Turku, Finland",
    },
  },
  {
    id: "12",
    slug: "samsung-phone",
    title: "Samsung Phone",
    description:
      "The urban landscape comes alive at night with a symphony of lights.",
    images: [
      {
        src: "/samsung-phone.png",
        alt: "Samsung Phone product image",
      },
    ],
    price: 378.0,
    location: "TYS, 78A",
    owner: {
      username: "kasra_ai",
      profilePic: "/profiles/kasra.png",
      university: "University of Turku",
      location: "Turku, Finland",
    },
  },
];

export const safetyTips = [
  "Always meet the donor/seller at a safe public place For purchased items",
  "Avoid paying in advance, even for delivery",
  "Inspect the item and ensure it's exactly what you want",
  "Make sure that the packed item is the one you've inspected",
  "Only pay if you're satisfied. Give a feedback!",
];

export const categories = [
  { id: "1", img: "/electronics.png", title: "Electronics" },
  { id: "2", img: "/furniture.png", title: "Furniture" },
  { id: "3", img: "/clothings.png", title: "Clothings" },
  { id: "4", img: "/groceries.png", title: "Groceries" },
  { id: "5", img: "/appiliances.png", title: "Home Appiliances" },
];

export const footerLinks = [
  {
    title: "About Us",
    links: [
      { title: "About CycUp", link: "/about-cycup" },
      { title: "Terms & Conditions", link: "/terms-conditions" },
      { title: "Privacy Policy", link: "/privacy-policy" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "support@cycup.fi", link: "mailto:support@cycup.fi" },
      { title: "Safety Tips", link: "/safety-tips" },
      { title: "How to Giveaway", link: "/how-to-giveaway" },
      { title: "How to Sell or Buy", link: "/how-to-sell-or-buy" },
      { title: "Contact Us", link: "/contact-us" },
      { title: "FAQ", link: "/faq" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { title: "Facebook", link: "/" },
      { title: "Instagram", link: "/" },
      { title: "Youtube", link: "/" },
      { title: "Twitter", link: "/" },
      { title: "Tik Tok", link: "/" },
    ],
  },
  {
    title: "Categories",
    links: [
      { title: "Electronics", link: "/" },
      { title: "Furniture", link: "/" },
      { title: "Clothing", link: "/" },
      { title: "Groceries", link: "/" },
      { title: "Appiliances", link: "/" },
    ],
  },
];

export const APP_NAME = "Marketplace";
export const APP_DESCRIPTION = "Your trusted marketplace for quality products";

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

export const PRODUCT_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  ARCHIVED: "archived",
} as const;

export const USER_ROLES = {
  BUYER: "buyer",
  VENDOR: "vendor",
  ADMIN: "admin",
} as const;

export const NOTIFICATION_TYPES = {
  ORDER_PLACED: "order_placed",
  ORDER_SHIPPED: "order_shipped",
  MESSAGE_RECEIVED: "message_received",
  REVIEW_RECEIVED: "review_received",
  PRODUCT_APPROVED: "product_approved",
  SYSTEM: "system",
} as const;

export const profileItems = [
  { href: "/profile/listings", label: "My listings", icon: <StoreSvg /> },
  {
    href: "/profile/feedback",
    label: "Feedback & Ratings",
    icon: <AlertSvg />,
  },
  { href: "/product/new", label: "Post an Item", icon: <NewItemSvg /> },
  {
    href: "/profile/notifications",
    label: "Notifications",
    icon: <NotifSvg />,
  },
];
