import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck, FiSend, FiAlertCircle, FiMapPin, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile, socials } from "../../data/content";
import "./Contact.css";

const ease = [0.2, 0.7, 0.2, 1];

function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(profile.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const linkedin = socials.find((s) => s.label === "LinkedIn");
  const github = socials.find((s) => s.label === "GitHub");

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        {/* Left side */}
        <motion.div
          className="contact__intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="section-title">
            Let&apos;s work <span className="grad">together</span>
          </h2>
          <p className="section-sub">
            Open to junior roles, internships and freelance web projects. I usually reply within a day.
          </p>

          <div className="contact__cards">
            <button type="button" className="contact-card" onClick={copyEmail}>
              <span className="contact-card__icon">
                <FiMail aria-hidden="true" />
              </span>
              <span className="contact-card__text">
                <span className="contact-card__label">Email</span>
                <span className="contact-card__value">{profile.email}</span>
              </span>
              <span className="contact-card__action" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="done"
                      className="contact-card__copied"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                    >
                      <FiCheck aria-hidden="true" /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                    >
                      <FiCopy aria-label="Copy email" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>

            <a className="contact-card" href={linkedin.href} target="_blank" rel="noopener noreferrer">
              <span className="contact-card__icon contact-card__icon--linkedin">
                <FaLinkedin aria-hidden="true" />
              </span>
              <span className="contact-card__text">
                <span className="contact-card__label">LinkedIn</span>
                <span className="contact-card__value">Ali Harb</span>
              </span>
            </a>

            <a className="contact-card" href={github.href} target="_blank" rel="noopener noreferrer">
              <span className="contact-card__icon">
                <FaGithub aria-hidden="true" />
              </span>
              <span className="contact-card__text">
                <span className="contact-card__label">GitHub</span>
                <span className="contact-card__value">AliFH23</span>
              </span>
            </a>

            <div className="contact-card contact-card--static">
              <span className="contact-card__icon">
                <FiMapPin aria-hidden="true" />
              </span>
              <span className="contact-card__text">
                <span className="contact-card__label">Location</span>
                <span className="contact-card__value">{profile.location}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                className="contact__success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
              >
                <motion.span
                  className="contact__success-icon"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                >
                  <FiCheck aria-hidden="true" />
                </motion.span>
                <h3>Message sent</h3>
                <p>Thanks for reaching out. I&apos;ll reply by email soon.</p>
                <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact__form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="field">
                  <input id="name" name="name" type="text" required placeholder=" " autoComplete="name" />
                  <label htmlFor="name">Your name</label>
                </div>

                <div className="field">
                  <input id="email" name="email" type="email" required placeholder=" " autoComplete="email" />
                  <label htmlFor="email">Your email</label>
                </div>

                <div className="field">
                  <textarea id="message" name="message" rows="5" required placeholder=" " dir="auto" />
                  <label htmlFor="message">Your message</label>
                </div>

                {status === "error" && (
                  <p className="contact__error" role="alert">
                    <FiAlertCircle aria-hidden="true" />
                    The message didn&apos;t go through. Try again, or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contact__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <FiSend aria-hidden="true" className="contact__send-icon" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;