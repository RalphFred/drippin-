"use client"

import { createContext, useContext, useState } from "react";

type PaymentInfo = {
  fullname: string,
  email: string,
  number: string,
  address: string,
}

type PaymentContextType = {
  paymentInfo: PaymentInfo;
  updatePaymentInfo: (info: Partial<PaymentInfo>) => void;
  submitPayment: () => Promise<void>;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

export default function PaymentProvider({ children }: { children: React.ReactNode}) {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    fullname: "",
    email: "",
    number: "",
    address: "",
  });

 
  const updatePaymentInfo = (info: Partial<PaymentInfo>) => {
    setPaymentInfo((prev) => ({ ...prev, ...info }));
  };


  const initiatePaystackPayment = () => {
    console.log(paymentInfo.email);
  };

  const submitPayment = async () => {
    try {
      console.log("Submitting Payment: ", paymentInfo);
      initiatePaystackPayment();

    } catch (error) {
      console.error("Error submitting payment info: ", error);
    }
  };

  return (
    <PaymentContext.Provider value={{ paymentInfo, updatePaymentInfo, submitPayment }}>
      {children}
    </PaymentContext.Provider>
  );
}