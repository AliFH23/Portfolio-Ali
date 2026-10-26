const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// =========================
// Theme toggle
// =========================
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // Storage unavailable: theme still works for this visit
  }
}

setTheme(root.dataset.theme || "dark");

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// =========================
// Hero name: split into letters
// =========================
if (!reduceMotion) {
  let index = 0;
  document.querySelectorAll(".hero-name .line").forEach((line) => {
    const text = line.textContent.trim();
    line.textContent = "";
    line.setAttribute("aria-hidden", "true");
    [...text].forEach((letter) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = letter;
      span.style.setProperty("--i", index++);
      line.appendChild(span);
    });
  });
}

// =========================
// Mobile menu
// =========================
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});

// =========================
// Header behavior + scroll progress
// =========================
const header = document.querySelector(".site-header");
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.prepend(progress);

let lastY = window.scrollY;
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  progress.style.setProperty("--p", max > 0 ? y / max : 0);
  header.classList.toggle("scrolled", y > 8);

  const goingDown = y > lastY;
  const menuOpen = nav.classList.contains("open");
  header.classList.toggle("hide", goingDown && y > 300 && !menuOpen);

  lastY = y;
  ticking = false;
}

onScroll();
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true }
);

// =========================
// Highlight current section in nav
// =========================
const navLinks = [...nav.querySelectorAll("a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// =========================
// Reveal on scroll
// =========================
if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".section-title, .skill-group, .project, .job, .contact-text, .contact-form, .statement-ar"
  );

  targets.forEach((el) => {
    el.classList.add("reveal");
    if (el.classList.contains("skill-group")) {
      const position = [...el.parentElement.children].indexOf(el);
      el.style.setProperty("--d", `${position * 90}ms`);
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => revealObserver.observe(el));
}

// =========================
// Statement: words light up while scrolling
// =========================
const statement = document.querySelector(".statement-en");

if (statement && !reduceMotion) {
  const words = [];

  function appendWords(text, target) {
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        target.appendChild(document.createTextNode(" "));
        return;
      }
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = part;
      target.appendChild(span);
      words.push(span);
    });
  }

  const nodes = [...statement.childNodes];
  statement.textContent = "";
  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      appendWords(node.textContent, statement);
    } else {
      const wrapper = node.cloneNode(false);
      appendWords(node.textContent, wrapper);
      statement.appendChild(wrapper);
    }
  });

  function lightWords() {
    const rect = statement.getBoundingClientRect();
    const start = window.innerHeight * 0.85;
    const end = window.innerHeight * 0.3;
    const amount = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
    const lit = amount * words.length;
    words.forEach((word, i) => {
      word.style.setProperty("--o", Math.min(1, Math.max(0.18, lit - i)));
    });
  }

  lightWords();
  window.addEventListener("scroll", () => requestAnimationFrame(lightWords), { passive: true });
}

// =========================
// Hero photo follows the mouse slightly
// =========================
const heroPhoto = document.querySelector(".hero-photo");
const hero = document.querySelector(".hero");

if (heroPhoto && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroPhoto.style.setProperty("--mx", `${x * -14}px`);
    heroPhoto.style.setProperty("--my", `${y * -14}px`);
  });

  hero.addEventListener("mouseleave", () => {
    heroPhoto.style.setProperty("--mx", "0px");
    heroPhoto.style.setProperty("--my", "0px");
  });
}

// =========================
// Contact form (Formspree)
// =========================
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Sending...";
  formStatus.textContent = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Request failed");

    form.reset();
    formStatus.textContent = "Message sent. I'll reply by email soon.";
  } catch (err) {
    formStatus.textContent =
      "The message didn't go through. Try again, or email me directly.";
  } finally {
    button.disabled = false;
    button.textContent = "Send message";
  }
});

// =========================
// Footer year
// =========================
document.getElementById("year").textContent = new Date().getFullYear();