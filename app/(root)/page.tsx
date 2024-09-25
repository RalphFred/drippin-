import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";
import Products from "@/components/shared/Products";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
    </div>
  );
}
