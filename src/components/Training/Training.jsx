import { motion } from "framer-motion";
import { FiAward, FiCheck } from "react-icons/fi";
import { training } from "../../data/content";
import { findSkill } from "../Projects/findSkill";
import "./Training.css";

const ease = [0.2, 0.7, 0.2, 1];

function Training() {
  const { courses } = training;
  const doneCount = courses.filter((c) => c.status === "done").length;
  // Fill the track up to the course in progress (halfway into it)
  const progress = Math.min(1, (doneCount + 0.5) / courses.length);

  return (
    <section className="section training" id="training">
      <div className="container">
        <motion.div
          className="training__head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="section-head">
            <h2 className="section-title">
              Learning <span className="grad">path</span>
            </h2>
            <p className="section-sub">
              {training.title} at {training.provider}. {training.duration}, {training.date}.
            </p>
          </div>

          <p className="training__cert">
            <FiAward aria-hidden="true" />
            {training.certificate}
          </p>
        </motion.div>

        {/* Progress track */}
        <div className="training__track" aria-hidden="true">
          <motion.div
            className="training__fill"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: progress }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.6, ease, delay: 0.2 }}
          />
        </div>

        <ol className="training__list">
          {courses.map((course, i) => {
            const done = course.status === "done";
            return (
              <motion.li
                key={course.title}
                className={`course ${done ? "course--done" : "course--progress"}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.12 }}
                whileHover={{ y: -8 }}
              >
                <div className="course__top">
                  <span className="course__step">
                    {done ? <FiCheck aria-hidden="true" /> : i + 1}
                  </span>
                  <span className="course__status">
                    {done ? "Completed" : "In progress"}
                  </span>
                </div>

                <p className="course__label">Course {i + 1}</p>
                <h3 className="course__title">{course.title}</h3>

                <ul className="course__stack">
                  {course.stack.map((name) => {
                    const skill = findSkill(name);
                    const Icon = skill?.icon;
                    if (!Icon) return null;
                    return (
                      <li key={name} style={{ "--c": skill.color }} title={name}>
                        <Icon aria-hidden="true" />
                        <span className="course__tip">{name}</span>
                      </li>
                    );
                  })}
                </ul>

                {course.topics.length > 0 && (
                  <ul className="course__topics">
                    {course.topics.map(({ label, icon: Icon }) => (
                      <li key={label}>
                        <Icon aria-hidden="true" />
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default Training;