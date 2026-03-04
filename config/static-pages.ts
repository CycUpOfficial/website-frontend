import { InfoSection } from "@/components/atomic/templates/InfoPageTemplate";

interface StaticPageContent {
  title: string;
  subtitle?: string;
  sections: InfoSection[];
}

export const aboutCycUpContent: StaticPageContent = {
  title: "About CycUp",
  sections: [
    {
      paragraphs: [
        "CycUp is a student-driven circular-economy marketplace designed to help university communities share, sell, rent, or donate their unused items.",
        "By replacing informal social-media swap groups with a structured, verified platform, CycUp lowers living costs, cuts waste, and strengthens campus bonds.",
      ],
    },
    {
      title: "Vision",
      paragraphs: [
        "Reduce waste, save money, and build stronger, greener universities.",
      ],
    },
    {
      title: "Problem",
      paragraphs: [
        "Students create large amounts of waste and face rising living costs, while ad-hoc Facebook or WhatsApp groups remain messy and unsafe.",
      ],
    },
    {
      title: "Solution",
      paragraphs: [
        "A safe, account-verified app with item listings, in-app chat, sustainability tracking, and optional premium perks.",
      ],
    },
    {
      title: "Impact So Far",
      paragraphs: [
        "Prototype UI/UX, technical architecture, and backend in active development; pilot plan targets 500+ students at Åbo Akademi University before scaling to other campuses.",
      ],
    },
  ],
};

export const faqContent: StaticPageContent = {
  title: "FAQ",
  sections: [
    {
      faqs: [
        {
          question: "Who can join CycUp?",
          answer:
            "Anyone with a verified university email from a partner campus.",
        },
        {
          question: "Does CycUp take a commission on sales?",
          answer:
            "No commission on standard listings; premium perks are optional.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Tap 'Forgot Password' on the login screen; follow the email link.",
        },
        {
          question: "Can I list digital items (e.g., software keys)?",
          answer: "No—only physical items allowed to avoid piracy claims.",
        },
        {
          question: "What if I receive a damaged product?",
          answer:
            "Leave an honest review and report the user; repeated offenders face suspension.",
        },
      ],
    },
  ],
};

export const howToGiveawayContent: StaticPageContent = {
  title: "How to Giveaway Items",
  sections: [
    {
      bullets: [
        "Tap the '+' button and choose 'Giveaway'.",
        "Upload up to 5 photos and write a clear title and description.",
        "Select category and set price to €0.",
        "Post your listing; interested students will request pickup via chat.",
        "Mark the item as 'Collected' once handed over to auto-remove it from search.",
        "Encourage the recipient to leave feedback—it boosts your campus reputation.",
      ],
    },
  ],
};

export const howToSellOrBuyContent: StaticPageContent = {
  title: "How to Sell or Buy",
  sections: [
    {
      title: "Selling",
      bullets: [
        "Create a listing with photos, price, and condition details.",
        "Respond promptly to chat inquiries.",
        "Agree on a meetup spot and payment method (cash or mobile pay).",
      ],
    },
    {
      title: "Buying",
      bullets: [
        "Use filters to find items, then tap 'Message Seller'.",
        "Confirm item condition and price.",
        "Meet in person; inspect before paying.",
        "Mark transaction complete in the app so both parties gain reputation points.",
      ],
    },
  ],
};

export const privacyPolicyContent: StaticPageContent = {
  title: "Privacy Policy",
  sections: [
    {
      title: "1. Data We Collect",
      bullets: [
        "University email, name, and profile photo.",
        "Listing details, messages, and in-app actions.",
      ],
    },
    {
      title: "2. How We Use Data",
      bullets: [
        "Provide core functions: authentication, messaging, notifications.",
        "Generate anonymous sustainability metrics (e.g., waste reduced).",
      ],
    },
    {
      title: "3. Storage & Security",
      bullets: [
        "Passwords hashed with Argon2; no plaintext storage.",
        "All traffic encrypted via TLS.",
        "Backups encrypted at rest on AWS.",
      ],
    },
    {
      title: "4. Sharing",
      bullets: [
        "No sale of personal data.",
        "Third-party services limited to email and push-notification providers bound by GDPR.",
      ],
    },
    {
      title: "5. Retention & Deletion",
      bullets: [
        "You may request deletion at any time; backups purge within 30 days.",
      ],
    },
    {
      title: "6. Your Rights",
      bullets: [
        "Access, correct, delete, or port your data.",
        "File a complaint with the Finnish Data Protection Ombudsman.",
      ],
    },
  ],
};

export const safetyTipsContent: StaticPageContent = {
  title: "Safety Tips",
  sections: [
    {
      bullets: [
        "Meet in public, well-lit areas on campus whenever possible.",
        "Bring a friend for high-value exchanges.",
        "Verify the item condition before handing over cash.",
        "Never share passwords or personal banking details.",
        "Use in-app chat only—avoid moving to unverified channels.",
        "Report suspicious listings or behavior via the 'Report' button.",
        "Trust your instincts; if something feels off, cancel the deal.",
      ],
    },
  ],
};

export const termsConditionsContent: StaticPageContent = {
  title: "Terms & Conditions",
  sections: [
    {
      title: "1. Definitions",
      bullets: [
        "“Platform” refers to the CycUp web and mobile applications.",
        "“User” refers to any student account created with a valid university email.",
      ],
    },
    {
      title: "2. Account Eligibility",
      bullets: [
        "Users must verify a university-issued email address.",
        "Passwords are hashed; sharing credentials is prohibited.",
      ],
    },
    {
      title: "3. Acceptable Use",
      bullets: [
        "List only lawful items you own.",
        "No weapons, controlled substances, or counterfeit goods.",
        "Respect other users; harassment will result in suspension.",
      ],
    },
    {
      title: "4. Listings & Transactions",
      bullets: [
        "You are responsible for accuracy of item descriptions, prices, and condition.",
        "CycUp is not a party to transactions and offers no warranty.",
      ],
    },
    {
      title: "5. Liability",
      bullets: [
        "The Platform is provided “as-is”. CycUp disclaims all implied warranties.",
        "CycUp is not liable for damages arising from user interactions or item defects.",
      ],
    },
    {
      title: "6. Termination",
      bullets: [
        "CycUp may suspend or delete accounts that violate these terms.",
      ],
    },
    {
      title: "7. Governing Law",
      bullets: [
        "These terms are governed by Finnish law. Disputes are resolved in Turku District Court.",
      ],
    },
  ],
};

export const contactUsContent: StaticPageContent = {
  title: "Contact Us",
  sections: [
    {
      paragraphs: [
        "Need help with CycUp? Reach our support team and we will get back to you as soon as possible.",
      ],
    },
    {
      title: "Support Email",
      paragraphs: ["support@cycup.fi"],
    },
  ],
};
