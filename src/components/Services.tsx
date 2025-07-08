
const services = [
  {
    title: "Custom T-Shirt Designs",
    description: "Eye-catching designs that speak to your target audience and drive sales.",
    features: ["Trendy Graphics", "Typography Focus", "Market Research", "Multiple Formats"],
    icon: "👕"
  },
  {
    title: "Design Consultation", 
    description: "Expert guidance on design trends, color theory, and market positioning for POD success.",
    features: ["Trend Analysis", "Color Psychology", "Target Market", "Design Strategy"],
    icon: "🎨"
  },
  {
    title: "Print-Ready Files",
    description: "Professional file preparation ensuring your designs print perfectly every time.",
    features: ["High Resolution", "Print Optimization", "Multiple Formats", "Quality Assurance"],
    icon: "📁"
  },
  {
    title: "Market Analysis",
    description: "Research-driven design strategies based on current trends and customer preferences.",
    features: ["Trend Research", "Competitor Analysis", "Audience Insights", "Performance Metrics"],
    icon: "📊"
  }
];

export const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-delayed">
            Comprehensive design solutions tailored for the print-on-demand industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="macos-window hover-glow group animate-on-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* macOS title bar */}
              <div className="macos-titlebar">
                <div className="macos-controls">
                  <div className="macos-control red"></div>
                  <div className="macos-control yellow"></div>
                  <div className="macos-control green"></div>
                </div>
                
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <div className="w-12"></div>
              </div>
              
              {/* Service content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-portfolio-red-400 group-hover:to-portfolio-blue-400 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/80 mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className="flex items-center text-white/70 group-hover:text-white/90 transition-all duration-300"
                      style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                    >
                      <span className="w-2 h-2 bg-gradient-to-r from-portfolio-red-500 to-portfolio-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
