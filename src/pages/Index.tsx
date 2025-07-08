
import { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import { FeaturedDesigns } from '@/components/FeaturedDesigns';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 text-white dark:text-white overflow-x-hidden relative">
      <Navigation />
      
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-8'}`}>
        <Hero />
        <FeaturedDesigns />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </div>
      
      {/* Enhanced background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="floating-orb top-1/4 left-1/4 w-96 h-96 animate-float-slow"></div>
        <div className="floating-orb bottom-1/4 right-1/4 w-80 h-80 animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="floating-orb top-3/4 left-1/3 w-64 h-64 animate-float-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Animated grid overlay */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-5" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'float 20s ease-in-out infinite'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Index;
