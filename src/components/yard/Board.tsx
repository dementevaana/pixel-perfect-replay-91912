import { BOARD_EXAMPLES, RECOMMEND_EXAMPLES } from "@/data/demo";
import { t } from "@/lib/i18n/ru";

export function Board() {
  return (
    <section aria-labelledby="board-title" className="rounded-2xl border-2 border-ink bg-secondary/40 p-4">
      <h2 id="board-title" className="mb-4 text-base font-semibold">{t.board.title}</h2>
      <div className="space-y-4">
        {BOARD_EXAMPLES.map((b, i) => (
          <div key={b.title} className={`pin relative rounded-lg bg-paper p-3.5 pt-4 shadow-sm ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
            <span className="mb-1 inline-block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{b.tag}</span>
            <p className="text-sm font-semibold">{b.title}</p>
            <p className="text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
      <h3 className="mb-3 mt-6 text-sm font-semibold">{t.board.recommend}</h3>
      {RECOMMEND_EXAMPLES.map((r) => (
        <div key={r.title} className="rounded-xl border-2 border-dashed border-promo-border bg-promo p-3.5">
          <span className="mb-1 inline-block rounded bg-promo-border px-1.5 py-0.5 text-[10px] font-bold uppercase text-paper">{t.board.example}</span>
          <p className="text-sm font-semibold">{r.title}</p>
          <p className="text-xs text-muted-foreground">{r.text}</p>
        </div>
      ))}
    </section>
  );
}
