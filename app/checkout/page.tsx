import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/shared/CustomerForm'),
  { ssr: false }
)

export default function CheckoutPage() {
  return (
    <div className=" wrapper flex-center">
      <DynamicComponentWithNoSSR />
    </div>
  );
}