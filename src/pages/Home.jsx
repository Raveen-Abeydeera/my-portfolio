import { Download, ArrowRight, ArrowDown, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import ChatWidget from '../components/ChatWidget';
import Reveal from '../components/Reveal';
import Typewriter from '../components/Typewriter';
import ScrollTechBackground from '../components/ScrollTechBackground';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "wildroute",
    title: "Wildroute PWA",
    category: "Progressive Web App",
    desc: "MERN Stack Progressive Web App with interactive maps and secure cloud storage.",
    img: "/images/wildroute/main-thumbnail.png"
  },
  {
    id: "greenlife",
    title: "Greenlife Wellness",
    category: "Web Platform Development",
    desc: "Comprehensive web platform for a wellness center featuring booking and management dashboards.",
    img: "/images/greenlife wellness page images/client home page.png"
  },
  {
    id: "luxevista",
    title: "LuxeVista Resort",
    category: "Mobile Application Design",
    desc: "Native Android application acting as a premium digital concierge for luxury resorts.",
    img: "/images/Luxvista images/ic_launcher-playstore.png"
  },
  {
    id: "petshop",
    title: "Pet Shop System",
    category: "Software Engineering",
    desc: "Java-based inventory and staff management system with dual Swing GUI and CLI interfaces.",
    img: "https://placehold.co/600x400/003459/ffffff?text=Pet+Shop"
  },
  {
    id: "gadgethub",
    title: "GadgetHub Microservices",
    category: "Microservices Architecture",
    desc: "A Service-Oriented Architecture (SOA) system for order management and quotations, built with Python, Flask, and ran via Jupyter Notebooks.",
    img: "/images/gadgethub/gradio-ui.png"
  }
];

export default function Home() {
  const techRef = useRef(null);

  useEffect(() => {
    if (!techRef.current) return;

    gsap.fromTo(
      techRef.current.children,
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: techRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <div className="relative z-10 pt-16">

      {/* Scroll-Linked Global Background */}
      <ScrollTechBackground />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

        {/* Replaced TechStackBackground with the ScrollTechBackground at root overlay */}

        <div className="text-center max-w-4xl relative z-10 w-full">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-light dark:text-text-dark leading-tight mb-4"
          >
            Hi, I'm <span className="text-accent-primary inline-block hover:scale-105 transition-transform duration-300">Raveen Abeydeera</span>
          </motion.h1>

          {/* Typewriter Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-4xl font-semibold text-text-light dark:text-text-dark mb-6 h-10"
          >
            <Typewriter words={["Software Engineer", "Full Stack Developer", "Problem Solver"]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl text-muted-light dark:text-muted-dark font-medium mb-8 max-w-2xl mx-auto"
          >
            specializing in Web & Mobile Applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#projects" className="bg-accent-primary text-white hover:bg-accent-hover transition-colors px-8 py-3 rounded-lg text-lg font-semibold shadow-lg shadow-accent-primary/20">
              View Projects
            </a>
            <a href="#contact" className="border border-accent-primary text-text-light dark:text-white hover:bg-accent-primary hover:text-white transition-colors px-8 py-3 rounded-lg text-lg font-semibold shadow-lg">
              Contact Me
            </a>
            <a href="/images/raveen-cv.pdf" download className="border border-accent-primary text-text-light dark:text-white hover:bg-accent-primary hover:text-white transition-colors px-8 py-3 rounded-lg text-lg font-semibold shadow-lg flex items-center">
              <Download className="w-5 h-5 mr-2" /> Download CV
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex justify-center gap-6 mt-8"
          >
            <a href="https://github.com/Raveen-Abeydeera" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-600 dark:text-gray-400 hover:text-accent-primary dark:hover:text-accent-primary hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <Github className="w-8 h-8 md:w-9 md:h-9" />
            </a>
            <a href="https://www.linkedin.com/in/raveen-abeydeera-b05827287" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 dark:text-gray-400 hover:text-accent-primary dark:hover:text-accent-primary hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <Linkedin className="w-8 h-8 md:w-9 md:h-9" />
            </a>
          </motion.div>
        </div>

        {/* Animated Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-accent-primary z-10"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-6">About Me</h2>
            <p className="text-muted-light dark:text-muted-dark text-lg mb-4">
              I'm currently pursuing a Higher Diploma in Software Engineering at ICBT Campus. I'm passionate about crafting clean, efficient, and user-friendly digital experiences.
            </p>
            <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">Technologies:</h3>
            <div ref={techRef} className="flex flex-wrap gap-3">
              {['Java', 'Python', 'JavaScript (ES6+)', 'React', 'Next.js', 'Typescript', 'Node.js', 'MERN Stack', 'Flask', 'REST APIs', 'Jupyter Notebook', 'Tailwind CSS', 'C++', 'HTML5', 'CSS 3', 'Bootstrap', 'PHP', 'MySQL', 'SQLite', 'Android SDK', 'Git/Github'].map(tech => (
                <span key={tech} className="bg-card-light dark:bg-card-dark text-accent-primary border border-accent-primary/30 px-4 py-1 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className="flex justify-center relative mt-12 md:mt-0">
            <div className="relative z-10">
              {/* Main Image */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-accent-primary/20 p-2 relative overflow-visible">
                <img src="/images/my-image.jpg" alt="Raveen" className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-accent-primary/50 relative z-10" />
              </div>

              {/* Floating Pill 1 - Middle/Bottom Right */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute top-28 sm:top-40 -right-8 sm:-right-24 bg-white/40 dark:bg-[#1a1c23]/40 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_8px_32px_rgba(31,38,135,0.15)] border border-white/50 dark:border-white/10 z-20"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-xl">👨‍💻</span>
                </div>
                <span className="font-semibold text-text-light dark:text-white text-sm sm:text-base whitespace-nowrap">Software Engineer ↗</span>
              </motion.div>

              {/* Floating Pill 2 - Bottom Left */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="absolute bottom-10 -left-8 sm:-left-24 bg-white/40 dark:bg-[#1a1c23]/40 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_8px_32px_rgba(31,38,135,0.15)] border border-white/50 dark:border-white/10 z-20"
                style={{ animation: 'float 5s ease-in-out infinite 1s' }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent-primary">
                  <img src="/images/my-image.jpg" alt="Mini Raveen" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-text-light dark:text-white text-sm sm:text-base whitespace-nowrap">Full Stack Dev ↗</span>
              </motion.div>

              {/* Background glowing circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-accent-primary/20 -z-10 blur-2xl" />
            </div>
            {/* Inline CSS for floating animation */}
            <style>{`
              @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-12px); }
                100% { transform: translateY(0px); }
              }
            `}</style>
          </Reveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4">My Projects</h2>
          </Reveal>
          <div className="space-y-32">
            {projectsData.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={project.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20 group`}>

                  {/* Image Side */}
                  <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] shadow-2xl relative bg-bg-light dark:bg-[#121316] p-8 sm:p-16 flex justify-center items-center border border-gray-200 dark:border-white/5">
                    {/* Subtle grid pattern background to match Noxfolio aesthetic */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"></div>

                    <img src={project.img} alt={project.title} className="w-full h-auto max-h-[400px] object-contain group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 ease-out relative z-10 drop-shadow-2xl" />
                  </div>

                  {/* Text Side */}
                  <div className={`w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:px-0 ${isEven ? 'md:pl-10' : 'md:pr-10'}`}>
                    <span className="text-accent-primary font-semibold text-xl mb-4 tracking-wide">{project.category}</span>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-light dark:text-white mb-6 leading-[1.1] whitespace-pre-wrap">
                      {project.title.replace(' ', '\n')}
                    </h3>
                    <p className="text-muted-light dark:text-gray-400 text-lg sm:text-xl mb-12 leading-relaxed max-w-md">
                      {project.desc}
                    </p>

                    {/* Call to action arrow button matching the circular aesthetic */}
                    <Link to={`/project/${project.id}`} className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-text-light dark:text-white hover:bg-accent-primary hover:border-accent-primary hover:text-white transition-all duration-300 group/btn">
                      <ArrowRight className="w-6 h-6 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <Reveal className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6">Send Me a Message</h3>
            <form action="https://formspree.io/f/mykyedby" method="POST" className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-light dark:text-muted-dark mb-1">Name</label>
                {/* INPUTS FIXED: Removed green background, added dark blue */}
                <input type="text" name="name" required className="w-full px-4 py-2 rounded-lg border bg-bg-light dark:bg-bg-dark border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark focus:ring-2 focus:ring-accent-primary outline-none" placeholder="Your name here..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-light dark:text-muted-dark mb-1">Email</label>
                <input type="email" name="email" required className="w-full px-4 py-2 rounded-lg border bg-bg-light dark:bg-bg-dark border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark focus:ring-2 focus:ring-accent-primary outline-none" placeholder="Your email here..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-light dark:text-muted-dark mb-1">Message</label>
                <textarea name="message" rows="5" required className="w-full px-4 py-2 rounded-lg border bg-bg-light dark:bg-bg-dark border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark focus:ring-2 focus:ring-accent-primary outline-none" placeholder="Your message here..."></textarea>
              </div>
              <button type="submit" className="w-full bg-accent-primary text-white hover:bg-accent-hover transition-colors px-6 py-3 rounded-lg font-semibold shadow-md">Send Email</button>
            </form>
          </Reveal>
          <Reveal className="delay-100">
            <ChatWidget />
          </Reveal>
        </div>
      </section>
    </div>
  );
}