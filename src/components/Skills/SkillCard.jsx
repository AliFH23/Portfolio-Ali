import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../../data/content";

const projectTitle = (id) => projects.find((p) => p.id === id)?.title ?? id;

function SkillCard({ skill, index }) {
  const [flipped, setFlipped] = useState(false);
  const { name, icon: Icon, color, usedIn, note } = skill;

  // Spotlight that follows the mouse inside the card
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.li
      layout
      className="skill"
      style={{ "--skill": color }}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <button
        type="button"
        className="skill__button"
        onClick={() => setFlipped((v) => !v)}
        onMouseMove={handleMove}
        aria-pressed={flipped}
        aria-label={`${name}. ${flipped ? "Hide" : "Show"} where I used it`}
      >
        <motion.div
          className="skill__inner"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {/* Front */}
          <div className="skill__face skill__front">
            <span className="skill__glow" aria-hidden="true" />
            <Icon className="skill__icon" aria-hidden="true" />
            <span className="skill__name">{name}</span>
          </div>

          {/* Back */}
          <div className="skill__face skill__back">
            <span className="skill__back-title">
              {usedIn.length > 0 ? "Used in" : "Learned in"}
            </span>
            {usedIn.length > 0 ? (
              <ul className="skill__projects">
                {usedIn.slice(0, 3).map((id) => (
                  <li key={id}>{projectTitle(id)}</li>
                ))}
              </ul>
            ) : (
              <span className="skill__note">{note}</span>
            )}
          </div>
        </motion.div>
      </button>
    </motion.li>
  );
}

export default SkillCard;