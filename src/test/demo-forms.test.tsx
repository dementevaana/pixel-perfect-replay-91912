import { useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CreatePostForm, type PostDraft } from "@/components/yard/CreatePostForm";
import { DemoAuthForm } from "@/components/yard/DemoAuthForm";
import { Modal } from "@/components/yard/Modal";
import { t } from "@/lib/i18n/ru";

function DraftHarness() {
  const [draft, setDraft] = useState<PostDraft>({ section: null, title: "", body: "" });
  const [open, setOpen] = useState(true);
  return <><button onClick={() => setOpen(true)}>open</button><Modal open={open} onOpenChange={setOpen} title={t.form.title}>
    <CreatePostForm draft={draft} onDraftChange={setDraft} onCancel={() => setOpen(false)} />
  </Modal></>;
}

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Demo form safety", () => {
  it("keeps entered publication content when the section changes", () => {
    render(<DraftHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Общие" }));
    fireEvent.change(screen.getByLabelText(t.form.titleLabel), { target: { value: "Моя тема" } });
    fireEvent.change(screen.getByLabelText(t.form.bodyLabel), { target: { value: "Мой текст" } });
    fireEvent.click(screen.getByRole("button", { name: "Нужен совет" }));
    expect(screen.getByLabelText(t.form.titleLabel)).toHaveValue("Моя тема");
    expect(screen.getByLabelText(t.form.bodyLabel)).toHaveValue("Мой текст");
  });
  it("keeps the draft after dismissal and reopening", () => {
    render(<DraftHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Общие" }));
    fireEvent.change(screen.getByLabelText(t.form.bodyLabel), { target: { value: "Не потерять" } });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "open" }));
    expect(screen.getByLabelText(t.form.bodyLabel)).toHaveValue("Не потерять");
  });
  it("does not insert a section hint into publication content", () => {
    render(<DraftHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Общие" }));
    expect(screen.getByLabelText(t.form.bodyLabel)).toHaveValue("");
    fireEvent.click(screen.getByRole("button", { name: "Девичьи посиделки" }));
    expect(screen.getByLabelText(t.form.bodyLabel)).toHaveValue("");
  });
  it("does not send or clear a submitted publication", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<DraftHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Общие" }));
    fireEvent.change(screen.getByLabelText(t.form.bodyLabel), { target: { value: "Черновик" } });
    fireEvent.click(screen.getByRole("button", { name: t.form.submit }));
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.getByLabelText(t.form.bodyLabel)).toHaveValue("Черновик");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
  it.each(["login", "register"] as const)("does not send credentials or create storage during %s", (view) => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    const switchView = vi.fn();
    render(<DemoAuthForm view={view} onViewChange={switchView} />);
    fireEvent.change(screen.getByLabelText(t.auth.nickname), { target: { value: "test_neighbour" } });
    fireEvent.change(screen.getByLabelText(t.auth.password), { target: { value: "demo-only-input" } });
    fireEvent.submit(screen.getByLabelText(t.auth.password).closest("form") as HTMLFormElement);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
    expect(switchView).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});