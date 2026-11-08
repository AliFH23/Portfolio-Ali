import { motion } from "framer-motion";
import { FaHtml5, FaReact, FaNodeJs, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { experience, education } from "../../data/content";
import "./Experience.css";

// Icon and color for each month of the traineeship
const stepStyles = [
  { icon: FaHtml5, color: "#E34F26" },
  { icon: FaReact, color: "#61DAFB" },
  { icon: FaNodeJs, color: "#6CC24A" },
];

const ease = [0.2, 0.7, 0.2, 1];

function Experience() {
  const lastStep = experience.steps.length - 1;

  return (
    <section className="section experience" id="experience">
      <div className="container experience__grid">
        {/* Left: title and role */}
        <motion.div
          className="experience__intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="section-title">
            Experience and <span className="grad">education</span>
          </h2>

          <div className="role-card">
            <span className="role-card__icon" aria-hidden="true">
              <FaBriefcase />
            </span>
            <div>
              <h3 className="role-card__title">{experience.title}</h3>
              <p className="role-card__company">{experience.company}</p>
              <ul className="role-card__meta">
                <li>
                  <FiCalendar aria-hidden="true" />
                  {experience.date}
                </li>
                <li>
                  <FiMapPin aria-hidden="true" />
                  {experience.place}
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Right: month by month timeline */}
        <div className="timeline">
          <ol className="timeline__list">
            {experience.steps.map((step, i) => {
              const { icon: Icon, color } = stepStyles[i] ?? stepStyles[0];
              return (
                <motion.li
                  key={step.month}
                  className="timeline__item"
                  style={{ "--step": color }}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {/* Line that draws down to the next month */}
                  {i < lastStep && (
                    <motion.span
                      className="timeline__connector"
                      aria-hidden="true"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.9, ease, delay: 0.3 }}
                    />
                  )}

                  <motion.span
                    className="timeline__node"
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                  >
                    <Icon />
                  </motion.span>

                  <div className="timeline__card">
                    <span className="timeline__month">{step.month} 2026</span>
                    <p>{step.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* Education at the end of the timeline */}
          <motion.div
            className="edu-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
          >
            <motion.span
              className="edu-card__icon"
              aria-hidden="true"
              whileHover={{ rotate: -12, scale: 1.1 }}
            >
              <FaGraduationCap />
            </motion.span>
            <div>
              <h3 className="edu-card__degree">{education.degree}</h3>
              <p className="edu-card__school">{education.school}</p>
              <ul className="role-card__meta">
                <li>
                  <FiCalendar aria-hidden="true" />
                  {education.date}
                </li>
                <li>
                  <FiMapPin aria-hidden="true" />
                  {education.place}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experience;