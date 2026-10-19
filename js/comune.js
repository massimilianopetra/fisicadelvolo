/* =====================================================================
   FISICA DEL VOLO — parti comuni a tutte le pagine
   - testata, indice dei capitoli a sinistra, capitolo precedente/successivo
   - formule con KaTeX (lib/katex, in locale: funziona anche senza Internet)
   - piccoli strumenti per i laboratori interattivi: grafici su canvas,
     cursori, numeri all'italiana
   Script classico (niente moduli): la pagina si apre anche con doppio clic.
   ===================================================================== */
(function(){
'use strict';
const FV=window.FV=window.FV||{};

FV.CAPITOLI=[
  {f:'01-riferimenti.html',   t:'Sistemi di riferimento e angoli',       d:'Assi terra e assi corpo, prua, beccheggio, rollio, angolo d\'attacco.'},
  {f:'02-atmosfera.html',     t:'L\'atmosfera e le velocità',            d:'Densità con la quota, pressione dinamica, velocità indicata e vera.'},
  {f:'03-aerodinamica.html',  t:'Portanza e resistenza',                 d:'Coefficienti, curva di portanza, stallo, polare, resistenza indotta.'},
  {f:'04-prestazioni.html',   t:'Prestazioni: crociera, salita, virata', d:'Equilibrio delle forze, fattore di carico, raggio di virata, planata, vento.'},
  {f:'05-elica.html',         t:'Motore ed elica',                       d:'Spinta, potenza, giri dell\'elica a passo fisso, consumo di carburante.'},
  {f:'06-stabilita.html',     t:'Momenti e stabilità',                   d:'Derivate di stabilità, trim, stabilità statica e dinamica, comandi.'},
  {f:'07-corpo-rigido.html',  t:'Il corpo rigido a 6 gradi di libertà',  d:'Newton ed Eulero, momenti d\'inerzia, quaternioni, l\'effetto racchetta.'},
  {f:'08-integrazione.html',  t:'Integrazione numerica e carrello',      d:'Dal continuo ai passi di calcolo, molle e smorzatori, attrito delle ruote.'},
  {f:'09-radionavigazione.html',t:'Radionavigazione: VOR e ILS',         d:'Radiali, localizzatore, sentiero di discesa, orizzonte radio.'},
  {f:'10-autopilota.html',    t:'Autopilota e controllo PID',            d:'Anelli di controllo, proporzionale-integrale-derivativo, protezioni.'},
  {f:'appendice-dati.html',   t:'Appendice: i numeri del Cessna 172',    d:'Tutti i parametri del modello, con il loro significato.'},
  {f:'bibliografia.html',     t:'Per saperne di più',                    d:'Libri, corsi liberi e fonti dei dati.'},
];
FV.SIMULATORE='https://massimilianopetra.github.io/flightsimulator/';
FV.CODICE='https://github.com/massimilianopetra/flightsimulator/blob/main/';
FV.MANUALE='https://massimilianopetra.github.io/flightsimulator/istruzioni.html';

const inCapitoli=/\/capitoli\//.test(location.pathname.replace(/\\/g,'/'));
const base=inCapitoli?'../':'';
const qui=location.pathname.split(/[\\/]/).pop();

/* ---------- impaginazione ---------- */
function impagina(){
  const main=document.querySelector('main');if(!main) return;
  const testata=document.createElement('header');testata.className='testata';
  testata.innerHTML=`<div class="dentro"><a class="marchio" href="${base}index.html">Fisica del <span>volo</span></a>
    <nav><a href="${base}index.html">Indice</a><a href="${FV.MANUALE}" target="_blank" rel="noopener">Manuale del gioco ↗</a>
    <a class="vola" href="${FV.SIMULATORE}" target="_blank" rel="noopener">✈ Vola con il simulatore</a></nav></div>`;
  const pagina=document.createElement('div');pagina.className='pagina';
  const indice=document.createElement('aside');indice.className='indice';
  indice.innerHTML='<ol>'+FV.CAPITOLI.map((c,i)=>{
    const n=/^\d/.test(c.f)?String(i+1).padStart(2,'0'):'·';
    return `<li><a href="${base}capitoli/${c.f}"${c.f===qui?' class="qui"':''}><span class="num">${n}</span>${c.t}</a></li>`;
  }).join('')+'</ol>';
  main.parentNode.insertBefore(testata,main);
  main.parentNode.insertBefore(pagina,main);
  pagina.appendChild(indice);pagina.appendChild(main);
  // capitolo precedente / successivo
  const i=FV.CAPITOLI.findIndex(c=>c.f===qui);
  if(i>=0){
    const nav=document.createElement('div');nav.className='navcap';
    const p=FV.CAPITOLI[i-1],s=FV.CAPITOLI[i+1];
    nav.innerHTML=(p?`<a href="${p.f}">← ${p.t}</a>`:`<a href="../index.html">← Indice</a>`)+(s?`<a href="${s.f}">${s.t} →</a>`:'<span></span>');
    main.appendChild(nav);
  }
  const piede=document.createElement('footer');
  piede.innerHTML='Fisica del volo — la teoria dietro il simulatore <a href="'+FV.SIMULATORE+'" target="_blank" rel="noopener">Volo</a> '+
    '(<a href="'+FV.MANUALE+'" target="_blank" rel="noopener">manuale del gioco</a>, <a href="https://github.com/massimilianopetra/flightsimulator" target="_blank" rel="noopener">codice</a>). '+
    '© 2026 Massimiliano Petra · <a href="mailto:massimiliano.petra@gmail.com">massimiliano.petra@gmail.com</a> · testi e figure con licenza <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.it" target="_blank" rel="noopener">CC BY-SA 4.0</a> · '+
    'formule disegnate con KaTeX (licenza MIT), caratteri B612 (SIL OFL).';
  document.body.appendChild(piede);
  // collegamenti al codice del simulatore: <a data-codice="js/fisica.js#L97">
  for(const a of document.querySelectorAll('a[data-codice]')){a.href=FV.CODICE+a.dataset.codice;a.target='_blank';a.rel='noopener';}
}

/* ---------- formule ---------- */
function formule(){
  if(!window.renderMathInElement) return;
  renderMathInElement(document.body,{delimiters:[
    {left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});
}

/* ---------- numeri all'italiana ---------- */
FV.fmt=(v,d=0)=>Number.isFinite(v)?v.toLocaleString('it-IT',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';
FV.D2R=Math.PI/180;FV.R2D=180/Math.PI;FV.KT=1.943844;FV.FT=3.28084;FV.G=9.81;

/* ---------- colori dal foglio di stile (cambiano col tema) ---------- */
FV.colore=n=>getComputedStyle(document.documentElement).getPropertyValue('--'+n).trim()||'#888';

/* ---------- cursore: <input type=range id=...> + <output for=...> ---------- */
FV.cursore=(id,fn,formato)=>{
  const el=document.getElementById(id),out=document.querySelector(`output[for="${id}"]`);
  const agg=()=>{const v=+el.value;if(out)out.textContent=formato?formato(v):FV.fmt(v,(el.step.split('.')[1]||'').length);fn&&fn(v);};
  el.addEventListener('input',agg);
  return {get v(){return +el.value;},set v(x){el.value=x;agg();},agg};
};

/* ---------- grafico su canvas ----------
   g=FV.grafico(canvas,{x:[min,max],y:[min,max],etX:'α (°)',etY:'CL',passoX,passoY})
   poi g.pulisci(); g.assi(); g.curva(f,colore); g.punto(x,y,colore,testo) ...  */
FV.grafico=(cv,o)=>{
  const ctx=cv.getContext('2d');
  const g={o,ctx,W:0,H:0,m:{s:52,d:14,a:26,b:38}};
  function dimensioni(){
    const r=window.devicePixelRatio||1,w=cv.clientWidth||600,h=Math.round(w*(o.rapporto||0.55));
    cv.style.height=h+'px';cv.width=Math.round(w*r);cv.height=Math.round(h*r);
    ctx.setTransform(r,0,0,r,0,0);g.W=w;g.H=h;
  }
  dimensioni();
  g.X=x=>g.m.s+(x-o.x[0])/(o.x[1]-o.x[0])*(g.W-g.m.s-g.m.d);
  g.Y=y=>g.H-g.m.b-(y-o.y[0])/(o.y[1]-o.y[0])*(g.H-g.m.a-g.m.b);
  g.pulisci=()=>{dimensioni();ctx.clearRect(0,0,g.W,g.H);};
  g.assi=()=>{
    const c=FV.colore('linea'),t=FV.colore('tenue');
    ctx.font='12px "B612 Mono",monospace';ctx.lineWidth=1;
    const px=o.passoX||passoBello(o.x[1]-o.x[0]),py=o.passoY||passoBello(o.y[1]-o.y[0]);
    ctx.textAlign='center';ctx.textBaseline='top';
    for(let x=Math.ceil(o.x[0]/px)*px;x<=o.x[1]+1e-9;x+=px){
      ctx.strokeStyle=c;ctx.beginPath();ctx.moveTo(g.X(x),g.Y(o.y[0]));ctx.lineTo(g.X(x),g.Y(o.y[1]));ctx.stroke();
      ctx.fillStyle=t;ctx.fillText(FV.fmt(x,decimali(px)),g.X(x),g.Y(o.y[0])+4);
    }
    ctx.textAlign='right';ctx.textBaseline='middle';
    for(let y=Math.ceil(o.y[0]/py)*py;y<=o.y[1]+1e-9;y+=py){
      ctx.strokeStyle=c;ctx.beginPath();ctx.moveTo(g.X(o.x[0]),g.Y(y));ctx.lineTo(g.X(o.x[1]),g.Y(y));ctx.stroke();
      ctx.fillStyle=t;ctx.fillText(FV.fmt(y,decimali(py)),g.X(o.x[0])-6,g.Y(y));
    }
    // assi dello zero più marcati
    ctx.strokeStyle=t;ctx.lineWidth=1.2;
    if(o.y[0]<0&&o.y[1]>0){ctx.beginPath();ctx.moveTo(g.X(o.x[0]),g.Y(0));ctx.lineTo(g.X(o.x[1]),g.Y(0));ctx.stroke();}
    if(o.x[0]<0&&o.x[1]>0){ctx.beginPath();ctx.moveTo(g.X(0),g.Y(o.y[0]));ctx.lineTo(g.X(0),g.Y(o.y[1]));ctx.stroke();}
    ctx.fillStyle=FV.colore('testo');ctx.font='13px "B612",sans-serif';
    ctx.textAlign='right';ctx.textBaseline='bottom';if(o.etX)ctx.fillText(o.etX,g.W-g.m.d,g.H-4);
    ctx.textAlign='left';ctx.textBaseline='top';if(o.etY)ctx.fillText(o.etY,4,0);
  };
  g.curva=(f,col,lw=2.2,tratteggio)=>{
    ctx.save();ctx.beginPath();ctx.rect(g.m.s,g.m.a,g.W-g.m.s-g.m.d,g.H-g.m.a-g.m.b);ctx.clip();   // dentro il riquadro
    ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.setLineDash(tratteggio||[]);ctx.beginPath();
    const n=400;let su=false;
    for(let i=0;i<=n;i++){
      const x=o.x[0]+(o.x[1]-o.x[0])*i/n,y=f(x);
      if(!Number.isFinite(y)){su=false;continue;}
      const yy=Math.max(-1e4,Math.min(1e4,g.Y(y)));
      if(su)ctx.lineTo(g.X(x),yy);else{ctx.moveTo(g.X(x),yy);su=true;}
    }
    ctx.stroke();ctx.setLineDash([]);ctx.restore();
  };
  g.serie=(xs,ys,col,lw=2)=>{
    ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.beginPath();
    for(let i=0;i<xs.length;i++){const X=g.X(xs[i]),Y=g.Y(ys[i]);if(i)ctx.lineTo(X,Y);else ctx.moveTo(X,Y);}
    ctx.stroke();
  };
  g.punto=(x,y,col,testo,dx=8,dy=-8)=>{
    ctx.fillStyle=col;ctx.beginPath();ctx.arc(g.X(x),g.Y(y),5,0,7);ctx.fill();
    if(testo){ctx.font='12px "B612",sans-serif';ctx.textAlign=dx<0?'right':'left';ctx.textBaseline='bottom';ctx.fillText(testo,g.X(x)+dx,g.Y(y)+dy+8);}
  };
  g.linea=(x1,y1,x2,y2,col,lw=1.5,tratteggio)=>{
    ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.setLineDash(tratteggio||[]);
    ctx.beginPath();ctx.moveTo(g.X(x1),g.Y(y1));ctx.lineTo(g.X(x2),g.Y(y2));ctx.stroke();ctx.setLineDash([]);
  };
  g.testo=(x,y,s,col,allinea='left')=>{ctx.fillStyle=col||FV.colore('testo');ctx.font='12px "B612",sans-serif';ctx.textAlign=allinea;ctx.textBaseline='middle';ctx.fillText(s,g.X(x),g.Y(y));};
  return g;
};
function passoBello(span){const p=Math.pow(10,Math.floor(Math.log10(span/6)));const k=span/6/p;return p*(k<1.5?1:k<3.5?2:k<7.5?5:10);}
function decimali(p){return p>=1?0:Math.min(3,Math.ceil(-Math.log10(p)));}

/* ---------- freccia su canvas (in pixel) ---------- */
FV.freccia=(ctx,x1,y1,x2,y2,col,lw=2.5,testo)=>{
  const a=Math.atan2(y2-y1,x2-x1),l=Math.hypot(x2-x1,y2-y1),t=Math.min(12,l*0.4);
  ctx.strokeStyle=ctx.fillStyle=col;ctx.lineWidth=lw;
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2-Math.cos(a)*t*0.8,y2-Math.sin(a)*t*0.8);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(a-0.4)*t,y2-Math.sin(a-0.4)*t);ctx.lineTo(x2-Math.cos(a+0.4)*t,y2-Math.sin(a+0.4)*t);ctx.closePath();ctx.fill();
  if(testo){ctx.font='bold 13px "B612",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(testo,x2+Math.cos(a)*14,y2+Math.sin(a)*14);}
};

/* ---------- sagoma del Cessna su canvas, vista di lato (muso a destra), centrata nel baricentro ----------
   s = pixel per metro; rot = angolo di beccheggio in radianti (positivo = muso su) */
FV.cessnaLato=(ctx,cx,cy,s,rot,col)=>{
  ctx.save();ctx.translate(cx,cy);ctx.rotate(-rot);ctx.scale(s,-s);   // y verso l'alto
  ctx.fillStyle=col||FV.colore('tenue');ctx.strokeStyle=col||FV.colore('tenue');ctx.lineWidth=1/s;
  // fusoliera (metri, x avanti, y su; baricentro in 0,0)
  ctx.beginPath();
  ctx.moveTo(2.55,-0.15);ctx.lineTo(2.35,0.35);ctx.lineTo(1.2,0.55);ctx.lineTo(0.55,1.05);ctx.lineTo(-0.9,1.05);
  ctx.lineTo(-1.5,0.55);ctx.lineTo(-4.6,0.35);ctx.lineTo(-5.4,0.3);ctx.lineTo(-5.5,0.05);ctx.lineTo(-4.6,-0.05);
  ctx.lineTo(-1.2,-0.55);ctx.lineTo(1.0,-0.62);ctx.lineTo(2.2,-0.45);ctx.closePath();ctx.fill();
  // deriva
  ctx.beginPath();ctx.moveTo(-4.3,0.35);ctx.lineTo(-5.25,1.75);ctx.lineTo(-5.75,1.75);ctx.lineTo(-5.5,0.3);ctx.closePath();ctx.fill();
  // ala (profilo, in alto) e montante
  ctx.beginPath();ctx.ellipse(-0.15,1.1,0.78,0.09,0,0,7);ctx.fill();
  ctx.beginPath();ctx.moveTo(0.1,-0.35);ctx.lineTo(-0.2,1.0);ctx.lineWidth=0.08;ctx.stroke();
  // carrello
  ctx.lineWidth=0.09;ctx.beginPath();ctx.moveTo(-0.1,-0.5);ctx.lineTo(-0.35,-1.3);ctx.moveTo(1.9,-0.45);ctx.lineTo(1.85,-1.3);ctx.stroke();
  ctx.beginPath();ctx.arc(-0.35,-1.28,0.2,0,7);ctx.arc(1.85,-1.3,0.17,0,7);ctx.fill();
  // elica
  ctx.fillRect(2.55,-1.0,0.07,2.0);
  ctx.restore();
};

document.addEventListener('DOMContentLoaded',()=>{impagina();formule();});
})();
