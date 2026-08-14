import { useState } from "react";

export type SaveFlashState = "idle" | "saving" | "saved";

/** Drives a Save button through idle → saving → saved → idle, for actions that don't
 * navigate or close anything on success (e.g. Settings' inline Save buttons) and so would
 * otherwise give no visible confirmation that anything happened. Pair with Button's
 * `primary` variant while `state === "saved"` — a brief flash to the app's own solid-accent
 * button style is the confirmation. */
export function useSaveFlash(holdMs = 1200) {
  const [state, setState] = useState<SaveFlashState>("idle");

  async function run(action: () => Promise<void>) {
    setState("saving");
    await action();
    setState("saved");
    setTimeout(() => setState("idle"), holdMs);
  }

  return { state, run };
}
