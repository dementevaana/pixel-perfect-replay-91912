import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

export function Modal({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (v: boolean) => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-in fade-in" onClick={() => onOpenChange(false)} />
      <div role="dialog" aria-modal="true" aria-label={title}
        className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-3xl border-2 border-ink bg-paper p-5 animate-in slide-in-from-bottom sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:p-7 sm:shadow-[var(--shadow-pop)]">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button onClick={() => onOpenChange(false)} className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-muted" aria-label="Закрыть"><X className="size-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
