# Smoke Tests

Quick validation scenarios for critical flows.

## Test 1: Leadership Flow (Basic)

**Given:** User is in Leadership mode  
**When:** User creates a new calling and adds data  
**Then:** All data persists and is accessible

### Steps:
1. Navigate to `/profile`
2. Switch mode to "Liderazgo"
3. Navigate to `/member/leadership/home`
4. Click "Nuevo llamamiento"
5. Fill form:
   - Member: Select any member
   - Organization: Select any organization
   - Position: "Test Position"
6. Submit form
7. Verify redirect to calling detail page
8. Navigate to "Responsabilities" tab
9. Add a responsibility: "Test Responsibility"
10. Navigate to "Notes" tab
11. Add a note: "Test Note"
12. Navigate to "Agenda" tab
13. Add an event: "Test Event" (today, any time)
14. Navigate back to `/member/leadership/callings`
15. Verify calling appears in list
16. Refresh page (F5)
17. Verify all data persists

### Expected Results:
- ✅ Calling created successfully
- ✅ Responsibility added
- ✅ Note added
- ✅ Event added
- ✅ Data persists after refresh
- ✅ Calling visible in list

---

## Test 2: Calendar Conflict Guard

**Given:** User is in Leadership mode  
**When:** User tries to add an event that conflicts with existing event  
**Then:** Conflict modal appears (calm, not alarming)

### Steps:
1. Navigate to `/member/leadership/calendar`
2. Add event: "First Event" (today, 10:00 AM)
3. Add event: "Second Event" (today, 10:00 AM) - same time
4. Verify conflict modal appears
5. Verify modal text is calm (not "ERROR" or red)
6. Click "Guardar de todos modos"
7. Verify both events are saved
8. Verify calendar shows both events

### Expected Results:
- ✅ Conflict modal appears
- ✅ Modal language is calm and informative
- ✅ User can proceed anyway
- ✅ Both events saved correctly
- ✅ No data loss

---

## Test 3: Export + Clear + Refresh

**Given:** User has data in the app  
**When:** User exports data, then clears it, then refreshes  
**Then:** Export file is valid, data is cleared, app resets

### Steps:
1. Create some data:
   - Add a calling
   - Add a note
   - Switch to Leadership mode
2. Navigate to `/profile` → Data & Privacy
3. Click "Export my data"
4. Verify JSON file downloads
5. Open downloaded file
6. Verify file contains:
   - `leadership.callings` (array)
   - `leadership.notes` (array)
   - `mode: "leadership"`
7. Click "Clear local data"
8. Verify confirmation modal appears
9. Verify modal shows detailed list of what will be deleted
10. Click "Yes, clear everything"
11. Verify page reloads
12. Verify localStorage is empty (check DevTools)
13. Verify app returns to initial state
14. Verify mode is reset to "investigator"
15. Verify no callings exist

### Expected Results:
- ✅ Export file downloads successfully
- ✅ Export file contains all data
- ✅ Clear confirmation modal is informative
- ✅ Clear removes all data
- ✅ App resets to initial state
- ✅ No "ghost" data remains

---

## Test Execution Notes

- Run tests in order (Test 3 should be last)
- Use browser DevTools to verify localStorage
- Check console for errors
- Verify no crashes or unhandled errors
- All tests should pass without manual intervention

## Failure Criteria

Test fails if:
- Any step crashes the app
- Data doesn't persist after refresh
- Export file is invalid or missing data
- Clear doesn't remove all data
- Conflict modal doesn't appear when expected
- Any error appears in console (except pre-existing TS warnings)
