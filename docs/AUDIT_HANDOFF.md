# Audit Handoff for Claude

This document guides Claude's audit of the Leadership Toolkit implementation.

## Audit Scope

Review the Leadership Callings module for:
- Ethics compliance (no surveillance, no scoring)
- Data safety (localStorage only, export/clear)
- UX tone (calm, respectful)
- Navigation integrity
- Code quality

## A) Ethics Compliance

### What to Check

**NO Surveillance:**
- ❌ No "risk alerts" or "member activity tracking"
- ❌ No "worthiness scoring" or "spiritual KPIs"
- ❌ No member ranking or comparison
- ✅ Only administrative notes (follow-up, administrative, pastoral)
- ✅ Notes are clearly labeled as private

**NO Gamification:**
- ❌ No streaks, badges, levels, XP
- ❌ No progress bars or percentages for "spiritual progress"
- ❌ No artificial celebrations
- ✅ Only descriptive progress (observations, milestones)

**Files to Review:**
- `src/features/leadershipCallings/pages/LeadershipDashboardPage.tsx`
- `src/features/leadershipCallings/pages/MemberOverviewPage.tsx`
- `src/features/leadershipCallings/pages/tabs/CallingDetailProgressTab.tsx`
- `src/features/leadershipCallings/types/observation.ts`

**Red Flags:**
- Any mention of "metrics", "KPIs", "scores", "rankings"
- Progress bars or percentages
- "Alert" language that implies urgency or judgment

## B) Data Safety

### What to Check

**LocalStorage Only:**
- ✅ All data stored in localStorage (no backend calls)
- ✅ Keys prefixed with `xtg_` for easy identification
- ✅ Versioned keys (`_v1` suffix)

**Export Functionality:**
- ✅ `exportLocalData()` includes ALL user data
- ✅ Export includes leadership data (callings, notes, events, etc.)
- ✅ Export file is JSON, downloadable, human-readable

**Clear Functionality:**
- ✅ `clearAllLocalData()` removes ALL `xtg_` prefixed keys
- ✅ Clear confirmation modal is calm (not alarming)
- ✅ Clear recommends export first

**Files to Review:**
- `src/core/export/exportLocalData.ts`
- `src/components/DataPrivacySection.tsx`
- `src/features/leadershipCallings/state/*.ts` (all stores)

**Red Flags:**
- Any `fetch()` or `axios` calls to external APIs
- Data sent to analytics or tracking services
- Missing keys in export/clear functions

## C) UX Tone

### What to Check

**Calm Language:**
- ✅ No "urgent" or "critical" alerts
- ✅ Soft reminders use gentle language ("No urgente — solo un recordatorio amable")
- ✅ Conflict detection is informational, not alarming
- ✅ Buttons use respectful labels

**Non-Prescriptive:**
- ✅ No pressure language ("You must...", "You should...")
- ✅ Suggestions, not commands
- ✅ Clear privacy labeling ("🔒 Solo visible para ti")

**Files to Review:**
- All files in `src/features/leadershipCallings/pages/`
- `src/components/DataPrivacySection.tsx`

**Red Flags:**
- Red error colors for non-critical issues
- "Warning" or "Alert" language
- Pressure language or commands

## D) Navigation Integrity

### What to Check

**Routes:**
- ✅ All routes defined in `AppRouter.tsx`
- ✅ Leadership routes under `/member/leadership/*`
- ✅ Mode switching navigates correctly
- ✅ Deep links work (direct URL access)

**Mode Persistence:**
- ✅ Mode stored in localStorage (`xtg_mode_v1`)
- ✅ Mode persists across page refreshes
- ✅ BottomNav adapts to current mode

**Files to Review:**
- `src/router/AppRouter.tsx`
- `src/router/LeadershipCallingsRoutes.tsx`
- `src/state/mode/ModeProvider.tsx`
- `src/ui/components/Navigation/BottomNav.tsx`

**Red Flags:**
- 404 errors on valid routes
- Mode switching doesn't navigate
- BottomNav shows wrong tabs for mode

## E) Code Quality Hotspots

### Stores (Zustand)

**Files:**
- `src/features/leadershipCallings/state/useCallingsStore.ts`
- `src/features/leadershipCallings/state/useResponsibilitiesStore.ts`
- `src/features/leadershipCallings/state/useLeadershipNotesStore.ts`
- `src/features/leadershipCallings/state/useEventsStore.ts`
- `src/features/leadershipCallings/state/useObservationsStore.ts`

**Check:**
- ✅ Unique localStorage keys (no conflicts)
- ✅ Safe error handling (try/catch)
- ✅ Default state initialization
- ✅ Type safety (TypeScript)

### Export/Clear Logic

**File:**
- `src/core/export/exportLocalData.ts`

**Check:**
- ✅ All keys included in export
- ✅ All keys included in clear
- ✅ Safe JSON parsing (try/catch)
- ✅ No data loss on export

### Routing

**Files:**
- `src/router/AppRouter.tsx`
- `src/router/LeadershipCallingsRoutes.tsx`

**Check:**
- ✅ No route conflicts
- ✅ Proper layout wrapping
- ✅ Safe fallbacks for missing routes

## Audit Checklist

- [ ] Review all Leadership pages for ethics compliance
- [ ] Verify no surveillance/metrics language
- [ ] Verify export includes all data
- [ ] Verify clear removes all data
- [ ] Verify UX tone is calm and respectful
- [ ] Verify all routes work correctly
- [ ] Verify mode switching works
- [ ] Verify stores have unique keys
- [ ] Verify error handling is safe
- [ ] Verify TypeScript types are correct

## Known Issues

See `KNOWN_ISSUES.md` for pre-existing issues (TS config, etc.).
