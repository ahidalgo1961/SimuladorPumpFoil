// Diagnóstico actualizado con valores del usuario
const p = {
  boardLen: 1.3,
  hscale: 80,
  mastH: 0.8,
  vscale: 300,
  phi0: 3,
  show: { phiFollow: false },
  Kphi: 0.1  // valor típico
};

// Valores que reporta el usuario
const userTableX = 0;
const userTableY = -0.234;
const userTableZ = 0;

// Simular diferentes escenarios
console.log('=== DIAGNÓSTICO CON VALORES DEL USUARIO ===');
console.log('Usuario reporta: X =', userTableX, 'Y =', userTableY, 'Z =', userTableZ);

// Caso 1: Si Y = -0.234, ¿cuál sería h?
const wpx = 600, hpx = 420;
const scale = p.vscale;
const pan = {x: 0, y: 0};
const cx = wpx * 0.50 + pan.x;

// Si tableY = -0.234, entonces:
// tableY = (hpx*0.62 - yAnchor) / scale = -0.234
// yAnchor = hpx*0.62 - tableY * scale
const yAnchorFromUser = hpx*0.62 - userTableY * scale;
const hFromUser = (hpx*0.62 - yAnchorFromUser) / scale;

console.log('\nCaso 1: Si Y =', userTableY, 'entonces:');
console.log('yAnchor calculado =', yAnchorFromUser);
console.log('h calculado =', hFromUser);

// Caso 2: Verificar con h típico
const hTypical = 0.05; // valor típico
const cyTypical = (hpx * 0.62 + pan.y) - hTypical * scale;
const phi = p.phi0 * Math.PI/180;
const foilDistance = Math.min(200, p.mastH * scale);
const xAnchorTypical = cx - Math.sin(phi) * foilDistance;
const yAnchorTypical = cyTypical - Math.cos(phi) * foilDistance;

console.log('\nCaso 2: Con h típico =', hTypical);
console.log('cy =', cyTypical);
console.log('xAnchor =', xAnchorTypical, 'yAnchor =', yAnchorTypical);

// Calcular coordenadas físicas
const tableXTypical = (xAnchorTypical - wpx*0.50) / scale;
const tableYTypical = (hpx*0.62 - yAnchorTypical) / scale;

console.log('Coordenadas físicas: X =', tableXTypical.toFixed(3), 'Y =', tableYTypical.toFixed(3));

// Caso 3: Verificar si el problema está en el cálculo de Y
console.log('\nCaso 3: Verificación del cálculo de Y');
console.log('Fórmula: tableY = (hpx*0.62 - yAnchor) / scale');
console.log('hpx*0.62 =', hpx*0.62);
console.log('Si yAnchor =', yAnchorTypical, 'entonces:');
console.log('tableY = (', hpx*0.62, '-', yAnchorTypical, ') /', scale, '=', ((hpx*0.62 - yAnchorTypical) / scale).toFixed(3));
