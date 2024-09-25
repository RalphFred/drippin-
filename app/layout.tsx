import type { Metadata } from "next";
import {
  Dancing_Script,
  Inter,
  Montserrat,
  Sofadi_One,
} from "next/font/google";
import "./globals.css";

export const montserrat = Montserrat({
  weight: "500",
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const sofadi = Sofadi_One({
  weight: ["400"],
  variable: "--font-sofadi",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drippin'",
  description: "Are You 🫵 Driping in Finesse?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sofadi.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
