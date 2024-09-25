import { products } from "@/constants";
import Image from "next/image";
import ProductCard from "./ProductCard";

export default function Products() {
  return (
    <div className="wrapper">
      <h1 className="h1 text-center mb-20">
        <span>ARE</span>
        <Image
          src="/images/icon1.svg"
          alt="icon"
          width={40}
          height={40}
          className="inline-block w-[42px] mx-6"
        />
        <span>YOU</span>
        <Image
          src="/images/icon2.svg"
          alt="icon"
          width={40}
          height={40}
          className="inline-block w-[40px] mx-6"
        />
        <span>READY</span>
        <Image
          src="/images/icon3.svg"
          alt="icon"
          width={40}
          height={40}
          className="inline-block w-[40px] mx-6"
        />
        <span>TO</span>
        <br className="hidden lg:block"/>
        <span>DRIP</span> 
        <Image
          src="/images/icon5.svg"
          alt="icon"
          width={40}
          height={40}
          className="inline-block w-[40px] mx-6"
        /> 
        <span>IN</span>
        <Image
          src="/images/icon6.svg"
          alt="icon"
          width={40}
          height={40}
          className="inline-block w-[40px] mx-6"
        />
        <span>FINESSE?</span>
      </h1>

      <div className="flex flex-wrap justify-between gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imgUrl={product.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}
