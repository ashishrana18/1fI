import HeroSection from "./components/HeroSection";
import ProductsGrid from "./components/ProductsGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <ProductsGrid/>
    </div>
  );
}
