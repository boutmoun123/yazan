"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavHoverLink from "@/components/NavHoverLink";
import { withBasePath } from "@/lib/basePath";

const gallerySections = [
  {
    key: "work",
    title: "WORK",
    titleClassName:
      "font-display text-[clamp(4rem,15vw,8.5rem)] font-semibold uppercase leading-[0.84] tracking-[-0.07em] text-[var(--foreground)]",
    layout: [
      { type: "full", numbers: [1], aspect: "aspect-[16/10] sm:aspect-[16/9.2]" },
      {
        type: "trio",
        numbers: [2, 3, 4],
        aspects: ["aspect-[4/6]", "aspect-[4/6]", "aspect-[4/6]"]
      },
      { type: "full", numbers: [5], aspect: "aspect-[16/10] sm:aspect-[16/9.6]" },
      { type: "full", numbers: [6], aspect: "aspect-[16/10] sm:aspect-[16/9.6]" },
      { type: "full", numbers: [7], aspect: "aspect-[16/10] sm:aspect-[16/9.6]" },
      { type: "full", numbers: [8], aspect: "aspect-[16/10] sm:aspect-[16/9.6]" },
      {
        type: "trio",
        numbers: [9, 10, 11],
        aspects: ["aspect-[4/6]", "aspect-[4/6]", "aspect-[4/6]"]
      },
      {
        type: "trio",
        numbers: [12, 13, 14],
        aspects: ["aspect-[4/6]", "aspect-[4/6]", "aspect-[4/6]"]
      },
      { type: "full", numbers: [15], aspect: "aspect-[16/10] sm:aspect-[16/9.2]" },
      {
        type: "trio",
        numbers: [16, 17, 18],
        aspects: ["aspect-[4/6]", "aspect-[4/6]", "aspect-[4/6]"]
      }
    ]
  },
  {
    key: "archive",
    title: "ARCHIVE",
    titleClassName:
      "font-sans text-[1.9rem] font-medium uppercase tracking-[-0.02em] text-[var(--foreground)] sm:text-[2.2rem]",
    layout: [
      { type: "full", numbers: [19], aspect: "aspect-[16/10] sm:aspect-[16/9.6]" },
      {
        type: "trio",
        numbers: [20, 21, 22],
        aspects: ["aspect-[4/6]", "aspect-[4/6]", "aspect-[4/6]"]
      },
      {
        type: "trio",
        numbers: [23, 24, 25],
        aspects: ["aspect-[4/6]", "aspect-[4/6]", "aspect-[4/6]"]
      },
      { type: "full", numbers: [26], aspect: "aspect-[16/10] sm:aspect-[16/9.6]" },
      { type: "full", numbers: [27], aspect: "aspect-[16/10] sm:aspect-[16/9.6]" },
      {
        type: "trio",
        numbers: [28, 29, 30],
        aspects: ["aspect-[4/6]", "aspect-[4/6]", "aspect-[4/6]"]
      }
    ]
  }
];

const logoPath = withBasePath("/images/logo.png");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getDistance(pointA, pointB) {
  return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
}

function Lightbox({ image, onClose }) {
  const imageRef = useRef(null);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef({
    mode: null,
    startZoom: 1,
    startDistance: 0,
    startOffset: { x: 0, y: 0 },
    startPointer: { x: 0, y: 0 }
  });
  const zoomRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const clampOffset = (nextOffset, nextZoom = zoomRef.current) => {
    const frame = imageRef.current;

    if (!frame || nextZoom <= 1) {
      return { x: 0, y: 0 };
    }

    const maxX = ((nextZoom - 1) * frame.clientWidth) / 2;
    const maxY = ((nextZoom - 1) * frame.clientHeight) / 2;

    return {
      x: clamp(nextOffset.x, -maxX, maxX),
      y: clamp(nextOffset.y, -maxY, maxY)
    };
  };

  const updateOffset = (nextOffset, nextZoom = zoomRef.current) => {
    const clampedOffset = clampOffset(nextOffset, nextZoom);
    offsetRef.current = clampedOffset;
    setOffset(clampedOffset);
  };

  const updateZoom = (nextZoom) => {
    const clampedZoom = clamp(nextZoom, 1, 4);
    zoomRef.current = clampedZoom;
    setZoom(clampedZoom);

    if (clampedZoom === 1) {
      updateOffset({ x: 0, y: 0 }, 1);
      return;
    }

    updateOffset(offsetRef.current, clampedZoom);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    updateZoom(1);
  }, [image]);

  const handleWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const delta = -event.deltaY * 0.0016;
    updateZoom(zoomRef.current + delta);
  };

  const handleDoubleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateZoom(zoomRef.current > 1 ? 1 : 2);
  };

  const handlePointerDown = (event) => {
    event.stopPropagation();

    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);

    const points = Array.from(pointersRef.current.values());

    if (points.length === 2) {
      gestureRef.current = {
        mode: "pinch",
        startZoom: zoomRef.current,
        startDistance: getDistance(points[0], points[1]),
        startOffset: offsetRef.current,
        startPointer: point
      };
      return;
    }

    if (zoomRef.current > 1) {
      gestureRef.current = {
        mode: "pan",
        startZoom: zoomRef.current,
        startDistance: 0,
        startOffset: offsetRef.current,
        startPointer: point
      };
    }
  };

  const handlePointerMove = (event) => {
    if (!pointersRef.current.has(event.pointerId)) {
      return;
    }

    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);
    const points = Array.from(pointersRef.current.values());

    if (points.length === 2 && gestureRef.current.mode === "pinch") {
      const distance = getDistance(points[0], points[1]);
      const baseDistance = gestureRef.current.startDistance || distance;
      updateZoom(gestureRef.current.startZoom * (distance / baseDistance));
      return;
    }

    if (gestureRef.current.mode === "pan" && zoomRef.current > 1) {
      const deltaX = point.x - gestureRef.current.startPointer.x;
      const deltaY = point.y - gestureRef.current.startPointer.y;

      updateOffset({
        x: gestureRef.current.startOffset.x + deltaX,
        y: gestureRef.current.startOffset.y + deltaY
      });
    }
  };

  const handlePointerEnd = (event) => {
    pointersRef.current.delete(event.pointerId);
    const points = Array.from(pointersRef.current.values());

    if (points.length === 1 && zoomRef.current > 1) {
      gestureRef.current = {
        mode: "pan",
        startZoom: zoomRef.current,
        startDistance: 0,
        startOffset: offsetRef.current,
        startPointer: points[0]
      };
      return;
    }

    gestureRef.current = {
      mode: null,
      startZoom: zoomRef.current,
      startDistance: 0,
      startOffset: offsetRef.current,
      startPointer: { x: 0, y: 0 }
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="fixed inset-0 z-[160] bg-black/94"
      onClick={onClose}
    >
      <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.985, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.985, y: 18 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-h-[90vh] max-w-[min(94vw,1700px)] items-center justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          <motion.img
            ref={imageRef}
            src={image.src}
            alt={image.alt}
            draggable="false"
            onWheel={handleWheel}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerLeave={handlePointerEnd}
            style={{
              scale: zoom,
              x: offset.x,
              y: offset.y
            }}
            className={`max-h-[90vh] max-w-[94vw] select-none object-contain touch-none ${
              zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function MobileWorkHeader() {
  return (
    <header className="mx-auto flex max-w-[1080px] flex-col gap-5 xl:hidden">
      <div className="flex items-start justify-between gap-4 pr-16 min-[520px]:pr-0">
        <Link href="/" className="block">
          <Image
            src={logoPath}
            alt="Yazan Hamarneh mark"
            width={46}
            height={46}
            className="theme-logo h-10 w-10 animate-[spin_18s_linear_infinite] object-contain sm:h-11 sm:w-11"
            priority
          />
        </Link>

        <a
          href="https://www.instagram.com/el.fotografo__/"
          target="_blank"
          rel="noreferrer"
          className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-soft)] sm:text-[0.78rem]"
        >
          Instagram
        </a>
      </div>

      <nav
        aria-label="Work navigation"
        className="self-center text-[0.76rem] font-semibold uppercase tracking-[-0.03em] text-[var(--foreground)] sm:text-[0.84rem]"
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
          <li>
            <NavHoverLink href="/" label="Home" />
          </li>
          <li>
            <NavHoverLink href="/#about" label="About" />
          </li>
          <li>
            <NavHoverLink href="/work" label="Work" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

function DesktopWorkHeader() {
  return (
    <header className="mx-auto hidden max-w-[1080px] grid-cols-[auto_1fr_auto] items-center gap-4 text-[0.78rem] font-semibold uppercase tracking-[-0.03em] text-[var(--foreground)] xl:grid">
      <Link href="/" className="block">
        <Image
          src={logoPath}
          alt="Yazan Hamarneh mark"
          width={46}
          height={46}
          className="theme-logo h-11 w-11 animate-[spin_18s_linear_infinite] object-contain"
          priority
        />
      </Link>

      <nav aria-label="Work navigation" className="justify-self-center text-[0.88rem]">
        <ul className="flex items-center gap-10">
          <li>
            <NavHoverLink href="/" label="Home" />
          </li>
          <li>
            <NavHoverLink href="/#about" label="About" />
          </li>
          <li>
            <NavHoverLink href="/work" label="Work" />
          </li>
        </ul>
      </nav>

      <a
        href="https://www.instagram.com/el.fotografo__/"
        target="_blank"
        rel="noreferrer"
        className="justify-self-end"
      >
        Instagram
      </a>
    </header>
  );
}

function GalleryImage({
  image,
  aspect,
  onOpen,
  priority = false,
  sizes = "(min-width: 1280px) 70vw, (min-width: 768px) 82vw, 100vw"
}) {
  return (
    <article>
      <button
        type="button"
        onClick={() => onOpen(image)}
        aria-label={`Open ${image.alt}`}
        className="group block w-full cursor-zoom-in text-left"
      >
        <div className={`relative overflow-hidden bg-[var(--soft-surface)] ${aspect}`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            priority={priority}
            sizes={sizes}
          />
        </div>
      </button>
    </article>
  );
}

function FullWidthBlock({ image, aspect, onOpen, priority = false }) {
  if (!image) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[1080px]">
      <GalleryImage
        image={image}
        aspect={aspect}
        onOpen={onOpen}
        priority={priority}
      />
    </div>
  );
}

function TrioBlock({ images, aspects, onOpen, priorityCount = 0 }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:gap-6">
      {images.map((image, index) => (
        <GalleryImage
          key={image.id}
          image={image}
          aspect={aspects[index] ?? "aspect-[4/5]"}
          onOpen={onOpen}
          priority={index < priorityCount}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 28vw, (min-width: 520px) 44vw, 100vw"
        />
      ))}
    </div>
  );
}

function LeftoverGrid({ images, onOpen }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:gap-6">
      {images.map((image) => (
        <GalleryImage
          key={image.id}
          image={image}
          aspect="aspect-[4/5]"
          onOpen={onOpen}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 28vw, (min-width: 520px) 44vw, 100vw"
        />
      ))}
    </div>
  );
}

function resolveBlocks(layout, imageMap) {
  return layout
    .map((block) => ({
      ...block,
      images: block.numbers.map((number) => imageMap.get(number)).filter(Boolean)
    }))
    .filter((block) => block.images.length);
}

function EditorialSection({
  title,
  titleClassName,
  blocks,
  remainingImages,
  onOpen,
  eagerLoadLeadImage = false
}) {
  return (
    <section className="space-y-8 sm:space-y-10 lg:space-y-14">
      <div className="text-center">
        <h2 className={titleClassName}>{title}</h2>
      </div>

      <div className="space-y-4 sm:space-y-6 lg:space-y-9">
        {blocks.map((block, index) => {
          const shouldPrioritizeBlock = eagerLoadLeadImage && index === 0;

          if (block.type === "full") {
            return (
              <FullWidthBlock
                key={`${title}-full-${index}`}
                image={block.images[0]}
                aspect={block.aspect}
                onOpen={onOpen}
                priority={shouldPrioritizeBlock}
              />
            );
          }

          return (
            <TrioBlock
              key={`${title}-trio-${index}`}
              images={block.images}
              aspects={block.aspects}
              onOpen={onOpen}
              priorityCount={shouldPrioritizeBlock ? 1 : 0}
            />
          );
        })}

        <LeftoverGrid images={remainingImages} onOpen={onOpen} />
      </div>
    </section>
  );
}

export default function WorkGallery({ images }) {
  const [activeImage, setActiveImage] = useState(null);
  const imageMap = new Map(images.map((image) => [image.order, image]));
  const usedNumbers = new Set(
    gallerySections.flatMap((section) =>
      section.layout.flatMap((block) => block.numbers)
    )
  );
  const leftoverImages = images.filter((image) => !usedNumbers.has(image.order));
  const sections = gallerySections
    .map((section) => ({
      ...section,
      blocks: resolveBlocks(section.layout, imageMap)
    }))
    .filter((section) => section.blocks.length);

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--foreground)] sm:px-6 sm:py-8 lg:px-10">
        <div className="page-shell space-y-10 sm:space-y-12 lg:space-y-16">
          <MobileWorkHeader />
          <DesktopWorkHeader />

          {sections.map((section, index) => (
            <EditorialSection
              key={section.key}
              title={section.title}
              titleClassName={section.titleClassName}
              blocks={section.blocks}
              remainingImages={index === sections.length - 1 ? leftoverImages : []}
              onOpen={setActiveImage}
              eagerLoadLeadImage={index === 0}
            />
          ))}
        </div>
      </main>

      <AnimatePresence>
        {activeImage ? (
          <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
