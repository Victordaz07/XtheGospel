# Bug Fixes - xTheGospel Leadership Toolkit

> **Fecha:** 28 de enero de 2026  
> **Sesión:** QA Testing y Bug Fixes

---

## 🐛 Bugs Arreglados

### BUG-002: Maximum Update Depth Exceeded en Tabs (CRÍTICO) ✅ ARREGLADO

**Archivos Modificados:**

- `src/features/leadershipCallings/pages/tabs/CallingDetailResponsibilitiesTab.tsx`
- `src/features/leadershipCallings/pages/tabs/CallingDetailNotesTab.tsx`
- `src/features/leadershipCallings/pages/tabs/CallingDetailAgendaTab.tsx`
- `src/features/leadershipCallings/pages/tabs/CallingDetailProgressTab.tsx`

**Problema:**
Los tabs usaban métodos del store de Zustand (`getByCallingId`, `getCallingNotes`, etc.) como selectores, lo que causaba loops infinitos de re-renders porque estos métodos llaman a `get()` internamente y devuelven nuevas referencias de arrays en cada render.

**Solución:**
Cambiar a usar selectores directos que acceden a los arrays del store y filtrar con `useMemo`:

**Antes:**

```typescript
const responsibilities = useResponsibilitiesStore(s =>
  s.getByCallingId(callingId),
);
```

**Después:**

```typescript
const allResponsibilities = useResponsibilitiesStore(s => s.responsibilities);
const responsibilities = useMemo(
  () => allResponsibilities.filter(r => r.callingId === callingId),
  [allResponsibilities, callingId],
);
```

**Resultado:** ✅ Todos los tabs funcionan correctamente sin crashes

---

### BUG-001: BottomNav no se adapta al modo Leadership ✅ ARREGLADO

**Archivo Modificado:**

- `src/layouts/LeadershipCallingsLayout.tsx`

**Problema:**
Cuando el usuario navegaba directamente a rutas de Leadership (`/member/leadership/*`), el modo no se detectaba automáticamente, por lo que el BottomNav mostraba los tabs incorrectos.

**Solución:**
Agregar detección automática del modo en el layout de Leadership:

**Código agregado:**

```typescript
import { useMode } from '../state/mode';

export default function LeadershipCallingsLayout({
  children,
}: LeadershipCallingsLayoutProps): JSX.Element {
  const { mode, setMode } = useMode();

  // Auto-detect and set mode to 'leadership' when in Leadership routes
  useEffect(() => {
    if (mode !== 'leadership') {
      setMode('leadership');
    }
  }, [mode, setMode]);

  // ... resto del componente
}
```

**Resultado:** ✅ BottomNav ahora muestra los tabs correctos (Panel, Llamamientos, Calendario, Perfil) cuando se navega a rutas de Leadership

---

## 📝 Notas Técnicas

### Lecciones Aprendidas

1. **Selectores de Zustand:**
   - ❌ NO usar métodos del store que llaman a `get()` como selectores
   - ✅ Usar selectores directos que acceden a propiedades del estado
   - ✅ Usar `useMemo` para filtrar/transformar datos derivados

2. **Detección de Modo:**
   - El modo debe detectarse automáticamente basándose en la ruta actual
   - Los layouts específicos de modo deben establecer el modo al montarse

### Patrón Recomendado para Selectores de Zustand

```typescript
// ✅ CORRECTO
const allItems = useStore(s => s.items);
const filteredItems = useMemo(
  () => allItems.filter(item => item.category === category),
  [allItems, category],
);

// ❌ INCORRECTO (causa loops infinitos)
const filteredItems = useStore(s => s.getByCategory(category));
```

---

## ✅ Verificación

### Tests Realizados:

- ✅ Tab "Resp." (Responsabilidades) - Funciona correctamente
- ✅ Tab "Notas" - Funciona correctamente
- ✅ Tab "Agenda" - Funciona correctamente
- ✅ Tab "Progreso" - Funciona correctamente
- ✅ BottomNav en modo Leadership - Muestra tabs correctos

### Próximos Pasos:

- Continuar QA testing de funcionalidades restantes
- Probar mode switching completo
- Probar export/clear data
- Ejecutar smoke tests completos

---

_Documento creado: 28 de enero de 2026_
