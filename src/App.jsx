import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import {
  Github, ExternalLink, Download, Mail, Linkedin, Twitter,
  ChevronDown, MapPin, Cpu, Database, Wrench, Code2, Layers,
  ArrowRight, Zap, Shield, Globe, Menu, X
} from "lucide-react";
import sivaProfile from "./assets/siva.JPG";
import capitalFinder from "./assets/capitalfinder.png";
import realTicker from "./assets/realticker.jpeg";
import fashionStore from "./assets/fashionstore.jpeg";
import cureConnect from "./assets/cureconnect.jpeg";

/* ─── Google Fonts ─── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap";
document.head.appendChild(fontLink);

/* ─── Global Style Injection ─── */
const styleEl = document.createElement("style");
styleEl.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #ffffff;
    color: #0B0F19;
    overflow-x: hidden;
  }
  .grid-bg {
    background-color: #ffffff;
    background-image:
      linear-gradient(rgba(11,15,25,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(11,15,25,0.045) 1px, transparent 1px);
    background-size: 44px 44px;
  }
  .mono { font-family: 'DM Mono', monospace; }
  .underline-accent {
    position: relative;
    display: inline-block;
  }
  .underline-accent::after {
    content: '';
    position: absolute;
    left: 0; bottom: -3px;
    width: 100%; height: 4px;
    background: linear-gradient(90deg, #2563EB, #06B6D4);
    border-radius: 99px;
  }
  .underline-green::after { background: linear-gradient(90deg, #10B981, #34D399); }
  .underline-orange::after { background: linear-gradient(90deg, #F59E0B, #FB923C); }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
  .project-card-img {
    transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .project-card:hover .project-card-img { transform: scale(1.07); }
  .skill-pill {
    transition: all 0.2s ease;
  }
  .skill-pill:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(37,99,235,0.15);
  }
  .nav-link {
    position: relative;
    transition: color 0.2s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 2px;
    background: #2563EB;
    border-radius: 99px;
    transition: width 0.25s ease;
  }
  .nav-link:hover::after { width: 100%; }
  .nav-link:hover { color: #2563EB; }
`;
document.head.appendChild(styleEl);

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } }
};

/* ─── useInView Helper ─── */
function Reveal({ children, className, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 28 : 0, x: direction === "left" ? -28 : direction === "right" ? 28 : 0 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } }
  };
  return (
    <motion.div ref={ref} className={className} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   NAV
════════════════════════════════════════════ */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["About", "Skills", "Experience", "Projects", "Contact"];

  // Helper to handle smooth mobile scrolling and close the menu cleanly
  const handleMobileClick = (e, link) => {
    e.preventDefault();
    setOpen(false);
    
    // Wait for the height transition to clear, then scroll perfectly
    setTimeout(() => {
      const element = document.getElementById(link.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(11,15,25,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo + Avatar Section */}
        <a href="#about" className="flex items-center gap-3 group select-none">
          <img
            src={sivaProfile}
            alt="Siva profile avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-xl font-extrabold italic tracking-tight lowercase bg-gradient-to-r from-slate-800 via-slate-500 to-slate-800 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] transition-opacity duration-200 group-hover:opacity-80">
            siva
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link text-sm font-medium text-slate-600">
              {l}
            </a>
          ))}
        </div>

        {/* CV Button */}
        <div className="hidden md:block">
          <a
            href="/siva-m-resume.pdf"
            download="Siva_M_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200"
          >
            <Download size={14} /> Download CV
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-1 text-slate-800 z-50" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100 shadow-xl"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {links.map(l => (
                <a 
                  key={l} 
                  href={`#${l.toLowerCase()}`} 
                  className="text-base font-semibold text-slate-700 active:text-blue-600 py-1"
                  onClick={(e) => handleMobileClick(e, l)}
                >
                  {l}
                </a>
              ))}
              <div className="border-t border-slate-100 pt-3 mt-1">
                <a 
                  href="/siva-m-resume.pdf"
                  download="Siva_M_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200"
                  onClick={() => setOpen(false)}
                >
                  <Download size={14} /> Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
/* ════════════════════════════════════════════
   HERO
════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="about-hero" className="grid-bg min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 mono">Available for Opportunities · Chennai, India</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-7 text-slate-900"
          >
            Hi, I'm{" "}
            <span className="underline-accent">Siva.</span>
            <br />
            I build{" "}
            <span className="underline-accent underline-green">Scalable</span>
            {" "}Full‑Stack{" "}
            <br className="hidden sm:block" />
            Systems with{" "}
            <span className="text-blue-600">Java</span>,{" "}
            <span className="text-cyan-600">Spring Boot</span>,
            <br className="hidden sm:block" />
            and{" "}
            <span className="underline-accent underline-orange">AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed mb-10 font-medium"
          >
            B.Tech IT Graduate{" "}
            <span className="mono text-slate-700 font-semibold">(8.0 CGPA)</span>{" "}
            with enterprise internship experience. Engineering production‑ready backends and highly optimized applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-700 transition-all duration-200 shadow-lg shadow-slate-900/15"
            >
              View My Work <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-all duration-200"
            >
              <Mail size={16} /> Get in Touch
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-sm"
          >
            {[
              { val: "8.0", label: "CGPA" },
              { val: "4+", label: "Projects" },
              { val: "4mo", label: "Internship" },
            ].map(s => (
              <div key={s.label} className="flex flex-col">
                <span className="text-3xl font-extrabold text-slate-900">{s.val}</span>
                <span className="text-xs font-medium text-slate-400 mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SKILLS
════════════════════════════════════════════ */
const skillGroups = [
  {
    icon: <Code2 size={18} />, label: "Languages", color: "blue",
    skills: ["Java", "JavaScript", "HTML", "CSS"]
  },
  {
    icon: <Layers size={18} />, label: "Frameworks", color: "violet",
    skills: ["Spring Boot", "Spring Data JPA", "React.js", "Context API", "FastAPI"]
  },
  {
    icon: <Database size={18} />, label: "Databases & Caching", color: "emerald",
    skills: ["MySQL", "Caffeine Cache", "SQL"]
  },
  {
    icon: <Wrench size={18} />, label: "Tools & DevOps", color: "orange",
    skills: ["Git", "Docker", "GitHub Actions", "CI/CD", "Postman", "Maven"]
  },
];

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", icon: "text-blue-500", pill: "bg-blue-100 text-blue-700" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-100", icon: "text-violet-500", pill: "bg-violet-100 text-violet-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", icon: "text-emerald-500", pill: "bg-emerald-100 text-emerald-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100", icon: "text-orange-500", pill: "bg-amber-100 text-amber-700" },
};

function Skills() {
  return (
    <section id="skills" className="py-28 grid-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="mb-14">
          <p className="mono text-xs font-medium text-slate-400 mb-3 tracking-widest uppercase">Technical Stack</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            My <span className="underline-accent">Core</span> Toolkit
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((grp, i) => {
            const c = colorMap[grp.color];
            return (
              <Reveal key={grp.label} delay={i * 0.08}>
                <div className={`rounded-2xl border ${c.border} ${c.bg} p-6 h-full`}>
                  <div className={`inline-flex items-center gap-2 mb-4 ${c.icon}`}>
                    {grp.icon}
                    <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{grp.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {grp.skills.map(s => (
                      <span key={s} className={`skill-pill text-xs font-semibold px-2.5 py-1 rounded-lg ${c.pill}`}>{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   EXPERIENCE
════════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="mb-14">
          <p className="mono text-xs font-medium text-slate-400 mb-3 tracking-widest uppercase">Career</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            <span className="underline-accent">Experience</span> History
          </h2>
        </Reveal>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-cyan-300 to-transparent" />

          <Reveal delay={0.1}>
            <div className="relative pl-16 sm:pl-20 pb-2">
              {/* Dot */}
              <div className="absolute left-4 sm:left-7 top-2 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />

              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Full Stack Java Intern</h3>
                    <p className="font-semibold text-blue-600 text-sm">GlowLogics Solutions · Chennai</p>
                  </div>
                  <span className="mono text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">
                    Aug 2025 – Nov 2025
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: <Cpu size={16} />, title: "Microservice Architecture", desc: "Designed and developed production-ready RESTful microservices using Spring Boot, applying MVC patterns and clean layer separation." },
                    { icon: <Globe size={16} />, title: "API Integration", desc: "Integrated third-party and internal REST APIs tested thoroughly via Postman; implemented secure DTO data transfer layers." },
                    { icon: <Database size={16} />, title: "MySQL Database", desc: "Handled complex database migrations and query optimization for PostgreSQL, maintaining data integrity across service layers." },
                  ].map(item => (
                    <div key={item.title} className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="shrink-0 mt-0.5 text-blue-500">{item.icon}</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">{item.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   PROJECTS
════════════════════════════════════════════ */
const projects = [
  {
    id: "realticker",
    title: "RealTicker",
    sub: "AI-Powered Stock Insights",
    highlight: "Optimized API speed by 15–30% via Caffeine Cache integration.",
    desc: "Real-time stock analytics platform with AI-driven insights, caching architecture, and live market data feeds.",
    stack: ["Java", "Spring Boot", "Caffeine Cache", "React.js"],
    badge: <><Zap size={12} /> 15–30% Faster APIs</>,
    badgeColor: "bg-amber-100 text-amber-700",
    github: "https://github.com/Siva340-ux/realticker-frontend.git",
    live: "https://realticker-frontend.onrender.com",
    hasLive: true,
    // TODO: Replace with local assets folder reference later: src/assets/project-realticker.jpg
    img:realTicker,
  },
  {
    id: "capitalfinder",
    title: "CapitalFinder",
    sub: "AI-Powered Capital Lookup",
    highlight: "Secure DTO architecture with environment secret management and glassmorphism UI.",
    desc: "Elegant geography intelligence app leveraging GPT APIs with strict secret management and beautiful glass-effect UI.",
    stack: ["Spring Boot", "OpenAI GPT", "React.js", "Tailwind CSS"],
    badge: <><Shield size={12} /> Secure Architecture</>,
    badgeColor: "bg-emerald-100 text-emerald-700",
    github: "https://github.com/Siva340-ux/CapitalFinderwithAI.git",
    live: "https://example.com",
    hasLive: true,
    // TODO: Replace with local assets folder reference later: src/assets/project-capitalfinder.jpg
    img:capitalFinder,
  },
  {
    id: "fashionstore",
    title: "Fashion Store",
    sub: "Responsive E-Commerce Platform",
    highlight: "Global React Context API state management with automated WhatsApp checkout flow.",
    desc: "Fully responsive storefront with cart management, product filtering, and WhatsApp-native checkout automation.",
    stack: ["React.js", "Context API", "JavaScript", "CSS3", "WhatsApp API"],
    badge: <><Globe size={12} /> Responsive</>,
    badgeColor: "bg-blue-100 text-blue-700",
    github: "https://github.com/Siva340-ux/fashionstore.git",
    live: "https://fashionstore-plum.vercel.app",
    hasLive: true,
    // TODO: Replace with local assets folder reference later: src/assets/project-fashionstore.jpg
    img: fashionStore,
  },
  {
    id: "cureconnect",
    title: "CureConnect",
    sub: "AI Healthcare Engine",
    highlight: "FastAPI/Python ML classification backend with JWT authentication and WebSocket real-time layers.",
    desc: "Intelligent healthcare platform with machine learning disease classification, secure auth, and live consultation WebSockets.",
    stack: ["FastAPI", "Python", "ML", "JWT", "WebSockets", "React.js"],
    badge: <><Cpu size={12} /> ML Powered</>,
    badgeColor: "bg-rose-100 text-rose-700",
    github: "https://github.com/Siva340-ux/CureConnect.git",
    live: null,
    hasLive: false,
    // TODO: Replace with local assets folder reference later: src/assets/project-cureconnect.jpg
    img:cureConnect,
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.12}
      className="project-card group relative rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500 bg-white"
      style={{ minHeight: 420 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <img
          className="project-card-img w-full h-full object-cover"
          src={project.img}
          alt={project.title + " background"}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-7" style={{ minHeight: 420 }}>
        {/* Badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-4 w-fit ${project.badgeColor}`}>
          {project.badge}
        </span>

        <h3 className="text-2xl font-extrabold text-white mb-1">{project.title}</h3>
        <p className="text-sm font-semibold text-cyan-300 mb-3">{project.sub}</p>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">{project.highlight}</p>

        {/* Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map(s => (
            <span key={s} className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/10">
              {s}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 transition-colors duration-200"
          >
            <Github size={15} /> Github
          </a>
          {project.hasLive && (
            <a
              href={project.live}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-28 grid-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="mb-4">
          <p className="mono text-xs font-medium text-slate-400 mb-3 tracking-widest uppercase">Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            My <span className="underline-accent">Works</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="mb-14">
          <p className="text-slate-500 text-base max-w-xl leading-relaxed">
            Production-grade full-stack systems spanning AI integration, caching optimization, and real-time architectures.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   ABOUT
════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="mb-14">
          <p className="mono text-xs font-medium text-slate-400 mb-3 tracking-widest uppercase">Background</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            The Mind <span className="underline-accent">Behind</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Portrait (With Hover Zoom Implemented) */}
          <Reveal direction="left" className="lg:col-span-2">
            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 aspect-[3/4] w-full max-w-xs mx-auto lg:mx-0 shadow-sm border border-slate-100">
              <img
                src={sivaProfile}
                alt="Siva — portrait"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-lg border border-white/20">
                <p className="text-xs font-bold text-slate-900">Siva . M </p>
                <p className="text-xs text-slate-500">Jeppiaar Engineering College · 2022–2026</p>
              </div>
            </div>
          </Reveal>

          {/* Right: Bio */}
          <Reveal direction="right" delay={0.1} className="lg:col-span-3 flex flex-col gap-6">
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              I'm a final-year <span className="font-bold text-slate-900">B.Tech Information Technology</span> student at Jeppiaar Engineering College, Chennai, graduating in 2026 with a <span className="mono font-bold text-blue-600">8.0 CGPA</span>.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              My passion is building the kind of backend infrastructure that just works — even under load. I thrive at the intersection of clean architecture and practical engineering, writing modular Java systems that adhere strictly to <strong className="text-slate-700">SOLID design principles</strong>.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              During my internship at GlowLogics Solutions, I shipped production-ready microservices, integrated AI APIs, and managed MySQL migrations — the kind of real-world challenges that shaped how I think about software. I care deeply about performance, and I measure it: Caffeine Cache integration in RealTicker cut API response times by an estimated <strong className="text-slate-700">15–30%</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { label: "Degree", val: "B.Tech Information Technology" },
                { label: "Institution", val: "Jeppiaar Engineering College" },
                { label: "Graduation", val: "2026" },
                { label: "CGPA", val: "8.0 / 10.0" },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-bold text-slate-800">{item.val}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   WHY SIVA ACCORDION
════════════════════════════════════════════ */
const faqs = [
  {
    q: "What is your primary technical expertise?",
    a: "I specialize in Java Full-Stack development. My core backend stack is built around Java and Spring Boot (including Spring Data JPA, MVC architecture, and secure RESTful microservices). On the frontend, I build highly interactive, responsive user experiences using React.js and Tailwind CSS."
  },
  {
    q: "Do you have real-world team experience?",
    a: "Yes. I worked as a Full Stack Java Intern at GlowLogics Solutions in Chennai (August 2025 – November 2025). During this tenure, I successfully developed production-style RESTful backend services, handled complex database migrations using PostgreSQL, and collaborated tightly with team workflows via Git and Postman testing suites."
  },
  {
    q: "How do you optimize applications for better performance?",
    a: "I understand the importance of system speed. In my RealTicker stock application, I implemented Spring Cache backed by Caffeine Local Cache to systematically eliminate repetitive background database processing. This enhancement successfully decreased frequent API response times by an estimated 15% to 30% during testing."
  },
  {
    q: "Can you integrate Artificial Intelligence capabilities into standard platforms?",
    a: "Absolutely. I specialize in bridging the gap between core systems and AI. I have hands-on experience integrating Hugging Face and OpenAI GPT APIs securely into Spring Boot and Python environments, including building strict fallback logic layers to maintain robust application reliability even when third-party AI inferences are temporarily slow or unavailable."
  },
  {
    q: "What is your educational timeline and engineering standard?",
    a: "I am pursuing my B.Tech in Information Technology at Jeppiaar Engineering College (2022–2026), maintaining a strong 8.0 CGPA. I strictly write modular code adhering to robust software design principles like SOLID, manage secure environments using environment secrets, and use tools like Docker, Maven, and GitHub Actions for continuous integration (CI/CD)."
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${isOpen ? "border-blue-200 bg-blue-50/30" : "border-slate-100 bg-white"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-slate-900">{item.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-slate-400">
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6">
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WhySiva() {
  const [open, setOpen] = useState(0);
  return (
    <section id="whysiva" className="py-28 grid-bg">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="mb-14 text-center">
          <p className="mono text-xs font-medium text-slate-400 mb-3 tracking-widest uppercase">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why <span className="underline-accent">Siva?</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base">Good to know · Quick answers about my skills and approach</p>
        </Reveal>
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <AccordionItem item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   CONTACT / FOOTER  — dark slate block
════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="py-16 bg-white grid-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="rounded-3xl overflow-hidden" style={{ background: "#0B0F19" }}>
            <div className="p-10 sm:p-16 flex flex-col items-center text-center gap-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400 mono">Available for Opportunities in Chennai, India</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl">
                Let's build something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">remarkable</span>{" "}
                together.
              </h2>
              <p className="text-slate-400 max-w-md text-base leading-relaxed">
                I'm actively seeking full-stack engineering roles and internships. Let's connect and make great software.
              </p>

              {/* CTA */}
              <a
                href="mailto:sivaofficial370@gmail.com"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors duration-200 shadow-lg shadow-white/5 text-sm"
              >
                <Mail size={16} /> sivaofficial370@gmail.com
              </a>

              {/* Socials */}
              <div className="flex items-center gap-5 mt-2">
                {[
                  { icon: <Github size={18} />, href: "https://github.com/Siva340-ux", label: "Github" },
                  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/siva-m-b06595264", label: "LinkedIn" },
                 
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full border-t border-white/10 pt-6 mt-2">
                <p className="text-xs text-slate-500 mono">
                  © {new Date().getFullYear()} Siva · Designed & Engineered with care · Chennai, Tamil Nadu
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   ROOT APP
════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <About />
        <WhySiva />
        <Contact />
      </main>
    </>
  );
}