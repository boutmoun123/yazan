import About from "@/components/About";
import Footer from "@/components/Footer";
import HeroScrollScene from "@/components/HeroScrollScene";
import InfoRows from "@/components/InfoRows";
import Reveal from "@/components/Reveal";
import { withBasePath } from "@/lib/basePath";

const contactEmail = "hamarnehyazan@gmail.com";
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contactEmail
)}`;

const exhibitions = [
  {
    title: "Fundaci\u00F3 Vila Casas, Can Framis, Barcelona",
    date: "June 2026 \u2014 June 2027"
  },
  {
    title: "FineArt Igualada, Igualada",
    date: "February 2026 \u2014 March 2026"
  }
];

const studies = [
  {
    title: "MA. in Photography and Design, ELISAVA, Barcelona",
    date: "2025 \u2014 2026"
  },
  {
    title: "BBA in Business Administration, Damascus University",
    date: "2018 \u2014 2023"
  }
];

const aboutText =
  "It started with a sunset and a phone camera, and something clicked \u2014 not just the shutter. He has been shooting for over six years working across street, documentary, and events. But whatever the context, the question is always the same: what does this moment actually feel like? That's what he's looking for when he raises the camera. Not the perfect composition, not the right light \u2014 the feeling. His documentary work is where that instinct runs deepest \u2014 digging into people, cultures, and the quiet stories that don't usually get told. He's based in Barcelona and open to work across Europe and beyond.";

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
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Contact ${contactEmail} on Gmail`}
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
