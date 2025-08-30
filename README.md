# Wing Foil — Simulador v23h8
- Layout clásico (sliders izq., KPI der., diagrama centro).
- Tooltips nativos en sliders (atributo title).
- Slider **Δt (s)** del integrador.
- **Escalas**: vertical `vscale` y horizontal `hscale`.
- Flechas de **pies** (⊥ tabla, hacia ella).
- **W(0,0)** global fijo; **B(0,0)** en **popa** (solidario a la tabla).
- Recorte sumergido y **calado** coherente con Arquímedes.
- Gráficos históricos (100 ciclos): **Ángulos** y **Fuerzas** con **unidades**.

## 🆕 **Novedades v23h8**
- **Control Dinámico de Límites**: Sistema completamente flexible para ajustar rangos de sliders
- **Inputs Libres**: Las cajas Min/Max aceptan cualquier valor numérico sin restricciones
- **Actualización Automática**: Los sliders se adaptan dinámicamente a los nuevos límites
- **Rangos Sugeridos**: Información técnica disponible en tooltips (independiente de límites actuales)
- **Persistencia Mejorada**: Configuraciones de límites guardadas automáticamente

## 🚀 **Ejecución**
```bash
# Instalar dependencias
npm install

# Ejecutar servidor local
npm start
# O directamente:
node server.js
```

v23h8: Restituidas leyendas: «Tabla Navegando», «Tabla Volando» y «Foil fuera del agua».

v23h9: Añadido **Modo físico (ODE)** (checkbox en Vista). Estados x,z,u,w,θ,q; integración RK4; fuerzas/Arquímedes acopladas. Mantiene modo prescrito.