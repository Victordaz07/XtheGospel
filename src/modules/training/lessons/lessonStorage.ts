/**
 * Lesson storage - SSR-safe localStorage with debounce for reflections.
 * Keys: training:lesson:{lessonId}:practice | training:lesson:{lessonId}:reflections
 */

const isClient = typeof window !== 'undefined';

export function getLessonStorage<T>(key: string, fallback: T): T {
  if (!isClient) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setLessonStorage(key: string, value: unknown): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or disabled
  }
}

const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};
const debouncePending: Record<string, unknown> = {};

export function setLessonStorageDebounced(key: string, value: unknown, delayMs = 400): void {
  if (!isClient) return;
  debouncePending[key] = value;
  if (debounceTimers[key]) clearTimeout(debounceTimers[key]);
  debounceTimers[key] = setTimeout(() => {
    setLessonStorage(key, debouncePending[key]);
    delete debounceTimers[key];
    delete debouncePending[key];
  }, delayMs);
}

/** Flush pending debounced writes (e.g. on unmount) */
export function flushLessonStorageDebounced(key: string): void {
  if (!isClient) return;
  if (debounceTimers[key]) {
    clearTimeout(debounceTimers[key]);
    setLessonStorage(key, debouncePending[key]);
    delete debounceTimers[key];
    delete debouncePending[key];
  }
}
