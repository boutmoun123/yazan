"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function RevealCharacter({ char, index, total, progress }) {
  const step = 1 / Math.max(total, 1);
  const start = index * step;
  const end = Math.min(start + step * 1.08, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <span className="relative inline-block align-baseline">
      <span className="opacity-0">{char}</span>
      <motion.span
        aria-hidden="true"
        style={{ opacity }}
        className="absolute inset-0 text-[var(--foreground)]"
      >
        {char}
      </motion.span>
    </span>
  );
}

export default function ScrollRevealText({ text, className = "" }) {
  const ref = useRef(null);
  const characters = useMemo(() => Array.from(text), [text]);
  const revealableCharacters = useMemo(
    () => characters.filter((char) => !/\s/.test(char)),
    [characters]
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.96", "end 0.42"]
  });

  let revealIndex = -1;

  return (
    <p ref={ref} className={`text-[var(--reveal-base)] ${className}`}>
      {characters.map((char, index) => {
        if (/\s/.test(char)) {
          return <span key={`space-${index}`}>{char}</span>;
        }

        revealIndex += 1;

        return (
          <RevealCharacter
            key={`char-${index}`}
            char={char}
            index={revealIndex}
            total={revealableCharacters.length}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
}
