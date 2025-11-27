const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Asegurar que los archivos TypeScript sean procesados correctamente
config.resolver.sourceExts.push('tsx', 'ts');

module.exports = config;