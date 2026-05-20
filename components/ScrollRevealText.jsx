"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const REVEAL_COMPLETION_PROGRESS = 0.62;

function RevealCharacter({ char, index, total, progress }) {
  const step = REVEAL_COMPLETION_PROGRESS / Math.max(total, 1);
  const start = index * step;
  const end = Math.min(start + step * 1.08, REVEAL_COMPLETION_PROGRESS);
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
  const [isRevealLocked, setIsRevealLocked] = useState(false);
  const normalizedText = useMemo(() => text.replace(/\r\n/g, "\n"), [text]);
  const tokens = useMemo(
    () => normalizedText.split(/(\n|[^\S\n]+)/).filter(Boolean),
    [normalizedText]
  );
  const characters = useMemo(() => Array.from(normalizedText), [normalizedText]);
  const revealableCharacters = useMemo(
    () => characters.filter((char) => !/\s/.test(char)),
    [characters]
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.96", "end 0.42"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value >= REVEAL_COMPLETION_PROGRESS) {
        setIsRevealLocked(true);
      }
    });

    return unsubscribe;
  }, [scrollYProgress]);

  if (isRevealLocked) {
    return (
      <p ref={ref} className={`whitespace-pre-line text-[var(--foreground)] ${className}`}>
        {normalizedText}
      </p>
    );
  }

  let revealIndex = -1;

  return (
    <p ref={ref} className={`text-[var(--reveal-base)] ${className}`}>
      {tokens.map((token, tokenIndex) => {
        if (token === "\n") {
          return <br key={`line-break-${tokenIndex}`} />;
        }

        if (/^[^\S\n]+$/.test(token)) {
          return <span key={`space-${tokenIndex}`}>{token}</span>;
        }

        return (
          <span key={`word-${tokenIndex}`} className="inline-block align-baseline">
            {Array.from(token).map((char, charIndex) => {
              revealIndex += 1;

              return (
                <RevealCharacter
                  key={`char-${tokenIndex}-${charIndex}`}
                  char={char}
                  index={revealIndex}
                  total={revealableCharacters.length}
                  progress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
}
