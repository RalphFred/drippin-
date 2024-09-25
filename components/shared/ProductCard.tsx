import { ProductProps } from "@/props";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ id, name, price, description, imgUrl}: ProductProps) {

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(price);

  return (
    <Link href={`/products/${id}`}>
      <Image src={imgUrl} alt="image" width={1000} height={1000} className="w-[287px] h-[382px] rounded-[16px] mb-4"/>
      <div>
        <p className="mb-1 font-semibold text-lg">{name}</p>
        <p className="font-semibold">{formattedPrice}</p>
      </div>
    </Link>
  );
}