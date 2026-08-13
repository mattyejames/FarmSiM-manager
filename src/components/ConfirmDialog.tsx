import { useState } from "react";
import type { ReactNode } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { INPUT_CLASS } from "./ui/inputStyles";

interface Props {
  title: string;
  body: ReactNode;
  confirmLabel: string;
  /** When set, the confirm button stays disabled until the user types this exact text —
   * for the one irreversible, whole-save action (delete). Omit for a plain two-button
   * confirm, proportionate to a less catastrophic action (change map). */
  confirmText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

/** Generic destructive-confirm modal, styled like the app's other modals (RotationCell,
 * SaveWizard). Used for both the "change map" and "delete save" warnings, and replaces the
 * bare browser confirm() the Map screen used to call for the same kind of decision. */
export default function ConfirmDialog({ title, body, confirmLabel, confirmText, onConfirm, onCancel }: Props) {
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const guarded = confirmText !== undefined && typed !== confirmText;

  async function handleConfirm() {
    setBusy(true);
    await onConfirm();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <Card className="w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border-faint px-[18px] py-3.5">
          <span className="text-warn">⚠</span>
          <h4 className="text-[14px] font-semibold text-text">{title}</h4>
        </div>
        <div className="px-[18px] py-3.5 text-[12.5px] leading-relaxed text-text-dim">
          {body}
          {confirmText !== undefined && (
            <div className="mt-3 flex flex-col gap-1.5">
              <label className="font-mono text-[9.5px] tracking-wide text-text-faint">
                TYPE "{confirmText}" TO CONFIRM
              </label>
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={confirmText}
                className={`${INPUT_CLASS} font-mono`}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 border-t border-border-faint px-[18px] py-3.5">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={handleConfirm} disabled={guarded || busy}>
            {busy ? "…" : confirmLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
}
