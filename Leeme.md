# Simulador de Wing Foil v23d

## 📋 Descripción

Aplicación web interactiva que simula la física y dinámica del wing foil, un deporte acuático que combina una tabla con hydrofoil y un ala inflable de mano. El simulador modela en tiempo real las fuerzas aerodinámicas, hidrodinámicas y biomecánicas involucradas en este deporte.

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

### Opciones de Visualización
- Superficie del agua
- Vectores de fuerza en los pies
- Arco del ángulo de ataque
- Etiquetas de valores
- Vector de flujo
- Línea de cuerda
- Vectores L/D
- Ejes de referencia (global y local)
- Peso y flotabilidad
- Fuerzas resultantes

## 💾 Persistencia

La aplicación guarda automáticamente los valores de los parámetros en el localStorage del navegador, permitiendo recuperar la configuración en sesiones posteriores.

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