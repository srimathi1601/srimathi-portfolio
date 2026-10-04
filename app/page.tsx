import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
export default function Home() {
  return (
  <>
  <Navbar/>
  <Hero/>
  <About/>
  <Experience/>
  <Projects />
  <Skills />
  <Footer/>
  </>
  );
}
