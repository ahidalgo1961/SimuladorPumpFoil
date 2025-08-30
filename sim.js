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
  rho: {
    name: "Densidad del agua ρ",
    unit: "kg/m³",
    description: "Densidad del fluido (agua). Afecta la sustentación y resistencia hidrodinámica.",
    range: "950 - 1030 kg/m³"
  },
  mass: {
    name: "Masa total",
    unit: "kg",
    description: "Masa total del sistema (rider + equipo). Afecta la dinámica y fuerzas gravitatorias.",
    range: "55 - 110 kg"
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
    range: "200 - 2000 px/m"
  },
  hscale: {
    name: "Escala horizontal",
    unit: "px/m",
    description: "Factor de escala para longitudes horizontales en el diagrama (píxeles por metro).",
    range: "60 - 240 px/m"
  },
  velscale: {
    name: "Escala velocidad",
    unit: "adimensional",
    description: "Factor de escala para los vectores de velocidad en el diagrama.",
    range: "0.1 - 6.0"
  },
  fuerzascale: {
    name: "Escala fuerzas",
    unit: "adimensional",
    description: "Factor de escala para los vectores de fuerza en el diagrama.",
    range: "0.1 - 6.0"
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
  }
};

const sliders = ["v0","phi","theta0","gamma0","S","rho","mass","LD","clslope","clmax","stall",
 "freq","ampV","ampT","ampG","phaseT","phaseG","dtStep",
 "lambda","dstance","Af","Ab","phaseF","phaseB","Gtheta","Kphi","h0","cw","vscale","velscale","fuerzascale","hscale",
 "boardVolL","boardArea","mastH","boardLen"];

let t=0, T=1, playing=null;
let h=0, wv=0;        // heave (m, +arriba) y velocidad vertical
let pan={x:0,y:0};

// Histórico (últimos 100 ciclos: medias por ciclo)
let cyc_acc = {na:0, a:0, th:0, L:0, Th:0, Fr:0};
const MAXC=100;
const histAngles={alpha:[], theta:[]};
const histForces={L:[], Th:[], Fr:[]};

// Funciones auxiliares
const $ = id => document.getElementById(id);
function S(id){ const el=$(id); if(!el) throw new Error('#' + id + ' no encontrado'); return el; }
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
  sliders.forEach(id=>{
    const el=S(id);
    el.addEventListener('input', updateAll, {passive:true});
    el.addEventListener('change', updateAll, {passive:true});
    // persistencia
    const KEY='wf_persist_v23h7';
    el.addEventListener('input', ()=>{
      try{ const obj=JSON.parse(localStorage.getItem(KEY)||'{}'); obj[id]=el.value; localStorage.setItem(KEY, JSON.stringify(obj)); }catch(e){}
    }, {passive:true});
    try{ const obj=JSON.parse(localStorage.getItem(KEY)||'{}'); if(obj[id]!==undefined) el.value=obj[id]; }catch(e){}
  });
  
  // Controles de límites para TODOS los sliders
  const allSliderLimits = [
    // Parámetros
    { sliderId: 'v0', minId: 'v0Min', maxId: 'v0Max', defaultMin: 2, defaultMax: 6 },
    { sliderId: 'phi', minId: 'phiMin', maxId: 'phiMax', defaultMin: -10, defaultMax: 15 },
    { sliderId: 'theta0', minId: 'theta0Min', maxId: 'theta0Max', defaultMin: -5, defaultMax: 12 },
    { sliderId: 'gamma0', minId: 'gamma0Min', maxId: 'gamma0Max', defaultMin: -15, defaultMax: 10 },
    { sliderId: 'S', minId: 'SMin', maxId: 'SMax', defaultMin: 0.08, defaultMax: 0.22 },
    { sliderId: 'rho', minId: 'rhoMin', maxId: 'rhoMax', defaultMin: 950, defaultMax: 1030 },
    { sliderId: 'mass', minId: 'massMin', maxId: 'massMax', defaultMin: 55, defaultMax: 110 },
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
    { sliderId: 'vscale', minId: 'vscaleMin', maxId: 'vscaleMax', defaultMin: 200, defaultMax: 2000 },
    { sliderId: 'hscale', minId: 'hscaleMin', maxId: 'hscaleMax', defaultMin: 60, defaultMax: 240 },
    
    // Tabla & Mástil
    { sliderId: 'boardVolL', minId: 'boardVolLMin', maxId: 'boardVolLMax', defaultMin: 40, defaultMax: 140 },
    { sliderId: 'boardArea', minId: 'boardAreaMin', maxId: 'boardAreaMax', defaultMin: 0.40, defaultMax: 1.20 },
    { sliderId: 'mastH', minId: 'mastHMin', maxId: 'mastHMax', defaultMin: 0.60, defaultMax: 1.20 },
    { sliderId: 'boardLen', minId: 'boardLenMin', maxId: 'boardLenMax', defaultMin: 1.10, defaultMax: 1.90 },
    
    // Sliders de escala
    { sliderId: 'velscale', minId: 'velscaleMin', maxId: 'velscaleMax', defaultMin: 0.1, defaultMax: 6 },
    { sliderId: 'fuerzascale', minId: 'fuerzascaleMin', maxId: 'fuerzascaleMax', defaultMin: 0.1, defaultMax: 6 }
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
  
  ["showHorizon","showFeet","showArc","showLabels","phiFollow","showFlow","showChord","showLD","showTableVel","showAxesW","showAxesB","showWeight","showBuoy","showResultants"]
    .forEach(id=> S(id).addEventListener('change', draw, {passive:true}));
  S('playPause').addEventListener('click', togglePlayPause);
  S('fwd').addEventListener('click', ()=> step(+1));
  S('back').addEventListener('click', ()=> step(-1));
  S('panL').addEventListener('click', ()=>{ pan.x -= 18; draw(); });
  S('panR').addEventListener('click', ()=>{ pan.x += 18; draw(); });
  S('panU').addEventListener('click', ()=>{ pan.y -= 18; draw(); });
  S('panD').addEventListener('click', ()=>{ pan.y += 18; draw(); });
  S('pan0').addEventListener('click', ()=>{ pan={x:0,y:0}; draw(); });
  S('state0').addEventListener('click', resetState);
  
  // Inicializar el estado del botón Play/Pause
  const playPauseButton = S('playPause');
  if(playPauseButton){
    playPauseButton.textContent = '▶ Play';
    playPauseButton.innerHTML = '▶ Play';
  }
  
  // Aplicar definiciones técnicas a todos los elementos
  applyTechnicalDefinitions();
}

function P(){
  return {
    V0:+S("v0").value, phi0:+S("phi").value, theta0:+S("theta0").value, gamma0:+S("gamma0").value,
    S:+S("S").value, rho:+S("rho").value, mass:+S("mass").value, LD:+S("LD").value,
    clslope:+S("clslope").value, clmax:+S("clmax").value, astall:+S("stall").value,
    freq:+S("freq").value, ampV:+S("ampV").value, ampT:+S("ampT").value, ampG:+S("ampG").value,
    phaseT:+S("phaseT").value, phaseG:+S("phaseG").value, dt:+S("dtStep").value,
    lambda:+S("lambda").value, d:+S("dstance").value, Af:+S("Af").value, Ab:+S("Ab").value,
    phaseF:+S("phaseF").value, phaseB:+S("phaseB").value, Gtheta:+S("Gtheta").value, Kphi:+S("Kphi").value,
    h0:+S("h0").value, cw:+S("cw").value, velscale:+S("velscale").value, vscale:+S("vscale").value, hscale:+S("hscale").value, fuerzascale:+S("fuerzascale").value,
    boardVolL:+S("boardVolL").value, boardArea:+S("boardArea").value, mastH:+S("mastH").value, boardLen:+S("boardLen").value,
    show:{ horizon:S("showHorizon").checked, feet:S("showFeet").checked, arc:S("showArc").checked, labels:S("showLabels").checked, flow:S("showFlow").checked, chord:S("showChord").checked, LD:S("showLD").checked, tableVel:S("showTableVel").checked, phiFollow:S("phiFollow").checked, axesW:S("showAxesW").checked, axesB:S("showAxesB").checked, weight:S("showWeight").checked, buoy:S("showBuoy").checked, result:S("showResultants").checked }
  };
}

function labelRefresh(p){
  S("v0v").textContent=p.V0.toFixed(2); S("phiv").textContent=p.phi0.toFixed(1);
  S("thetav").textContent=p.theta0.toFixed(1); S("gammav").textContent=p.gamma0.toFixed(1);
  S("Sv").textContent=p.S.toFixed(3); S("rhov").textContent=p.rho.toFixed(0);
  S("massv").textContent=p.mass.toFixed(0); S("LDv").textContent=p.LD.toFixed(1);
  S("clslopev").textContent=p.clslope.toFixed(3); S("clmaxv").textContent=p.clmax.toFixed(2);
  S("stallv").textContent=p.astall.toFixed(1);
  S("freqv").textContent=p.freq.toFixed(2); S("ampVv").textContent=p.ampV.toFixed(2);
  S("ampTv").textContent=p.ampT.toFixed(1); S("ampGv").textContent=p.ampG.toFixed(1);
  S("phaseTv").textContent=p.phaseT.toFixed(0); S("phaseGv").textContent=p.phaseG.toFixed(0);
  S("lambdav").textContent=p.lambda.toFixed(2); S("dv").textContent=p.d.toFixed(2);
  S("Afv").textContent=p.Af.toFixed(0); S("Abv").textContent=p.Ab.toFixed(0);
  S("phifv").textContent=p.phaseF.toFixed(0); S("phibv").textContent=p.phaseB.toFixed(0);
  S("Gthv").textContent=p.Gtheta.toFixed(4); S("Kphiv").textContent=p.Kphi.toFixed(4);
  S("h0v").textContent=p.h0.toFixed(2); S("cwv").textContent=p.cw.toFixed(0);
  S("vscalev").textContent=p.vscale.toFixed(0); S("hscalev").textContent=p.hscale.toFixed(0);
  S("velscalev").textContent=p.velscale.toFixed(1); S("fuerzascalev").textContent=p.fuerzascale.toFixed(1);
  S("volv").textContent=p.boardVolL.toFixed(0); S("areav").textContent=p.boardArea.toFixed(2);
  S("mastv").textContent=p.mastH.toFixed(2); S("Ltabv").textContent=p.boardLen.toFixed(2);
  S("dtv").textContent=p.dt.toFixed(3);
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
// Esto permite calcular aceleraciones y dinámica real (a diferencia del modo deprecated)
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
  // tu CL usa grados → convierto:
  let CL = CL_from_alpha(alpha*180/Math.PI, p.clslope, p.clmax, p.astall);
  if(st.z >= 0){ CL = 0; }                 // foil fuera del agua
  const L = 0.5*p.rho*V*V*p.S*CL;
  const D = L/Math.max(1e-6,p.LD);
  const Lx = L*(-Math.sin(gamma)), Ly = L*( Math.cos(gamma));
  const Dx = D*(-Math.cos(gamma)), Dy = D*(-Math.sin(gamma));
  return {alpha, gamma, V, L, D, Lx, Ly, Dx, Dy};
}

// Empuje de Arquímedes (usa tu buoyancy existente con z=h)
function buoyancyZ(p, z){
  const B = buoyancy(p, z); // {Fb, draft,...}
  return {Fb: B.Fb, draft: B.draft};
}

// Momento total de cabeceo
function totalMoment(p, hydro, Mrider, theta, q){
  const Mhyd = dyn.Malpha * (hydro.alpha);       // α en rad
  return Mhyd + Mrider - dyn.cq*q - dyn.ktheta*(theta - 0);
}

// RHS: Xdot = f(t, X, p)
function rhs(t, st, p){
  const {Ff,Fb,Mr} = feetForcesODE(p,t);
  const hydro = hydroFromState(p, st);
  const buoy = buoyancyZ(p, st.z);

  const Fx = hydro.Lx + hydro.Dx - dyn.cu*st.u;            // + Fwing_x si se quiere
  const Fz = hydro.Ly + hydro.Dy + buoy.Fb - p.mass*9.81 - p.cw*st.w;

  const M = totalMoment(p, hydro, Mr, st.theta, st.q);

  const dx  = st.u;
  const dz  = st.w;
  const du  = Fx / p.mass;
  const dw  = Fz / p.mass;
  const dth = st.q;
  const dq  = M  / dyn.Itheta;

  return { dx, dz, du, dw, dth, dq,
           out: { alpha:hydro.alpha*180/Math.PI, gamma:hydro.gamma*180/Math.PI, L:hydro.L, D:hydro.D,
                  Th: hydro.Lx + hydro.Dx, Vert: hydro.Ly + hydro.Dy, Fb: buoy.Fb, Mr } };
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
  let CL=slope*a; CL=Math.sign(CL||1)*Math.min(Math.abs(CL),clmax);
  const aa=Math.abs(a); if(aa>astall){ const fade=Math.max(0,1-(aa-astall)/8); CL*=fade; }
  return CL;
}

// ========== FUNCIÓN DEPRECATED ==========
// ⚠️  DEPRECATED: instant() solo se usa en modo prescrito (deprecated)
// Esta función calcula fuerzas aerodinámicas con velocidad prescrita,
// ignorando la dinámica real del sistema. Use hydroFromState() en modo ODE.
function instant(p,t){
  const {Ff,Fb,Mr}=riderFM(p,t);
  const theta_eff = p.theta0 - p.Gtheta*Mr;
  const gamma = p.gamma0 + p.ampG*Math.sin(2*Math.PI*p.freq*t + p.phaseG*Math.PI/180);
  const alpha = theta_eff - gamma;
  const V = p.V0 + p.ampV*Math.sin(2*Math.PI*p.freq*t);
  let CL=CL_from_alpha(alpha,p.clslope,p.clmax,p.astall);
  if(h>=0){ CL=0; } else { const hFade=0.05; if(-h<hFade) CL*=(-h/hFade); }
  const L=0.5*p.rho*V*V*p.S*CL;
  const D=L/Math.max(1e-6,p.LD);
  const Lx=L*Math.cos((gamma+90)*Math.PI/180), Ly=L*Math.sin((gamma+90)*Math.PI/180);
  const Dx=D*Math.cos((gamma+180)*Math.PI/180), Dy=D*Math.sin((gamma+180)*Math.PI/180);
  const Th=Lx+Dx, Vert=Ly+Dy, Sup=(Vert/(p.mass*9.81))*100;
  return {Ff,Fb,Mr,theta_eff,gamma,alpha,V,L,D,Th,Vert,Sup};
}

// Arquímedes / calado (rectángulo)
function buoyancy(p, h){
  const Vb = Math.max(0, p.boardVolL/1000);
  const Ab = Math.max(1e-6, p.boardArea);
  const tb = Math.min(1.0, Vb/Ab);
  const Lm = Math.max(0.8, p.boardLen);
  const y_anchor = h + p.mastH; // marco W (y=0 superficie)
  const phiDeg = p.show.phiFollow ? (p.phi0 - p.Kphi*(riderFM(p,t).Mr)) : p.phi0;

  // DEBUG: Validar que no haya NaN en phiDeg
  if (isNaN(phiDeg) || isNaN(p.phi0) || (p.show.phiFollow && (isNaN(p.Kphi) || isNaN(riderFM(p,t).Mr)))) {
    console.error('NaN detectado en phiDeg (buoyancy):', {
      phiDeg,
      p_phi0: p.phi0,
      p_Kphi: p.Kphi,
      riderFM_Mr: riderFM(p,t).Mr,
      phiFollow: p.show.phiFollow
    });
    // Usar valor por defecto si hay NaN
    phiDeg = p.phi0 || 0;
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
  t=(t+dir*dt);
  // wrap for history cycle detection
  let crossed = false;
  if(dir>0 && (old_t%T) > (t%T)) crossed = true;
  if(dir<0 && (old_t%T) < (t%T)) crossed = true;

  let ins;
  if(document.getElementById('useODE') && document.getElementById('useODE').checked){
    // Integrar ODE
    const sign = (dir>=0)? 1 : -1;
    X = rk4Step(X, sign*dt, p, t);
    h = X.z;  // usar z como heave para el dibujo (m)
    wv = X.w; // actualizar velocidad vertical global para consistencia
    
    // Obtener fuerzas del rider para el modo ODE
    const {Ff, Fb} = feetForcesODE(p, t);
    
    ins = { alpha:X._out.alpha, gamma:X._out.gamma, L:X._out.L, D:X._out.D,
            Th:X._out.Th, Vert:X._out.Vert, V:X.u, Ff, Fb,
            Sup: ((X._out.Vert + buoyancy(p,h).Fb) / (p.mass*9.81))*100,
            theta_eff: X.theta*180/Math.PI, Mr:X._out.Mr };
  } else {
    // ========== MODO PRESCRITO (DEPRECATED) ==========
    // ⚠️  DEPRECATED: Este modo usa velocidad prescrita y no considera
    // la dinámica real del sistema. Use el modo ODE para simulaciones físicas.
    // El modo prescrito será removido en futuras versiones.
    console.warn('⚠️ Modo prescrito (no ODE) está deprecated. Use el modo físico (ODE) para mejores resultados.');
    const ins0 = instant(p, (t%T+T)%T);
    // mantener integrador vertical existente si lo tienes (h, wv)
    const B=buoyancy(p,h); const mg=p.mass*9.81; const acc=(ins0.Vert+B.Fb-mg-p.cw*wv)/p.mass;
    wv += acc*dt; h += wv*dt;
    ins = ins0;
  }

  S('tVal').textContent=((t%T+T)%T).toFixed(2);

  // histórico acumulado (sólo cuando avanzamos)
  if(dir>0){
    cyc_acc.na++; cyc_acc.a+=ins.alpha; cyc_acc.th+=ins.theta_eff; cyc_acc.L+=ins.L; cyc_acc.Th+=ins.Th; cyc_acc.Fr+=((ins.Ff || 0) + (ins.Fb || 0));
    if(crossed) endCyclePush();
  }
  draw(ins);
}


function draw(instOpt){
  const p=P(); labelRefresh(p);
  
  let inst;
  if(instOpt){
    inst = instOpt;
  } else {
    // Usar el mismo modo que step() para consistencia
    if(document.getElementById('useODE') && document.getElementById('useODE').checked){
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
        Sup: ((hydro.Ly + hydro.Dy + buoy.Fb) / (p.mass*9.81))*100
      };
    } else {
      // Modo prescrito (deprecated)
      inst = instant(p,t);
    }
  }
  
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
  const wpx=svg.clientWidth||600, hpx=svg.clientHeight||420;
  const scale = p.vscale;
  const cx=wpx*0.50 + pan.x;
  const horizonY=hpx*0.45 + pan.y;
  const cy=(hpx*0.62 + pan.y) - h*scale;

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
  function arrow2(x1,y1,x2,y2,stroke='#000',w2=2){
    const L=document.createElementNS('http://www.w3.org/2000/svg','line');
    L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2);
    L.setAttribute('stroke',stroke);L.setAttribute('stroke-width',w2);
    L.setAttribute('marker-end', ensureMarker(stroke));
    svg.appendChild(L); return L;
  }

  // Superficie del agua (visual)
  if(p.show.horizon){
    line(20,horizonY,wpx-20,horizonY,'#333',1).setAttribute('stroke-dasharray','6,4');
    text(wpx-140,horizonY-6,'Superficie del agua',10);
  }

  
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

  // φ efectivo
  const phiDeg = p.show.phiFollow ? (p.phi0 - p.Kphi*inst.Mr) : p.phi0;

  // DEBUG: Validar que no haya NaN en phiDeg
  if (isNaN(phiDeg) || isNaN(p.phi0) || (p.show.phiFollow && (isNaN(p.Kphi) || isNaN(inst.Mr)))) {
    console.error('NaN detectado en phiDeg (draw):', {
      phiDeg,
      p_phi0: p.phi0,
      p_Kphi: p.Kphi,
      inst_Mr: inst.Mr,
      phiFollow: p.show.phiFollow
    });
    // Usar valor por defecto si hay NaN
    phiDeg = p.phi0 || 0;
  }

  const phi = phiDeg*Math.PI/180;

  // Geometría tabla
  const Lb=Math.max(40, p.boardLen * (p.hscale||110)); // largo en px para dibujo
  const tHat=[Math.cos(phi), Math.sin(phi)];
  const nHat=[-Math.sin(phi), Math.cos(phi)];
  const xAnchor = cx;
  const yAnchor = cy - p.mastH*scale;
  line(cx, cy, xAnchor, yAnchor, '#444', 3); text(xAnchor+6, yAnchor-6, 'Mástil H');

  // Rectángulo tabla
  const Vb = Math.max(0, p.boardVolL/1000);
  const Ab = Math.max(1e-6, p.boardArea);
  const tb = Math.min(1.0, Vb/Ab);
  const Tb = Math.max(4, tb * scale);
  const hx = (Lb/2)*tHat[0], hy=(Lb/2)*tHat[1];
  const nx = (Tb/2)*nHat[0], ny=(Tb/2)*nHat[1];
  const p1=[xAnchor - hx - nx, yAnchor - hy - ny];
  const p2=[xAnchor + hx - nx, yAnchor + hy - ny];
  const p3=[xAnchor + hx + nx, yAnchor + hy + ny];
  const p4=[xAnchor - hx + nx, yAnchor - hy + ny];
  const boardPoly=[p1,p2,p3,p4];

  const poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
  poly.setAttribute('points', boardPoly.map(p=>`${p[0]},${p[1]}`).join(' '));
  poly.setAttribute('fill', '#ddd'); poly.setAttribute('stroke', '#777'); poly.setAttribute('stroke-width', '1.2');
  svg.appendChild(poly);
  text(xAnchor + hx + 8, yAnchor + hy, 'Tabla (φ)');

  // Flechas pies (⊥ tabla, hacia ella)
  if(p.show.feet){
    const mid=[(p1[0]+p3[0])/2,(p1[1]+p3[1])/2];
    const pixStance = Math.min(0.9*Lb, Math.max(10, p.d*(p.hscale||110)));
    const front=[mid[0]+(pixStance/2)*tHat[0], mid[1]+(pixStance/2)*tHat[1]];
    const back =[mid[0]-(pixStance/2)*tHat[0], mid[1]-(pixStance/2)*tHat[1]];
    const kpx = (40/(p.mass*9.81))*(p.fuerzascale||1);
    const fLen=Math.max(12, kpx*Math.max(0,inst.Ff));
    const bLen=Math.max(12, kpx*Math.max(0,inst.Fb));
    const fTip=[front[0]+fLen*nHat[0], front[1]+fLen*nHat[1]];
    const bTip=[back[0]+bLen*nHat[0],  back[1]+bLen*nHat[1]];
// Antes de la llamada arrow2, añade:
console.log('Debugging arrow2 params:');
console.log('front:', front, 'ftip:',fTip[1]);
    
    arrow2(front[0],front[1], fTip[0],fTip[1], '#c00', 2.0); // pie delantero
    arrow2(back[0], back[1],  bTip[0], bTip[1], '#06c', 2.0); // pie trasero
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

  // Ejes W (global fijo) y B (popa, solidario a tabla)
  if(p.show.axesW){
    const xg = 34 + pan.x, yg = horizonY - 40;
    arrow2(xg,yg, xg+28, yg, '#000',1.6); text(xg+32, yg+4, 'x');
    arrow2(xg,yg, xg, yg-28, '#000',1.6); text(xg-8,  yg-30,'y');
    const cW=document.createElementNS('http://www.w3.org/2000/svg','circle'); cW.setAttribute('cx',xg); cW.setAttribute('cy',yg); cW.setAttribute('r','3'); cW.setAttribute('fill','#000'); svg.appendChild(cW);
    text(xg-12, yg-8, 'W(0,0)');
  }
  if(p.show.axesB){
    const sternX = xAnchor - (Lb/2)*tHat[0];
    const sternY = yAnchor - (Lb/2)*tHat[1];
    arrow2(sternX,sternY, sternX+32*tHat[0], sternY+32*tHat[1], '#000',1.6); text(sternX+32*tHat[0]+4, sternY+32*tHat[1]+4, 'x_b');
    arrow2(sternX,sternY, sternX+32*nHat[0], sternY+32*nHat[1], '#000',1.6); text(sternX+32*nHat[0]+4, sternY+32*nHat[1]+4, 'y_b');
    const cB=document.createElementNS('http://www.w3.org/2000/svg','circle'); cB.setAttribute('cx',sternX); cB.setAttribute('cy',sternY); cB.setAttribute('r','3'); cB.setAttribute('fill','#000'); svg.appendChild(cB);
    text(sternX-14, sternY-8, 'B(0,0)');
  }

  // Vectores flujo y cuerda
  if(p.show.chord){
    const th=phi, Lc=100; // Usar phi (ángulo de la tabla) para mantener paralelismo
    const cxa=cx-(Lc/2)*Math.cos(th), cya=cy-(Lc/2)*Math.sin(th);
    const cxb=cx+(Lc/2)*Math.cos(th), cyb=cy+(Lc/2)*Math.sin(th);
    line(cxa,cya,cxb,cyb,'#000',4); text(cxb+6,cyb,'Cuerda (φ)');
  }
  if(p.show.flow){
    const kpx = (40/(p.mass*9.81)) * (p.velscale||1);
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
    
    arrow2((cx - finalVx) - 100, (cy - finalVy) + 50, cx - 100, cy + 50, '#000', 1.2); 
    text((cx - 100)+6, (cy + 50),'V_rel (γ)');
  }

  // Vectores L/D
  if(p.show.LD){
    const kpx = (40/(p.mass*9.81)) * (p.fuerzascale||1);
    const Llen = Math.max(12, kpx*Math.max(0,inst.L));
    const Dlen = Math.max(12, kpx*Math.max(0,inst.D));
    const g = inst.gamma*Math.PI/180;
    const lhat = [Math.cos(g-Math.PI/2), Math.sin(g-Math.PI/2)];  // ← Corregido: -90° en lugar de +90°
    const dhat = [Math.cos(g+Math.PI),   Math.sin(g+Math.PI)  ];
    arrow2(cx, cy, cx + Llen*lhat[0], cy + Llen*lhat[1], '#2e7d32', 2.5);
    arrow2(cx, cy, cx + Dlen*dhat[0], cy + Dlen*dhat[1], '#ad8b00', 2.5);
  }

  // Vector velocidad de la tabla (en la esquina superior derecha de la tabla)
  if(p.show.tableVel){
    const kpx = (40/(p.mass*9.81)) * (p.velscale||1);
    
    // Verificar si inst.V es válido
    if (isNaN(inst.V) || inst.V === undefined) {
      console.warn('inst.V is invalid:', inst.V);
      return;
    }
    
    const Vx = kpx * inst.V; // Componente horizontal
    const Vy = kpx * wv;     // Componente vertical (wv se actualiza en ambos modos)
    
    // Asegurar longitud mínima visible pero proporcional a velscale
    const minLength = 5 * (p.velscale || 1);
    const currentLength = Math.sqrt(Vx*Vx + Vy*Vy);
    const scaleFactor = currentLength < minLength && currentLength > 0 ? minLength / currentLength : 1;
    const finalVx = Vx * scaleFactor;
    const finalVy = Vy * scaleFactor;
    
    arrow2(p3[0], p3[1], p3[0] + finalVx, p3[1] + finalVy, '#0066cc', 2.5);
    text(p3[0] + finalVx + 6, p3[1] + finalVy, 'V_tabla');
  }

  // Peso, Arquímedes, Resultantes
  if(p.show.weight){
    const mg=p.mass*9.81; const k=(40/(p.mass*9.81))*(p.fuerzascale||1);
    arrow2(cx, cy, cx, cy + Math.max(12,k*mg), '#222', 2.5); text(cx+6, cy+22, 'mg');
  }
  if(p.show.buoy && B.draft>0){
    const k=(40/(p.mass*9.81))*(p.fuerzascale||1);
    arrow2(cx, cy - p.mastH*scale, cx, cy - p.mastH*scale - Math.max(12,k*B.Fb), '#0a6', 2.5);
  }
  if(p.show.result){
    const mg=p.mass*9.81; const k=(40/(p.mass*9.81))*(p.fuerzascale||1);
    const VertRes = inst.Vert + B.Fb - mg;
    const dirv = VertRes>=0 ? -1 : 1;
    arrow2(cx, cy, cx, cy + dirv*Math.max(12, Math.abs(k*VertRes)), '#a0a', 2.5);
    arrow2(cx, cy, cx + Math.sign(inst.Th)*Math.max(12, Math.abs(k*inst.Th)), cy, '#a0a', 2.5);
  }

  refreshCharts();
}

function drawSeries(svgId, series, colors, ylabel){
  const svg = S(svgId); if(!svg) return; svg.innerHTML='';
  const w = svg.clientWidth||240, h = svg.clientHeight||140;
  const pad = {l:28,r:6,t:6,b:18};
  const W = w-pad.l-pad.r, H = h-pad.t-pad.b;
  function line(x1,y1,x2,y2,st='#000',w2=1){const L=document.createElementNS('http://www.w3.org/2000/svg','line'); L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2); L.setAttribute('stroke',st);L.setAttribute('stroke-width',w2); svg.appendChild(L);}
  function text(x,y,t,fs=10,st='#444'){const T=document.createElementNS('http://www.w3.org/2000/svg','text');T.setAttribute('x',x);T.setAttribute('y',y);T.setAttribute('font-size',fs);T.setAttribute('fill',st);T.textContent=t;svg.appendChild(T);}
  const all=[]; series.forEach(arr=>all.push(...arr.filter(v=>!isNaN(v)))); if(all.length===0){ text(8,20,ylabel,10); return; }
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

window.addEventListener('DOMContentLoaded', ()=>{ bindUI(); resetState(); });
