"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import NavHoverLink from "@/components/NavHoverLink";
import { withBasePath } from "@/lib/basePath";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/work" }
];

const logoPath = withBasePath("/images/logo.png");

function MobileHeroHeader() {
  return (
    <div className="flex items-start gap-6 xl:hidden">
      <div className="shrink-0">
        <Link href="/" className="block pt-1">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
          >
            <Image
              src={logoPath}
              alt="Yazan Hamarneh mark"
              width={46}
              height={46}
              className="theme-logo h-10 w-10 object-contain opacity-95 sm:h-11 sm:w-11"
              priority
            />
          </motion.div>
        </Link>
      </div>

      <nav
        aria-label="Primary navigation"
        className="flex-1 pt-3 text-[0.72rem] font-semibold uppercase tracking-[-0.03em] text-[var(--foreground)] sm:text-[0.8rem]"
      >
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8">
          {navigation.map((item) => (
            <li key={item.label}>
              <NavHoverLink href={item.href} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function DesktopHeroHeader() {
  return (
    <div className="hidden grid-cols-[auto_1fr_auto] items-start xl:grid">
      <Link href="/" className="block pt-1">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
        >
          <Image
            src={logoPath}
            alt="Yazan Hamarneh mark"
            width={46}
            height={46}
            className="theme-logo h-11 w-11 object-contain opacity-95"
            priority
          />
        </motion.div>
      </Link>

      <nav
        aria-label="Primary navigation"
        className="justify-self-center text-[0.88rem] font-semibold uppercase tracking-[-0.03em] text-[var(--foreground)]"
      >
        <ul className="flex items-center gap-14">
          {navigation.map((item) => (
            <li key={item.label}>
              <NavHoverLink href={item.href} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>

      <div aria-hidden="true" className="h-11 w-11" />
    </div>
  );
}

function MobileHeroBody() {
  return (
    <div className="flex flex-1 items-center xl:hidden">
      <div className="w-full max-w-[24rem] -translate-y-[4vh] sm:max-w-[28rem] sm:-translate-y-[2vh]">
        <div className="space-y-1 sm:space-y-1.5">
          <span className="block max-w-full font-display text-[clamp(4rem,16vw,5.75rem)] font-semibold uppercase leading-[0.88] tracking-[-0.09em] text-[var(--foreground)]">
            Yazan
          </span>

          <span className="block max-w-full font-display text-[clamp(4rem,16vw,5.75rem)] font-semibold uppercase leading-[0.88] tracking-[-0.09em] text-[var(--foreground)]">
            Hamarneh
          </span>
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <Image
              src={logoPath}
              alt="Yazan Hamarneh mark"
              width={160}
              height={160}
              className="theme-logo h-28 w-28 object-contain sm:h-32 sm:w-32"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DesktopHeroBody({ viewportRef, trackRef, springX, handleMove }) {
  return (
    <div
      ref={viewportRef}
      className="relative hidden flex-1 items-center overflow-hidden xl:flex"
      onMouseMove={handleMove}
    >
      <motion.div
        ref={trackRef}
        style={{ x: springX }}
        transition={{ duration: 0.9 }}
        className="flex items-center gap-[clamp(5rem,10vw,12rem)] whitespace-nowrap pb-[12vh] pt-[18vh] will-change-transform"
      >
        <span className="font-display text-[clamp(6.5rem,18vw,18rem)] font-semibold uppercase leading-[0.84] tracking-[-0.07em] text-[var(--foreground)]">
          Yazan
        </span>
        <span className="font-display text-[clamp(6.5rem,18vw,18rem)] font-semibold uppercase leading-[0.84] tracking-[-0.07em] text-[var(--foreground)]">
          Hamarneh
        </span>
        <div className="flex shrink-0 items-center pl-[clamp(0.5rem,2vw,2rem)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <Image
              src={logoPath}
              alt="Yazan Hamarneh mark"
              width={240}
              height={240}
              className="theme-logo h-[clamp(6rem,12vw,13rem)] w-[clamp(6rem,12vw,13rem)] object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function MobileHeroFooter() {
  return (
    <div className="flex items-end justify-center pb-7 text-[var(--foreground)] sm:pb-9 xl:hidden">
      <p className="text-center font-sans text-[0.78rem] leading-[1.4] tracking-[0.08em] sm:text-[0.9rem]">
        Discover the Untouched
      </p>
    </div>
  );
}

function DesktopHeroFooter() {
  return (
    <div className="hidden items-end justify-center pb-14 text-[var(--foreground)] xl:flex">
      <p className="font-sans text-[0.95rem] tracking-[0.08em]">
        Discover the Untouched
      </p>
    </div>
  );
}

export function HeroContent({ className = "" }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 90,
    damping: 22,
    mass: 0.85
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return undefined;
    }

    const syncPosition = () => {
      x.set(0);
    };

    syncPosition();

    const resizeObserver = new ResizeObserver(syncPosition);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
    };
  }, [x]);

  const handleMove = (event) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const overflow = Math.max(track.scrollWidth - viewport.offsetWidth, 0);

    if (!overflow) {
      return;
    }

    const rect = viewport.getBoundingClientRect();
    const progress = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1
    );

    x.set(-(overflow * progress));
  };

  return (
    <div className={`h-full px-4 pt-4 sm:px-8 sm:pt-6 lg:px-10 xl:px-14 xl:pt-8 ${className}`}>
      <div className="page-shell flex min-h-[calc(100vh-1rem)] flex-col">
        <MobileHeroHeader />
        <DesktopHeroHeader />
        <MobileHeroBody />
        <DesktopHeroBody
          viewportRef={viewportRef}
          trackRef={trackRef}
          springX={springX}
          handleMove={handleMove}
        />
        <MobileHeroFooter />
        <DesktopHeroFooter />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden border-b border-[color:var(--divider)]"
    >
      <HeroContent />
    </section>
  );
}
