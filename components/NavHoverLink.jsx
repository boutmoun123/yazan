import Link from "next/link";

export default function NavHoverLink({ href, label, className = "" }) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center whitespace-nowrap ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100"
      >
        {"\u2192"}
      </span>
      <span className="inline-block origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-4 group-hover:scale-[1.04] sm:group-hover:translate-x-5 sm:group-hover:scale-[1.06]">
        {label}
      </span>
    </Link>
  );
}
