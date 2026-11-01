/**
 * Hero 3D scene system — per-page themed interactive 3D objects.
 *
 * Architecture:
 *  - `Hero3DStage`         : the perspective container + parallax camera rig
 *  - `Hero3DScene`         : dispatcher that renders the right scene by `variant`
 *  - scene components      : Philippines map, orbiting nodes, etc.
 *
 * All motion is driven by framer-motion `useScroll`/`useTransform` for smooth,
 * GPU-accelerated parallax + pointer-tilt, with full `prefers-reduced-motion`
 * safety (no animation, static fallback). No new runtime deps.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Icon, type IconName } from "@/components/Icon";

/* ------------------------------------------------------------------ *
 *  Theme tokens — color + symbol per page. Each variant maps to the
 *  visual concept of that page so the object reinforces the message.
 * ------------------------------------------------------------------ */
export type Hero3DVariant =
  | "philippines"
  | "crm"
  | "ai"
  | "digital"
  | "appointment"
  | "lead"
  | "integrations"
  | "industries"
  | "how"
  | "pricing"
  | "about"
  | "services"
  | "va"
  | "generic";

type Theme = {
  /** accent ring / edge color */
  edge: string;
  /** core gradient stops */
  coreA: string;
  coreB: string;
  /** ambient glow color */
  glow: string;
  /** orbit node fill */
  node: string;
  /** primary symbol for the central core */
  symbol: IconName;
  /** floating data chips rendered around the core */
  chips: { icon: IconName; label: string }[];
};

export const heroThemes: Record<Hero3DVariant, Theme> = {
  philippines: {
    edge: "#72e4d4",
    coreA: "#0a2a4a",
    coreB: "#04121f",
    glow: "rgba(114,228,212,0.45)",
    node: "#1f6f8a",
    symbol: "globe",
    chips: [
      { icon: "users", label: "Manila" },
      { icon: "headset", label: "Cebu" },
      { icon: "database", label: "Davao" },
      { icon: "clock", label: "24/7" },
    ],
  },
  crm: {
    edge: "#5aa8ff",
    coreA: "#0a2c52",
    coreB: "#031022",
    glow: "rgba(90,168,255,0.4)",
    node: "#1f5f8a",
    symbol: "database",
    chips: [
      { icon: "users", label: "Contacts" },
      { icon: "message", label: "Inbox" },
      { icon: "chart", label: "Pipeline" },
      { icon: "refresh", label: "Reactivation" },
    ],
  },
  ai: {
    edge: "#c08bff",
    coreA: "#23124a",
    coreB: "#0c0820",
    glow: "rgba(192,139,255,0.42)",
    node: "#6a3fb0",
    symbol: "cpu",
    chips: [
      { icon: "message", label: "Chatbot" },
      { icon: "clock", label: "24/7" },
      { icon: "search", label: "Lead scoring" },
      { icon: "refresh", label: "Auto follow-up" },
    ],
  },
  digital: {
    edge: "#48d6c8",
    coreA: "#0a2c4a",
    coreB: "#041827",
    glow: "rgba(72,214,200,0.4)",
    node: "#1f6f8a",
    symbol: "monitor",
    chips: [
      { icon: "monitor", label: "Website" },
      { icon: "capture", label: "Landing" },
      { icon: "workflow", label: "Funnel" },
      { icon: "search", label: "SEO" },
    ],
  },
  appointment: {
    edge: "#ffb866",
    coreA: "#2a1f0a",
    coreB: "#1a0f03",
    glow: "rgba(255,184,102,0.4)",
    node: "#a06a2a",
    symbol: "calendar",
    chips: [
      { icon: "calendar", label: "Scheduling" },
      { icon: "bell", label: "Reminders" },
      { icon: "message", label: "Follow-up" },
      { icon: "refresh", label: "Reschedule" },
    ],
  },
  lead: {
    edge: "#72e4d4",
    coreA: "#0a2a4a",
    coreB: "#041220",
    glow: "rgba(114,228,212,0.4)",
    node: "#1f6f8a",
    symbol: "message",
    chips: [
      { icon: "message", label: "Sequences" },
      { icon: "phone", label: "Multi-channel" },
      { icon: "refresh", label: "Reactivation" },
      { icon: "clock", label: "Speed to lead" },
    ],
  },
  integrations: {
    edge: "#7fd0ff",
    coreA: "#0a2c52",
    coreB: "#031122",
    glow: "rgba(127,208,255,0.4)",
    node: "#1f5f8a",
    symbol: "link",
    chips: [
      { icon: "link", label: "Native" },
      { icon: "code", label: "API" },
      { icon: "refresh", label: "Connector" },
      { icon: "lock", label: "Secure sync" },
    ],
  },
  industries: {
    edge: "#72e4d4",
    coreA: "#0a2a4a",
    coreB: "#041220",
    glow: "rgba(114,228,212,0.4)",
    node: "#1f6f8a",
    symbol: "map",
    chips: [
      { icon: "briefcase", label: "Accounting" },
      { icon: "home", label: "Real estate" },
      { icon: "medical", label: "Medical" },
      { icon: "building", label: "Construction" },
    ],
  },
  how: {
    edge: "#ffb866",
    coreA: "#24180a",
    coreB: "#160c02",
    glow: "rgba(255,184,102,0.4)",
    node: "#a06a2a",
    symbol: "workflow",
    chips: [
      { icon: "calendar", label: "Book" },
      { icon: "settings", label: "Choose" },
      { icon: "rocket", label: "Launch" },
      { icon: "growth", label: "Scale" },
    ],
  },
  pricing: {
    edge: "#72e4d4",
    coreA: "#0a2a4a",
    coreB: "#04121f",
    glow: "rgba(114,228,212,0.4)",
    node: "#1f6f8a",
    symbol: "chart",
    chips: [
      { icon: "database", label: "3 plans" },
      { icon: "users", label: "Offshore talent" },
      { icon: "rocket", label: "Boosts" },
      { icon: "check", label: "No guesswork" },
    ],
  },
  about: {
    edge: "#72e4d4",
    coreA: "#0a2a4a",
    coreB: "#041220",
    glow: "rgba(114,228,212,0.4)",
    node: "#1f6f8a",
    symbol: "users",
    chips: [
      { icon: "users", label: "Leadership" },
      { icon: "rocket", label: "Innovation" },
      { icon: "shield", label: "Client-first" },
      { icon: "growth", label: "Growth" },
    ],
  },
  services: {
    edge: "#72e4d4",
    coreA: "#0a2a4a",
    coreB: "#041220",
    glow: "rgba(114,228,212,0.4)",
    node: "#1f6f8a",
    symbol: "briefcase",
    chips: [
      { icon: "workflow", label: "Funnels" },
      { icon: "database", label: "CRM setup" },
      { icon: "refresh", label: "Automation" },
      { icon: "chart", label: "Optimization" },
    ],
  },
  va: {
    edge: "#ffb866",
    coreA: "#24180a",
    coreB: "#160c02",
    glow: "rgba(255,184,102,0.4)",
    node: "#a06a2a",
    symbol: "headset",
    chips: [
      { icon: "briefcase", label: "Accounting" },
      { icon: "home", label: "Realtor" },
      { icon: "medical", label: "Medical" },
      { icon: "shield", label: "Insurance" },
    ],
  },
  generic: {
    edge: "#72e4d4",
    coreA: "#0a2a4a",
    coreB: "#041220",
    glow: "rgba(114,228,212,0.4)",
    node: "#1f6f8a",
    symbol: "globe",
    chips: [
      { icon: "database", label: "CRM" },
      { icon: "users", label: "Support" },
      { icon: "refresh", label: "Automation" },
      { icon: "chart", label: "Reporting" },
    ],
  },
};

/* ------------------------------------------------------------------ *
 *  Reduced-motion hook (matches the rest of the site's motion logic)
 * ------------------------------------------------------------------ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ *
 *  Parallax + pointer-tilt camera rig
 * ------------------------------------------------------------------ */
export function Hero3DStage({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Camera pulls back + tilts as you scroll through the hero.
  const z = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotX = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const rotZ = useTransform(scrollYProgress, [0, 1], [0, 4]);

  // Pointer tilt (springy, desktop only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [px, py, reduced],
  );
  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <motion.div
      ref={ref}
      className={`hero3d-stage ${className ?? ""}`}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="hero3d-rig"
        style={
          reduced
            ? undefined
            : {
                z,
                rotateX: tiltX,
                rotateY: tiltY,
                rotateZ: rotZ,
              }
        }
      >
        <motion.div
          className="hero3d-scroll-tilt"
          style={reduced ? undefined : { rotateX: rotX }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 *  Central layered core (glassy 3D "platform")
 * ------------------------------------------------------------------ */
function Core({ theme }: { theme: Theme }) {
  return (
    <div
      className="hero3d-core"
      style={
        {
          "--edge": theme.edge,
          "--core-a": theme.coreA,
          "--core-b": theme.coreB,
          "--glow": theme.glow,
          "--node": theme.node,
        } as CSSProperties
      }
    >
      <div className="hero3d-core-layer hero3d-core-bottom" />
      <div className="hero3d-core-layer hero3d-core-middle" />
      <div className="hero3d-core-top">
        <span className="hero3d-core-symbol">
          <Icon name={theme.symbol} size={44} />
        </span>
      </div>
      <span className="hero3d-core-halo" />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Orbiting node ring — the themed "chips" rotate around the core.
 *  Suspended so the ring stays visible even when reduced motion is on
 *  (position is fixed, only the orbit animation is disabled).
 * ------------------------------------------------------------------ */
function OrbitRing({ theme }: { theme: Theme }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={`hero3d-orbit${reduced ? " is-static" : ""}`}>
      <div className="hero3d-orbit-track">
        {theme.chips.map((chip, i) => {
          const total = theme.chips.length;
          const angle = (i / total) * 360;
          return (
            <div
              key={chip.label}
              className="hero3d-orbit-node"
              style={
                {
                  "--angle": `${angle}deg`,
                } as CSSProperties
              }
            >
              <span className="hero3d-orbit-icon">
                <Icon name={chip.icon} size={18} />
              </span>
              <small>{chip.label}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Philippines 3D map — the home hero centerpiece.
 *  A stylized archipelago: three landmass slabs tilted in 3D with
 *  pulsing connection nodes between Luzon, Visayas, and Mindanao.
 * ------------------------------------------------------------------ */
const PH_ISLANDS = [
  {
    name: "Luzon",
    d: "M40 60 q18 -4 30 -22 q10 -16 6 -34 q-2 -10 -14 -12 q-22 -3 -34 6 q-14 12 -16 28 q-2 22 12 36 q8 6 16 -2 Z",
    cx: 40,
    cy: 60,
    delay: "0s",
  },
  {
    name: "Visayas",
    d: "M118 150 q6 -14 0 -26 q-8 -14 -24 -10 q-18 4 -24 14 q-6 14 4 22 q12 10 24 6 q14 -2 20 -6 Z",
    cx: 96,
    cy: 140,
    delay: "0.6s",
  },
  {
    name: "Mindanao",
    d: "M150 220 q18 -6 24 -26 q6 -22 -4 -38 q-12 -18 -32 -16 q-22 2 -30 18 q-10 22 2 42 q14 24 40 20 Z",
    cx: 140,
    cy: 210,
    delay: "1.2s",
  },
];

export function PhilippinesMap() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={`hero3d-ph${reduced ? " is-static" : ""}`}>
      <svg
        viewBox="0 0 220 280"
        className="hero3d-ph-svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="ph-grad" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="rgba(114,228,212,0.28)" />
            <stop offset="100%" stopColor="rgba(8,32,60,0.0)" />
          </radialGradient>
          <filter id="ph-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="220" height="280" fill="url(#ph-grad)" rx="18" />
        <g className="hero3d-ph-land" filter="url(#ph-glow)">
          {PH_ISLANDS.map((isl) => (
            <path key={isl.name} d={isl.d} />
          ))}
        </g>
        {/* pulsing connection nodes + links */}
        {PH_ISLANDS.map((isl) => (
          <g
            key={`n-${isl.name}`}
            className="hero3d-ph-node"
            style={{ animationDelay: isl.delay }}
          >
            <circle cx={isl.cx} cy={isl.cy} r="4.5" />
          </g>
        ))}
        <g
          className="hero3d-ph-links"
          fill="none"
          stroke="rgba(114,228,212,0.6)"
        >
          <path d="M40 64 Q80 100 96 138" />
          <path d="M96 140 Q120 170 140 206" />
        </g>
      </svg>
      <span className="hero3d-ph-label">
        Philippines-based support · connected to your CRM
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Scene dispatcher
 * ------------------------------------------------------------------ */
export function Hero3DScene({ variant }: { variant: Hero3DVariant }) {
  if (variant === "philippines") {
    return (
      <Hero3DStage className="hero3d-stage--philippines">
        <PhilippinesMap />
      </Hero3DStage>
    );
  }
  const theme = heroThemes[variant];
  return (
    <Hero3DStage className={`hero3d-stage--${variant}`}>
      <div className="hero3d-scene">
        <Core theme={theme} />
        <OrbitRing theme={theme} />
      </div>
    </Hero3DStage>
  );
}

export default Hero3DScene;
