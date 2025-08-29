// WingFoil — Simulador ODE v24b
const $=id=>document.getElementById(id);
const fmt=(x,d)=> (Math.abs(x)>=1000?x.toFixed(0):x.toFixed(d));

// ===== Sliders & Params
const sliders=["v0","phi","theta0","gamma0","S","rho","mass","LD","clslope","clmax","stall","freq","ampV","ampT","ampG","phaseT","phaseG","lambda","dstance","Af","Ab","phaseF","phaseB","h0","cw","vscale","hscale","vecscale","boardVolL","boardArea","mastH","boardLen"];
let t=0, playing=null, pan={x:0,y:0};

function S(id){const el=$(id); if(!el) throw new Error('#'+id+' no encontrado'); return el;}
function P(){return {
  V0:+S('v0').value, phi0:+S('phi').value, theta0:+S('theta0').value, gamma0:+S('gamma0').value,
  S:+S('S').value, rho:+S('rho').value, mass:+S('mass').value, LD:+S('LD').value,
  clslope:+S('clslope').value, clmax:+S('clmax').value, astall:+S('stall').value,
  freq:+S('freq').value, ampV:+S('ampV').value, ampT:+S('ampT').value, ampG:+S('ampG').value,
  phaseT:+S('phaseT').value, phaseG:+S('phaseG').value,
  lambda:+S('lambda').value, d:+S('dstance').value, Af:+S('Af').value, Ab:+S('Ab').value,
  phaseF:+S('phaseF').value, phaseB:+S('phaseB').value,
  h0:+S('h0').value, cw:+S('cw').value, vscale:+S('vscale').value, hscale:+S('hscale').value, vecscale:+S('vecscale').value,
  boardVolL:+S('boardVolL').value, boardArea:+S('boardArea').value, mastH:+S('mastH').value, boardLen:+S('boardLen').value,
  show:{horizon:S('showHorizon').checked, feet:S('showFeet').checked, labels:S('showLabels').checked, flow:S('showFlow').checked, chord:S('showChord').checked, LD:S('showLD').checked, weight:S('showWeight').checked, buoy:S('showBuoy').checked},
  useODE: S('useODE').checked
};}

function labelRefresh(p){
  S('v0v').textContent=p.V0.toFixed(2); S('phiv').textContent=p.phi0.toFixed(1);
  S('thetav').textContent=p.theta0.toFixed(1); S('gammav').textContent=p.gamma0.toFixed(1);
  S('Sv').textContent=p.S.toFixed(3); S('rhov').textContent=p.rho.toFixed(0);
  S('massv').textContent=p.mass.toFixed(0); S('LDv').textContent=p.LD.toFixed(1);
  S('clslopev').textContent=p.clslope.toFixed(3); S('clmaxv').textContent=p.clmax.toFixed(2);
  S('stallv').textContent=p.astall.toFixed(1); S('freqv').textContent=p.freq.toFixed(2);
  S('ampVv').textContent=p.ampV.toFixed(2); S('ampTv').textContent=p.ampT.toFixed(1); S('ampGv').textContent=p.ampG.toFixed(1);
  S('lambdav').textContent=p.lambda.toFixed(2); S('dv').textContent=p.d.toFixed(2);
  S('Afv').textContent=p.Af.toFixed(0); S('Abv').textContent=p.Ab.toFixed(0);
  S('phifv').textContent=p.phaseF.toFixed(0); S('phibv').textContent=p.phaseB.toFixed(0);
  S('h0v').textContent=p.h0.toFixed(2); S('cwv').textContent=p.cw.toFixed(0);
  S('vscalev').textContent=p.vscale.toFixed(0); S('hscalev').textContent=p.hscale.toFixed(0); S('vecscalev').textContent=p.vecscale.toFixed(1);
  S('volv').textContent=p.boardVolL.toFixed(0); S('areav').textContent=p.boardArea.toFixed(2);
  S('mastv').textContent=p.mastH.toFixed(2); S('Ltabv').textContent=p.boardLen.toFixed(2);
}

// ===== Rider forces
function riderFM(p,t){
  const W=p.mass*9.81, w=2*Math.PI*p.freq;
  let Ff=p.lambda*W, Fb=(1-p.lambda)*W;
  const qf=Math.sin(w*t + p.phaseF*Math.PI/180), qb=Math.sin(w*t + p.phaseB*Math.PI/180);
  Ff+=Math.max(0,p.Af*qf); Fb+=Math.max(0,p.Ab*qb);
  Ff=Math.max(0,Ff); Fb=Math.max(0,Fb);
  const Mr=(Fb-Ff)*(p.d/2);
  return {Ff,Fb,Mr};
}

// ===== CL model
function CL_from_alpha(aDeg, slope, clmax, astall){
  let CL=slope*aDeg; CL=Math.sign(CL||1)*Math.min(Math.abs(CL),clmax);
  const aa=Math.abs(aDeg); if(aa>astall){ const fade=Math.max(0,1-(aa-astall)/8); CL*=fade; }
  return CL;
}

// ===== Prescribed instant (legacy)
let h=-0.2, wv=0;
function instant(p,t){
  const {Ff,Fb,Mr}=riderFM(p,t);
  const theta_eff = p.theta0 + p.ampT*Math.sin(2*Math.PI*p.freq*t + p.phaseT*Math.PI/180);
  const gamma = p.gamma0 + p.ampG*Math.sin(2*Math.PI*p.freq*t + p.phaseG*Math.PI/180);
  const alpha = theta_eff - gamma;
  const V = p.V0 + p.ampV*Math.sin(2*Math.PI*p.freq*t);
  let CL=CL_from_alpha(alpha,p.clslope,p.clmax,p.astall);
  if(h>=0){ CL=0; } else { const hFade=0.05; if(-h<hFade) CL*=(-h/hFade); }
  const L=0.5*p.rho*V*V*p.S*CL, D=L/Math.max(1e-6,p.LD);
  const Lx=L*Math.cos((gamma+90)*Math.PI/180), Ly=L*Math.sin((gamma+90)*Math.PI/180);
  const Dx=D*Math.cos((gamma+180)*Math.PI/180), Dy=D*Math.sin((gamma+180)*Math.PI/180);
  const Th=Lx+Dx, Vert=Ly+Dy, Sup=(Vert/(p.mass*9.81))*100;
  return {Ff,Fb,Mr,theta_eff,gamma,alpha,L,D,Th,Vert,Sup};
}

// ===== Buoyancy
function buoyancy(p, zOrH){
  const hVal = zOrH; // en este sim, h=z del CoP (negativo bajo agua)
  const Vb = Math.max(0, p.boardVolL/1000), Ab=Math.max(1e-6, p.boardArea);
  const tb=Math.min(1.0, Vb/Ab);
  const y_anchor = hVal + p.mastH;
  const phi=p.phi0*Math.PI/180, tY=Math.sin(phi), nY=Math.cos(phi);
  const Lm=Math.max(0.8, p.boardLen);
  const y1 = y_anchor - (Lm/2)*tY - (tb/2)*nY;
  const y2 = y_anchor + (Lm/2)*tY - (tb/2)*nY;
  const y3 = y_anchor + (Lm/2)*tY + (tb/2)*nY;
  const y4 = y_anchor - (Lm/2)*tY + (tb/2)*nY;
  const yTop=Math.max(y1,y2,y3,y4), yBot=Math.min(y1,y2,y3,y4);
  let draft=0;
  if(yBot<0){ const subTop=Math.min(0,yTop); draft=Math.min(tb, Math.abs(subTop - yBot)); }
  const Fb=p.rho*9.81*Ab*draft;
  return {Fb,draft,tb,y_anchor};
}

// ===== ODE dynamics
const dyn = { Itheta:2.0, cq:4.0, ktheta:20.0, Malpha:-8.0, cu:5.0 };
let X = { x:0, z:-0.20, u:3.5, w:0.0, theta: 3*Math.PI/180, q:0.0 };

function hydroFromState(p, st){
  let {u,w,theta} = st;
  const V = Math.hypot(u,w) || 1e-6;
  const gamma = Math.atan2(w,u);
  const alpha = theta - gamma;
  let CL = CL_from_alpha(alpha*180/Math.PI, p.clslope, p.clmax, p.astall);
  if(st.z >= 0){ CL = 0; }
  const L=0.5*p.rho*V*V*p.S*CL;
  const D=L/Math.max(1e-6,p.LD);
  const Lx = L*(-Math.sin(gamma)), Ly = L*( Math.cos(gamma));
  const Dx = D*(-Math.cos(gamma)), Dy = D*(-Math.sin(gamma));
  return {alpha,gamma,V,L,D,Lx,Ly,Dx,Dy};
}

function rhs(t, st, p){
  const {Ff,Fb,Mr} = riderFM(p,t);
  const hydro = hydroFromState(p, st);
  const buoy = buoyancy(p, st.z);

  const Fx = hydro.Lx + hydro.Dx - dyn.cu*st.u;
  const Fz = hydro.Ly + hydro.Dy + buoy.Fb - p.mass*9.81 - p.cw*st.w;

  const Mhyd = dyn.Malpha * (hydro.alpha);
  const M = Mhyd + Mr - dyn.cq*st.q - dyn.ktheta*(st.theta - 0);

  const dx  = st.u;
  const dz  = st.w;
  const du  = Fx / p.mass;
  const dw  = Fz / p.mass;
  const dth = st.q;
  const dq  = M  / dyn.Itheta;

  return { dx,dz,du,dw,dth,dq,
    out: { alpha:hydro.alpha*180/Math.PI, gamma:hydro.gamma*180/Math.PI,
           L:hydro.L, D:hydro.D, Th:hydro.Lx+hydro.Dx, Vert:hydro.Ly+hydro.Dy, Fb:buoy.Fb, Mr, theta:st.theta*180/Math.PI } };
}

function rk4Step(st, dt, p, t){
  function add(a,k,s){ return { x:a.x+s*k.dx*dt, z:a.z+s*k.dz*dt, u:a.u+s*k.du*dt, w:a.w+s*k.dw*dt, theta:a.theta+s*k.dth*dt, q:a.q+s*k.dq*dt }; }
  const k1=rhs(t, st, p);
  const k2=rhs(t+dt/2, add(st,k1,0.5), p);
  const k3=rhs(t+dt/2, add(st,k2,0.5), p);
  const k4=rhs(t+dt,   add(st,k3,1.0), p);
  const xn={
    x: st.x + dt*(k1.dx + 2*k2.dx + 2*k3.dx + k4.dx)/6,
    z: st.z + dt*(k1.dz + 2*k2.dz + 2*k3.dz + k4.dz)/6,
    u: st.u + dt*(k1.du + 2*k2.du + 2*k3.du + k4.du)/6,
    w: st.w + dt*(k1.dw + 2*k2.dw + 2*k3.dw + k4.dw)/6,
    theta: st.theta + dt*(k1.dth + 2*k2.dth + 2*k3.dth + k4.dth)/6,
    q: st.q + dt*(k1.dq + 2*k2.dq + 2*k3.dq + k4.dq)/6
  };
  xn._out = k4.out; return xn;
}

// ===== Step & Play
function step(dir){
  const p=P(); const T=1/Math.max(0.01,p.freq); const dt = 1/240;
  const old_t=t; t=(t+dir*dt); const twrap=((t%T)+T)%T;
  let ins;
  if(p.useODE){
    const sign = (dir>=0)? +1 : -1;
    X = rk4Step(X, sign*dt, p, t);
    ins = { alpha:X._out.alpha, gamma:X._out.gamma, L:X._out.L, D:X._out.D, Th:X._out.Th, Vert:X._out.Vert, Sup:(X._out.Vert/(p.mass*9.81))*100, Mr:X._out.Mr, theta_eff: X._out.theta };
  }else{
    // Legacy prescribed + simple heave integrator
    const ins0=instant(p, twrap);
    const B=buoyancy(p,h); const mg=p.mass*9.81; const acc=(ins0.Vert+B.Fb-mg-p.cw*(0))/p.mass;
    h += acc*dt*dt; // mínima dinámica vertical
    ins=ins0;
  }
  S('tVal').textContent=twrap.toFixed(2);
  draw(ins);
}
let loop=null; function startPlay(){ if(!loop) loop=setInterval(()=>step(+1), 16);} function stopPlay(){ if(loop){clearInterval(loop); loop=null;}}

// ===== Draw
function draw(inst){
  const p=P(); labelRefresh(p); const svg=$('geom'); svg.innerHTML='';
  const wpx=svg.clientWidth||600, hpx=svg.clientHeight||420;
  const scale=p.vscale; const cx=wpx*0.50 + pan.x; const horizonY=hpx*0.45 + pan.y;
  const zNow = p.useODE ? X.z : (typeof h==='number'? h : -0.2);
  const cy=(hpx*0.62 + pan.y) - zNow*scale;

  const Lb=Math.max(40, p.boardLen*(p.hscale||110));
  const line=(x1,y1,x2,y2,st='#000',w2=1)=>{const L=document.createElementNS('http://www.w3.org/2000/svg','line');L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2);L.setAttribute('stroke',st);L.setAttribute('stroke-width',w2);svg.appendChild(L);return L;}
  const text=(x,y,t,fs=10,fill='#000')=>{ if(!p.show.labels) return; const T=document.createElementNS('http://www.w3.org/2000/svg','text');T.setAttribute('x',x);T.setAttribute('y',y);T.setAttribute('font-size',fs);T.setAttribute('fill',fill);T.textContent=t;svg.appendChild(T);}
  function ensureMarker(color){const id='m'+color.replace(/[^a-z0-9]/gi,''); let defs=svg.querySelector('defs'); if(!defs){defs=document.createElementNS('http://www.w3.org/2000/svg','defs');svg.appendChild(defs);} let m=svg.querySelector('#'+id); if(!m){m=document.createElementNS('http://www.w3.org/2000/svg','marker');m.setAttribute('id',id);m.setAttribute('markerWidth','6');m.setAttribute('markerHeight','6');m.setAttribute('refX','5');m.setAttribute('refY','3');m.setAttribute('orient','auto');m.setAttribute('markerUnits','strokeWidth');const tri=document.createElementNS('http://www.w3.org/2000/svg','path');tri.setAttribute('d','M0,0 L0,6 L6,3 z');tri.setAttribute('fill',color);m.appendChild(tri);defs.appendChild(m);} return 'url(#'+id+')';}
  function arrow2(x1,y1,x2,y2,st='#000',w2=2){const L=document.createElementNS('http://www.w3.org/2000/svg','line');L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2);L.setAttribute('stroke',st);L.setAttribute('stroke-width',w2);L.setAttribute('marker-end',ensureMarker(st));svg.appendChild(L);return L;}

  if(p.show.horizon){ line(20,horizonY,wpx-20,horizonY,'#333',1).setAttribute('stroke-dasharray','6,4'); text(wpx-160,horizonY-6,'Superficie del agua',10); }

  const theta_draw = p.useODE ? (X.theta) : ( (p.theta0 + p.ampT*Math.sin(2*Math.PI*p.freq*((t% (1/p.freq))) + p.phaseT*Math.PI/180)) * Math.PI/180 );
  const phi=p.phi0*Math.PI/180;
  const tHat=[Math.cos(phi),Math.sin(phi)], nHat=[-Math.sin(phi),Math.cos(phi)];

  const xAnchor=cx, yAnchor=cy - p.mastH*scale; line(cx,cy,xAnchor,yAnchor,'#444',3); text(xAnchor+6,yAnchor-6,'Mástil H',10);

  const Vb=Math.max(0,p.boardVolL/1000), Ab=Math.max(1e-6,p.boardArea), tb=Math.min(1.0,Vb/Ab), Tb=Math.max(4,tb*scale);
  const hx=(Lb/2)*tHat[0], hy=(Lb/2)*tHat[1], nx=(Tb/2)*nHat[0], ny=(Tb/2)*nHat[1];
  const p1=[xAnchor-hx-nx,yAnchor-hy-ny], p2=[xAnchor+hx-nx,yAnchor+hy-ny], p3=[xAnchor+hx+nx,yAnchor+hy+ny], p4=[xAnchor-hx+nx,yAnchor-hy+ny];
  const poly=document.createElementNS('http://www.w3.org/2000/svg','polygon'); poly.setAttribute('points',[p1,p2,p3,p4].map(p=>p[0]+','+p[1]).join(' ')); poly.setAttribute('fill','#cfe1ff'); poly.setAttribute('stroke','#6e8'); poly.setAttribute('stroke-width','1.2'); svg.appendChild(poly); text(xAnchor+hx+8,yAnchor+hy,'Tabla (φ)',10);

  // Flechas pies (⊥ tabla, hacia la tabla)
  if(p.show.feet){
    const mid=[(p1[0]+p3[0])/2,(p1[1]+p3[1])/2];
    const pixStance = Math.min(0.9*Lb, Math.max(10, P().d*(P().hscale||110)));
    const front=[mid[0]+(pixStance/2)*tHat[0], mid[1]+(pixStance/2)*tHat[1]];
    const back =[mid[0]-(pixStance/2)*tHat[0], mid[1]-(pixStance/2)*tHat[1]];
    const deckOff=0.5*Tb;
    const frontDeck=[front[0]-deckOff*nHat[0], front[1]-deckOff*nHat[1]];
    const backDeck =[back[0]-deckOff*nHat[0],  back[1]-deckOff*nHat[1]];
    const kpx=(P().vecscale||1)*(80/(P().mass*9.81)); const Lmax=0.6*Lb;
    const fLen=Math.min(Lmax,Math.max(12,kpx*Math.max(0,riderFM(P(),t).Ff)));
    const bLen=Math.min(Lmax,Math.max(12,kpx*Math.max(0,riderFM(P(),t).Fb)));
    const fTip=[frontDeck[0]-fLen*nHat[0], frontDeck[1]-fLen*nHat[1]];
    const bTip=[backDeck[0] -bLen*nHat[0],  backDeck[1] -bLen*nHat[1]];
    arrow2(frontDeck[0],frontDeck[1],fTip[0],fTip[1],'#c00',2.0);
    arrow2(backDeck[0], backDeck[1], bTip[0],bTip[1],'#06c',2.0);
  }

  // Calado & leyendas
  const B=buoyancy(P(), zNow);
  function clipBelow(pts){
    const out=[]; const N=pts.length;
    for(let i=0;i<N;i++){ const a=pts[i], b=pts[(i+1)%N]; const aB=a[1]>=horizonY, bB=b[1]>=horizonY;
      if(aB!==bB){ const tt=(horizonY-a[1])/(b[1]-a[1]); const ix=a[0]+tt*(b[0]-a[0]); out.push([ix,horizonY]); }
      if(bB) out.push(b);
    } return out;
  }
  const sub=clipBelow([p1,p2,p3,p4]);
  if(sub.length>=3){
    const polySub=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    polySub.setAttribute('points',sub.map(p=>p[0]+','+p[1]).join(' '));
    polySub.setAttribute('fill','#6bbcff'); polySub.setAttribute('opacity','0.6'); svg.appendChild(polySub);
  }
  const foilOut=(zNow>=0), boardIn=(B.draft>0);
  const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
  lbl.setAttribute('x',36+pan.x); lbl.setAttribute('y',horizonY-8); lbl.setAttribute('font-size','12');
  lbl.setAttribute('fill', boardIn ? '#0a6' : '#333'); lbl.textContent=boardIn?'Tabla Navegando':'Tabla Volando'; svg.appendChild(lbl);
  if(foilOut){ const l2=document.createElementNS('http://www.w3.org/2000/svg','text'); l2.setAttribute('x',36+pan.x); l2.setAttribute('y',horizonY-26); l2.setAttribute('font-size','12'); l2.setAttribute('fill','#c01616'); l2.textContent='Foil fuera del agua'; svg.appendChild(l2); }

  // Flow & chord / L&D / weight / buoyancy vectors
  if(p.show.flow && inst){ const g=inst.gamma*Math.PI/180; const Lf=84; const vx=Lf*Math.cos(g), vy=Lf*Math.sin(g); line(cx-vx,cy-vy,cx,cy,'#000',1.4); }
  if(p.show.chord && inst){ const th=inst.theta_eff? inst.theta_eff*Math.PI/180 : X.theta; const Lc=100; const cxa=cx-(Lc/2)*Math.cos(th), cya=cy-(Lc/2)*Math.sin(th); const cxb=cx+(Lc/2)*Math.cos(th), cyb=cy+(Lc/2)*Math.sin(th); line(cxa,cya,cxb,cyb,'#000',3); }
  if(p.show.LD && inst){ const k=(40/(P().mass*9.81))*(P().vecscale||1); const g=(inst.gamma||0)*Math.PI/180;
    const Llen=Math.max(12,k*Math.max(0,inst.L)), Dlen=Math.max(12,k*Math.max(0,inst.D));
    const lhat=[Math.cos(g+Math.PI/2),Math.sin(g+Math.PI/2)], dhat=[Math.cos(g+Math.PI),Math.sin(g+Math.PI)];
    arrow2(cx,cy,cx+Llen*lhat[0],cy+Llen*lhat[1],'#2e7d32',2.5);
    arrow2(cx,cy,cx+Dlen*dhat[0],cy+Dlen*dhat[1],'#ad8b00',2.5);
  }
  if(p.show.weight){ const k=(40/(P().mass*9.81))*(P().vecscale||1); arrow2(cx,cy,cx,cy+Math.max(12,k*P().mass*9.81),'#222',2.5); }
  if(p.show.buoy && B.draft>0){ const k=(40/(P().mass*9.81))*(P().vecscale||1); arrow2(cx, cy - P().mastH*P().vscale, cx, cy - P().mastH*P().vscale - Math.max(12,k*B.Fb), '#0a6', 2.5); }

  // KPIs
  $('alphaOut').textContent = fmt(inst.alpha||0,1);
  $('thetaEffOut').textContent = fmt(inst.theta_eff ?? (X.theta*180/Math.PI),1);
  $('LOut').textContent = fmt(inst.L||0,0);
  $('DOut').textContent = fmt(inst.D||0,0);
  $('ThOut').textContent = fmt(inst.Th||0,1);
  $('SupOut').textContent = fmt((inst.Vert||0)/(P().mass*9.81)*100,0);
  $('MrOut').textContent = fmt(inst.Mr||0,1);
  $('hOut').textContent = (zNow).toFixed(3);
  $('BOut').textContent = Math.round(B.Fb).toString();
  $('draftOut').textContent = B.draft.toFixed(3);
}

// ===== Bind
function bind(){
  sliders.forEach(id=>{ const el=S(id); el.addEventListener('input',()=>draw({})); });
  ['useODE','showHorizon','showFeet','showLabels','showFlow','showChord','showLD','showWeight','showBuoy'].forEach(id=> S(id).addEventListener('change',()=>draw({})));
  $('play').addEventListener('click',()=>{startPlay()}); $('pause').addEventListener('click',()=>{stopPlay()});
  $('fwd').addEventListener('click',()=>step(+1)); $('back').addEventListener('click',()=>step(-1));
}
window.addEventListener('DOMContentLoaded',()=>{ bind(); h=+P().h0; draw({}); });
