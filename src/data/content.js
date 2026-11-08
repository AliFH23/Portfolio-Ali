import {
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaBootstrap,
  FaGitAlt, FaGithub, FaLinkedin, FaDatabase, FaEnvelope,
} from "react-icons/fa";
import {
  SiJavascript, SiVite, SiMui, SiExpress, SiMongodb,
  SiPostgresql, SiCplusplus, SiJsonwebtokens, SiRender, SiTailwindcss,
} from "react-icons/si";
import { TbBrandCSharp, TbApi } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { FiLock, FiLayout, FiUploadCloud, FiCpu, FiLink } from "react-icons/fi";

// Works locally and after deploying to GitHub Pages
const base = import.meta.env.BASE_URL;
export const asset = (path) => `${base}${path}`;

/* =========================
   Profile
   ========================= */
export const profile = {
  name: "Ali Harb",
  role: "Full-Stack Developer (MERN)",
  location: "Irbid, Jordan",
  intro:
    "Software Engineering graduate from JUST. I build web apps for real businesses, from the React interface to the API and database behind it.",
  photo: asset("images/ali.jpg"),
  cv: asset("cv/Ali-Harb-CV.pdf"),
  email: "aliharb229@gmail.com",
  formEndpoint: "https://formspree.io/f/xyeewyjb",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/AliFH23", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ali-harb-17527a294", icon: FaLinkedin },
  { label: "Email", href: "mailto:aliharb229@gmail.com", icon: FaEnvelope },
];

export const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* =========================
   Statement
   ========================= */
export const statement = {
  en: "Disability is not a barrier to ambition. It is an extra drive to create and excel.",
  highlight: "extra drive",
  ar: "الإعاقة ليست عائقاً أمام الطموح، بل دافع إضافي للإبداع والتفوق",
};

/* =========================
   Skills
   usedIn: project ids from the projects list below
   note: shown when usedIn is empty
   ========================= */
export const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: FaReact, color: "#61DAFB", usedIn: ["mawrid", "sdk-website", "yearbook"] },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", usedIn: ["mawrid", "sdk-website", "gce", "yearbook"] },
      { name: "HTML5", icon: FaHtml5, color: "#E34F26", usedIn: ["gce", "sdk-website"] },
      { name: "CSS3", icon: FaCss3Alt, color: "#2965F1", usedIn: ["gce", "sdk-website"] },
      { name: "Vite", icon: SiVite, color: "#A78BFA", usedIn: ["sdk-website", "yearbook", "mawrid"] },
      { name: "Material UI", icon: SiMui, color: "#007FFF", usedIn: ["mawrid", "sdk-website"] },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", usedIn: [], note: "Full-stack training track" },
      { name: "Bootstrap", icon: FaBootstrap, color: "#9B6BFF", usedIn: [], note: "Full-stack training track" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#6CC24A", usedIn: ["mawrid", "yearbook"] },
      { name: "Express", icon: SiExpress, color: "#E6EDF7", usedIn: ["mawrid", "yearbook"] },
      { name: "REST APIs", icon: TbApi, color: "#2DD4BF", usedIn: ["mawrid", "yearbook"] },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "#D63AFF", usedIn: ["mawrid", "yearbook"] },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", usedIn: ["mawrid", "yearbook"] },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#5B8DEF", usedIn: [], note: "Full-stack training track" },
      { name: "SQL", icon: FaDatabase, color: "#F29111", usedIn: [], note: "University coursework" },
    ],
  },
  {
    title: "Languages and tools",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "#659AD2", usedIn: [], note: "University coursework" },
      { name: "C#", icon: TbBrandCSharp, color: "#A179DC", usedIn: [], note: "University coursework" },
      { name: "Git", icon: FaGitAlt, color: "#F05032", usedIn: ["mawrid", "sdk-website", "gce", "yearbook"] },
      { name: "GitHub", icon: FaGithub, color: "#E6EDF7", usedIn: ["mawrid", "sdk-website", "gce", "yearbook"] },
      { name: "VS Code", icon: VscVscode, color: "#23A9F2", usedIn: ["mawrid", "sdk-website", "gce", "yearbook"] },
      { name: "Render", icon: SiRender, color: "#46E3B7", usedIn: ["mawrid"] },
    ],
  },
];

/* =========================
   Projects
   fit: "cover" for screenshots, "logo" for logos
   ========================= */
export const projects = [
  {
    id: "mawrid",
    title: "Mawrid",
    tagline: "B2B group-buying platform",
    year: "2026",
    role: "Full-stack developer",
    image: asset("images/mawrid.png"),
    fit: "logo",
    summary:
      "Pools purchase orders from small shops so together they reach a supplier's minimum order and unlock wholesale prices.",
    highlights: [
      "Groups orders by product, category and region",
      "Role-based access for Admin, Supplier and Buyer with JWT",
      "Layered MVC backend: routes, controllers and models",
      "MongoDB data model with many-to-many shop categories",
    ],
    stack: ["React", "Material UI", "Node.js", "Express", "MongoDB", "JWT Auth"],
    live: null,
    code: "https://github.com/AliFH23/mawrid-backend",
  },
  {
    id: "yearbook",
    title: "SDK Graduate Yearbook",
    tagline: "Yearbook website with an admin panel",
    year: "2026",
    role: "Built for SDK Software",
    image: asset("images/sdk.png"),
    fit: "logo",
    summary:
      "A yearbook website celebrating the company's graduates, with a protected admin panel so staff manage graduate profiles without touching code.",
    highlights: [
      "React frontend with graduate profiles",
      "Node.js and Express API on MongoDB Atlas",
      "JWT login and a protected /admin route",
      "Add, edit and remove graduates from the browser",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT Auth"],
    live: null,
    code: null,
  },
  {
    id: "sdk-website",
    title: "SDK Software Website",
    tagline: "Bilingual company website",
    year: "2026",
    role: "Built for SDK Software",
    image: asset("images/sdk.png"),
    fit: "logo",
    summary:
      "A company profile site presenting SDK's services, departments, accreditations and partners, in Arabic and English.",
    highlights: [
      "Full Arabic and English support with right-to-left layout",
      "Services, departments, accreditations and partners sections",
      "Contact form that emails the company via EmailJS",
    ],
    stack: ["React", "Vite", "Material UI", "JavaScript"],
    live: "https://alifh23.github.io/Ali-SDK/",
    code: "https://github.com/AliFH23/Ali-SDK",
  },
  {
    id: "gce",
    title: "GCE 2026",
    tagline: "Annual student exhibition website",
    year: "2026",
    role: "Built for SDK Software",
    image: asset("images/GCE.png"),
    fit: "logo",
    summary:
      "The website for GCE, SDK Software's yearly exhibition where students present their projects to employers and specialists.",
    highlights: [
      "20 student projects grouped by theme",
      "Archive pages for the 2023 to 2025 editions",
      "Live countdown to the event and a registration section",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    live: "https://alifh23.github.io/SDK-GCE/",
    code: "https://github.com/AliFH23/SDK-GCE",
  },
];

/* =========================
   Experience and education
   ========================= */
export const experience = {
  title: "Web Development Trainee",
  company: "SDK Software",
  place: "Irbid, Jordan",
  date: "Jul 2026 – Sep 2026",
  steps: [
    { month: "July", text: "Worked on a live company website with HTML, CSS and JavaScript." },
    { month: "August", text: "Moved to React and built frontend features for company projects." },
    { month: "September", text: "Built backend features with Node.js, Express and MongoDB." },
  ],
};

export const education = {
  degree: "B.Sc. in Software Engineering",
  school: "Jordan University of Science and Technology (JUST)",
  place: "Irbid, Jordan",
  date: "2022 – 2026",
};

/* =========================
   Training track
   status: "done" or "progress"
   ========================= */
export const training = {
  title: "MERN Full-Stack Track",
  provider: "SDK Software",
  duration: "8 months",
  date: "May 2026 – Dec 2026",
  certificate: "Track certificate on completion, Dec 2026",
  courses: [
    {
      title: "Frontend Fundamentals",
      status: "done",
      stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      topics: [],
    },
    {
      title: "React Development",
      status: "done",
      stack: ["React", "Vite", "Material UI", "Tailwind CSS"],
      topics: [],
    },
    {
      title: "Backend Development",
      status: "done",
      stack: ["Node.js", "Express", "MongoDB", "JWT Auth"],
      topics: [
        { label: "Authentication", icon: FiLock },
        { label: "Admin dashboard", icon: FiLayout },
      ],
    },
    {
      title: "Advanced Backend",
      status: "progress",
      stack: ["PostgreSQL", "Render"],
      topics: [
        { label: "Deployment", icon: FiUploadCloud },
        { label: "AI integration", icon: FiCpu },
        { label: "Third-party APIs", icon: FiLink },
      ],
    },
  ],
};