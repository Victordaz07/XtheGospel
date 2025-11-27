/**
 * Validation script for member i18n files
 * 
 * This script validates that all member translation files (ES, EN, FR, PT)
 * have the same keys. It compares the structure of all JSON files and reports
 * any missing or extra keys.
 * 
 * Usage:
 *   npx ts-node scripts/validate-i18n-member.ts
 *   or
 *   ts-node scripts/validate-i18n-member.ts
 * 
 * The script uses Spanish (es) as the base language and compares all others against it.
 */

import fs from 'fs';
import path from 'path';

type JsonObject = Record<string, any>;

const LANGS = ['es', 'en', 'fr', 'pt'] as const;

function loadJson(lang: string): JsonObject {
  // Resolve path relative to project root (where package.json is)
  // __dirname is available when running with ts-node
  const scriptDir = typeof __dirname !== 'undefined' 
    ? __dirname 
    : path.dirname(require.main?.filename || process.argv[1] || '.');
  const projectRoot = path.resolve(scriptDir, '..');
  const filePath = path.join(
    projectRoot,
    'src',
    'i18n',
    `member.${lang}.json`
  );
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function collectKeys(obj: JsonObject, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...collectKeys(value, full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

function compareSets(
  baseLang: string,
  baseKeys: string[],
  otherLang: string,
  otherKeys: string[]
) {
  const baseSet = new Set(baseKeys);
  const otherSet = new Set(otherKeys);

  const missingInOther = baseKeys.filter((k) => !otherSet.has(k));
  const extraInOther = otherKeys.filter((k) => !baseSet.has(k));

  if (missingInOther.length === 0 && extraInOther.length === 0) {
    console.log(`✅ ${otherLang} matches ${baseLang}`);
  } else {
    console.log(`⚠️  Differences between ${baseLang} and ${otherLang}:`);
    if (missingInOther.length) {
      console.log(`  Missing in ${otherLang}:`);
      missingInOther.forEach((k) => console.log('   -', k));
    }
    if (extraInOther.length) {
      console.log(`  Extra in ${otherLang}:`);
      extraInOther.forEach((k) => console.log('   -', k));
    }
  }
}

function main() {
  const baseLang = 'es';
  
  try {
    const baseJson = loadJson(baseLang);
    const baseKeys = collectKeys(baseJson).sort();

    console.log(`Base language: ${baseLang}`);
    console.log(`Total keys: ${baseKeys.length}`);
    console.log('');

    for (const lang of LANGS) {
      if (lang === baseLang) continue;
      try {
        const json = loadJson(lang);
        const keys = collectKeys(json).sort();
        compareSets(baseLang, baseKeys, lang, keys);
      } catch (error) {
        console.error(`❌ Error processing ${lang}:`, error);
      }
    }
    
    console.log('');
    console.log('Validation complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

