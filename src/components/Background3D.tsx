import React from "react";

/**
 * Lightweight 3D-style animated background.
 * Pure CSS/SVG — no heavy WebGL. Renders a slow-rotating wireframe grid plane
 * plus floating gradient orbs for depth. Sits behind page content (z-0) and
 * respects prefers-reduced-motion.
 */
const Background3D: React.FC<{ variant?: "hero" | "section" }> = ({
  variant = "hero",
}) => {
  return (
    <div className="bg3d" aria-hidden="true" data-variant={variant}>
      {/* Floating gradient orbs for depth */}
      <span className="bg3d-orb bg3d-orb-a" />
      <span className="bg3d-orb bg3d-orb-b" />
      <span className="bg3d-orb bg3d-orb-c" />

      {/* 3D perspective grid plane */}
      <div className="bg3d-grid-wrap">
        <div className="bg3d-grid" />
      </div>

      {/* Soft vignette to keep content readable */}
      <div className="bg3d-vignette" />
    </div>
  );
};

export default Background3D;
