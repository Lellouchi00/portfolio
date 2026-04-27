// ============================================================
//  DATA FILE — Edit this file to update your portfolio content
// ============================================================

// ─── PERSONAL INFO ──────────────────────────────────────────
export const personalInfo = {
  name: "Lellouchi Abderahmen",
  title: "Full Stack Web Developer",
  tagline: "I build web applications",
  bio: "Crafting resilient backend architectures and visually stunning frontend experiences. I turn complex problems into elegant, scalable digital solutions.",
  email: "abderahmenelk@gmail.com",
  phone: "+213 782204879",
  address: "Ghelizan, Algeria",
  github: "https://github.com/Lellouchi00",
  linkedin: "https://www.linkedin.com/in/lellouchi-zakaria-abderahmen-969780403/",
  resumeUrl: "/resume.pdf", 
};

// ─── ABOUT STATS ────────────────────────────────────────────
export const stats = [
  { value: "1+", label: "Years Experience" },
  { value: "4+", label: "Projects Built" },
 
];

// ─── ABOUT CARDS ────────────────────────────────────────────
export const aboutCards = [
  {
    icon: "🌐",
    title: "Web Development",
    description: "Building responsive, performant, and accessible web applications with modern technologies.",
  },
  {
    icon: "⚙️",
    title: "Software Engineering",
    description: "Designing scalable system architectures and writing clean, maintainable code.",
  },
  {
    icon: "📋",
    title: "Project Management",
    description: "Leading projects from conception to deployment with agile methodologies.",
  },
];

export const skills = [
  // Frontend
  { name: "HTML5", level: 100, category: "frontend", icon: "html5" },
  { name: "CSS3", level: 100, category: "frontend", icon: "css3" },
  { name: "JavaScript", level: 85, category: "frontend", icon: "js" },
  { name: "React", level: 50, category: "frontend", icon: "react" },

  // Backend
  { name: "Node.js", level: 90, category: "backend", icon: "nodejs" },
  { name: "Express.js", level: 90, category: "backend", icon: "express" },
  { name: "MongoDB", level: 80, category: "backend", icon: "mongodb" },

  // Add new skills below — they appear automatically:
  // { name: "CTF", level: 65, category: "other", icon: "shield" },
  // { name: "Cybersecurity", level: 60, category: "other", icon: "security" },
  // { name: "TypeScript", level: 70, category: "frontend", icon: "typescript" },
  // { name: "PostgreSQL", level: 68, category: "backend", icon: "database" },
];

// ─── PROJECTS ───────────────────────────────────────────────
// To add a project: add a new object to this array!
export const projects = [
  {
    id: 1,
    title: "Ecrili Platform",
    description: "A full-stack e-commerce app with React, Node.js, and MongoDB. Features include auth, cart, payment integration, and admin dashboard.",
    image: "/images/project1.png", 
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Lellouchi00/Ecrili",
    featured: true,
  },
  {
    id: 2,
    title: "Epices-shop Platform",
    description: "A full-stack e-commerce app with React, Node.js, and MongoDB. Features include auth, cart, payment integration, and admin dashboard.",
    image: "/images/project2.png", 
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Lellouchi00/Spices_Shop",
    featured: true,
  },
   {
    id: 3,
    title: "Card Matcher Game",
    description: "A full-stack e-commerce app with React, Node.js, and MongoDB. Features include auth, cart, payment integration, and admin dashboard.",
    image: "/images/project3.png", 
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Lellouchi00/Card-matcher",
    featured: true,
  },
  
];
