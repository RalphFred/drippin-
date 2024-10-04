"use client";
import { useCart } from "@/app/(root)/CartContext";
import { usePayment } from "@/app/(root)/PaymentContext";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

const PaystackComponent = () => {
  const { paymentInfo } = usePayment();
  const { cartItems } = useCart();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (paymentInfo) {
      setEmail(paymentInfo.email || "");
      setAmount(total * 100 || 0);
    }
  }, [paymentInfo]);

  console.log(paymentInfo);

  const componentProps = {
    email,
    amount: amount * 100,
    publicKey,
    text: "Pay Now",
    onSuccess: (reference: any) => handleSuccess(reference),
    onClose: () => console.log("Payment closed"),
  };

  const handleSuccess = (reference: any) => {
    console.log("Payment Successful:", reference);
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackComponent;
