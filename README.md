# WingFoil — Simulador ODE v24b

## Modo físico (ODE) vs. Prescrito
- **Prescrito**: `V(t), θ(t), γ(t)` oscilan por sliders; fuerzas se derivan de ahí.
- **ODE** (activado por defecto): integra estados `[x,z,u,w,θ,q]` con RK4.
  - Rider aplica **F_front(t)** y **F_back(t)** → `M_rider=(F_b-F_f)*d/2`
  - Flujo relativo `γ=atan2(w,u)`, `α=θ-γ`
  - Sustentación/arrastre desde `C_L(α)` con *fade* post-pérdida
  - Arquímedes coherente con calado; si `z≥0`, **anula L,D** (foil fuera)

## Controles relevantes
- **Rider**: `λ, d, A_f, A_b, fase_f, fase_b`
- **Tabla/mástil**: volumen (L), área (m²), altura mástil (m), longitud tabla (m)
- **Escalas**: `vscale` (px/m), `hscale` (px/m), `vecscale` (×)

## Uso
1. Abre `index.html` con Live Server (VSCode) o `python3 -m http.server`.
2. Activa o desactiva **Modo físico (ODE)** desde el panel *Vista*.
3. `Play` para integrar; `Step` para avanzar/retroceder.
4. KPIs a la derecha (α, θ_eff, L, D, empuje, soporte, M_rider, h, Arquímedes, calado).

> Esta build es autocontenida y mantiene el *layout clásico* y las **leyendas** (“Tabla Navegando/Volando”, “Foil fuera del agua”).

