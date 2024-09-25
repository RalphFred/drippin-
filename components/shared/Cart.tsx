import { useCart } from "@/app/(root)/CartContext";
import Image from "next/image";


export default function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useCart();

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="bg-green-400 w-full h-full">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <Image src={item.imgUrl} alt={item.name} width={500} height={500} className="w-20 h-20" />
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateCartItem(item.id, Number(e.target.value))}
            />
          </div>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
