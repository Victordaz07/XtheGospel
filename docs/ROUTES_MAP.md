# Routes Map

Complete routing structure for the app.

## Root Routes

| Route | Description | Layout | Mode |
|-------|-------------|--------|------|
| `/` | Root redirect | - | - |
| `/home` | Unified home (stage-aware) | `UnifiedLayout` | All |
| `/lessons` | Lessons list | `UnifiedLayout` | Investigator/Member |
| `/journal` | Journal entries | `UnifiedLayout` | All |
| `/progress` | Progress view | `UnifiedLayout` | All |
| `/profile` | Profile page | `UnifiedLayout` | All |

## Leadership Routes

All leadership routes are under `/member/leadership/*` and use `LeadershipCallingsLayout`.

| Route | Description | Page Component |
|-------|-------------|----------------|
| `/member/leadership/home` | Leadership dashboard | `LeadershipDashboardPage` |
| `/member/leadership/callings` | Callings list | `LeadershipCallingsPage` |
| `/member/leadership/callings/new` | New calling form | `NewCallingPage` |
| `/member/leadership/callings/:id` | Calling detail (5 tabs) | `CallingDetailPage` |
| `/member/leadership/members` | Members list | `LeadershipMembersPage` |
| `/member/leadership/members/:id` | Member overview | `MemberOverviewPage` |
| `/member/leadership/calendar` | Calendar view | `LeadershipCalendarPage` |
| `/member/leadership/responsibilities` | Responsibilities hub | `ResponsibilitiesHubPage` |
| `/member/leadership/notes` | Notes hub | `NotesHubPage` |

## Calling Detail Tabs

The calling detail page (`/member/leadership/callings/:id`) has 5 internal tabs:

| Tab | Route | Component |
|-----|-------|-----------|
| Summary | `#summary` (default) | `CallingDetailSummaryTab` |
| Responsibilities | `#responsibilities` | `CallingDetailResponsibilitiesTab` |
| Notes | `#notes` | `CallingDetailNotesTab` |
| Agenda | `#agenda` | `CallingDetailAgendaTab` |
| Progress | `#progress` | `CallingDetailProgressTab` |

## Legacy Routes

| Route | Description | Status |
|-------|-------------|--------|
| `/legacy/auth` | Role selection | Legacy |
| `/auth` | Redirects to `/legacy/auth` | Compatibility |
| `/investigator/*` | Direct investigator access | Dev-only |
| `/new-member/*` | Direct member access | Dev-only |

## Legal Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/privacy` | Privacy policy | Public |
| `/terms` | Terms of service | Public |
| `/support` | Support page | Public |

## Mode-Aware Navigation

### Investigator Mode
BottomNav tabs:
- Inicio → `/home`
- Lecciones → `/lessons`
- Diario → `/journal`
- Progreso → `/progress`
- Perfil → `/profile`

### Member Mode
BottomNav tabs:
- Inicio → `/home`
- Estudio → `/lessons`
- Diario → `/journal`
- Progreso → `/progress`
- Perfil → `/profile`

### Leadership Mode
BottomNav tabs:
- Panel → `/member/leadership/home`
- Llamamientos → `/member/leadership/callings`
- Calendario → `/member/leadership/calendar`
- Perfil → `/profile`

## Mode Switching

Mode switching happens in `/profile`:
- **Investigador** → Navigate to `/home`
- **Miembro** → Navigate to `/home`
- **Liderazgo** → Navigate to `/member/leadership/home`

Mode is persisted in `localStorage` key: `xtg_mode_v1`

## Route Protection

- Leadership routes are accessible when mode is `leadership`
- Direct URL access works (mode is checked on mount)
- Invalid routes redirect to appropriate home based on mode

## Deep Links

All routes support direct URL access:
- `/member/leadership/callings/c1` works directly
- `/member/leadership/members/member-1` works directly
- Mode is restored from localStorage on page load
