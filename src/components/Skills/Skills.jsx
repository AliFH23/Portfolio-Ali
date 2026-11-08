import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { skillGroups } from "../../data/content";
import SkillCard from "./SkillCard";
import "./Skills.css";

const ALL = "All";
const tabs = [ALL, ...skillGroups.map((g) => g.title)];

function Skills() {
  const [active, setActive] = useState(ALL);

  const visible =
    active === ALL
      ? skillGroups.flatMap((g) => g.skills)
      : skillGroups.find((g) => g.title === active).skills;

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">
            Skills and <span className="grad">tools</span>
          </h2>
          <p className="section-sub">
            Tap any card to see the projects where I used it.
          </p>
        </motion.div>

        <LayoutGroup>
          <div className="skills__tabs" role="tablist" aria-label="Skill categories">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active === tab}
                className={`skills__tab ${active === tab ? "is-active" : ""}`}
                onClick={() => setActive(tab)}
              >
                {active === tab && (
                  <motion.span
                    layoutId="skills-tab"
                    className="skills__tab-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="skills__tab-label">{tab}</span>
              </button>
            ))}
          </div>

          <motion.ul layout className="skills__grid">
            <AnimatePresence mode="popLayout">
              {visible.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}

export default Skills;