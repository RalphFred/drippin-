"use client";

import { ProductProps } from "@/props";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/app/CartContext";

export default function CartCard({
  id,
  name,
  price,
  imgUrl,
  quantity,
}: ProductProps) {
  const [qty, setQty] = useState<number>(quantity || 1);

  const { removeFromCart, updateCartItem } = useCart();

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);

  useEffect(() => {
    return updateCartItem(id, qty);
  }, [qty]);

  return (
    <div className="w-full py-4 border-b border-slate-300">
      <div className="flex gap-4 mb-3">
        <div>
          <Image
            src={imgUrl}
            alt={name}
            width={1000}
            height={1000}
            className="w-[80px] aspect-[4/3] rounded-[12px]"
          />
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-gray-500 text-sm">{name}</span>
          <span className="text-lg font-semibold">{formattedPrice}</span>
        </div>
      </div>
      <div className="flex-between">
        <Button
          onClick={() => removeFromCart(id)}
          className="h-[32px] bg-gray-200 hover:bg-red-200 rounded-[6px] px-1 flex-center"
        >
          <Image
            src="/images/delete.svg"
            alt="delete"
            width={22}
            height={22}
            className=""
          />
        </Button>
        <div className="flex items-center justify-between w-[100px] h-[32px] border border-gray-300 rounded-[12px]">
          <Button
            onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
            className="h-full px-3 py-0 rounded-tl-[12px] rounded-bl-[12px] border-r border-gray-300"
          >
            –
          </Button>

          <div className="text-center text-sm font-medium block bottom-1">
            {qty}
          </div>

          <Button
            onClick={() => setQty((prev) => prev + 1)}
            className="h-full px-3 py-0 rounded-tr-[12px] rounded-br-[12px] border-l border-gray-300"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
