import { Download, ArrowRight, ArrowDown } from 'lucide-react'; // Added ArrowDown
import { Link } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';
import Reveal from '../components/Reveal';
import Typewriter from '../components/Typewriter';

export default function Home() {
  return (
    <div className="relative z-10 pt-16">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <Reveal className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-light dark:text-text-dark leading-tight mb-4">
            Hi, I'm <span className="text-accent-primary">Raveen Abeydeera</span>
          </h1>
          
          {/* NEW: Typewriter Animation */}
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold text-text-light dark:text-text-dark mb-6 h-10">
          <Typewriter words={["Software Engineer", "Full Stack Developer", "Problem Solver"]} />
          </div>

          <p className="text-lg sm:text-xl text-muted-light dark:text-muted-dark font-medium mb-8 max-w-2xl mx-auto">
             specializing in Web & Mobile Applications.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="bg-accent-primary text-white hover:bg-accent-hover transition-colors px-8 py-3 rounded-lg text-lg font-semibold shadow-lg shadow-accent-primary/20">
              View Projects
            </a>
            <a href="#contact" className="border border-accent-primary text-text-light dark:text-white hover:bg-accent-primary hover:text-white transition-colors px-8 py-3 rounded-lg text-lg font-semibold shadow-lg">
              Contact Me
            </a>
            <a href="/images/raveen-cv.pdf" download className="border border-accent-primary text-text-light dark:text-white hover:bg-accent-primary hover:text-white transition-colors px-8 py-3 rounded-lg text-lg font-semibold shadow-lg flex items-center">
              <Download className="w-5 h-5 mr-2" /> Download CV
            </a>
          </div>
        </Reveal>

        {/* Animated Arrow */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-accent-primary">
            <ArrowDown className="w-8 h-8" />
        </div>
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
            <div className="flex flex-wrap gap-3">
              {['Java','JavaScript (ES6+)', 'React','Next.js','Typescript', 'Tailwind CSS','Python', 'C++','Node.js','MERN Stack', 'HTML5','CSS 3','Bootstrap','PHP', 'MySQL','SQLite','Android SDK','Git/Github' ].map(tech => (
                <span key={tech} className="bg-card-light dark:bg-card-dark text-accent-primary border border-accent-primary/30 px-4 py-1 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className="flex justify-center">
            <img src="/images/my-image.jpg" alt="Raveen" className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover shadow-lg border-4 border-accent-primary/50" />
          </Reveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4">My Projects</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <Reveal className="bg-white dark:bg-card-dark rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300 group">
               <img src="https://placehold.co/600x400/003459/ffffff?text=Pet+Shop" alt="Pet Shop" className="w-full h-48 object-cover" />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">Pet Shop System</h3>
                 <p className="text-muted-light dark:text-muted-dark text-sm mb-4">Java-based inventory and staff management system.</p>
                 {/* CHANGED: Added Link and Arrow */}
                 <Link to="/project/petshop" className="inline-flex items-center text-accent-primary hover:text-accent-hover font-medium">
                    View Details <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
            </Reveal>

            {/* Project 2 */}
            <Reveal className="bg-white dark:bg-card-dark rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300 group">
               <img src="/images/greenlife wellness page images/client home page.png" alt="Greenlife" className="w-full h-48 object-cover" />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">Greenlife Wellness</h3>
                 <p className="text-muted-light dark:text-muted-dark text-sm mb-4">Web platform for a wellness center.</p>
                 <Link to="/project/greenlife" className="inline-flex items-center text-accent-primary hover:text-accent-hover font-medium">
                    View Details <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
            </Reveal>

            {/* Project 3 */}
            <Reveal className="bg-white dark:bg-card-dark rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300 group">
               <img src="/images/Luxvista images/ic_launcher-playstore.png" alt="LuxeVista" className="w-full h-48 object-contain bg-gray-900" />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">LuxeVista Resort</h3>
                 <p className="text-muted-light dark:text-muted-dark text-sm mb-4">Native Android app for luxury resorts.</p>
                 <Link to="/project/luxevista" className="inline-flex items-center text-accent-primary hover:text-accent-hover font-medium">
                    View Details <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
            </Reveal>
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