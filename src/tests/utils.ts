import { expect } from "bun:test";
import type { CombatEvent } from "@/core/types";

export function expectCombatEvent(
  event: CombatEvent | null,
  expected: Partial<Record<keyof CombatEvent, unknown>>
) {
  expect(event).not.toBeNull();
  if (!event) return;

  for (const [key, value] of Object.entries(expected)) {
    expect(event[key as keyof CombatEvent]).toBe(value as any);
  }
}
