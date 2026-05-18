import About from "@/components/About";
import Footer from "@/components/Footer";
import HeroScrollScene from "@/components/HeroScrollScene";
import InfoRows from "@/components/InfoRows";
import Reveal from "@/components/Reveal";
import { withBasePath } from "@/lib/basePath";

const contactEmail = "hamarnehyazan@gmail.com";
const contactEmailHref = `mailto:${contactEmail}`;

const exhibitions = [
  {
    title: "Fundaci\u00F3 Vila Casas, Can Framis, Barcelona.",
    date: "June 2026 \u2014 June 2027"
  },
  {
    title: "FineArt Igualada, Igualada.",
    date: "February 2026 \u2014 March 2026"
  }
];

const studies = [
  {
    title: "MA in Photography and Design, ELISAVA, Barcelona.",
    date: "2025 \u2014 2026"
  },
  {
    title: "BBA in Business Administration, Damascus University.",
    date: "2018 \u2014 2023"
  }
];

const aboutText = [
  "The story started with a sunset and a phone camera and something clicked that day \u2014 not just the shutter.",
  "Yazan works between street photography, documentary, storytelling and events, his images are driven by curiosity and observation, capturing quiet moments that feel raw, personal and cinematic, but whatever the context, the question is always the same: what does this moment actually feel like?",
  "He also works with design and personal publishing projects.",
  "Yazan is based in Barcelona and open to work across Europe and beyond."
].join("\n\n");

const aboutImageSrc = withBasePath("/images/about-photo.jpg");

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <HeroScrollScene />
      <About text={aboutText} imageSrc={aboutImageSrc} />
      <InfoRows
        id="exhibitions"
        title="GROUP EXHIBITIONS"
        items={exhibitions}
      />
      <InfoRows title="STUDIES" items={studies} />

      <section
        id="contact"
        className="border-b border-[color:var(--divider)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="page-shell flex min-h-[62vh] items-center justify-center pb-[6vh] pt-[6vh]">
          <Reveal className="w-full">
            <a
              href={contactEmailHref}
              aria-label={`Email ${contactEmail}`}
              className="block text-center font-sans text-[clamp(9.8rem,16vw,21rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-[var(--foreground)] transition-opacity duration-300 hover:opacity-65"
            >
              Let &apos;s Talk
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
