import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiX, FiCheck, FiExternalLink, FiGithub, FiLock } from "react-icons/fi";
import { findSkill } from "./findSkill";

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  // Lock page scroll, focus the close button, close with Escape
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>

        <div className={`modal__media modal__media--${project.fit}`}>
          <img src={project.image} alt={`${project.title} preview`} />
        </div>

        <div className="modal__body">
          <p className="modal__meta">
            {project.role} · {project.year}
          </p>
          <h3 className="modal__title" id="modal-title">
            {project.title}
          </h3>
          <p className="modal__tagline">{project.tagline}</p>
          <p className="modal__summary">{project.summary}</p>

          <h4 className="modal__heading">What I built</h4>
          <ul className="modal__highlights">
            {project.highlights.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <FiCheck aria-hidden="true" />
                {point}
              </motion.li>
            ))}
          </ul>

          <h4 className="modal__heading">Tech stack</h4>
          <ul className="modal__stack">
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

          <div className="modal__actions">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FiExternalLink aria-hidden="true" />
                Live site
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FiGithub aria-hidden="true" />
                Source code
              </a>
            )}
            {!project.live && !project.code && (
              <p className="modal__private">
                <FiLock aria-hidden="true" />
                Built for a client. Demo available on request.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectModal;