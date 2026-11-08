import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub, FiMaximize2 } from "react-icons/fi";
import { findSkill } from "./findSkill";

function ProjectCard({ project, index, featured, onOpen }) {
  // Mouse position inside the card, from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth 3D tilt (softer on the wide featured card)
  const tilt = featured ? 4 : 9;
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tilt, -tilt]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tilt, tilt]), { stiffness: 200, damping: 20 });

  // Light reflection that follows the mouse
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      className={`project-card ${featured ? "project-card--featured" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <motion.div
        className="project-card__tilt"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.span
          className="project-card__glare"
          aria-hidden="true"
          style={{ "--gx": glareX, "--gy": glareY }}
        />

        <button
          type="button"
          className={`project-card__media project-card__media--${project.fit}`}
          onClick={() => onOpen(project)}
          aria-label={`Open details for ${project.title}`}
        >
          <img src={project.image} alt="" loading="lazy" />
          <span className="project-card__open" aria-hidden="true">
            <FiMaximize2 />
            View details
          </span>
        </button>

        <div className="project-card__body">
          <div className="project-card__head">
            <div>
              <p className="project-card__meta">
                {project.role} · {project.year}
              </p>
              <h3 className="project-card__title">{project.title}</h3>
            </div>

            <div className="project-card__links">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`}>
                  <FiExternalLink />
                </a>
              )}
              {project.code && (
                <a href={project.code} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>
                  <FiGithub />
                </a>
              )}
            </div>
          </div>

          <p className="project-card__summary">{project.summary}</p>

          <ul className="project-card__stack">
            {project.stack.map((name) => {
              const skill = findSkill(name);
              const Icon = skill?.icon;
              return (
                <li key={name} style={{ "--chip": skill?.color ?? "var(--accent)" }}>
                  {Icon && <Icon aria-hidden="true" />}
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default ProjectCard;