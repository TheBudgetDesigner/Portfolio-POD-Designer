
export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding text-center relative z-10">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Premium
            <span className="gradient-text block animate-pulse-glow">POD Designs</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in-delayed">
            Hi! I'm a 12-year-old learner crafting eye-catching print-on-demand t-shirt designs that stand out in the marketplace
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delayed">
            <button 
              onClick={() => document.getElementById('designs')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-button hover-glow px-8 py-4 text-lg"
            >
              View My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-button bg-gradient-to-r from-portfolio-red-600/20 to-portfolio-blue-600/20 hover:from-portfolio-red-600/30 hover:to-portfolio-blue-600/30 px-8 py-4 text-lg"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Enhanced floating design elements */}
        <div className="absolute top-1/6 left-1/6 w-32 h-32 glass-panel rounded-full animate-float-slow opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 glass-panel rounded-lg animate-float-slow opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 glass-panel rounded-full animate-rotate-slow opacity-35" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-20 h-20 glass-panel rounded-xl animate-float-slow opacity-25" style={{ animationDelay: '6s' }}></div>
      </div>
    </section>
  );
};
