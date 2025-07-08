
export const About = () => {
  const skills = [
    { name: "Graphic Design", level: 95 },
    { name: "Brand Identity", level: 90 },
    { name: "Typography", level: 88 },
    { name: "Color Theory", level: 92 },
    { name: "Print Design", level: 94 },
    { name: "Digital Art", level: 87 }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-6">
              I'm a passionate designer specializing in creating compelling print-on-demand merchandise 
              that resonates with audiences and drives sales. With over 5 years of experience in the industry, 
              I've helped countless brands and entrepreneurs bring their visions to life.
            </p>
            
            <p className="text-lg text-white/80 mb-8">
              My approach combines artistic creativity with market research to ensure every design 
              not only looks amazing but also performs well in the competitive POD marketplace.
            </p>

            <div className="glass-panel p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Design Philosophy</h3>
              <p className="text-white/80">
                "Great design is invisible - it should communicate the message so clearly 
                that the audience connects with it instantly."
              </p>
            </div>
          </div>

          <div className="animate-on-scroll">
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">Skills & Expertise</h3>
              
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-white/70">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-portfolio-red-500 to-portfolio-blue-500 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
