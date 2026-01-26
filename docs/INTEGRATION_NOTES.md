# Integration Notes — Leadership Wireframes

> **Branch:** `feat/leadership-wireframes`  
> **Source:** `UX-WIREFRAMES.md`  
> **Date:** January 2026

---

## 🎯 Objective

Implement the Leadership module for ward/stake leaders focused on **Callings management**, NOT missionary KPIs.

**Key principle:** Administrative tools that facilitate service, not spiritual surveillance.

---

## ✅ Integration Checklist

### Stage 1: Preparation ✅
- [x] Create branch `feat/leadership-wireframes`
- [x] Create `docs/INTEGRATION_NOTES.md`
- [x] Create `docs/UX-MASTER.md`
- [x] Create `docs/UX-WIREFRAMES.md`

### Stage 2: Decision
- [x] Confirmed: Build from scratch (existing `memberLeadership` code is for missionary KPIs, incompatible)
- [ ] Do NOT reuse `src/features/memberLeadership/*` — will be deprecated/removed

### Stage 3: Feature Structure
- [ ] Create `src/features/leadershipCallings/types/`
  - [ ] `calling.ts`
  - [ ] `responsibility.ts`
  - [ ] `leadershipNote.ts`
  - [ ] `callingEvent.ts`
  - [ ] `observation.ts`
- [ ] Create `src/features/leadershipCallings/data/` (mock data)
- [ ] Create `src/features/leadershipCallings/state/` (Zustand stores)
- [ ] Create `src/features/leadershipCallings/pages/` (11 pages)

### Stage 4: Routing & Navigation
- [ ] Add routes to `AppRouter.tsx`:
  - `/member/leadership/home`
  - `/member/leadership/callings`
  - `/member/leadership/callings/new`
  - `/member/leadership/callings/:id`
  - `/member/leadership/members`
  - `/member/leadership/members/:id`
  - `/member/leadership/calendar`
  - `/member/leadership/responsibilities`
  - `/member/leadership/notes`
- [ ] Update `BottomNav.tsx` for Leadership mode
- [ ] Add safe fallbacks for missing mode context

### Stage 5: Calling Detail (Core)
- [ ] `CallingDetailPage.tsx` with 5 tabs:
  - [ ] Summary tab (timeline: called → sustained → set apart → released)
  - [ ] Responsibilities tab (pending/in_progress/done — NO counters)
  - [ ] Notes tab (dictation UI placeholder)
  - [ ] Agenda tab (events linked to calling)
  - [ ] Progress tab (descriptive observations only — NO metrics)
- [ ] Release Calling modal (calm language)

### Stage 6: Calendar
- [ ] `LeadershipCalendarPage.tsx`
  - [ ] Monthly grid view
  - [ ] Weekly list view toggle
  - [ ] Filters: Organization + Kind
  - [ ] CRUD events
  - [ ] Conflict Guard modal (calm, no urgency)
  - [ ] Deep link support: `?eventId=xxx`

### Stage 7: Hubs & Member Overview
- [ ] `ResponsibilitiesHubPage.tsx` — aggregates responsibilities, NO counters
- [ ] `NotesHubPage.tsx` — aggregates notes with filters
- [ ] `MemberOverviewPage.tsx` — current/past callings + leader notes

---

## 🚫 Anti-Patterns (DO NOT IMPLEMENT)

| Prohibited | Reason |
|------------|--------|
| KPIs, metrics, percentages | Gamifies faith |
| "Risk" alerts (high/medium/low) | Surveillance language |
| Streaks, badges, points | Gamification |
| "You've been away X days" | Guilt-inducing |
| Member activity tracking | Spiritual surveillance |
| Attendance percentages | Worthiness metrics |
| Comparison between members | Toxic spirituality |
| Urgent/high priority labels | Pressure culture |

---

## 🏗️ Architecture Decisions

### Folder Structure
```
src/features/leadershipCallings/
├── types/           # TypeScript interfaces
├── data/            # Mock data for development
├── state/           # Zustand stores with localStorage
├── pages/           # Page components
├── components/      # Shared UI components
└── index.ts         # Barrel exports
```

### State Management
- **Zustand** with `persist` middleware
- **localStorage keys:**
  - `xtg_leadership_callings_v1`
  - `xtg_leadership_responsibilities_v1`
  - `xtg_leadership_notes_v1`
  - `xtg_leadership_events_v1`
  - `xtg_member_notes_v1`

### Routing Pattern
- Base: `/member/leadership/*`
- Nested routes for detail pages
- Tab navigation within `CallingDetailPage`

---

## 📋 Migration Notes

### Code to Deprecate
The following files will be deprecated (old missionary KPI system):
```
src/features/memberLeadership/
├── LeadershipKPIsScreen.tsx       # ❌ Remove
├── LeadershipAlertsScreen.tsx     # ❌ Remove
├── LeadershipDashboardScreen.tsx  # ❌ Replace
├── LeadershipActivitiesScreen.tsx # ❌ Remove
├── ... (all current files)
```

### Code to Keep
```
src/components/calendar/CalendarConflictModal.tsx  # ✅ Reuse
src/store/useRoleStore.ts                          # ✅ Extend
src/context/I18nContext.tsx                        # ✅ Keep
```

---

## 🔐 Privacy Requirements

All Leadership data is **local-first**:
- Stored in localStorage only
- Never synced to backend without explicit consent
- Leader notes are private to the leader
- Member overview shows only factual data (callings history)

---

*Last updated: Stage 1 complete*
