// Definiciones técnicas de variables físicas
// Incluye unidades, convenciones de medida y descripciones rigurosas
const PHYSICAL_DEFINITIONS = {
  // === INPUTS (Sliders) ===
  v0: {
    name: "Velocidad base V₀",
    unit: "m/s",
    description: "Velocidad media de la corriente relativa. V(t) = V₀ + A_V·sin(2πft)",
    range: "2.0 - 6.0 m/s"
  },
  phi: {
    name: "Ángulo de pitch base φ",
    unit: "°",
    description: "Ángulo de inclinación base de la tabla. Positivo cuando la proa está arriba (sentido antihorario desde eje horizontal). Convención aerodinámica estándar.",
    range: "-10° - +15°"
  },
  theta0: {
    name: "Ángulo de ataque base θ₀",
    unit: "°",
    description: "Ángulo base de la cuerda del ala. Positivo cuando el borde de ataque está arriba (sentido antihorario desde eje horizontal). Convención aerodinámica estándar.",
    range: "-5° - +12°"
  },
  gamma0: {
    name: "Ángulo de flujo base γ₀",
    unit: "°",
    description: "Ángulo base de la velocidad relativa del flujo. Positivo cuando el flujo viene desde arriba (sentido antihorario desde eje horizontal).",
    range: "-15° - +10°"
  },
  S: {
    name: "Superficie alar S",
    unit: "m²",
    description: "Área proyectada del ala del foil. Superficie efectiva para generar sustentación.",
    range: "0.08 - 0.22 m²"
  },
  tailArea: {
    name: "Área de la cola S_tail",
    unit: "m²",
    description: "Área proyectada de la cola del foil. Afecta la estabilidad y control.",
    range: "0.01 - 0.05 m²"
  },
  tailLength: {
    name: "Longitud de la cola L_tail",
    unit: "m",
    description: "Distancia desde el centro del foil hasta el centro de la cola.",
    range: "0.3 - 1.0 m"
  },
  tailIncidence: {
    name: "Incidencia de la cola i_tail",
    unit: "°",
    description: "Ángulo de incidencia de la cola respecto al ala principal. Positivo aumenta estabilidad.",
    range: "-5° - +5°"
  },
  rho: {
    name: "Densidad del agua ρ",
    unit: "kg/m³",
    description: "Densidad del fluido (agua). Afecta la sustentación y resistencia hidrodinámica.",
    range: "950 - 1030 kg/m³"
  },
  mass: {
    name: "Masa del rider",
    unit: "kg",
    description: "Masa del rider (sin equipo). La masa total del sistema se calcula automáticamente como rider + tabla + foil + cola.",
    range: "50 - 100 kg"
  },
  boardMass: {
    name: "Masa Tabla (T)",
    unit: "kg",
    description: "Masa de la tabla de windfoil. Afecta el centro de masas y estabilidad.",
    range: "3 - 8 kg"
  },
  foilMass: {
    name: "Masa Foil (F)",
    unit: "kg",
    description: "Masa del foil principal. Afecta el centro de masas y respuesta dinámica.",
    range: "1 - 3 kg"
  },
  tailMass: {
    name: "Masa Cola (C)",
    unit: "kg",
    description: "Masa de la cola del foil. Afecta el centro de masas y estabilidad direccional.",
    range: "0.2 - 0.8 kg"
  },
  LD: {
    name: "Relación L/D",
    unit: "adimensional",
    description: "Relación entre sustentación y resistencia. Mayor valor indica mejor eficiencia aerodinámica.",
    range: "4 - 12"
  },
  clslope: {
    name: "Pendiente dCL/dα",
    unit: "1/°",
    description: "Derivada del coeficiente de sustentación respecto al ángulo de ataque. Medida en grados.",
    range: "0.04 - 0.14 °⁻¹"
  },
  clmax: {
    name: "CL máximo",
    unit: "adimensional",
    description: "Coeficiente de sustentación máximo antes de entrada en pérdida.",
    range: "0.7 - 1.5"
  },
  stall: {
    name: "Ángulo de pérdida α*",
    unit: "°",
    description: "Ángulo de ataque donde comienza la pérdida aerodinámica. Positivo según convención estándar.",
    range: "6° - 16°"
  },
  freq: {
    name: "Frecuencia de bombeo f",
    unit: "Hz",
    description: "Frecuencia de oscilación del sistema. Tc = 1/f es el período del ciclo.",
    range: "0.6 - 2.5 Hz"
  },
  ampV: {
    name: "Amplitud de velocidad A_V",
    unit: "m/s",
    description: "Amplitud de variación de la velocidad: V(t) = V₀ + A_V·sin(2πft)",
    range: "0 - 1.2 m/s"
  },
  ampT: {
    name: "Amplitud de θ A_θ",
    unit: "°",
    description: "Amplitud de variación del ángulo de ataque: θ(t) = θ₀ + A_θ·sin(2πft + φ_θ)",
    range: "0° - 4°"
  },
  ampG: {
    name: "Amplitud de γ A_γ",
    unit: "°",
    description: "Amplitud de variación del ángulo de flujo: γ(t) = γ₀ + A_γ·sin(2πft + φ_γ)",
    range: "0° - 5°"
  },
  phaseT: {
    name: "Fase de θ φ_θ",
    unit: "°",
    description: "Desfase de fase para θ(t). Ángulo en grados para el seno.",
    range: "0° - 180°"
  },
  phaseG: {
    name: "Fase de γ φ_γ",
    unit: "°",
    description: "Desfase de fase para γ(t). Ángulo en grados para el seno.",
    range: "0° - 180°"
  },
  dtStep: {
    name: "Paso de integración Δt",
    unit: "s",
    description: "Paso de tiempo para el integrador numérico. Afecta precisión y velocidad de simulación.",
    range: "0.001 - 0.02 s"
  },
  lambda: {
    name: "Reparto estático λ",
    unit: "adimensional",
    description: "Fracción de peso apoyada en el pie delantero. λ = F_delantero / Peso_total",
    range: "0.3 - 0.7"
  },
  dstance: {
    name: "Distancia entre pies d",
    unit: "m",
    description: "Distancia horizontal entre los puntos de apoyo de los pies.",
    range: "0.4 - 0.9 m"
  },
  Af: {
    name: "Amplitud delantera A_f",
    unit: "N",
    description: "Amplitud de fuerza adicional en el pie delantero. F_delantero(t) = λ·mg + A_f·sin(2πft + φ_f)",
    range: "0 - 600 N"
  },
  Ab: {
    name: "Amplitud trasera A_b",
    unit: "N",
    description: "Amplitud de fuerza adicional en el pie trasero. F_trasero(t) = (1-λ)·mg + A_b·sin(2πft + φ_b)",
    range: "0 - 600 N"
  },
  phaseF: {
    name: "Fase delantera φ_f",
    unit: "°",
    description: "Fase para la fuerza del pie delantero.",
    range: "0° - 180°"
  },
  phaseB: {
    name: "Fase trasera φ_b",
    unit: "°",
    description: "Fase para la fuerza del pie trasero.",
    range: "0° - 180°"
  },
  Gtheta: {
    name: "Ganancia θ G_θ",
    unit: "°/(N·m)",
    description: "Ganancia del ángulo de ataque respecto al momento del rider: θ_eff = θ₀ - G_θ·M_rider",
    range: "0 - 0.03 °/(N·m)"
  },
  Kphi: {
    name: "Ganancia φ K_φ",
    unit: "°/(N·m)",
    description: "Ganancia del ángulo φ respecto al momento del rider: φ_eff = φ₀ - K_φ·M_rider",
    range: "0 - 0.15 °/(N·m)"
  },
  h0: {
    name: "Altura inicial h₀",
    unit: "m",
    description: "Altura inicial del centro de presión. Negativo = bajo el agua. Positivo = sobre el agua.",
    range: "-0.8 - +0.2 m"
  },
  cw: {
    name: "Amortiguamiento vertical c_w",
    unit: "N·s/m",
    description: "Coeficiente de amortiguamiento vertical. F_amort = -c_w·v_vertical",
    range: "0 - 400 N·s/m"
  },
  vscale: {
    name: "Escala vertical",
    unit: "px/m",
    description: "Factor de escala para la dimensión vertical en el diagrama (píxeles por metro).",
    range: "200 - 4000 px/m"
  },
  hscale: {
    name: "Escala horizontal",
    unit: "px/m",
    description: "Factor de escala para longitudes horizontales en el diagrama (píxeles por metro).",
    range: "60 - 480 px/m"
  },
  velscale: {
    name: "Escala velocidad",
    unit: "adimensional",
    description: "Factor de escala para los vectores de velocidad en el diagrama.",
    range: "0.1 - 12.0"
  },
  fuerzascale: {
    name: "Escala fuerzas",
    unit: "adimensional",
    description: "Factor de escala para los vectores de fuerza en el diagrama.",
    range: "0.1 - 12.0"
  },
  boardVolL: {
    name: "Volumen tabla",
    unit: "L",
    description: "Volumen de la tabla para cálculo de empuje de Arquímedes.",
    range: "40 - 140 L"
  },
  boardArea: {
    name: "Superficie tabla",
    unit: "m²",
    description: "Área de la superficie mojada de la tabla para cálculo de empuje de Arquímedes.",
    range: "0.40 - 1.20 m²"
  },
  mastH: {
    name: "Altura mástil",
    unit: "m",
    description: "Altura desde la tabla hasta el foil.",
    range: "0.60 - 1.20 m"
  },
  boardLen: {
    name: "Longitud tabla",
    unit: "m",
    description: "Longitud total de la tabla para representación gráfica.",
    range: "1.10 - 1.90 m"
  },
  foilOffsetX: {
    name: "Offset horizontal del foil",
    unit: "m",
    description: "Distancia horizontal desde el centro de la tabla hasta el centro del foil.",
    range: "0.20 - 0.50 m"
  },
  foilOffsetZ: {
    name: "Offset vertical del foil",
    unit: "m",
    description: "Altura del centro del foil sobre la tabla.",
    range: "0.02 - 0.10 m"
  },
  tailOffsetX: {
    name: "Offset horizontal de la cola",
    unit: "m",
    description: "Distancia horizontal desde el foil hasta el centro de la cola.",
    range: "0.40 - 0.80 m"
  },
  tailOffsetZ: {
    name: "Offset vertical de la cola",
    unit: "m",
    description: "Altura relativa del centro de la cola respecto al foil.",
    range: "0.00 - 0.05 m"
  },
  foilChord: {
    name: "Cuerda del foil",
    unit: "m",
    description: "Longitud de la cuerda del perfil del foil.",
    range: "0.15 - 0.35 m"
  },
  tailChord: {
    name: "Cuerda de la cola",
    unit: "m",
    description: "Longitud de la cuerda del perfil de la cola.",
    range: "0.10 - 0.20 m"
  },

  // === OUTPUTS (KPIs) ===
  alphaOut: {
    name: "Ángulo de ataque α",
    unit: "°",
    description: "Ángulo entre la cuerda del ala y la velocidad relativa del flujo. Positivo cuando el borde de ataque está arriba (convención aerodinámica estándar). α = θ_eff - γ"
  },
  thetaEffOut: {
    name: "Ángulo efectivo θ_eff",
    unit: "°",
    description: "Ángulo efectivo de la cuerda considerando el efecto del rider. θ_eff = θ₀ - G_θ·M_rider"
  },
  LOut: {
    name: "Sustentación L",
    unit: "N",
    description: "Componente de sustentación hidrodinámica. L = ½·ρ·V²·S·CL"
  },
  LvOut: {
    name: "Sustentación vertical L_v",
    unit: "N",
    description: "Componente vertical de la sustentación. L_v = L·cos(γ)"
  },
  FrOut: {
    name: "Fuerza rider vertical",
    unit: "N",
    description: "Fuerza vertical total ejercida por el rider (pies delantero + trasero)."
  },
  DOut: {
    name: "Resistencia D",
    unit: "N",
    description: "Componente de resistencia hidrodinámica. D = L / (L/D)"
  },
  ThOut: {
    name: "Empuje horizontal",
    unit: "N",
    description: "Componente horizontal de la fuerza hidrodinámica. Th = L_x + D_x"
  },
  SupOut: {
    name: "Porcentaje de soporte",
    unit: "%",
    description: "Porcentaje de soporte hidrodinámico: Sup = (L_v + F_Arquímedes) / mg × 100%"
  },
  MrOut: {
    name: "Momento rider M_rider",
    unit: "N·m",
    description: "Momento ejercido por el rider alrededor del centro de presión. M_rider = (F_trasero - F_delantero) × d/2"
  },
  hOut: {
    name: "Altura CoP h",
    unit: "m",
    description: "Altura del centro de presión relativa a la superficie del agua."
  },
  VTableOut: {
    name: "Velocidad tabla V_tabla",
    unit: "m/s",
    description: "Velocidad total de la tabla: V_tabla = √(u² + w²)"
  },
  BOut: {
    name: "Empuje Arquímedes",
    unit: "N",
    description: "Fuerza de empuje hidrostático: F_Arquímedes = ρ·g·V_submergido"
  },
  draftOut: {
    name: "Calado tabla",
    unit: "m",
    description: "Profundidad de inmersión de la tabla en el agua."
  },

  // === VARIABLES INTERMEDIAS ===
  gamma: {
    name: "Ángulo de velocidad γ",
    unit: "°",
    description: "Ángulo de la velocidad relativa del flujo. γ = atan2(w, u). Positivo en sentido antihorario."
  },
  V: {
    name: "Velocidad relativa V",
    unit: "m/s",
    description: "Magnitud de la velocidad relativa del flujo sobre el ala. V = √(u² + w²)"
  },
  CL: {
    name: "Coeficiente de sustentación CL",
    unit: "adimensional",
    description: "Coeficiente de sustentación: CL = CL_slope × α (para α < α_stall)"
  },
  Lx: {
    name: "Sustentación horizontal L_x",
    unit: "N",
    description: "Componente horizontal de la sustentación: L_x = -L·sin(γ)"
  },
  Ly: {
    name: "Sustentación vertical L_y",
    unit: "N",
    description: "Componente vertical de la sustentación: L_y = L·cos(γ)"
  },
  Dx: {
    name: "Resistencia horizontal D_x",
    unit: "N",
    description: "Componente horizontal de la resistencia: D_x = -D·cos(γ)"
  },
  Dy: {
    name: "Resistencia vertical D_y",
    unit: "N",
    description: "Componente vertical de la resistencia: D_y = -D·sin(γ)"
  },
  Vert: {
    name: "Fuerza vertical total",
    unit: "N",
    description: "Fuerza vertical hidrodinámica: Vert = L_y + D_y"
  },
  Ff: {
    name: "Fuerza pie delantero",
    unit: "N",
    description: "Fuerza ejercida por el pie delantero: F_f = λ·mg + A_f·sin(2πft + φ_f)"
  },
  Fb: {
    name: "Fuerza pie trasero",
    unit: "N",
    description: "Fuerza ejercida por el pie trasero: F_b = (1-λ)·mg + A_b·sin(2πft + φ_b)"
  },
  Mr: {
    name: "Momento rider",
    unit: "N·m",
    description: "Momento del rider: M_r = (F_b - F_f) × d/2"
  },
  Fb_buoy: {
    name: "Empuje Arquímedes",
    unit: "N",
    description: "Fuerza de flotación: F_b = ρ·g·V_submergido"
  },
  draft: {
    name: "Calado",
    unit: "m",
    description: "Profundidad de inmersión del cuerpo en el fluido."
  },
  tableX: {
    name: "Posición X tabla",
    unit: "m",
    description: "Coordenada X del centro geométrico de la tabla en el sistema de referencia global."
  },
  tableY: {
    name: "Posición Y tabla",
    unit: "m",
    description: "Coordenada Y (altura) del centro geométrico de la tabla en el sistema de referencia global."
  },
  tableZ: {
    name: "Posición Z tabla",
    unit: "m",
    description: "Coordenada Z del centro geométrico de la tabla en el sistema de referencia global."
  }
};

const sliders = ["v0","phi","theta0","gamma0","S","tailArea","tailLength","tailIncidence","rho","mass","boardMass","foilMass","tailMass","LD","clslope","clmax","stall",
 "freq","ampV","ampT","ampG","phaseT","phaseG","dtStep",
 "lambda","dstance","Af","Ab","phaseF","phaseB","Gtheta","Kphi","h0","cw","vscale","velscale","fuerzascale","hscale",
 "boardVolL","boardArea","mastH","boardLen",
 "foilOffsetX","foilOffsetZ","tailOffsetX","tailOffsetZ","foilChord","tailChord"];

// Event listener global para debugging de mousemove
document.addEventListener('mousemove', (event) => {
  // console.log('🌍 MOUSE MOVE GLOBAL:', {
  //   target: event.target.tagName + (event.target.id ? '#' + event.target.id : ''),
  //   clientX: event.clientX,
  //   clientY: event.clientY,
  //   overSVG: event.target.tagName === 'svg' || event.target.closest('svg') !== null
  // });
  
  // Investigar elementos en la posición del mouse
  const elementsAtPoint = document.elementsFromPoint(event.clientX, event.clientY);
  // console.log('📋 ELEMENTOS EN POSICIÓN MOUSE:', elementsAtPoint.map(el => 
  //   el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className : '')
  // ));
  
  // Buscar SVG específicamente
  const svgAtPoint = elementsAtPoint.find(el => el.tagName === 'svg' || el.tagName === 'SVG');
  // if (svgAtPoint) {
  //   console.log('🎯 SVG ENCONTRADO EN POSICIÓN:', svgAtPoint.id || 'sin ID');
  // } else {
  //   console.log('❌ NO HAY SVG EN POSICIÓN DEL MOUSE');
  // }
}, true); // Usar capture phase

let t=0, T=1, playing=null;
let h=0, wv=0;        // heave (m, +arriba) y velocidad vertical
let pan={x:0,y:0};

// Variables para medición de distancias
let measurementPoints = [];
let measurementLine = null;
let measurementText = null;
let measurementTextBg = null;
let measurementMarkers = [];
let measurementTimeout = null;
let markerTimeout = null;
let measurementInstructionsShown = false;
let mouseTrackingActive = false;
let mouseDistanceText = null;
let mouseDistanceTextBg = null;

// Histórico (últimos 100 ciclos: medias por ciclo)
let cyc_acc = {na:0, a:0, th:0, L:0, Th:0, Fr:0};
const MAXC=100;
const histAngles={alpha:[], theta:[]};
const histForces={L:[], Th:[], Fr:[]};

// Funciones auxiliares
const $ = id => document.getElementById(id);
function S(id){ 
  const el=$(id); 
  if(!el) {
    console.warn('#' + id + ' no encontrado, creando elemento dummy');
    // Return a dummy element with basic properties
    return { 
      textContent: '', 
      value: '0', 
      checked: false,
      addEventListener: () => {},
      removeEventListener: () => {}
    };
  }
  return el; 
}
function getValue(id, defaultValue = 0) { 
  const el = $(id); 
  return el ? +el.value : defaultValue; 
}
function getChecked(id, defaultValue = false) {
  const KEY='wf_persist_v23h7';
  try {
    const obj = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (obj[id] !== undefined) {
      return obj[id];
    }
  } catch(e) {
    console.error('Error leyendo checkbox desde localStorage:', e);
  }

  // Si no hay valor en localStorage, usar el estado actual del DOM o el valor por defecto
  const el = $(id);
  return el ? el.checked : defaultValue;
}

// Función para verificar persistencia completa de checkboxes
function verifyCheckboxPersistence() {
  console.log('=== VERIFICACIÓN DE PERSISTENCIA DE CHECKBOXES ===');
  const KEY = 'wf_persist_v23h7';
  const checkboxes = [
    "showHorizon", "showFeet", "showArc", "showLabels", "showPhiAngle", "phiFollow",
    "showFlow", "showChord", "showLD", "showTableVel", "showAxesW", "showAxesB", "showAxesF",
    "showWeight", "showComponentWeights", "showBuoy", "showResultants", "showTail", "showGeometry"
  ];

  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || '{}');
    console.log('Valores almacenados en localStorage:', stored);

    const p = P();
    console.log('Valores en objeto P():', p.show);

    let allMatch = true;
    checkboxes.forEach(id => {
      const el = S(id);
      const domValue = el ? el.checked : 'NOT FOUND';
      const storedValue = stored[id];
      const pValue = p.show[id.replace('show', '').toLowerCase()] !== undefined ?
        p.show[id.replace('show', '').toLowerCase()] : p.show[id];

      console.log(`${id}: DOM=${domValue}, Stored=${storedValue}, P()=${pValue}`);

      if (domValue !== storedValue || domValue !== pValue) {
        allMatch = false;
        console.warn(`❌ Inconsistencia en ${id}`);
      }
    });

    if (allMatch) {
      console.log('✅ Todos los checkboxes son persistentes y consistentes');
    } else {
      console.warn('⚠️ Hay inconsistencias en la persistencia de checkboxes');
    }

  } catch(e) {
    console.error('Error verificando persistencia:', e);
  }
}

// Función para limpiar localStorage (útil para testing)
function clearCheckboxStorage() {
  const KEY = 'wf_persist_v23h7';
  try {
    localStorage.removeItem(KEY);
    console.log('localStorage limpiado para checkboxes');
    // Recargar checkboxes con valores por defecto
    location.reload();
  } catch(e) {
    console.error('Error limpiando localStorage:', e);
  }
}

// Función de diagnóstico para verificar el estado de los checkboxes
function diagnoseCheckboxes() {
  console.log('=== DIAGNÓSTICO DE CHECKBOXES ===');
  const checkboxes = [
    'showComponentWeights',
    'showGeometry',
    'showHorizon',
    'showWeight'
  ];

  checkboxes.forEach(id => {
    const el = $(id);
    if (el) {
      console.log(`${id}: checked=${el.checked}, exists=${!!el}`);
    } else {
      console.log(`${id}: NOT FOUND`);
    }
  });

  // Verificar valores en P()
  const p = P();
  console.log('Valores en P().show:', {
    componentWeights: p.show.componentWeights,
    geometry: p.show.geometry,
    weight: p.show.weight,
    horizon: p.show.horizon
  });

  // Coordenadas de dibujo se mostrarán después de calcular cx, cy
}

// Hacer las funciones disponibles globalmente para debugging
window.diagnoseCheckboxes = diagnoseCheckboxes;
window.verifyCheckboxPersistence = verifyCheckboxPersistence;
window.clearCheckboxStorage = clearCheckboxStorage;
const fmt=(x,d)=> {
  if (x === undefined || x === null || isNaN(x)) return '—';
  return (Math.abs(x)>=1000?x.toFixed(0):x.toFixed(d));
};

function endCyclePush(){
  if(cyc_acc.na>0){
    const a=cyc_acc.a/cyc_acc.na, th=cyc_acc.th/cyc_acc.na;
    const Lm=cyc_acc.L/cyc_acc.na, Thm=cyc_acc.Th/cyc_acc.na, Frm=cyc_acc.Fr/cyc_acc.na;
    histAngles.alpha.push(a); histAngles.theta.push(th);
    histForces.L.push(Lm); histForces.Th.push(Thm); histForces.Fr.push(Frm);
    if(histAngles.alpha.length>MAXC){ histAngles.alpha.shift(); histAngles.theta.shift(); }
    if(histForces.L.length>MAXC){ histForces.L.shift(); histForces.Th.shift(); histForces.Fr.shift(); }
  }
  // No agregar valores por defecto cuando no hay datos - dejar arrays vacíos
  cyc_acc={na:0, a:0, th:0, L:0, Th:0, Fr:0};
}

function applyTechnicalDefinitions() {
  // Aplicar definiciones a inputs (sliders)
  Object.keys(PHYSICAL_DEFINITIONS).forEach(key => {
    const element = document.getElementById(key);
    if (element && PHYSICAL_DEFINITIONS[key]) {
      const def = PHYSICAL_DEFINITIONS[key];
      element.title = `${def.name} (${def.unit}). ${def.description} Rango: ${def.range}`;
    }
  });

  // Aplicar definiciones a KPIs
  const kpiMappings = {
    alphaOut: 'alphaOut',
    thetaEffOut: 'thetaEffOut',
    LOut: 'LOut',
    LvOut: 'LvOut',
    FrOut: 'FrOut',
    DOut: 'DOut',
    ThOut: 'ThOut',
    SupOut: 'SupOut',
    MrOut: 'MrOut',
    hOut: 'hOut',
    VTableOut: 'VTableOut',
    BOut: 'BOut',
    draftOut: 'draftOut'
  };

  Object.keys(kpiMappings).forEach(kpiKey => {
    const element = document.getElementById(kpiMappings[kpiKey]);
    if (element && PHYSICAL_DEFINITIONS[kpiKey]) {
      const def = PHYSICAL_DEFINITIONS[kpiKey];
      element.title = `${def.name} (${def.unit}). ${def.description}`;
    }
  });
}

function bindUI(){
  const geometrySliders = ['foilOffsetX','foilOffsetZ','tailOffsetX','tailOffsetZ','mastH','boardLen'];
  let needsGeometryUpdate = false;

  sliders.forEach(id=>{
    const el=S(id);
    el.addEventListener('input', updateAll, {passive:true});
    el.addEventListener('change', updateAll, {passive:true});
    // persistencia
    const KEY='wf_persist_v23h7';
    el.addEventListener('input', ()=>{
      try{ const obj=JSON.parse(localStorage.getItem(KEY)||'{}'); obj[id]=el.value; localStorage.setItem(KEY, JSON.stringify(obj)); }catch(e){}
    }, {passive:true});
    // Cargar valor desde localStorage
    try{
      const obj=JSON.parse(localStorage.getItem(KEY)||'{}');
      if(obj[id]!==undefined && obj[id] !== el.value) {
        el.value=obj[id];
        if(geometrySliders.includes(id)) {
          needsGeometryUpdate = true;
        }
      }
    }catch(e){console.error('Error cargando localStorage:', e);}
  });

  // Actualización única para geometría después de cargar todos los valores
  if(needsGeometryUpdate) {
    setTimeout(() => {
      updateAll();
    }, 50);
  }
  
  // Controles de límites para TODOS los sliders
  const allSliderLimits = [
    // Parámetros
    { sliderId: 'v0', minId: 'v0Min', maxId: 'v0Max', defaultMin: 2, defaultMax: 6 },
    { sliderId: 'phi', minId: 'phiMin', maxId: 'phiMax', defaultMin: -10, defaultMax: 15 },
    { sliderId: 'theta0', minId: 'theta0Min', maxId: 'theta0Max', defaultMin: -5, defaultMax: 12 },
    { sliderId: 'gamma0', minId: 'gamma0Min', maxId: 'gamma0Max', defaultMin: -15, defaultMax: 10 },
    { sliderId: 'S', minId: 'SMin', maxId: 'SMax', defaultMin: 0.08, defaultMax: 0.22 },
    { sliderId: 'tailArea', minId: 'tailAreaMin', maxId: 'tailAreaMax', defaultMin: 0.01, defaultMax: 0.05 },
    { sliderId: 'tailLength', minId: 'tailLengthMin', maxId: 'tailLengthMax', defaultMin: 0.3, defaultMax: 1.0 },
    { sliderId: 'tailIncidence', minId: 'tailIncidenceMin', maxId: 'tailIncidenceMax', defaultMin: -5, defaultMax: 5 },
    { sliderId: 'rho', minId: 'rhoMin', maxId: 'rhoMax', defaultMin: 950, defaultMax: 1030 },
    { sliderId: 'mass', minId: 'massMin', maxId: 'massMax', defaultMin: 50, defaultMax: 100 },
    { sliderId: 'boardMass', minId: 'boardMassMin', maxId: 'boardMassMax', defaultMin: 3, defaultMax: 8 },
    { sliderId: 'foilMass', minId: 'foilMassMin', maxId: 'foilMassMax', defaultMin: 1, defaultMax: 3 },
    { sliderId: 'tailMass', minId: 'tailMassMin', maxId: 'tailMassMax', defaultMin: 0.2, defaultMax: 0.8 },
    { sliderId: 'LD', minId: 'LDMin', maxId: 'LDMax', defaultMin: 4, defaultMax: 12 },
    { sliderId: 'clslope', minId: 'clslopeMin', maxId: 'clslopeMax', defaultMin: 0.04, defaultMax: 0.14 },
    { sliderId: 'clmax', minId: 'clmaxMin', maxId: 'clmaxMax', defaultMin: 0.7, defaultMax: 1.5 },
    { sliderId: 'stall', minId: 'stallMin', maxId: 'stallMax', defaultMin: 6, defaultMax: 16 },
    
    // Ciclo
    { sliderId: 'freq', minId: 'freqMin', maxId: 'freqMax', defaultMin: 0.6, defaultMax: 2.5 },
    { sliderId: 'ampV', minId: 'ampVMin', maxId: 'ampVMax', defaultMin: 0, defaultMax: 1.2 },
    { sliderId: 'ampT', minId: 'ampTMin', maxId: 'ampTMax', defaultMin: 0, defaultMax: 4 },
    { sliderId: 'ampG', minId: 'ampGMin', maxId: 'ampGMax', defaultMin: 0, defaultMax: 5 },
    { sliderId: 'phaseT', minId: 'phaseTMin', maxId: 'phaseTMax', defaultMin: 0, defaultMax: 180 },
    { sliderId: 'phaseG', minId: 'phaseGMin', maxId: 'phaseGMax', defaultMin: 0, defaultMax: 180 },
    { sliderId: 'dtStep', minId: 'dtStepMin', maxId: 'dtStepMax', defaultMin: 0.001, defaultMax: 0.02 },
    
    // Rider
    { sliderId: 'lambda', minId: 'lambdaMin', maxId: 'lambdaMax', defaultMin: 0.3, defaultMax: 0.7 },
    { sliderId: 'dstance', minId: 'dstanceMin', maxId: 'dstanceMax', defaultMin: 0.4, defaultMax: 0.9 },
    { sliderId: 'Af', minId: 'AfMin', maxId: 'AfMax', defaultMin: 0, defaultMax: 600 },
    { sliderId: 'Ab', minId: 'AbMin', maxId: 'AbMax', defaultMin: 0, defaultMax: 600 },
    { sliderId: 'phaseF', minId: 'phaseFMin', maxId: 'phaseFMax', defaultMin: 0, defaultMax: 180 },
    { sliderId: 'phaseB', minId: 'phaseBMin', maxId: 'phaseBMax', defaultMin: 0, defaultMax: 180 },
    { sliderId: 'Gtheta', minId: 'GthetaMin', maxId: 'GthetaMax', defaultMin: 0, defaultMax: 0.03 },
    { sliderId: 'Kphi', minId: 'KphiMin', maxId: 'KphiMax', defaultMin: 0, defaultMax: 0.15 },
    { sliderId: 'h0', minId: 'h0Min', maxId: 'h0Max', defaultMin: -0.8, defaultMax: 0.2 },
    { sliderId: 'cw', minId: 'cwMin', maxId: 'cwMax', defaultMin: 0, defaultMax: 400 },
    { sliderId: 'vscale', minId: 'vscaleMin', maxId: 'vscaleMax', defaultMin: 200, defaultMax: 4000 },
    { sliderId: 'hscale', minId: 'hscaleMin', maxId: 'hscaleMax', defaultMin: 60, defaultMax: 480 },
    
    // Tabla & Mástil
    { sliderId: 'boardVolL', minId: 'boardVolLMin', maxId: 'boardVolLMax', defaultMin: 40, defaultMax: 140 },
    { sliderId: 'boardArea', minId: 'boardAreaMin', maxId: 'boardAreaMax', defaultMin: 0.40, defaultMax: 1.20 },
    { sliderId: 'mastH', minId: 'mastHMin', maxId: 'mastHMax', defaultMin: 0.60, defaultMax: 1.20 },
    { sliderId: 'boardLen', minId: 'boardLenMin', maxId: 'boardLenMax', defaultMin: 1.10, defaultMax: 1.90 },
    
    // Geometría del sistema
    { sliderId: 'foilOffsetX', minId: 'foilOffsetXMin', maxId: 'foilOffsetXMax', defaultMin: 0.20, defaultMax: 0.50 },
    { sliderId: 'foilOffsetZ', minId: 'foilOffsetZMin', maxId: 'foilOffsetZMax', defaultMin: 0.02, defaultMax: 0.10 },
    { sliderId: 'tailOffsetX', minId: 'tailOffsetXMin', maxId: 'tailOffsetXMax', defaultMin: 0.40, defaultMax: 0.80 },
    { sliderId: 'tailOffsetZ', minId: 'tailOffsetZMin', maxId: 'tailOffsetZMax', defaultMin: 0.00, defaultMax: 0.05 },
    { sliderId: 'foilChord', minId: 'foilChordMin', maxId: 'foilChordMax', defaultMin: 0.15, defaultMax: 0.35 },
    { sliderId: 'tailChord', minId: 'tailChordMin', maxId: 'tailChordMax', defaultMin: 0.10, defaultMax: 0.20 },
    
    // Sliders de escala
    { sliderId: 'velscale', minId: 'velscaleMin', maxId: 'velscaleMax', defaultMin: 0.1, defaultMax: 12 },
    { sliderId: 'fuerzascale', minId: 'fuerzascaleMin', maxId: 'fuerzascaleMax', defaultMin: 0.1, defaultMax: 12 }
  ];
  
  allSliderLimits.forEach(({ sliderId, minId, maxId, defaultMin, defaultMax }) => {
    const slider = S(sliderId);
    const minInput = S(minId);
    const maxInput = S(maxId);
    
    // Función para actualizar límites del slider
    const updateSliderLimits = () => {
      let newMin = parseFloat(minInput.value);
      let newMax = parseFloat(maxInput.value);
      
      // Permitir valores libres sin restricciones
      if (isNaN(newMin)) newMin = defaultMin;
      if (isNaN(newMax)) newMax = defaultMax;
      if (newMin >= newMax) newMin = newMax - 1; // Evitar que min sea mayor o igual a max
      
      // Actualizar inputs con valores validados
      minInput.value = newMin;
      maxInput.value = newMax;
      
      const currentValue = parseFloat(slider.value);
      
      // Actualizar atributos del slider
      slider.min = newMin;
      slider.max = newMax;
      
      // Ajustar valor si está fuera de límites
      if (currentValue < newMin) slider.value = newMin;
      if (currentValue > newMax) slider.value = newMax;
      
      // Guardar en localStorage
      const KEY = 'wf_all_limits_v23h7';
      try {
        const limits = JSON.parse(localStorage.getItem(KEY) || '{}');
        limits[sliderId] = { min: newMin, max: newMax };
        localStorage.setItem(KEY, JSON.stringify(limits));
      } catch(e) {}
      
      // Actualizar display
      updateAll();
    };
    
    // Event listeners para min y max
    minInput.addEventListener('input', updateSliderLimits);
    maxInput.addEventListener('input', updateSliderLimits);
    
    // Cargar límites guardados
    try {
      const KEY = 'wf_all_limits_v23h7';
      const limits = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (limits[sliderId]) {
        minInput.value = limits[sliderId].min;
        maxInput.value = limits[sliderId].max;
        slider.min = limits[sliderId].min;
        slider.max = limits[sliderId].max;
      } else {
        // Usar valores por defecto si no hay guardados
        minInput.value = defaultMin;
        maxInput.value = defaultMax;
      }
    } catch(e) {
      // Usar valores por defecto en caso de error
      minInput.value = defaultMin;
      maxInput.value = defaultMax;
    }
    
    // Inicializar límites del slider con valores por defecto si no hay guardados
    if (!minInput.value || minInput.value === '') {
      minInput.value = defaultMin;
    }
    if (!maxInput.value || maxInput.value === '') {
      maxInput.value = defaultMax;
    }
    
    // Aplicar límites iniciales al slider
    slider.min = minInput.value;
    slider.max = maxInput.value;
  });
  
  ["showHorizon","showFeet","showArc","showLabels","showPhiAngle","phiFollow","showFlow","showChord","showLD","showTableVel","showAxesW","showAxesB","showAxesF","showWeight","showComponentWeights","showBuoy","showResultants","showTail","showGeometry"]
    .forEach(id=> {
      const el = S(id);
      if (el) {
        // Cargar valor desde localStorage
        const KEY='wf_persist_v23h7';
        try{
          const obj=JSON.parse(localStorage.getItem(KEY)||'{}');
          if(obj[id]!==undefined && obj[id] !== el.checked) {
            el.checked=obj[id];
          }
        }catch(e){console.error('Error cargando checkbox desde localStorage:', e);}
        
        el.addEventListener('change', (e) => {
          console.log(`Checkbox ${id} changed to: ${e.target.checked}`);
          // Guardar en localStorage
          try{ 
            const obj=JSON.parse(localStorage.getItem(KEY)||'{}'); 
            obj[id]=e.target.checked; 
            localStorage.setItem(KEY, JSON.stringify(obj)); 
          }catch(e){}
          draw();
        }, {passive:true});
      } else {
        console.warn(`Checkbox ${id} not found!`);
      }
    });
  S('playPause').addEventListener('click', togglePlayPause);
  S('testCharts').addEventListener('click', testCharts);
  S('fwd').addEventListener('click', ()=> step(+1));
  S('back').addEventListener('click', ()=> step(-1));
  S('panL').addEventListener('click', ()=>{ pan.x -= 18; draw(); });
  S('panR').addEventListener('click', ()=>{ pan.x += 18; draw(); });
  S('panU').addEventListener('click', ()=>{ pan.y -= 18; draw(); });
  S('panD').addEventListener('click', ()=>{ pan.y += 18; draw(); });
  S('pan0').addEventListener('click', ()=>{ pan={x:0,y:0}; draw(); });
  
  // Controles de zoom global
  S('zoomIn').addEventListener('click', ()=>{
    const p = P();
    // Aumentar ambas escalas (zoom in)
    const newHscale = Math.min(p.hscale * 1.2, 480); // Máximo 480
    const newVscale = Math.min(p.vscale * 1.2, 4000); // Máximo 4000
    const newVelscale = Math.min((p.velscale || 1) * 1.2, 12); // Máximo 12
    const newFuerzascale = Math.min((p.fuerzascale || 1) * 1.2, 12); // Máximo 12
    
    // Actualizar los sliders correspondientes
    const hscaleSlider = S('hscale');
    const vscaleSlider = S('vscale');
    const velscaleSlider = S('velscale');
    const fuerzascaleSlider = S('fuerzascale');
    if (hscaleSlider) hscaleSlider.value = newHscale;
    if (vscaleSlider) vscaleSlider.value = newVscale;
    if (velscaleSlider) velscaleSlider.value = newVelscale;
    if (fuerzascaleSlider) fuerzascaleSlider.value = newFuerzascale;
    
    // Forzar actualización
    updateAll();
  });
  
  S('zoomOut').addEventListener('click', ()=>{
    const p = P();
    // Disminuir ambas escalas (zoom out)
    const newHscale = Math.max(p.hscale / 1.2, 60); // Mínimo 60
    const newVscale = Math.max(p.vscale / 1.2, 200); // Mínimo 200
    const newVelscale = Math.max((p.velscale || 1) / 1.2, 0.1); // Mínimo 0.1
    const newFuerzascale = Math.max((p.fuerzascale || 1) / 1.2, 0.1); // Mínimo 0.1
    
    // Actualizar los sliders correspondientes
    const hscaleSlider = S('hscale');
    const vscaleSlider = S('vscale');
    const velscaleSlider = S('velscale');
    const fuerzascaleSlider = S('fuerzascale');
    if (hscaleSlider) hscaleSlider.value = newHscale;
    if (vscaleSlider) vscaleSlider.value = newVscale;
    if (velscaleSlider) velscaleSlider.value = newVelscale;
    if (fuerzascaleSlider) fuerzascaleSlider.value = newFuerzascale;
    
    // Forzar actualización
    updateAll();
  });
  S('centerTable').addEventListener('click', ()=>{
    // Obtener parámetros actuales
    const p = P();
    
    // Usar el mismo cálculo de ángulo efectivo que se usa para dibujar la tabla
    const phiDeg = p.show.phiFollow ? (p.phi0 - p.Kphi*inst.Mr) : p.phi0;
    const phi = phiDeg * Math.PI / 180; // Convertir a radianes
    const mastH = p.mastH;
    const foilDist = Math.min(p.foilDist || mastH * p.vscale, 200); // Limitar a 200px máximo
    
    // Calcular posición del ancla de la tabla usando el mismo método que en draw()
    const xAnchor = cx - Math.sin(phi) * foilDist;
    const yAnchor = cy - Math.cos(phi) * foilDist;
    
    // Obtener dimensiones reales del SVG
    const svg = S("geom");
    const centerX = (svg.clientWidth || 600) / 2;
    const centerY = (svg.clientHeight || 420) / 2;
    
    // Ajustar pan para centrar la tabla
    pan.x = centerX - (xAnchor - cx + centerX);
    pan.y = centerY - (yAnchor - cy + centerY);
    
    // console.log('CenterTable Debug:', {
    //   phiDeg, phi, mastH, foilDist,
    //   xAnchor, yAnchor, cx, cy,
    //   centerX, centerY,
    //   newPanX: pan.x, newPanY: pan.y
    // });
    
    draw();
  });
  S('state0').addEventListener('click', resetState);
  
  // Event listener para medición de distancias en el SVG
  // console.log('🔍 BUSCANDO SVG ELEMENT...');
  const svgElement = S('geom');
  // console.log('🔍 SVG ELEMENT ENCONTRADO:', !!svgElement);
  
  if(svgElement) {
    // console.log('✅ CONFIGURANDO EVENT LISTENERS PARA SVG');
    // console.log('SVG Element details:', {
    //   tagName: svgElement.tagName,
    //   id: svgElement.id,
    //   className: svgElement.className,
    //   clientWidth: svgElement.clientWidth,
    //   clientHeight: svgElement.clientHeight
    // });
    
    // Limpiar overlay anterior si existe
    const existingOverlay = svgElement.querySelector('#measurement-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
      // console.log('🧹 OVERLAY ANTERIOR REMOVIDO');
    }
    
    // FORZAR que el SVG sea clickeable
    svgElement.style.pointerEvents = 'auto';
    svgElement.style.zIndex = '9999';
    
    // Agregar un rectángulo transparente sobre todo el SVG para capturar eventos
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    overlay.setAttribute('x', '0');
    overlay.setAttribute('y', '0');
    overlay.setAttribute('width', '100%');
    overlay.setAttribute('height', '100%');
    overlay.setAttribute('fill', 'transparent');
    overlay.setAttribute('stroke', 'none');
    overlay.setAttribute('pointer-events', 'all');
    overlay.setAttribute('id', 'measurement-overlay');
    svgElement.appendChild(overlay);
    
    // console.log('🎯 OVERLAY TRANSPARENTE AGREGADO PARA CAPTURAR EVENTOS');
    
    // Verificar si ya tiene event listeners
    // console.log('Event listeners actuales en SVG:', svgElement._eventListeners || 'No disponible');
    
    svgElement.addEventListener('click', handleSvgClick);
    svgElement.addEventListener('mouseenter', showMeasurementInstructions);
    // Mantener el event listener de mousemove siempre activo
    svgElement.addEventListener('mousemove', handleMouseMove);
    // console.log('🎯 EVENT LISTENERS CONFIGURADOS (incluyendo mousemove permanente)');
    
    // Verificar que el event listener se agregó
    // console.log('Verificación de event listeners después de agregar:', {
    //   hasClickListener: svgElement.onclick !== null,
    //   hasMouseMoveListener: true // Asumimos que se agregó correctamente
    // });
    
    // Probar inmediatamente el event listener
    // console.log('🧪 PROBANDO EVENT LISTENER...');
    const testEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100,
      bubbles: true
    });
    svgElement.dispatchEvent(testEvent);
    
  } else {
    // console.log('❌ SVG ELEMENT NO ENCONTRADO - FUNCIONALIDAD DE MEDICIÓN DESHABILITADA');
    // console.log('Intentando buscar SVG con diferentes métodos...');
    
    // Intentar buscar SVG de diferentes maneras
    const svgById = document.getElementById('geom');
    const svgByQuery = document.querySelector('#geom');
    const allSvgs = document.querySelectorAll('svg');
    
    // console.log('SVG por getElementById:', !!svgById);
    // console.log('SVG por querySelector:', !!svgByQuery);
    // console.log('Total SVGs en documento:', allSvgs.length);
    
    if (allSvgs.length > 0) {
      // console.log('Primer SVG encontrado:', {
      //   id: allSvgs[0].id,
      //   className: allSvgs[0].className
      // });
    }
  }
  
  // Función de respaldo para configurar event listeners con delay
  function setupMeasurementListenersWithDelay() {
    console.log('⏰ INTENTANDO CONFIGURAR EVENT LISTENERS CON DELAY...');
    const svgElement = S('geom') || document.getElementById('geom') || document.querySelector('#geom');
    
    if (svgElement) {
      console.log('✅ SVG ENCONTRADO CON DELAY - CONFIGURANDO EVENT LISTENERS');
      svgElement.addEventListener('click', handleSvgClick);
      svgElement.addEventListener('mouseenter', showMeasurementInstructions);
      svgElement.addEventListener('mousemove', handleMouseMove);
      console.log('🎯 EVENT LISTENERS CONFIGURADOS CON ÉXITO (delay)');
      
      // Probar el event listener
      const testEvent = new Event('mousemove');
      svgElement.dispatchEvent(testEvent);
    } else {
      console.log('❌ SVG AÚN NO ENCONTRADO DESPUÉS DEL DELAY');
    }
  }
  
  // Configurar MutationObserver para detectar SVG dinámicamente
  function setupMutationObserver() {
    console.log('👀 CONFIGURANDO MUTATION OBSERVER PARA SVG...');
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.id === 'geom' || (node.tagName && node.tagName.toLowerCase() === 'svg' && node.id === 'geom')) {
            console.log('🎯 SVG DETECTADO POR MUTATION OBSERVER!');
            console.log('SVG Element:', {
              tagName: node.tagName,
              id: node.id,
              className: node.className
            });
            
            // Configurar event listeners
            node.addEventListener('click', handleSvgClick);
            node.addEventListener('mouseenter', showMeasurementInstructions);
            node.addEventListener('mousemove', handleMouseMove);
            console.log('✅ EVENT LISTENERS CONFIGURADOS VIA MUTATION OBSERVER');
            
            // Probar el event listener
            const testEvent = new Event('mousemove');
            node.dispatchEvent(testEvent);
            
            // Dejar de observar una vez encontrado
            observer.disconnect();
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('👀 MUTATION OBSERVER ACTIVO');
  }
  
  // Iniciar MutationObserver
  setupMutationObserver();
  
  // Inicializar el estado del botón Play/Pause
  const playPauseButton = S('playPause');
  if(playPauseButton){
    playPauseButton.textContent = '▶ Play';
    playPauseButton.innerHTML = '▶ Play';
  }
  
  // Aplicar definiciones técnicas a todos los elementos
  applyTechnicalDefinitions();
}

// Función de prueba manual para debugging
function testMeasurementSystem() {
  // console.log('🧪 PRUEBA MANUAL DEL SISTEMA DE MEDICIÓN');
  
  const svg = S('geom') || document.getElementById('geom') || document.querySelector('#geom');
  if (!svg) {
    // console.log('❌ NO SE ENCONTRÓ SVG PARA PRUEBA');
    return;
  }
  
  // console.log('✅ SVG ENCONTRADO PARA PRUEBA');
  
  // Simular un click
  // console.log('🖱️ SIMULANDO CLICK...');
  const clickEvent = new MouseEvent('click', {
    clientX: 100,
    clientY: 100,
    bubbles: true
  });
  svg.dispatchEvent(clickEvent);
  
  // Simular movimiento del mouse
  // console.log('🖱️ SIMULANDO MOUSE MOVE...');
  setTimeout(() => {
    const moveEvent = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 150,
      bubbles: true
    });
    svg.dispatchEvent(moveEvent);
  }, 500);
}

// Hacer la función disponible globalmente para pruebas
window.testMeasurementSystem = testMeasurementSystem;
function handleSvgClick(event) {
  const svg = S('geom');
  if (!svg) return;
  
  // Obtener coordenadas del click relativo al SVG
  const rect = svg.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  
  // Convertir a coordenadas físicas
  const physicalPoint = screenToPhysical(clickX, clickY);
  
  // Agregar punto a la medición
  measurementPoints.push(physicalPoint);
  
  // Crear marcador visual solo si no tenemos 2 puntos aún
  // (los marcadores para 2 puntos se crean en drawMeasurementLine)
  if (measurementPoints.length < 2) {
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    marker.setAttribute('cx', clickX);
    marker.setAttribute('cy', clickY);
    marker.setAttribute('r', '2');
    marker.setAttribute('fill', '#ff0000');
    marker.setAttribute('stroke', '#ffffff');
    marker.setAttribute('stroke-width', '0.5');
    marker.setAttribute('opacity', '0.5');
    svg.appendChild(marker);
    measurementMarkers.push(marker);
  }
  
  console.log(`Punto ${measurementPoints.length} clickeado:`, {
    screen: { x: clickX, y: clickY },
    physical: { x: physicalPoint.x.toFixed(3), y: physicalPoint.y.toFixed(3) }
  });
  
  // Dar feedback al usuario
  if (measurementPoints.length === 1) {
    // console.log('✅ PRIMER PUNTO: Mueve el mouse para ver distancias en tiempo real');
    // console.log('💡 SEGUNDO CLICK: Medirá la distancia entre ambos puntos');
  }
  
  // Si tenemos 2 puntos, dibujar la línea de medición
  if (measurementPoints.length === 2) {
    // Cancelar timeouts anteriores
    if (measurementTimeout) {
      clearTimeout(measurementTimeout);
    }
    if (markerTimeout) {
      clearTimeout(markerTimeout);
    }
    
    // Desactivar seguimiento del mouse (solo cambiar flag)
    mouseTrackingActive = false;
    // console.log('🖱️ SEGUIMIENTO DEL MOUSE DESACTIVADO');
    
    drawMeasurementLine();
    
    // console.log('🎯 MEDICIÓN COMPLETADA: Distancia entre los dos puntos');
    // console.log('🧹 Sistema listo para nuevas mediciones');
    
    // Limpiar todo inmediatamente después de mostrar la medición
    setTimeout(() => {
      clearMeasurement();
      // console.log('✅ Sistema limpiado - Listo para medir nuevamente');
    }, 100); // Pequeño delay para que se vea la medición final
  } else if (measurementPoints.length === 1) {
    // Primer punto: mostrar distancia desde origen durante 2 segundos
    if (measurementTimeout) {
      clearTimeout(measurementTimeout);
    }
    
    drawDistanceFromOrigin(physicalPoint);
    
    // console.log('🎯 MEDICIÓN DESDE ORIGEN COMPLETADA');
    // console.log('💡 Mueve el mouse para ver distancias en tiempo real desde el origen');
    
    // Activar seguimiento del mouse
    mouseTrackingActive = true;
    // console.log('🔧 ACTIVANDO SEGUIMIENTO DEL MOUSE...');
    // console.log('🖱️ SEGUIMIENTO DEL MOUSE ACTIVADO (event listener ya estaba activo)');
    // console.log('💡 Mueve el mouse para ver distancias en tiempo real');
    
    // Timeout para borrar el texto de distancia desde W(0,0) en 4 segundos (duplicado)
    measurementTimeout = setTimeout(() => {
      // Solo borrar el texto y línea, mantener marcadores
      if (measurementLine && measurementLine.parentNode) {
        measurementLine.parentNode.removeChild(measurementLine);
      }
      if (measurementText && measurementText.parentNode) {
        measurementText.parentNode.removeChild(measurementText);
      }
      if (measurementTextBg && measurementTextBg.parentNode) {
        measurementTextBg.parentNode.removeChild(measurementTextBg);
      }
      // Limpiar variables del texto
      measurementLine = null;
      measurementText = null;
      measurementTextBg = null;
      measurementTimeout = null;
    }, 4000);
    
    // Timeout para borrar los marcadores en 14 segundos (duplicado)
    markerTimeout = setTimeout(() => {
      clearMeasurement();
    }, 14000);
  }
}

function screenToPhysical(screenX, screenY) {
  const svg = S('geom');
  const wpx = svg.clientWidth || 600;
  const hpx = svg.clientHeight || 420;
  
  // Obtener parámetros actuales
  const params = P();
  const scale = params.vscale;
  
  // Calcular coordenadas de pantalla con pan aplicado
  const cx = wpx * 0.50 + pan.x;
  const cy = (hpx * 0.62 + pan.y) - (playing ? h : params.h0) * scale;
  
  // Convertir coordenadas de pantalla a físicas
  const physicalX = (screenX - cx) / scale;
  const physicalY = (cy - screenY) / scale;
  
  return { x: physicalX, y: physicalY, screenX, screenY };
}

function physicalToScreen(physicalX, physicalY) {
  const svg = S('geom');
  const wpx = svg.clientWidth || 600;
  const hpx = svg.clientHeight || 420;
  
  // Obtener parámetros actuales
  const params = P();
  const scale = params.vscale;
  
  // Calcular coordenadas de pantalla con pan aplicado
  const cx = wpx * 0.50 + pan.x;
  const cy = (hpx * 0.62 + pan.y) - (playing ? h : params.h0) * scale;
  
  // Convertir coordenadas físicas a pantalla
  const screenX = physicalX * scale + cx;
  const screenY = cy - physicalY * scale;
  
  return { screenX, screenY, x: physicalX, y: physicalY };
}

function drawMeasurementLine() {
  if (measurementPoints.length !== 2) return;
  
  const svg = S('geom');
  if (!svg) return;
  
  const p1 = measurementPoints[0];
  const p2 = measurementPoints[1];
  
  // Calcular distancia física
  const distance = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  
  console.log('📏 DISTANCIA CALCULADA: ' + distance.toFixed(3) + ' unidades');
  console.log('📍 Punto 1:', { x: p1.x.toFixed(3), y: p1.y.toFixed(3) });
  console.log('📍 Punto 2:', { x: p2.x.toFixed(3), y: p2.y.toFixed(3) });
  
  // Limpiar medición anterior
  clearMeasurement();
  
  // Limpiar específicamente textos del mouse que podrían quedar
  if (mouseDistanceText && mouseDistanceText.parentNode) {
    mouseDistanceText.parentNode.removeChild(mouseDistanceText);
  }
  if (mouseDistanceTextBg && mouseDistanceTextBg.parentNode) {
    mouseDistanceTextBg.parentNode.removeChild(mouseDistanceTextBg);
  }
  mouseDistanceText = null;
  mouseDistanceTextBg = null;
  
  // Recrear marcadores para los dos puntos
  const marker1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  marker1.setAttribute('cx', p1.screenX);
  marker1.setAttribute('cy', p1.screenY);
  marker1.setAttribute('r', '2');
  marker1.setAttribute('fill', '#ff0000');
  marker1.setAttribute('stroke', '#ffffff');
  marker1.setAttribute('stroke-width', '0.5');
  marker1.setAttribute('opacity', '0.5');
  svg.appendChild(marker1);
  measurementMarkers.push(marker1);
  
  const marker2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  marker2.setAttribute('cx', p2.screenX);
  marker2.setAttribute('cy', p2.screenY);
  marker2.setAttribute('r', '2');
  marker2.setAttribute('fill', '#ff0000');
  marker2.setAttribute('stroke', '#ffffff');
  marker2.setAttribute('stroke-width', '0.5');
  marker2.setAttribute('opacity', '0.5');
  svg.appendChild(marker2);
  measurementMarkers.push(marker2);
  
  // Crear línea
  measurementLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  measurementLine.setAttribute('x1', p1.screenX);
  measurementLine.setAttribute('y1', p1.screenY);
  measurementLine.setAttribute('x2', p2.screenX);
  measurementLine.setAttribute('y2', p2.screenY);
  measurementLine.setAttribute('stroke', '#ff0000');
  measurementLine.setAttribute('stroke-width', '1');
  measurementLine.setAttribute('stroke-dasharray', '4,2');
  measurementLine.setAttribute('opacity', '0.4');
  measurementLine.setAttribute('stroke-linecap', 'round');
  svg.appendChild(measurementLine);
  
  // Crear texto con la distancia
  const midX = (p1.screenX + p2.screenX) / 2;
  const midY = (p1.screenY + p2.screenY) / 2;
  
  measurementText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  measurementText.setAttribute('x', midX);
  measurementText.setAttribute('y', midY - 8);
  measurementText.setAttribute('text-anchor', 'middle');
  measurementText.setAttribute('font-size', '9');
  measurementText.setAttribute('font-weight', 'normal');
  measurementText.setAttribute('fill', '#ffffff');
  measurementText.setAttribute('stroke', '#000000');
  measurementText.setAttribute('stroke-width', '1');
  measurementText.setAttribute('stroke-linecap', 'round');
  measurementText.setAttribute('stroke-linejoin', 'round');
  measurementText.setAttribute('opacity', '0.6');
  measurementText.textContent = `${distance.toFixed(2)} m [${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}] → [${p2.x.toFixed(2)}, ${p2.y.toFixed(2)}]`;
  svg.appendChild(measurementText);
  
  // Crear texto de fondo para mejor legibilidad
  const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textBg.setAttribute('x', midX);
  textBg.setAttribute('y', midY - 8);
  textBg.setAttribute('text-anchor', 'middle');
  textBg.setAttribute('font-size', '9');
  textBg.setAttribute('font-weight', 'normal');
  textBg.setAttribute('fill', '#000000');
  textBg.setAttribute('opacity', '0.3');
  textBg.textContent = `${distance.toFixed(2)} m [${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}] → [${p2.x.toFixed(2)}, ${p2.y.toFixed(2)}]`;
  svg.appendChild(textBg);
  measurementTextBg = textBg;
}

function handleMouseMove(event) {
  console.log('🖱️ MOUSE MOVE EVENT TRIGGERED');
  console.log('Event details:', {
    type: event.type,
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: event.clientX,
    clientY: event.clientY
  });
  console.log('mouseTrackingActive:', mouseTrackingActive);
  console.log('measurementPoints.length:', measurementPoints.length);
  
  if (!mouseTrackingActive || measurementPoints.length !== 1) {
    console.log('❌ MOUSE MOVE IGNORED - Condiciones no cumplidas');
    return;
  }
  
  console.log('✅ MOUSE MOVE PROCESANDO...');
  console.log('📏 Distancia calculada:', distance.toFixed(3), 'unidades');
  
  const svg = S('geom');
  if (!svg) return;
  
  // Obtener coordenadas del mouse relativo al SVG
  const rect = svg.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  
  // Convertir a coordenadas físicas
  const mousePhysical = screenToPhysical(mouseX, mouseY);
  const firstPoint = measurementPoints[0];
  
  // Calcular distancia desde el primer punto hasta el mouse
  const distance = Math.sqrt((mousePhysical.x - firstPoint.x) ** 2 + (mousePhysical.y - firstPoint.y) ** 2);
  
  // Limpiar texto anterior del mouse
  if (mouseDistanceText && mouseDistanceText.parentNode) {
    mouseDistanceText.parentNode.removeChild(mouseDistanceText);
  }
  if (mouseDistanceTextBg && mouseDistanceTextBg.parentNode) {
    mouseDistanceTextBg.parentNode.removeChild(mouseDistanceTextBg);
  }
  
  // Crear texto con la distancia al mouse
  mouseDistanceText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  mouseDistanceText.setAttribute('x', mouseX + 10);
  mouseDistanceText.setAttribute('y', mouseY - 10);
  mouseDistanceText.setAttribute('text-anchor', 'start');
  mouseDistanceText.setAttribute('font-size', '9');
  mouseDistanceText.setAttribute('font-weight', 'normal');
  mouseDistanceText.setAttribute('fill', '#00ff00');
  mouseDistanceText.setAttribute('stroke', '#000000');
  mouseDistanceText.setAttribute('stroke-width', '1');
  mouseDistanceText.setAttribute('stroke-linecap', 'round');
  mouseDistanceText.setAttribute('stroke-linejoin', 'round');
  mouseDistanceText.setAttribute('opacity', '0.8');
  mouseDistanceText.textContent = `${distance.toFixed(2)} m (${mousePhysical.x.toFixed(2)}, ${mousePhysical.y.toFixed(2)})`;
  svg.appendChild(mouseDistanceText);
  
  // Crear texto de fondo para mejor legibilidad
  mouseDistanceTextBg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  mouseDistanceTextBg.setAttribute('x', mouseX + 10);
  mouseDistanceTextBg.setAttribute('y', mouseY - 10);
  mouseDistanceTextBg.setAttribute('text-anchor', 'start');
  mouseDistanceTextBg.setAttribute('font-size', '9');
  mouseDistanceTextBg.setAttribute('font-weight', 'normal');
  mouseDistanceTextBg.setAttribute('fill', '#000000');
  mouseDistanceTextBg.setAttribute('opacity', '0.4');
  mouseDistanceTextBg.textContent = `${distance.toFixed(2)} m (${mousePhysical.x.toFixed(2)}, ${mousePhysical.y.toFixed(2)})`;
  svg.appendChild(mouseDistanceTextBg);
}

function drawDistanceFromOrigin(point) {
  const svg = S('geom');
  if (!svg) return;
  
  // Limpiar medición anterior
  clearMeasurement();
  
  // Calcular las coordenadas físicas de W(0,0)
  const wpx = svg.clientWidth || 600;
  const hpx = svg.clientHeight || 420;
  const horizonY = hpx * 0.45 + pan.y;
  const wScreenX = 34 + pan.x;
  const wScreenY = horizonY;
  
  // Convertir coordenadas de pantalla de W(0,0) a coordenadas físicas
  const params = P();
  const scale = params.vscale;
  const cx = wpx * 0.50 + pan.x;
  const cy = (hpx * 0.62 + pan.y) - (playing ? h : params.h0) * scale;
  
  const wPhysicalX = (wScreenX - cx) / scale;
  const wPhysicalY = (cy - wScreenY) / scale;
  
  // Calcular distancia desde W(0,0) hasta el punto clickeado
  const distance = Math.sqrt((point.x - wPhysicalX) ** 2 + (point.y - wPhysicalY) ** 2);
  
  console.log('📏 DISTANCIA DESDE ORIGEN W(0,0): ' + distance.toFixed(3) + ' unidades');
  console.log('📍 Punto clickeado:', { x: point.x.toFixed(3), y: point.y.toFixed(3) });
  console.log('📍 Origen W(0,0):', { x: wPhysicalX.toFixed(3), y: wPhysicalY.toFixed(3) });
  
  // Crear línea desde W(0,0) hasta el punto
  measurementLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  measurementLine.setAttribute('x1', wScreenX);
  measurementLine.setAttribute('y1', wScreenY);
  measurementLine.setAttribute('x2', point.screenX);
  measurementLine.setAttribute('y2', point.screenY);
  measurementLine.setAttribute('stroke', '#ff0000');
  measurementLine.setAttribute('stroke-width', '1');
  measurementLine.setAttribute('stroke-dasharray', '4,2');
  measurementLine.setAttribute('opacity', '0.4');
  measurementLine.setAttribute('stroke-linecap', 'round');
  svg.appendChild(measurementLine);
  
  // Crear texto con la distancia
  const midX = (wScreenX + point.screenX) / 2;
  const midY = (wScreenY + point.screenY) / 2;
  
  measurementText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  measurementText.setAttribute('x', midX);
  measurementText.setAttribute('y', midY - 8);
  measurementText.setAttribute('text-anchor', 'middle');
  measurementText.setAttribute('font-size', '9');
  measurementText.setAttribute('font-weight', 'normal');
  measurementText.setAttribute('fill', '#ffffff');
  measurementText.setAttribute('stroke', '#000000');
  measurementText.setAttribute('stroke-width', '1');
  measurementText.setAttribute('stroke-linecap', 'round');
  measurementText.setAttribute('stroke-linejoin', 'round');
  measurementText.setAttribute('opacity', '0.6');
  measurementText.textContent = `${distance.toFixed(2)} m desde W(0,0) (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
  svg.appendChild(measurementText);
  
  // Crear texto de fondo para mejor legibilidad
  const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textBg.setAttribute('x', midX);
  textBg.setAttribute('y', midY - 8);
  textBg.setAttribute('text-anchor', 'middle');
  textBg.setAttribute('font-size', '9');
  textBg.setAttribute('font-weight', 'normal');
  textBg.setAttribute('fill', '#000000');
  textBg.setAttribute('opacity', '0.3');
  textBg.textContent = `${distance.toFixed(2)} m desde W(0,0) (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
  svg.appendChild(textBg);
  measurementTextBg = textBg;
}

function showMeasurementInstructions() {
  if (measurementInstructionsShown) return;
  
  const svg = S('geom');
  if (!svg) return;
  
  measurementInstructionsShown = true;
  
  // Crear tooltip con instrucciones
  const instructionsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  instructionsText.setAttribute('x', '50%');
  instructionsText.setAttribute('y', '50');
  instructionsText.setAttribute('text-anchor', 'middle');
  instructionsText.setAttribute('font-size', '10');
  instructionsText.setAttribute('font-weight', 'normal');
  instructionsText.setAttribute('fill', '#ffffff');
  instructionsText.setAttribute('stroke', '#000000');
  instructionsText.setAttribute('stroke-width', '1.5');
  instructionsText.setAttribute('stroke-linecap', 'round');
  instructionsText.setAttribute('stroke-linejoin', 'round');
  instructionsText.setAttribute('opacity', '0.7');
  
  // Crear texto de fondo
  const instructionsBg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  instructionsBg.setAttribute('x', '50%');
  instructionsBg.setAttribute('y', '50');
  instructionsBg.setAttribute('text-anchor', 'middle');
  instructionsBg.setAttribute('font-size', '10');
  instructionsBg.setAttribute('font-weight', 'normal');
  instructionsBg.setAttribute('fill', '#000000');
  instructionsBg.setAttribute('opacity', '0.4');
  
  const lines = [
    '📏 MEDICIÓN DE DISTANCIAS',
    'PASO 1: Click en cualquier punto del dibujo',
    'PASO 2: Mueve el mouse para ver distancias en tiempo real',
    'PASO 3: Click en un segundo punto para medir entre ambos',
    '💡 La medición se limpia automáticamente'
  ];
  
  // Agregar líneas de texto
  lines.forEach((line, index) => {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan.setAttribute('x', '50%');
    tspan.setAttribute('dy', index === 0 ? '0' : '14');
    tspan.textContent = line;
    instructionsBg.appendChild(tspan);
    
    const tspanFg = tspan.cloneNode(true);
    instructionsText.appendChild(tspanFg);
  });
  
  svg.appendChild(instructionsBg);
  svg.appendChild(instructionsText);
  
  // Ocultar instrucciones después de 4 segundos
  setTimeout(() => {
    if (instructionsBg.parentNode) {
      instructionsBg.parentNode.removeChild(instructionsBg);
    }
    if (instructionsText.parentNode) {
      instructionsText.parentNode.removeChild(instructionsText);
    }
  }, 4000);
}

function clearMeasurement() {
  const svg = S('geom');
  if (!svg) return;
  
  // Remover línea
  if (measurementLine && measurementLine.parentNode) {
    measurementLine.parentNode.removeChild(measurementLine);
  }
  
  // Remover textos
  if (measurementText && measurementText.parentNode) {
    measurementText.parentNode.removeChild(measurementText);
  }
  if (measurementTextBg && measurementTextBg.parentNode) {
    measurementTextBg.parentNode.removeChild(measurementTextBg);
  }
  
  // Remover marcadores
  measurementMarkers.forEach(marker => {
    if (marker && marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
  
  // Remover textos del mouse
  if (mouseDistanceText && mouseDistanceText.parentNode) {
    mouseDistanceText.parentNode.removeChild(mouseDistanceText);
  }
  if (mouseDistanceTextBg && mouseDistanceTextBg.parentNode) {
    mouseDistanceTextBg.parentNode.removeChild(mouseDistanceTextBg);
  }
  
  // Desactivar seguimiento del mouse
  mouseTrackingActive = false;
  svg.removeEventListener('mousemove', handleMouseMove);
  
  // Limpiar variables principales
  measurementPoints = [];
  measurementLine = null;
  measurementText = null;
  measurementTextBg = null;
  measurementMarkers = [];
  
  // Limpiar timeout si existe
  if (measurementTimeout) {
    clearTimeout(measurementTimeout);
    measurementTimeout = null;
  }
  if (markerTimeout) {
    clearTimeout(markerTimeout);
    markerTimeout = null;
  }
}

function P(){
  const params = {
    V0: getValue("v0", 3.5), phi0: getValue("phi", 0), theta0: getValue("theta0", 3), gamma0: getValue("gamma0", 0),
    S: getValue("S", 0.12), rho: getValue("rho", 1025), mass: getValue("mass", 75), boardMass: getValue("boardMass", 5.5), foilMass: getValue("foilMass", 2.0), tailMass: getValue("tailMass", 0.5), LD: getValue("LD", 10),
    clslope: getValue("clslope", 0.08), clmax: getValue("clmax", 1.2), astall: getValue("stall", 15),
    freq: getValue("freq", 1.5), ampV: getValue("ampV", 0.5), ampT: getValue("ampT", 5), ampG: getValue("ampG", 5),
    phaseT: getValue("phaseT", 0), phaseG: getValue("phaseG", 180), dt: getValue("dtStep", 0.01),
    lambda: getValue("lambda", 0.5), d: getValue("dstance", 0.4), Af: getValue("Af", 100), Ab: getValue("Ab", 100),
    phaseF: getValue("phaseF", 0), phaseB: getValue("phaseB", 60), Gtheta: getValue("Gtheta", 0.004), Kphi: getValue("Kphi", 0.05),
    h0: getValue("h0", -0.2), cw: getValue("cw", 0.01), velscale: getValue("velscale", 1), vscale: getValue("vscale", 300), hscale: getValue("hscale", 80), fuerzascale: getValue("fuerzascale", 1),
    boardVolL: getValue("boardVolL", 0.02), boardArea: getValue("boardArea", 0.8), mastH: getValue("mastH", 0.85), boardLen: getValue("boardLen", 1.5),
    foilOffsetX: getValue("foilOffsetX", 0.3), foilOffsetZ: getValue("foilOffsetZ", 0.05), 
    tailOffsetX: getValue("tailOffsetX", 0.6), tailOffsetZ: getValue("tailOffsetZ", 0.02),
    foilChord: getValue("foilChord", 0.25), tailChord: getValue("tailChord", 0.15),
    tailArea: getValue("tailArea", 0.025), tailLength: getValue("tailLength", 0.6), tailIncidence: getValue("tailIncidence", 0),
    show:{ horizon: getChecked("showHorizon", true), feet: getChecked("showFeet", true), arc: getChecked("showArc", true), labels: getChecked("showLabels", true), flow: getChecked("showFlow", true), chord: getChecked("showChord", true), LD: getChecked("showLD", true), tail: getChecked("showTail", true), foil: getChecked("showFoil", true), tableVel: getChecked("showTableVel", true), phiFollow: getChecked("phiFollow", true), axesW: getChecked("showAxesW", false), axesB: getChecked("showAxesB", false), axesF: getChecked("showAxesF", false), weight: getChecked("showWeight", false), componentWeights: getChecked("showComponentWeights", false), buoy: getChecked("showBuoy", false), result: getChecked("showResultants", false), phiAngle: getChecked("showPhiAngle", true), geometry: getChecked("showGeometry", false) }
  };

  return params;
}

function labelRefresh(p, inst = null){
  try {
    S("v0v").textContent=(p.V0 || 0).toFixed(2); 
    
    // Calcular phi efectivo de manera consistente con la visualización
    let phiDisplay = p.phi0 || 0;
    if (p.show && p.show.phiFollow && inst && inst.Mr !== undefined) {
      phiDisplay = p.phi0 - (p.Kphi || 0) * inst.Mr;
    }
    S("phiv").textContent=phiDisplay.toFixed(1);
    
    S("thetav").textContent=(p.theta0 || 0).toFixed(1); S("gammav").textContent=(p.gamma0 || 0).toFixed(1);
    S("Sv").textContent=(p.S || 0).toFixed(3); S("rhov").textContent=(p.rho || 0).toFixed(0);
    S("tailAreav").textContent=(p.tailArea || 0).toFixed(3); S("tailLengthv").textContent=(p.tailLength || 0).toFixed(2);
    S("tailIncidencev").textContent=(p.tailIncidence || 0).toFixed(1);
    S("massv").textContent=(p.mass || 0).toFixed(0); 
    S("boardMassv").textContent=(p.boardMass || 0).toFixed(1);
    S("foilMassv").textContent=(p.foilMass || 0).toFixed(1);
    S("tailMassv").textContent=(p.tailMass || 0).toFixed(1);
    S("LDv").textContent=(p.LD || 0).toFixed(1);
    S("clslopev").textContent=(p.clslope || 0).toFixed(3); S("clmaxv").textContent=(p.clmax || 0).toFixed(2);
    S("stallv").textContent=(p.astall || 0).toFixed(1);
    S("freqv").textContent=(p.freq || 0).toFixed(2); S("ampVv").textContent=(p.ampV || 0).toFixed(2);
    S("ampTv").textContent=(p.ampT || 0).toFixed(1); S("ampGv").textContent=(p.ampG || 0).toFixed(1);
    S("phaseTv").textContent=(p.phaseT || 0).toFixed(0); S("phaseGv").textContent=(p.phaseG || 0).toFixed(0);
    S("lambdav").textContent=(p.lambda || 0).toFixed(2); S("dv").textContent=(p.d || 0).toFixed(2);
    S("Afv").textContent=(p.Af || 0).toFixed(0); S("Abv").textContent=(p.Ab || 0).toFixed(0);
    S("phifv").textContent=(p.phaseF || 0).toFixed(0); S("phibv").textContent=(p.phaseB || 0).toFixed(0);
    S("Gthv").textContent=(p.Gtheta || 0).toFixed(4); S("Kphiv").textContent=(p.Kphi || 0).toFixed(4);
    S("h0v").textContent=(p.h0 || 0).toFixed(2); S("cwv").textContent=(p.cw || 0).toFixed(0);
    S("vscalev").textContent=(p.vscale || 0).toFixed(0); S("hscalev").textContent=(p.hscale || 0).toFixed(0);
    S("velscalev").textContent=(p.velscale || 0).toFixed(1); S("fuerzascalev").textContent=(p.fuerzascale || 0).toFixed(1);
    S("volv").textContent=(p.boardVolL || 0).toFixed(0); S("areav").textContent=(p.boardArea || 0).toFixed(2);
    S("mastv").textContent=(p.mastH || 0).toFixed(2); S("Ltabv").textContent=(p.boardLen || 0).toFixed(2);
    S("foilOffsetXv").textContent=(p.foilOffsetX || 0).toFixed(2); S("foilOffsetZv").textContent=(p.foilOffsetZ || 0).toFixed(2);
    S("tailOffsetXv").textContent=(p.tailOffsetX || 0).toFixed(2); S("tailOffsetZv").textContent=(p.tailOffsetZ || 0).toFixed(2);
    S("foilChordv").textContent=(p.foilChord || 0).toFixed(2); S("tailChordv").textContent=(p.tailChord || 0).toFixed(2);
    S("dtv").textContent=(p.dt || 0).toFixed(3);
  } catch (e) {
    console.warn('Error in labelRefresh:', e.message);
  }
}


// ======== MODO FÍSICO (ODE) - RECOMENDADO ========
// ✅ Este es el modo principal y recomendado para simulaciones físicas.
// Calcula la dinámica real del sistema usando integración numérica de EDOs.
// Considera velocidades, aceleraciones y estado completo del sistema.
const dyn = {
  Itheta: 2.0,   // kg·m²
  cq: 4.0,       // N·m·s/rad
  ktheta: 20.0,  // N·m/rad
  Malpha: -8.0,  // N·m/rad (estabilizante con signo -)
  cu: 5.0        // N·s/m (amort. horizontal)
};

// Estado continuo (global W): x,z,u,w,theta,q
// ✅ Variables de estado físicas: posiciones, velocidades, ángulo y velocidad angular
// Esto permite calcular aceleraciones y dinámica real del sistema
let X = { x:0, z:-0.20, u:3.5, w:0.0, theta: 3*Math.PI/180, q:0.0 };

// Señales de pies (reutiliza riderFM)
function feetForcesODE(p, t){
  const fm = riderFM(p,t);  // {Ff,Fb,Mr}
  return fm;
}

// Aerohidrodinámica desde velocidades
function hydroFromState(p, st){
  let {u,w,theta} = st;
  const V = Math.hypot(u,w) || 1e-6;
  const gamma = Math.atan2(w,u);           // rad
  const alpha = theta - gamma;             // rad

  // Calcular coeficientes aerodinámicos con stall realista
  const alpha_deg = alpha*180/Math.PI;
  const { CL, CD } = aerodynamic_coefficients(alpha_deg, p.clslope, p.clmax, p.astall, p.LD);

  // Aplicar condición de foil fuera del agua
  const final_CL = (st.z >= 0) ? 0 : CL;
  const final_CD = (st.z >= 0) ? 0 : CD;

  // Calcular fuerzas usando los coeficientes mejorados
  const L = 0.5*p.rho*V*V*p.S*final_CL;
  const D = 0.5*p.rho*V*V*p.S*final_CD;

  // Componentes de fuerza del ala principal
  const Lx = L*(-Math.sin(gamma)), Ly = L*( Math.cos(gamma));
  const Dx = D*(-Math.cos(gamma)), Dy = D*(-Math.sin(gamma));

  // ===== CÁLCULO DE LA COLA =====
  // Ángulo de ataque efectivo de la cola (incluyendo incidencia)
  const tail_alpha_deg = alpha_deg + (p.tailIncidence || 0);
  const { CL: tail_CL, CD: tail_CD } = aerodynamic_coefficients(tail_alpha_deg, p.clslope, p.clmax, p.astall, p.LD);

  // Fuerzas aerodinámicas de la cola
  const tail_L = 0.5*p.rho*V*V*(p.tailArea || 0.025)*tail_CL;
  const tail_D = 0.5*p.rho*V*V*(p.tailArea || 0.025)*tail_CD;

  // Componentes de fuerza de la cola
  const tail_Lx = tail_L*(-Math.sin(gamma));
  const tail_Ly = tail_L*( Math.cos(gamma));
  const tail_Dx = tail_D*(-Math.cos(gamma));
  const tail_Dy = tail_D*(-Math.sin(gamma));

  // Fuerzas totales (ala principal + cola)
  const total_L = L + tail_L;
  const total_D = D + tail_D;
  const total_Lx = Lx + tail_Lx;
  const total_Ly = Ly + tail_Ly;
  const total_Dx = Dx + tail_Dx;
  const total_Dy = Dy + tail_Dy;

  // Momento de cabeceo generado por la cola
  const tail_moment_arm = p.tailLength || 0.6; // brazo de momento
  const tail_pitch_moment = -tail_L * tail_moment_arm; // momento estabilizador (signo negativo)
  return {alpha, gamma, V, L: total_L, D: total_D, Lx: total_Lx, Ly: total_Ly, Dx: total_Dx, Dy: total_Dy, tailMoment: tail_pitch_moment, tail_L, tail_D, tail_Lx, tail_Ly, tail_Dx, tail_Dy};
}

// Empuje de Arquímedes (usa tu buoyancy existente con z=h)
function buoyancyZ(p, z){
  const B = buoyancy(p, z); // {Fb, draft,...}
  return {Fb: B.Fb, draft: B.draft};
}

// Momento total de cabeceo
function totalMoment(p, hydro, Mrider, theta, q){
  const Mhyd = dyn.Malpha * (hydro.alpha);       // α en rad
  const Mtail = hydro.tailMoment || 0;          // Momento de la cola
  return Mhyd + Mtail + Mrider - dyn.cq*q - dyn.ktheta*(theta - 0);
}

// Función para calcular el momento de inercia efectivo del sistema completo
function calculateEffectiveMomentOfInertia(p) {
  const cm = calculateCenterOfMass(p);
  
  // Masas de cada componente
  const boardMass = p.mass * 0.7;
  const foilMass = p.mass * 0.25;
  const tailMass = p.mass * 0.05;
  
  // Dimensiones de la tabla
  const boardLength = p.boardLen || 1.4;
  const boardWidth = 0.4;  // Ancho aproximado
  
  // Dimensiones del foil
  const foilChord = p.foilChord || Math.sqrt(p.S || 0.15);
  const foilSpan = (p.S || 0.15) / foilChord;
  
  // Dimensiones de la cola
  const tailChord = p.tailChord || Math.sqrt(p.tailArea || 0.025);
  const tailSpan = (p.tailArea || 0.025) / tailChord;
  
  // Momentos de inercia individuales alrededor de sus centros
  const I_board = (1/12) * boardMass * boardLength * boardLength;
  const I_foil = (1/12) * foilMass * (foilChord * foilChord + foilSpan * foilSpan);
  const I_tail = (1/12) * tailMass * (tailChord * tailChord + tailSpan * tailSpan);
  
  // Posiciones en coordenadas LOCALES
  const boardX = 0, boardZ = 0;
  const foilX = p.foilOffsetX || 0.3;
  const foilZ = p.foilOffsetZ || 0.05;
  const tailX = foilX + (p.tailOffsetX || 0.6);
  const tailZ = foilZ + (p.tailOffsetZ || 0.02);
  
  // Teorema de ejes paralelos: trasladar al centro de masa
  // Solo necesitamos la distancia horizontal para el momento de inercia de pitch
  const I_total = I_board + boardMass * Math.pow(cm.x - boardX, 2) +
                  I_foil + foilMass * Math.pow(cm.x - foilX, 2) +
                  I_tail + tailMass * Math.pow(cm.x - tailX, 2);
  
  // Asegurar un valor mínimo razonable
  return Math.max(I_total, 0.5);
}

// Función para convertir coordenadas locales de la tabla a coordenadas globales
function localToGlobal(localX, localZ, phi, mastH, hscale, vscale, cx, cy) {
  // Validar parámetros de entrada
  if (isNaN(localX) || isNaN(localZ) || isNaN(phi) || isNaN(mastH) || isNaN(hscale) || isNaN(vscale) || isNaN(cx) || isNaN(cy)) {
    console.warn('localToGlobal recibió parámetros NaN:', { localX, localZ, phi, mastH, hscale, vscale, cx, cy });
    return { x: cx || 0, y: cy || 0 }; // Devolver coordenadas base si hay NaN
  }

  // phi en radianes
  // localX: distancia horizontal desde el centro de la tabla (positivo = hacia adelante)
  // localZ: distancia vertical desde la tabla (positivo = hacia arriba)
  
  // Dirección del mástil (desde tabla hacia arriba - dirección opuesta al original)
  const mastDirX = Math.sin(phi);
  const mastDirY = Math.cos(phi);
  
  // Posición base del extremo del mástil
  const foilDistance = Math.min(200, mastH * hscale);
  const baseX = cx + mastDirX * foilDistance;
  const baseY = cy + mastDirY * foilDistance;
  
  // Convertir offsets locales a píxeles
  const offsetXPx = localX * hscale;
  const offsetZPx = localZ * vscale;
  
  // Dirección perpendicular al mástil (ajustada para el nuevo sistema)
  const perpDirX = Math.cos(phi);
  const perpDirY = -Math.sin(phi);
  
  // Aplicar transformación de coordenadas locales a globales
  const globalX = baseX + mastDirX * offsetXPx + perpDirX * offsetZPx;
  const globalY = baseY + mastDirY * offsetXPx + perpDirY * offsetZPx;
  
  return { x: globalX, y: globalY };
}

// Función para calcular el centro de masa del sistema
function calculateCenterOfMass(p) {
  // Masas independientes de cada componente
  const riderMass = p.mass || 75;  // Masa del rider
  const boardMass = p.boardMass || 5.5;  // Masa de la tabla
  const foilMass = p.foilMass || 2.0;    // Masa del foil
  const tailMass = p.tailMass || 0.5;    // Masa de la cola
  
  // Masa total del sistema
  const totalMass = riderMass + boardMass + foilMass + tailMass;
  
  // Posiciones en coordenadas LOCALES de la tabla
  // Centro de la tabla: origen del sistema local
  const boardX = 0, boardZ = 0;
  
  // Foil: offset desde el centro de la tabla
  const foilX = p.foilOffsetX || 0.3;  // Distancia horizontal local
  const foilZ = p.foilOffsetZ || 0.05; // Altura local sobre la tabla
  
  // Cola: offset relativo al foil
  const tailX = foilX + (p.tailOffsetX || 0.6); // Distancia desde tabla hasta cola
  const tailZ = foilZ + (p.tailOffsetZ || 0.02); // Altura relativa
  
  // Calcular posiciones de masa para cada componente
  // Centro de masa en coordenadas LOCALES
  // Rider se asume en el centro de la tabla (0, 0)
  const riderX = 0, riderZ = 0;
  const cmX = (riderMass * riderX + boardMass * boardX + foilMass * foilX + tailMass * tailX) / totalMass;
  const cmZ = (riderMass * riderZ + boardMass * boardZ + foilMass * foilZ + tailMass * tailZ) / totalMass;
  
  return { x: cmX, z: cmZ };
}

// Función para dibujar la geometría del sistema (opcional, para visualización)
function drawSystemGeometry(svg, p, scale, cx, cy) {
  console.log('=== INICIO drawSystemGeometry ===');
  console.log('Parámetros:', { scale, cx, cy, phi0: p.phi0 });
  
  // Dibujar geometría del sistema siempre (no solo cuando está habilitado el checkbox)
  // if (!p.show.geometry) return;  // Comentado para que se dibuje siempre
  
  // Calcular phi efectivo para la transformación (usar p.phi0 directamente ya que no tenemos acceso a inst)
  const phiDeg = p.phi0 || 0;
  const phi = phiDeg * Math.PI / 180;
  
  // Calcular posiciones usando coordenadas locales
  const cm = calculateCenterOfMass(p);
  const cmGlobal = localToGlobal(cm.x, cm.z, phi, p.mastH, p.hscale, p.vscale, cx, cy);
  
  // Dibujar centro de masa con indicador interactivo
  const cmCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  cmCircle.setAttribute('cx', cmGlobal.x);
  cmCircle.setAttribute('cy', cmGlobal.y);
  cmCircle.setAttribute('r', Math.max(4, 8 * (scale / 600))); // Radio más grande
  cmCircle.setAttribute('fill', '#ff4444');
  cmCircle.setAttribute('stroke', '#000');
  cmCircle.setAttribute('stroke-width', Math.max(1, 2 * (scale / 600))); // Borde más grueso
  cmCircle.setAttribute('opacity', '0.8');
  cmCircle.style.cursor = 'pointer'; // Cambiar cursor al pasar el mouse

  // Crear tooltip para el centro de masa
  const cmTooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  cmTooltipText.setAttribute('x', '0');
  cmTooltipText.setAttribute('y', '0');
  cmTooltipText.setAttribute('font-size', '12');
  cmTooltipText.setAttribute('fill', '#000');
  cmTooltipText.setAttribute('font-weight', 'bold');
  cmTooltipText.setAttribute('visibility', 'hidden');
  cmTooltipText.setAttribute('pointer-events', 'none');

  // Crear rectángulo de fondo para el tooltip
  const cmTooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  cmTooltipBg.setAttribute('x', '0');
  cmTooltipBg.setAttribute('y', '0');
  cmTooltipBg.setAttribute('width', '0');
  cmTooltipBg.setAttribute('height', '0');
  cmTooltipBg.setAttribute('fill', '#ffffff');
  cmTooltipBg.setAttribute('stroke', '#000');
  cmTooltipBg.setAttribute('stroke-width', '1');
  cmTooltipBg.setAttribute('rx', '4');
  cmTooltipBg.setAttribute('visibility', 'hidden');
  cmTooltipBg.setAttribute('pointer-events', 'none');

    // Crear líneas de texto usando tspan para mejor control
    const cmLines = [
      'Centro de Masa del Sistema',
      `W(${cmGlobal.x.toFixed(1)}, ${cmGlobal.y.toFixed(1)})`,
      'Sistema W: Y=0 en nivel del agua',
      'Y > 0: arriba del agua',
      'Y < 0: abajo del agua'
    ];  // Eventos de mouse para el centro de masa
  cmCircle.addEventListener('mouseenter', function(e) {
    const mouseX = e.clientX - svg.getBoundingClientRect().left;
    const mouseY = e.clientY - svg.getBoundingClientRect().top;

    // Calcular tamaño del texto para el fondo
    const lines = cmLines;
    const maxLineLength = Math.max(...lines.map(line => line.length));
    const textWidth = maxLineLength * 6 + 20; // Menos ancho para recuadro más estrecho
    const textHeight = lines.length * 18 + 16; // Más alto para mejor espaciado de varias líneas

    // Posicionar tooltip arriba y a la derecha del mouse
    const tooltipX = mouseX + 20;
    const tooltipY = mouseY - textHeight - 15;

    // Limpiar tspan anteriores
    while (cmTooltipText.firstChild) {
      cmTooltipText.removeChild(cmTooltipText.firstChild);
    }

    // Crear tspan para cada línea con posicionamiento consistente
    cmLines.forEach((line, index) => {
      const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.setAttribute('x', tooltipX + 10);
      tspan.setAttribute('y', tooltipY + 20 + (index * 16)); // Mejor espaciado vertical
      tspan.textContent = line;
      cmTooltipText.appendChild(tspan);
    });

    cmTooltipBg.setAttribute('x', tooltipX);
    cmTooltipBg.setAttribute('y', tooltipY);
    cmTooltipBg.setAttribute('width', textWidth);
    cmTooltipBg.setAttribute('height', textHeight);
    cmTooltipBg.setAttribute('visibility', 'visible');

    // El texto ya está posicionado en los tspan
    cmTooltipText.setAttribute('visibility', 'visible');
  });

  cmCircle.addEventListener('mouseleave', function() {
    cmTooltipText.setAttribute('visibility', 'hidden');
    cmTooltipBg.setAttribute('visibility', 'hidden');
  });

  // Agregar elementos al SVG
  svg.appendChild(cmTooltipBg);
  svg.appendChild(cmTooltipText);
  svg.appendChild(cmCircle);

  // Cruz para marcar el centro exacto
  const crossSize = Math.max(3, 6 * (scale / 600));
  const cross = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  // Línea horizontal
  const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  hLine.setAttribute('x1', cmGlobal.x - crossSize);
  hLine.setAttribute('y1', cmGlobal.y);
  hLine.setAttribute('x2', cmGlobal.x + crossSize);
  hLine.setAttribute('y2', cmGlobal.y);
  hLine.setAttribute('stroke', '#fff');
  hLine.setAttribute('stroke-width', Math.max(1, 2 * (scale / 600)));
  cross.appendChild(hLine);

  // Línea vertical
  const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  vLine.setAttribute('x1', cmGlobal.x);
  vLine.setAttribute('y1', cmGlobal.y - crossSize);
  vLine.setAttribute('x2', cmGlobal.x);
  vLine.setAttribute('y2', cmGlobal.y + crossSize);
  vLine.setAttribute('stroke', '#fff');
  vLine.setAttribute('stroke-width', Math.max(1, 2 * (scale / 600)));
  cross.appendChild(vLine);

  svg.appendChild(cross);
  
  // Líneas de referencia para mostrar posiciones relativas
  // if (p.show.geometry) {  // Comentado para que se dibuje siempre
  if (true) {  // Siempre dibujar las líneas de referencia
    const boardScreen = { screenX: cx, screenY: cy }; // Centro de la tabla
    const foilScreen = localToGlobal(p.foilOffsetX || 0.3, p.foilOffsetZ || 0.05, phi, p.mastH, p.hscale, p.vscale, cx, cy);
    const tailScreen = localToGlobal(
      (p.foilOffsetX || 0.3) + (p.tailOffsetX || 0.6),
      (p.foilOffsetZ || 0.05) + (p.tailOffsetZ || 0.02),
      phi, p.mastH, p.hscale, p.vscale, cx, cy
    );
    
    // Líneas punteadas para mostrar posiciones
    const line = (x1, y1, x2, y2, color = '#666', dash = '2,2') => {
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', x1); l.setAttribute('y1', y1);
      l.setAttribute('x2', x2); l.setAttribute('y2', y2);
      l.setAttribute('stroke', color);
      l.setAttribute('stroke-width', Math.max(0.5, 1 * (scale / 600))); // Escalar el ancho de línea
      l.setAttribute('stroke-dasharray', dash);
      svg.appendChild(l);
      return l;
    };
    
    // Líneas desde CM a cada componente
    line(cmGlobal.x, cmGlobal.y, boardScreen.screenX, boardScreen.screenY, '#666');
    line(cmGlobal.x, cmGlobal.y, foilScreen.x, foilScreen.y, '#2e7d32');
    line(cmGlobal.x, cmGlobal.y, tailScreen.x, tailScreen.y, '#ff9800');
  }
  console.log('=== FIN drawSystemGeometry ===');
}

// Función para calcular la masa total del sistema
function getTotalMass(p) {
  const riderMass = p.mass || 75;
  const boardMass = p.boardMass || 5.5;
  const foilMass = p.foilMass || 2.0;
  const tailMass = p.tailMass || 0.5;
  return riderMass + boardMass + foilMass + tailMass;
}

// Función de presets para configuraciones de masa comunes
function applyMassPreset(preset) {
  const presets = {
    'light': { boardMass: 4.2, foilMass: 1.5, tailMass: 0.3 },  // Setup ligero para freestyle
    'standard': { boardMass: 5.5, foilMass: 2.0, tailMass: 0.5 }, // Setup estándar
    'heavy': { boardMass: 6.8, foilMass: 2.5, tailMass: 0.7 },   // Setup pesado para downwind
    'race': { boardMass: 4.8, foilMass: 1.8, tailMass: 0.4 },    // Setup de competición
    'freestyle': { boardMass: 4.0, foilMass: 1.3, tailMass: 0.25 } // Setup freestyle extremo
  };
  
  return presets[preset] || presets['standard'];
}

// RHS: Xdot = f(t, X, p)
function rhs(t, st, p){
  const {Ff,Fb,Mr} = feetForcesODE(p,t);
  const hydro = hydroFromState(p, st);
  const buoy = buoyancyZ(p, st.z);

  const Fx = hydro.Lx + hydro.Dx - dyn.cu*st.u;            // + Fwing_x si se quiere
  const Fz = hydro.Ly + hydro.Dy + buoy.Fb - getTotalMass(p)*9.81 - p.cw*st.w;

  const M = totalMoment(p, hydro, Mr, st.theta, st.q);

  // Calcular momento de inercia efectivo del sistema completo
  const I_effective = calculateEffectiveMomentOfInertia(p);

  const dx  = st.u;
  const dz  = st.w;
  const du  = Fx / getTotalMass(p);
  const dw  = Fz / getTotalMass(p);
  const dth = st.q;
  const dq  = M  / I_effective;

  return { dx, dz, du, dw, dth, dq,
           out: { alpha:hydro.alpha*180/Math.PI, gamma:hydro.gamma*180/Math.PI, L:hydro.L, D:hydro.D,
                  Th: hydro.Lx + hydro.Dx, Vert: hydro.Ly + hydro.Dy, Fb: buoy.Fb, Mr,
                  tail_L: hydro.tail_L, tail_D: hydro.tail_D, tail_Lx: hydro.tail_Lx, tail_Ly: hydro.tail_Ly, tail_Dx: hydro.tail_Dx, tail_Dy: hydro.tail_Dy } };
}

// Integrador clásico RK4
function rk4Step(st, dt, p, t){
  function add(a,k,s){ return { x:a.x+s*k.dx*dt, z:a.z+s*k.dz*dt, u:a.u+s*k.du*dt, w:a.w+s*k.dw*dt, theta:a.theta+s*k.dth*dt, q:a.q+s*k.dq*dt }; }
  const k1 = rhs(t, st, p);
  const k2 = rhs(t+dt/2, add(st,k1,0.5), p);
  const k3 = rhs(t+dt/2, add(st,k2,0.5), p);
  const k4 = rhs(t+dt,   add(st,k3,1.0), p);
  const xn = {
    x: st.x + dt*(k1.dx + 2*k2.dx + 2*k3.dx + k4.dx)/6,
    z: st.z + dt*(k1.dz + 2*k2.dz + 2*k3.dz + k4.dz)/6,
    u: st.u + dt*(k1.du + 2*k2.du + 2*k3.du + k4.du)/6,
    w: st.w + dt*(k1.dw + 2*k2.dw + 2*k3.dw + k4.dw)/6,
    theta: st.theta + dt*(k1.dth + 2*k2.dth + 2*k3.dth + k4.dth)/6,
    q: st.q + dt*(k1.dq + 2*k2.dq + 2*k3.dq + k4.dq)/6
  };
  // exportar observables (del último paso)
  xn._out = k4.out;
  return xn;
}
// señales de pies (senos recortados a positivo; empujan hacia la tabla)
function riderFM(p,t){
  const W=p.mass*9.81; const w=2*Math.PI*p.freq;
  let Ff=p.lambda*W, Fb=(1-p.lambda)*W;
  const qf=Math.sin(w*t + p.phaseF*Math.PI/180);
  const qb=Math.sin(w*t + p.phaseB*Math.PI/180);
  Ff += Math.max(0, p.Af*qf);
  Fb += Math.max(0, p.Ab*qb);
  Ff=Math.max(0,Ff); Fb=Math.max(0,Fb);
  const Mr=(Fb-Ff)*(p.d/2); // más fuerza delante ⇒ morro abajo con θ = θ0 − Gθ·Mr
  return {Ff,Fb,Mr};
}

function CL_from_alpha(a, slope, clmax, astall){
  const aa = Math.abs(a);

  // Modelo lineal hasta el stall
  if (aa <= astall) {
    return Math.sign(a) * Math.min(slope * aa, clmax);
  }

  // Después del stall: caída abrupta y recuperación gradual
  // Modelo más realista basado en datos aerodinámicos
  const excess = aa - astall;
  const stall_width = 8.0; // grados de ancho de la zona de stall

  if (excess <= stall_width) {
    // Zona de transición: caída rápida del CL
    const stall_factor = 1.0 - (excess / stall_width) * 0.8; // Caída del 80% en la zona de stall
    const base_cl = slope * astall;
    return Math.sign(a) * Math.max(0.1, base_cl * stall_factor); // Mínimo CL de 0.1 para evitar valores negativos extremos
  } else {
    // Post-stall: recuperación muy gradual
    const recovery_factor = Math.max(0.05, 1.0 - (excess - stall_width) / 20.0); // Recuperación lenta
    const base_cl = slope * astall * 0.2; // CL muy reducido post-stall
    return Math.sign(a) * Math.max(0.05, base_cl * recovery_factor);
  }
}

// Función mejorada para calcular coeficientes aerodinámicos con stall realista
function aerodynamic_coefficients(alpha_deg, slope, clmax, astall, ld_ratio) {
  const aa = Math.abs(alpha_deg);

  // Calcular CL usando la función mejorada
  const CL = CL_from_alpha(alpha_deg, slope, clmax, astall);

  // Calcular CD considerando el stall
  let CD;
  if (aa <= astall) {
    // Régimen lineal: CD = CL / (L/D)
    CD = Math.abs(CL) / Math.max(1e-6, ld_ratio);
  } else {
    // Stall: aumento significativo del drag
    const excess = aa - astall;
    const stall_width = 8.0;

    if (excess <= stall_width) {
      // Zona de stall: drag aumenta rápidamente
      const base_cd = clmax / Math.max(1e-6, ld_ratio);
      const stall_drag_factor = 1.0 + (excess / stall_width) * 2.0; // Aumento hasta 3x el drag
      CD = base_cd * stall_drag_factor;
    } else {
      // Post-stall: drag muy alto
      const base_cd = clmax / Math.max(1e-6, ld_ratio);
      const post_stall_factor = 2.5 + (excess - stall_width) / 10.0; // Drag muy alto post-stall
      CD = base_cd * Math.min(post_stall_factor, 5.0); // Máximo 5x el drag normal
    }
  }

  return { CL, CD };
}

// Arquímedes / calado (rectángulo)
function buoyancy(p, h){
  const Vb = Math.max(0, p.boardVolL/1000);
  const Ab = Math.max(1e-6, p.boardArea);
  const tb = Math.min(1.0, Vb/Ab);
  const Lm = Math.max(0.8, p.boardLen);
  const y_anchor = h + p.mastH; // marco W (y=0 superficie)
  // Para buoyancy, usar phi0 directamente (no phiFollow) ya que no tenemos acceso a inst.Mr
  let phiDeg = p.phi0 || 0;

  // Validar que no haya NaN en phiDeg
  if (isNaN(phiDeg)) {
    console.warn('NaN detectado en phiDeg (buoyancy), usando valor por defecto');
    phiDeg = 0;
  }

  const phi = phiDeg*Math.PI/180;
  const tY=Math.sin(phi), nY=Math.cos(phi);
  const y1 = y_anchor - (Lm/2)*tY - (tb/2)*nY;
  const y2 = y_anchor + (Lm/2)*tY - (tb/2)*nY;
  const y3 = y_anchor + (Lm/2)*tY + (tb/2)*nY;
  const y4 = y_anchor - (Lm/2)*tY + (tb/2)*nY;
  const yTop = Math.max(y1,y2,y3,y4);
  const yBot = Math.min(y1,y2,y3,y4);
  let draft=0;
  if(yBot<0){
    const subTop = Math.min(0, yTop);
    const subBot = yBot;
    draft = Math.min(tb, Math.abs(subTop - subBot));
  } else draft=0;
  const Fb = p.rho*9.81*Ab*draft;
  return {Fb, draft, tb, y_anchor, phiDeg};
}

function resetState(){ 
  const p=P(); 
  h=p.h0; 
  wv=0; 
  t=0; 
  X = { x:0, z:-0.20, u:3.5, w:0.0, theta: 3*Math.PI/180, q:0.0 }; // Reiniciar estado ODE
  cyc_acc={na:0,a:0,th:0,L:0,Th:0,Fr:0}; 
  // Limpiar mediciones al reiniciar estado
  clearMeasurement();
  draw(); 
}

function togglePlayPause(){
  const button = S('playPause');
  if(playing){
    // Está reproduciendo, pausar
    stopPlay();
    button.textContent = '▶ Play';
    button.innerHTML = '▶ Play';
  } else {
    // Está pausado, reproducir
    startPlay();
    button.textContent = '⏸ Pause';
    button.innerHTML = '⏸ Pause';
  }
}

function startPlay(){
  if(playing) return;
  playing=setInterval(()=> step(+1), 30);
  // Actualizar el texto del botón cuando se inicia automáticamente
  const button = S('playPause');
  if(button){
    button.textContent = '⏸ Pause';
    button.innerHTML = '⏸ Pause';
  }
}
function stopPlay(){
  if(playing){
    clearInterval(playing);
    playing=null;
    // Actualizar el texto del botón cuando se pausa automáticamente
    const button = S('playPause');
    if(button){
      button.textContent = '▶ Play';
      button.innerHTML = '▶ Play';
    }
  }
}


function step(dir){
  const p=P(); T=1/Math.max(0.01,p.freq);
  const dt=Math.max(0.0005, +p.dt||T/240);
  const old_t=t;
  t=(t+dir*dt)%T; if(t<0) t+=T;
  // wrap for history cycle detection
  let crossed = false;
  if(dir>0 && (old_t%T) > (t%T)) crossed = true;
  if(dir<0 && (old_t%T) < (t%T)) crossed = true;

  let ins;
  // Integrar ODE (modo físico recomendado)
  const sign = (dir>=0)? 1 : -1;
  X = rk4Step(X, sign*dt, p, t);
  h = X.z;  // usar z como heave para el dibujo (m)
  wv = X.w; // actualizar velocidad vertical global para consistencia
  
  // Obtener fuerzas del rider para el modo ODE
  const {Ff, Fb} = feetForcesODE(p, t);
  
  ins = { alpha:X._out.alpha, gamma:X._out.gamma, L:X._out.L, D:X._out.D,
          Th:X._out.Th, Vert:X._out.Vert, V:X.u, Ff, Fb,
          Sup: ((X._out.Vert + buoyancy(p,h).Fb) / (getTotalMass(p)*9.81))*100,
          theta_eff: X.theta*180/Math.PI, Mr:X._out.Mr,
          tail_L: X._out.tail_L, tail_D: X._out.tail_D, tail_Lx: X._out.tail_Lx, tail_Ly: X._out.tail_Ly, tail_Dx: X._out.tail_Dx, tail_Dy: X._out.tail_Dy };

  S('tVal').textContent=((t%T+T)%T).toFixed(2);

  // histórico acumulado (sólo cuando avanzamos)
  if(dir>0){
    cyc_acc.na++; cyc_acc.a+=ins.alpha; cyc_acc.th+=ins.theta_eff; cyc_acc.L+=ins.L; cyc_acc.Th+=ins.Th; cyc_acc.Fr+=((ins.Ff || 0) + (ins.Fb || 0));
    if(crossed) endCyclePush();
  }
  draw(ins);
}


function draw(instOpt){
  try {
    const p = P(); 
    
    // Verificar que p esté definido correctamente
    if (!p || typeof p !== 'object') {
      console.error('Parámetros p no válidos:', p);
      return;
    }
  
  let inst;
  if(instOpt){
    inst = instOpt;
  } else {
    try {
      // Modo ODE: usar condiciones iniciales consistentes
      const initialState = { x:0, z:-0.20, u:3.5, w:0.0, theta: 3*Math.PI/180, q:0.0 };
      const hydro = hydroFromState(p, initialState);
      const {Ff, Fb, Mr} = feetForcesODE(p, 0); // Usar t=0 para condiciones iniciales
      const buoy = buoyancyZ(p, initialState.z);
      inst = { 
        alpha: hydro.alpha*180/Math.PI, 
        gamma: hydro.gamma*180/Math.PI, 
        L: hydro.L, 
        D: hydro.D,
        Th: hydro.Lx + hydro.Dx,
        Vert: hydro.Ly + hydro.Dy,
        V: hydro.V,
        Ff, Fb,
        theta_eff: initialState.theta*180/Math.PI,
        Mr,
        Sup: ((hydro.Ly + hydro.Dy + buoy.Fb) / (getTotalMass(p)*9.81))*100,
        tail_L: hydro.tail_L,
        tail_D: hydro.tail_D,
        tail_Lx: hydro.tail_Lx,
        tail_Ly: hydro.tail_Ly,
        tail_Dx: hydro.tail_Dx,
        tail_Dy: hydro.tail_Dy
      };
    } catch (error) {
      console.error('Error calculating inst:', error);
      // Fallback: definir inst con valores por defecto
      inst = {
        alpha: 0, gamma: 0, L: 0, D: 0, Th: 0, Vert: 0, V: 3.5,
        Ff: 0, Fb: 0, theta_eff: 3, Mr: 0, Sup: 0,
        tail_L: 0, tail_D: 0, tail_Lx: 0, tail_Ly: 0, tail_Dx: 0, tail_Dy: 0
      };
    }
  }
  
  labelRefresh(p, inst);
  
  const B = buoyancy(p,h);

  // KPIs
  S("alphaOut").textContent=fmt(inst.alpha,1);
  S("thetaEffOut").textContent=fmt(inst.theta_eff,1);
  S("LOut").textContent=fmt(inst.L,0);
  S("LvOut").textContent=fmt(inst.L * Math.cos(inst.gamma * Math.PI/180), 0); // Componente vertical de L
  S("FrOut").textContent=fmt((inst.Ff || 0) + (inst.Fb || 0), 0); // Fuerza vertical total del rider
  S("DOut").textContent=fmt(inst.D,0);
  S("ThOut").textContent=fmt(inst.Th,1);
  S("SupOut").textContent=fmt(inst.Sup,0);
  S("MrOut").textContent=fmt(inst.Mr,1);
  S("hOut").textContent=h.toFixed(3);
  S("BOut").textContent=Math.round(B.Fb).toString();
  S("draftOut").textContent=B.draft.toFixed(3);
  S("VTableOut").textContent=fmt(Math.sqrt(inst.V*inst.V + wv*wv), 2); // Velocidad total de la tabla

  const svg=S("geom"); svg.innerHTML="";
  // Limpiar mediciones anteriores al redibujar
  clearMeasurement();
  
  const wpx=svg.clientWidth||600, hpx=svg.clientHeight||420;
  const scale = p.vscale;
  const cx=wpx*0.50 + pan.x;
  const horizonY=hpx*0.45 + pan.y;
  const cy=(hpx*0.62 + pan.y) - (playing ? h : p.h0)*scale;

  // Verificar coordenadas de dibujo (pantalla en píxeles)
  console.log('Coordenadas de pantalla (px):', { cx, cy, scale, wpx, hpx, pan, h });

  // DEBUG: Mostrar parámetros de visualización
  // console.log('DEBUG Viewport:', {
  //   wpx, hpx, scale, pan,
  //   cx, cy, horizonY, h,
  //   svgClientWidth: svg.clientWidth,
  //   svgClientHeight: svg.clientHeight
  // });

  // Calcular coordenadas físicas del centro de la tabla para KPIs
  // Primero calcular la posición del ancla de la tabla (igual que en el dibujo)
  const phiDegCalc = p.show.phiFollow ? (p.phi0 - p.Kphi*inst.Mr) : p.phi0;
  const phiCalc = phiDegCalc * Math.PI / 180;
  const foilDistanceCalc = Math.min(200, p.mastH * p.hscale);
  const xAnchorCalc = cx - Math.sin(phiCalc) * foilDistanceCalc;
  const yAnchorCalc = cy - Math.cos(phiCalc) * foilDistanceCalc;
  
  // El centro de la tabla está en el punto de anclaje
  const tableCenterX_px = xAnchorCalc;
  const tableCenterY_px = yAnchorCalc;
  
  // Convertir a coordenadas físicas
  const tableX = (tableCenterX_px - wpx*0.50) / scale;  // Posición horizontal física (m)
  const tableY = (hpx*0.62 - tableCenterY_px) / scale;  // Altura física del centro de la tabla (m)
  const tableZ = 0;                                     // Posición en profundidad (m)

  // DEBUG: Mostrar coordenadas calculadas
  // console.log('DEBUG KPIs Tabla:', {
  //   phiDegCalc, phiCalc, foilDistanceCalc,
  //   xAnchorCalc, yAnchorCalc,
  //   tableCenterX_px, tableCenterY_px,
  //   tableX, tableY, tableZ,
  //   cx, cy, wpx, hpx, scale,
  //   h, inst_Mr: inst.Mr, p_Kphi: p.Kphi
  // });

  // Actualizar KPIs de posición de la tabla
  S("tableX").textContent = tableX.toFixed(3);
  S("tableY").textContent = tableY.toFixed(3);
  S("tableZ").textContent = tableZ.toFixed(3);
  
  // Actualizar KPIs del centro de masa
  const cm = calculateCenterOfMass(p);
  S("cmXOut").textContent = cm.x.toFixed(3);
  S("cmZOut").textContent = cm.z.toFixed(3);

  // helpers
  const line=(x1,y1,x2,y2,stroke="#000",w2=1)=>{const L=document.createElementNS('http://www.w3.org/2000/svg','line'); L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2); L.setAttribute('stroke',stroke);L.setAttribute('stroke-width',w2); svg.appendChild(L); return L; };
  const text=(x,y,t,fs=10)=>{ if(!p.show.labels) return; const T=document.createElementNS('http://www.w3.org/2000/svg','text'); T.setAttribute('x',x);T.setAttribute('y',y);T.setAttribute('font-size',fs); T.textContent=t; svg.appendChild(T); return T; };
  function ensureMarker(color){
    const id='arr_'+color.replace(/[^a-zA-Z0-9]/g,'_');
    let defs = svg.querySelector('defs'); if(!defs){ defs=document.createElementNS('http://www.w3.org/2000/svg','defs'); svg.appendChild(defs); }
    let m = svg.querySelector('#'+id);
    if(!m){
      m=document.createElementNS('http://www.w3.org/2000/svg','marker');
      m.setAttribute('id',id); m.setAttribute('markerWidth','6'); m.setAttribute('markerHeight','6');
      m.setAttribute('refX','5'); m.setAttribute('refY','3'); m.setAttribute('orient','auto'); m.setAttribute('markerUnits','strokeWidth');
      const tri=document.createElementNS('http://www.w3.org/2000/svg','path'); tri.setAttribute('d','M0,0 L0,6 L6,3 z'); tri.setAttribute('fill',color);
      m.appendChild(tri); defs.appendChild(m);
    }
    return 'url(#'+id+')';
  }
  function arrow2(x1,y1,x2,y2,stroke='#000',w2=2, tooltip=''){
    // Validar que las coordenadas no sean NaN
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
      console.warn('arrow2 recibió coordenadas NaN:', { x1, y1, x2, y2 });
      return; // No dibujar la flecha si hay coordenadas inválidas
    }

    console.log('Creando flecha:', { x1, y1, x2, y2, stroke, w2 });
    
    // Obtener referencia al SVG
    const svg = S("geom");
    if (!svg) {
      console.warn('No se pudo encontrar el elemento SVG con id "geom"');
      return;
    }
    
    const L=document.createElementNS('http://www.w3.org/2000/svg','line');
    L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2);
    L.setAttribute('stroke',stroke);L.setAttribute('stroke-width',w2);
    L.setAttribute('marker-end', ensureMarker(stroke));
    
    // Agregar tooltip personalizado si se proporciona
    if(tooltip){
      // Crear elemento de texto para el tooltip
      const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tooltipText.setAttribute('x', '0');
      tooltipText.setAttribute('y', '0');
      tooltipText.setAttribute('font-size', '12');
      tooltipText.setAttribute('fill', '#000000'); // Texto negro para fondo blanco
      tooltipText.setAttribute('font-weight', 'bold');
      tooltipText.setAttribute('visibility', 'hidden');
      tooltipText.setAttribute('pointer-events', 'none');
      // No establecer textContent inicialmente para evitar conflictos con tspans
      
      // Crear rectángulo de fondo para el tooltip
      const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      tooltipBg.setAttribute('x', '0');
      tooltipBg.setAttribute('y', '0');
      tooltipBg.setAttribute('width', '0');
      tooltipBg.setAttribute('height', '0');
      tooltipBg.setAttribute('fill', '#ffffff'); // Fondo blanco
      tooltipBg.setAttribute('stroke', '#000');
      tooltipBg.setAttribute('stroke-width', '1');
      tooltipBg.setAttribute('rx', '4');
      tooltipBg.setAttribute('visibility', 'hidden');
      tooltipBg.setAttribute('pointer-events', 'none');
      
      // Eventos de mouse
      L.addEventListener('mouseenter', function(e) {
        const mouseX = e.clientX - svg.getBoundingClientRect().left;
        const mouseY = e.clientY - svg.getBoundingClientRect().top;
        
        // Calcular tamaño del texto para el fondo (manejar multilínea)
        const lines = tooltip.split('\n').filter(line => line.trim().length > 0); // Filtrar líneas vacías
        const maxLineLength = Math.max(...lines.map(line => line.length));
        const textWidth = Math.max(maxLineLength * 6 + 20, 100); // Ancho mínimo
        const textHeight = Math.max(lines.length * 16 + 12, 30); // Alto mínimo
        
        // Posicionar tooltip arriba y a la derecha del mouse
        const tooltipX = mouseX + 15;
        const tooltipY = mouseY - textHeight - 10;
        
        // Limpiar tspan anteriores si existen
        while (tooltipText.firstChild) {
          tooltipText.removeChild(tooltipText.firstChild);
        }
        
        // Si no hay líneas válidas, crear una línea por defecto
        if (lines.length === 0) {
          lines.push('Información no disponible');
        }
        
        // Crear tspan para cada línea
        lines.forEach((line, index) => {
          const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
          tspan.setAttribute('x', tooltipX + 8);
          tspan.setAttribute('y', tooltipY + 18 + (index * 14));
          tspan.textContent = line.trim() || ' '; // Asegurar que siempre haya contenido
          tooltipText.appendChild(tspan);
        });
        
        tooltipBg.setAttribute('x', tooltipX);
        tooltipBg.setAttribute('y', tooltipY);
        tooltipBg.setAttribute('width', textWidth);
        tooltipBg.setAttribute('height', textHeight);
        tooltipBg.setAttribute('visibility', 'visible');
        
        // Hacer visible el texto del tooltip
        tooltipText.setAttribute('visibility', 'visible');
      });
      
      L.addEventListener('mouseleave', function() {
        tooltipText.setAttribute('visibility', 'hidden');
        tooltipBg.setAttribute('visibility', 'hidden');
      });
      
      // Agregar elementos al SVG (al final para que aparezcan encima)
      svg.appendChild(tooltipBg);
      svg.appendChild(tooltipText);
    }
    
    svg.appendChild(L); return L;
  }

  // Función para dibujar indicador de centro de masa (estilo similar al CM general)
  function drawCenterIndicator(x, y, color, scale = 600, componentName = '', localCoords = null) {
    if (isNaN(x) || isNaN(y)) {
      console.warn('drawCenterIndicator recibió coordenadas NaN:', { x, y });
      return;
    }

    // Círculo de fondo
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', Math.max(3, 6 * (scale / 600))); // Radio más pequeño que el CM general
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', '#000');
    circle.setAttribute('stroke-width', Math.max(0.5, 1 * (scale / 600)));
    circle.setAttribute('opacity', '0.7');
    circle.style.cursor = 'pointer'; // Cambiar cursor al pasar el mouse

    // Crear tooltip para coordenadas globales
    const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    tooltipText.setAttribute('x', '0');
    tooltipText.setAttribute('y', '0');
    tooltipText.setAttribute('font-size', '11');
    tooltipText.setAttribute('fill', '#000'); // Cambiar a negro para mejor visibilidad
    tooltipText.setAttribute('font-weight', 'bold');
    tooltipText.setAttribute('visibility', 'hidden');
    tooltipText.setAttribute('pointer-events', 'none');

    // Crear rectángulo de fondo para el tooltip
    const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tooltipBg.setAttribute('x', '0');
    tooltipBg.setAttribute('y', '0');
    tooltipBg.setAttribute('width', '0');
    tooltipBg.setAttribute('height', '0');
    tooltipBg.setAttribute('fill', '#ffffff'); // Fondo blanco
    tooltipBg.setAttribute('stroke', '#000');
    tooltipBg.setAttribute('stroke-width', '1');
    tooltipBg.setAttribute('rx', '4');
    tooltipBg.setAttribute('visibility', 'hidden');
    tooltipBg.setAttribute('pointer-events', 'none');

    // Crear líneas de texto usando tspan para mejor control
    // Las coordenadas x,y ya son físicas (resultado de localToGlobal)
    const lines = [
      componentName,
      `W(${x.toFixed(2)}, ${y.toFixed(2)})`,
      'Sistema W: Y=0 en nivel del agua',
      ...(localCoords ? ['Y > 0: arriba del agua', 'Y < 0: abajo del agua'] : [])
    ];

    // Eventos de mouse
    circle.addEventListener('mouseenter', function(e) {
      const mouseX = e.clientX - svg.getBoundingClientRect().left;
      const mouseY = e.clientY - svg.getBoundingClientRect().top;

      // Calcular tamaño del texto para el fondo (más grande y con padding)
      const tooltipLines = lines;
      const maxLineLength = Math.max(...tooltipLines.map(line => line.length));
      const textWidth = maxLineLength * 6 + 20; // Menos ancho para recuadro más estrecho
      const lineHeight = 16; // Altura consistente por línea
      const textHeight = tooltipLines.length * lineHeight + 20; // Más alto para mejor espaciado de varias líneas

      // Posicionar tooltip arriba y a la derecha del mouse
      const tooltipX = mouseX + 20;
      const tooltipY = mouseY - textHeight - 15;

      // Limpiar tspan anteriores
      while (tooltipText.firstChild) {
        tooltipText.removeChild(tooltipText.firstChild);
      }

      // Crear tspan para cada línea con posicionamiento consistente
      lines.forEach((line, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', tooltipX + 10);
        tspan.setAttribute('y', tooltipY + 20 + (index * lineHeight)); // Posicionamiento absoluto
        tspan.textContent = line;
        tooltipText.appendChild(tspan);
      });

      tooltipBg.setAttribute('x', tooltipX);
      tooltipBg.setAttribute('y', tooltipY);
      tooltipBg.setAttribute('width', textWidth);
      tooltipBg.setAttribute('height', textHeight);
      tooltipBg.setAttribute('visibility', 'visible');

      // El texto ya está posicionado en los tspan
      tooltipText.setAttribute('visibility', 'visible');
    });

    circle.addEventListener('mouseleave', function() {
      tooltipText.setAttribute('visibility', 'hidden');
      tooltipBg.setAttribute('visibility', 'hidden');
    });

    // Agregar elementos al SVG
    svg.appendChild(tooltipBg);
    svg.appendChild(tooltipText);
    svg.appendChild(circle);

    // Cruz blanca para marcar el centro exacto
    const crossSize = Math.max(2, 4 * (scale / 600));
    const cross = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Línea horizontal
    const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hLine.setAttribute('x1', x - crossSize);
    hLine.setAttribute('y1', y);
    hLine.setAttribute('x2', x + crossSize);
    hLine.setAttribute('y2', y);
    hLine.setAttribute('stroke', '#fff');
    hLine.setAttribute('stroke-width', Math.max(0.5, 1 * (scale / 600)));
    cross.appendChild(hLine);

    // Línea vertical
    const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    vLine.setAttribute('x1', x);
    vLine.setAttribute('y1', y - crossSize);
    vLine.setAttribute('x2', x);
    vLine.setAttribute('y2', y + crossSize);
    vLine.setAttribute('stroke', '#fff');
    vLine.setAttribute('stroke-width', Math.max(0.5, 1 * (scale / 600)));
    cross.appendChild(vLine);

    svg.appendChild(cross);
  }

  // Superficie del agua (visual)
  if(p.show.horizon){
    line(20,horizonY,wpx-20,horizonY,'#333',1).setAttribute('stroke-dasharray','6,4');
    text(wpx-140,horizonY-6,'Superficie del agua',10);
  }

  // ===== LEYENDA DE FLECHAS =====
  // Calcular si estamos en condición de stall
  const currentAlpha = Math.abs(inst.alpha); // Ángulo de ataque actual en grados
  const isStalling = currentAlpha > p.astall;
  drawLegend(svg, wpx, hpx, horizonY, pan.x, isStalling, currentAlpha, p.astall);

  // Leyendas de estado
  const foilOut = (h >= 0);            // CoP por encima de la superficie
  const boardInWater = (B.draft > 0);  // parte de la tabla mojada
  if(boardInWater){
    const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
    lbl.setAttribute('x', 36 + pan.x);
    lbl.setAttribute('y', horizonY - 8);
    lbl.setAttribute('font-size', '12');
    lbl.setAttribute('fill', '#0a6');
    lbl.textContent = (B.draft >= B.tb) ? 'Tabla sumergida' : 'Tabla Navegando';
    svg.appendChild(lbl);
  } else {
    const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
    lbl.setAttribute('x', 36 + pan.x);
    lbl.setAttribute('y', horizonY - 8);
    lbl.setAttribute('font-size', '12');
    lbl.setAttribute('fill', '#333');
    lbl.textContent='Tabla Volando';
    svg.appendChild(lbl);
  }
  if(foilOut){
    const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
    lbl.setAttribute('x', 36 + pan.x);
    lbl.setAttribute('y', horizonY - 26);
    lbl.setAttribute('font-size', '12');
    lbl.setAttribute('fill', '#c01616');
    lbl.textContent='Foil fuera del agua';
    svg.appendChild(lbl);
  }

  // φ efectivo - usar valor por defecto inicialmente
  let phiDeg = p.phi0 || 0;

  // Si inst está disponible y phiFollow está activado, ajustar phiDeg
  if (inst && p.show.phiFollow && !isNaN(p.Kphi) && !isNaN(inst.Mr)) {
    phiDeg = p.phi0 - p.Kphi * inst.Mr;
  }

  // Validar que no haya NaN en phiDeg
  if (isNaN(phiDeg)) {
    console.warn('NaN detectado en phiDeg (draw), usando valor por defecto');
    phiDeg = 0;
  }

  const phi = phiDeg * Math.PI / 180;

  // Geometría tabla
  const Lb=Math.max(40, p.boardLen * (p.hscale||110)); // largo en px para dibujo
  const tHat=[Math.cos(phi), Math.sin(phi)];
  const nHat=[-Math.sin(phi), Math.cos(phi)];
  
  // Posición del foil usando coordenadas locales
  const foilLocalX = (p.foilOffsetX || 0.3);  // Offset X en metros (local)
  const foilLocalZ = (p.foilOffsetZ || 0.05); // Offset Z en metros (local)
  const mastH = (p.mastH || 0.8); // Altura del mástil en metros
  
  // Usar localToGlobal para transformar coordenadas locales a globales
  const foilGlobal = localToGlobal(foilLocalX, foilLocalZ, phi, mastH, p.hscale, p.vscale, cx, cy);
  const xAnchor = foilGlobal.x;
  const yAnchor = foilGlobal.y;

  // DEBUG: Mostrar posiciones calculadas
  // console.log('DEBUG Tabla:', {
  //   cx, cy, phi: phi*180/Math.PI,
  //   xAnchor, yAnchor,
  //   Lb, scale: p.hscale
  // });

  line(cx, cy, xAnchor, yAnchor, '#444', 3); text(xAnchor+6, yAnchor-6, 'Mástil H');

  // Dibujar el foil principal
  if(p.show.foil && (p.S || 0) > 0){
    const foilChordPx = (p.foilChord || 0.25) * p.hscale; // Ancho del foil proporcional a la cuerda
    const foilSpanPx = Math.max(20, (p.S || 0.15) / (p.foilChord || 0.25) * 50); // Alto proporcional al área/cuerda

    // El foil se dibuja perpendicular al mástil (horizontal en el sistema local de la tabla)
    const foilLeftX = xAnchor - (foilChordPx/2) * Math.cos(phi);
    const foilLeftY = yAnchor - (foilChordPx/2) * Math.sin(phi);
    const foilRightX = xAnchor + (foilChordPx/2) * Math.cos(phi);
    const foilRightY = yAnchor + (foilChordPx/2) * Math.sin(phi);

    // Dibujar el perfil del foil como un rectángulo
    const foilRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    foilRect.setAttribute('x', foilLeftX - foilSpanPx/2);
    foilRect.setAttribute('y', foilLeftY - 2);
    foilRect.setAttribute('width', foilChordPx);
    foilRect.setAttribute('height', foilSpanPx);
    foilRect.setAttribute('fill', '#2196f3'); // Azul más vibrante
    foilRect.setAttribute('stroke', '#0d47a1');
    foilRect.setAttribute('stroke-width', '2');
    foilRect.setAttribute('transform', `rotate(${-phi*180/Math.PI} ${xAnchor} ${yAnchor})`);
    
    // Calcular posiciones físicas correctas para el tooltip
    const foilX_physical = (xAnchor - wpx*0.50) / p.vscale;
    const foilZ_physical = (hpx*0.62 - yAnchor) / p.vscale;
    
    // Agregar tooltip usando elemento <title> en SVG
    const foilTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    foilTitle.textContent = `Foil Principal
Tamaño: ${p.foilChord?.toFixed(3) || 0.25} m × ${(p.S / p.foilChord)?.toFixed(3) || 0.6} m
F(${foilX_physical?.toFixed(3)}, ${foilZ_physical?.toFixed(3)})
Sistema de coordenadas: F (foil local) - centrado en el foil
Área: ${(p.S || 0.15)?.toFixed(3)} m²`;
    foilRect.appendChild(foilTitle);
    
    svg.appendChild(foilRect);

    // Círculo en el centro geométrico del foil
    const foilCenterX = xAnchor;
    const foilCenterY = yAnchor;
    const foilCenterCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    foilCenterCircle.setAttribute('cx', foilCenterX);
    foilCenterCircle.setAttribute('cy', foilCenterY);
    foilCenterCircle.setAttribute('r', Math.max(3, 6 * (p.vscale / 600)));
    foilCenterCircle.setAttribute('fill', '#2196f3');
    foilCenterCircle.setAttribute('stroke', '#ffffff');
    foilCenterCircle.setAttribute('stroke-width', Math.max(1, 2 * (p.vscale / 600)));
    svg.appendChild(foilCenterCircle);

    text(xAnchor + foilChordPx/2 + 6, yAnchor, 'Foil');
  }

  // Rectángulo tabla - SIEMPRE centrado en (cx, cy), punto de referencia fijo
  const Vb = Math.max(0, p.boardVolL/1000);
  const Ab = Math.max(1e-6, p.boardArea);
  const tb = Math.min(1.0, Vb/Ab);
  const Tb = Math.max(4, tb * scale);
  const hx = (Lb/2)*tHat[0], hy=(Lb/2)*tHat[1];
  const nx = (Tb/2)*nHat[0], ny=(Tb/2)*nHat[1];
  // La tabla siempre se centra en (cx, cy), no en (xAnchor, yAnchor)
  const p1=[cx - hx - nx, cy - hy - ny];
  const p2=[cx + hx - nx, cy + hy - ny];
  const p3=[cx + hx + nx, cy + hy + ny];
  const p4=[cx - hx + nx, cy - hy + ny];
  const boardPoly=[p1,p2,p3,p4];

  const poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
  poly.setAttribute('points', boardPoly.map(p=>`${p[0]},${p[1]}`).join(' '));
  poly.setAttribute('fill', '#795548'); // Marrón más distintivo
  poly.setAttribute('stroke', '#3e2723');
  poly.setAttribute('stroke-width', '1.2');
  
  // Agregar tooltip usando elemento <title> en SVG
  const boardTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  boardTitle.textContent = `Tabla
Tamaño: ${(p.boardLen || 1.4)?.toFixed(3)} m × ${(p.boardArea / p.boardLen)?.toFixed(3) || 0.4} m
B(${((xAnchor - wpx*0.50) / p.vscale)?.toFixed(3)}, ${((hpx*0.62 - yAnchor) / p.vscale)?.toFixed(3)})
Sistema de coordenadas: B (tabla local) - centrado en la tabla
Área: ${(p.boardArea || 0.4)?.toFixed(3)} m²
Volumen: ${(p.boardVolL / 1000)?.toFixed(3) || 0.04} m³`;
  poly.appendChild(boardTitle);
  
  svg.appendChild(poly);

  // Círculo en el centro geométrico de la tabla (cx, cy) - punto de referencia fijo
  const boardCenterCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  boardCenterCircle.setAttribute('cx', cx);
  boardCenterCircle.setAttribute('cy', cy);
  boardCenterCircle.setAttribute('r', Math.max(3, 6 * (p.vscale / 600)));
  boardCenterCircle.setAttribute('fill', '#795548');
  boardCenterCircle.setAttribute('stroke', '#ffffff');
  boardCenterCircle.setAttribute('stroke-width', Math.max(1, 2 * (p.vscale / 600)));
  svg.appendChild(boardCenterCircle);

  text(cx + hx + 8, cy + hy, 'Tabla (φ)');

  // Línea de referencia del ángulo φ (horizontal desde el centro de la tabla)
  if(p.show.phiAngle){
    // Usar el mismo cálculo de phiDeg que se usa para dibujar la tabla
    const phiDeg = p.show.phiFollow ? (p.phi0 - p.Kphi*inst.Mr) : p.phi0;
    const phiRad = phiDeg * Math.PI/180; // Convertir φ a radianes
    const lineLength = Lb * 0.8; // Longitud de la línea de referencia (80% del largo de la tabla)
    const refLineLength = lineLength * 3; // Línea de referencia 3 veces más larga
    
    // Usar el centro geométrico real de la tabla (cx, cy) en lugar de xAnchor/yAnchor
    const tableCenterX = cx;
    const tableCenterY = cy;
    
    // Dibujar línea de referencia horizontal (ángulo φ = 0°) - 3 veces más larga
    const refLineStartX = tableCenterX - (refLineLength/2);
    const refLineStartY = tableCenterY;
    const refLineEndX = tableCenterX + (refLineLength/2);
    const refLineEndY = tableCenterY;
    
    line(refLineStartX, refLineStartY, refLineEndX, refLineEndY, '#ccc', 1); // Línea de referencia tenue
    
    // Dibujar línea del ángulo φ actual - también 3 veces más larga y tenue
    const phiLineStartX = tableCenterX - (refLineLength/2) * Math.cos(phiRad);
    const phiLineStartY = tableCenterY - (refLineLength/2) * Math.sin(phiRad);
    const phiLineEndX = tableCenterX + (refLineLength/2) * Math.cos(phiRad);
    const phiLineEndY = tableCenterY + (refLineLength/2) * Math.sin(phiRad);
    
    line(phiLineStartX, phiLineStartY, phiLineEndX, phiLineEndY, '#f00', 1); // Línea roja tenue
    
    // Mostrar valor del ángulo φ al final de la línea roja, a la derecha
    const phiTextX = phiLineEndX + 10;
    const phiTextY = phiLineEndY - 5;
    const phiText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    phiText.setAttribute('x', phiTextX);
    phiText.setAttribute('y', phiTextY);
    phiText.setAttribute('font-size', '10');
    phiText.setAttribute('fill', '#f00'); // Color rojo para el texto
    phiText.textContent = `φ = ${phiDeg.toFixed(1)}°`;
    svg.appendChild(phiText);
    
    // Dibujar arco para mostrar el ángulo visualmente
    if(Math.abs(phiDeg) > 1){ // Solo mostrar arco si el ángulo es significativo
      const arcRadius = lineLength * 0.3;
      const arcCenterX = xAnchor;
      const arcCenterY = yAnchor;
      
      // Crear path para el arco
      const arcPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const largeArcFlag = Math.abs(phiDeg) > 180 ? 1 : 0;
      const sweepFlag = phiDeg > 0 ? 1 : 0;
      
      const arcStartX = arcCenterX;
      const arcStartY = arcCenterY - arcRadius;
      const arcEndX = arcCenterX + arcRadius * Math.sin(phiRad);
      const arcEndY = arcCenterY - arcRadius * Math.cos(phiRad);
      
      arcPath.setAttribute('d', `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}`);
      arcPath.setAttribute('fill', 'none');
      arcPath.setAttribute('stroke', '#f00');
      arcPath.setAttribute('stroke-width', '1');
      arcPath.setAttribute('stroke-dasharray', '2,2');
      svg.appendChild(arcPath);
    }
  }

  // Flechas pies (⊥ tabla, hacia ella)
  if(p.show.feet){
    const mid=[(p1[0]+p3[0])/2,(p1[1]+p3[1])/2];
    const pixStance = Math.min(0.9*Lb, Math.max(10, p.d*(p.hscale||110)));
    const front=[mid[0]+(pixStance/2)*tHat[0], mid[1]+(pixStance/2)*tHat[1]];
    const back =[mid[0]-(pixStance/2)*tHat[0], mid[1]-(pixStance/2)*tHat[1]];
    const kpx = (40/(getTotalMass(p)*9.81))*(p.fuerzascale||1);
    const fLen=Math.max(12, kpx*Math.max(0,inst.Ff));
    const bLen=Math.max(12, kpx*Math.max(0,inst.Fb));
    const fTip=[front[0]+fLen*nHat[0], front[1]+fLen*nHat[1]];
    const bTip=[back[0]+bLen*nHat[0],  back[1]+bLen*nHat[1]];
    
    arrow2(front[0],front[1], fTip[0],fTip[1], '#c00', 2.0, 
           `Fuerza pie delantero: ${inst.Ff?.toFixed(0) || 0} N\nFuerza vertical ejercida por el pie delantero del rider`); // pie delantero
    arrow2(back[0], back[1],  bTip[0], bTip[1], '#06c', 2.0,
           `Fuerza pie trasero: ${inst.Fb?.toFixed(0) || 0} N\nFuerza vertical ejercida por el pie trasero del rider`); // pie trasero
  }

  // Recorte sumergido + línea de flotación con etiqueta de calado
  function clipBelowWater(pts){
    const out=[]; const N=pts.length;
    for(let i=0;i<N;i++){
      const a=pts[i], b=pts[(i+1)%N];
      const aBelow = a[1] >= horizonY;
      const bBelow = b[1] >= horizonY;
      if(aBelow !== bBelow){
        const t=(horizonY-a[1])/(b[1]-a[1]);
        const ix=a[0]+t*(b[0]-a[0]); const iy=horizonY;
        out.push([ix,iy]);
      }
      if(bBelow) out.push(b);
    }
    return out;
  }
  const sub=clipBelowWater(boardPoly);
  if(sub.length>=3){
    const polySub=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    polySub.setAttribute('points', sub.map(p=>`${p[0]},${p[1]}`).join(' '));
    polySub.setAttribute('fill','#6bbcff'); polySub.setAttribute('opacity','0.6'); svg.appendChild(polySub);
    for(let i=0;i<sub.length;i++){
      const a=sub[i], b=sub[(i+1)%sub.length];
      if(Math.abs(a[1]-horizonY)<0.5 && Math.abs(b[1]-horizonY)<0.5){
        line(a[0],a[1], b[0],b[1], '#068', 2);
        const mx=(a[0]+b[0])/2; const my=a[1]-4;
        const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
        lbl.setAttribute('x',mx); lbl.setAttribute('y',my); lbl.setAttribute('font-size',11); lbl.setAttribute('fill','#036');
        lbl.textContent=`${B.draft.toFixed(3)} m`; svg.appendChild(lbl);
      }
    }
  }

  // Ejes W (global fijo), B (popa, solidario a tabla) y F (foil local)
  if(p.show.axesW){
    const xg = 34 + pan.x, yg = horizonY;  // Origen exactamente en el nivel del agua
    arrow2(xg,yg, xg+28, yg, '#000',1.6, `Eje X global (horizontal)\nSistema de coordenadas fijo del mundo\nY=0 en el nivel del agua\nPositivo = hacia adelante, Negativo = hacia atrás\nOrigen W: (0.0, 0.0)`); text(xg+32, yg+4, 'x');
    arrow2(xg,yg, xg, yg-28, '#000',1.6, `Eje Y global (vertical)\nSistema de coordenadas fijo del mundo\nPositivo = arriba del agua, Negativo = abajo del agua\nOrigen W: (0.0, 0.0)`); text(xg-8,  yg-30,'y');
    const cW=document.createElementNS('http://www.w3.org/2000/svg','circle'); cW.setAttribute('cx',xg); cW.setAttribute('cy',yg); cW.setAttribute('r','3'); cW.setAttribute('fill','#000'); svg.appendChild(cW);
    text(xg-12, yg+15, 'W(0,0)');
  }
  if(p.show.axesB){
    const sternX = xAnchor - (Lb/2)*tHat[0];
    const sternY = yAnchor - (Lb/2)*tHat[1];
    // Calcular coordenadas físicas globales del origen B (popa de la tabla)
    // La popa está en localX = -boardLen/2 (mitad de la tabla hacia atrás)
    const sternGlobal = localToGlobal(-p.boardLen/2, 0, phi, p.mastH, p.hscale, p.vscale, cx, cy);
    arrow2(sternX,sternY, sternX+32*tHat[0], sternY+32*tHat[1], '#000',1.6, `Eje X local de la tabla (tangencial)\nSistema de coordenadas solidario a la tabla\nOrigen B: (${sternGlobal.x.toFixed(1)}, ${sternGlobal.y.toFixed(1)})`); text(sternX+32*tHat[0]+4, sternY+32*tHat[1]+4, 'x_b');
    arrow2(sternX,sternY, sternX+32*nHat[0], sternY+32*nHat[1], '#000',1.6, `Eje Y local de la tabla (normal)\nSistema de coordenadas solidario a la tabla\nOrigen B: (${sternGlobal.x.toFixed(1)}, ${sternGlobal.y.toFixed(1)})`); text(sternX+32*nHat[0]+4, sternY+32*nHat[1]+4, 'y_b');
    const cB=document.createElementNS('http://www.w3.org/2000/svg','circle'); cB.setAttribute('cx',sternX); cB.setAttribute('cy',sternY); cB.setAttribute('r','3'); cB.setAttribute('fill','#000'); svg.appendChild(cB);
    text(sternX-14, sternY-8, 'B(0,0)');
  }

  // Ejes F (foil local) - Sistema de coordenadas local del foil
  if(p.show.axesF){  // Control independiente para mostrar ejes del foil
    // Calcular coordenadas físicas globales del origen F (centro del foil)
    const foilGlobal = localToGlobal(p.foilOffsetX || 0.3, p.foilOffsetZ || 0.05, phi, p.mastH, p.hscale, p.vscale, cx, cy);
    
    // Convertir coordenadas físicas del foil a coordenadas de pantalla
    const foilOriginX = foilGlobal.x;
    const foilOriginY = foilGlobal.y;

    // Eje X local del foil (horizontal, distancia desde el centro del foil)
    arrow2(foilOriginX, foilOriginY, foilOriginX + 32, foilOriginY, '#0d47a1', 1.6,
           `Eje X local del foil (horizontal)\nSistema de coordenadas centrado en el foil\nX = distancia horizontal desde el centro del foil\nOrigen F: (${foilGlobal.x.toFixed(1)}, ${foilGlobal.y.toFixed(1)})`);
    text(foilOriginX + 36, foilOriginY + 4, 'x_f');

    // Eje Z local del foil (vertical, profundidad/altura)
    arrow2(foilOriginX, foilOriginY, foilOriginX, foilOriginY - 32, '#0d47a1', 1.6,
           `Eje Z local del foil (vertical)\nSistema de coordenadas centrado en el foil\nZ = profundidad/altura relativa al foil\nOrigen F: (${foilGlobal.x.toFixed(1)}, ${foilGlobal.y.toFixed(1)})`);
    text(foilOriginX - 8, foilOriginY - 36, 'z_f');

    // Punto de origen del sistema F
    const cF = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    cF.setAttribute('cx', foilOriginX);
    cF.setAttribute('cy', foilOriginY);
    cF.setAttribute('r', '3');
    cF.setAttribute('fill', '#0d47a1');
    svg.appendChild(cF);
    text(foilOriginX - 20, foilOriginY - 8, 'F(0,0)');
  }

  // Vectores flujo y cuerda
  if(p.show.chord){
    // Para acoplamiento rígido: ángulo efectivo = phi (tabla) + theta (foil)
    const effectiveAngle = phi + inst.theta_eff * Math.PI/180;
    // La cuerda debe salir del centro del foil, no del centro de la tabla
    const cxa=xAnchor-(50)*Math.cos(effectiveAngle), cya=yAnchor-(50)*Math.sin(effectiveAngle);
    const cxb=xAnchor+(50)*Math.cos(effectiveAngle), cyb=yAnchor+(50)*Math.sin(effectiveAngle);
    line(cxa,cya,cxb,cyb,'#000',4); 
    text(cxb+6,cyb,`Cuerda (φ+θ = ${(phi*180/Math.PI + inst.theta_eff).toFixed(1)}°)`);
  }
  if(p.show.flow){
    const kpx = (40/(getTotalMass(p)*9.81)) * (p.velscale||1);
    // Calcular velocidad del flujo usando parámetros base
    const V_flow = p.V0; // Magnitud del flujo
    const gamma_flow = p.gamma0 * Math.PI/180; // Dirección del flujo en radianes
    const flowVx = V_flow * Math.cos(gamma_flow);
    const flowVy = V_flow * Math.sin(gamma_flow);
    
    // Velocidad relativa = flujo - velocidad tabla
    const relVx = flowVx - inst.V;
    const relVy = flowVy - wv;
    
    // Usar la misma lógica que V_tabla
    const minLength = 5 * (p.velscale || 1);
    const currentLength = Math.sqrt(relVx*relVx + relVy*relVy);
    const scaleFactor = currentLength < minLength && currentLength > 0 ? minLength / currentLength : 1;
    const finalVx = relVx * kpx * scaleFactor;
    const finalVy = relVy * kpx * scaleFactor;
    
    arrow2((cx - finalVx) - 100, (cy - finalVy) + 50, cx - 100, cy + 50, '#000', 1.2,
           `Velocidad relativa del flujo: ${Math.sqrt(relVx*relVx + relVy*relVy).toFixed(2)} m/s\nVelocidad del flujo menos velocidad de la tabla (ángulo γ = ${p.gamma0.toFixed(1)}°)`); 
    text((cx - 100)+6, (cy + 50),'V_rel (γ)');
  }

  // Vectores L/D
  if(p.show.LD){
    const kpx = (40/(getTotalMass(p)*9.81)) * (p.fuerzascale||1);
    const Llen = Math.max(12, kpx*Math.max(0,inst.L));
    const Dlen = Math.max(12, kpx*Math.max(0,inst.D));
    const g = inst.gamma*Math.PI/180;
    const lhat = [Math.cos(g-Math.PI/2), Math.sin(g-Math.PI/2)];  // ← Corregido: -90° en lugar de +90°
    const dhat = [Math.cos(g+Math.PI),   Math.sin(g+Math.PI)  ];
    arrow2(xAnchor, yAnchor, xAnchor + Llen*lhat[0], yAnchor + Llen*lhat[1], '#2e7d32', 2.5,
           `Fuerza de sustentación (Lift): ${inst.L?.toFixed(0) || 0} N\nComponente perpendicular al flujo que mantiene el foil en el aire`);
    arrow2(xAnchor, yAnchor, xAnchor + Dlen*dhat[0], yAnchor + Dlen*dhat[1], '#ad8b00', 2.5,
           `Fuerza de arrastre (Drag): ${inst.D?.toFixed(0) || 0} N\nComponente paralela al flujo que se opone al movimiento`);
  }

  // Visualización de la cola del foil
  if(p.show.tail && (p.tailArea || 0) > 0){
    const tailScale = p.hscale || 110; // Escala para dibujar la cola
    const tailLengthPx = (p.tailLength || 0.6) * tailScale;
    
    // Posición de la cola relativa al foil usando coordenadas locales
    const tailLocalX = foilLocalX + (p.tailOffsetX || 0.6);  // Offset X desde el foil
    const tailLocalZ = foilLocalZ + (p.tailOffsetZ || 0.02); // Offset Z desde el foil

    // Usar localToGlobal para transformar coordenadas locales a globales
    const tailGlobal = localToGlobal(tailLocalX, tailLocalZ, phi, mastH, p.hscale, p.vscale, cx, cy);
    const tailCx = tailGlobal.x;
    const tailCy = tailGlobal.y;
    
    // Dibujar la geometría de la cola usando la cuerda
    const tailChordPx = (p.tailChord || 0.15) * p.hscale; // Ancho proporcional a la cuerda
    const tailSpanPx = Math.max(15, (p.tailArea || 0.025) / (p.tailChord || 0.15) * 30); // Alto proporcional al área/cuerda
    
    // La cola también debe rotar con phi
    const tailLeftX = tailCx - (tailChordPx/2) * Math.cos(phi);
    const tailLeftY = tailCy - (tailChordPx/2) * Math.sin(phi);
    const tailRightX = tailCx + (tailChordPx/2) * Math.cos(phi);
    const tailRightY = tailCy + (tailChordPx/2) * Math.sin(phi);
    
    // Dibujar el perfil de la cola como un rectángulo
    const tailRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tailRect.setAttribute('x', tailLeftX - tailSpanPx/2);
    tailRect.setAttribute('y', tailLeftY - 2);
    tailRect.setAttribute('width', tailChordPx);
    tailRect.setAttribute('height', tailSpanPx);
    tailRect.setAttribute('fill', '#ff5722'); // Naranja más vibrante
    tailRect.setAttribute('stroke', '#bf360c');
    tailRect.setAttribute('stroke-width', '2');
    tailRect.setAttribute('transform', `rotate(${-phi*180/Math.PI} ${tailCx} ${tailCy})`);
    
    // Agregar tooltip usando elemento <title> en SVG
    const tailTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    tailTitle.textContent = `Cola del Foil
Tamaño: ${p.tailChord?.toFixed(3) || 0.15} m × ${(p.tailArea / p.tailChord)?.toFixed(3) || 0.17} m
T(${((tailCx - wpx*0.50) / p.vscale)?.toFixed(3)}, ${((hpx*0.62 - tailCy) / p.vscale)?.toFixed(3)})
Sistema de coordenadas: T (cola local) - centrado en la cola`;
    tailRect.appendChild(tailTitle);
    
    svg.appendChild(tailRect);

    // Círculo en el centro de rotación de la cola
    const tailCenterCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    tailCenterCircle.setAttribute('cx', tailCx);
    tailCenterCircle.setAttribute('cy', tailCy);
    tailCenterCircle.setAttribute('r', Math.max(3, 6 * (p.vscale / 600)));
    tailCenterCircle.setAttribute('fill', '#ff5722');
    tailCenterCircle.setAttribute('stroke', '#ffffff');
    tailCenterCircle.setAttribute('stroke-width', Math.max(1, 2 * (p.vscale / 600)));
    svg.appendChild(tailCenterCircle);
    
    text(tailRightX + 6, tailRightY, 'Cola');
    
    // Dibujar línea de conexión entre foil y cola
    line(xAnchor, yAnchor, tailCx, tailCy, '#666', 1);
    
    // Vectores L/D de la cola
    if(p.show.LD){
      const kpx = (40/(getTotalMass(p)*9.81)) * (p.fuerzascale||1);
      const tailLlen = Math.max(8, kpx*Math.max(0, inst.tail_L || 0));
      const tailDlen = Math.max(8, kpx*Math.max(0, inst.tail_D || 0));
      const g = (inst.gamma || 0)*Math.PI/180;
      const lhat = [Math.cos(g-Math.PI/2), Math.sin(g-Math.PI/2)];
      const dhat = [Math.cos(g+Math.PI),   Math.sin(g+Math.PI)  ];
      
      // Vectores de la cola en color más claro
      arrow2(tailCx, tailCy, tailCx + tailLlen*lhat[0], tailCy + tailLlen*lhat[1], '#4caf50', 1.5,
             `Sustentación de la cola: ${(inst.tail_L || 0)?.toFixed(0)} N\nContribución de la cola del foil a la fuerza de sustentación total`);
      arrow2(tailCx, tailCy, tailCx + tailDlen*dhat[0], tailCy + tailDlen*dhat[1], '#ff9800', 1.5,
             `Arrastre de la cola: ${(inst.tail_D || 0)?.toFixed(0)} N\nContribución de la cola del foil a la fuerza de arrastre total`);
    }
  }

  // Vector velocidad de la tabla (en la esquina superior derecha de la tabla)
  if(p.show.tableVel){
    const kpx = (40/(getTotalMass(p)*9.81)) * (p.velscale||1);
    
    // Verificar si inst.V es válido
    if (isNaN(inst.V) || inst.V === undefined || inst.V === null) {
      console.warn('inst.V is invalid, using default value:', inst.V);
      inst.V = 3.5; // Valor por defecto razonable
    }
    
    const Vx = kpx * inst.V; // Componente horizontal
    const Vy = kpx * wv;     // Componente vertical (wv se actualiza en ambos modos)
    
    // Asegurar longitud mínima visible pero proporcional a velscale
    const minLength = 5 * (p.velscale || 1);
    const currentLength = Math.sqrt(Vx*Vx + Vy*Vy);
    const scaleFactor = currentLength < minLength && currentLength > 0 ? minLength / currentLength : 1;
    const finalVx = Vx * scaleFactor;
    const finalVy = Vy * scaleFactor;
    
    arrow2(p3[0], p3[1], p3[0] + finalVx, p3[1] + finalVy, '#0066cc', 2.5,
           `Velocidad de la tabla: ${inst.V?.toFixed(2) || 0} m/s\nVelocidad horizontal de la tabla (componente U)`);
    text(p3[0] + finalVx + 6, p3[1] + finalVy, 'V_tabla');
  }

  // Peso, Arquímedes, Resultantes
  if(p.show.weight){
    const mg=getTotalMass(p)*9.81; const k=(40/(getTotalMass(p)*9.81))*(p.fuerzascale||1);
    arrow2(cx, cy, cx, cy + Math.max(12,k*mg), '#222', 2.5,
           `Peso total: ${(getTotalMass(p)*9.81)?.toFixed(0) || 0} N\nFuerza de gravedad actuando sobre el sistema rider+tabla`);
    text(cx+6, cy+22, 'mg');
  }
  if(p.show.buoy && B.draft>0){
    const k=(40/(getTotalMass(p)*9.81))*(p.fuerzascale||1);
    arrow2(xAnchor, yAnchor, xAnchor, yAnchor - Math.max(12,k*B.Fb), '#0a6', 2.5,
           `Empuje de Arquímedes: ${B.Fb?.toFixed(0) || 0} N\nFuerza de flotabilidad debida al volumen sumergido de la tabla`);
  }
  if(p.show.result){
    const mg=getTotalMass(p)*9.81; const k=(40/(getTotalMass(p)*9.81))*(p.fuerzascale||1);
    const VertRes = inst.Vert + B.Fb - mg;
    const dirv = VertRes>=0 ? -1 : 1;
    arrow2(cx, cy, cx, cy + dirv*Math.max(12, Math.abs(k*VertRes)), '#a0a', 2.5,
           `Fuerza vertical resultante: ${VertRes?.toFixed(0) || 0} N\nSustentación + Flotabilidad - Peso (equilibrio vertical)`);
    arrow2(cx, cy, cx + Math.sign(inst.Th)*Math.max(12, Math.abs(k*inst.Th)), cy, '#a0a', 2.5,
           `Fuerza horizontal resultante: ${inst.Th?.toFixed(0) || 0} N\nEmpuje neto horizontal (propulsión - arrastre)`);
  }

  // Pesos individuales de componentes
  if(p.show.componentWeights){
    const phi_local = (p.phi0 || 0) * Math.PI / 180;
    const g = 9.81; // Aceleración de la gravedad
    const k = (40/(getTotalMass(p)*9.81)) * (p.fuerzascale || 1); // Factor de escala para vectores

    // Validar coordenadas base
    if (isNaN(cx) || isNaN(cy)) {
      console.warn('Coordenadas base inválidas para vectores de peso');
      return;
    }

    // Centro de la tabla
    const boardWeight = (p.boardMass || 5.5) * g;
    const boardArrowLength = Math.max(12, Math.abs(k * boardWeight));
    // Calcular coordenadas físicas globales del centro de la tabla (localX=0, localZ=0)
    const boardGlobal = localToGlobal(0, 0, phi_local, p.mastH, p.hscale, p.vscale, cx, cy);
    const boardScreen = { screenX: cx, screenY: cy };
    if (!isNaN(boardGlobal.x) && !isNaN(boardGlobal.y)) {
      arrow2(boardGlobal.x, boardGlobal.y,
             boardGlobal.x, boardGlobal.y + boardArrowLength,
             '#8B4513', 2.0,
             `Peso tabla: ${boardWeight.toFixed(1)} N\nMasa: ${(p.boardMass || 5.5).toFixed(1)} kg`);
      // Dibujar indicador de centro de masa de la tabla (estilo similar al CM general)
      drawCenterIndicator(boardGlobal.x, boardGlobal.y, '#8B4513', scale, 'Centro Tabla', {x: 0, z: 0});
    }

    // Centro del foil
    const foilWeight = (p.foilMass || 2.0) * g;
    const foilArrowLength = Math.max(12, Math.abs(k * foilWeight));
    const foilLocal = {x: p.foilOffsetX || 0.3, z: p.foilOffsetZ || 0.05};
    // Calcular coordenadas físicas globales del centro del foil
    const foilGlobal = localToGlobal(foilLocal.x, foilLocal.z, phi_local, p.mastH, p.hscale, p.vscale, cx, cy);
    if (!isNaN(foilGlobal.x) && !isNaN(foilGlobal.y)) {
      arrow2(foilGlobal.x, foilGlobal.y,
             foilGlobal.x, foilGlobal.y + foilArrowLength,
             '#4169E1', 2.0,
             `Peso foil: ${foilWeight.toFixed(1)} N\nMasa: ${(p.foilMass || 2.0).toFixed(1)} kg`);
      // Dibujar indicador de centro de masa del foil
      drawCenterIndicator(foilGlobal.x, foilGlobal.y, '#4169E1', scale, 'Centro Foil', foilLocal);
    }

    // Centro de rotación de la cola
    const tailWeight = (p.tailMass || 0.5) * g;
    const tailArrowLength = Math.max(12, Math.abs(k * tailWeight));
    const tailLocal = {
      x: (p.foilOffsetX || 0.3) + (p.tailOffsetX || 0.6),
      z: (p.foilOffsetZ || 0.05) + (p.tailOffsetZ || 0.02)
    };
    const tailGlobal = localToGlobal(tailLocal.x, tailLocal.z, phi_local, p.mastH, p.hscale, p.vscale, cx, cy);
    if (!isNaN(tailGlobal.x) && !isNaN(tailGlobal.y)) {
      arrow2(tailGlobal.x, tailGlobal.y,
             tailGlobal.x, tailGlobal.y + tailArrowLength,
             '#0d47a1', 2.0,
             `Peso cola: ${tailWeight.toFixed(1)} N\nMasa: ${(p.tailMass || 0.5).toFixed(1)} kg`);
      // Dibujar indicador de centro de rotación de la cola
      drawCenterIndicator(tailGlobal.x, tailGlobal.y, '#0d47a1', scale, 'Centro Rotación Cola', tailLocal);
    }
  }

  // Dibujar geometría del sistema (centro de masa, posiciones relativas)
  if (p.show.geometry) {
    console.log('DIBUJANDO GEOMETRÍA DEL SISTEMA');
    console.log('Elementos en SVG antes de geometría:', svg.children.length);
    console.log('Llamando drawSystemGeometry con:', { p, scale, cx, cy });
    drawSystemGeometry(svg, p, scale, cx, cy);
    console.log('Total de elementos en SVG después de geometría:', svg.children.length);
  }

  refreshCharts();
  } catch (error) {
    console.error('Error en función draw():', error);
    // No relanzar el error para evitar loops infinitos
  }
}

function drawLegend(svg, wpx, hpx, horizonY, panX, isStalling = false, currentAlpha = 0, stallAngle = 15) {
  // Crear contenedor de la leyenda
  const legendX = 36 + panX;
  const legendY = horizonY + 20;
  const lineHeight = 16;
  
  // Título de la leyenda
  const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  title.setAttribute('x', legendX);
  title.setAttribute('y', legendY);
  title.setAttribute('font-size', '14');
  title.setAttribute('font-weight', 'bold');
  title.setAttribute('fill', '#333');
  title.textContent = 'Leyenda:';
  svg.appendChild(title);
  
  // Definir elementos de la leyenda con sus colores y descripciones
  const legendItems = [
    { color: '#c00', label: 'Fuerza Rider (Rojo)' },
    { color: '#00c', label: 'Fuerza Rider (Azul)' },
    { color: '#2e7d32', label: 'Lift Ala (Verde)' },
    { color: '#ad8b00', label: 'Drag Ala (Amarillo)' },
    { color: '#4caf50', label: 'Lift Cola (Verde claro)' },
    { color: '#ff9800', label: 'Drag Cola (Naranja)' },
    { color: '#0066cc', label: 'Velocidad Tabla (Azul)' },
    { color: '#222', label: 'Peso (Gris)' },
    { color: '#0a6', label: 'Empuje (Verde claro)' },
    { color: '#a0a', label: 'Resultante (Magenta)' },
    { color: '#000', label: 'Ejes de referencia (Negro)' }
  ];
  
  // Dibujar cada elemento de la leyenda
  legendItems.forEach((item, index) => {
    const y = legendY + (index + 1) * lineHeight;
    
    // Dibujar rectángulo de color
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', legendX);
    rect.setAttribute('y', y - 10);
    rect.setAttribute('width', '12');
    rect.setAttribute('height', '12');
    rect.setAttribute('fill', item.color);
    rect.setAttribute('stroke', '#333');
    rect.setAttribute('stroke-width', '1');
    svg.appendChild(rect);
    
    // Dibujar texto
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', legendX + 18);
    text.setAttribute('y', y);
    text.setAttribute('font-size', '11');
    text.setAttribute('fill', '#333');
    text.textContent = item.label;
    svg.appendChild(text);
  });

  // Indicador de Stall
  const stallY = legendY + (legendItems.length + 1) * lineHeight;
  const stallText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  stallText.setAttribute('x', legendX);
  stallText.setAttribute('y', stallY);
  stallText.setAttribute('font-size', '12');
  stallText.setAttribute('font-weight', 'bold');

  if (isStalling) {
    stallText.setAttribute('fill', '#d32f2f');
    stallText.textContent = `⚠️ STALL: α=${(currentAlpha || 0).toFixed(1)}° > ${(stallAngle || 15).toFixed(1)}°`;
  } else {
    stallText.setAttribute('fill', '#2e7d32');
    stallText.textContent = `✓ Normal: α=${(currentAlpha || 0).toFixed(1)}° ≤ ${(stallAngle || 15).toFixed(1)}°`;
  }
  svg.appendChild(stallText);
  
  // Dibujar geometría del sistema (centro de masa, posiciones relativas)
  // Nota: drawSystemGeometry requiere parámetros que no están disponibles aquí
  // Se dibuja en la función draw() principal en su lugar
  // drawSystemGeometry(svg, p, scale, cx, cy);
}

function drawSeries(svgId, series, colors, ylabel){
  const svg = S(svgId); if(!svg) return; svg.innerHTML='';
  const w = svg.clientWidth||240, h = svg.clientHeight||140;
  const pad = {l:28,r:6,t:6,b:18};
  const W = w-pad.l-pad.r, H = h-pad.t-pad.b;
  function line(x1,y1,x2,y2,st='#000',w2=1){
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
      console.warn('line recibió coordenadas NaN:', { x1, y1, x2, y2 });
      return;
    }
    const L=document.createElementNS('http://www.w3.org/2000/svg','line'); L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2); L.setAttribute('stroke',st);L.setAttribute('stroke-width',w2); svg.appendChild(L);
  }
  function text(x,y,t,fs=10,st='#444'){
    if (isNaN(x) || isNaN(y)) {
      console.warn('text recibió coordenadas NaN:', { x, y });
      return;
    }
    const T=document.createElementNS('http://www.w3.org/2000/svg','text');T.setAttribute('x',x);T.setAttribute('y',y);T.setAttribute('font-size',fs);T.setAttribute('fill',st);T.textContent=t;svg.appendChild(T);
  }
  const all=[]; series.forEach(arr=>all.push(...arr.filter(v=>!isNaN(v)))); if(all.length===0){ text(8,20,ylabel,10); text(8,35,'Recopilando datos...',8,'#666'); return; }
  const minv = Math.min(...all,0), maxv = Math.max(...all,0);
  const span = (maxv-minv)||1;
  // ejes
  line(pad.l, pad.t, pad.l, pad.t+H, '#ccc',1);
  line(pad.l, pad.t+H, pad.l+W, pad.t+H, '#ccc',1);
  text(2, pad.t+10, ylabel, 9);
  const N = MAXC;
  series.forEach((arr, idx)=>{
    const color = colors[idx];
    for(let i=1;i<arr.length;i++){
      // Saltar si alguno de los valores es NaN
      if(isNaN(arr[i-1]) || isNaN(arr[i])) continue;
      
      const x1 = pad.l + (W*(i-1))/(N-1);
      const x2 = pad.l + (W*(i))/(N-1);
      const y1 = pad.t + H*(1-(arr[i-1]-minv)/span);
      const y2 = pad.t + H*(1-(arr[i]-minv)/span);
      line(x1,y1,x2,y2,color,1.5);
    }
  });
}

function refreshCharts(){
  drawSeries('chartAngles', [histAngles.alpha, histAngles.theta], ['#7b1fa2','#ef6c00'], 'Ángulos α, θ_eff [°] (ciclo)');
  drawSeries('chartForces', [histForces.L, histForces.Th, histForces.Fr], ['#2e7d32','#ad1457','#c00'], 'Fuerzas L, Th, F_rider [N] (ciclo)');
}

function updateAll(){ draw(); }

// Función de prueba para verificar que los gráficos funcionan
function testCharts() {
  // console.log('=== TEST CHARTS ===');
  // Limpiar datos anteriores
  histAngles.alpha.length = 0;
  histAngles.theta.length = 0;
  histForces.L.length = 0;
  histForces.Th.length = 0;
  histForces.Fr.length = 0;
  
  // Agregar algunos datos de prueba
  histAngles.alpha.push(5.2, 3.8, 7.1, 2.9, 6.5);
  histAngles.theta.push(12.5, 15.2, 8.9, 18.3, 11.7);
  histForces.L.push(45.2, 52.1, 38.9, 61.5, 49.8);
  histForces.Th.push(12.3, 15.7, 9.8, 22.1, 17.4);
  histForces.Fr.push(8.5, 11.2, 6.9, 14.3, 10.6);
  
  // console.log('Added test data, calling refreshCharts...');
  refreshCharts();
}

// Mensaje de bienvenida para funcionalidad de medición
// console.log('🚀 SIMULADOR PUMP FOIL CARGADO');
// console.log('📏 FUNCIONALIDAD DE MEDICIÓN ACTIVADA');
// console.log('💡 Pasa el mouse sobre el dibujo para ver instrucciones');
// console.log('🔍 Abre la consola del navegador (F12) para ver feedback en tiempo real');
// console.log('🧪 Si no funciona automáticamente, ejecuta: testMeasurementSystem() en la consola');

window.addEventListener('DOMContentLoaded', ()=>{
  bindUI();
  // Esperar a que se complete la carga de localStorage antes de inicializar
  setTimeout(() => {
    resetState();
    updateAll();
  }, 50);
});