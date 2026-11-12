import Link from "next/link";

export default function SectionHead({ title, line, href, linkLabel, as: H = "h2" }: { title: string; line?: string; href?: string; linkLabel?: string; as?: "h1" | "h2" }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <H className={H === "h1" ? "h-display text-[44px] sm:text-[72px]" : "h-section"}>{title}</H>
      {(line || href) && (
        <div className="flex flex-col gap-2 md:max-w-[420px] md:items-end md:text-right">
          {line && <p className="text-[16px] leading-6 text-muted">{line}</p>}
          {href && (
            <Link href={href} className="link-draw group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.06em]">
              {linkLabel}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
