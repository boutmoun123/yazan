"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { HeroContent } from "@/components/Hero";
import { WorkIntroContent } from "@/components/WorkIntro";

export default function HeroScrollScene() {
  const sceneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.34, 0.54], [1, 0.34, 0]),
    { stiffness: 120, damping: 26, mass: 0.45 }
  );
  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.54], [0, -90]), {
    stiffness: 120,
    damping: 26,
    mass: 0.45
  });

  const nextOpacity = useSpring(
    useTransform(scrollYProgress, [0.18, 0.42, 0.68], [0, 0.55, 1]),
    { stiffness: 120, damping: 26, mass: 0.45 }
  );
  const nextY = useSpring(useTransform(scrollYProgress, [0.18, 0.68], [110, 0]), {
    stiffness: 120,
    damping: 26,
    mass: 0.45
  });
  const heroPointerEvents = useTransform(scrollYProgress, (value) =>
    value >= 0.5 ? "none" : "auto"
  );
  const nextPointerEvents = useTransform(scrollYProgress, (value) =>
    value >= 0.24 ? "auto" : "none"
  );

  return (
    <section
      id="home"
      ref={sceneRef}
      className="relative h-[182vh] bg-[var(--background)] sm:h-[194vh] lg:h-[205vh] xl:h-[220vh]"
    >
      <div id="work" className="absolute top-[100vh]" aria-hidden="true" />

      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }}
          className="absolute inset-0 z-20 border-b border-[color:var(--divider)] bg-[var(--background)]"
        >
          <HeroContent />
        </motion.div>

        <motion.div
          style={{ opacity: nextOpacity, y: nextY, pointerEvents: nextPointerEvents }}
          className="absolute inset-0 z-10 border-b border-[color:var(--divider)] bg-[var(--background)]"
        >
          <WorkIntroContent useReveal={false} />
        </motion.div>
      </div>
    </section>
  );
}
