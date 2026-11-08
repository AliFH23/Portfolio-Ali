import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Statement from "./components/Statement/Statement";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Training from "./components/Training/Training";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Skills />
        <Projects />
        <Experience />
        <Training />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;