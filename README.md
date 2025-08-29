# Wing Foil — Simulador v12 (compacto, con Tabla & Mástil)
- **Sección visible** “Tabla & Mástil” (izquierda): Volumen (L), Superficie (m²), Altura mástil (m).
- **UI 50%**: sliders/KPIs/bolita compactos.
- **Física**: heave + Arquímedes + esfuerzo de pies + θ_eff = θ₀ + Gθ·M_rider + L/D escalables.
- **Vista**: checks para horizonte, arco α, etiquetas, flujo, cuerda y vectores L/D.

Abrir `index.html` con Chrome/Edge/Firefox.


v13: Tabla anclada al mástil; stance en metros → px; mástil dibujado.


v14: Sustentación anulada si h >= 0 (foil toca superficie) + aviso visual.


v15: Fade de sustentación cerca de superficie (5 cm) + etiquetas 'Tabla Navegando'/'Tabla Volando'.


v16: Corregido signo de z_bottom = h + mastH en Arquímedes.


v17: Tabla como rectángulo con grosor t=V/A y línea de flotación; sliders persistentes (localStorage).

## Marcos de referencia (v18)
- **W (mundo/agua)**: eje **Y** positivo hacia arriba; **y=0** en la **superficie**. Alturas \(h\) y mástil \(H\) están en este marco.
- **B (tabla)**: origen en el **anclaje** del mástil en la tabla; eje tangente **t** (a lo largo de la tabla), eje normal **n** (perpendicular). El grosor de la tabla es \(t_b=V/A\).

**Cálculo de calado**: se construyen los 4 vértices del rectángulo real (longitud \(L\), grosor \(t_b\)) en **metros** usando \(h, H, \phi\). El calado es la parte del rectángulo con \(y<0\), limitado por \(t_b\). El empuje es \(F_b=
ho g A \cdot 	ext{draft}\). La parte azul del dibujo usa **exactamente** el mismo `draft`.


v19: Añadido slider 'L tabla (m)' en HTML y bindUI robusto si falta un control.


v20: Corrige referencia y_anchor=h+H; recorte poligonal exacto bajo el agua y 'línea de flotación' sobre la tabla.

v21: Añadida etiqueta numérica de calado sobre la línea de flotación (ej. '0.120 m').