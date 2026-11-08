import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data/content";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import "./Projects.css";

function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section projects" id="work">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">
            Selected <span className="grad">work</span>
          </h2>
          <p className="section-sub">
            Real projects for real businesses. Open any card for the full story.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              featured={i === 0}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;