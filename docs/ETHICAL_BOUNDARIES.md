# Ethical Boundaries — xTheGospel

> "This product could have login someday...  
> but it doesn't need it to be whole."

---

## Purpose of This Document

This document codifies the **ethical and architectural boundaries** of xTheGospel. It exists to:

1. Protect users from spiritual surveillance
2. Guide future development decisions
3. Establish clear lines that must not be crossed
4. Serve as a contract between the product and its users

**This is not a suggestion. These are non-negotiable principles.**

---

## Core Principle

```
Identity ≠ Spiritual Worth
Identity ≠ Progress
Identity ≠ Activity
Identity = Technical continuity, nothing more.
```

---

## What Data Exists Today

### 1. Journey Store (`/src/core/journey/`)
**Purpose:** Track ordinance milestones for stage derivation

| Data | Purpose | Persisted | Synced |
|------|---------|-----------|--------|
| `baptismDate` | Derive journey stage | localStorage | ❌ Never |
| `confirmationDate` | Derive journey stage | localStorage | ❌ Never |

**What this enables:** Quiet stage transitions (seeking → covenanted)  
**What this does NOT do:** Score progress, compare users, track frequency

### 2. Spiritual Memory Store (`/src/core/memory/`)
**Purpose:** Gentle continuity ("continue where you left off")

| Data | Purpose | Persisted | Synced |
|------|---------|-----------|--------|
| `lastLessonId` | Resume suggestion | localStorage | ❌ Never |
| `lastLessonTitle` | Display context | localStorage | ❌ Never |
| `lastVisitedAt` | Freshness only | localStorage | ❌ Never |
| `lastJournalEntryAt` | Presence marker | localStorage | ❌ Never |
| `lastSavedToJournalAt` | Presence marker | localStorage | ❌ Never |

**What this enables:** Pastoral "welcome back" experience  
**What this does NOT do:** Track time spent, measure engagement, analyze patterns

### 3. Identity Shell (`/src/core/identity/`) — Sprint 9
**Purpose:** Technical boundary for future auth (currently unused)

| Data | Purpose | Persisted | Synced |
|------|---------|-----------|--------|
| `userId` | Future auth UID | localStorage | ❌ Not yet |
| `createdAt` | Local timestamp | localStorage | ❌ Never |
| `consent.localPersistence` | User choice | localStorage | ❌ Never |
| `consent.futureSync` | User choice | localStorage | ❌ Never |

**What this enables:** Clean architecture for future auth  
**What this does NOT do:** Track anything, connect to journey/memory stores

---

## What Data Does NOT Exist (And Never Will)

These are **explicit prohibitions**. They are not "future features" — they are forbidden:

### ❌ Never Tracked

| Prohibited Data | Why It's Prohibited |
|-----------------|---------------------|
| **Frequency of use** | Ritualizes spirituality, enables comparison |
| **Time spent** | Gamifies engagement, not a measure of faith |
| **"Spiritual activity" scores** | Reduces faith to metrics |
| **Comparisons between users** | Toxic to spiritual growth |
| **Personal rhythms** | Dangerous ritualization |
| **Lesson completion rates** | Learning is not a race |
| **Streaks** | Manipulative behavioral psychology |
| **Points, badges, levels** | Gamification has no place here |
| **Session duration** | Presence ≠ spirituality |
| **Click patterns** | Behavioral surveillance |

### ❌ Never Stored Remotely (without explicit consent)

| Prohibited Pattern | Why |
|-------------------|-----|
| Journal content to backend | Sacred, personal, not ours |
| Prayer records | Between user and God |
| Spiritual struggles | Not our business |
| Family information | Privacy violation |
| Location data | Not relevant, invasive |

---

## Design Decisions That Prevent Spiritual Surveillance

### 1. Store Isolation
The three core stores are **architecturally isolated**:

```
/src/core/
├── journey/      → Ordinance dates, stage derivation
├── memory/       → Pastoral continuity only  
└── identity/     → Technical boundary (unused)
```

**Rule:** No cross-imports between these modules.  
**Why:** Prevents accidental coupling of identity with spiritual data.

### 2. No Analytics Layer
There is no analytics service, tracking pixel, or telemetry.  
**Rule:** If it can't be explained to the user, it doesn't exist.

### 3. Local-First by Default
All data lives in `localStorage`.  
**Rule:** Nothing leaves the device without explicit user action.

### 4. Consent Before Sync
The identity shell includes explicit consent flags.  
**Rule:** Future sync requires `consent.futureSync === true`.

### 5. No Hidden Metrics
Every piece of stored data is documented in this file.  
**Rule:** If it's not here, it shouldn't exist.

---

## Rules for Future Backend/Auth Implementation

When (if) auth is implemented, these rules apply:

### ✅ Allowed with Explicit Consent
- User account creation
- Syncing user-created content (journal, notes)
- Preference synchronization
- Device linking

### ✅ Allowed (No Consent Needed)
- Authentication tokens
- Technical error logging (anonymized)
- Aggregate, anonymized usage statistics

### ❌ Prohibited Even with Backend
- Individual usage tracking
- Spiritual "progress" dashboards
- Leader visibility into member activity
- Comparative metrics
- Engagement optimization
- A/B testing on spiritual content
- Push notifications for "engagement"
- Re-engagement campaigns

### ❌ Prohibited in UI (Even if Data Existed)
- "You've been away for X days"
- "Complete your streak"
- "You're behind other members"
- "Your spiritual activity this week"
- Any guilt-inducing messaging

---

## Architectural Boundaries

### The Three Domains

```
┌─────────────────────────────────────────────────────────────────┐
│                        xTheGospel Core                         │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   JOURNEY       │   MEMORY        │   IDENTITY                  │
│   ───────       │   ──────        │   ────────                  │
│   Ordinances    │   Continuity    │   Technical only            │
│   Stages        │   Last lesson   │   Future auth boundary      │
│   Declarations  │   Presence      │   Consent tracking          │
├─────────────────┴─────────────────┴─────────────────────────────┤
│                    ↓ NO CROSS-IMPORTS ↓                        │
│                    These domains are ISOLATED                  │
└─────────────────────────────────────────────────────────────────┘
```

### Why Isolation Matters

If journey, memory, and identity could import each other:
- Someone could correlate lesson visits with ordinance dates
- Activity patterns could be tied to user identity
- "Engagement" could become a proxy for "righteousness"

**The architecture prevents this by design.**

---

## How to Use This Document

### For Developers
1. Before adding any data persistence, check this document
2. If the data isn't listed as "allowed," it's prohibited
3. When in doubt, ask: "Would I want my bishop to see this about me?"

### For Product Decisions
1. New features must not require prohibited data
2. "Engagement metrics" is not a valid product goal
3. User trust is the only metric that matters

### For Future Maintainers
1. This document is part of the codebase, not separate from it
2. Changing these boundaries requires explicit justification
3. "It would be easy to add" is not justification

---

## The Test

A feature passes the ethical test if:

> "A user in a vulnerable spiritual moment  
> would feel **served**, not **surveilled**,  
> by this feature."

If there's any doubt, the feature fails.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Sprint 9 | Initial ethical boundaries established |

---

## Commitment

This document represents a commitment to building technology that serves spiritual growth without exploiting it. 

The gospel is not a product to optimize.  
Faith is not engagement to maximize.  
Users are souls to serve, not metrics to harvest.

**These boundaries are not limitations. They are the foundation of trust.**
