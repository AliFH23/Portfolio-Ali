import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { statement } from "../../data/content";
import "./Statement.css";

// One word that lights up as its part of the scroll is reached
function Word({ children, progress, range, highlight }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      className={`statement__word ${highlight ? "statement__word--hl" : ""}`}
      style={{ opacity }}
    >
      {children}
    </motion.span>
  );
}

function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = statement.en.split(" ");
  const highlightWords = statement.highlight.split(" ");

  return (
    <section className="statement" aria-label="Personal statement">
      <div className="container statement__inner" ref={ref}>
        <span className="statement__quote" aria-hidden="true">&ldquo;</span>

        <p className="statement__en" aria-label={statement.en}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const clean = word.replace(/[.,]/g, "");
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                highlight={highlightWords.includes(clean)}
              >
                {word}
              </Word>
            );
          })}
        </p>

        <motion.p
          className="statement__ar"
          lang="ar"
          dir="rtl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {statement.ar}
        </motion.p>
      </div>
    </section>
  );
}

export default Statement;