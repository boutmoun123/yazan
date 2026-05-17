import Reveal from "@/components/Reveal";

export default function InfoRows({ id, title, items }) {
  return (
    <section
      id={id}
      className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:py-28"
    >
      <div className="mx-auto grid max-w-[1080px] gap-10 md:gap-12 xl:grid-cols-[190px_minmax(0,620px)] xl:gap-[140px]">
        <Reveal>
          <div className="flex items-center gap-2.5 pt-1 text-[0.96rem] font-semibold uppercase tracking-[-0.04em] text-[var(--foreground)]">
            <span className="block h-px w-7 bg-[var(--foreground)]" />
            <h2>{title}</h2>
          </div>
        </Reveal>

        <div className="w-full xl:justify-self-end">
          {items.map((item, index) => (
            <Reveal key={`${item.title}-${index}`} delay={index * 0.08}>
              <article className="border-b border-[color:var(--divider)] py-5 transition-opacity duration-300 sm:py-7">
                <div className="flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1fr)_max-content] md:items-start md:gap-x-8 md:gap-y-0 lg:gap-x-10">
                  <h3 className="max-w-[28rem] text-[1rem] font-medium leading-[1.42] tracking-[-0.035em] text-[var(--foreground)] transition-opacity duration-300 sm:text-[1.05rem] lg:text-[1.12rem]">
                    {item.title}
                  </h3>
                  <p className="text-[0.96rem] font-medium leading-[1.42] tracking-[-0.035em] text-[var(--foreground)] md:min-w-[12rem] md:pt-[0.01rem] md:text-right md:text-[1rem] lg:min-w-[14rem] lg:text-[1.02rem]">
                    {item.date}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
