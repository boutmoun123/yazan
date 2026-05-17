import Image from "next/image";
import Reveal from "@/components/Reveal";
import ScrollRevealText from "@/components/ScrollRevealText";

export default function About({ text, imageSrc }) {
  return (
    <section
      id="about"
      className="border-b border-[color:var(--divider)] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="page-shell grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,560px)] xl:gap-20">
        <div className="space-y-8 sm:space-y-10 lg:space-y-14">
          <Reveal>
            <p className="section-kicker">&#8212; ABOUT YAZAN</p>
          </Reveal>

          <div className="max-w-[42rem] lg:max-w-none">
            <ScrollRevealText
              text={text}
              className="text-left text-[0.98rem] leading-[1.68] tracking-[0.055em] sm:text-center sm:text-[1.08rem] sm:leading-[1.74] sm:tracking-[0.08em] lg:text-left lg:text-[1.22rem] lg:leading-[1.72] lg:tracking-[0.095em] xl:text-[1.38rem] xl:tracking-[0.11em]"
            />
          </div>
        </div>

        <Reveal className="w-full max-w-[32rem] justify-self-center lg:max-w-[460px] lg:justify-self-end xl:max-w-[560px]" amount={0.08}>
          <div className="relative aspect-[0.96] w-full overflow-hidden rounded-[14px] bg-[var(--panel)]">
            <Image
              src={imageSrc}
              alt="Portrait of Yazan Hamarneh."
              fill
              className="object-cover object-center"
              sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 70vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
