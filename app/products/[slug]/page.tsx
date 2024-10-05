"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { products } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../../CartContext";

export default function Page({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { id, name, price, description, imgUrl } = product;

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem = { id, name, price, quantity, imgUrl };
  
    
    addToCart(newItem);
  
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    const existingItem = storedCart.find((item: CartItem) => item.id === newItem.id);
  
    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      storedCart.push(newItem);
    }
  
    localStorage.setItem("cart", JSON.stringify(storedCart));
    console.log(storedCart);
  };
  

  return (
    <div className="wrapper mt-[100px] flex flex-col lg:flex-row gap-16">
      <div className="flex-shrink-0 flex-center">
        <Image
          src={imgUrl}
          alt={name}
          width={1000}
          height={1000}
          className="w-full md:w-[400px] xl:w-[425px] aspect-[3/4] rounded-[18px]"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-12">
        <div>
          <h3 className="text-4xl md:text-4xl font-semibold mb-8">{name}</h3>
          <p className="text mb-8">{description}</p>
          <p className="mb-8 text-3xl">{formattedPrice}</p>

          <div className="flex items-center justify-between w-[150px] h-[48px] border border-gray-300 rounded-[12px]">
            <Button
              onClick={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
              className="h-full px-4 py-0 text-lg rounded-tl-[12px] rounded-bl-[12px] border-r border-gray-300"
            >
              –
            </Button>

            <div className="text-center text-lg font-medium block bottom-1">
              {quantity}
            </div>

            <Button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="h-full px-4 py-0 text-lg rounded-tr-[12px] rounded-br-[12px] border-l border-gray-300"
            >
              +
            </Button>
          </div>
        </div>

        <div>
          <div className="flex gap-8 mb-4">
            <Button className="hover:bg-light-2 rounded-[12px] h-[50px] border flex-shrink-0">
              <Image
                src="/images/favorite-orange.svg"
                alt="cart icon"
                width={24}
                height={24}
              />
            </Button>
            <Button
              className="rounded-[12px] h-[50px] border w-full hover:bg-light-2"
              onClick={() => {
                handleAddToCart();
                toast({
                  description: "Your item has been added to the cart.",
                });
              }}
            >
              <span className="inline-block mr-4">Add to cart </span>
              <Image
                src="/images/cart-orange.svg"
                alt="cart icon"
                width={24}
                height={24}
              />
            </Button>
          </div>
          <div>
            <Button className="rounded-[12px] h-[50px] bg-orange-1 hover:bg-orange-2 text-white font-semibold w-full">
              Buy it Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
