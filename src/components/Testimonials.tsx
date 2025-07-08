import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "E-commerce Entrepreneur",
    company: "StyleHub",
    avatar: "👩‍💼",
    rating: 5,
    text: "The POD designs I received were absolutely stunning! Sales increased by 300% within the first month. The attention to detail and market research really shows in the final products.",
    design: "Monetary Flames"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Brand Manager",
    company: "Urban Streetwear",
    avatar: "👨‍💻",
    rating: 5,
    text: "Working with this designer was a game-changer for our brand. The designs perfectly captured our target audience and the print-ready files saved us hours of work.",
    design: "Phoenix King"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Marketing Director",
    company: "Fashion Forward",
    avatar: "👩‍🎨",
    rating: 5,
    text: "The design consultation was incredibly valuable. The insights on color psychology and market trends helped us create designs that actually convert. Highly recommended!",
    design: "Money is Everything"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Startup Founder",
    company: "TechWear Co",
    avatar: "👨‍🚀",
    rating: 5,
    text: "Fast turnaround, professional communication, and designs that exceeded expectations. Our POD business wouldn't be where it is today without this designer's expertise.",
    design: "No Time For Debate"
  }
];

export const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [nextTestimonial, setNextTestimonial] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleSlide('right');
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonial]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSlide = (direction: 'left' | 'right', indexOverride?: number) => {
    if (isSliding) return;
    setSlideDirection(direction);
    setIsSliding(true);
    let nextIdx;
    if (typeof indexOverride === 'number') {
      nextIdx = indexOverride;
    } else if (direction === 'right') {
      nextIdx = (currentTestimonial + 1) % testimonials.length;
    } else {
      nextIdx = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    }
    setNextTestimonial(nextIdx);
    timeoutRef.current = setTimeout(() => {
      setCurrentTestimonial(nextIdx);
      setIsSliding(false);
      setNextTestimonial(null);
    }, 400); // Duration matches animation
  };

  const handleTestimonialClick = (index: number) => {
    if (index === currentTestimonial) return;
    setIsAutoPlaying(false);
    handleSlide(index > currentTestimonial ? 'right' : 'left', index);
    // Track testimonial interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'testimonial_view', {
        event_category: 'engagement',
        event_label: testimonials[index].name,
        value: index
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-white/20'}>
        ★
      </span>
    ));
  };

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-delayed">
            Don't just take my word for it - hear from satisfied clients who've seen real results
          </p>
        </div>
        <div className="relative">
          {/* Main testimonial display */}
          <div className="macos-window p-8 md:p-12 animate-on-scroll overflow-hidden">
            <div className="macos-titlebar mb-6">
              <div className="macos-controls">
                <div className="macos-control red"></div>
                <div className="macos-control yellow"></div>
                <div className="macos-control green"></div>
              </div>
              <div className="text-sm font-medium text-white/80">
                Client Feedback
              </div>
              <div className="w-12"></div>
            </div>
            <div className="text-center relative h-[340px] md:h-[320px] flex items-center justify-center">
              {/* Sliding testimonials */}
              <div className="w-full h-full relative">
                {/* Current testimonial */}
                <div
                  className={`absolute w-full top-0 left-0 transition-transform duration-400 ease-in-out
                    ${isSliding && slideDirection === 'right' ? '-translate-x-full opacity-0' : ''}
                    ${isSliding && slideDirection === 'left' ? 'translate-x-full opacity-0' : ''}
                    ${!isSliding ? 'translate-x-0 opacity-100' : ''}
                  `}
                  style={{ zIndex: isSliding ? 10 : 20 }}
                  key={testimonials[currentTestimonial].id}
                >
                  {/* Avatar and rating */}
                  <div className="mb-6">
                    <div className="text-6xl mb-4 animate-bounce">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                    <p className="text-white/60 text-sm">
                      {testimonials[currentTestimonial].rating}/5 stars
                    </p>
                  </div>
                  {/* Testimonial text */}
                  <blockquote className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  {/* Client info */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-white/70 mb-1">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-portfolio-red-400 font-medium">
                      {testimonials[currentTestimonial].company}
                    </p>
                    <p className="text-sm text-white/50 mt-2">
                      Featured Design: <span className="text-portfolio-blue-400">{testimonials[currentTestimonial].design}</span>
                    </p>
                  </div>
                </div>
                {/* Next testimonial (only during sliding) */}
                {isSliding && nextTestimonial !== null && (
                  <div
                    className={`absolute w-full top-0 left-0 transition-transform duration-400 ease-in-out
                      ${slideDirection === 'right' ? 'translate-x-full opacity-100' : ''}
                      ${slideDirection === 'left' ? '-translate-x-full opacity-100' : ''}
                    `}
                    style={{ zIndex: 20 }}
                    key={testimonials[nextTestimonial].id}
                  >
                    {/* Avatar and rating */}
                    <div className="mb-6">
                      <div className="text-6xl mb-4 animate-bounce">
                        {testimonials[nextTestimonial].avatar}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(testimonials[nextTestimonial].rating)}
                      </div>
                      <p className="text-white/60 text-sm">
                        {testimonials[nextTestimonial].rating}/5 stars
                      </p>
                    </div>
                    {/* Testimonial text */}
                    <blockquote className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed italic">
                      "{testimonials[nextTestimonial].text}"
                    </blockquote>
                    {/* Client info */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {testimonials[nextTestimonial].name}
                      </h4>
                      <p className="text-white/70 mb-1">
                        {testimonials[nextTestimonial].role}
                      </p>
                      <p className="text-portfolio-red-400 font-medium">
                        {testimonials[nextTestimonial].company}
                      </p>
                      <p className="text-sm text-white/50 mt-2">
                        Featured Design: <span className="text-portfolio-blue-400">{testimonials[nextTestimonial].design}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Navigation dots removed */}
            </div>
          </div>
          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-panel p-6 text-center animate-on-scroll">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/70">Client Satisfaction</div>
            </div>
            <div className="glass-panel p-6 text-center animate-on-scroll">
              <div className="text-3xl font-bold text-white mb-2">300%</div>
              <div className="text-white/70">Average Sales Increase</div>
            </div>
            <div className="glass-panel p-6 text-center animate-on-scroll">
              <div className="text-3xl font-bold text-white mb-2">24h</div>
              <div className="text-white/70">Average Turnaround</div>
            </div>
          </div>

          {/* CTA section */}
          <div className="text-center mt-12 animate-on-scroll">
            <div className="glass-panel p-8 inline-block">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-white/80 mb-6 max-w-md">
                Let's create designs that not only look amazing but also drive real results for your business.
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-button bg-gradient-to-r from-portfolio-red-600/20 to-portfolio-blue-600/20 hover:from-portfolio-red-600/30 hover:to-portfolio-blue-600/30 px-8 py-4 text-lg"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 