import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADDY — Official Merchandise & Apparel",
  description:
    "Addy - India's coolest merchandise store. Shop official T-shirts, shirts, polos, jeans, pants, joggers, sneakers, accessories, and collectibles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
