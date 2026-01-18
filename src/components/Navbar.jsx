import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md ${
    scrolled 
      ? 'shadow-lg bg-gray-100/90 dark:bg-[#45474B]/85' 
      : 'bg-transparent'
  }`;

  const linkClass = "text-[#495E57] dark:text-[#adb5bd] hover:text-accent-yellow px-3 py-2 rounded-md text-sm font-medium transition-colors";

  return (
    <header className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/#" className="text-xl font-bold text-[#45474B] dark:text-[#F5F7F8]">
              <span className="text-accent-yellow">&lt;</span>Raveen Abeydeera<span className="text-accent-yellow">/&gt;</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <a href="/#home" className={linkClass}>Home</a>
            <a href="/#about" className={linkClass}>About</a>
            <a href="/#projects" className={linkClass}>Projects</a>
            <a href="/#contact" className={linkClass}>Contact</a>
          </nav>

          {/* Controls */}
          <div className="flex items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md text-[#495E57] dark:text-[#adb5bd] hover:text-accent-yellow focus:outline-none"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-2 p-2 rounded-md text-[#495E57] dark:text-[#adb5bd] hover:text-accent-yellow"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-inherit">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {['Home', 'About', 'Projects', 'Contact'].map((item) => (
               <a 
                 key={item}
                 href={`/#${item.toLowerCase()}`}
                 onClick={() => setIsMenuOpen(false)}
                 className="block px-3 py-2 rounded-md text-base font-medium text-[#495E57] dark:text-[#adb5bd] hover:text-accent-yellow"
               >
                 {item}
               </a>
             ))}
          </div>
        </div>
      )}
    </header>
  );
}