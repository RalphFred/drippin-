import Navbar from "@/components/shared/Navbar";
import CartProvider from "./CartContext";
import PaymentProvider from "./PaymentContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <PaymentProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </PaymentProvider>
    </CartProvider>
  );
}
