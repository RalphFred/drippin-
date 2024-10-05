"use client";
import { useCart } from "@/app/CartContext";
import { usePayment } from "@/app/PaymentContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

export default function Paystack() {
  const { paymentInfo } = usePayment();
  const { cartItems } = useCart();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  let total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  total *= 100;

  useEffect(() => {
    if (paymentInfo) {
      setEmail(paymentInfo.email || "");
      setAmount(total || 0);
      setName(paymentInfo.fullname || "")
      setPhone(paymentInfo.number || "")
    }
  }, [paymentInfo, total]);

  const componentProps = {
    email,
    amount,
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: name,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone",
          value: phone,
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>{
      
      alert("Thanks for doing business with us! Come back soon!!");
      router.push("/#products");
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }

  const handleSuccess = (reference: any) => {
    console.log("Payment Successful:", reference);
    
  };

  return (
    <div>
      <PaystackButton {...componentProps} className="bg-gray-800 text-white rounded-[12px] text-center w-full h-[50px] hover:bg-gray-900"/>
    </div>
  );
};


