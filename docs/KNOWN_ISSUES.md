# Known Issues

List of known issues with severity levels.

## TypeScript Configuration

**Severity:** Low  
**Status:** Pre-existing  
**Issue:** `tsconfig.json` missing `"dom"` in `lib` array  
**Impact:** TypeScript errors for `window`, `document`, `alert`, etc.  
**Runtime:** No impact - code runs correctly in browser  
**Fix:** Add `"dom"` to `tsconfig.json` compilerOptions.lib (deferred to final cleanup)

**Files Affected:**
- `src/core/export/exportLocalData.ts`
- `src/components/DataPrivacySection.tsx`
- Various other files using DOM APIs

## Visual Issues

**Severity:** Low  
**Status:** Minor  
**Issue:** Some Leadership pages may have minor spacing inconsistencies  
**Impact:** Visual polish, not functional  
**Fix:** Incremental UI refinement (not blocking)

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
