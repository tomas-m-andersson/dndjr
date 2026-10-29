/* Tärningsriket – Hjältarnas läger.
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

/* ---------- Lägerbilden ---------- */
const LW=128,LH=72;
function lagerHjaltar(){return alla().slice(0,5)}
const HANG=["elden","berattar","korv","ovar","sover"];
function lagerText(hang,H){
 const n=H.map(h=>h.namn),en=n[Math.floor(Math.random()*n.length)]||"Någon",lista=typeof namnLista==="function"?namnLista(H):n.join(", ");
 const trofeer=Object.keys((spel.lager||{}).trofeer||{}),boss=trofeer.length?MONSTER[trofeer[Math.floor(Math.random()*trofeer.length)]].namn:null;
 const t={
  elden:[lista+" står runt elden och värmer händerna. Gnistorna dansar upp mot stjärnorna.","Det sprakar i elden. "+en+" lägger på en vedklabbe till."],
  berattar:[en+" berättar om "+(boss?"striden mot "+boss:"det farligaste äventyret hittills")+". De andra lyssnar med stora ögon.",en+" berättar en spökhistoria. Någon tittar sig nervöst över axeln."],
  korv:["Hela sällskapet grillar korv över elden. "+en+" bränner sin, som vanligt.","Det luktar grillat i hela lägret. "+en+" har redan ätit tre korvar."],
  ovar:[en+" övar svärdsfäktning medan de andra tittar på från elden.","Två av hjältarna tränar vid halmdockan. Den har inte en chans."],
  sover:["Alla sover gott efter äventyret. Bara elden är vaken.","Det är mitt i natten. "+en+" snarkar så att löven darrar."]};
 const L=t[hang];return L[Math.floor(Math.random()*L.length)]}

function lagerBakgrund(){
 const c=document.createElement("canvas");c.width=LW;c.height=LH;const g=c.getContext("2d");
 const R=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
 let s=7;const r=()=>{s=(s*9301+49297)%233280;return s/233280};
 for(let y=0;y<44;y++){const t=y/43;R(0,y,LW,1,`rgb(${Math.round(10+t*14)},${Math.round(16+t*22)},${Math.round(34+t*30)})`)}
 for(let i=0;i<50;i++)R(r()*LW,r()*30,1,1,r()>.7?"#ffffffcc":"#ffffff66");
 R(104,6,5,6,"#f3eedf");R(103,7,7,4,"#f3eedf");R(105,8,1,1,"#d8d2bf");
 // trädkant
 for(let x=-4;x<LW+4;x+=5+Math.floor(r()*4)){const h=12+Math.floor(r()*14),base=44;for(let y=0;y<h;y++){const w=Math.round(y/h*5)+1;R(x-w,base-h+y,w*2+1,1,r()<.5?"#0f1e18":"#12241c")}}
 // mark och gläntan
 R(0,44,LW,LH-44,"#1d321f");for(let i=0;i<90;i++)R(r()*LW,45+r()*27,1,1,r()<.5?"#2a4a2c":"#16281a");
 for(let y=48;y<LH;y++){const half=Math.sqrt(Math.max(0,1-((y-60)/12)**2))*40;R(64-half,y,half*2,1,"#3a3022")}
 for(let i=0;i<30;i++){const a=r()*Math.PI*2,rr=r()*36;R(64+Math.cos(a)*rr,60+Math.sin(a)*rr*.3,2,1,"#4a3e2c")}
 const B=k=>lagerNiva(k);
 // tält
 const talt=(x,y,w,col,mork)=>{for(let i=0;i<w/2;i++)R(x+i,y-i,w-2*i,1,i%3?col:mork);R(x+w/2-1,y-Math.floor(w/2)+2,2,Math.floor(w/2)-2,"#1a120c");R(x+w/2,y-w/2-2,1,3,"#6b4423");R(x+w/2+1,y-w/2-2,3,1,"#c0392b")};
 if(B("talt")>=1)talt(14,46,18,"#8a6a3a","#6a4e2a");
 if(B("talt")>=2)talt(34,44,14,"#5a6a8a","#3e4a62");
 // troféväggen
 if(B("trofe")){R(90,12,36,30,"#5a3a22");for(let y=12;y<42;y+=5)R(90,y,36,1,"#3e2716");R(91,42,2,8,"#3e2716");R(123,42,2,8,"#3e2716");R(88,11,40,2,"#7a5232")}
 // smedjan
 if(B("smedja")){R(104,52,14,4,"#4a4a52");R(106,56,10,2,"#3a3a40");R(108,58,6,6,"#2e2e34");R(103,51,16,1,"#7a7a84");R(120,44,6,14,"#5a4a44");R(121,45,4,4,"#ff8a2b");R(118,40,3,4,"#2a2a2a")}
 // övningsplatsen: halmdocka
 if(B("ovning")){const x=7;R(x,46,1,16,"#6b4423");R(x-4,49,9,1,"#6b4423");R(x-2,42,5,5,"#d8b860");R(x-2,47,5,8,"#c8a850");R(x-1,44,1,1,"#2a1e16");R(x+1,44,1,1,"#2a1e16");R(x-3,50,2,1,"#c0392b")}
 // skattkammaren: kista med guld
 if(B("skatt")){const x=74,y=40;R(x,y,12,7,"#8a5a2b");R(x,y,12,1,"#3a2a1a");R(x,y+3,12,1,"#3a2a1a");R(x+5,y+2,2,3,"#f2c14e");
  R(x+1,y-3,10,3,"#f2c14e");for(let i=0;i<6;i++)R(x+1+r()*10,y-4+r()*3,1,1,"#fff3b0");if(B("skatt")>=2){R(x+14,y+3,6,3,"#f2c14e");R(x+15,y+2,4,1,"#f2c14e");R(x+16,y+1,2,1,"#fff3b0")}}
 return c}

// Troféerna: bossarnas huvuden på sköldar
function ritaTrofeer(g){
 if(!lagerNiva("trofe"))return;
 const T=Object.entries((spel.lager||{}).trofeer||{}).sort((a,b)=>MONSTER[b[0]].xp-MONSTER[a[0]].xp).slice(0,6);
 T.forEach(([k],i)=>{const x=93+(i%3)*11,y=15+Math.floor(i/3)*13;g.fillStyle="#8a6a3a";g.fillRect(x-1,y-1,10,11);g.fillStyle="#3e2716";g.fillRect(x,y,8,9);
  const c=sprCanvas(k);if(!c)return;const sk=Math.min(8/c.width,1.6),w=c.width*sk,h=Math.min(c.height*sk,9);
  g.save();g.beginPath();g.rect(x,y,8,9);g.clip();g.drawImage(c,0,0,c.width,h/sk,x+4-w/2,y,w,h);g.restore()})}

function ritaElden(g,t){
 const n=lagerNiva("eld"),x=64,y=60,stor=1+n*.6;
 g.fillStyle="#5a3a22";g.fillRect(x-6-n,y+1,12+2*n,2);g.fillStyle="#3e2716";g.fillRect(x-4-n,y+3,8+2*n,1);
 for(let i=0;i<5;i++)g.fillRect(x-7-n+i*(3+n*.5),y+3,2,1);
 // sten runt elden
 g.fillStyle="#6a6e78";for(let i=-3;i<=3;i++)g.fillRect(x+i*(3+n*.6)-1,y+3+Math.abs(i)%2,2,2);
 // flammor som fladdrar
 const fl=(dx,h,col)=>{for(let j=0;j<h;j++){const w=Math.max(1,Math.round((1-j/h)*(2.2*stor)));g.fillStyle=col;g.fillRect(Math.round(x+dx-w/2+Math.sin(t/90+j+dx)*.8),y-j,w,1)}};
 const tt=t/120;fl(-2*stor,Math.round((6+Math.sin(tt*1.3)*2)*stor),"#e0603a");fl(2*stor,Math.round((6+Math.cos(tt*1.1)*2)*stor),"#e0603a");
 fl(0,Math.round((9+Math.sin(tt*1.7)*2)*stor),"#ff9a3d");fl(0,Math.round((5+Math.sin(tt*2.3))*stor),"#ffd96a");
 // gnistor
 for(let i=0;i<3+n*2;i++){const p=((t/18+i*37)%40)/40;g.fillStyle=p<.5?"#ffd96a":"#ff8a3d";g.globalAlpha=1-p;g.fillRect(Math.round(x+Math.sin(i*2.1+t/400)*6*p),Math.round(y-8*stor-p*24),1,1)}
 g.globalAlpha=1;
 // eldsken
 const gr=g.createRadialGradient(x,y-4,0,x,y-4,30+n*8+Math.sin(t/150)*2);gr.addColorStop(0,"rgba(255,150,60,.35)");gr.addColorStop(1,"rgba(255,150,60,0)");
 g.globalCompositeOperation="lighter";g.fillStyle=gr;g.fillRect(0,0,LW,LH);g.globalCompositeOperation="source-over"}

// Var står eller sitter hjältarna i varje häng? [x, tittar åt vänster?, sitter?]
function lagerPlatser(hang,n){
 const runt=[[50,0],[78,1],[38,0],[90,1],[26,0]];
 if(hang==="berattar")return Array.from({length:n},(_,i)=>i===0?[88,1,0]:[[50,0,1],[38,0,1],[26,0,1],[14,0,1]][i-1]);
 if(hang==="ovar")return Array.from({length:n},(_,i)=>i===0?[20,0,0]:i===1?[34,1,0]:[[78,1,1],[90,1,1],[102,1,1]][i-2]);
 if(hang==="sover")return Array.from({length:n},(_,i)=>[[46,0],[84,1],[24,0],[108,1],[100,1]][i]);
 return Array.from({length:n},(_,i)=>[runt[i][0],runt[i][1],hang==="korv"?1:0]);
}
function ritaLager(cv,bg,hang,H,t,anim){
 const g=cv.getContext("2d");g.imageSmoothingEnabled=false;g.drawImage(bg,0,0);ritaTrofeer(g);
 const pos=lagerPlatser(hang,H.length),bas=66;
 if(hang==="sover"){g.fillStyle="rgba(5,8,20,.35)";g.fillRect(0,0,LW,LH)}
 ritaElden(g,t);
 H.forEach((h,i)=>{const c=heroCanvas(h),L=anim?livTid(t,i):{blink:false,titt:0,upp:0},[x,vand,sitt]=pos[i],katt=h.folk==="katt";
  if(hang==="sover"){ // ligger ner med stängda ögon
   const tmp=document.createElement("canvas");tmp.width=c.width;tmp.height=c.height;ritaLevande(tmp.getContext("2d"),c,heroOgon(h,c),0,0,{blink:true});
   const y=i===4?56:bas-3;g.save();g.translate(x,y);if(katt){g.drawImage(tmp,-c.width/2,-c.height+3)}else{g.rotate(vand?Math.PI/2:-Math.PI/2);g.drawImage(tmp,-c.width/2,-c.height/2-4)}g.restore();
   const z=((t/700+i*.37)%1);g.globalAlpha=1-z;g.fillStyle="#cfe8ff";const zx=x+(vand?-6:4)+z*4,zy=y-12-z*10;g.fillRect(zx,zy,3,1);g.fillRect(zx+2,zy+1,1,1);g.fillRect(zx,zy+2,3,1);g.globalAlpha=1;return}
  const sitter=sitt&&!katt;let y=bas-c.height+L.upp+(sitter?6:0);
  ritaLevande(g,c,heroOgon(h,c),Math.round(x-c.width/2),y,{flip:!!vand,blink:L.blink,titt:L.titt});
  if(sitter){g.fillStyle="#5a3a22";g.fillRect(Math.round(x-7),bas-3,14,4);g.fillStyle="#7a5232";g.fillRect(Math.round(x-7),bas-3,14,1)}
  if(hang==="korv"&&!katt){const hx=x+(vand?-4:4),hy=y+15,ex=64+(vand?5:-5),ey=51;g.fillStyle="#b08a5a";const n=14;for(let k=0;k<=n;k++)g.fillRect(Math.round(hx+(ex-hx)*k/n),Math.round(hy+(ey-hy)*k/n),1,1);g.fillStyle="#a0522d";g.fillRect(Math.round(ex)-1,ey-1,3,2);g.fillStyle="#6a2a14";g.fillRect(Math.round(ex),ey-1,1,1)}
  if(hang==="berattar"&&i===0&&Math.floor(t/600)%2){g.fillStyle="#f3eedf";g.fillRect(x-14,y-7,9,5);g.fillRect(x-6,y-2,1,1);g.fillStyle="#15111a";g.fillRect(x-12,y-5,1,1);g.fillRect(x-10,y-5,1,1);g.fillRect(x-8,y-5,1,1)}
  if(hang==="ovar"&&i<2&&Math.floor(t/350)%2){g.fillStyle="#fff3b0";g.fillRect(27,y+9,1,1);g.fillRect(26,y+8,1,1)}
 })}

/* ---------- Sidan ---------- */
let lagerHang=null;
function lagerVy(){
 view="lager";lage=null;tyst();app.replaceChildren();document.getElementById("party").hidden=true;
 spel.lager=spel.lager||{byggt:{},trofeer:{}};
 const H=lagerHjaltar();if(!lagerHang)lagerHang=HANG[Math.floor(Math.random()*HANG.length)];
 app.append(el("div",{class:"topbar"},el("button",{class:"btn ghost small",onclick:()=>{lagerHang=null;start()}},"← Start"),el("span",{class:"purse"},spel.guld+" guld i kassan")));
 // den levande bilden
 const cv=document.createElement("canvas");cv.className="px";cv.width=LW;cv.height=LH;const bg=lagerBakgrund();
 const still=matchMedia("(prefers-reduced-motion: reduce)").matches;ritaLager(cv,bg,lagerHang,H,performance.now(),!still);
 if(!still){const id=setInterval(()=>{if(!cv.isConnected){clearInterval(id);return}ritaLager(cv,bg,lagerHang,H,performance.now(),true)},110)}
 const text=el("p",{class:"lagertext"},H.length?lagerText(lagerHang,H):"Lägret är tomt. Skapa eller välj hjältar först.");
 app.append(el("div",{class:"stephead"},el("small",{},"Mellan äventyren"),el("h2",{},"Hjältarnas läger")),el("div",{class:"tvbig lagertv"},cv),
  el("div",{class:"lagerrad"},text,el("button",{class:"btn ghost small",onclick:()=>{let n;do n=HANG[Math.floor(Math.random()*HANG.length)];while(n===lagerHang);lagerHang=n;const y=scrollY;lagerVy();scrollTo(0,y)}},"Nytt häng")));
 // kassan
 app.append(el("div",{class:"bp-guld"},pixIkon("guld","stor"),el("div",{},el("b",{},spel.guld+" guld i lägrets kassa"),el("small",{},"Guldet ni hittar i grottkrypningarna hamnar här när ni kommer hem. Faller sällskapet räddar ni hälften."))));
 // bygg ut lägret
 app.append(el("div",{class:"section-head"},el("h2",{},"Bygg ut lägret"),el("span",{},"Varje bygge gör hjältarna starkare")));
 app.append(el("div",{class:"bygggrid"},LAGERBYGGEN.map(B=>{const n=lagerNiva(B.id),max=B.kost.length,kost=B.kost[n],klar=n>=max;
  return el("div",{class:"bygge"+(n?" byggt":"")},el("div",{class:"bygge-topp"},el("b",{},B.namn),el("span",{class:"nivapips","aria-label":"Nivå "+n+" av "+max},Array.from({length:max},(_,i)=>el("i",{class:i<n?"pa":""})))),
   el("small",{},B.besk),n?el("span",{class:"bygge-nu"},"Nu: "+B.nytta(n)):null,
   klar?el("span",{class:"bygge-klar"},"Färdigbyggt ✓"):el("div",{class:"bygge-kop"},el("span",{},(n?"Nästa: ":"")+B.nytta(n+1)),
    el("button",{class:"btn small"+(spel.guld<kost?" ghost":""),disabled:spel.guld<kost,onclick:()=>{spel.guld-=kost;spel.lager.byggt[B.id]=n+1;sparaSpel();flash(B.namn+" är "+(n?"uppgraderad":"byggd")+"!");const y=scrollY;lagerVy();scrollTo(0,y)}},
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
// Rutan på startsidan
function lagerRuta(){
 const cv=document.createElement("canvas");cv.className="px";cv.width=LW;cv.height=LH;const H=lagerHjaltar();
 ritaLager(cv,lagerBakgrund(),"elden",H,1000,false);
 const byggda=LAGERBYGGEN.filter(B=>lagerNiva(B.id)).length;
 return el("button",{class:"bigtile",onclick:()=>{lagerHang=null;lagerVy()}},el("div",{class:"tvbig"},cv),
  el("div",{class:"bigtile-txt"},el("h2",{},"Hjältarnas läger"),el("p",{},spel.guld+" guld i kassan · "+byggda+" av "+LAGERBYGGEN.length+" byggen"),
   el("small",{},"Bygg ut lägret, se troféer, vapen och skatter, och häng runt elden.")));
}
