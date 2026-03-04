import {
  AlertSvg,
  NewItemSvg,
  NotifSvg,
  StartChatSVG,
  StoreSvg,
} from "@/components/icons";

export const safetyTips = [
  "Always meet the donor/seller at a safe public place For purchased items",
  "Avoid paying in advance, even for delivery",
  "Inspect the item and ensure it's exactly what you want",
  "Make sure that the packed item is the one you've inspected",
  "Only pay if you're satisfied. Give a feedback!",
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
      {
        title: "Facebook",
        link: "https://www.facebook.com/share/1AYh7jfrGU/?mibextid=wwXIfr",
      },
      {
        title: "Instagram",
        link: "https://www.instagram.com/cycup_abo?igsh=Zmw3ZHdtcHp0OTU0&utm_source=qr",
      },
      {
        title: "Youtube",
        link: "https://youtube.com/@cycup?si=mEvZKz99p1hxkOR7",
      },
      { title: "Twitter", link: "https://x.com/cycup_" },
      {
        title: "Tik Tok",
        link: "https://www.tiktok.com/@cycup29?_r=1&_t=ZN-94PWhSkGfeY",
      },
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
    href: "/profile/conversation",
    label: "Conversations",
    icon: <StartChatSVG />,
  },
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
