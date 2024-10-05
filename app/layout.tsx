import Navbar from "@/components/shared/Navbar";
import CartProvider from "./CartContext";
import PaymentProvider from "./PaymentContext";

import type { Metadata } from "next";
import { Montserrat, Sofadi_One } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  description: "Are You 🫵 Dripping in Fnpinesse?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${sofadi.variable}`}>
      <CartProvider>
        <PaymentProvider>
          <body className="relative">
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </body>
        </PaymentProvider>
      </CartProvider>
    </html>
  );
}
