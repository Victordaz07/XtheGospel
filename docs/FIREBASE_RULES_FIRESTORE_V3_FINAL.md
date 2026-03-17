# Firestore Security Rules v3 FINAL

**Única fuente de verdad para producción.** Incluye v2 harden + EPIC 3 (Chat).

⚠️ **NO publicar reglas parciales.** Usar siempre este archivo completo.

---

## Reglas Completas

Copia y pega en Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // --------------- HELPERS ---------------
    function uid() {
      return request.auth.uid;
    }
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && uid() == userId;
    }
    
    function isValidString(value, maxLength) {
      return value is string && value.size() <= maxLength;
    }
    
    function wardExists(wardId) {
      return exists(/databases/$(database)/documents/wards/$(wardId));
    }
    
    function wardDoc(wardId) {
      return get(/databases/$(database)/documents/wards/$(wardId)).data;
    }
    
    function isWardMember(wardId) {
      return isAuthenticated()
        && wardExists(wardId)
        && wardDoc(wardId).memberIds is list
        && wardDoc(wardId).memberIds.hasAny([uid()]);
    }
    
    function isWardLeader(wardId) {
      return isAuthenticated()
        && wardExists(wardId)
        && wardDoc(wardId).leaderIds is list
        && wardDoc(wardId).leaderIds.hasAny([uid()]);
    }
    
    // ---------------- CHAT (EPIC 3) ----------------
    function conversationExists(conversationId) {
      return exists(/databases/$(database)/documents/conversations/$(conversationId));
    }
    
    function isConversationParticipant(conversationId) {
      return isAuthenticated()
        && conversationExists(conversationId)
        && get(/databases/$(database)/documents/conversations/$(conversationId)).data.participantIds is list
        && get(/databases/$(database)/documents/conversations/$(conversationId)).data.participantIds.hasAny([uid()]);
    }
    
    // --------------- USERS ---------------
    match /users/{userId} {
      allow read, write: if isOwner(userId);
      
      match /leadership_callings/{callingId} {
        allow read: if isOwner(userId);
        allow create: if isOwner(userId) && 
          isValidString(request.resource.data.memberName, 200) &&
          isValidString(request.resource.data.position, 200);
        allow update: if isOwner(userId) && 
          isValidString(request.resource.data.memberName, 200) &&
          isValidString(request.resource.data.position, 200);
        allow delete: if isOwner(userId);
      }
      
      match /leadership_responsibilities/{respId} {
        allow read: if isOwner(userId);
        allow create: if isOwner(userId) &&
          isValidString(request.resource.data.title, 200) &&
          isValidString(request.resource.data.description || '', 2000);
        allow update: if isOwner(userId) &&
          isValidString(request.resource.data.title, 200) &&
          isValidString(request.resource.data.description || '', 2000);
        allow delete: if isOwner(userId);
      }
      
      match /leadership_notes/{noteId} {
        allow read: if isOwner(userId);
        allow create: if isOwner(userId) &&
          isValidString(request.resource.data.content, 10000);
        allow update: if isOwner(userId) &&
          isValidString(request.resource.data.content, 10000);
        allow delete: if isOwner(userId);
      }
      
      match /leadership_events/{eventId} {
        allow read: if isOwner(userId);
        allow create: if isOwner(userId) &&
          isValidString(request.resource.data.title, 200) &&
          isValidString(request.resource.data.description || '', 2000);
        allow update: if isOwner(userId) &&
          isValidString(request.resource.data.title, 200) &&
          isValidString(request.resource.data.description || '', 2000);
        allow delete: if isOwner(userId);
      }
      
      match /leadership_observations/{obsId} {
        allow read: if isOwner(userId);
        allow create: if isOwner(userId) &&
          isValidString(request.resource.data.content, 5000) &&
          isValidString(request.resource.data.milestone || '', 200);
        allow update: if isOwner(userId) &&
          isValidString(request.resource.data.content, 5000) &&
          isValidString(request.resource.data.milestone || '', 200);
        allow delete: if isOwner(userId);
      }
      
      // EPIC 2.2: Training/lesson progress (owner-only)
      match /trainingProgress/{docId} {
        allow read, write: if isOwner(userId);
      }
    }
    
    // --------------- WARDS ---------------
    match /wards/{wardId} {
      allow read: if isAuthenticated();
      allow create: if false;
      allow update: if isAuthenticated();
      allow delete: if false;
      
      match /baptismPreparation/{memberUid} {
        allow read, write: if isAuthenticated() && uid() == memberUid;
      }
      
      // EPIC 4: Lesson progress visible to leaders (member writes own; leader reads all)
      match /lessonProgress/{memberUid} {
        allow read: if isWardLeader(wardId) || (isOwner(memberUid) && isWardMember(wardId));
        allow write: if isOwner(memberUid) && isWardMember(wardId);
      }
    }
    
    // --------------- WARD CODES ---------------
    match /wardCodes/{codeId} {
      allow read: if isAuthenticated();
      allow create: if false;
      allow update: if isAuthenticated();
      allow delete: if false;
    }
    
    // --------------- LEADERSHIP INVITATIONS ---------------
    match /leadershipInvitations/{invitationId} {
      allow read: if isAuthenticated() && resource.data.inviteeUid == uid();
      allow create: if false;
      allow update: if isAuthenticated() && resource.data.inviteeUid == uid();
      allow delete: if false;
    }
    
    // ---------------- CHAT (EPIC 3) ----------------
    match /conversations/{conversationId} {
      allow read, update: if isConversationParticipant(conversationId);

      allow create: if isAuthenticated()
        && request.resource.data.participantIds is list
        && request.resource.data.participantIds.hasAny([uid()])
        && request.resource.data.wardId is string;

      allow delete: if false;

      match /messages/{messageId} {
        allow read: if isConversationParticipant(conversationId);

        allow create: if isConversationParticipant(conversationId)
          && request.resource.data.senderId == uid()
          && isValidString(request.resource.data.text, 2000);

        allow update, delete: if false;
      }
    }
    
    // --------------- LEGACY (zone/district leadership) ---------------
    match /personalNotes/{docId} {
      allow read, write: if isAuthenticated();
    }
    match /leaderMessages/{docId} {
      allow read, write: if isAuthenticated();
    }
    match /leadershipEvents/{docId} {
      allow read, write: if isAuthenticated();
    }
    match /zoneCouncils/{docId} {
      allow read, write: if isAuthenticated();
    }
    match /districtCouncils/{docId} {
      allow read, write: if isAuthenticated();
    }
    match /baptismalInterviews/{docId} {
      allow read, write: if isAuthenticated();
    }
    match /exchanges/{docId} {
      allow read, write: if isAuthenticated();
    }
    
    // --------------- CATCH-ALL ---------------
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Resumen de colecciones

| Colección | read | create | update | delete |
|-----------|------|--------|--------|--------|
| users | owner | owner | owner | owner |
| users/*/leadership_* | owner | owner + validación | owner + validación | owner |
| wards | auth | false | auth | false |
| wards/*/baptismPreparation/* | owner | owner | owner | owner |
| wardCodes | auth | false | auth | false |
| leadershipInvitations | invitee | false | invitee | false |
| conversations | participant | auth + uid en participantIds | participant | false |
| conversations/*/messages | participant | participant + senderId==uid | false | false |
| legacy (personalNotes, etc.) | auth | auth | auth | auth |

---

## Operación para publicar

1. Firebase Console → Firestore → Rules
2. Pegar todo el bloque de arriba
3. Publish
4. Correr W01–W04 + EPIC 3 QA (participants / non-participant)
