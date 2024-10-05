"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/app/CartContext";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { usePayment } from "@/app/PaymentContext";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import PaystackComponent from "./Paystack";

import { PaystackButton } from "react-paystack";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Enter a valid name",
  }),
  email: z.string().email("Enter a valid email address."),
  number: z.string(),
  address: z.string().min(2, {
    message: "Please enter a valid address",
  }),
});

export default function CustomerForm() {
  const { cartItems } = useCart();
  const { updatePaymentInfo, submitPayment } = usePayment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePaymentInfo(values);
    submitPayment();
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formattedTotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(total);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white w-full md:w-[36rem] lg:w-[56rem] mt-[120px]">
        <div className="flex-between">
          <div className="text-3xl mb-8 font-semibold">Contact Details</div>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs text-gray-700">
                  Full name
                </FormLabel>
                <FormControl className="m-0">
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="rounded-[8px] border-2 border-gray-300 placeholder:text-slate-400"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    {...field}
                    className="rounded-[8px] border-2 border-gray-300 placeholder:text-slate-400"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs text-gray-700">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="NG"
                    international
                    withCountryCallingCode
                    placeholder="Enter phone number"
                    {...field}
                    className="input-phone"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-700">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter full address"
                    {...field}
                    className="rounded-[8px] border-2 border-gray-300 placeholder:text-slate-400 py-2 px-4"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-light-1 rounded-[12px] text-center text-sm text-gray-500 py-2 flex-between px-4 mb-6">
          <span className="inline-block">Total:</span>{" "}
          <span className="inline-block">{formattedTotal}</span>
        </div>

        <PaystackComponent />
      </form>
    </Form>
  );
}
