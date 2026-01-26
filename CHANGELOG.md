# Changelog

All notable changes to this project will be documented in this file.

## v1.0 Leadership Toolkit (Local-first)

### Added

#### Leadership Callings Module
- **Callings Management**
  - Create, view, and manage callings (llamamientos)
  - Status tracking: Proposed, Called, Sustained, Set Apart, Active, Released
  - Organization filtering (Bishopric, Elders Quorum, Relief Society, etc.)
  - Calling detail page with 5 tabs: Summary, Responsibilities, Notes, Agenda, Progress

- **Responsibilities**
  - Assign responsibilities to callings
  - Status tracking: Pending, In Progress, Done
  - Priority levels: Low, Medium
  - Responsibilities hub for cross-calling view

- **Notes System**
  - Three note types: Follow-up, Administrative, Pastoral
  - Notes can be attached to callings or members
  - Voice dictation support (simulated)
  - Clear privacy labeling ("🔒 Solo visible para ti")
  - Notes hub for search and filtering

- **Calendar & Events**
  - Monthly/weekly calendar view
  - Event types: Interview, Follow-up, Training, Meeting, Other
  - Conflict detection (calm, informational)
  - Organization and event type filtering

- **Member Overview**
  - View member's current and past callings
  - Service history
  - Leader notes per member
  - Member list with calling badges

#### Mode System
- **Mode Provider**
  - Three modes: Investigator, Member, Leadership
  - Mode persistence in localStorage (`xtg_mode_v1`)
  - Mode switching from Profile page
  - Automatic navigation on mode change

- **Mode-Aware Navigation**
  - BottomNav adapts to current mode
  - Investigator: Home, Lessons, Journal, Progress, Profile
  - Member: Home, Study, Journal, Progress, Profile
  - Leadership: Panel, Callings, Calendar, Profile

#### UI Components
- **PageShell**
  - Full-page wrapper with header, content, and bottom nav spacing
  - Variants: default, gradient, plain
  - Safe area support for mobile

- **Button Component**
  - Variants: primary, secondary, ghost, destructive
  - Sizes: sm, md, lg
  - Full-width option
  - Calm destructive styling (not alarming)

- **SectionTitle**
  - Standalone section header
  - Subtitle and action slot support

#### Data Management
- **Export Functionality**
  - Export all local data as JSON
  - Includes: Journey, Journal, Spiritual Memory, Leadership data
  - Filename: `xthegospel-export-YYYY-MM-DD.json`
  - Human-readable format

- **Clear Functionality**
  - Clear all local data with confirmation
  - Detailed list of what will be deleted
  - Recommendation to export first
  - Safe cleanup of all `xtg_` prefixed keys

#### Golden UI Design System
- Consistent styling across all Leadership pages
- Rounded cards, soft shadows, warm palette
- Generous spacing and padding
- Mobile-first responsive design
- No gamification, no urgency colors

### Technical Details

#### State Management
- 5 Zustand stores for Leadership data:
  - `useCallingsStore` - Callings data
  - `useResponsibilitiesStore` - Responsibilities
  - `useLeadershipNotesStore` - Notes
  - `useEventsStore` - Calendar events
  - `useObservationsStore` - Progress observations
- All stores use localStorage persistence
- Versioned keys (`_v1` suffix)

#### Routing
- Leadership routes under `/member/leadership/*`
- 9 main routes + calling detail with 5 tabs
- Mode-aware routing
- Deep link support

#### Data Keys
- All keys prefixed with `xtg_` for easy identification
- Versioned keys for future migrations
- Comprehensive export/clear coverage

### Ethics Compliance

- ✅ No surveillance or tracking
- ✅ No spiritual KPIs or metrics
- ✅ No gamification (streaks, badges, scores)
- ✅ No member ranking or comparison
- ✅ Calm, respectful language
- ✅ Clear privacy labeling
- ✅ Local-first (no backend, no cloud sync)

### Documentation

- `docs/QA_CHECKLIST.md` - Manual testing checklist
- `docs/AUDIT_HANDOFF.md` - Audit guide for Claude
- `docs/KNOWN_ISSUES.md` - Known issues list
- `docs/DATA_KEYS.md` - LocalStorage keys reference
- `docs/ROUTES_MAP.md` - Complete routes map
- `docs/SMOKE_TESTS.md` - Critical flow validation

### Files Changed

**New Files:**
- `src/features/leadershipCallings/` - Complete Leadership module
- `src/state/mode/` - Mode provider and hook
- `src/ui/components/Layout/PageShell.tsx` - Page wrapper
- `src/ui/components/Controls/Button.tsx` - Unified button
- `src/ui/components/Layout/SectionTitle.tsx` - Section header
- `src/ui/components/Navigation/BottomNav.tsx` - Mode-aware nav

**Modified Files:**
- `src/core/export/exportLocalData.ts` - Added leadership data
- `src/components/DataPrivacySection.tsx` - Added leadership status
- `src/router/AppRouter.tsx` - Added leadership routes
- `src/App.tsx` - Added ModeProvider
- `src/modules/investigator/pages/InvestigatorProfilePage.tsx` - Added mode switcher

---

## Previous Versions

See git history for earlier changes.
