import { LEADERS, TOTAL_NEIGHBOURS } from "@/data/demo";
import { t } from "@/lib/i18n/ru";

const fmt = (n: number) => n.toLocaleString("ru-RU");

export function Rating() {
  return (
    <section aria-labelledby="rating-title" className="card-yard p-4">
      <header className="mb-3 flex items-baseline justify-between gap-2">
        <h2 id="rating-title" className="text-base font-semibold">{t.rating.title}</h2>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">{t.rating.period}</span>
      </header>
      <ol className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
        {LEADERS.map((l, i) => (
          <li key={l.title} className="flex w-56 shrink-0 items-center gap-3 rounded-2xl bg-muted p-2.5 lg:w-auto">
            <div className="relative shrink-0">
              <img src={l.image} alt={l.title} width={56} height={56} loading="lazy" className="size-14 rounded-full border-2 border-ink object-cover" />
              <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full border-2 border-ink bg-secondary text-xs font-bold">{i + 1}</span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-[11px] font-semibold uppercase leading-tight tracking-wide text-primary">{l.title}</p>
              <p className="truncate text-sm font-semibold" title={l.nick}>{l.nick}</p>
              <p className="text-xs text-muted-foreground">{fmt(l.count)} {l.metric}</p>
            </div>
          </li>
        ))}
        <li className="flex w-56 shrink-0 items-center gap-3 rounded-2xl border-2 border-dashed border-ink/30 p-2.5 lg:w-auto">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-paper">5</span>
          <div className="min-w-0">
            <p className="font-display text-[11px] font-semibold uppercase tracking-wide text-primary">{t.rating.yobs}</p>
            <p className="font-display text-lg font-bold">{fmt(TOTAL_NEIGHBOURS)}</p>
            <p className="text-xs text-muted-foreground">{t.rating.yobsCaption}</p>
          </div>
        </li>
      </ol>
      <p className="mt-3 text-[11px] text-muted-foreground">* {t.rating.demo}</p>
    </section>
  );
}
