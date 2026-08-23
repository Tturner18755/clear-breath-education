import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { HowItWorks } from "@/components/site/HowItWorks";
import { About } from "@/components/site/About";
import { Disclaimer } from "@/components/site/Disclaimer";
import { Booking } from "@/components/site/Booking";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <Disclaimer />
        <Booking />
      </main>
      <SiteFooter />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}
