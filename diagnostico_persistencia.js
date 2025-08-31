// Script de diagnóstico para verificar el estado de la persistencia
console.log('=== DIAGNÓSTICO DE PERSISTENCIA ===');

// Verificar localStorage
console.log('Contenido de localStorage:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}

// Verificar elementos DOM de geometría
const geometryElements = ['mastH', 'boardLen', 'foilOffsetX', 'foilOffsetZ', 'tailOffsetX', 'tailOffsetZ'];
console.log('Valores actuales de elementos DOM:');
geometryElements.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    console.log(`${id}: ${el.value}`);
  } else {
    console.log(`${id}: ELEMENTO NO ENCONTRADO`);
  }
});

// Verificar función P()
setTimeout(() => {
  try {
    const params = P();
    console.log('Parámetros de P():', params);
  } catch (e) {
    console.error('Error al ejecutar P():', e);
  }
}, 1000);
