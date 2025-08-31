// Script de prueba para verificar el centrado de la tabla
// Este script simula los cálculos del event listener centerTable

// Parámetros de ejemplo (similares a los valores por defecto)
const testParams = {
  phi: 30,      // grados
  mastH: 200,   // altura del mástil en píxeles
  foilDist: 150 // distancia del foil
};

// Dimensiones del SVG
const svgWidth = 600;
const svgHeight = 420;
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;

console.log('=== PRUEBA DE CENTRADO DE TABLA ===');
console.log(`Dimensiones SVG: ${svgWidth}x${svgHeight}`);
console.log(`Centro de pantalla: (${centerX}, ${centerY})`);
console.log(`Parámetros: phi=${testParams.phi}°, mastH=${testParams.mastH}px, foilDist=${testParams.foilDist}px`);

// Calcular posición del ancla de la tabla
const phiRad = testParams.phi * Math.PI / 180;
const xAnchor = testParams.foilDist * Math.cos(phiRad);
const yAnchor = testParams.mastH - testParams.foilDist * Math.sin(phiRad);

console.log(`Posición del ancla (pantalla): (${xAnchor.toFixed(2)}, ${yAnchor.toFixed(2)}) px`);

// Calcular pan necesario para centrar
const panX = centerX - xAnchor;
const panY = centerY - yAnchor;

console.log(`Pan necesario (pantalla): x=${panX.toFixed(2)}, y=${panY.toFixed(2)} px`);
console.log(`Posición final centrada (pantalla): (${centerX.toFixed(2)}, ${centerY.toFixed(2)}) px`);

// Verificar que la tabla quede dentro de los límites de la pantalla
const finalX = xAnchor + panX;
const finalY = yAnchor + panY;
console.log(`Verificación - Posición final (pantalla): (${finalX.toFixed(2)}, ${finalY.toFixed(2)}) px`);
console.log(`¿Centrada correctamente? ${Math.abs(finalX - centerX) < 0.1 && Math.abs(finalY - centerY) < 0.1 ? 'SÍ' : 'NO'}`);
