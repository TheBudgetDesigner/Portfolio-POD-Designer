
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'macos-window backdrop-blur-2xl border-white/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* macOS-style title bar */}
        <div className="macos-titlebar">
          <div className="macos-controls">
            <div className="macos-control red hover:shadow-lg"></div>
            <div className="macos-control yellow hover:shadow-lg"></div>
            <div className="macos-control green hover:shadow-lg"></div>
          </div>
          
          <div className="text-lg font-semibold gradient-text animate-pulse-glow">
            Premium Designer
          </div>
          
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>
        
        {/* Navigation content */}
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Left side - Navigation links */}
            <div className="flex space-x-1 glass-panel px-2 py-1 rounded-full">
              {['Home', 'Designs', 'About', 'Services', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-4 py-2 text-sm text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </button>
              ))}
            </div>
            
            {/* Right side - Theme toggle */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Social links */}
              <div className="hidden sm:flex space-x-2">
                <a 
                  href="https://instagram.com/sshprogrammer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-panel p-2 rounded-full hover:bg-white/15 transition-all duration-300 hover:scale-110"
                  title="Follow on Instagram"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
