import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiDownload, FiMapPin } from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { profile, socials } from "../../data/content";
import "./Hero.css";

// Load the 3D scene separately so the text appears first
const NetworkBackground = lazy(() => import("./NetworkBackground"));

const ease = [0.2, 0.7, 0.2, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const badges = [
  { icon: FaReact, label: "React", color: "#61DAFB", className: "hero__badge--1" },
  { icon: FaNodeJs, label: "Node.js", color: "#6CC24A", className: "hero__badge--2" },
  { icon: SiMongodb, label: "MongoDB", color: "#47A248", className: "hero__badge--3" },
];

function AnimatedWord({ word, delay }) {
  return (
    <span className="hero__word" aria-hidden="true">
      {word.split("").map((letter, i) => (
        <motion.span
          key={i}
          className="hero__letter"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease, delay: delay + i * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const [first, last] = profile.name.split(" ");

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <Suspense fallback={null}>
          <NetworkBackground reduceMotion={reduceMotion} />
        </Suspense>
        <div className="hero__fade" />
      </div>

      <div className="container hero__grid">
        <motion.div className="hero__text" variants={container} initial="hidden" animate="show">
          <motion.p className="hero__status" variants={item}>
            <span className="hero__dot" aria-hidden="true" />
            Available for junior roles
          </motion.p>

          <h1 className="hero__name" aria-label={profile.name}>
            <AnimatedWord word={first} delay={0.3} />
            <AnimatedWord word={last} delay={0.5} />
          </h1>

          <motion.p className="hero__role" variants={item}>
            {profile.role}
          </motion.p>

          <motion.p className="hero__intro" variants={item}>
            {profile.intro}
          </motion.p>

          <motion.p className="hero__location" variants={item}>
            <FiMapPin aria-hidden="true" />
            {profile.location}
          </motion.p>

          <motion.div className="hero__actions" variants={item}>
            <a href="#work" className="btn btn-primary">
              See my work
            </a>
            <a href={profile.cv} download className="btn btn-ghost">
              <FiDownload aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.ul className="hero__socials" variants={item}>
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon />
                </motion.a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
        >
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__photo">
            <img src={profile.photo} alt={`Portrait of ${profile.name}`} />
          </div>

          {badges.map(({ icon: Icon, label, color, className }, i) => (
            <motion.div
              key={label}
              className={`hero__badge ${className}`}
              style={{ "--badge": color }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, -10, 0] }
              }
              transition={{
                opacity: { delay: 1 + i * 0.15, duration: 0.5 },
                scale: { delay: 1 + i * 0.15, duration: 0.5 },
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: 1.5 + i * 0.3 },
              }}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;