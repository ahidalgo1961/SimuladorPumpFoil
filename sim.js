const $ = id => document.getElementById(id);
function S(id){ const el=$(id); if(!el) throw new Error(`#${id} no encontrado`); return el; }
const fmt=(x,d)=> (Math.abs(x)>=1000?x.toFixed(0):x.toFixed(d));

const sliders = ["v0","phi","theta0","gamma0","S","rho","mass","LD","clslope","clmax","stall",
 "freq","ampV","ampT","ampG","phaseT","phaseG","lambda","dstance","Af","Ab",
 "phaseF","phaseB","Gtheta","Kphi","h0","cw","vscale","vecscale","boardVolL","boardArea","mastH","boardLen","shape"];

function bindUI(){
  sliders.forEach(id=>{ const el=document.getElementById(id); if(!el) return;
    el.addEventListener('input', updateAll, {passive:true});
    el.addEventListener('change', updateAll, {passive:true});
    // persist
    try{
      const KEY='wf_persist_v23d';
      el.addEventListener('input', ()=>{
        const obj = JSON.parse(localStorage.getItem(KEY) || '{}'); obj[id]=el.value;
        localStorage.setItem(KEY, JSON.stringify(obj));
      }, {passive:true});
    }catch(e){}
  });
  ["waveF","waveB","showHorizon","showFeet","showArc","showLabels","phiFollow","showFlow","showChord","showLD","showAxesW","showAxesB","showWeight","showBuoy","showResultants"]
    .forEach(id=>{ const el=$(id); el.addEventListener('change', draw, {passive:true}); });
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
  S("vscalev").textContent=p.vscale.toFixed(0); S("vecscalev").textContent=p.vecscale.toFixed(1);
  S("volv").textContent=p.boardVolL.toFixed(0); S("areav").textContent=p.boardArea.toFixed(2);
  S("mastv").textContent=p.mastH.toFixed(2); S("Ltabv").textContent=p.boardLen.toFixed(2);
}

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

let t=0, T=1, playing=null;
let h=0, wv=0;
let pan={x:0,y:0};

function instant(p,t){
  const {Ff,Fb,Mr}=riderFM(p,t);
  const theta_eff = p.theta0 + p.Gtheta*Mr;
  const gamma = p.gamma0;
  const alpha = theta_eff - gamma;
  const V = p.V0;
  let CL=CL_from_alpha(alpha,p.clslope,p.clmax,p.astall);
  const hFade=0.05;
  if(h>=0) CL=0; else if(-h<hFade) CL*=(-h/hFade);
  let L=0.5*p.rho*V*V*p.S*CL;
  let D=L/Math.max(1e-6,p.LD);
  const Lx=L*Math.cos((gamma+90)*Math.PI/180), Ly=L*Math.sin((gamma+90)*Math.PI/180);
  const Dx=D*Math.cos((gamma+180)*Math.PI/180), Dy=D*Math.sin((gamma+180)*Math.PI/180);
  const Th=Lx+Dx, Vert=Ly+Dy, Sup=(Vert/(p.mass*9.81))*100;
  return {Ff,Fb,Mr,theta_eff,gamma,alpha,L,D,Th,Vert,Sup};
}

const abs=Math.abs, min4=(a,b,c,d)=>Math.min(a,b,c,d), max4=(a,b,c,d)=>Math.max(a,b,c,d);

function buoyancy(p, h){
  const Vb = Math.max(0, p.boardVolL/1000);
  const Ab = Math.max(1e-6, p.boardArea);
  const tb = Math.min(1.0, Vb/Ab);
  const Lm = Math.max(0.8, p.boardLen);
  const y_anchor = h + p.mastH; // marco W (y=0 agua)
  const phi = p.phi0*Math.PI/180;
  const tY=Math.sin(phi), nY=Math.cos(phi);
  const y1 = y_anchor - (Lm/2)*tY - (tb/2)*nY;
  const y2 = y_anchor + (Lm/2)*tY - (tb/2)*nY;
  const y3 = y_anchor + (Lm/2)*tY + (tb/2)*nY;
  const y4 = y_anchor - (Lm/2)*tY + (tb/2)*nY;
  const yTop = max4(y1,y2,y3,y4);
  const yBot = min4(y1,y2,y3,y4);
  let draft=0;
  if(yBot<0){
    const subTop = Math.min(0, yTop);
    const subBot = yBot;
    draft = Math.min(tb, abs(subTop - subBot));
  } else draft=0;
  const Fb = p.rho*9.81*Ab*draft;
  return {Fb, draft, tb, yTop, yBot, y_anchor};
}

function resetState(){ const p=P(); h=p.h0; wv=0; t=0; draw(); }
function startPlay(){ if(playing) return; playing=setInterval(()=> step(+1), 30); }
function stopPlay(){ if(playing){ clearInterval(playing); playing=null; } }
function step(dir){
  const p=P(); T=1/Math.max(0.01,p.freq); const dt=T/240; t=(t+dir*dt)%T; if(t<0) t+=T;
  const ins=instant(p,t); const B=buoyancy(p,h);
  const mg=p.mass*9.81; const acc=(ins.Vert+B.Fb-mg-p.cw*wv)/p.mass;
  wv += acc*dt; h += wv*dt;
  S('tVal').textContent=t.toFixed(2);
  step._B=B; draw(ins);
}

function draw(instOpt){
  const p=P(); labelRefresh(p);
  const inst = instOpt || instant(p,t);
  const B = step._B || buoyancy(p,h);

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

  // SVG setup
  const svg=S("geom"); svg.innerHTML="";
  const wpx=svg.clientWidth||600, hpx=svg.clientHeight||420;
  const scale = p.vscale;
  const cx=wpx*0.50 + pan.x;
  const horizonY=hpx*0.45 + pan.y;
  const cy=(hpx*0.62 + pan.y) - h*scale;

  // helpers
  const line=(x1,y1,x2,y2,stroke="#000",w2=1)=>{const L=document.createElementNS('http://www.w3.org/2000/svg','line'); L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2); L.setAttribute('stroke',stroke);L.setAttribute('stroke-width',w2); svg.appendChild(L); return L; };
  const text=(x,y,t,fs=10)=>{ if(!p.show.labels) return; const T=document.createElementNS('http://www.w3.org/2000/svg','text'); T.setAttribute('x',x);T.setAttribute('y',y);T.setAttribute('font-size',fs); T.textContent=t; svg.appendChild(T); return T; };
  function arrow2(x1,y1,x2,y2,stroke='#000',w2=2){
    const L=document.createElementNS('http://www.w3.org/2000/svg','line');
    L.setAttribute('x1',x1);L.setAttribute('y1',y1);L.setAttribute('x2',x2);L.setAttribute('y2',y2);
    L.setAttribute('stroke',stroke);L.setAttribute('stroke-width',w2);
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
    const m=document.createElementNS('http://www.w3.org/2000/svg','marker');
    m.setAttribute('id','arrBig'); m.setAttribute('markerWidth','10'); m.setAttribute('markerHeight','10');
    m.setAttribute('refX','8'); m.setAttribute('refY','5'); m.setAttribute('orient','auto'); m.setAttribute('markerUnits','strokeWidth');
    const tri=document.createElementNS('http://www.w3.org/2000/svg','path'); tri.setAttribute('d','M0,0 L0,10 L10,5 z'); tri.setAttribute('fill',stroke);
    m.appendChild(tri); defs.appendChild(m); svg.appendChild(defs);
    L.setAttribute('marker-end','url(#arrBig)'); svg.appendChild(L); return L;
  }

  // Superficie del agua (y=0)
  if(p.show.horizon){
    line(20,horizonY,wpx-20,horizonY,'#333',1).setAttribute('stroke-dasharray','6,4');
    text(wpx-140,horizonY-6,'Superficie del agua',10);
  }

  // φ dinámico
  const phiDeg = p.show.phiFollow ? (p.phi0 + p.Kphi*inst.Mr) : p.phi0;
  const phi = phiDeg*Math.PI/180;

  // Tabla anclada a mástil
  const Lb=160;
  const tHat=[Math.cos(phi), Math.sin(phi)];
  const nHat=[-Math.sin(phi), Math.cos(phi)];
  const xAnchor = cx;
  const yAnchor = cy - p.mastH*scale;
  line(cx, cy, xAnchor, yAnchor, '#444', 3); text(xAnchor+6, yAnchor-6, 'Mástil H');

  // Ejes W y B
  if(p.show.axesW){
    // Proa (nariz) = centro + (Lb/2)*tHat
    const noseX = xAnchor + (Lb/2)*tHat[0];
    const noseY = yAnchor + (Lb/2)*tHat[1];
    // Ejes W en proa (0,0)
    arrow2(noseX,noseY, noseX+28, noseY, '#333',1.6); text(noseX+32, noseY+4, 'x');
    arrow2(noseX,noseY, noseX, noseY-28, '#333',1.6); text(noseX-8, noseY-30, 'y');
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx',noseX); c.setAttribute('cy',noseY); c.setAttribute('r','3'); c.setAttribute('fill','#333'); svg.appendChild(c);
    text(noseX-12, noseY-8, 'W(0,0)');
  }
  if(p.show.axesB){
    arrow2(xAnchor,yAnchor, xAnchor+32*tHat[0], yAnchor+32*tHat[1], '#555',1.6); text(xAnchor+32*tHat[0]+4, yAnchor+32*tHat[1]+4, 'x_b');
    arrow2(xAnchor,yAnchor, xAnchor+32*nHat[0], yAnchor+32*nHat[1], '#555',1.6); text(xAnchor+32*nHat[0]+4, yAnchor+32*nHat[1]+4, 'y_b');
    const c2=document.createElementNS('http://www.w3.org/2000/svg','circle'); c2.setAttribute('cx',xAnchor); c2.setAttribute('cy',yAnchor); c2.setAttribute('r','3'); c2.setAttribute('fill','#555'); svg.appendChild(c2); text(xAnchor-8, yAnchor+12, 'z_b ⊙'); text(xAnchor-10, yAnchor-8, 'B');
  }

  // Rectángulo de tabla (t=V/A → px)
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

  // Cuerda y flujo
  if(p.show.chord){
    const th=inst.theta_eff*Math.PI/180, Lc=100;
    const cxa=cx-(Lc/2)*Math.cos(th), cya=cy-(Lc/2)*Math.sin(th);
    const cxb=cx+(Lc/2)*Math.cos(th), cyb=cy+(Lc/2)*Math.sin(th);
    line(cxa,cya,cxb,cyb,'#000',4); text(cxb+6,cyb,'Cuerda (θ_eff)');
  }
  if(p.show.flow){
    const Lf=84, vx=Lf*Math.cos(inst.gamma*Math.PI/180), vy=Lf*Math.sin(inst.gamma*Math.PI/180);
    line(cx - vx, cy - vy, cx, cy, '#000', 1.2); text(cx+6,cy,'V_rel (γ)');
  }

  // Parte sumergida: recorte poligonal contra y=horizonY
  function clipBelowWater(pts){
    const out=[]; const N=pts.length;
    for(let i=0;i<N;i++){
      const a=pts[i], b=pts[(i+1)%N];
      const aBelow = a[1] >= horizonY;
      const bBelow = b[1] >= horizonY;
      if(aBelow !== bBelow){
        const t = (horizonY - a[1]) / (b[1] - a[1]);
        const ix = a[0] + t*(b[0]-a[0]); const iy = horizonY;
        out.push([ix,iy]);
      }
      if(bBelow) out.push(b);
    }
    return out;
  }

  if(B.draft>0){
    const subPoly = clipBelowWater(boardPoly);
    if(subPoly.length>=3){
      const polySub = document.createElementNS('http://www.w3.org/2000/svg','polygon');
      polySub.setAttribute('points', subPoly.map(p=>`${p[0]},${p[1]}`).join(' '));
      polySub.setAttribute('fill', '#6bbcff'); polySub.setAttribute('opacity','0.6');
      svg.appendChild(polySub);
      // Línea de flotación + etiqueta
      for(let i=0;i<subPoly.length;i++){
        const a=subPoly[i], b=subPoly[(i+1)%subPoly.length];
        if(Math.abs(a[1]-horizonY)<0.5 && Math.abs(b[1]-horizonY)<0.5){
          line(a[0],a[1],b[0],b[1],'#068',2);
          const mx=(a[0]+b[0])/2, my=a[1]-4;
          const label=document.createElementNS('http://www.w3.org/2000/svg','text');
          label.setAttribute('x', mx); label.setAttribute('y', my);
          label.setAttribute('font-size', 11); label.setAttribute('fill', '#036');
          label.textContent = `${B.draft.toFixed(3)} m`; svg.appendChild(label);
        }
      }
    }
    text(26+pan.x, horizonY-10, 'Tabla Navegando');
  } else if (h<0){
    text(26+pan.x, horizonY-10, 'Tabla Volando');
  }

  // Vectores L/D (opcional)
  if(p.show.LD){
    const kpxLD = (40/(p.mass*9.81)) * (p.vecscale||1);
    const Llen = Math.max(12, kpxLD*Math.max(0,inst.L));
    const Dlen = Math.max(12, kpxLD*Math.max(0,inst.D));
    const g = inst.gamma*Math.PI/180;
    const lhat = [Math.cos(g+Math.PI/2), Math.sin(g+Math.PI/2)];
    const dhat = [Math.cos(g+Math.PI),   Math.sin(g+Math.PI)  ];
    const Ltip=[cx + Llen*lhat[0], cy + Llen*lhat[1]];
    const Dtip=[cx + Dlen*dhat[0], cy + Dlen*dhat[1]];
    arrow2(cx, cy, Ltip[0], Ltip[1], '#090', 2.5);
    arrow2(cx, cy, Dtip[0], Dtip[1], '#b90', 2.5);
    text(Ltip[0]+6,Ltip[1],`L (${Math.round(inst.L)} N)`);
    text(Dtip[0]+6,Dtip[1],`D (${Math.round(inst.D)} N)`);
  }

  // Peso, Arquímedes y Resultantes
  if(p.show.weight){
    const mg = p.mass*9.81;
    const kpxW = (40/(p.mass*9.81)) * (p.vecscale||1);
    const Wlen = Math.max(12, kpxW*mg);
    arrow2(cx, cy, cx, cy + Wlen, '#222', 2.5);
    text(cx+6, cy + Wlen + 12, `mg (${Math.round(mg)} N)`);
  }
  if(p.show.buoy && B.draft>0){
    const kpxB = (40/(p.mass*9.81)) * (p.vecscale||1);
    const Blen = Math.max(12, kpxB*B.Fb);
    const xAnchor = cx, yAnchor = cy - p.mastH*scale;
    arrow2(xAnchor, yAnchor, xAnchor, yAnchor - Blen, '#0a6', 2.5);
    text(xAnchor+6, yAnchor - Blen - 6, `F_b (${Math.round(B.Fb)} N)`);
  }
  if(p.show.result){
    const mg = p.mass*9.81;
    const VertRes = inst.Vert + B.Fb - mg;
    const kpxR = (40/(p.mass*9.81)) * (p.vecscale||1);
    const Rvlen = Math.max(12, Math.abs(kpxR*VertRes));
    const dirv = VertRes>=0 ? -1 : 1;
    arrow2(cx, cy, cx, cy + dirv*Rvlen, '#a0a', 2.5);
    text(cx+8, cy + dirv*Rvlen - 6, `R_v (${Math.round(VertRes)} N)`);
    const Rhlen = Math.max(12, Math.abs(kpxR*inst.Th));
    const dirh = inst.Th>=0 ? 1 : -1;
    arrow2(cx, cy, cx + dirh*Rhlen, cy, '#a0a', 2.5);
    text(cx + dirh*Rhlen + 8, cy - 6, `R_h (${Math.round(inst.Th)} N)`);
  }

  // Flechas pies ⊥ a la tabla (hacia tabla)
  if(p.show.feet){
    const mid=[(p1[0]+p3[0])/2,(p1[1]+p3[1])/2];
    const pixStance = Math.min(0.9*Lb, Math.max(10, p.d*scale));
    const front=[mid[0]+(pixStance/2)*tHat[0], mid[1]+(pixStance/2)*tHat[1]];
    const back =[mid[0]-(pixStance/2)*tHat[0], mid[1]-(pixStance/2)*tHat[1]];
    const kpx = (40/(p.mass*9.81)) * (p.vecscale||1);
    const fLen=Math.max(12, kpx*Math.max(0,inst.Ff));
    const bLen=Math.max(12, kpx*Math.max(0,inst.Fb));
    const fTip=[front[0]+fLen*nHat[0], front[1]+fLen*nHat[1]];
    const bTip=[back [0]+bLen*nHat[0], back [1]+bLen*nHat[1]];
    arrow2(front[0],front[1],fTip[0],fTip[1],'#c00',2.5);
    arrow2(back[0],back[1], bTip[0], bTip[1],'#06c',2.5);
    text(front[0]+6,front[1]-6,`Front ⊥ (${Math.round(inst.Ff)} N)`);
    text(back [0]+6,back [1]-6,`Back ⊥ (${Math.round(inst.Fb)} N)`);
  }

  // Aviso si el foil toca superficie
  if(h>=0){ const warn=document.createElementNS('http://www.w3.org/2000/svg','text'); warn.setAttribute('x', cx+10); warn.setAttribute('y', cy-10); warn.setAttribute('font-size', 12); warn.setAttribute('fill', '#c00'); warn.textContent='Foil fuera del agua'; svg.appendChild(warn); }
}

function updateAll(){ draw(); }

// cargar persistencia
(function(){
  try{
    const KEY='wf_persist_v23d'; const obj=JSON.parse(localStorage.getItem(KEY)||'{}');
    for(const k in obj){ const el=document.getElementById(k); if(el){ el.value=obj[k]; } }
  }catch(e){}
})();

window.addEventListener('DOMContentLoaded', ()=>{ bindUI(); resetState(); });
