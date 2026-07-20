import Nav from "@/components/nav";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Journey from "@/components/journey";
import Contact from "@/components/contact";
import JsonLd from "@/components/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main" tabIndex={-1} className="scroll-mt-14">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
