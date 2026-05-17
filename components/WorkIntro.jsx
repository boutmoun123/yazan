import Reveal from "@/components/Reveal";
import Link from "next/link";

export function WorkIntroContent({ className = "", useReveal = true }) {
  const content = (
    <Link
      href="/work"
      className="mx-auto flex w-fit items-end gap-5 sm:gap-8 lg:gap-10"
    >
      <h2 className="font-display text-[clamp(6.5rem,20vw,15rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em] text-[var(--foreground)]">
        Work
      </h2>
      <p className="pb-[1.05em] font-sans text-[clamp(0.95rem,1.35vw,1.45rem)] tracking-[-0.03em] text-[color:var(--foreground-muted)]">
        {"\u00A92026"}
      </p>
    </Link>
  );

  return (
    <div className={`h-full px-5 sm:px-8 lg:px-12 ${className}`}>
      <div className="page-shell flex min-h-screen items-end pb-[8vh] pt-[16vh] sm:pb-[8vh] sm:pt-[16vh] lg:pb-[7vh] lg:pt-[18vh]">
        {useReveal ? <Reveal className="w-full">{content}</Reveal> : content}
      </div>
    </div>
  );
}

export default function WorkIntro() {
  return (
    <section id="work" className="border-b border-[color:var(--divider)]">
      <WorkIntroContent />
    </section>
  );
}
