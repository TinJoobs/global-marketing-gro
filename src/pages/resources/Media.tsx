import React from "react";
import { Play, Image as ImageIcon, FileText, Share2 } from "lucide-react";

const Media = () => {
  return (
    <div className="flex flex-col w-full">
      <section className="section-padding bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Media Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our connected toolkit and client project media examples. See
            how we bring brands to life.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-2xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-10 h-10 opacity-20" />
                </div>
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-3 bg-white rounded-full text-primary hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                  <button className="p-3 bg-white rounded-full text-primary hover:scale-110 transition-transform">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
