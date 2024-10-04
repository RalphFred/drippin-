"use client"
import type { Metadata } from "next";
import { Montserrat, Sofadi_One } from "next/font/google";
import "./globals.css";

// Use the correct configuration for Montserrat and Sofadi One fonts
const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const sofadi = Sofadi_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sofadi",
});

export const metadata: Metadata = {
  title: "Drippin'",
  description: "Are You 🫵 Dripping in Finesse?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sofadi.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
