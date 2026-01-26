# QA Checklist - Leadership Toolkit

Manual testing checklist for Leadership Callings module.

## Mode Switching

- [ ] **Mode Switch from Profile**
  - Navigate to `/profile`
  - Switch to "Liderazgo" mode
  - Verify redirect to `/member/leadership/home`
  - Verify BottomNav shows: Panel, Llamamientos, Calendario, Perfil

- [ ] **Mode Persistence**
  - Switch to Leadership mode
  - Refresh page (F5)
  - Verify mode persists and user stays in Leadership mode

- [ ] **Mode Switch to Investigator**
  - From Leadership mode, switch to "Investigador"
  - Verify redirect to `/home`
  - Verify BottomNav shows: Inicio, Lecciones, Diario, Progreso, Perfil

## Leadership Routes

- [ ] **Dashboard (`/member/leadership/home`)**
  - Verify summary cards show correct counts
  - Verify "Nuevo llamamiento" button works
  - Verify "Ver todos los llamamientos" navigates correctly
  - Verify recent callings list is clickable

- [ ] **Callings List (`/member/leadership/callings`)**
  - Verify organization filter tabs work
  - Verify status filter dropdown works
  - Verify calling cards are clickable
  - Verify "Nuevo" button in header works

- [ ] **New Calling (`/member/leadership/callings/new`)**
  - Fill form: member, organization, position
  - Submit form
  - Verify redirect to calling detail page
  - Verify calling appears in list with "Propuesto" status

- [ ] **Calling Detail (`/member/leadership/callings/:id`)**
  - Navigate to any calling
  - Verify 5 tabs: Summary, Responsibilities, Notes, Agenda, Progress
  - Verify each tab renders without errors
  - Verify back button works

- [ ] **Members List (`/member/leadership/members`)**
  - Verify member cards show correct info
  - Verify member cards are clickable
  - Verify back button works

- [ ] **Member Overview (`/member/leadership/members/:id`)**
  - Verify current callings list
  - Verify service history
  - Verify notes section with add note form
  - Verify note type selector works

- [ ] **Calendar (`/member/leadership/calendar`)**
  - Verify month view renders
  - Verify filters work (organization, event type)
  - Verify "Add event" form works
  - Verify conflict detection modal appears when needed

- [ ] **Responsibilities Hub (`/member/leadership/responsibilities`)**
  - Verify responsibilities list with filters
  - Verify status toggle works
  - Verify back button works

- [ ] **Notes Hub (`/member/leadership/notes`)**
  - Verify notes list with search
  - Verify filters (scope, type) work
  - Verify back button works

## Callings CRUD

- [ ] **Create Calling**
  - Create new calling from dashboard
  - Verify it appears in callings list
  - Verify status is "Propuesto"

- [ ] **Update Calling Status**
  - Open calling detail → Summary tab
  - Change status (e.g., "Sustained" → "Active")
  - Verify status updates in list view

- [ ] **Add Responsibility**
  - Open calling detail → Responsibilities tab
  - Add new responsibility
  - Verify it appears in list

- [ ] **Add Note**
  - Open calling detail → Notes tab
  - Add note with dictation button (simulated)
  - Verify note appears in list
  - Verify note type is correct

- [ ] **Add Event**
  - Open calling detail → Agenda tab
  - Add event with date/time
  - Verify event appears in calendar view

- [ ] **Release Calling**
  - Open calling detail → Summary tab
  - Click "Release" button
  - Fill release form
  - Verify calling status changes to "Relevado"
  - Verify calling appears in "Relevados" filter

## Data Export & Clear

- [ ] **Export Data**
  - Navigate to `/profile` → Data & Privacy
  - Click "Export my data"
  - Verify JSON file downloads
  - Open file and verify it contains:
    - Journey data
    - Journal entries (if any)
    - Leadership data (callings, notes, etc.)

- [ ] **Clear Data**
  - Navigate to `/profile` → Data & Privacy
  - Click "Clear local data"
  - Verify confirmation modal appears
  - Verify modal shows detailed list of what will be deleted
  - Click "Yes, clear everything"
  - Verify page reloads
  - Verify all data is cleared (check localStorage)
  - Verify app returns to initial state

- [ ] **Clear Data Cancel**
  - Click "Clear local data"
  - Click "Keep my data"
  - Verify modal closes
  - Verify data is NOT cleared

## Visual Consistency

- [ ] **Golden UI Consistency**
  - Verify all Leadership pages use PageShell
  - Verify cards have consistent styling
  - Verify buttons use unified Button component
  - Verify spacing is consistent

- [ ] **BottomNav Spacing**
  - Verify content is not hidden behind BottomNav
  - Verify scroll works correctly on all pages
  - Verify safe area padding on mobile

## Error Handling

- [ ] **Invalid Route**
  - Navigate to `/member/leadership/invalid`
  - Verify redirect to `/member/leadership/home` or 404 handling

- [ ] **Missing Calling ID**
  - Navigate to `/member/leadership/callings/missing-id`
  - Verify graceful error handling (no crash)

- [ ] **Empty States**
  - Verify empty states show calm messages
  - Verify no "urgent" or alarming language
