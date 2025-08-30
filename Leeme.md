# Simulador de Wing Foil v23h8

## 📋 Descripción

Aplicación web interactiva que simula la física y dinámica del wing foil, un deporte acuático que combina una tabla con hydrofoil y un ala inflable de mano. El simulador modela en tiempo real las fuerzas aerodinámicas, hidrodinámicas y biomecánicas involucradas en este deporte.

### 🆕 **Novedades v23h8**
- **Sistema de Control Dinámico de Límites**: Inputs completamente libres con actualización automática de sliders
- **Flexibilidad Total**: Exploración sin restricciones de rangos personalizados
- **Rangos Sugeridos**: Información técnica independiente en tooltips
- **Persistencia Mejorada**: Configuraciones de límites guardadas automáticamente

## 📦 Instalación y Ejecución

### Requisitos Previos
- **Node.js** (versión 14 o superior)
- **Navegador web** moderno con soporte SVG

### Instalación
```bash
# Clonar o descargar el repositorio
git clone https://github.com/ahidalgo1961/SimuladorPumpFoil.git
cd SimuladorPumpFoil

# Instalar dependencias
npm install
```

### Ejecución
```bash
# Opción 1: Usando npm
npm start

# Opción 2: Ejecutar directamente
node server.js

# Opción 3: Abrir directamente en navegador
# Abrir index.html en tu navegador web
```

### Acceso a la Aplicación
Una vez ejecutado el servidor, abre tu navegador y ve a:
```
http://localhost:3001
```

## 🎯 Características Principales

### Sistema de Visualización
- **Diagrama geométrico en tiempo real** con representación SVG
- **Vectores de fuerzas** visualizados con escalas ajustables
- **Animación continua** del ciclo de navegación
- **Controles de navegación temporal** (play, pause, step forward/backward)
- **Sistema de pan** para ajustar la vista
- **Múltiples capas visuales** activables/desactivables

### Parámetros Controlables

#### 🪂 Parámetros Aerodinámicos Básicos
- **V₀**: Velocidad inicial (2-6 m/s)
- **φ base**: Ángulo de inclinación lateral de la tabla (-10° a 15°)
- **θ₀ base**: Ángulo de ataque base del foil (-5° a 12°)
- **γ₀**: Ángulo de trayectoria del flujo (-15° a 10°)
- **S**: Superficie alar del foil (0.08-0.22 m²)
- **ρ**: Densidad del agua (950-1030 kg/m³)
- **L/D**: Relación sustentación/arrastre (4-12)

#### ✈️ Coeficientes Aerodinámicos
- **CL/α**: Pendiente de la curva de sustentación (0.04-0.14 por grado)
- **CLmax**: Coeficiente de sustentación máximo (0.7-1.5)
- **α* pérdida**: Ángulo de pérdida aerodinámica (6-16°)

#### 🔄 Ciclo Dinámico
- **Frecuencia** del pumping (0.6-2.5 Hz)
- **Amplitudes** de oscilación para velocidad, ángulos θ y γ
- **Desfases** entre componentes del movimiento

#### 🏄 Modelo del Rider
- **Masa** del deportista (55-110 kg)
- **λ reparto**: Distribución de peso entre pies (30-70% adelante)
- **d stance**: Distancia entre pies (0.4-0.9 m)
- **A_f, A_b**: Amplitudes de fuerza en pie delantero y trasero (0-600 N)
- **Gθ**: Ganancia del momento sobre el ángulo θ
- **Kφ**: Ganancia del momento sobre el ángulo φ
- **Formas de onda**: Sinusoidal, media onda, triangular o pulso

#### 🏄‍♂️ Tabla y Mástil
- **Volumen** de la tabla (40-140 litros)
- **Superficie** de la tabla (0.40-1.20 m²)
- **Altura del mástil** (0.60-1.20 m)
- **Longitud de la tabla** (1.10-1.90 m)

#### 📏 Parámetros de Escala y Visualización
- **vscale**: Escala vertical del diagrama (200-2000)
- **hscale**: Escala horizontal del diagrama (60-240)
- **velscale**: Escala de vectores de velocidad (0.1-6)
- **fuerzascale**: Escala de vectores de fuerza (0.1-6)
- **Longitud de la tabla** (1.10-1.90 m)

### KPIs en Tiempo Real
- **α**: Ángulo de ataque efectivo
- **θ_eff**: Ángulo de incidencia efectivo
- **L**: Fuerza de sustentación (N)
- **D**: Fuerza de arrastre (N)
- **Empuje**: Componente horizontal de propulsión
- **% soporte**: Porcentaje del peso soportado por el foil
- **M_rider**: Momento generado por el rider
- **h_CoP**: Altura del centro de presión
- **Empuje Arquímedes**: Flotabilidad de la tabla
- **Calado**: Profundidad de inmersión de la tabla

## 🎛️ **Sistema de Control Dinámico de Límites**

### Características Avanzadas
- **Inputs Completamente Libres**: Las cajas Min/Max aceptan cualquier valor numérico sin restricciones
- **Actualización Automática**: Los sliders se adaptan dinámicamente cuando cambian los límites
- **Rangos Sugeridos Independientes**: Información técnica disponible en tooltips (no afecta funcionalidad)
- **Persistencia Automática**: Configuraciones de límites guardadas en localStorage
- **Flexibilidad Total**: Permite explorar rangos personalizados sin límites artificiales

### Cómo Usar el Sistema de Límites
1. **Modificar Rangos**: Escribe nuevos valores en las cajas Min/Max de cualquier slider
2. **Exploración Libre**: Los valores pueden ser positivos, negativos, decimales o cualquier número
3. **Actualización Inmediata**: Los sliders responden automáticamente a los cambios
4. **Información Técnica**: Pasa el mouse sobre las etiquetas para ver rangos sugeridos
5. **Configuración Persistente**: Tus límites personalizados se guardan automáticamente

### Beneficios del Sistema
- **Exploración Sin Límites**: Prueba configuraciones extremas sin restricciones
- **Análisis Personalizado**: Adapta rangos a tus necesidades específicas
- **Interfaz Intuitiva**: Cambios se reflejan inmediatamente en la simulación
- **Información Preservada**: Rangos técnicos siempre disponibles en tooltips

## ⚙️ **Modo Físico (ODE) - ÚNICO MODO**

### Características Avanzadas
- **Integración Numérica**: Método Runge-Kutta 4to orden (RK4) para máxima precisión
- **Estados Dinámicos**: Variables x,z,u,w,θ,q completamente acopladas
- **Fuerzas Acopladas**: Interacción completa entre aerodinámica e hidrodinámica
- **Condiciones Iniciales Consistentes**: Estados físicos realistas al iniciar
- **Modo Único**: Simulación física avanzada como estándar

### Estados del Sistema ODE
- **x**: Posición horizontal (m)
- **z**: Posición vertical (m)
- **u**: Velocidad horizontal (m/s)
- **w**: Velocidad vertical (m/s)
- **θ**: Ángulo de pitch (rad)
- **q**: Velocidad angular (rad/s)

### Ventajas del Modo ODE
- **Precisión Física**: Comportamiento realista del sistema dinámico
- **Estabilidad Numérica**: Integración robusta para largos periodos de simulación
- **Acoplamiento Completo**: Todas las fuerzas interactúan correctamente
- **Condiciones Iniciales**: Estados consistentes que evolucionan naturalmente

## 🔧 **Parámetros de Escala y Visualización**

### Escalas de Visualización
- **vscale**: Escala vertical del diagrama (200-2000)
- **hscale**: Escala horizontal del diagrama (60-240)
- **velscale**: Escala de vectores de velocidad (0.1-6)
- **fuerzascale**: Escala de vectores de fuerza (0.1-6)

### Control de Visualización
- **Escalas Dinámicas**: Ajusta el tamaño de los vectores y elementos gráficos
- **Vista Personalizable**: Adapta la visualización a tus necesidades
- **Persistencia**: Configuraciones de escala guardadas automáticamente

## 🔬 Física y Modelos Matemáticos

### 1. Modelo Aerodinámico

#### Sustentación (Lift)
```
L = ½ ρ V² S CL(α)
```
Donde:
- ρ: densidad del fluido
- V: velocidad relativa
- S: superficie alar
- CL: coeficiente de sustentación

#### Coeficiente de Sustentación
El simulador implementa un modelo no lineal que incluye:
- Región lineal: `CL = CL_slope × α`
- Limitación por CLmax
- Degradación post-pérdida con factor de desvanecimiento

#### Arrastre (Drag)
```
D = L / (L/D)
```

### 2. Modelo de Fuerzas del Rider

#### Distribución de Peso
```
F_front = λ × W + A_f × wave(t)
F_back = (1-λ) × W + A_b × wave(t)
```

#### Momento del Rider
```
M_rider = (F_back - F_front) × (d/2)
```

Este momento modifica el ángulo de ataque efectivo:
```
θ_eff = θ₀ - Gθ × M_rider
```

### 3. Modelo Hidrodinámico

#### Principio de Arquímedes
```
F_buoyancy = ρ_agua × g × V_sumergido
```

El simulador calcula el volumen sumergido basándose en:
- La geometría de la tabla
- El ángulo φ de inclinación
- La altura h respecto al agua

#### Efecto Suelo
Cuando el foil se acerca a la superficie (h → 0), se aplica un factor de reducción a la sustentación para simular la pérdida de eficiencia.

### 4. Dinámica Vertical

#### Ecuación de Movimiento
```
m × a = L_vertical + F_buoyancy - m×g - c_w×v
```

Donde:
- L_vertical: componente vertical de la sustentación
- F_buoyancy: empuje de Arquímedes
- m×g: peso
- c_w×v: amortiguamiento viscoso

### 5. Modelo de Oscilación

El simulador permite diferentes formas de onda para el pumping:
- **Sinusoidal**: Movimiento armónico clásico
- **Media onda**: Solo valores positivos
- **Triangular**: Cambios lineales
- **Pulso**: Concentración de energía en momentos específicos

## 🎮 Uso de la Aplicación

### Controles de Simulación
1. **Play/Pause**: Inicia o detiene la animación
2. **Step Forward/Backward**: Avanza o retrocede frame a frame
3. **Pan**: Ajusta la vista del diagrama
4. **Reset estado**: Reinicia posición y velocidad vertical

### Sistema de Control de Parámetros
- **Sliders Interactivos**: Control directo de todos los parámetros físicos
- **Control de Límites Dinámico**: 
  - Cajas Min/Max completamente libres para cualquier valor
  - Actualización automática de rangos de sliders
  - Rangos sugeridos disponibles en tooltips
  - Persistencia automática de configuraciones personalizadas
- **Tooltips Informativos**: Información técnica detallada al pasar el mouse

### Opciones de Visualización
- **Superficie del agua**
- **Vectores de fuerza** en los pies
- **Arco del ángulo de ataque**
- **Etiquetas de valores**
- **Vector de flujo**
- **Línea de cuerda**
- **Vectores L/D**
- **Ejes de referencia** (global y local)
- **Peso y flotabilidad**
- **Fuerzas resultantes**
- **Controles de escala**: vscale, hscale, velscale, fuerzascale para ajustar visualización

## 💾 Persistencia

La aplicación guarda automáticamente en el localStorage del navegador:
- Los valores actuales de todos los parámetros de simulación
- Las configuraciones de límites personalizados de cada slider
- Las preferencias de visualización y escalas

Esto permite recuperar completamente la configuración personalizada en sesiones posteriores, incluyendo rangos de sliders modificados por el usuario.

## 🧮 Algoritmos Clave

### Cálculo del Calado
El simulador determina la inmersión de la tabla calculando la intersección entre:
- La geometría rectangular inclinada de la tabla
- El plano de la superficie del agua

### Modelo de Pérdida Aerodinámica
Implementa una degradación suave del CL después del ángulo de pérdida:
```javascript
if (|α| > α_stall) {
    fade = max(0, 1 - (|α| - α_stall) / 8)
    CL = CL × fade
}
```

### Integración Temporal
Utiliza el método de Euler con paso de tiempo adaptativo:
```
dt = T / 240  // T es el periodo del ciclo
```

## 🌊 Fenómenos Físicos Modelados

1. **Sustentación aerodinámica** del hydrofoil
2. **Arrastre inducido y parásito**
3. **Efecto suelo** cerca de la superficie
4. **Flotabilidad** y principio de Arquímedes
5. **Momento de cabeceo** por distribución de fuerzas
6. **Oscilaciones forzadas** (pumping)
7. **Amortiguamiento viscoso** del agua
8. **Pérdida aerodinámica** (stall)
9. **Acoplamiento aero-hidrodinámico**
10. **Dinámica del centro de presión**

## 🔧 Tecnologías

- **HTML5** para la estructura
- **CSS Grid** para el layout responsive
- **SVG** para visualización vectorial
- **JavaScript vanilla** para la lógica de simulación
- **localStorage** para persistencia de datos

## 📊 Aplicaciones

Este simulador es útil para:
- **Educación**: Comprensión de la física del wing foil
- **Entrenamiento**: Análisis de técnicas de pumping
- **Diseño**: Evaluación de parámetros de foils
- **Investigación**: Estudio de la dinámica del sistema
- **Optimización**: Búsqueda de configuraciones eficientes

---

# 🚀 Guía de Inicio Rápido

## 🎯 Cómo Elegir el Modo de Servidor

| Situación | Mejor Opción | Comando | Ventajas |
|-----------|-------------|---------|----------|
| **Desarrollo diario** | **Live Server** | `npx live-server --port=8080` | ✅ Auto-recarga automática<br>✅ Puerto automático<br>✅ Cualquier navegador |
| **Vista rápida** | **Simple Browser** | Ctrl+Shift+P → "Simple Browser: Show" | ✅ Integrado en VS Code<br>✅ Sin instalación<br>✅ Vista rápida |
| **Producción** | **Node.js Server** | `node server.js` | ✅ Control total<br>✅ Personalizable<br>✅ Sin dependencias externas |
| **Sin internet** | **Archivo Directo** | Arrastrar `index.html` al navegador | ✅ Sin servidor<br>✅ Ultra-rápido<br>✅ Sin dependencias |

## 📋 Instrucciones para Cada Modo

### 🌐 **MODO 1: Servidor Node.js**
```bash
# En la carpeta del proyecto:
node server.js
# Se ejecuta en: http://localhost:3001
```
**Ventajas:** Control total, personalizable, sin dependencias externas

### 🔄 **MODO 2: Live Server**
```bash
# Instalar (solo primera vez):
npm install -g live-server

# Ejecutar desde cualquier carpeta:
live-server --port=8080

# O usar npx (sin instalación global):
npx live-server --port=8080
```
**Ventajas:** Auto-recarga al cambiar archivos, puerto automático, funciona con cualquier navegador

### 💻 **MODO 3: Simple Browser (VS Code)**
1. Abrir VS Code
2. Presionar `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
3. Escribir: "Simple Browser: Show"
4. Seleccionar la opción
5. Navegar al archivo `index.html`

**Ventajas:** Integrado en VS Code, vista rápida, sin instalación adicional

### 📁 **MODO 4: Archivo Directo**
1. Abrir el Explorador de Archivos
2. Ir a la carpeta del proyecto
3. **Arrastrar** el archivo `index.html` al navegador web
4. **O clic derecho** → "Abrir con" → Elegir navegador

**Ventajas:** Sin servidor, ultra-rápido
**Limitaciones:** Sin auto-recarga, posibles problemas de CORS

## 🎮 Una Vez Ejecutado

Todos los modos ofrecen las mismas funcionalidades:

1. **Panel izquierdo**: Controles del simulador con tooltips técnicos
2. **Panel central**: Diagrama geométrico del wing foil
3. **Panel derecho**: KPIs con explicaciones detalladas
4. **Controles**: Play/Pause y navegación temporal

**💡 Tip:** Pasa el mouse sobre cualquier slider o KPI para ver las definiciones técnicas completas con unidades, rangos y significado físico.

## 🔧 Solución de Problemas

### Puerto ya en uso
```bash
# Cambiar puerto en server.js:
const PORT = 3002; // o cualquier otro puerto disponible
```

### Live Server no funciona
```bash
# Limpiar caché de npm:
npm cache clean --force
npx live-server --port=8080
```

### Problemas de CORS
- Usa Live Server o Node.js Server
- Evita el modo "Archivo Directo"

---

**¡El simulador está listo para usar!** 🏄‍♂️✨