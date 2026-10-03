import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/sections/Hero";
import Ticker from "@/components/landing/sections/Ticker";
import Features from "@/components/landing/sections/Features";
import HowItWorks from "@/components/landing/sections/HowItWorks";
import VideoShowcase from "@/components/landing/sections/VideoShowcase";
import Segments from "@/components/landing/sections/Segments";
import Details from "@/components/landing/sections/Details";
import Plans from "@/components/landing/sections/Plans";
import Faq from "@/components/landing/sections/Faq";
import Warranty from "@/components/landing/sections/Warranty";
import FinalCta from "@/components/landing/sections/FinalCta";

export default function Home() {
  return (
    <div className="overflow-x-clip font-sans">
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Features />
        <HowItWorks />
        <VideoShowcase />
        <Segments />
        <Details />
        <Plans />
        <Faq />
        <Warranty />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
