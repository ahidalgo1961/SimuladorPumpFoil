# Simulador de Wing Foil v23h9

Aplicación web interactiva que simula la física y dinámica del wing foil, un deporte acuático que combina una tabla con hydrofoil y un ala inflable de mano. El simulador modela en tiempo real las fuerzas aerodinámicas, hidrodinámicas y biomecánicas involucradas en este deporte.

## 🆕 **Novedades v23h9**

### **Nuevos KPIs - Seguimiento de Posición de la Tabla**
- **X_tabla (m)**: Posición horizontal del centro geométrico de la tabla en el sistema de referencia global
- **Y_tabla (m)**: Posición vertical (altura) del centro geométrico de la tabla en el sistema de referencia global
- **Z_tabla (m)**: Posición de profundidad del centro geométrico de la tabla en el sistema de referencia global
- **Monitoreo en tiempo real** de las coordenadas de la tabla durante la simulación

### **Interfaz de Usuario Mejorada**
- **Botón Centrar Tabla Automático**: "📍 Centrar Tabla" para posicionamiento automático
- **Controles de Zoom Global**: Botones "+" y "−" para escalado integral de todos los elementos visuales
- **Vectores de Peso de Componentes**: Vectores individuales de peso para tabla, foil y cola en sus centros geométricos
- **Escalado Dinámico**: Escalas optimizadas vertical (300 px/m) y horizontal (80 px/m)
- **Depuración Mejorada**: Logging en consola para diagnóstico de posiciones

### **Física y Visualización**
- **Modo Física ODE**: Dinámica de cuerpo rígido con integración RK4
- **Fuerzas Acopladas**: Fuerzas aerodinámicas, hidrodinámicas y de flotación completamente integradas
- **Tooltips Interactivos**: Pase el mouse sobre vectores para información detallada
- **Visualización del Ángulo φ**: Sistema completo de referencia con alineación del centro geométrico
- **Control Dinámico de Límites**: Rangos flexibles de sliders con adaptación automática

## 📦 **Instalación y Ejecución**

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

## 🎯 **Características Principales**

### **Simulación Física en Tiempo Real**
- **Dinámica de 6 DOF**: Posición (x,z), velocidad (u,w), orientación (θ), velocidad angular (q)
- **Integración RK4**: Integración numérica de alta precisión para dinámica precisa
- **Sistema de Fuerzas Acopladas**: Sustentación/resistencia aerodinámica, fuerzas hidrodinámicas, flotación, fuerzas del rider

### **Visualización Interactiva**
- **Gráficos SVG**: Gráficos vectoriales escalables para visualización nítida
- **Actualizaciones en Tiempo Real**: Todos los parámetros se actualizan simultáneamente durante la simulación
- **Visualización de Pesos de Componentes**: Vectores individuales de peso en centros geométricos (marrón=tabla, azul=foil, verde=cola)
- **Controles de Pan y Zoom**: Navegar y escalar el área de visualización
  - **Botones Zoom In/Out**: "+" y "−" para escalado integral
  - **Escalado Global**: El zoom afecta todos los elementos visuales proporcionalmente (geometría, vectores, fuerzas)
  - **Factores de Escala**: Escala horizontal (80 px/m), Escala vertical (300 px/m)
  - **Escalado de Vectores**: Vectores de velocidad y fuerza se escalan con el zoom (velscale, fuerzascale)
  - **Rango de Zoom**: Escalado flexible con adaptación automática al contenido
- **Múltiples Modos de Vista**: Mostrar/ocultar diferentes vectores de fuerza y sistemas de referencia

### **KPIs Completos**
- **Aerodinámicos**: Ángulo de ataque (α), sustentación (L), resistencia (D), relación sustentación/resistencia (L/D)
- **Hidrodinámicos**: Empuje, fuerzas verticales, flotación
- **Geométricos**: Posición de la tabla (X,Y,Z), altura del centro de presión (h_CoP)
- **Rendimiento**: Porcentaje de soporte, momento del rider, velocidad de la tabla
- **Físicos**: Calado, volumen sumergido, ángulo efectivo (θ_eff)

### **Sistemas de Control**
- **Sliders Dinámicos**: Ajuste de parámetros en tiempo real con rangos flexibles
- **Modelo del Rider**: Fuerzas de pies delantero/trasero con distribución configurable
- **Control del Ala**: Ángulo de incidencia, área, pendiente de curva de sustentación, características de stall
- **Sistema de Foil**: Foil principal y cola con parámetros geométricos

## 📊 **Sistema de Coordenadas**

El simulador utiliza un sistema de coordenadas dextrogiro:
- **X**: Posición horizontal (positivo hacia la derecha)
- **Y**: Posición vertical/altura (positivo hacia arriba desde la superficie del agua)
- **Z**: Posición de profundidad (positivo hacia adelante, actualmente establecido en 0 para la tabla)

### **Puntos de Referencia**
- **W(0,0)**: Referencia global del mundo fija
- **B(0,0)**: Punto de referencia de popa (solidario con la tabla)
- **Centro de la Tabla**: Centro geométrico de la tabla para seguimiento de posición
- **Centro de Presión**: Centro aerodinámico para cálculos de fuerza

## 🛠 **Arquitectura Técnica**

### **Archivos Principales**
- `index.html`: Interfaz de usuario principal con controles y visualización
- `sim.js`: Motor físico, visualización y lógica de interacción del usuario
- `server.js`: Servidor de desarrollo local
- `package.json`: Dependencias de Node.js y scripts

### **Modelo Físico**
- **Aerodinámica del Ala**: Modelo 2D de sustentación/resistencia con características de stall
- **Hidrodinámica del Foil**: Distribución de presión simplificada
- **Flotación**: Principio de Arquímedes con cálculo de volumen sumergido
- **Biomecánica del Rider**: Distribución de fuerza entre pies delantero/trasero

### **Sistema de Visualización**
- **Renderizado SVG**: Gráficos vectoriales con elementos interactivos
- **Actualizaciones en Tiempo Real**: Simulación a 60 FPS con pantalla sincronizada
- **Interfaz Escalables**: Diseño responsivo que se adapta a diferentes tamaños de pantalla

## 📈 **Guía de Uso**

### **Operación Básica**
1. **Iniciar el Servidor**: Ejecutar `npm start` o `node server.js`
2. **Abrir Navegador**: Navegar a `http://localhost:3001`
3. **Ajustar Parámetros**: Usar sliders para modificar parámetros del ala, foil y rider
4. **Ejecutar Simulación**: Hacer clic en el botón de reproducción para iniciar simulación en tiempo real
5. **Monitorear KPIs**: Observar indicadores clave de rendimiento actualizándose en tiempo real
6. **Analizar Resultados**: Usar gráficos históricos para analizar tendencias a lo largo del tiempo

### **Características Avanzadas**
- **Exploración de Parámetros**: Usar límites dinámicos para explorar rangos amplios de parámetros
- **Análisis de Fuerzas**: Habilitar/deshabilitar diferentes vectores de fuerza para análisis detallado
- **Seguimiento de Posición**: Monitorear coordenadas de la tabla con nuevos KPIs X,Y,Z
- **Modo Depuración**: Revisar consola para cálculos detallados de posición y fuerza

## 🤝 **Contribuciones**

¡Las contribuciones son bienvenidas! No dudes en enviar issues, solicitudes de características o pull requests.

### **Configuración de Desarrollo**
```bash
# Instalar dependencias de desarrollo
npm install

# Ejecutar en modo desarrollo con recarga automática
npm run dev

# Construir para producción
npm run build
```

## 📄 **Licencia**

Este proyecto es de código abierto. Por favor revisa el archivo de licencia para detalles.

## 📞 **Contacto**

Para preguntas, sugerencias o soporte:
- **Repositorio**: [GitHub](https://github.com/ahidalgo1961/SimuladorPumpFoil)
- **Issues**: Usa GitHub Issues para reportes de bugs y solicitudes de características

---

**Versión**: v23h9
**Última Actualización**: 31 de agosto de 2025

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

#### 📐 Visualización del Ángulo φ
- **Línea de referencia gris**: Representa el ángulo φ = 0° (horizontal)
- **Línea roja dinámica**: Muestra el ángulo φ actual de la tabla
- **Centro de origen**: Ambas líneas parten del centro geométrico de la tabla
- **Longitud igual**: Ambas líneas tienen la misma longitud para comparación directa
- **Texto dinámico**: Valor φ se muestra al final de la línea roja en color rojo
- **Actualización en tiempo real**: El ángulo varía según fuerzas del rider y ganancia Kφ

#### 🔗 Sistema Rigidamente Acoplado
- **Centro de rotación**: Centro geométrico de la tabla (cx, cy)
- **Elementos acoplados**: Tabla + foil principal + cola giran al unísono
- **Rotación phi**: Todos los componentes siguen la rotación de la tabla
- **Posicionamiento relativo**: Mantiene distancias y orientaciones relativas
- **Consistencia física**: Simula correctamente el comportamiento real del sistema

#### 🎯 Tooltips Interactivos en Vectores
- **Fuerzas en los pies**: Muestran valores de fuerza vertical ejercida por cada pie del rider
- **Ejes de referencia**: Explican los sistemas de coordenadas global y local
- **Vector de flujo**: Indica velocidad relativa del flujo con respecto a la tabla
- **Vectores L/D**: Muestran fuerzas de sustentación y arrastre con valores numéricos
- **Vectores de la cola**: Contribuciones específicas de la cola del foil
- **Velocidad de la tabla**: Componente horizontal de velocidad de la tabla
- **Peso y flotabilidad**: Fuerzas gravitacional y de Arquímedes
- **Fuerzas resultantes**: Equilibrios vertical y horizontal del sistema

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
- **Ángulo φ de la tabla** con línea de referencia horizontal mejorada (ambas líneas parten del centro geométrico, mismo largo y grosor, texto dinámico al final de la línea roja)
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