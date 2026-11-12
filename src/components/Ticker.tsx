const words = ["Manut'o Barbershop", "Mens Hair Stylist", "Ungaran", "Buka setiap hari 10.00–22.00", "Potong rambut Rp25.000"];

export default function Ticker() {
  const line = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6">{w}</span>
          <span aria-hidden className="text-brand-light">✦</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="ticker overflow-hidden bg-ink py-4 text-paper">
      <p className="ticker-track flex w-max font-display text-[22px] font-medium uppercase tracking-[0.04em] sm:text-[28px]">
        {line(false)}
        {line(true)}
      </p>
    </div>
  );
}
