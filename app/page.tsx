import FeaturesSection from "@/components/Feature";
import Footer from "@/components/Footer";
import { BentoDemo } from "@/components/Grid";
import HeroSection from "@/components/Hero";
import ID from "@/components/id";


export default function Home() {
  return <>
  <HeroSection/>
  <BentoDemo/>
  <FeaturesSection/>
  <ID/>
  <Footer/>
  </>;
}
