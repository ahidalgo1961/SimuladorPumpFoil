// Simulador v23h7 — estable
const $ = id => document.getElementById(id);
function S(id){ const el=$(id); if(!el) throw new Error('#' + id + ' no encontrado'); return el; }
const fmt=(x,d)=> (Math.abs(x)>=1000?x.toFixed(0):x.toFixed(d));

const sliders = ["v0","phi","theta0","gamma0","S","rho","mass","LD","clslope","clmax","stall",
 "freq","ampV","ampT","ampG","phaseT","phaseG","dtStep",
 "lambda","dstance","Af","Ab","phaseF","phaseB","Gtheta","Kphi","h0","cw","vscale","hscale","vecscale",
 "boardVolL","boardArea","mastH","boardLen"];

let t=0, T=1, playing=null;
let h=0, wv=0;        // heave (m, +arriba) y velocidad vertical
let pan={x:0,y:0};

// Histórico (últimos 100 ciclos: medias por ciclo)
let cyc_acc = {na:0, a:0, th:0, L:0, Th:0};
const MAXC=100;
const histAngles={alpha:[], theta:[]};
const histForces={L:[], Th:[]};

function endCyclePush(){
  if(cyc_acc.na>0){
    const a=cyc_acc.a/cyc_acc.na, th=cyc_acc.th/cyc_acc.na;
    const Lm=cyc_acc.L/cyc_acc.na, Thm=cyc_acc.Th/cyc_acc.na;
    histAngles.alpha.push(a); histAngles.theta.push(th);
    histForces.L.push(Lm); histForces.Th.push(Thm);
    if(histAngles.alpha.length>MAXC){ histAngles.alpha.shift(); histAngles.theta.shift(); }
    if(histForces.L.length>MAXC){ histForces.L.shift(); histForces.Th.shift(); }
  }
  cyc_acc={na:0, a:0, th:0, L:0, Th:0};
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
  ["showHorizon","showFeet","showArc","showLabels","phiFollow","showFlow","showChord","showLD","showAxesW","showAxesB","showWeight","showBuoy","showResultants"]
    .forEach(id=> S(id).addEventListener('change', draw, {passive:true}));
  S('play').addEventListener('click', startPlay);
  S('pause').addEventListener('click', stopPlay);
  S('fwd').addEventListener('click', ()=> step(+1));
  S('back').addEventListener('click', ()=> step(-1));
  S('panL').addEventListener('click', ()=>{ pan.x -= 18; draw(); });
  S('panR').addEventListener('click', ()=>{ pan.x += 18; draw(); });
  S('panU').addEventListener('click', ()=>{ pan.y -= 18; draw(); });
  S('panD').addEventListener('click', ()=>{ pan.y += 18; draw(); });
  S('pan0').addEventListener('click', ()=>{ pan={x:0,y:0}; draw(); });
  S('state0').addEventListener('click', resetState);
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
    h0:+S("h0").value, cw:+S("cw").value, vscale:+S("vscale").value, hscale:+S("hscale").value, vecscale:+S("vecscale").value,
    boardVolL:+S("boardVolL").value, boardArea:+S("boardArea").value, mastH:+S("mastH").value, boardLen:+S("boardLen").value,
    show:{ horizon:S("showHorizon").checked, feet:S("showFeet").checked, arc:S("showArc").checked, labels:S("showLabels").checked, flow:S("showFlow").checked, chord:S("showChord").checked, LD:S("showLD").checked, phiFollow:S("phiFollow").checked, axesW:S("showAxesW").checked, axesB:S("showAxesB").checked, weight:S("showWeight").checked, buoy:S("showBuoy").checked, result:S("showResultants").checked }
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
  S("vscalev").textContent=p.vscale.toFixed(0); S("hscalev").textContent=p.hscale.toFixed(0); S("vecscalev").textContent=p.vecscale.toFixed(1);
  S("volv").textContent=p.boardVolL.toFixed(0); S("areav").textContent=p.boardArea.toFixed(2);
  S("mastv").textContent=p.mastH.toFixed(2); S("Ltabv").textContent=p.boardLen.toFixed(2);
  S("dtv").textContent=p.dt.toFixed(3);
}


// ======== MODO FÍSICO (ODE) ========
// Parámetros dinámicos básicos
const dyn = {
  Itheta: 2.0,   // kg·m²
  cq: 4.0,       // N·m·s/rad
  ktheta: 20.0,  // N·m/rad
  Malpha: -8.0,  // N·m/rad (estabilizante con signo -)
  cu: 5.0        // N·s/m (amort. horizontal)
};

// Estado continuo (global W): x,z,u,w,theta,q
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
  return {Ff,Fb,Mr,theta_eff,gamma,alpha,L,D,Th,Vert,Sup};
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

function resetState(){ const p=P(); h=p.h0; wv=0; t=0; cyc_acc={na:0,a:0,th:0,L:0,Th:0}; draw(); }
function startPlay(){ if(playing) return; playing=setInterval(()=> step(+1), 30); }
function stopPlay(){ if(playing){ clearInterval(playing); playing=null; } }


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
    ins = { alpha:X._out.alpha, gamma:X._out.gamma, L:X._out.L, D:X._out.D,
            Th:X._out.Th, Vert:X._out.Vert,
            Sup: ((X._out.Vert + buoyancy(p,h).Fb) / (p.mass*9.81))*100,
            theta_eff: X.theta*180/Math.PI, Mr:X._out.Mr };
  } else {
    // modo anterior (prescrito)
    const ins0 = instant(p, (t%T+T)%T);
    // mantener integrador vertical existente si lo tienes (h, wv)
    const B=buoyancy(p,h); const mg=p.mass*9.81; const acc=(ins0.Vert+B.Fb-mg-p.cw*wv)/p.mass;
    wv += acc*dt; h += wv*dt;
    ins = ins0;
  }

  S('tVal').textContent=((t%T+T)%T).toFixed(2);

  // histórico acumulado (sólo cuando avanzamos)
  if(dir>0){
    cyc_acc.na++; cyc_acc.a+=ins.alpha; cyc_acc.th+=ins.theta_eff; cyc_acc.L+=ins.L; cyc_acc.Th+=ins.Th;
    if(crossed) endCyclePush();
  }
  draw(ins);
}


function draw(instOpt){
  const p=P(); labelRefresh(p);
  const inst = instOpt || instant(p,t);
  const B = buoyancy(p,h);

  // KPIs
  S("alphaOut").textContent=fmt(inst.alpha,1);
  S("thetaEffOut").textContent=fmt(inst.theta_eff,1);
  S("LOut").textContent=fmt(inst.L,0);
  S("LvOut").textContent=fmt(inst.L * Math.cos(inst.gamma * Math.PI/180), 0); // Componente vertical de L
  S("DOut").textContent=fmt(inst.D,0);
  S("ThOut").textContent=fmt(inst.Th,1);
  S("SupOut").textContent=fmt(inst.Sup,0);
  S("MrOut").textContent=fmt(inst.Mr,1);
  S("hOut").textContent=h.toFixed(3);
  S("BOut").textContent=Math.round(B.Fb).toString();
  S("draftOut").textContent=B.draft.toFixed(3);

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
    lbl.textContent='Tabla Navegando';
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
    const kpx = (40/(p.mass*9.81))*(p.vecscale||1);
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
    const Lf=100, vx=Lf*Math.cos(inst.gamma*Math.PI/180), vy=Lf*Math.sin(inst.gamma*Math.PI/180);
    arrow2((cx - vx) - 100, (cy - vy) + 50, cx - 100, cy + 50, '#000', 1.2); text((cx - 100)+6, (cy + 50),'V_rel (γ)');
  }

  // Vectores L/D
  if(p.show.LD){
    const kpx = (40/(p.mass*9.81)) * (p.vecscale||1);
    const Llen = Math.max(12, kpx*Math.max(0,inst.L));
    const Dlen = Math.max(12, kpx*Math.max(0,inst.D));
    const g = inst.gamma*Math.PI/180;
    const lhat = [Math.cos(g+Math.PI/2), Math.sin(g+Math.PI/2)];
    const dhat = [Math.cos(g+Math.PI),   Math.sin(g+Math.PI)  ];
    arrow2(cx, cy, cx + Llen*lhat[0], cy + Llen*lhat[1], '#2e7d32', 2.5);
    arrow2(cx, cy, cx + Dlen*dhat[0], cy + Dlen*dhat[1], '#ad8b00', 2.5);
  }

  // Peso, Arquímedes, Resultantes
  if(p.show.weight){
    const mg=p.mass*9.81; const k=(40/(p.mass*9.81))*(p.vecscale||1);
    arrow2(cx, cy, cx, cy + Math.max(12,k*mg), '#222', 2.5); text(cx+6, cy+22, 'mg');
  }
  if(p.show.buoy && B.draft>0){
    const k=(40/(p.mass*9.81))*(p.vecscale||1);
    arrow2(cx, cy - p.mastH*scale, cx, cy - p.mastH*scale - Math.max(12,k*B.Fb), '#0a6', 2.5);
  }
  if(p.show.result){
    const mg=p.mass*9.81; const k=(40/(p.mass*9.81))*(p.vecscale||1);
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
  const all=[]; series.forEach(arr=>all.push(...arr)); if(all.length===0){ text(8,20,ylabel,10); return; }
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
  drawSeries('chartForces', [histForces.L, histForces.Th], ['#2e7d32','#ad1457'], 'Fuerzas L, Th [N] (ciclo)');
}

function updateAll(){ draw(); }

window.addEventListener('DOMContentLoaded', ()=>{ bindUI(); resetState(); });
