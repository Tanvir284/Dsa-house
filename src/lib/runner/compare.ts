import type { CompareMode } from './types';

/** Deterministic deep equality for JSON-serializable values. */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const ao = a as Record<string, unknown>;
    const bo = b as Record<string, unknown>;
    const ak = Object.keys(ao);
    const bk = Object.keys(bo);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (!deepEqual(ao[k], bo[k])) return false;
    return true;
  }
  return false;
}

/** Sort a JSON value in-place-safe (returns a new value) for set-sorted compares. */
function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    const sorted = value.map(sortDeep);
    sorted.sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
    return sorted;
  }
  return value;
}

export function compareValues(
  actual: unknown,
  expected: unknown,
  mode: CompareMode = 'deep',
): boolean {
  switch (mode) {
    case 'trim':
      return String(actual ?? '').trim() === String(expected ?? '').trim();
    case 'set-sorted':
      return deepEqual(sortDeep(actual), sortDeep(expected));
    case 'deep':
    default:
      return deepEqual(actual, expected);
  }
}
