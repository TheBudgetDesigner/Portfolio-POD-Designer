import { useState, useEffect } from 'react';

interface DesignModalProps {
  design: {
    id: number;
    title: string;
    category: string;
    image: string;
    colors: string[];
    description: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DesignModal = ({ design, isOpen, onClose }: DesignModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    if (!design) return;
    
    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Track download event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'design_download', {
          event_category: 'engagement',
          event_label: design.title,
          value: design.id
        });
      }
      
      // Create download link
      const link = document.createElement('a');
      link.href = design.image;
      link.download = `${design.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (!design) return;
    
    if (navigator.share) {
      navigator.share({
        title: design.title,
        text: design.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${design.title} - ${window.location.href}`);
    }
    
    // Track share event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'design_share', {
        event_category: 'engagement',
        event_label: design.title
      });
    }
  };

  if (!design || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="macos-window">
          {/* Title bar */}
          <div className="macos-titlebar">
            <div className="macos-controls">
              <div className="macos-control red" onClick={onClose}></div>
              <div className="macos-control yellow"></div>
              <div className="macos-control green"></div>
            </div>
            
            <div className="text-sm font-medium text-white/80">
              {design.title} - {design.category}
            </div>
            
            <div className="w-12"></div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image section */}
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10">
                  <img 
                    src={design.image} 
                    alt={design.title}
                    className={`w-full h-full object-contain transition-all duration-500 ${
                      isZoomed ? 'scale-150' : 'scale-100'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </div>
                
                {/* Zoom indicator */}
                <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-xs text-white/80">
                  {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="glass-button flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="glass-button flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
              
              {/* Details section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{design.title}</h2>
                  <p className="text-portfolio-red-400 font-medium">{design.category}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-white/80 leading-relaxed">{design.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {design.colors.map((color) => (
                      <span 
                        key={color}
                        className="px-3 py-1 text-sm bg-white/10 backdrop-blur-md rounded-full text-white/80 border border-white/20"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="glass-panel p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Design Specifications</h3>
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex justify-between">
                      <span>Resolution:</span>
                      <span className="text-white">300 DPI</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="text-white">PNG, SVG</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Print Ready:</span>
                      <span className="text-green-400">✓ Yes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vector Available:</span>
                      <span className="text-green-400">✓ Yes</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="glass-button bg-gradient-to-r from-portfolio-red-600/20 to-portfolio-blue-600/20 hover:from-portfolio-red-600/30 hover:to-portfolio-blue-600/30 px-8 py-3 text-lg"
                  >
                    Get Custom Design
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 