"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Competitions from "./components/Competitions";
import Volunteering from "./components/Volunteering";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BootSequence from "./components/BootSequence";
import LiveBackground from "./components/LiveBackground";
import CursorFx from "./components/CursorFx";
import ScrollUI from "./components/ScrollUI";
import CommandPalette from "./components/CommandPalette";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <BootSequence />
      <LiveBackground />
      <CursorFx />
      <ScrollUI />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Competitions />
        <Volunteering />
        <Contact />
      </main>
      <Footer />

      <button
        onClick={scrollToTop}
        className={`scroll-top ${showScrollTop ? "active" : ""}`}
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up-short"></i>
      </button>
    </>
  );
}
