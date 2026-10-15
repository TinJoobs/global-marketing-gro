import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const projects = [
    {
      title: "Awaken the Sacred Woman",
      description: "Holistic coaching and spiritual alignment platform for high-achieving women in leadership and business.",
      image: "https://vibe.filesafe.space/1778597036474054298/assets/70f6ece7-9104-457c-bd0e-aab5ccb102df.png",
      url: "https://inspiredbyelba.com/",
      category: "Coaching & Wellness"
    },
    {
      title: "HealthViber",
      description: "Innovative diabetes care platform providing personalized services and health management solutions.",
      image: "https://vibe.filesafe.space/1778597036474054298/assets/bdd2c084-8cff-4beb-97fb-66b882e052f0.jpeg",
      url: "https://healthviber.com/",
      category: "Healthcare"
    },
    {
      title: "Tranquility Salt Cave",
      description: "Columbus, Ohio's premier salt cave experience, leveraging Himalayan salt for holistic cleansing.",
      image: "https://vibe.filesafe.space/1778597036474054298/assets/815ecf00-670f-45fb-b36d-2132b6d5aa9f.png",
      url: "https://tranquilitysaltcave.com/",
      category: "Wellness Center"
    },
    {
      title: "Klinghammer Construction",
      description: "Expert home remodeling services focused on beauty, functionality, and personalized design.",
      image: "https://vibe.filesafe.space/1778597036474054298/assets/95fc7901-63d7-4349-a12c-3917a616f3f1.png",
      url: "https://klinghammer-construction.com/",
      category: "Construction & Remodeling"
    },
    {
      title: "The COC Cares",
      description: "Faith-based non-profit purposed to help cancer patients succeed on their road to recovery.",
      image: "https://vibe.filesafe.space/1778597036474054298/assets/c72ddb3c-b84c-46c6-b4d9-d4062efb3281.jpeg",
      url: "https://www.thecoccares.org/",
      category: "Non-Profit"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Client <span className="text-primary">Success Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Explore how Global Marketing Group helps businesses across diverse industries automate their growth and scale effectively.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Get Your Executive Assistant</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden group border border-white/10 hover:border-primary/50 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur-md border border-primary/20">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <Button variant="outline" className="w-full group/btn" asChild>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to be our next <span className="text-primary">success story?</span></h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the hundreds of businesses that have transformed their operations with GMG's AI-enhanced solutions.
          </p>
          <Button size="lg" className="h-14 px-10 group" asChild>
            <Link to="/contact">
              Start Building Your Success <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
