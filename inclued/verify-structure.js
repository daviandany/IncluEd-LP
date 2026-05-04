#!/usr/bin/env node

/**
 * Verificador de Integridade do Projeto Refatorado
 * Execute este script para validar que tudo está em ordem
 */

const fs = require('fs');
const path = require('path');

const structure = {
  'HTML Components': [
    'src/html/components/header.html',
    'src/html/components/hero.html',
    'src/html/components/about.html',
    'src/html/components/features.html',
    'src/html/components/testimonials.html',
    'src/html/components/cta.html',
    'src/html/components/footer.html'
  ],
  'JS Components': [
    'src/js/components/navigation.js',
    'src/js/components/counter.js',
    'src/js/components/tabs.js',
    'src/js/components/slider.js',
    'src/js/components/newsletter.js'
  ],
  'JS Services': [
    'src/js/services/notification.js',
    'src/js/services/validator.js'
  ],
  'JS Utils': [
    'src/js/utils/html-loader.js'
  ],
  'JS Core': [
    'src/js/app.js',
    'src/js/base.js',
    'src/js/loader.js'
  ],
  'CSS Components': [
    'src/css/components/buttons.css',
    'src/css/components/header.css',
    'src/css/components/hero.css',
    'src/css/components/about.css',
    'src/css/components/features.css',
    'src/css/components/testimonials.css',
    'src/css/components/forms.css',
    'src/css/components/footer.css'
  ],
  'CSS Core': [
    'src/css/main.css',
    'src/css/variables.css',
    'src/css/base.css'
  ],
  'Root Files': [
    'index.html',
    '.gitignore'
  ],
  'Documentation': [
    'README.md',
    'MIGRATION.md',
    'SUMMARY.md',
    'VERIFICATION.md',
    'HTML_STRUCTURE.md',
    'STRUCTURE.md',
    'QUICKSTART.md'
  ]
};

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║   Verificador de Integridade - Projeto Refatorado   ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

let totalFiles = 0;
let foundFiles = 0;
let categories = Object.keys(structure).length;
let validCategories = 0;

for (const [category, files] of Object.entries(structure)) {
  const categoryPath = category.replace(/\s+/g, '-').toLowerCase();
  console.log(`\n📁 ${category}`);
  console.log('─'.repeat(50));
  
  let categoryValid = true;
  
  for (const file of files) {
    totalFiles++;
    const fullPath = path.join(__dirname, file);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      foundFiles++;
      const size = fs.statSync(fullPath).size;
      const sizeKB = (size / 1024).toFixed(1);
      console.log(`  ✅ ${path.basename(file).padEnd(25)} ${sizeKB.padStart(6)} KB`);
    } else {
      categoryValid = false;
      console.log(`  ❌ ${path.basename(file).padEnd(25)} FALTANDO`);
    }
  }
  
  if (categoryValid) {
    validCategories++;
  }
}

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║                    RESUMO FINAL                       ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const percentage = Math.round((foundFiles / totalFiles) * 100);
const status = percentage === 100 ? '✅ PERFEITO' : '⚠️ INCOMPLETO';

console.log(`  Total de Arquivos:      ${foundFiles}/${totalFiles}`);
console.log(`  Categorias Válidas:     ${validCategories}/${categories}`);
console.log(`  Taxa de Conclusão:      ${percentage}%`);
console.log(`  Status:                 ${status}`);

if (percentage === 100) {
  console.log('\n🎉 Refatoração 100% Completa!');
  console.log('📦 Projeto pronto para desenvolvimento.');
  console.log('🚀 Comece em: QUICKSTART.md\n');
  process.exit(0);
} else {
  console.log('\n❌ Alguns arquivos faltam.');
  console.log('📝 Verifique os arquivos marcados com FALTANDO.\n');
  process.exit(1);
}
