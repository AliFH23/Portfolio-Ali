import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { profile, socials, navLinks } from "../../data/content";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="footer__logo">
            <span className="footer__mark">AH</span>
            {profile.name}
          </a>
          <p className="footer__tagline">{profile.role}</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <ul className="footer__socials">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <motion.a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
              >
                <Icon />
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container footer__bottom">
        <p>
          &copy; {year} {profile.name}. Built with React, Three.js and Framer Motion.
        </p>
        <motion.a
          href="#top"
          className="footer__top"
          aria-label="Back to top"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp />
        </motion.a>
      </div>
    </footer>
  );
}

export default Footer;