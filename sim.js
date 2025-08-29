// Wing Foil — v12
const $ = id => document.getElementById(id);
function S(id){ const el=$(id); if(!el) throw new Error(`#${id} no encontrado`); return el; }
const fmt=(x,d)=> (Math.abs(x)>=1000?x.toFixed(0):x.toFixed(d));

// --- Parámetros y UI ---
const sliders = ["v0","phi","theta0","gamma0","S","rho","mass","LD","clslope","clmax","stall",
                 "freq","ampV","ampT","ampG","phaseT","phaseG","lambda","dstance","Af","Ab",
                 "phaseF","phaseB","Gtheta","Kphi","h0","cw","vscale","vecscale","boardVolL","boardArea","mastH","boardLen","shape"];
function bindUI(){
  sliders.forEach(id=>{ const el=document.getElementById(id); if(!el) { console.warn(`#${id} no encontrado (se omite)`); return; } el.addEventListener('input', updateAll, {passive:true}); el.addEventListener('change', updateAll, {passive:true});
  // Persistencia: guarda en localStorage cada cambio
  try{
    const KEY='wf_persist_v17';
    el.addEventListener('input', ()=>{
      const obj = JSON.parse(localStorage.getItem(KEY) || '{}');
      obj[id] = el.value;
      localStorage.setItem(KEY, JSON.stringify(obj));
    }, {passive:true});
  }catch(e){ /* no-op */ }
 });
  ["waveF","waveB","showHorizon","showFeet","showArc","showLabels","phiFollow","showFlow","showChord","showLD"].forEach(id=>S(id).addEventListener('change', draw, {passive:true}));
  // tiempo
  S('play').addEventListener('click', startPlay);
  S('pause').addEventListener('click', stopPlay);
  S('fwd').addEventListener('click', ()=> step(+1));
  S('back').addEventListener('click', ()=> step(-1));
  // pan
  S('panL').addEventListener('click', ()=>{ pan.x -= 18; draw(); });
  S('panR').addEventListener('click', ()=>{ pan.x += 18; draw(); });
  S('panU').addEventListener('click', ()=>{ pan.y -= 18; draw(); });
  S('panD').addEventListener('click', ()=>{ pan.y += 18; draw(); });
  S('pan0').addEventListener('click', ()=>{ pan = {x:0,y:0}; draw(); });
  S('state0').addEventListener('click', resetState);
}
function P(){
  return {
    V0:+S("v0").value, phi0:+S("phi").value, theta0:+S("theta0").value, gamma0:+S("gamma0").value,
    S:+S("S").value, rho:+S("rho").value, mass:+S("mass").value, LD:+S("LD").value,
    clslope:+S("clslope").value, clmax:+S("clmax").value, astall:+S("stall").value,
    freq:+S("freq").value, ampV:+S("ampV").value, ampT:+S("ampT").value, ampG:+S("ampG").value,
    phaseT:+S("phaseT").value, phaseG:+S("phaseG").value,
    lambda:+S("lambda").value, d:+S("dstance").value, Af:+S("Af").value, Ab:+S("Ab").value,
    phaseF:+S("phaseF").value, phaseB:+S("phaseB").value,
    Gtheta:+S("Gtheta").value, Kphi:+S("Kphi").value, h0:+S("h0").value, cw:+S("cw").value,
    vscale:+S("vscale").value, vecscale:+S("vecscale").value,
    boardVolL:+S("boardVolL").value, boardArea:+S("boardArea").value, mastH:+S("mastH").value, boardLen:+S("boardLen").value,
    waveF:S("waveF").value, waveB:S("waveB").value, shape:+S("shape").value,
    show:{ horizon:S("showHorizon").checked, feet:S("showFeet").checked, arc:S("showArc").checked, labels:S("showLabels").checked, flow:S("showFlow").checked, chord:S("showChord").checked, LD:S("showLD").checked, phiFollow:S("phiFollow").checked }
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
  S("vscalev").textContent=p.vscale.toFixed(0); S("vecscalev").textContent=p.vecscale.toFixed(1);
  S("volv").textContent=p.boardVolL.toFixed(0); S("areav").textContent=p.boardArea.toFixed(2); S("mastv").textContent=p.mastH.toFixed(2); S("Ltabv").textContent=p.boardLen.toFixed(2);
}

// --- Dinámica y modelo ---
function q_wave(type, w, t, phase, shape){
  const a = w*t + phase*Math.PI/180;
  switch(type){
    case "sine": return Math.sin(a);
    case "half": return Math.max(0, Math.sin(a));
    case "tri": { const x=(a/(2*Math.PI))%1; return x<0.25?4*x:x<0.75?2-4*x:-4+4*x; }
    case "pulse": { const s=Math.max(1e-3,shape); const x=(a/(2*Math.PI))%1; const d=Math.min(x,1-x); return Math.exp(-0.5*(d/s)**2); }
    default: return Math.sin(a);
  }
}
function riderFM(p,t){
  const W=p.mass*9.81, w=2*Math.PI*p.freq;
  let Ff=p.lambda*W, Fb=(1-p.lambda)*W;
  const qf=q_wave(p.waveF,w,t,p.phaseF,p.shape), qb=q_wave(p.waveB,w,t,p.phaseB,p.shape);
  Ff += (p.waveF==="half"||p.waveF==="pulse")? Math.max(0,p.Af*qf) : p.Af*qf;
  Fb += (p.waveB==="half"||p.waveB==="pulse")? Math.max(0,p.Ab*qb) : p.Ab*qb;
  Ff=Math.max(0,Ff); Fb=Math.max(0,Fb);
  const Mr=(Fb-Ff)*(p.d/2);
  return {Ff,Fb,Mr};
}
function CL_from_alpha(a, slope, clmax, astall){
  let CL=slope*a; CL=Math.sign(CL||1)*Math.min(Math.abs(CL),clmax);
  const aa=Math.abs(a); if(aa>astall){ const fade=Math.max(0,1-(aa-astall)/8); CL*=fade; }
  return CL;
}
function instant(p,t){
  const {Ff,Fb,Mr}=riderFM(p,t);
  const theta_eff = p.theta0 + p.Gtheta*Mr;
  const gamma = p.gamma0;
  const alpha = theta_eff - gamma;
  const V = p.V0;
  let CL=CL_from_alpha(alpha,p.clslope,p.clmax,p.astall);
  // Fade de sustentación cerca de superficie
  const hFade = 0.05; // 5 cm
  if (typeof h !== 'undefined'){
    if (h >= 0){ CL = 0; } // fuera del agua
    else {
      const depth = -h; // profundidad positiva
      if (depth < hFade){ CL *= (depth / hFade); } // atenúa cerca de superficie
    }
  }
  let L=0.5*p.rho*V*V*p.S*CL;
  let D=L/Math.max(1e-6,p.LD);
  const Lx=L*Math.cos((gamma+90)*Math.PI/180), Ly=L*Math.sin((gamma+90)*Math.PI/180);
  const Dx=D*Math.cos((gamma+180)*Math.PI/180), Dy=D*Math.sin((gamma+180)*Math.PI/180);
  const Th=Lx+Dx, Vert=Ly+Dy, Sup=(Vert/(p.mass*9.81))*100;
  return {Ff,Fb,Mr,theta_eff,gamma,alpha,L,D,Th,Vert,Sup};
}

function buoyancy(p, h){
  // Marcos: Mundo W: y=0 en agua (arriba positivo). Tabla B: origen en anclaje (mast top).
  const Vb = Math.max(0, p.boardVolL/1000);   // m^3
  const Ab = Math.max(1e-6, p.boardArea);     // m^2
  const tb = Math.min(1.0, Vb / Ab);          // grosor tabla (m)
  const Lm = Math.max(0.8, p.boardLen);       // longitud real (m, cota de robustez)

  // Posición del anclaje en el marco W (metros): y_anchor = h - mastH
  const y_anchor = h + p.mastH;

  // Orientación tabla (φ) — usamos φ actual (phiFollow ya incorporado en draw, aquí usamos φ base)
  // Para coherencia dinámica tomamos φ = phi0 (sin acoplar Kphi aquí) — aproximación suficiente para Fb.
  const phi = p.phi0 * Math.PI/180;
  const tY = Math.sin(phi);  // componente vertical del eje tangente
  const nY = Math.cos(phi);  // componente vertical de la normal a tabla

  // Coordenadas Y (m) de los 4 vértices del rectángulo (solo necesitamos y)
  const y1 = y_anchor - (Lm/2)*tY - (tb/2)*nY;
  const y2 = y_anchor + (Lm/2)*tY - (tb/2)*nY;
  const y3 = y_anchor + (Lm/2)*tY + (tb/2)*nY;
  const y4 = y_anchor - (Lm/2)*tY + (tb/2)*nY;

  const yTop = Math.min(y1,y2,y3,y4);   // punto más alto (mayor positivo)
  const yBot = Math.max(y1,y2,y3,y4);   // punto más bajo

  // Solape vertical con el agua (y<=0 es bajo agua? No: definimos y>0 arriba, así agua está en y<=0 hacia abajo.
  // En nuestro convenio: y=0 es agua; y<0 es bajo agua; y>0 es por encima del agua.
  // Calado = extensión vertical del rectángulo con y<0, limitado por tb.
  let draft = 0;
  if(yBot < 0){ // alguna parte bajo el agua
    const subTop = Math.min(0, yTop);  // máximo y dentro del agua (<=0)
    const subBot = yBot;               // mínimo y (el más bajo), <= subTop
    draft = Math.min(tb, Math.abs(subTop - subBot));
  } else {
    draft = 0;
  }

  const Fb = p.rho * 9.81 * Ab * draft;
  return {Fb, draft, tb, yTop, yBot, y_anchor};
}


// Heave state
let t=0, T=1, playing=null;
let h=0, w=0; // height (m) positive up; vertical speed (m/s)
let pan={x:0,y:0};
function resetState(){ const p=P(); h=p.h0; w=0; t=0; draw(); }
function startPlay(){ if(playing) return; playing=setInterval(()=> step(+1), 30); }
function stopPlay(){ if(playing){ clearInterval(playing); playing=null; } }
function step(dir){
  const p=P(); T=1/Math.max(0.01,p.freq); const dt=T/240; t=(t+dir*dt)%T; if(t<0) t+=T;
  const ins=instant(p,t);
  const B = buoyancy(p, h);
  const mg=p.mass*9.81; const mEff=p.mass; const acc=(ins.Vert + B.Fb - mg - p.cw*w)/mEff;
  w += acc*dt; h += w*dt;
  S('tVal').textContent=t.toFixed(2);
  step._B = B;
  draw(ins);
}

// Dibujo
function draw(instOpt){
  const p=P(); labelRefresh(p);
  const inst = instOpt || instant(p,t);
  const B = step._B || buoyancy(p, h);
  // KPIs
  S("alphaOut").textContent=fmt(inst.alpha,1);
  S("thetaEffOut").textContent=fmt(inst.theta_eff,1);
  S("LOut").textContent=fmt(inst.L,0);
  S("DOut").textContent=fmt(inst.D,0);
  S("ThOut").textContent=fmt(inst.Th,1);
  S("SupOut").textContent=fmt(inst.Sup,0);
  S("MrOut").textContent=fmt(inst.Mr,1);
  S("hOut").textContent=h.toFixed(3);
  S("BOut").textContent=Math.round(B.Fb).toString();
  S("draftOut").textContent=B.draft.toFixed(3);

  const svg=S("geom"); svg.innerHTML="";
  const wpx=svg.clientWidth||600, hpx=svg.clientHeight||420;
  const scale = p.vscale; // px/m configurable
  const cx=wpx*0.50 + pan.x;
  const horizonY=hpx*0.45 + pan.y;
  const cy=(hpx*0.62 + pan.y) - h*scale; // subir con h positiva

  const line=(x1,y1,x2,y2,stroke="#000",w2=1)=>{const L=document.createElementNS('http://www.w3.org/2000/svg','line'); L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2); L.setAttribute('stroke',stroke);L.setAttribute('stroke-width',w2); svg.appendChild(L); return L; };
  const text=(x,y,t,fs=10)=>{if(!p.show.labels) return; const T=document.createElementNS('http://www.w3.org/2000/svg','text'); T.setAttribute('x',x);T.setAttribute('y',y);T.setAttribute('font-size',fs); T.textContent=t; svg.appendChild(T); return T; };
  const path=(d)=>{const Pth=document.createElementNS('http://www.w3.org/2000/svg','path'); Pth.setAttribute('d',d); Pth.setAttribute('fill','none'); Pth.setAttribute('stroke','#000'); Pth.setAttribute('stroke-width','1.2'); svg.appendChild(Pth); return Pth; };

  if(p.show.horizon){ line(20,horizonY,wpx-20,horizonY,'#333',1).setAttribute('stroke-dasharray','6,4'); text(wpx-90,horizonY-6,'Horizonte',10); }

  // φ dinámico (opcional) siguiendo momento
  const phi = p.show.phiFollow ? (p.phi0 + p.Kphi*inst.Mr) : p.phi0;

  // Mástil y Tabla ancladas físicamente al foil
  const Lb=160; // largo visual de la tabla (px)
  const tHat=[Math.cos(phi*Math.PI/180), Math.sin(phi*Math.PI/180)];
  const nHat=[-Math.sin(phi*Math.PI/180), Math.cos(phi*Math.PI/180)];
  const xAnchor = cx;                     // anclaje del mástil a la tabla (centro)
  const yAnchor = cy - p.mastH*scale;     // altura del anclaje según H_mástil
  // Dibuja mástil (vertical visual) del foil a la tabla
  line(cx, cy, xAnchor, yAnchor, '#444', 3); text(xAnchor+6, yAnchor-6, 'Mástil H');
  // Grosor de tabla en px: t = V/A (m) → px
  const Vb = Math.max(0, p.boardVolL/1000);   // m^3
  const Ab = Math.max(1e-6, p.boardArea);     // m^2
  const tb_m = Math.min(1.0, Vb/Ab);          // grosor (m), cap a 1 m por robustez
  const Tb = Math.max(4, tb_m * scale);       // grosor en px, al menos 4 px para visibilidad

  // Rectángulo de tabla centrado en (xAnchor,yAnchor), largo Lb y grosor Tb, orientado con φ
  const hx = (Lb/2)*tHat[0], hy = (Lb/2)*tHat[1];
  const nx = (Tb/2)*nHat[0], ny = (Tb/2)*nHat[1];
  const p1 = [xAnchor - hx - nx, yAnchor - hy - ny];
  const p2 = [xAnchor + hx - nx, yAnchor + hy - ny];
  const p3 = [xAnchor + hx + nx, yAnchor + hy + ny];
  const p4 = [xAnchor - hx + nx, yAnchor - hy + ny];
  const boardPoly = [p1,p2,p3,p4];

  // Traza contorno de la tabla
  const poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
  poly.setAttribute('points', boardPoly.map(p=>`${p[0]},${p[1]}`).join(' '));
  poly.setAttribute('fill', '#ddd'); poly.setAttribute('stroke', '#777'); poly.setAttribute('stroke-width', '1.2');
  svg.appendChild(poly);
  text(xAnchor + hx + 8, yAnchor + hy, 'Tabla (φ)');

  // Polígono sumergido: recortar contra la recta y = horizonY (en coords SVG)
  function clipBelowWater(polyPts){
    const out=[]; const N=polyPts.length;
    for(let i=0;i<N;i++){
      const a=polyPts[i], b=polyPts[(i+1)%N];
      const aBelow = a[1] >= horizonY;
      const bBelow = b[1] >= horizonY;
      // Si el segmento cruza la línea agua, calcular intersección
      if(aBelow !== bBelow){
        const t = (horizonY - a[1]) / (b[1] - a[1]); // 0..1
        const ix = a[0] + t*(b[0]-a[0]);
        const iy = horizonY;
        out.push([ix,iy]);
      }
      // Mantener los puntos que están por debajo (sumergidos)
      if(bBelow) out.push(b);
    }
    return out;
  }

  if (B.draft > 0){
    const subPoly = clipBelowWater(boardPoly);
    if(subPoly.length>=3){
      const polySub = document.createElementNS('http://www.w3.org/2000/svg','polygon');
      polySub.setAttribute('points', subPoly.map(p=>`${p[0]},${p[1]}`).join(' '));
      polySub.setAttribute('fill', '#6bbcff'); polySub.setAttribute('opacity','0.6');
      svg.appendChild(polySub);

      // Línea de flotación sobre la tabla: trazo las aristas de intersección
      // Buscamos pares consecutivos con y=horizonY
      for(let i=0;i<subPoly.length;i++){
        const a=subPoly[i], b=subPoly[(i+1)%subPoly.length];
        if(Math.abs(a[1]-horizonY)<0.5 && Math.abs(b[1]-horizonY)<0.5){
          line(a[0],a[1],b[0],b[1],'#068',2);
        }
      }
    }
  }



  // Aviso si foil está en/encima de la superficie
  if (h >= 0){
    const warn=document.createElementNS('http://www.w3.org/2000/svg','text');
    warn.setAttribute('x', cx + 10);
    warn.setAttribute('y', cy - 10);
    warn.setAttribute('font-size', 12);
    warn.setAttribute('fill', '#c00');
    warn.textContent = 'Foil fuera del agua';
    svg.appendChild(warn);
  }

  // Cuerda (θ_eff)
  if(p.show.chord){
    const Lc=100, th=inst.theta_eff*Math.PI/180;
    const cxa=cx-(Lc/2)*Math.cos(th), cya=cy-(Lc/2)*Math.sin(th);
    const cxb=cx+(Lc/2)*Math.cos(th), cyb=cy+(Lc/2)*Math.sin(th);
    line(cxa,cya,cxb,cyb,'#000',4); text(cxb+6,cyb,'Cuerda (θ_eff)');
  }

  // Flujo γ
  if(p.show.flow){
    const Lf=84, vx=Lf*Math.cos(inst.gamma*Math.PI/180), vy=Lf*Math.sin(inst.gamma*Math.PI/180);
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
    const marker=document.createElementNS('http://www.w3.org/2000/svg','marker');
    marker.setAttribute('id','arrow'); marker.setAttribute('markerWidth','8'); marker.setAttribute('markerHeight','8');
    marker.setAttribute('refX','6'); marker.setAttribute('refY','3'); marker.setAttribute('orient','auto'); marker.setAttribute('markerUnits','strokeWidth');
    const tri=document.createElementNS('http://www.w3.org/2000/svg','path'); tri.setAttribute('d','M0,0 L0,6 L6,3 z'); tri.setAttribute('fill','#000');
    marker.appendChild(tri); defs.appendChild(marker); svg.appendChild(defs);
    const flow=line(cx - vx, cy - vy, cx, cy, '#000', 1.2); flow.setAttribute('marker-end','url(#arrow)'); text(cx+6,cy,'V_rel (γ)');
  }

  // Indicador de calado (barra junto al margen izq)
  const Bcur = B;
  if(Bcur.draft>0){
    const xbar = 26 + pan.x, yWater = horizonY;
    const yTop = yWater, yBot = yWater + Bcur.draft*scale;
    const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x', xbar); rect.setAttribute('y', yTop);
    rect.setAttribute('width', 8); rect.setAttribute('height', Math.max(2, yBot - yTop));
    rect.setAttribute('fill', '#6bbcff'); rect.setAttribute('opacity','0.6');
    svg.appendChild(rect);
  }

  // Etiquetas de estado de la tabla
  if (Bcur.draft>0){
    const txt=document.createElementNS('http://www.w3.org/2000/svg','text');
    txt.setAttribute('x', 30 + pan.x);
    txt.setAttribute('y', horizonY - 10);
    txt.setAttribute('font-size', 12);
    txt.setAttribute('fill', '#064');
    txt.textContent = 'Tabla Navegando';
    svg.appendChild(txt);
  } else if (h < 0) {
    const txt2=document.createElementNS('http://www.w3.org/2000/svg','text');
    txt2.setAttribute('x', 30 + pan.x);
    txt2.setAttribute('y', horizonY - 10);
    txt2.setAttribute('font-size', 12);
    txt2.setAttribute('fill', '#046');
    txt2.textContent = 'Tabla Volando';
    svg.appendChild(txt2);
  }


  // Arco α
  if(p.show.arc){
    const r=36, a1=Math.min(inst.theta_eff,inst.gamma), a2=Math.max(inst.theta_eff,inst.gamma), large=(a2-a1)>180?1:0;
    const sx=cx+r*Math.cos(a1*Math.PI/180), sy=cy+r*Math.sin(a1*Math.PI/180);
    const ex=cx+r*Math.cos(a2*Math.PI/180), ey=cy+r*Math.sin(a2*Math.PI/180);
    path(`M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`); text(cx+r+8,cy,`α = ${fmt(Math.abs(inst.alpha),1)}°`,12);
  }

  // Flechas pies (⊥ a la tabla), proporcionales a Ff/Fb (hacia la tabla, abajo)
  if(p.show.feet){
    const mid=[(x0+x1)/2,(y0+y1)/2];
    const pixStance = Math.min(0.9*Lb, Math.max(10, p.d*scale));
    const front=[mid[0]+(pixStance/2)*tHat[0], mid[1]+(pixStance/2)*tHat[1]];
    const back =[mid[0]-(pixStance/2)*tHat[0], mid[1]-(pixStance/2)*tHat[1]];
    const kpx = (40/(p.mass*9.81)) * (p.vecscale||1); // 40 px = m·g
    const fLen=Math.max(6, kpx*Math.max(0,inst.Ff));
    const bLen=Math.max(6, kpx*Math.max(0,inst.Fb));
    const fTip=[front[0]+fLen*nHat[0], front[1]+fLen*nHat[1]];
    const bTip=[back [0]+bLen*nHat[0], back [1]+bLen*nHat[1]];
    const line2=(x1,y1,x2,y2,stroke)=>{const L=document.createElementNS('http://www.w3.org/2000/svg','line');L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2);L.setAttribute('stroke',stroke);L.setAttribute('stroke-width','3');svg.appendChild(L);return L;}
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs'); const marker=document.createElementNS('http://www.w3.org/2000/svg','marker');
    marker.setAttribute('id','arrow2'); marker.setAttribute('markerWidth','8'); marker.setAttribute('markerHeight','8');
    marker.setAttribute('refX','6'); marker.setAttribute('refY','3'); marker.setAttribute('orient','auto'); marker.setAttribute('markerUnits','strokeWidth');
    const tri=document.createElementNS('http://www.w3.org/2000/svg','path'); tri.setAttribute('d','M0,0 L0,6 L6,3 z'); tri.setAttribute('fill','#000');
    marker.appendChild(tri); defs.appendChild(marker); svg.appendChild(defs);
    const FARR=line2(front[0],front[1],fTip[0],fTip[1],'#c00'); FARR.setAttribute('marker-end','url(#arrow2)');
    const BARR=line2(back[0],back[1],bTip[0],bTip[1],'#06c'); BARR.setAttribute('marker-end','url(#arrow2)');
    text(front[0]+6,front[1]-6,`Front ⊥ (${Math.round(inst.Ff)} N)`);
    text(back [0]+6,back [1]-6,`Back ⊥ (${Math.round(inst.Fb)} N)`);
  }

  // Vectores L/D (opcional)
  if(p.show.LD){
    const kpxLD = (40/(p.mass*9.81)) * (p.vecscale||1);
    const Llen = Math.max(6, kpxLD*Math.max(0,inst.L));
    const Dlen = Math.max(6, kpxLD*Math.max(0,inst.D));
    const g = inst.gamma*Math.PI/180;
    const lhat = [Math.cos(g+Math.PI/2), Math.sin(g+Math.PI/2)];
    const dhat = [Math.cos(g+Math.PI),   Math.sin(g+Math.PI)  ];
    const Ltip=[cx + Llen*lhat[0], cy + Llen*lhat[1]];
    const Dtip=[cx + Dlen*dhat[0], cy + Dlen*dhat[1]];
    const L1=document.createElementNS('http://www.w3.org/2000/svg','line');
    L1.setAttribute('x1',cx);L1.setAttribute('y1',cy);L1.setAttribute('x2',Ltip[0]);L1.setAttribute('y2',Ltip[1]);L1.setAttribute('stroke','#090');L1.setAttribute('stroke-width','3');svg.appendChild(L1);
    const D1=document.createElementNS('http://www.w3.org/2000/svg','line');
    D1.setAttribute('x1',cx);D1.setAttribute('y1',cy);D1.setAttribute('x2',Dtip[0]);D1.setAttribute('y2',Dtip[1]);D1.setAttribute('stroke','#b90');D1.setAttribute('stroke-width','3');svg.appendChild(D1);
    text(Ltip[0]+6,Ltip[1],`L (${Math.round(inst.L)} N)`); text(Dtip[0]+6,Dtip[1],`D (${Math.round(inst.D)} N)`);
  }
}

function updateAll(){ draw(); }

window.addEventListener('DOMContentLoaded', ()=>{ bindUI();
  // Carga persistencia al iniciar
  try{
    const KEY='wf_persist_v17';
    const obj = JSON.parse(localStorage.getItem(KEY) || '{}');
    for(const k in obj){
      const el = document.getElementById(k);
      if(el && (el.type==='range' || el.tagName==='SELECT')){
        el.value = obj[k];
      }
    }
  }catch(e){ /* no-op */ }
 resetState(); });
