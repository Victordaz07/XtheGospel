import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LANGS = ['es', 'en', 'fr', 'pt'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function loadJson(relativePath) {
  const filePath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function collectKeys(obj, prefix = '') {
  const keys = [];
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

function compareSets(baseLang, baseKeys, otherLang, otherKeys) {
  const baseSet = new Set(baseKeys);
  const otherSet = new Set(otherKeys);
  const missingInOther = baseKeys.filter((k) => !otherSet.has(k));
  const extraInOther = otherKeys.filter((k) => !baseSet.has(k));

  if (missingInOther.length === 0 && extraInOther.length === 0) {
    console.log(`✅ ${otherLang} matches ${baseLang}`);
    return true;
  }

  console.log(`⚠️  Differences between ${baseLang} and ${otherLang}:`);
  if (missingInOther.length) {
    console.log(`  Missing in ${otherLang}:`);
    missingInOther.forEach((k) => console.log('   -', k));
  }
  if (extraInOther.length) {
    console.log(`  Extra in ${otherLang}:`);
    extraInOther.forEach((k) => console.log('   -', k));
  }
  return false;
}

function validateNamespace(namespace, localePathPrefix = 'src/i18n', baseLang = 'es') {
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
      const matches = compareSets(baseLang, baseKeys, lang, keys);
      if (!matches) isValid = false;
    } catch (error) {
      isValid = false;
      console.error(`❌ Error processing ${namespace}.${lang}.json:`, error.message);
    }
  }

  return isValid;
}

function validateMissionaryCoverage(baseLang = 'es') {
  return validateNamespace('missionary', 'src/i18n', baseLang);
}

function main() {
  try {
    const memberValid = validateNamespace('member');
    const appValid = validateNamespace('app');
    const missionaryCovered = validateMissionaryCoverage();
    console.log('');
    if (memberValid && appValid && missionaryCovered) {
      console.log('Validation complete! ✅');
      process.exit(0);
    }
    console.error('Validation complete with issues ❌');
    process.exit(1);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
