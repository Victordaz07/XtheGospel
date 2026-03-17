/**
 * Validation script for i18n namespaces.
 *
 * Validates key parity across languages for:
 * - app.{locale}.json
 * - member.{locale}.json
 *
 * Also validates missionary coverage by ensuring every supported locale
 * resolves to a non-empty dictionary (today all locales point to the same
 * Spanish source in runtime until dedicated translations are delivered).
 */

import fs from 'fs';
import path from 'path';

type JsonObject = Record<string, any>;
const LANGS = ['es', 'en', 'fr', 'pt'] as const;
type Lang = (typeof LANGS)[number];

const scriptDir =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(require.main?.filename || process.argv[1] || '.');
const projectRoot = path.resolve(scriptDir, '..');

function loadJson(relativePath: string): JsonObject {
  const filePath = path.join(projectRoot, relativePath);

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

function validateNamespace(
  namespace: 'member' | 'app',
  localePathPrefix = 'src/i18n',
  baseLang: Lang = 'es',
): boolean {
  const basePath = `${localePathPrefix}/${namespace}.${baseLang}.json`;
  const baseJson = loadJson(basePath);
  const baseKeys = collectKeys(baseJson).sort();
  let isValid = true;

  console.log(`\nNamespace: ${namespace}`);
  console.log(`Base language: ${baseLang}`);
  console.log(`Total keys: ${baseKeys.length}`);

  for (const lang of LANGS) {
    if (lang === baseLang) continue;
    try {
      const json = loadJson(`${localePathPrefix}/${namespace}.${lang}.json`);
      const keys = collectKeys(json).sort();
      const baseSet = new Set(baseKeys);
      const otherSet = new Set(keys);
      const missingInOther = baseKeys.filter((k) => !otherSet.has(k));
      const extraInOther = keys.filter((k) => !baseSet.has(k));
      compareSets(baseLang, baseKeys, lang, keys);
      if (missingInOther.length > 0 || extraInOther.length > 0) {
        isValid = false;
      }
    } catch (error) {
      isValid = false;
      console.error(`❌ Error processing ${namespace}.${lang}.json:`, error);
    }
  }

  return isValid;
}

function validateMissionaryCoverage(baseLang: Lang = 'es'): boolean {
  return validateNamespace('missionary', 'src/i18n', baseLang);
}

function main() {
  const baseLang: Lang = 'es';
  
  try {
    const memberValid = validateNamespace('member', 'src/i18n', baseLang);
    const appValid = validateNamespace('app', 'src/i18n', baseLang);
    const missionaryCovered = validateMissionaryCoverage(baseLang);
    console.log('');
    if (memberValid && appValid && missionaryCovered) {
      console.log('Validation complete! ✅');
      process.exit(0);
    }
    console.error('Validation complete with issues ❌');
    process.exit(1);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

