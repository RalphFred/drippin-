"use client";
import { usePayment } from "@/app/(root)/PaymentContext";
import { useState } from "react";
import { PaystackButton } from "react-paystack";

const PaystackComponent = () => {
  const [email, setEmail] = useState(""); // The user's email
  const [amount, setAmount] = useState(0); // Amount to pay (in kobo, 100 kobo = 1 NGN)
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""; // Paystack public key

  const { paymentInfo } = usePayment();

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

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="input"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className="input"
      />
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default PaystackComponent;
