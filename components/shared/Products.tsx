import { products } from "@/constants";
import Image from "next/image";

export default function Products() {  
  return (
    <div>
      <h1 className="h1">Products</h1>

      <ul>
        {
          products.map((product) => (
            <li key={product.name}>
                {product.name}
                <Image src={product.imgUrl} alt={product.name} width={1000} height={1000} className="w-[300px]"/>
            </li>
          ))
        }
      </ul>
    </div>
  );
}