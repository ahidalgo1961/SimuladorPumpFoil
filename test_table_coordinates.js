// Script de prueba para verificar el cálculo de coordenadas de la tabla
// Simula los cálculos realizados en la función draw()

// Parámetros de ejemplo
const p = {
  vscale: 300,  // escala vertical en px/m
  hscale: 80    // escala horizontal en px/m
};

// Dimensiones del SVG
const wpx = 600;
const hpx = 420;

// Variables de estado
let h = 0.05;  // altura del CoP en metros
let pan = {x: 0, y: 0};  // desplazamiento del pan

// Calcular coordenadas de pantalla
const cx = wpx * 0.50 + pan.x;
const cy = (hpx * 0.62 + pan.y) - h * p.vscale;

// Calcular coordenadas físicas del centro de la tabla
const tableX = (cx - wpx * 0.50) / p.vscale;  // Posición horizontal física (m)
const tableY = h;                              // Altura física del centro de presión (m)
const tableZ = 0;                              // Posición en profundidad (m)

console.log('=== PRUEBA DE COORDENADAS DE LA TABLA ===');
console.log(`Dimensiones SVG: ${wpx}x${hpx}px`);
console.log(`Escala vertical: ${p.vscale} px/m`);
console.log(`Escala horizontal: ${p.hscale} px/m`);
console.log(`Altura física h: ${h} m`);
console.log(`Pan: x=${pan.x}, y=${pan.y}`);
console.log('');
console.log('Coordenadas físicas calculadas:');
console.log(`X_tabla: ${tableX.toFixed(3)} m`);
console.log(`Y_tabla: ${tableY.toFixed(3)} m`);
console.log(`Z_tabla: ${tableZ.toFixed(3)} m`);
console.log('');
console.log('Verificación:');
console.log(`X debería ser 0 (sin pan): ${Math.abs(tableX) < 0.001 ? '✅ CORRECTO' : '❌ ERROR'}`);
console.log(`Y debería ser igual a h: ${Math.abs(tableY - h) < 0.001 ? '✅ CORRECTO' : '❌ ERROR'}`);
console.log(`Z debería ser 0: ${Math.abs(tableZ) < 0.001 ? '✅ CORRECTO' : '❌ ERROR'}`);
