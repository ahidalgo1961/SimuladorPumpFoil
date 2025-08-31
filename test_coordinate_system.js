// Script de prueba para verificar el sistema de coordenadas locales
// Ejecutar en la consola del navegador para probar

function testCoordinateSystem() {
  console.log('=== PRUEBA DEL SISTEMA DE COORDENADAS LOCALES ===');

  // Parámetros de prueba
  const testParams = {
    phi0: 30, // 30 grados
    mastH: 0.8,
    hscale: 110,
    vscale: 600,
    foilOffsetX: 0.3,
    foilOffsetZ: 0.05,
    tailOffsetX: 0.6,
    tailOffsetZ: 0.02
  };

  const phi = testParams.phi0 * Math.PI / 180;
  const cx = 400, cy = 300; // Centro de la tabla

  console.log(`Parámetros: φ=${testParams.phi0}°, mastH=${testParams.mastH}m`);
  console.log(`Offsets - Foil: (${testParams.foilOffsetX}, ${testParams.foilOffsetZ})m`);
  console.log(`Offsets - Tail: (${testParams.tailOffsetX}, ${testParams.tailOffsetZ})m`);

  // Calcular posiciones usando localToGlobal
  const foilGlobal = localToGlobal(testParams.foilOffsetX, testParams.foilOffsetZ, phi, testParams.mastH, testParams.hscale, testParams.vscale, cx, cy);
  const tailGlobal = localToGlobal(
    testParams.foilOffsetX + testParams.tailOffsetX,
    testParams.foilOffsetZ + testParams.tailOffsetZ,
    phi, testParams.mastH, testParams.hscale, testParams.vscale, cx, cy
  );

  console.log(`Posición Foil Global: (${foilGlobal.x.toFixed(1)}, ${foilGlobal.y.toFixed(1)})`);
  console.log(`Posición Tail Global: (${tailGlobal.x.toFixed(1)}, ${tailGlobal.y.toFixed(1)})`);

  // Calcular distancia entre foil y tail en coordenadas globales
  const distance = Math.sqrt((foilGlobal.x - tailGlobal.x)**2 + (foilGlobal.y - tailGlobal.y)**2);
  console.log(`Distancia Foil-Tail: ${distance.toFixed(1)} px`);

  // Verificar que las posiciones sean consistentes
  const expectedFoilDistance = testParams.mastH * testParams.hscale;
  console.log(`Distancia esperada del mástil: ${expectedFoilDistance.toFixed(1)} px`);

  return {
    foil: foilGlobal,
    tail: tailGlobal,
    distance: distance
  };
}

// Ejecutar la prueba si estamos en el contexto correcto
if (typeof localToGlobal !== 'undefined') {
  testCoordinateSystem();
} else {
  console.log('Función localToGlobal no encontrada. Asegúrate de que el script principal esté cargado.');
}
