import QuantitySelector from "@/components/shared/QuantitySelector";
import { Button } from "@/components/ui/button";
import { products } from "@/constants";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, description, imgUrl } = product;

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);

  return (
    <div className="wrapper mt-[100px] flex gap-16">
      <div className="flex-shrink-0">
        <Image
          src={imgUrl}
          alt={name}
          width={1000}
          height={1000}
          className="xl:w-[425px] h-[566px] rounded-[18px]"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-5xl font-semibold mb-8">{name}</h3>
          <p className="text mb-8">{description}</p>
          <p className="mb-8 text-3xl">{formattedPrice}</p>
          <QuantitySelector />
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
            <Button className="rounded-[12px] h-[50px] border w-full hover:bg-light-2">
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
