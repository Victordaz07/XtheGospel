# TRAINING MODULE REPORT (Member App) — Audit-Ready

## 1. Executive Summary
Training module for the Member app with:
- Core Foundations
- Priesthood Training (Aaronic → Melchizedek)
- Progressive unlock by completion
- Calling-Based teaser linking to Leaders app
- Unified routes, Zustand + persist, design tokens
- Placeholder content (no doctrine yet)

## 2. File Structure

### 2.1 Types & Data
- src/modules/training/types/training.ts  
  Types: TrainingPath, TrainingTrack, TrainingLesson, LessonStatus, UserProgressEntry, CompletedLessonsMap
- src/modules/training/data/trainingPaths.ts  
  Indexed model: paths, tracksById, lessonsById, getNodeById(), getLessonsForNode()
- src/modules/training/data/mockProgress.ts  
  Mock progress for testing

### 2.2 Business Logic
- src/modules/training/utils/unlockLogic.ts  
  Unlock rules:
  - Core always unlocked
  - Aaronic requires Core completed
  - Melchizedek requires Core + all Aaronic completed
  Functions: isPathUnlocked, isTrackUnlocked, isLessonUnlocked, getLessonStatus
- src/modules/training/store/useTrainingStore.ts  
  Zustand + persist:
  - completedLessons
  - lastVisitedNodeId
  - lastVisitedLessonId
  - markLessonCompleted
  - setLastVisited
  - getProgressForNode
  - getNextLessonToContinue

### 2.3 Components
- ProgressRing.tsx — circular progress (sm/md/lg, primary/success/secondary)
- LockedOverlay.tsx — locked overlay
- TrainingCard.tsx — path/track card with progress + state
- LessonListItem.tsx — lesson row (✓, ○, 🔒)
- index.ts — barrel

### 2.4 Pages
- TrainingDashboard.tsx — main hub + CTA + Calling-Based teaser
- TrainingPathScreen.tsx — lessons list for path/track
- LessonPlaceholderScreen.tsx — placeholder lesson screen

## 3. Data Model

### 3.1 Node IDs
Paths:
- core-foundations
- priesthood

Tracks:
- aaronic-deacon
- aaronic-teacher
- aaronic-priest
- melchizedek-elder
- melchizedek-high-priest

Note: No calling-based path/node in Member app. Calling-Based exists only as a teaser card linking to Leaders app.

### 3.2 Defined Content
Core Foundations (4 lessons):
- core-1 — La Restauración del Evangelio (tag: restoration)
- core-2 — El Plan de Salvación
- core-3 — El Sacerdocio
- core-4 — Preparación para las Ordenanzas

Priesthood tracks (2 lessons each):
- Aaronic: Deacon, Teacher, Priest
- Melchizedek: Elder, High Priest

## 4. Unlock Logic (Audit Clarification)

- stage !== 'covenanted' → The Training module is **inaccessible by design** (redirect to /home or blocked state).  
  Unlock rules are **not evaluated** unless stage === 'covenanted'.

- Path core-foundations → always unlocked (if stage === 'covenanted')
- Path priesthood → unlocked when Core is 100% completed
- Aaronic tracks → unlocked when Core is 100% completed
- Melchizedek tracks → unlocked when Core + ALL Aaronic lessons are 100% completed

**Definition of "100% completed":**  
A node is considered completed when **all lessons of that node have `percent === 100`** in `completedLessons`.

## 5. Routes & Navigation
- /training → TrainingDashboard
- /training/:nodeId → TrainingPathScreen
- /training/:nodeId/:lessonId → LessonPlaceholderScreen

Integration:
- AppRouter.tsx: /training/* + isOnUnifiedRoute includes /training
- UnifiedRoutes.tsx: pathname mapping
- UnifiedLayout.tsx: nav item "Capacitación" only if stage === 'covenanted'
- NewMemberHomePage.tsx: "Capacitación" card → /training

## 6. App Bridge (Member → Leaders)
- src/utils/appBridge.ts: openLeadersApp(opts)
- Uses VITE_APP_URL_LEADER (fallback allowed)
- Teaser Calling-Based:
  - Always visible when stage === 'covenanted'
  - Button disabled if URL not configured
  - Click → openLeadersApp({ path: '/training', target: '_blank', context: { from: 'member-training', intent: 'calling-based' } })

## 7. Persistence
- Store key: training-storage
- Data: completedLessons, lastVisitedNodeId, lastVisitedLessonId

## 8. Configuration
- VITE_APP_URL_LEADER in .env.example and vite-env.d.ts

## 9. Pending / TODOs
- Replace LessonPlaceholderScreen content with real lesson components (e.g., LessonRestoration.tsx)
- Leaders app: validate returnUrl with host whitelist to avoid open-redirect
- Design tokens: ensure CSS vars used exist (e.g., --space-4)
- **No-regression:** add minimal test for unlockLogic so Melchizedek does not unlock if 1 Aaronic lesson is incomplete

## 10. Build Status
- npm run build: OK
- No TypeScript errors

## 11. User Flow
- covenanted user sees "Capacitación" in nav + home
- Dashboard shows CTA + paths/tracks
- Core always accessible; Priesthood gated by progress
- Lessons: placeholder with "Mark completed" + "Next"
- Calling-Based teaser opens Leaders app
