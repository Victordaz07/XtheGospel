# xTheGospel MVP — Release Notes

> Version 1.0.0 — First testable release

---

## What This MVP Is

xTheGospel is a **companion app** for people exploring or growing in the gospel of Jesus Christ.

### Core Features

| Feature | Description |
|---------|-------------|
| **Topics** | Gospel lessons presented in a calm, readable format |
| **Journal** | A private space to write reflections and thoughts |
| **Journey** | A gentle view of your spiritual path (no metrics) |
| **Profile** | Settings and data control |
| **Data Export** | Download all your data as JSON |
| **Data Clear** | Reset the app completely |

### Design Philosophy

- **Pastoral, not performative** — No streaks, no scores, no "complete" buttons
- **Privacy-first** — Everything stays on your device
- **Calm UX** — Designed to feel safe, not overwhelming
- **Your pace** — No pressure, no notifications, no guilt

---

## What This MVP Is NOT

### ❌ Not Included

| Feature | Status |
|---------|--------|
| User accounts | Not implemented |
| Cloud sync | Not implemented |
| Push notifications | Not implemented |
| Social features | Not implemented |
| Analytics | **Intentionally excluded** |
| Progress tracking | **Intentionally excluded** |
| Gamification | **Intentionally excluded** |

### Why These Are Excluded

Some features are missing because we haven't built them yet.

Others are **deliberately absent** because they conflict with our values:

> *"Progress is not measured; it is accompanied."*

We don't track:
- How often you use the app
- How long you spend on a topic
- How many lessons you've "completed"
- Any behavioral patterns

These metrics would turn a spiritual companion into a surveillance tool.

---

## Privacy Statement

**In plain language:**

1. **Your data stays on your device.** We don't have servers storing your information.

2. **We don't track you.** No analytics, no usage metrics, no behavioral patterns.

3. **You own your data.** You can export it anytime as a JSON file.

4. **You can delete everything.** One button clears all local data.

5. **No accounts means no data leaks.** We can't lose what we don't have.

---

## How to Reset

If you want to start fresh:

1. Go to **Profile** (bottom navigation)
2. Scroll to **Data & Privacy**
3. Tap **Clear local data**
4. Confirm the action
5. The app returns to its initial state

**Before clearing:** Consider exporting your data first if you want to keep your journal entries.

---

## How to Export

To download your data:

1. Go to **Profile** (bottom navigation)
2. Scroll to **Data & Privacy**
3. Tap **Export my data**
4. A JSON file downloads automatically

The export includes:
- Journey dates (baptism, confirmation)
- Journal entries
- Spiritual memory (last visited topic)

The export does NOT include:
- Tracking data (doesn't exist)
- Usage metrics (doesn't exist)
- Account information (doesn't exist)

---

## Known Limitations

### Current Version

- Single-device only (no sync between devices)
- English language only (translations coming)
- Web/PWA only (native apps later)
- No offline mode (requires internet)

### By Design

- No progress percentages
- No completion badges
- No streak counters
- No social comparison

---

## Feedback Welcome

This is an MVP. We want to hear:

- What felt confusing?
- What felt trustworthy?
- What would you never use?
- What's missing that you expected?

Your feedback shapes what we build next.

---

## Technical Notes

- Built with React + TypeScript
- Data persisted in localStorage
- No backend, no database, no external services
- PWA-ready (installable on mobile)

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | MVP | First testable release |

---

> *"Everything you write here belongs to you. You can take it with you, anytime."*
