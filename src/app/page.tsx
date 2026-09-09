import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WholesaleBanner } from "@/components/home/WholesaleBanner";
import { WhyUs } from "@/components/home/WhyUs";
import { AutomotiveSection } from "@/components/home/AutomotiveSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <WholesaleBanner />
      <WhyUs />
      <AutomotiveSection />
    </>
  );
}
