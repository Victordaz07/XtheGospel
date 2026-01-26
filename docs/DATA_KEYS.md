# LocalStorage Keys Reference

Complete list of localStorage keys used by the app.

## Key Format

- **Prefix:** `xtg_` for app-specific keys
- **Versioning:** `_v1` suffix for versioned keys
- **Purpose:** Easy identification and cleanup

## Keys Table

| Key | Owner/Module | Data Type | Created By | Cleared By `clearAllLocalData()` | Exported By `exportLocalData()` |
|-----|--------------|-----------|------------|----------------------------------|--------------------------------|
| `xtg_leadership_callings_v1` | Leadership | Zustand persist | `useCallingsStore` | ✅ Yes | ✅ Yes |
| `xtg_leadership_responsibilities_v1` | Leadership | Zustand persist | `useResponsibilitiesStore` | ✅ Yes | ✅ Yes |
| `xtg_leadership_notes_v1` | Leadership | Zustand persist | `useLeadershipNotesStore` | ✅ Yes | ✅ Yes |
| `xtg_leadership_events_v1` | Leadership | Zustand persist | `useEventsStore` | ✅ Yes | ✅ Yes |
| `xtg_leadership_observations_v1` | Leadership | Zustand persist | `useObservationsStore` | ✅ Yes | ✅ Yes |
| `xtg_mode_v1` | Mode | String | `ModeProvider` | ✅ Yes | ✅ Yes |
| `app.currentRole` | Role | Zustand persist | `useRoleStore` | ✅ Yes | ✅ Yes |
| `journey-storage` | Journey | Zustand persist | `useJourneyStore` | ✅ Yes | ✅ Yes |
| `xtg_spiritual_memory_v1` | Spiritual Memory | JSON | `useSpiritualMemoryStore` | ✅ Yes | ✅ Yes |
| `xtg_identity_shell_v1` | Identity | JSON | Identity service | ✅ Yes | ✅ Yes |
| `@godStory` | Journal | JSON Array | Journal service | ✅ Yes | ✅ Yes |
| `@lessonNotes` | Lessons | JSON | Lesson service | ✅ Yes | ✅ Yes |
| `@investigatorCommitments` | Commitments | JSON | Commitments service | ✅ Yes | ✅ Yes |

## Key Categories

### Leadership Keys
All leadership keys are prefixed with `xtg_leadership_` and versioned with `_v1`:
- `xtg_leadership_callings_v1` - All callings data
- `xtg_leadership_responsibilities_v1` - All responsibilities
- `xtg_leadership_notes_v1` - All leadership notes
- `xtg_leadership_events_v1` - Calendar events
- `xtg_leadership_observations_v1` - Progress observations

### App State Keys
- `xtg_mode_v1` - Current app mode (investigator/member/leadership)
- `app.currentRole` - Current role (member/leader)

### User Data Keys
- `journey-storage` - Journey state (ordinance dates, etc.)
- `xtg_spiritual_memory_v1` - Spiritual continuity memory
- `@godStory` - Journal entries
- `@lessonNotes` - Lesson notes
- `@investigatorCommitments` - Investigator commitments

## Cleanup Strategy

### `getAllLocalKeys()`
Returns all keys that:
- Start with `xtg_` prefix, OR
- Are in the `USER_DATA_KEYS` constant

### `clearAllLocalData()`
Removes:
1. All keys in `USER_DATA_KEYS` constant
2. All keys returned by `getAllLocalKeys()`

This ensures comprehensive cleanup without leaving "ghost" data.

## Export Strategy

### `exportLocalData()`
Exports all keys listed in `USER_DATA_KEYS` constant, including:
- Journey data
- Journal entries
- Spiritual memory
- Leadership data (all 5 stores)
- Mode and role

Export format: JSON with structure:
```json
{
  "journey": { ... },
  "journal": [ ... ],
  "spiritualMemory": { ... },
  "leadership": {
    "callings": { ... },
    "responsibilities": { ... },
    "notes": { ... },
    "events": { ... },
    "observations": { ... },
    "mode": "leadership",
    "role": "leader"
  },
  "exportedAt": "2025-01-25T...",
  "appVersion": "1.0.0"
}
```

## Notes

- All keys are user data (no system/config keys)
- All keys are cleared by `clearAllLocalData()`
- All keys are exported by `exportLocalData()`
- Keys are versioned to allow future migrations
