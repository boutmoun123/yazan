import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";

const navigation = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/#about" },
  { label: "WORK", href: "/work" }
];

const socials = [
  { label: "EMAIL", href: "mailto:hamarnehyazan@gmail.com" },
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/el.fotografo__/",
    external: true
  },
  { label: "+34 672 262 278", href: "tel:+34672262278" }
];

const logoPath = withBasePath("/images/logo.png");

function FooterColumn({ title, children }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-center gap-2.5 text-[0.86rem] font-semibold uppercase tracking-[-0.04em] text-[var(--foreground)] sm:text-[0.96rem]">
        <span className="block h-px w-8 bg-[var(--foreground)] sm:w-9" />
        <h2>{title}</h2>
      </div>
      <div className="flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function FooterLinkLabel({ children }) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className="relative block h-[1.18em] overflow-hidden whitespace-nowrap [perspective:700px]"
      >
        <span className="block origin-bottom transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translateY(-115%)_rotateX(90deg)]">
          {children}
        </span>
        <span className="absolute left-0 top-full block origin-top whitespace-nowrap transform-gpu [transform:rotateX(-90deg)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translateY(-100%)_rotateX(0deg)]">
          {children}
        </span>
      </span>
    </>
  );
}

function FooterLink({ href, children, external = false }) {
  const className =
    "group block w-fit border-b border-[color:var(--divider)] pb-1 text-[0.96rem] font-medium uppercase tracking-[-0.03em] text-[var(--foreground)] transition-colors duration-200 hover:text-[var(--foreground)] sm:text-[1.02rem]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        <FooterLinkLabel>{children}</FooterLinkLabel>
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        <FooterLinkLabel>{children}</FooterLinkLabel>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <FooterLinkLabel>{children}</FooterLinkLabel>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-background)] px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:px-12 lg:pb-8 lg:pt-8">
      <div className="page-shell grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[180px_minmax(0,1fr)_1fr] lg:gap-14 xl:min-h-[35vh] xl:grid-cols-[220px_minmax(0,1fr)_230px_230px_120px] xl:items-end">
        <div className="sm:col-span-2 lg:col-span-1 xl:self-end xl:pb-1">
          <Image
            src={logoPath}
            alt="Yazan Hamarneh mark"
            width={280}
            height={280}
            className="theme-logo h-20 w-20 animate-[spin_18s_linear_infinite] object-contain sm:h-28 sm:w-28 lg:h-40 lg:w-40 xl:h-52 xl:w-52"
            priority={false}
          />
        </div>

        <div className="hidden xl:block" />

        <FooterColumn title="NAVIGATION">
          {navigation.map((item) => (
            <FooterLink key={item.label} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="SOCIALS">
          {socials.map((item) => (
            <FooterLink
              key={item.label}
              href={item.href}
              external={item.external}
            >
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1 xl:self-end xl:pb-1">
          <div className="pt-1 text-[0.86rem] font-semibold uppercase tracking-[-0.04em] text-[var(--foreground)] sm:text-[0.96rem]">
            {"\u00A92026"}
          </div>
        </div>
      </div>
    </footer>
  );
}
