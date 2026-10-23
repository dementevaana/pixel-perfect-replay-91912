import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import babkaImg from "@/assets/char-babka.jpg";
import { Megaphone, Pin, Plus } from "lucide-react";
import { t } from "@/lib/i18n/ru";
import { ADMIN_MESSAGE, POSTS, SECTIONS, TOPIC_OF_DAY, type SectionId } from "@/data/demo";
import { Rating } from "@/components/yard/Rating";
import { Board } from "@/components/yard/Board";
import { PostCard, FeedAdSlot } from "@/components/yard/PostCard";
import { Modal } from "@/components/yard/Modal";
import { CreatePostForm } from "@/components/yard/CreatePostForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "НаЛавке — виртуальный двор для взрослых" },
      { name: "description", content: "Выйди на минутку. Тут такое обсуждают! Истории, вопросы и разговоры по-соседски." },
      { property: "og:title", content: "НаЛавке — виртуальный двор" },
      { property: "og:description", content: "Выйди на минутку. Тут такое обсуждают!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Sort = "new" | "popular" | "discussed";

function Index() {
  const [sort, setSort] = useState<Sort>("popular");
  const [section, setSection] = useState<SectionId | "all">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const posts = section === "all" ? POSTS : POSTS.filter((p) => p.section === section);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <a href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl border-2 border-ink bg-secondary font-display text-sm font-bold">НЛ</span>
            <span className="font-display text-lg font-bold">{t.brand}</span>
          </a>
          <div className="flex items-center gap-2">
            <button onClick={() => setGateOpen(true)} className="hidden min-h-10 rounded-full px-4 text-sm font-semibold hover:bg-muted sm:block">{t.nav.login}</button>
            <button onClick={() => setGateOpen(true)} className="btn-pop min-h-10 rounded-full bg-ink px-4 text-sm font-semibold text-paper">{t.nav.join}</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-6">
        <p className="font-display text-xl font-bold leading-tight sm:text-3xl">
          Выйди на минутку. <span className="text-primary">Тут такое обсуждают!</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{t.demoNote}</p>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 pb-16 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
        <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start"><Rating /></aside>

        <div className="min-w-0 space-y-4">
          <div className="flex items-start gap-3 rounded-xl bg-ink px-4 py-3 text-sm text-paper">
            <Megaphone className="mt-0.5 size-4 shrink-0 text-secondary" />
            <p><span className="font-semibold text-secondary">{t.admin.label}:</span> {ADMIN_MESSAGE}</p>
          </div>

          <article className="relative overflow-hidden rounded-2xl border-2 border-ink bg-secondary p-5 sm:p-6">
            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-bold"><Pin className="size-3.5" />{t.topicOfDay}</span>
            <h2 className="text-lg font-semibold leading-snug sm:text-xl">{TOPIC_OF_DAY.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed">{TOPIC_OF_DAY.text}</p>
          </article>

          <button onClick={() => setCreateOpen(true)} className="btn-pop flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-display text-base font-semibold text-primary-foreground">
            <Plus className="size-5" /> {t.createPost}
          </button>

          <div role="tablist" aria-label="Сортировка" className="grid grid-cols-3 gap-1 rounded-full border-2 border-ink bg-card p-1">
            {(["new", "popular", "discussed"] as Sort[]).map((s) => (
              <button key={s} role="tab" aria-selected={sort === s} onClick={() => setSort(s)}
                className={`min-h-10 rounded-full px-2 text-xs font-semibold leading-tight transition sm:text-sm ${sort === s ? "bg-ink text-paper" : "hover:bg-muted"}`}>
                {t.sort[s]}
              </button>
            ))}
          </div>

          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ id: "all" as const, name: t.sections.all }, ...SECTIONS].map((s) => (
              <button key={s.id} onClick={() => setSection(s.id)} aria-pressed={section === s.id}
                className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition ${section === s.id ? "border-ink bg-accent" : "border-border bg-card hover:border-ink"}`}>
                {s.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {posts.map((p, i) => (
              <Fragment key={p.id}>
                <PostCard post={p} onOpen={() => setGateOpen(true)} />
                {i === 2 && <FeedAdSlot />}
              </Fragment>
            ))}
          </div>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start"><Board /></aside>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">{t.footer}</footer>

      <Modal open={createOpen} onOpenChange={setCreateOpen} title={t.form.title}>
        <CreatePostForm onCancel={() => setCreateOpen(false)} />
      </Modal>

      <Modal open={gateOpen} onOpenChange={setGateOpen} title={t.brand}>
        <div className="text-center">
          <img src={babkaImg} alt="" width={112} height={112} className="mx-auto mb-4 size-28 rounded-full border-2 border-ink object-cover" />
          <p className="font-display text-lg font-semibold leading-snug">{t.gate.text}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button className="min-h-12 rounded-full border-2 border-ink px-6 font-semibold hover:bg-muted">{t.gate.login}</button>
            <button className="btn-pop min-h-12 rounded-full bg-primary px-6 font-semibold text-primary-foreground">{t.gate.join}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}



