"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { useCart } from "@/app/CartContext";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { cartItems } = useCart();

  const numberOfItems = cartItems.length;

  // Effect to track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const navbarVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setVisible(navbarVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <Sheet>
      <nav
        className={`w-full p-2 fixed top-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-orange-1 rounded-xl h-[80px] px-4 md:px-8 xl:px-12 flex-between">
          <div className="hidden lg:flex gap-12">
            <Link href="/#products">
              <div className="text-lg text-white cursor-pointer">Shop</div>
            </Link>

            <div className="flex gap-2 cursor-pointer">
              <div className="text-white text-lg ">Search</div>
              <Image
                src="/images/search.svg"
                alt="favorite logo"
                width={20}
                height={20}
              />
            </div>
          </div>

          <Link href="/">
            <h2 className="h2 text-white cursor-pointer">Drippin'</h2>
          </Link>

          <div className="flex gap-8 items-center">
            <div className="relative cursor-pointer">
              <Image
                src="/images/favorite.svg"
                alt="favorite logo"
                width={28}
                height={28}
              />
              <span className="text-xs rounded-full bg-white text-orange-1 font-bold w-5 h-5 inline-block flex-center absolute -top-2 -right-2">
                01
              </span>
            </div>

            <SheetTrigger>
              <div className="relative cursor-pointer">
                <Image
                  src="/images/cart.svg"
                  alt="cart logo"
                  width={28}
                  height={28}
                />
                <span className="text-xs rounded-full bg-white text-orange-1 font-bold w-5 h-5 inline-block flex-center absolute -top-2 -right-2">
                {numberOfItems}
                </span>
              </div>
            </SheetTrigger>
          </div>
        </div>
      </nav>

      <SheetContent className="bg-white ">
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
