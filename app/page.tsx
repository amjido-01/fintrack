"use client";
import Hero from "@/components/Hero";
import HoverSpring from "@/components/HoverSpring";
import AnimatedLogoCloud from "@/components/AnimatedLogoCloud";
import Works from "@/components/Works";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main className="">
      <Navbar />
     <Hero />
      <HoverSpring />
      <AnimatedLogoCloud />
      <Works />
      <Testimonial direction="left" />
      <CTA />
      <Footer />
    </main>
  );
}
