"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"; // assuming you're using shadcn buttons

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center justify-between w-[150px] h-[48px] border border-gray-300 rounded-[12px]">
      {/* Decrement button */}
      <Button
        onClick={decrement}
        className="h-full px-4 py-0 text-lg rounded-tl-[12px] rounded-bl-[12px] border-r border-gray-300"
      >
        –
      </Button>

      {/* Quantity display */}
      <div className="text-center text-lg font-medium block bottom-1">{quantity}</div>

      {/* Increment button */}
      <Button
        onClick={increment}
        className="h-full px-4 py-0 text-lg rounded-tr-[12px] rounded-br-[12px] border-l border-gray-300"
      >
        +
      </Button>
    </div>
  );
}
