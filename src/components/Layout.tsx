import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useReveal } from "@/hooks/useReveal";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[72px]" ref={ref}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
