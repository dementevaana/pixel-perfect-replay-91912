import { useState } from "react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n/ru";

export type AuthView = "login" | "register";

export function DemoAuthForm({ view, onViewChange }: { view: AuthView; onViewChange: (view: AuthView) => void }) {
  const [attempted, setAttempted] = useState(false);
  const register = view === "register";
  const fields = [
    { name: "nickname", label: t.auth.nickname, type: "text" },
    ...(register ? [{ name: "email", label: t.auth.email, type: "email" }] : []),
    { name: "password", label: t.auth.password, type: "password" },
    ...(register ? [{ name: "confirmPassword", label: t.auth.confirmPassword, type: "password" }] : []),
  ];

  return (
    <form noValidate onSubmit={(event) => { event.preventDefault(); setAttempted(true); }} className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground">{t.auth.demoNote}</p>
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="mb-1.5 block text-sm font-semibold">{field.label}</span>
          <input name={field.name} type={field.type} autoComplete="off"
            className="h-12 w-full rounded-xl border-2 border-input bg-card px-4 text-base outline-none focus:border-ring" />
        </label>
      ))}
      {attempted && <p role="status" className="rounded-lg border border-border bg-muted p-3 text-sm">{register ? t.auth.registerUnavailable : t.auth.loginUnavailable}</p>}
      <Button type="submit" className="btn-pop min-h-12 w-full whitespace-normal rounded-full px-5 font-semibold">{register ? t.nav.join : t.nav.login}</Button>
      <div className="text-center">
        <Button type="button" variant="link" className="min-h-11" onClick={() => onViewChange(register ? "login" : "register")}>
          {register ? t.nav.login : t.nav.join}
        </Button>
      </div>
    </form>
  );
}