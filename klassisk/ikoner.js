/* Bland monster och tärningar – små bilder (16×16 pixlar) till knapparna i striden.
   Varje specialattack har en egen bild. Bilderna ritas med enkla former och får samma
   mörka kontur och skuggning som resten av spelet (rendera i index.html). */
(function(){
const N=16;
const F={S:"#dfe6ec",s:"#8a94a0",G:"#f2c14e",g:"#b8862a",B:"#7a5232",R:"#e04848",r:"#a02a2a",O:"#ff8a2b",Y:"#ffe46a",W:"#ffffff",
 C:"#8fe6ff",c:"#3a9ac8",P:"#b07aff",p:"#6a3ab8",V:"#6fe05a",v:"#2f8a2a",K:"#e8c49a",k:"#a87a50",L:"#9aa3ad",l:"#5a6270",M:"#ff8fbf",D:"#3a3046"};
function ritare(){
 const G=Array.from({length:N},()=>Array(N).fill("."));
 const P=(x,y,c)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&y>=0&&x<N&&y<N)G[y][x]=c};
 const L=(x0,y0,x1,y1,c)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))||1;for(let i=0;i<=n;i++)P(x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,c)};
 const O=(cx,cy,r,c,fyll)=>{for(let y=-r-1;y<=r+1;y++)for(let x=-r-1;x<=r+1;x++){const d=Math.sqrt(x*x+y*y);if(fyll?d<=r+.3:Math.abs(d-r)<.55)P(cx+x,cy+y,c)}};
 const R=(x,y,w,h,c)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++)P(x+i,y+j,c)};
 // byggstenar
 const svard=(x0,y0,x1,y1,klinga="S")=>{L(x0,y0,x1,y1,klinga);const dx=Math.sign(x1-x0),dy=Math.sign(y1-y0);P(x0-dy,y0+dx,"G");P(x0+dy,y0-dx,"G");P(x0-dx,y0-dy,"B");P(x0-2*dx,y0-2*dy,"B")};
 const pil=(x0,y0,x1,y1,spets="S",fjader="R")=>{L(x0,y0,x1,y1,"B");const dx=Math.sign(x1-x0),dy=Math.sign(y1-y0);P(x1,y1,spets);P(x1-dx,y1,spets);P(x1,y1-dy,spets);P(x0,y0,fjader);P(x0+dx,y0,fjader);P(x0,y0+dy,fjader)};
 const hjarta=(cx,cy,c="R",ljus="M")=>{R(cx-3,cy-2,3,2,c);R(cx+1,cy-2,3,2,c);R(cx-3,cy,7,2,c);R(cx-2,cy+2,5,1,c);R(cx-1,cy+3,3,1,c);P(cx,cy+4,c);P(cx-2,cy-1,ljus)};
 const ton=(x,y,c="Y")=>{R(x,y+5,3,2,c);L(x+2,y,x+2,y+5,c);L(x+3,y,x+4,y+1,c);P(x+5,y+2,c)};
 const zz=(x,y,c="P")=>{L(x,y,x+3,y,c);L(x+3,y,x,y+3,c);L(x,y+3,x+3,y+3,c)};
 const glimt=(x,y,c="Y")=>{P(x,y,c);P(x-1,y,c);P(x+1,y,c);P(x,y-1,c);P(x,y+1,c)};
 const sköld=(cx,cy,c="L",kant="G")=>{for(let y=0;y<9;y++){const w=y<5?4:Math.max(0,4-(y-4));for(let x=-w;x<=w;x++)P(cx+x,cy-4+y,Math.abs(x)===w||y===0?kant:c)}};
 const katt=(cx,cy,c="k")=>{O(cx,cy,4,c,true);P(cx-4,cy-4,c);P(cx-3,cy-5,c);P(cx-3,cy-4,c);P(cx+4,cy-4,c);P(cx+3,cy-5,c);P(cx+3,cy-4,c);P(cx-2,cy-1,"V");P(cx+2,cy-1,"V");P(cx,cy+1,"M")};
 return{G,P,L,O,R,svard,pil,hjarta,ton,zz,glimt,sköld,katt}}

const RITA={
 kraftslag:d=>{d.svard(3,12,11,4);d.L(12,1,12,3,"Y");d.L(13,4,15,4,"Y");d.L(14,1,13,2,"Y")},
 dubbelhugg:d=>{d.svard(3,12,12,3);d.svard(12,12,3,3)},
 virvelhugg:d=>{d.O(8,8,6,"W");d.svard(5,11,11,5)},
 skoldslag:d=>{d.sköld(7,8);d.glimt(13,3);d.L(11,5,13,3,"Y")},
 utmana:d=>{d.sköld(6,8);d.R(12,2,2,7,"R");d.R(12,11,2,2,"R")},
 andra_andningen:d=>{d.hjarta(7,8);d.L(11,3,14,3,"W");d.L(12,5,15,5,"W");d.P(14,2,"W")},
 magisk_pil:d=>{d.pil(1,8,7,2,"P","p");d.pil(4,11,10,5,"P","p");d.pil(7,14,13,8,"P","p");d.glimt(13,2,"W")},
 eldklot:d=>{d.O(9,7,4,"O",true);d.O(9,7,2,"Y",true);d.L(2,13,5,10,"O");d.L(3,14,6,11,"R");d.P(1,12,"Y")},
 frostblixt:d=>{d.L(8,1,8,14,"C");d.L(2,8,14,8,"C");d.L(3,3,13,13,"c");d.L(13,3,3,13,"c");d.P(8,8,"W")},
 blixt:d=>{d.L(10,1,5,8,"Y");d.L(5,8,10,8,"Y");d.L(10,8,5,15,"Y");d.L(11,1,6,8,"G");d.L(11,8,6,15,"G")},
 somnformel:d=>{d.O(6,9,4,"Y",true);d.O(8,8,3,".",true);d.zz(10,2);d.zz(12,7)},
 skyddsbubbla:d=>{d.O(8,8,6,"C");d.O(8,8,5,"c");d.P(5,5,"W");d.P(4,6,"W")},
 sikta_noga:d=>{d.O(8,8,5,"R");d.L(8,1,8,5,"R");d.L(8,11,8,15,"R");d.L(1,8,5,8,"R");d.L(11,8,15,8,"R");d.P(8,8,"Y")},
 dubbelskott:d=>{d.pil(1,9,10,0);d.pil(5,14,14,5)},
 pilregn:d=>{for(const x of[2,6,10,13])d.pil(x,1+(x%3),x,9+(x%3),"S","R")},
 benskott:d=>{d.pil(1,3,9,11);d.R(10,10,3,5,"B");d.R(10,14,5,2,"B");d.P(9,12,"R")},
 brinnande_pil:d=>{d.pil(1,14,11,4,"O","R");d.L(12,1,14,3,"O");d.P(13,2,"Y");d.P(12,5,"Y")},
 giftpil:d=>{d.pil(1,14,11,4,"V","v");d.R(12,8,3,3,"V");d.P(13,7,"V");d.P(13,11,"v")},
 smygattack:d=>{d.O(5,5,2,"D",true);d.R(3,8,5,7,"D");d.svard(9,13,14,8)},
 shuriken:d=>{d.L(8,1,8,15,"S");d.L(1,8,15,8,"S");d.L(4,4,12,12,"L");d.L(12,4,4,12,"L");d.O(8,8,1,"l",true)},
 tryckpunkt:d=>{d.R(3,8,7,6,"K");d.R(9,8,5,2,"K");d.L(13,8,13,6,"k");d.glimt(13,3);d.R(3,8,1,6,"k")},
 giftklinga:d=>{d.svard(3,13,11,5,"V");d.P(12,8,"V");d.P(12,10,"v");d.P(9,10,"V")},
 rokbomb:d=>{d.O(5,10,3,"L",true);d.O(10,9,4,"L",true);d.O(8,5,3,"l",true);d.P(9,4,"W")},
 skuggsteg:d=>{d.O(9,4,2,"P",true);d.R(7,7,5,7,"p");for(const y of[6,9,12])d.L(1,y,4,y,"P")},
 lakande_ord:d=>{d.hjarta(7,9);d.R(12,2,1,5,"W");d.R(10,4,5,1,"W")},
 helande_vag:d=>{for(let x=1;x<15;x++){d.P(x,12+Math.round(Math.sin(x/2)*1.5),"V");d.P(x,14+Math.round(Math.sin(x/2+1)*1),"v")}d.hjarta(8,5)},
 valsignelse:d=>{d.O(8,9,5,"G");d.O(8,9,4,"Y");for(const [x,y] of[[8,1],[2,4],[14,4]])d.glimt(x,y)},
 heligt_ljus:d=>{d.O(8,3,2,"Y",true);[[2,"G"],[5,"Y"],[8,"Y"],[11,"Y"],[14,"G"]].forEach(([x,c])=>d.L(8,6,x,15,c));d.glimt(2,2);d.glimt(14,2)},
 heligt_slag:d=>{d.L(3,13,8,8,"B");d.O(10,6,3,"G",true);d.P(10,6,"Y");d.glimt(14,2);d.P(6,2,"Y")},
 vack:d=>{d.hjarta(7,10);d.L(12,1,12,7,"V");d.L(10,3,12,1,"V");d.L(14,3,12,1,"V")},
 peppsang:d=>{d.ton(2,4);d.glimt(12,4);d.glimt(11,11,"G")},
 hanfullt_skamt:d=>{d.O(8,8,6,"Y",true);d.P(5,6,"D");d.P(10,6,"D");d.L(4,10,12,10,"D");d.R(5,11,7,1,"r");d.R(8,12,2,2,"M")},
 vaggvisa:d=>{d.ton(1,5,"C");d.zz(10,2,"P");d.zz(12,8,"P")},
 hjaltesang:d=>{d.ton(1,3);d.hjarta(11,10)},
 dissonans:d=>{d.ton(1,4,"R");for(let y=2;y<14;y+=4)for(let x=9;x<15;x++)d.P(x,y+((x%2)?1:0),"O")},
 snabba_fingrar:d=>{d.svard(3,13,13,3,"S");d.L(1,8,4,5,"W");d.L(5,14,8,11,"W")},
 klosattack:d=>{for(const o of[-3,0,3])d.L(5+o,2,10+o,14,"R");d.L(6,2,11,14,"W")},
 hoppa_ansiktet:d=>{d.katt(9,7);d.L(1,14,4,11,"W");d.L(3,15,6,12,"W")},
 frasa:d=>{d.katt(7,9);d.R(5,11,5,1,"W");d.L(12,2,14,4,"R");d.L(13,6,15,6,"R");d.L(11,1,11,3,"R")},
 kasta_sig:d=>{d.O(8,10,3,"k",true);for(const [x,y] of[[3,5],[7,3],[11,4],[13,8]])d.O(x,y,1,"k",true)},
 nio_liv:d=>{d.hjarta(4,4);d.hjarta(11,6);d.hjarta(6,11)},
 leka:d=>{d.O(8,8,6,"M",true);d.L(3,5,13,11,"r");d.L(4,11,12,4,"r");d.L(9,14,15,15,"M")},
 dryck:d=>{d.R(7,1,2,2,"B");d.R(7,3,2,2,"C");d.O(8,10,5,"C");d.O(8,10,4,"R",true);d.P(6,8,"M")},
 fly:d=>{d.L(2,8,13,8,"V");d.L(2,8,6,4,"V");d.L(2,8,6,12,"V");d.R(10,12,4,2,"k");d.R(11,3,3,2,"k")}};
const CACHE=new Map();
// Bilden till en attack (eller "dryck"/"fly"). Faller tillbaka på ett svärd om något saknas.
window.attackIkon=function(id){
 if(!CACHE.has(id)){const d=ritare();(RITA[id]||RITA.kraftslag)(d);
  // byt färgnamnen mot egna bokstäver (inte "K", som betyder kontur i rendera)
  const tecken="abcdefghijmnopqrstuvwxyz",kod={},pal={};let n=0;
  const G=d.G.map(r=>r.map(c=>{if(c===".")return".";if(!kod[c]){kod[c]=tecken[n++];pal[kod[c]]=F[c]||c}return kod[c]}));
  CACHE.set(id,rendera(G,{K:KONTUR,...pal}))}
 const s=CACHE.get(id),c=document.createElement("canvas");c.width=s.width;c.height=s.height;c.getContext("2d").drawImage(s,0,0);
 c.className="px wicon small atkikon";c.setAttribute("aria-hidden","true");return c};
// Bilden på ett monster, i samma lilla ruta
window.monsterIkon=function(k){
 const s=sprCanvas(k),c=document.createElement("canvas");c.width=26;c.height=26;c.className="px wicon small monikon";c.setAttribute("aria-hidden","true");
 if(s){const g=c.getContext("2d");g.imageSmoothingEnabled=false;const sk=Math.min(24/s.width,24/s.height),w=Math.round(s.width*sk),h=Math.round(s.height*sk),vand=!!(SPR[k]&&(SPR[k].hero||k==="drake"||k==="eldklo"));
  if(vand){g.translate(26,0);g.scale(-1,1)}g.drawImage(s,Math.round((26-w)/2),26-h-1,w,h)}
 return c};
})();
