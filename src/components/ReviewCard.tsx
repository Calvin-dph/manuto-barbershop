import type { Review } from "@/data/site";

export function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`tracking-[0.1em] text-brand ${className}`} role="img" aria-label={`${n} dari 5 bintang`}>
      {"★".repeat(n)}
      <span className="text-line">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col border border-line bg-paper p-6 sm:p-8">
      <Stars n={review.rating} />
      <blockquote className="mt-4 flex-1 text-[17px] leading-7">{review.teks}</blockquote>
      <figcaption className="mt-6 flex items-baseline justify-between gap-4 text-[15px]">
        <span className="font-semibold">{review.nama}</span>
        <span className="text-muted">{review.waktu}</span>
      </figcaption>
    </figure>
  );
}
