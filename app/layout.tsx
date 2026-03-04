import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Footer, Header } from "@/components/atomic/organisms";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "CycUp",
  description: "Circular ecosystem for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <div className="h-[80px] shrink-0" aria-hidden />
        <main className="flex-1 bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
