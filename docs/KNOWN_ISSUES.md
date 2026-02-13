# Known Issues

List of known issues with severity levels.

## TypeScript Configuration

**Severity:** Low  
**Status:** Fixed  
**Issue:** `tsconfig.json` was missing `"dom"` in `lib` array.  
**Fix:** `"dom"` added to `compilerOptions.lib`. Resolved.

## Visual Issues

**Severity:** Low  
**Status:** Fixed (Jan 2026)  
**Issue:** Some Leadership pages had minor spacing/responsive gaps.  
**Fix:** UI/UX refinement completed: Leadership theme mapped to design-system (Golden UI); all pages use tokens (spacing, typography, radius); responsive breakpoints 480px/640px; EmptyState component used consistently; layout and BottomNav padding use design tokens.

## Performance

**Severity:** Low  
**Status:** Acceptable  
**Issue:** Large localStorage exports may be slow on very old devices  
**Impact:** Export may take 1-2 seconds with large datasets  
**Fix:** Not critical - export is infrequent operation

## Browser Compatibility

**Severity:** Low  
**Status:** Tested  
**Issue:** localStorage behavior varies slightly across browsers  
**Impact:** Export/clear should work on all modern browsers  
**Fix:** Already handled with try/catch blocks

## Missing Features (Not Bugs)

**Severity:** N/A  
**Status:** By Design  
**Issue:** No backend sync, no cloud storage  
**Impact:** Data is local-only (intentional)  
**Fix:** N/A - this is a feature, not a bug

## Notes

- All issues are non-blocking for release
- TS config issue is cosmetic (doesn't affect runtime)
- No critical bugs identified
- All functionality works as expected
