import FeaturesSection from "@/components/Feature";
import Footer from "@/components/Footer";
import { BentoDemo } from "@/components/Grid";
import HeroSection from "@/components/Hero";
import ID from "@/components/id";
import { Appbar } from "@/components/Navbar";


export default function Home() {
  return <>
  <Appbar/>
  <HeroSection/>
  <BentoDemo/>
  <FeaturesSection/>
  <ID/>
  <Footer/>
  </>;
}
