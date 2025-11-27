const fs = require('fs');

// Leer traducciones preservadas
const preserveEs = JSON.parse(fs.readFileSync('preserve_es.json', 'utf8'));
const preserveEn = JSON.parse(fs.readFileSync('preserve_en.json', 'utf8'));

// El usuario proporcionó el JSON completo de lecciones en el mensaje
// Necesitamos parsearlo. Por ahora, vamos a crear los archivos combinados
// El usuario puede guardar sus JSONs en archivos temporales o los integraremos directamente

console.log('Listo para combinar traducciones');
console.log(`Claves preservadas ES: ${Object.keys(preserveEs).length}`);
console.log(`Claves preservadas EN: ${Object.keys(preserveEn).length}`);

// Función para combinar
function combineTranslations(preserve, newLessons) {
  const combined = { ...preserve };
  
  // Agregar todas las claves de lecciones
  Object.keys(newLessons).forEach(key => {
    if (key.startsWith('lesson')) {
      combined[key] = newLessons[key];
    }
  });
  
  return combined;
}

// Por ahora, exportar la función
module.exports = { combineTranslations, preserveEs, preserveEn };

console.log('\nPara usar:');
console.log('1. Guarda el JSON de lecciones del usuario en new_lessons_es.json y new_lessons_en.json');
console.log('2. Ejecuta: node combine_final.js');

