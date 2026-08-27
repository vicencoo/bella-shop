import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WardrobeRail from "@/components/WardrobeRail";
import CategoryStrip from "@/components/CategoryStrip";
import Editorial from "@/components/Editorial";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WardrobeRail />
      <CategoryStrip />
      <Editorial />
    </>
  );
}
