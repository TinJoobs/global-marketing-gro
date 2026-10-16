import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Smooth premium easing curve used across all entrance animations. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Reveal — a single block that fades + slides into view on scroll.
 * Matches the repo's `data-reveal` entrance effects using framer-motion.
 */
export const Reveal: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}> = ({ children, className, delay = 0, y = 28, duration = 0.7 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    transition={{ duration, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/** Container that staggers its `StaggerItem` children into view. */
export const StaggerGroup: React.FC<{
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}> = ({ children, className, stagger = 0.09, delay = 0.06 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
    variants={{
      hidden: {},
      show: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    }}
  >
    {children}
  </motion.div>
);

/** Individual item animated as part of a `StaggerGroup`. */
export const StaggerItem: React.FC<{
  children: ReactNode;
  className?: string;
  y?: number;
}> = ({ children, className, y = 26 }) => {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};
