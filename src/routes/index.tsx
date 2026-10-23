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
import type { PostDraft } from "@/components/yard/CreatePostForm";
import { DemoAuthForm, type AuthView } from "@/components/yard/DemoAuthForm";
import { Button } from "@/components/ui/button";

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
  const [section, setSection] = useState<SectionId | "all">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [draft, setDraft] = useState<PostDraft>({ section: null, title: "", body: "" });
  const openLogin = () => { setAuthView("login"); setGateOpen(true); };
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
            <Button onClick={openLogin} variant="ghost" className="btn-pop min-h-11 rounded-full bg-ink px-4 text-sm font-semibold text-paper hover:bg-ink/90 hover:text-paper">{t.nav.login}</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-6">
          <p className="font-display text-xl font-bold leading-tight sm:text-3xl">
           {t.slogan}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{t.demoNote}</p>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 pb-16 lg:grid-cols-[220px_minmax(0,1fr)_230px]">
        <aside className="order-2 min-w-0 lg:order-1 lg:sticky lg:top-20 lg:self-start"><Rating /></aside>

        <div className="order-1 min-w-0 space-y-4 lg:order-2">
          <div className="flex items-start gap-3 rounded-xl bg-ink px-4 py-3 text-sm text-paper">
            <Megaphone className="mt-0.5 size-4 shrink-0 text-secondary" />
            <p><span className="font-semibold text-secondary">{t.admin.label}:</span> {ADMIN_MESSAGE}</p>
          </div>

          <article className="relative overflow-hidden rounded-2xl border-2 border-ink bg-secondary p-5 sm:p-6">
            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-bold"><Pin className="size-3.5" />{t.topicOfDay}</span>
            <h2 className="text-lg font-semibold leading-snug sm:text-xl">{TOPIC_OF_DAY.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed">{TOPIC_OF_DAY.text}</p>
          </article>

          <Button onClick={() => setCreateOpen(true)} className="btn-pop flex h-auto min-h-14 w-full items-center justify-center gap-2 whitespace-normal rounded-2xl px-5 py-3 font-display text-base font-semibold">
            <Plus className="size-5" /> {t.createPost}
          </Button>

          <div role="group" aria-label={t.sortingLabel} className="grid grid-cols-3 gap-1 rounded-2xl border border-border bg-card p-1">
            {(["new", "popular", "discussed"] as Sort[]).map((s) => (
              <Button key={s} variant="ghost" disabled aria-describedby="sorting-demo"
                className="h-auto min-h-11 whitespace-normal rounded-xl px-2 text-xs font-semibold leading-tight sm:text-sm">
                {t.sort[s]}
              </Button>
            ))}
          </div>
          <p id="sorting-demo" className="text-xs text-muted-foreground">{t.sortingDemo}</p>

          <div className="flex flex-wrap gap-2">
            {[{ id: "all" as const, name: t.sections.all }, ...SECTIONS].map((s) => (
              <Button variant="ghost" key={s.id} onClick={() => setSection(s.id)} aria-pressed={section === s.id}
                className={`min-h-11 whitespace-normal rounded-full border px-4 text-sm font-medium transition ${section === s.id ? "border-ink bg-accent" : "border-border bg-card hover:border-ink"}`}>
                {s.name}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {posts.map((p, i) => (
              <Fragment key={p.id}>
                <PostCard post={p} onOpen={openLogin} />
                {i === 2 && <FeedAdSlot />}
              </Fragment>
            ))}
          </div>
        </div>

        <aside className="order-3 min-w-0 lg:sticky lg:top-20 lg:self-start"><Board /></aside>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">{t.footer}</footer>

      <Modal open={createOpen} onOpenChange={setCreateOpen} title={t.form.title}>
        <CreatePostForm draft={draft} onDraftChange={setDraft} onCancel={() => setCreateOpen(false)} />
      </Modal>

      <Modal open={gateOpen} onOpenChange={setGateOpen} title={authView === "login" ? t.auth.loginTitle : t.auth.registerTitle}>
        <img src={babkaImg} alt="" width={64} height={64} className="mx-auto mb-4 size-16 rounded-full border-2 border-ink object-cover" />
        <DemoAuthForm key={authView} view={authView} onViewChange={setAuthView} />
      </Modal>
    </div>
  );
}



