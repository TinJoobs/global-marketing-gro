import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
        }}
        className="skip-link"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export { Link };
