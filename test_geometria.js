// Script de prueba para verificar que φ no afecta la geometría interna
console.log('=== PRUEBA DE GEOMETRÍA INVARIANTE ===');

// Función de prueba
function testGeometryInvariance() {
  const p = P();

  // Probar con diferentes valores de φ
  const phiValues = [0, 15, -10, 30];

  console.log('Probando geometría con diferentes valores de φ:');
  phiValues.forEach(phi => {
    // Simular cambio de φ
    const originalPhi = p.phi0;
    p.phi0 = phi;

    // Calcular posiciones
    const cm = calculateCenterOfMass(p);
    const phiRad = phi * Math.PI / 180;

    // Calcular posiciones globales (deberían cambiar con φ)
    const cmGlobal = localToGlobal(cm.x, cm.z, phiRad, p.mastH, p.hscale, p.vscale, 300, 200);
    const foilGlobal = localToGlobal(p.foilOffsetX, p.foilOffsetZ, phiRad, p.mastH, p.hscale, p.vscale, 300, 200);
    const tailGlobal = localToGlobal(p.foilOffsetX + p.tailOffsetX, p.foilOffsetZ + p.tailOffsetZ, phiRad, p.mastH, p.hscale, p.vscale, 300, 200);

    console.log(`φ=${phi}°:`, {
      cmLocal: {x: cm.x.toFixed(3), z: cm.z.toFixed(3)},
      cmGlobal: {x: cmGlobal.globalX.toFixed(1), y: cmGlobal.globalY.toFixed(1)},
      foilLocal: {x: p.foilOffsetX.toFixed(3), z: p.foilOffsetZ.toFixed(3)},
      foilGlobal: {x: foilGlobal.globalX.toFixed(1), y: foilGlobal.globalY.toFixed(1)},
      tailLocal: {x: (p.foilOffsetX + p.tailOffsetX).toFixed(3), z: (p.foilOffsetZ + p.tailOffsetZ).toFixed(3)},
      tailGlobal: {x: tailGlobal.globalX.toFixed(1), y: tailGlobal.globalY.toFixed(1)}
    });

    // Restaurar valor original
    p.phi0 = originalPhi;
  });

  console.log('✅ Si las coordenadas LOCALES son iguales para todos los φ, el problema está solucionado');
  console.log('✅ Si las coordenadas GLOBALES cambian con φ pero las LOCALES no, la transformación funciona correctamente');
}

setTimeout(testGeometryInvariance, 2000);
