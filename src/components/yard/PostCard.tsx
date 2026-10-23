import { Flame, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { SECTIONS, type Post } from "@/data/demo";
import { t } from "@/lib/i18n/ru";

export function PostCard({ post, onOpen }: { post: Post; onOpen: () => void }) {
  const section = SECTIONS.find((s) => s.id === post.section)?.name;
  return (
    <article className="card-yard p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        {post.hot && (
          <span className="inline-flex items-center gap-1 rounded-full bg-hot px-2.5 py-1 font-bold text-hot-foreground">
            <Flame className="size-3.5" /> {t.post.hot}
          </span>
        )}
        <span className="rounded-full bg-accent px-2.5 py-1 font-medium">{section}</span>
        <span className="min-w-0 truncate font-semibold text-ink" title={post.author}>@{post.author}</span>
      </div>
      <h3 className="mb-2 break-words text-lg font-semibold leading-snug sm:text-xl">{post.title}</h3>
      <p className="break-words text-[17px] leading-relaxed text-foreground/85">{post.body}</p>
      <div className="dashed-tape my-4" />
      <footer className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5" aria-label={`${post.comments} ${t.post.comments}`}><MessageCircle className="size-4" />{post.comments}</span>
          <span className="inline-flex items-center gap-1.5" aria-label={`${post.likes} ${t.post.likes}`}><Heart className="size-4" />{post.likes}</span>
        </div>
        <button onClick={onOpen} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-ink px-4 text-sm font-semibold transition hover:bg-ink hover:text-paper">
          {t.post.open} <ArrowRight className="size-4" />
        </button>
      </footer>
    </article>
  );
}

/** Будущее рекламное место между карточками. Сейчас выключено (enabled=false). */
export function FeedAdSlot({ enabled = false }: { enabled?: boolean }) {
  if (!enabled) return null;
  return (
    <aside className="rounded-2xl border-2 border-dashed border-promo-border bg-promo p-5 text-sm">
      <span className="mb-1 inline-block rounded bg-promo-border px-2 py-0.5 text-[11px] font-bold uppercase text-paper">{t.board.adLabel}</span>
      <p>{t.board.adSlot}</p>
    </aside>
  );
}
