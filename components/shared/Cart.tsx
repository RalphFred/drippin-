import { useCart } from "@/app/CartContext";
import CartCard from "./CartCard";
import { Button } from "../ui/button";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { SheetTrigger } from "../ui/sheet";
import Link from "next/link";

export default function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formattedTotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(total);

  return (
    <AlertDialog>
      <div className="w-full flex flex-col h-full">
        <p className="border-b py-4 border-slate-300 text-center">My Order</p>
        <div className="flex-1 pb-2 overflow-y-auto cart-bar mb-8">
          {cartItems.map((item) => (
            <CartCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="flex-shrink-0 flex flex-col gap-4">
          <div className="bg-light-1 rounded-[12px] text-center text-sm text-gray-500 py-2">
            Subtotal: {formattedTotal}
          </div>

          <Link
            href="/checkout"
            className="bg-gray-800 text-white rounded-[12px] text-center w-full py-3 hover:bg-gray-900 inline-block h-[50px]"
          >
            <SheetTrigger>Proceed to Checkout</SheetTrigger>
          </Link>
        </div>
      </div>
    </AlertDialog>
  );
}
