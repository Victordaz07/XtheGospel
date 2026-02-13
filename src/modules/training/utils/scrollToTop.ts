/**
 * scrollToTop - Scroll viewport to top when changing lessons
 * Supports window scroll and layout scroll containers (e.g. .unified-layout-content)
 */

export function scrollToTop(selector?: string): void {
  if (typeof window === 'undefined') return;

  if (selector) {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      el.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}
