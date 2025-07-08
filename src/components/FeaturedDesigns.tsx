import { useState, useEffect } from 'react';
import { DesignModal } from './DesignModal';

const designs = [
  {
    id: 1,
    title: "Monetary Flames",
    category: "T-Shirt Design",
    image: "/lovable-uploads/4bf0fb89-3ab1-4d3b-a7d6-bdfe81f3cb7a.png",
    colors: ["Red", "White"],
    description: "Bold motivational design featuring flaming money roll with inspiring message 'Make every cent count!' Perfect for entrepreneurs and hustlers."
  },
  {
    id: 2,
    title: "Money is Everything",
    category: "T-Shirt Design",
    image: "/lovable-uploads/640a1a88-619f-4fea-91f0-8a4e8d1d3d5d.png",
    colors: ["Black", "Gold"],
    description: "Striking typography design with money stack illustration and diamond accents. Features the powerful message about money being the key to everything."
  },
  {
    id: 3,
    title: "No Time For Debate",
    category: "T-Shirt Design",
    image: "/lovable-uploads/7f1bc9cb-45cf-40be-a540-3c94eb1fc1c7.png",
    colors: ["Black", "Purple"],
    description: "Edgy street-style design with distressed 3D text effect. Motivational message 'Actions speaks louder than words' with urban aesthetic."
  },
  {
    id: 4,
    title: "Phoenix King",
    category: "T-Shirt Design",
    image: "/lovable-uploads/23df5cbb-8281-4ded-b649-5d6fafd02ace.png",
    colors: ["Black", "Yellow"],
    description: "Urban streetwear design featuring a hooded figure with bike and lightning effects. Bold yellow typography with 'Born Pro Riding' theme."
  }
];

export const FeaturedDesigns = () => {
  const [loadedImages, setLoadedImages] = useState<{[key: number]: boolean}>({});
  const [isInView, setIsInView] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<typeof designs[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Track portfolio view
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'portfolio_view', {
              event_category: 'engagement',
              event_label: 'design_showcase'
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('designs');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (designId: number) => {
    setLoadedImages(prev => ({ ...prev, [designId]: true }));
  };

  const handleDesignClick = (design: typeof designs[0]) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
    
    // Track design interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'design_click', {
        event_category: 'engagement',
        event_label: design.title,
        value: design.id
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

  return (
    <>
    <section id="designs" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Featured <span className="gradient-text">T-Shirt Designs</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-delayed">
            A showcase of my best print-on-demand t-shirt designs that have captured audiences and driven sales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {designs.map((design, index) => (
            <div 
              key={design.id}
              className="macos-window hover-glow group cursor-pointer animate-on-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handleDesignClick(design)}
            >
              {/* macOS window controls */}
              <div className="macos-titlebar">
                <div className="macos-controls">
                  <div className="macos-control red"></div>
                  <div className="macos-control yellow"></div>
                  <div className="macos-control green"></div>
                </div>
                
                <div className="text-sm font-medium text-white/80">
                  {design.category}
                </div>
                
                <div className="w-12"></div>
              </div>
              
              {/* Design content */}
              <div className="p-6">
                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 mb-6 group-hover:scale-105 transition-transform duration-500 relative">
                    {/* Loading skeleton */}
                    {!loadedImages[design.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Image with lazy loading */}
                  <img 
                    src={design.image} 
                    alt={design.title}
                      loading="lazy"
                      className={`w-full h-full object-contain transition-all duration-700 group-hover:scale-110 p-4 ${
                        loadedImages[design.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(design.id)}
                      onError={() => {
                        console.error(`Failed to load image: ${design.image}`);
                        handleImageLoad(design.id); // Still mark as loaded to hide skeleton
                      }}
                    />
                    
                    {/* Hover overlay with quick info */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-lg font-semibold mb-2">View Details</div>
                        <div className="text-sm opacity-80">Click to see full design</div>
                      </div>
                    </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-portfolio-red-400 group-hover:to-portfolio-blue-400 group-hover:bg-clip-text transition-all duration-300">
                  {design.title}
                </h3>
                
                <p className="text-white/60 text-sm mb-6 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {design.description}
                </p>
                
                <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {design.colors.map((color) => (
                    <span 
                      key={color}
                      className="px-3 py-1 text-xs bg-white/10 backdrop-blur-md rounded-full text-white/80 border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      {color}
                    </span>
                  ))}
                  </div>
                  
                  {/* Performance metrics */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Design ID: #{design.id}</span>
                      <span>Category: {design.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-12 animate-on-scroll">
            <div className="glass-panel p-6 inline-block">
              <p className="text-white/80 mb-4">Ready to see more designs?</p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-button bg-gradient-to-r from-portfolio-red-600/20 to-portfolio-blue-600/20 hover:from-portfolio-red-600/30 hover:to-portfolio-blue-600/30 px-8 py-3"
              >
                Get Custom Design
              </button>
            </div>
        </div>
      </div>
    </section>

      {/* Design Modal */}
      <DesignModal 
        design={selectedDesign}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
