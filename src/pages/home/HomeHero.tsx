import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import Background3D from "@/components/Background3D";
import { trust, floatCards, HERO_IMG } from "@/pages/home/homeData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-20">
      <Background3D />
      <div className="container-gmg grid lg:grid-cols-[1.13fr_1fr] gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="eyebrow-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block animate-pulse" />
            Better systems. Better people. Better growth.
          </span>
          <h1 className="text-5xl md:text-[4.35rem] font-bold mt-6">
            Turn more leads
            <br />
            into <span className="accent-text">customers.</span>
          </h1>
          <p className="text-xl text-navy font-semibold mt-4">
            Without doing everything yourself.
          </p>
          <p className="lead-gmg mt-4 max-w-xl">
            Global Marketing Group combines CRM technology, sales automation,
            proven follow-up processes, and dedicated Virtual Assistant support
            to help businesses operate more efficiently and grow more
            consistently.
          </p>
          <motion.div
            className="flex flex-wrap items-center gap-5 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <Link to="/contact" className="btn-primary-gmg">
              Book a Free Strategy Call <Icon name="calendar" size={18} />
            </Link>
            <a href="#core-solutions" className="btn-outline-gmg">
              Explore Our Services <Icon name="arrow" size={18} />
            </a>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="flex items-center gap-2">
              <Icon name="check" size={18} className="text-teal" />
              One system. One support team.
            </span>
            <span className="flex items-center gap-2">
              <Icon name="check" size={18} className="text-teal" />A better way
              to grow.
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-mint/50 via-teal/10 to-transparent rounded-[40px] blur-2xl" />
          <div className="ring-card relative p-3 shadow-[0_30px_80px_rgba(15,31,51,0.16)]">
            <img
              src={HERO_IMG}
              alt="Support professional wearing a headset and working at a laptop"
              className="rounded-2xl w-full"
            />
          </div>
          {floatCards.map(
            (
              c: {
                icon: IconName;
                title: string;
                sub: string;
                pos: string;
                delay: string;
              },
              i: number,
            ) => (
              <motion.div
                key={c.title}
                className={`absolute ${c.pos} bg-white/95 backdrop-blur-sm rounded-2xl border border-line shadow-[0_16px_40px_rgba(15,31,51,0.14)] p-3 flex items-center gap-3 max-w-[220px] animate-floaty`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.18,
                  ease: EASE,
                }}
              >
                <span className="icon-box">
                  <Icon name={c.icon} size={20} />
                </span>
                <div>
                  <strong className="text-navy text-sm block">{c.title}</strong>
                  <span className="text-xs text-muted-foreground">{c.sub}</span>
                </div>
              </motion.div>
            ),
          )}
        </motion.div>
      </div>

      {/* Trust strip */}
      <StaggerGroup className="container-gmg mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {trust.map((t) => (
          <StaggerItem
            key={t.title}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white/90 backdrop-blur-sm p-4 transition-all hover:border-teal/40 hover:shadow-[0_14px_40px_rgba(15,31,51,0.1)] hover:-translate-y-0.5"
          >
            <span className="icon-box">
              <Icon name={t.icon} size={22} />
            </span>
            <div>
              <strong className="text-navy text-sm block">{t.title}</strong>
              <span className="text-xs text-muted-foreground">{t.sub}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
