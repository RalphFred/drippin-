import Navbar from "@/components/shared/Navbar";
import CartProvider from "./CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <body>
        <Navbar />
        {children}
      </body>
    </CartProvider>
  );
}
