import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import TrustBar from "@/components/TrustBar";
import NewInBanner from "@/components/NewInBanner";
import NewArrivals from "@/components/NewArrivals";
import CategoriesGrid from "@/components/CategoriesGrid";
import Collections from "@/components/Collections";
import Accessories from "@/components/Accessories";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <HeroCarousel />
        <TrustBar />
        <NewInBanner />
        <NewArrivals />
        <CategoriesGrid />
        <Collections />
        <Accessories />
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
}
