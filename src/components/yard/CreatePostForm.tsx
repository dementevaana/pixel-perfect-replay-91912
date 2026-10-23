import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SECTIONS, type SectionId } from "@/data/demo";
import { t } from "@/lib/i18n/ru";

export interface PostDraft { section: SectionId | null; title: string; body: string }

export function CreatePostForm({ onCancel, draft, onDraftChange }: { onCancel: () => void; draft: PostDraft; onDraftChange: (draft: PostDraft) => void }) {
  const { section, title, body } = draft;
  const [attempted, setAttempted] = useState(false);
  const hint = SECTIONS.find((s) => s.id === section)?.hint;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setAttempted(true); }} className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">{t.form.chooseSection}</legend>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <Button variant="ghost" type="button" key={s.id} onClick={() => onDraftChange({ ...draft, section: s.id })} aria-pressed={section === s.id}
              className={`min-h-11 whitespace-normal rounded-full border-2 px-4 text-sm font-medium transition ${section === s.id ? "border-ink bg-secondary" : "border-border bg-card hover:border-ink"}`}>
              {s.name}
            </Button>
          ))}
        </div>
      </fieldset>
      {section && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">{t.form.titleLabel}</span>
            <input value={title} onChange={(e) => onDraftChange({ ...draft, title: e.target.value })} placeholder={t.form.titlePlaceholder}
              className="h-12 w-full rounded-xl border-2 border-input bg-card px-4 text-base outline-none focus:border-ring" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">{t.form.bodyLabel}</span>
            <textarea value={body} onChange={(e) => onDraftChange({ ...draft, body: e.target.value })} placeholder={hint} rows={6}
              className="w-full resize-y rounded-xl border-2 border-input bg-card px-4 py-3 text-base leading-relaxed outline-none placeholder:text-muted-foreground focus:border-ring" />
          </label>
          <p className="text-xs text-muted-foreground">{t.form.demoNote}</p>
          {attempted && <p role="status" className="rounded-lg border border-border bg-muted p-3 text-sm">{t.form.unavailable}</p>}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="ghost" type="button" onClick={onCancel} className="min-h-11 rounded-full px-5 font-medium hover:bg-muted">{t.form.cancel}</Button>
            <Button type="submit" className="btn-pop min-h-11 whitespace-normal rounded-full px-6 font-semibold">{t.form.submit}</Button>
          </div>
        </div>
      )}
    </form>
  );
}
