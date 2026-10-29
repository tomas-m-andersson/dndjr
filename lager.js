/* Bland monster och tärningar – Hjältarnas läger.
   Hit kommer hjältarna mellan äventyren. Guldet från grottkrypningarna hamnar i lägrets kassa
   och kan användas till att bygga ut lägret. Besegrade bossar hänger på troféväggen.
   Använder funktioner från index.html (el, spel, heroCanvas, sprCanvas …), som finns när sidan körs. */

// Utbyggnader: kostnad per nivå och vad de gör
const LAGERBYGGEN=[
 {id:"eld",namn:"Lägerelden",kost:[60,150,300],nytta:n=>"+"+n+" läkedryck"+(n>1?"er":"")+" med på varje grottkrypning",besk:"En större eld värmer bättre, och det blir tid att koka fler läkedrycker."},
 {id:"talt",namn:"Tälten",kost:[80,200],nytta:n=>"+"+(n*10)+" % XP efter varje strid",besk:"Utvilade hjältar lär sig mer av varje strid."},
 {id:"smedja",namn:"Smedjan",kost:[120,300],nytta:n=>"+"+n+" på anfall för alla hjältar",besk:"Smeden slipar svärd, yxor och pilspetsar."},
 {id:"ovning",namn:"Övningsplatsen",kost:[120,300],nytta:n=>"+"+n+" rustning för alla hjältar",besk:"Hjältarna övar på att parera och ducka mot en halmdocka."},
 {id:"skatt",namn:"Skattkammaren",kost:[100,250],nytta:n=>"+"+(n*20)+" % guld i skattkistor",besk:"Med en riktig skattkista lär sig hjältarna var guldet brukar gömmas."},
 {id:"trofe",namn:"Troféväggen",kost:[50],nytta:()=>"Besegrade bossar hänger på väggen",besk:"En vägg av plankor där bossarnas troféer får hänga."}];
const lagerNiva=id=>(spel.lager&&spel.lager.byggt&&spel.lager.byggt[id])||0;

/* ---------- Lägerbilden ----------
   En bred bild som man drar åt sidorna. Varje bygge har sitt eget område:
   övningsplatsen – tälten – lägerelden (mitten) – smedjan – skattkammaren – troféväggen. */
const LW=440,LH=72,LVIS=128,LFX=200,BAS=66;
const ZONER=[{id:"ovning",namn:"Övningsplatsen",x:40},{id:"talt",namn:"Tälten",x:115},{id:"eld",namn:"Lägerelden",x:LFX},{id:"smedja",namn:"Smedjan",x:285},{id:"skatt",namn:"Skattkammaren",x:345},{id:"trofe",namn:"Troféväggen",x:405}];
function lagerHjaltar(){return alla()} // alla hjältar, även egna, hänger i lägret
const HANG=["elden","berattar","korv","ovar","sover"];
function lagerText(hang,H){
 const n=H.map(h=>h.namn),en=n[Math.floor(Math.random()*n.length)]||"Någon",lista=typeof namnLista==="function"?namnLista(H):n.join(", ");
 const trofeer=Object.keys((spel.lager||{}).trofeer||{}),boss=trofeer.length?MONSTER[trofeer[Math.floor(Math.random()*trofeer.length)]].namn:null;
 const t={
  elden:[lista+" står runt elden och värmer händerna. Gnistorna dansar upp mot stjärnorna.","Det sprakar i elden. "+en+" lägger på en vedklabbe till."],
  berattar:[en+" berättar om "+(boss?"striden mot "+boss:"det farligaste äventyret hittills")+". De andra lyssnar med stora ögon.",en+" berättar en spökhistoria. Någon tittar sig nervöst över axeln."],
  korv:["Hela sällskapet grillar korv över elden. "+en+" bränner sin, som vanligt.","Det luktar grillat i hela lägret. "+en+" har redan ätit tre korvar."],
  ovar:[(lagerNiva("ovning")?"Borta på övningsplatsen ":"")+"övar två av hjältarna fäktning. De andra tittar på från elden.","Svärden klingar. "+en+" säger att det bara är på låtsas, men ingen tror på det."],
  sover:["Alla sover gott efter äventyret. Bara elden är vaken.","Det är mitt i natten. "+en+" snarkar så att löven darrar."]};
 const L=t[hang];return L[Math.floor(Math.random()*L.length)]}

function lagerBakgrund(){
 const c=document.createElement("canvas");c.width=LW;c.height=LH;const g=c.getContext("2d"),anim=[];
 const R=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))},P=(x,y,col)=>R(x,y,1,1,col);
 let s=7;const r=()=>{s=(s*9301+49297)%233280;return s/233280};
 const B=k=>lagerNiva(k);
 // himmel, stjärnor, måne, skog och mark över hela bredden
 for(let y=0;y<44;y++){const t=y/43;R(0,y,LW,1,`rgb(${Math.round(10+t*14)},${Math.round(16+t*22)},${Math.round(34+t*30)})`)}
 for(let i=0;i<160;i++)P(r()*LW,r()*30,r()>.7?"#ffffffcc":"#ffffff66");
 R(241,6,5,6,"#f3eedf");R(240,7,7,4,"#f3eedf");P(242,8,"#d8d2bf");
 for(let x=-4;x<LW+4;x+=5+Math.floor(r()*4)){const h=12+Math.floor(r()*14),base=44;for(let y=0;y<h;y++){const w=Math.round(y/h*5)+1;R(x-w,base-h+y,w*2+1,1,r()<.5?"#0f1e18":"#12241c")}}
 R(0,44,LW,LH-44,"#1d321f");for(let i=0;i<300;i++)P(r()*LW,45+r()*27,r()<.5?"#2a4a2c":"#16281a");
 // stigar mellan områdena
 for(let x=0;x<LW;x++){const y=63+Math.round(Math.sin(x/23)*1.5);R(x,y,1,3,"#33291c")}
 for(let y=48;y<LH;y++){const half=Math.sqrt(Math.max(0,1-((y-60)/12)**2))*42;R(LFX-half,y,half*2,1,"#3a3022")}
 const flamma=(x,y,str,t,f=1)=>{const h=Math.round((4+Math.sin(t/110+x)*1.5)*str);for(let j=0;j<h;j++){const w=Math.max(1,Math.round((1-j/h)*2*str));g2.fillStyle=j<h*.5?"#ff9a3d":"#ffd96a";g2.fillRect(Math.round(x-w/2+Math.sin(t/80+j)*.6*f),y-j,w,1)}};
 let g2=g; // animationerna ritar på den riktiga bilden (sätts om i ritaLager)
 const sken=(x,y,rad,col,a)=>anim.push((gg,t)=>{const gr=gg.createRadialGradient(x,y,0,x,y,rad*(1+Math.sin(t/170+x)*.05));gr.addColorStop(0,col.replace("A",a));gr.addColorStop(1,col.replace("A","0"));gg.globalCompositeOperation="lighter";gg.fillStyle=gr;gg.fillRect(x-rad*1.1,y-rad*1.1,rad*2.2,rad*2.2);gg.globalCompositeOperation="source-over"});
 const fackla=(x,y)=>{R(x,y,1,8,"#6b4423");R(x-1,y+2,3,1,"#3a3a40");anim.push((gg,t)=>{g2=gg;flamma(x+.5,y-1,.8,t)});sken(x,y-3,14,"rgba(255,160,70,A)",.3)};
 // tom tomt: pinnar, rep och en skylt
 const tomt=(x0,x1)=>{for(const x of[x0,x1]){R(x,54,1,10,"#6b4423");P(x,53,"#8a5a2b")}for(let x=x0;x<=x1;x++)P(x,56+Math.round(Math.sin((x-x0)/(x1-x0)*Math.PI)*2),"#c8b080");
  const sx=(x0+x1)/2;R(sx,52,1,12,"#5a3a22");R(sx-6,46,13,8,"#8a6a3a");R(sx-6,46,13,1,"#a8875a");R(sx-6,53,13,1,"#5a3a22");
  R(sx-1,47,3,1,"#2a1e16");P(sx+1,48,"#2a1e16");P(sx,49,"#2a1e16");P(sx,51,"#2a1e16")};
 // ===== Övningsplatsen =====
 if(B("ovning")){const docka=x=>{R(x,46,1,18,"#6b4423");R(x-5,50,11,1,"#6b4423");R(x-3,41,7,6,"#d8b860");R(x-3,47,7,10,"#c8a850");for(let y=48;y<57;y+=3)R(x-3,y,7,1,"#a8883a");
   P(x-1,43,"#2a1e16");P(x+1,43,"#2a1e16");R(x-1,45,3,1,"#8a6a2a");R(x-4,51,2,1,"#c0392b");P(x+2,52,"#c0392b")};
  docka(26);
  // vapenställ
  R(44,48,16,1,"#6b4423");R(44,58,16,1,"#6b4423");R(44,48,1,16,"#5a3a22");R(59,48,1,16,"#5a3a22");
  R(47,40,1,18,"#c9d6e0");R(46,52,3,1,"#c9a227");R(51,38,1,20,"#8a6a3a");R(50,37,3,2,"#c9d6e0");R(55,42,1,16,"#c9d6e0");R(54,50,3,1,"#c9a227");R(56,42,2,3,"#9aa3ad");
  if(B("ovning")>=2){docka(10);
   // måltavla med pilar
   R(66,54,1,10,"#5a3a22");R(74,54,1,10,"#5a3a22");const tx=70,ty=48;for(let yy=-6;yy<=6;yy++)for(let xx=-6;xx<=6;xx++){const d=Math.hypot(xx,yy);if(d<=6)P(tx+xx,ty+yy,d<1.5?"#f2c14e":d<3.2?"#c0392b":d<4.8?"#efe6d0":"#c0392b")}
   for(const [ax,ay] of[[-2,-1],[3,2],[1,-3]]){R(tx+ax,ty+ay,5,1,"#8a6a3a");P(tx+ax+4,ty+ay-1,"#efe6d0");P(tx+ax+4,ty+ay+1,"#efe6d0")}
   // staket
   for(let x=2;x<80;x+=6){R(x,58,1,6,"#6b4423")}R(2,59,78,1,"#7a5232")}
 }else tomt(16,64);
 // ===== Tälten =====
 const talt=(x,y,w,col,mork)=>{const hh=Math.floor(w/2);for(let i=0;i<hh;i++)R(x+i,y-i,w-2*i,1,i%3?col:mork);
  for(let i=0;i<hh-2;i++)R(x+hh-1-Math.floor(i/2),y-i,2+i%2,1,"#1a120c");R(x+hh,y-hh-3,1,4,"#6b4423");R(x+hh+1,y-hh-3,4,2,"#c0392b");
  R(x-2,y,1,1,"#6b4423");R(x+w+1,y,1,1,"#6b4423");P(x-1,y-1,"#c8b080");P(x+w,y-1,"#c8b080")};
 if(B("talt")){talt(92,60,30,"#8a6a3a","#6a4e2a");R(100,61,12,3,"#5a6a8a");R(100,61,3,3,"#8a3a2a");
  if(B("talt")>=2){talt(126,57,22,"#5a6a8a","#3e4a62");
   // klädstreck med tvätt
   R(84,40,1,24,"#5a3a22");R(152,42,1,22,"#5a3a22");for(let x=85;x<152;x++)P(x,41+Math.round(Math.sin((x-85)/67*Math.PI)*3),"#c8b080");
   [[96,"#c0392b"],[106,"#2b6fb8"],[118,"#f2c14e"],[132,"#3a8a4a"]].forEach(([x,col])=>{const y=42+Math.round(Math.sin((x-85)/67*Math.PI)*3);R(x,y,5,6,col);R(x+1,y+6,3,1,col)});
   // lykta
   R(150,44,4,5,"#2a2a2a");R(151,45,2,3,"#ffd96a");sken(152,47,12,"rgba(255,217,106,A)",.35)}
 }else tomt(92,140);
 // ===== Lägerelden: vedtrave och (nivå 3) en kittel =====
 for(let i=0;i<4;i++)R(LFX-40,58-i*2,12-i*2+0,2,i%2?"#6b4423":"#5a3a22");for(let i=0;i<4;i++)P(LFX-40+i*3,58,"#8a5a2b");
 if(B("eld")>=3){const kx=LFX+24;R(kx-5,56,11,7,"#2a2a30");R(kx-6,56,13,1,"#4a4a52");R(kx-4,57,9,1,"#5a7a3a");anim.push((gg,t)=>{for(let i=0;i<3;i++){const p=((t/900+i/3)%1);gg.globalAlpha=(1-p)*.5;gg.fillStyle="#cfd6e0";gg.fillRect(Math.round(kx-2+i*2+Math.sin(t/300+i)*2),Math.round(54-p*14),2,2)}gg.globalAlpha=1})}
 // ===== Smedjan =====
 if(B("smedja")){
  if(B("smedja")>=2){R(262,26,56,3,"#5a3a22");for(let x=262;x<318;x+=4)R(x,23+Math.abs(x-290)/14,4,3,"#7a4a2a");R(264,29,2,35,"#5a3a22");R(314,29,2,35,"#5a3a22");
   // skorsten med rök
   R(300,10,8,14,"#5a5a62");R(299,9,10,2,"#6a6a72");anim.push((gg,t)=>{for(let i=0;i<4;i++){const p=((t/1400+i/4)%1);gg.globalAlpha=(1-p)*.4;gg.fillStyle="#9aa0aa";gg.fillRect(Math.round(303+Math.sin(t/500+i)*3+p*6),Math.round(8-p*10),3+Math.round(p*3),2)}gg.globalAlpha=1});
   // slipsten och verktyg
   for(let yy=-4;yy<=4;yy++)for(let xx=-4;xx<=4;xx++)if(xx*xx+yy*yy<=16)P(272+xx,52+yy,xx*xx+yy*yy<4?"#6a6a72":"#8a8a94");R(271,56,3,8,"#5a3a22");
   R(268,32,40,1,"#3a2a1a");for(const [x,h,col] of[[272,8,"#9aa3ad"],[278,6,"#6b4423"],[284,9,"#9aa3ad"],[292,7,"#6b4423"]])R(x,33,1,h,col)}
  // ässja med glöd
  R(296,48,18,16,"#5a5a62");R(296,48,18,1,"#7a7a84");R(299,52,12,5,"#1a0c08");anim.push((gg,t)=>{for(let i=0;i<12;i++){const fl=(Math.sin(t/120+i*1.7)+1)/2;gg.fillStyle=fl>.6?"#ffd96a":fl>.3?"#ff8a2b":"#c0392b";gg.fillRect(299+i,55-Math.round(fl*2),1,2+Math.round(fl*2))}});
  sken(305,54,18,"rgba(255,140,50,A)",.45);
  // städ
  R(280,54,14,4,"#4a4a52");R(278,54,4,2,"#4a4a52");R(283,58,8,2,"#3a3a40");R(285,60,4,4,"#2e2e34");R(282,63,10,1,"#2e2e34");R(280,54,14,1,"#8a8a94");
  R(287,50,1,4,"#6b4423");R(285,49,5,2,"#6a6a72"); // hammare
  anim.push((gg,t)=>{if(Math.floor(t/500)%3)return;for(let i=0;i<5;i++){const a=i*1.2+t/100;gg.fillStyle=i%2?"#ffd96a":"#ff8a2b";gg.fillRect(Math.round(287+Math.cos(a)*(3+i)),Math.round(52-Math.abs(Math.sin(a))*(2+i)),1,1)}});
 }else tomt(262,318);
 // ===== Skattkammaren =====
 if(B("skatt")){const kista=(x,y,stor)=>{const w=stor?16:12,h=stor?8:7;R(x,y,w,h,"#8a5a2b");R(x,y,w,1,"#3a2a1a");R(x,y+3,w,1,"#3a2a1a");R(x,y,1,h,"#3a2a1a");R(x+w-1,y,1,h,"#3a2a1a");R(x+w/2-1,y+2,2,3,"#f2c14e");
   R(x,y-5,w,4,"#6b4423");R(x+1,y-4,w-2,2,"#8a5a2b");R(x+1,y-1,w-2,2,"#f2c14e");for(let i=0;i<4;i++)P(x+2+r()*(w-4),y-1,"#fff3b0")};
  kista(337,56,true);
  for(let y=0;y<6;y++)R(326+y,63-y,10-2*y,1,y%2?"#d4a63a":"#f2c14e"); // guldhög
  if(B("skatt")>=2){kista(356,57,false);for(let y=0;y<9;y++)R(344+y*1.2,63-y,18-y*2.4,1,y%2?"#d4a63a":"#f2c14e");
   // ädelstenar och en krona
   [[330,61,"#e04040"],[350,62,"#4080e0"],[362,63,"#40c060"],[346,56,"#c060e0"]].forEach(([x,y,col])=>{R(x,y,2,2,col);P(x,y,"#ffffff")});
   R(348,49,7,3,"#f2c14e");P(348,48,"#f2c14e");P(351,47,"#f2c14e");P(354,48,"#f2c14e");P(351,50,"#e04040")}
  anim.push((gg,t)=>{for(let i=0;i<6;i++){const ph=(t/260+i*1.9)%6;if(ph>1)continue;const x=330+((i*37)%36),y=52+((i*13)%11);gg.fillStyle="#ffffff";gg.fillRect(x,y,1,1);if(ph<.5){gg.fillRect(x-1,y,1,1);gg.fillRect(x+1,y,1,1);gg.fillRect(x,y-1,1,1);gg.fillRect(x,y+1,1,1)}}});
  sken(345,58,22,"rgba(242,193,78,A)",.25);
 }else tomt(326,366);
 // ===== Troféväggen =====
 if(B("trofe")){R(374,10,62,38,"#5a3a22");for(let y=10;y<48;y+=5)R(374,y,62,1,"#3e2716");R(376,48,3,16,"#3e2716");R(431,48,3,16,"#3e2716");R(372,8,66,3,"#7a5232");
  for(let i=0;i<8;i++){const x=378+(i%4)*14,y=14+Math.floor(i/4)*16;R(x,y,12,13,"#8a6a3a");R(x+1,y+1,10,11,"#2e1c10")}
  fackla(370,30);fackla(440,30)}
 else tomt(380,430);
 return{c,anim}}

// Troféerna: bossarnas huvuden på sköldar (upp till åtta)
function ritaTrofeer(g){
 if(!lagerNiva("trofe"))return;
 const T=Object.entries((spel.lager||{}).trofeer||{}).sort((a,b)=>MONSTER[b[0]].xp-MONSTER[a[0]].xp).slice(0,8);
 T.forEach(([k],i)=>{const x=379+(i%4)*14,y=15+Math.floor(i/4)*16,c=sprCanvas(k);if(!c)return;
  const sk=Math.min(10/c.width,1.5),w=c.width*sk,h=Math.min(c.height*sk,11);
  g.save();g.beginPath();g.rect(x,y,10,11);g.clip();g.drawImage(c,0,0,c.width,h/sk,x+5-w/2,y,w,h);g.restore()})}

function ritaElden(g,t){
 const n=lagerNiva("eld"),x=LFX,y=60,stor=1+n*.6;
 g.fillStyle="#5a3a22";g.fillRect(x-6-n,y+1,12+2*n,2);g.fillStyle="#3e2716";g.fillRect(x-4-n,y+3,8+2*n,1);
 g.fillStyle="#6a6e78";for(let i=-3;i<=3;i++)g.fillRect(x+i*(3+n*.6)-1,y+3+Math.abs(i)%2,2,2);
 const fl=(dx,h,col)=>{for(let j=0;j<h;j++){const w=Math.max(1,Math.round((1-j/h)*(2.2*stor)));g.fillStyle=col;g.fillRect(Math.round(x+dx-w/2+Math.sin(t/90+j+dx)*.8),y-j,w,1)}};
 const tt=t/120;fl(-2*stor,Math.round((6+Math.sin(tt*1.3)*2)*stor),"#e0603a");fl(2*stor,Math.round((6+Math.cos(tt*1.1)*2)*stor),"#e0603a");
 fl(0,Math.round((9+Math.sin(tt*1.7)*2)*stor),"#ff9a3d");fl(0,Math.round((5+Math.sin(tt*2.3))*stor),"#ffd96a");
 for(let i=0;i<3+n*2;i++){const p=((t/18+i*37)%40)/40;g.fillStyle=p<.5?"#ffd96a":"#ff8a3d";g.globalAlpha=1-p;g.fillRect(Math.round(x+Math.sin(i*2.1+t/400)*6*p),Math.round(y-8*stor-p*24),1,1)}
 g.globalAlpha=1;
 const gr=g.createRadialGradient(x,y-4,0,x,y-4,30+n*8+Math.sin(t/150)*2);gr.addColorStop(0,"rgba(255,150,60,.35)");gr.addColorStop(1,"rgba(255,150,60,0)");
 g.globalCompositeOperation="lighter";g.fillStyle=gr;g.fillRect(x-80,0,160,LH);g.globalCompositeOperation="source-over"}

// Var står eller sitter hjältarna i varje häng? [x, tittar åt vänster?, sitter?]  (x räknas från elden)
// Var står eller sitter hjältarna i varje häng? [x, tittar åt vänster?, sitter?, fötternas höjd]
// Fler hjältar ställer sig i rader bakom varandra, så att alla får plats runt elden.
function lagerPlatser(hang,n){
 const steg=hang==="sover"?27:12,narmast=hang==="sover"?19:14,perSida=hang==="sover"?Math.max(2,Math.ceil(n/4)):3;
 const plats=k=>{const rad=Math.floor(k/(perSida*2)),i=k%(perSida*2),sida=i%2?1:-1,nr=Math.floor(i/2),forskj=rad%2?steg/2:0;
  return[LFX+sida*(narmast+forskj+nr*steg),sida>0?1:0,0,BAS-rad*(hang==="sover"?7:5)]};
 if(hang==="berattar"){const ber=[LFX+26,1,0,BAS];const P=[ber];for(let k=0;P.length<n;k++){const p=plats(k);if(Math.abs(p[0]-ber[0])<8&&p[3]===BAS)continue;P.push([p[0],p[0]>ber[0]?1:0,1,p[3]])}return P}
 if(hang==="ovar"){const o=lagerNiva("ovning")?[[34,0,0,BAS],[48,1,0,BAS]]:[[LFX-44,0,0,BAS],[LFX-30,1,0,BAS]];return Array.from({length:n},(_,i)=>i<2?o[i]:(p=>[p[0],p[1],1,p[3]])(plats(i-2+(i-2>=0&&!lagerNiva("ovning")?0:0))))}
 return Array.from({length:n},(_,i)=>{const p=plats(i);if(hang==="korv")p[2]=1;return p});
}
function ritaLager(cv,bg,hang,H,t,anim){
 const g=cv.getContext("2d");g.imageSmoothingEnabled=false;g.drawImage(bg.c,0,0);ritaTrofeer(g);bg.anim.forEach(f=>f(g,t));
 const pos=lagerPlatser(hang,H.length),ordning=H.map((h,i)=>i).sort((a,b)=>pos[a][3]-pos[b][3]);
 if(hang==="sover"){g.fillStyle="rgba(5,8,20,.35)";g.fillRect(0,0,LW,LH)}
 ritaElden(g,t);
 ordning.forEach(i=>{const h=H[i],c=heroCanvas(h),L=anim?livTid(t,i):{blink:false,titt:0,upp:0},[x,vand,sitt,bas]=pos[i],katt=h.folk==="katt";
  if(hang==="sover"){ // ligger ner med stängda ögon
   const tmp=document.createElement("canvas");tmp.width=c.width;tmp.height=c.height;ritaLevande(tmp.getContext("2d"),c,heroOgon(h,c),0,0,{blink:true});
   const y=bas-3;g.save();g.translate(x,y);if(katt){g.drawImage(tmp,-c.width/2,-c.height+3)}else{g.rotate(vand?Math.PI/2:-Math.PI/2);g.drawImage(tmp,-c.width/2,-c.height/2-4)}g.restore();
   const z=((t/700+i*.37)%1);g.globalAlpha=1-z;g.fillStyle="#cfe8ff";const zx=x+(vand?-6:4)+z*4,zy=y-12-z*10;g.fillRect(zx,zy,3,1);g.fillRect(zx+2,zy+1,1,1);g.fillRect(zx,zy+2,3,1);g.globalAlpha=1;return}
  const sitter=sitt&&!katt;let y=bas-c.height+L.upp+(sitter?6:0);
  ritaLevande(g,c,heroOgon(h,c),Math.round(x-c.width/2),y,{flip:!!vand,blink:L.blink,titt:L.titt});
  if(sitter){g.fillStyle="#5a3a22";g.fillRect(Math.round(x-7),bas-3,14,4);g.fillStyle="#7a5232";g.fillRect(Math.round(x-7),bas-3,14,1)}
  if(hang==="korv"&&!katt){const hx=x+(vand?-4:4),hy=y+15,ex=LFX+(vand?5:-5),ey=51;g.fillStyle="#b08a5a";const n=14;for(let k=0;k<=n;k++)g.fillRect(Math.round(hx+(ex-hx)*k/n),Math.round(hy+(ey-hy)*k/n),1,1);g.fillStyle="#a0522d";g.fillRect(Math.round(ex)-1,ey-1,3,2);g.fillStyle="#6a2a14";g.fillRect(Math.round(ex),ey-1,1,1)}
  if(hang==="berattar"&&i===0&&Math.floor(t/600)%2){g.fillStyle="#f3eedf";g.fillRect(x-14,y-7,9,5);g.fillRect(x-6,y-2,1,1);g.fillStyle="#15111a";g.fillRect(x-12,y-5,1,1);g.fillRect(x-10,y-5,1,1);g.fillRect(x-8,y-5,1,1)}
  if(hang==="ovar"&&i===1&&Math.floor(t/350)%2){g.fillStyle="#fff3b0";const mx=(pos[0][0]+pos[1][0])/2;g.fillRect(Math.round(mx),y+9,1,1);g.fillRect(Math.round(mx)-1,y+8,1,1);g.fillRect(Math.round(mx)+1,y+8,1,1)}
 })}

/* ---------- Sidan ---------- */
let lagerHang=null,lagerFokus=null; // lagerFokus: området som visas efter ett bygge
function lagerVy(){
 view="lager";lage=null;tyst();app.replaceChildren();document.getElementById("party").hidden=true;
 spel.lager=spel.lager||{byggt:{},trofeer:{}};
 const H=lagerHjaltar();if(!lagerHang)lagerHang=HANG[Math.floor(Math.random()*HANG.length)];
 app.append(el("div",{class:"topbar"},el("button",{class:"btn ghost small",onclick:()=>{lagerHang=null;start()}},"← Start"),el("span",{class:"purse"},spel.guld+" guld i kassan")));
 // den levande bilden: en bred remsa som man drar åt sidorna
 const cv=document.createElement("canvas");cv.className="px lagerduk";cv.width=LW;cv.height=LH;cv.style.width=(LW/LVIS*100)+"%";const bg=lagerBakgrund();
 const still=matchMedia("(prefers-reduced-motion: reduce)").matches;ritaLager(cv,bg,lagerHang,H,performance.now(),!still);
 if(!still){const id=setInterval(()=>{if(!cv.isConnected){clearInterval(id);return}ritaLager(cv,bg,lagerHang,H,performance.now(),true)},110)}
 const remsa=el("div",{class:"lagerscroll",tabindex:"0","aria-label":"Lägret. Dra åt sidorna för att se hela lägret."},cv);
 const till=(x,mjukt)=>{remsa.scrollTo({left:(x-LVIS/2)/LW*remsa.scrollWidth,behavior:mjukt&&!still?"smooth":"auto"})};
 const pil=(dir,txt)=>el("button",{class:"lagerpil "+(dir<0?"v":"h"),"aria-label":txt,onclick:()=>remsa.scrollBy({left:dir*remsa.clientWidth*.8,behavior:still?"auto":"smooth"})},dir<0?"‹":"›");
 const text=el("p",{class:"lagertext"},H.length?lagerText(lagerHang,H):"Lägret är tomt. Skapa eller välj hjältar först.");
 app.append(el("div",{class:"stephead"},el("small",{},"Mellan äventyren"),el("h2",{},"Hjältarnas läger")),
  el("div",{class:"tvbig lagertv"},remsa,pil(-1,"Titta åt vänster"),pil(1,"Titta åt höger")),
  el("div",{class:"pills lagerzoner"},ZONER.map(Z=>el("button",{class:"pill"+(lagerNiva(Z.id)||Z.id==="eld"?"":" tom"),onclick:()=>till(Z.x,true)},Z.namn+(Z.id!=="eld"&&!lagerNiva(Z.id)?" (ej byggt)":"")))),
  el("div",{class:"lagerrad"},text,el("button",{class:"btn ghost small",onclick:()=>{let n;do n=HANG[Math.floor(Math.random()*HANG.length)];while(n===lagerHang);lagerHang=n;const y=scrollY,x=remsa.scrollLeft;lagerVy();scrollTo(0,y);const r2=app.querySelector(".lagerscroll");if(r2)r2.scrollLeft=x}},"Nytt häng")));
 const fokus=lagerFokus??LFX;lagerFokus=null;requestAnimationFrame(()=>till(fokus,false));
 // kassan
 app.append(el("div",{class:"bp-guld"},pixIkon("guld","stor"),el("div",{},el("b",{},spel.guld+" guld i lägrets kassa"),el("small",{},"Guldet ni hittar i grottkrypningarna hamnar här när ni kommer hem. Faller sällskapet räddar ni hälften."))));
 // bygg ut lägret
 app.append(el("div",{class:"section-head"},el("h2",{},"Bygg ut lägret"),el("span",{},"Varje bygge gör hjältarna starkare")));
 app.append(el("div",{class:"bygggrid"},LAGERBYGGEN.map(B=>{const n=lagerNiva(B.id),max=B.kost.length,kost=B.kost[n],klar=n>=max;
  return el("div",{class:"bygge"+(n?" byggt":"")},el("div",{class:"bygge-topp"},el("b",{},B.namn),el("span",{class:"nivapips","aria-label":"Nivå "+n+" av "+max},Array.from({length:max},(_,i)=>el("i",{class:i<n?"pa":""})))),
   el("small",{},B.besk),n?el("span",{class:"bygge-nu"},"Nu: "+B.nytta(n)):null,
   klar?el("span",{class:"bygge-klar"},"Färdigbyggt ✓"):el("div",{class:"bygge-kop"},el("span",{},(n?"Nästa: ":"")+B.nytta(n+1)),
    el("button",{class:"btn small"+(spel.guld<kost?" ghost":""),disabled:spel.guld<kost,onclick:()=>{spel.guld-=kost;spel.lager.byggt[B.id]=n+1;sparaSpel();flash(B.namn+" är "+(n?"uppgraderad":"byggd")+"! Titta i bilden.");lagerFokus=(ZONER.find(Z=>Z.id===B.id)||{}).x;lagerVy()}},
     pixIkon("guld"),(n?"Uppgradera":"Bygg")+" · "+kost+" guld")))})));
 // troféväggen
 const T=Object.entries(spel.lager.trofeer||{}).sort((a,b)=>MONSTER[b[0]].xp-MONSTER[a[0]].xp);
 app.append(el("div",{class:"section-head"},el("h2",{},"Troféväggen"),el("span",{},T.length+" bossar besegrade")));
 app.append(T.length?el("div",{class:"mgrid"},T.map(([k,antal])=>el("button",{class:"mcard",onclick:()=>monsterInfo(k)},el("div",{class:"tv"},monsterBild(k)),el("b",{},MONSTER[k].namn),el("span",{class:"fara f7"},"Besegrad "+antal+" "+(antal===1?"gång":"gånger")))))
  :el("p",{class:"note"},"Inga troféer än. Besegra bossen i en grottkrypning så hamnar den här"+(lagerNiva("trofe")?" och på troféväggen i lägret.":". Bygg Troféväggen så hänger den i lägret också.")));
 // vapen
 const allaSp=Object.entries(VAPEN).flatMap(([k,L])=>L.filter(w=>w.sp).map(w=>({k,w}))),upp=allaSp.filter(x=>(spel.upplasta||[]).includes(x.w.id));
 app.append(el("div",{class:"section-head"},el("h2",{},"Vapenstället"),el("span",{},upp.length+" av "+allaSp.length+" specialvapen")));
 app.append(el("div",{class:"bp-upp"},allaSp.map(({k,w})=>{const har=upp.some(x=>x.w===w);
  return el("div",{class:"bp-sak"+(har?"":" last")},har?ikonEl(w,"small"):el("div",{class:"wicon small lastikon","aria-hidden":"true"},"?"),
   el("div",{},el("b",{},har?w.namn:"Okänt vapen"),el("small",{},har?(KLASS[k]?KLASS[k].n:k)+" · "+w.skada+" skada":"Besegra en boss för att hitta det")))})));
 // skatter
 const utr=Object.entries(spel.utr||{}).filter(([id,u])=>byId(id)&&(u.wb||u.acb));
 const saker={};(spel.saker||[]).forEach(x=>saker[x]=(saker[x]||0)+1);
 app.append(el("div",{class:"section-head"},el("h2",{},"Skatterna"),el("span",{},"Magiska föremål och saker")));
 const sk=[...utr.map(([id,u])=>el("div",{class:"bp-sak"},el("div",{},el("b",{},byId(id).namn),el("small",{},[u.wb?"Magiskt vapen +"+u.wb:null,u.acb?"Skyddsring +"+u.acb:null].filter(Boolean).join(" · "))))),
  ...Object.entries(saker).map(([k,v])=>el("div",{class:"bp-sak"},el("div",{},el("b",{},k+(v>1?" × "+v:"")),el("small",{},"I lägrets förråd"))))];
 app.append(sk.length?el("div",{class:"bp-upp"},sk):el("p",{class:"note"},"Inga skatter än. Magiska vapen och skyddsringar hittar ni i skattkistor."));
 window.scrollTo(0,0);
}
// Rutan på startsidan: mitten av lägret, runt elden
function lagerRuta(){
 const full=document.createElement("canvas");full.width=LW;full.height=LH;const H=lagerHjaltar();
 ritaLager(full,lagerBakgrund(),"elden",H,1000,false);
 const cv=document.createElement("canvas");cv.className="px";cv.width=LVIS;cv.height=LH;cv.getContext("2d").drawImage(full,LFX-LVIS/2,0,LVIS,LH,0,0,LVIS,LH);
 const byggda=LAGERBYGGEN.filter(B=>lagerNiva(B.id)).length;
 return el("button",{class:"bigtile",onclick:()=>{lagerHang=null;lagerVy()}},el("div",{class:"tvbig"},cv),
  el("div",{class:"bigtile-txt"},el("h2",{},"Hjältarnas läger"),el("p",{},spel.guld+" guld i kassan · "+byggda+" av "+LAGERBYGGEN.length+" byggen"),
   el("small",{},"Bygg ut lägret, se troféer, vapen och skatter, och häng runt elden.")));
}
