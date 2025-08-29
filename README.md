# Wing Foil — Simulador v23h7
- Layout clásico (sliders izq., KPI der., diagrama centro).
- Tooltips nativos en sliders (atributo title).
- Slider **Δt (s)** del integrador.
- **Escalas**: vertical `vscale` y horizontal `hscale`.
- Flechas de **pies** (⊥ tabla, hacia ella).
- **W(0,0)** global fijo; **B(0,0)** en **popa** (solidario a la tabla).
- Recorte sumergido y **calado** coherente con Arquímedes.
- Gráficos históricos (100 ciclos): **Ángulos** y **Fuerzas** con **unidades**.


v23h8: Restituidas leyendas: «Tabla Navegando», «Tabla Volando» y «Foil fuera del agua».

v23h9: Añadido **Modo físico (ODE)** (checkbox en Vista). Estados x,z,u,w,θ,q; integración RK4; fuerzas/Arquímedes acopladas. Mantiene modo prescrito.