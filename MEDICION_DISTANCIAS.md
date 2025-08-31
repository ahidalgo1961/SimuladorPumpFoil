# Funcionalidad de Medición de Distancias

## Descripción
Se ha implementado una nueva funcionalidad que permite medir distancias físicas entre dos puntos en el diagrama del simulador.

## Cómo usar
1. **Primer click**: Haz click en cualquier punto del diagrama SVG
2. **Marcador**: Aparecerá un círculo rojo en el punto clickeado
3. **Segundo click**: Haz click en otro punto del diagrama
4. **Línea de medición**: Se dibujará una línea roja punteada entre los dos puntos
5. **Distancia**: Se mostrará la distancia física en metros en el centro de la línea
6. **Auto-limpieza**: La línea y marcadores desaparecerán automáticamente después de 5 segundos

## Características técnicas
- **Coordenadas físicas**: La distancia se calcula en coordenadas físicas (metros), no en píxeles de pantalla
- **Marcadores visuales**: Círculos rojos indican los puntos clickeados
- **Texto legible**: El texto de la distancia tiene fondo negro para mejor legibilidad
- **Línea punteada**: Línea roja punteada de 3px de ancho con opacidad 0.8
- **Timeout automático**: 5 segundos antes de desaparecer
- **Instrucciones**: Al pasar el mouse sobre el SVG por primera vez, se muestran instrucciones

## Variables globales
- `measurementPoints`: Array con los puntos clickeados (coordenadas físicas)
- `measurementLine`: Elemento SVG de la línea de medición
- `measurementText`: Elemento SVG del texto de distancia
- `measurementMarkers`: Array con los marcadores visuales
- `measurementTimeout`: ID del timeout para auto-limpieza

## Funciones implementadas
- `handleSvgClick()`: Maneja los clicks en el SVG
- `screenToPhysical()`: Convierte coordenadas de pantalla a físicas
- `drawMeasurementLine()`: Dibuja la línea y texto de medición
- `clearMeasurement()`: Limpia todos los elementos de medición
- `showMeasurementInstructions()`: Muestra instrucciones al usuario

## Consideraciones
- La funcionalidad se reinicia automáticamente al redibujar el SVG
- Se limpia al reiniciar el estado del simulador
- Las coordenadas se convierten correctamente considerando el zoom y pan actuales
