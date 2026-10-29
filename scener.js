/* Tärningsriket – bakgrunder för grottkrypningen.
   runScen(g, bild) ritar en scen på TV:n (96×54 pixlar).
   bild = "run|plats|kapitel|djup|fas|rumtyp"
     fas: "d1"/"d2"/"d3" = vägval med 1–3 dörrar/gångar/stigar (vänster → höger)
          "port" = bossens port, "boss" = bossens rum, "rum" = ett vanligt rum
   Djupare in (fler rum, högre kapitel) blir det mörkare och konstigare. */
(function(){
const W=96,H=54,F=42; // F = där golvet börjar

function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let s=(seed>>>0)||1;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return(s%100000)/100000}}
function hex(c){const n=parseInt(c.slice(1,7),16);return[(n>>16)&255,(n>>8)&255,n&255]}
function mix(a,b,t){const A=hex(a),B=hex(b);return"#"+A.map((v,i)=>Math.max(0,Math.min(255,Math.round(v+(B[i]-v)*t))).toString(16).padStart(2,"0")).join("")}
function lit(c,t){return t>=0?mix(c,"#ffffff",t):mix(c,"#000000",-t)}
function doorX(n){return n===1?[70]:n===2?[56,80]:[46,64,82]}

function runScen(g,bild){
 const p=bild.split("|"),plats=p[1],kap=+p[2]||1,djup=+p[3]||1,fas=p[4]||"rum",typ=p[5]||"";
 const dd=Math.min(1,(djup-1)/5),deep=Math.min(2,(kap-1)*.7+dd);
 const r=rng(hash(bild)+77);
 const S={g,r,plats,kap,djup,dd,deep,fas,typ,ljus:[],eld:[],
  R(x,y,w,h,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))},
  P(x,y,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),1,1)},
  A(a,fn){g.globalAlpha=a;fn();g.globalAlpha=1}};
 S.glow=(x,y,rad,col,str=.45)=>S.ljus.push([x,y,rad,col,str]);
 S.dorrar=fas[0]==="d"?doorX(+fas.slice(1)||1):[];
 S.fritt=x=>S.dorrar.every(d=>Math.abs(d-x)>11);
 ({slottet:slott,grottorna:grotta,skogen:skog,vulkanen:vulkan}[plats]||grotta)(S);
 // ju djupare, desto mörkare
 g.fillStyle="rgba(4,3,10,"+Math.min(.45,.05+deep*.17)+")";g.fillRect(0,0,W,H);
 // ljuset från facklor, lava och kristaller lyser igenom mörkret
 g.globalCompositeOperation="lighter";
 S.ljus.forEach(([x,y,rad,col,str])=>{const[a,b,c]=hex(col),gr=g.createRadialGradient(x,y,0,x,y,rad);
  gr.addColorStop(0,`rgba(${a},${b},${c},${str})`);gr.addColorStop(1,`rgba(${a},${b},${c},0)`);g.fillStyle=gr;g.fillRect(x-rad,y-rad,rad*2,rad*2)});
 g.globalCompositeOperation="source-over";
 S.eld.forEach(f=>f());
}

/* ---------- små byggstenar ---------- */
// valv: rund överkant, rak nedtill (dörrar, tunnlar, portar)
function valv(S,x,top,w,col,bot=F){const r=w/2;for(let y=top;y<bot;y++){const dy=y-top;let half=r;if(dy<r)half=Math.sqrt(Math.max(0,r*r-(r-dy)*(r-dy)));if(half>=.5)S.R(x-half,y,half*2,1,col)}}
function flamma(S,x,y,stor=1){S.glow(x,y,10+stor*5,"#ff9a3d",.5);S.eld.push(()=>{S.R(x-1,y-1,3,2,"#ff8a2b");S.R(x,y-2-stor,1,2+stor,"#ffd96a");S.P(x,y,"#fff3c0")})}
function fackla(S,x,y){S.R(x-1,y+3,3,1,"#3a3a40");S.R(x,y,1,6,"#6b4423");S.P(x,y,"#8a5a2b");flamma(S,x,y-1)}
function gran(S,x,base,h,c,sida){const tiers=Math.max(2,Math.round(h/6)),th=h/tiers;S.R(x,base-1,1,3,"#24190f");
 for(let y=0;y<h-1;y++){const t=Math.floor(y/th),f=(y-t*th)/th,half=Math.round(.6+t*1.1+f*(1.6+t*.5));S.R(x-half,base-h+y,half*2+1,1,c);if(sida&&half>1)S.P(x+half,base-h+y,sida)}}
function dimma(S,y,h,a,col="#9fb2c6"){S.A(a,()=>{for(let x=0;x<W;x+=2)S.R(x,y+Math.round(Math.sin(x/9+y)*1.5),2,h,col)})}
function stjarnor(S,n,maxY){for(let i=0;i<n;i++)S.P(S.r()*W,S.r()*maxY,S.r()>.7?"#ffffffcc":"#ffffff55")}
function himmel(S,a,b,y0,y1){const n=y1-y0;for(let i=0;i<n;i++)S.R(0,y0+i,W,1,mix(a,b,i/(n-1||1)))}
function skalle(S,x,y){S.R(x,y,3,2,"#d8d2c0");S.P(x,y+2,"#d8d2c0");S.P(x+2,y+2,"#d8d2c0");S.P(x,y+1,"#1a1416");S.P(x+2,y+1,"#1a1416")}
function ben(S,x,y){S.R(x,y,4,1,"#cfc8b4");S.P(x-1,y-1,"#cfc8b4");S.P(x+4,y+1,"#cfc8b4")}
function guldglitter(S,x,w){for(let i=0;i<10;i++){const xx=x+S.r()*w,yy=F+2+S.r()*8;S.R(xx,yy,2,1,"#c99a2e");S.P(xx,yy-1,"#f2c14e")}S.glow(x+w/2,F+5,12,"#f2c14e",.3)}
function ljusstrale(S,x,w,col="#cfe2ff",a=.12){S.A(a,()=>{for(let y=0;y<H;y++)S.R(x+y*.25,y,w+y*.3,1,col)})}

/* =================== SPÖKSLOTTET =================== */
function slott(S){
 const {R,r,kap}=S,kj=kap>=2; // kapitel 2+: fängelsehålorna
 const base=kj?"#2e2a27":"#2a3145",mort=kj?"#191716":"#1a1f2d";
 R(0,0,W,F,mort);
 for(let y=1,row=0;y<F;y+=4,row++){const off=row%2?4:0;for(let x=-off;x<W;x+=8){R(x+1,y,7,3,lit(base,(r()-.5)*.16));
   if(r()<.07)R(x+2+Math.floor(r()*4),y,2,1,lit(base,.14));if(kj&&r()<.08)R(x+1,y+2,6,1,"#2e3a24");if(r()<.03)S.P(x+4,y+1,mort)}}
 R(0,0,W,2,lit(base,-.4));
 if(kj){R(0,F,W,H-F,"#252220");for(let i=0;i<26;i++)R(r()*W,F+1+r()*(H-F-2),4+r()*6,1,"#1b1917");for(let i=0;i<22;i++)R(r()*W,F+r()*(H-F),2,1,"#7a6a32")}
 else{let y=F,hh=2,row=0;while(y<H){const off=row%2?6:0;for(let x=-off;x<W;x+=12){R(x,y,6,hh,"#3a3346");R(x+6,y,6,hh,"#2a2535")}y+=hh;hh++;row++}}
 R(0,F,W,1,"#110e16");R(0,F-2,W,2,lit(base,-.3));
 if(S.fas==="port")return slottPort(S);
 if(S.fas==="boss")return slottTron(S);
 const platser=[8,26,44,62,80].filter(S.fritt);
 const sorter=kj?["kedjor","galler","fackla","spindel","kedjor","fackla","bur"]:["fonster","banner","portratt","fackla","rustning","banner","fonster","portratt"];
 if(S.fas==="rum"){if(S.typ==="lager")slottEldstad(S,66);else if(S.typ==="altare")slottGlasfonster(S,66);}
 const upptagen=S.fas==="rum"&&(S.typ==="lager"||S.typ==="altare")?[62,80]:[];
 platser.filter(x=>!upptagen.includes(x)).forEach((x,i)=>{if(r()<.25&&i)return;slottDekor(S,sorter[Math.floor(r()*sorter.length)],x)});
 if(r()<.5)slottDekor(S,"spindel",r()<.5?0:W);
 S.dorrar.forEach(x=>slottDorr(S,x,Math.floor(r()*4)));
 if(S.fas==="rum"&&(S.typ==="skatt"||S.typ==="vaktad"))guldglitter(S,60,30);
 if(S.fas==="rum"&&S.typ==="handlare"){fackla(S,58,18)}
}
function slottDekor(S,k,x){const {R,r}=S;if(k==="rustning"&&x<38)k="banner";
 if(k==="fonster"){valv(S,x,7,10,"#3a4258",22);valv(S,x,8,8,"#1a2a4a",21);R(x-4,14,8,1,"#3a4258");R(x,8,1,13,"#3a4258");
  S.P(x-2,10,"#cfe2ff");S.P(x+2,16,"#ffffff88");S.glow(x,14,9,"#9ab8e8",.18);ljusstrale(S,x-3,5,"#cfe2ff",.06)}
 else if(k==="banner"){const c=["#7a2b2e","#2b3f7a","#5a2b6a","#2b5a3a"][Math.floor(r()*4)];R(x-4,5,9,1,"#8a6a2a");R(x-3,6,7,14,c);R(x-3,20,3,2,c);R(x+1,20,3,2,c);
  R(x-1,10,3,3,"#d4a63a");S.P(x,11,c);R(x-3,6,1,14,lit(c,-.25))}
 else if(k==="portratt"){R(x-5,7,11,13,"#8a6a2a");R(x-4,8,9,11,"#1d1820");R(x-2,10,5,5,"#c9a080");R(x-2,9,5,2,"#3a2a20");S.P(x-1,12,"#1a1010");S.P(x+1,12,"#1a1010");R(x-3,15,7,4,"#4a2a3a");
  if(S.deep>.6&&r()<.6){S.P(x-1,12,"#ff4d4d");S.P(x+1,12,"#ff4d4d")}}
 else if(k==="fackla")fackla(S,x,17);
 else if(k==="rustning"){const c="#8a909a",m="#5e636c";R(x-2,F-18,4,4,c);R(x-1,F-17,2,1,"#15111a");R(x-3,F-14,6,6,c);R(x-4,F-13,1,5,m);R(x+3,F-13,1,5,m);R(x-2,F-8,2,8,m);R(x,F-8,2,8,c);
  R(x+4,F-20,1,20,"#6b4423");R(x+3,F-22,3,2,"#c9ccd2");if(S.deep>.5)S.P(x-1,F-17,"#7fe0ff")}
 else if(k==="spindel"){const v=x===0?1:-1,x0=x===0?0:W-1;S.A(.5,()=>{for(let i=0;i<9;i++){S.P(x0+v*i,2+i*.0,"#c9c2d6");S.P(x0,2+i,"#c9c2d6");S.P(x0+v*i,2+i,"#c9c2d6")}for(let k2=3;k2<9;k2+=3)for(let i=0;i<=k2;i++)S.P(x0+v*i,2+k2-i+i*0,"#c9c2d6")})}
 else if(k==="kedjor"){for(const dx of[-3,3]){for(let y=2;y<20+(dx>0?4:0);y+=2){S.P(x+dx,y,"#6c7078");S.P(x+dx+(y%4?1:0),y+1,"#4a4e56")}R(x+dx-1,22+(dx>0?4:0),3,2,"#6c7078")}}
 else if(k==="galler"){R(x-5,6,10,8,"#0b0a0c");for(let i=-4;i<5;i+=2)R(x+i,6,1,8,"#6c7078");R(x-5,6,10,1,"#6c7078");S.glow(x,10,8,"#9ab8e8",.15);ljusstrale(S,x-4,6,"#cfe2ff",.05)}
 else if(k==="bur"){R(x,0,1,8,"#4a4e56");for(let i=-4;i<=4;i+=2)R(x+i,8,1,12,"#6c7078");R(x-4,8,9,1,"#6c7078");R(x-4,20,9,1,"#6c7078");skalle(S,x-1,17)}
}
function slottDorr(S,x,v){const {R}=S,top=F-22;
 valv(S,x,top-2,16,"#4a4f60");valv(S,x,top-1,14,"#3a3e4c");
 if(v===2||v===3){valv(S,x,top,12,"#08070a");
  for(let i=0;i<6;i++){const y=v===2?F-1-i*2:F-1-i*3,c=lit("#3a3e4c",-.12*i);if(v===2)R(x-5+i,y,11-2*i,1,c);else R(x-5+i*1.5,y,5,1,c)}
  if(v===2)S.glow(x,F-3,6,"#ff9a3d",.15);return}
 valv(S,x,top,12,"#5a3a22");for(let i=-4;i<6;i+=3)R(x+i,top+2,1,22,"#432a17");
 R(x-6,top+6,12,1,"#2a2a30");R(x-6,F-5,12,1,"#2a2a30");S.P(x+3,F-11,"#d4a63a");S.P(x+3,F-10,"#8a6a2a");
 if(v===1){valv(S,x+3,top+2,6,"#07060a");R(x+3,top+5,3,F-top-5,"#07060a");S.glow(x+4,F-6,7,"#9ab8e8",.18)}}
function slottPort(S){const {R}=S,x=66;
 for(const bx of[44,88]){R(bx-4,4,9,1,"#8a6a2a");R(bx-3,5,7,20,"#7a2b2e");R(bx-3,25,3,2,"#7a2b2e");R(bx+1,25,3,2,"#7a2b2e");R(bx-1,10,3,3,"#d4a63a")}
 valv(S,x,7,30,"#4f5466");valv(S,x,9,26,"#3a3e4c");valv(S,x,10,24,"#4a2c18");
 R(x,10,1,F-10,"#1d1209");for(let i=-11;i<12;i+=4)R(x+i,14,1,F-14,"#3a2212");
 for(const y of[17,26,35])for(let i=-10;i<=10;i+=3)S.P(x+i,y,"#9aa0aa");R(x-12,22,24,1,"#2a2a30");R(x-12,32,24,1,"#2a2a30");
 R(x-4,27,2,3,"#d4a63a");R(x+3,27,2,3,"#d4a63a");
 skalle(S,x-1,4);fackla(S,50,20);fackla(S,82,20);S.glow(x,F,14,"#ff4d3d",.15)}
function slottTron(S){const {R,r}=S,x=68;
 slottDekor(S,"fonster",14);slottDekor(S,"banner",36);slottDekor(S,"banner",90);slottDekor(S,"fonster",54);
 for(let y=F;y<H;y++){const t=(y-F)/(H-F),half=5+t*9;R(x-half,y,half*2,1,"#6a1f24");R(x-half,y,1,1,"#d4a63a");R(x+half-1,y,1,1,"#d4a63a")}
 R(x-8,F-3,16,3,"#3a3440");R(x-6,10,12,F-13,"#5a1f24");R(x-7,8,14,3,"#d4a63a");R(x-7,8,1,F-11,"#d4a63a");R(x+6,8,1,F-11,"#d4a63a");
 S.P(x-4,6,"#d4a63a");S.P(x,5,"#d4a63a");S.P(x+4,6,"#d4a63a");R(x-6,F-12,12,3,"#7a2b2e");R(x-1,12,2,2,"#f2c14e");
 fackla(S,x-14,18);fackla(S,x+14,18)}
function slottEldstad(S,x){const {R}=S;R(x-10,14,20,2,"#5a5f70");R(x-9,16,18,F-16,"#3a3e4c");R(x-6,22,12,F-22,"#0c0a0c");for(let i=-5;i<6;i+=2){S.R(x+i,F-2,2,1,"#5a3a22")}
 flamma(S,x-2,F-4,2);flamma(S,x+2,F-4,1);S.glow(x,F-6,22,"#ff9a3d",.35)}
function slottGlasfonster(S,x){valv(S,x,5,18,"#4a4f60",F-10);valv(S,x,6,16,"#1a1a2a",F-11);const c=["#c0392b","#2b6fb8","#d4a63a","#3a8a4a","#8a3ab8"];
 for(let y=10;y<F-11;y+=3)for(let i=-7;i<7;i+=3)S.R(x+i,y,2,2,c[Math.abs(i+y)%5]);S.R(x-1,6,2,F-17,"#4a4f60");S.glow(x,18,16,"#f2e0a0",.25);ljusstrale(S,x-6,10,"#f2e0a0",.07)}

/* =================== GROTTORNA =================== */
function grotta(S){
 const {R,r,kap}=S,bla=kap>=2; // kapitel 2+: kallare, blåa kristallgrottor
 const base=bla?"#283044":"#342f29",lj=bla?"#3a4560":"#463f36",mo=bla?"#181d2a":"#211d19",tak=bla?"#10131c":"#15120f";
 R(0,0,W,H,base);
 for(let i=0;i<80;i++){const x=r()*W,y=r()*F,w=2+r()*5,h=1+r()*2;R(x,y,w,h,r()<.5?lj:mo)}
 for(let i=0;i<5;i++){let x=r()*W,y=4+r()*20;for(let k=0;k<9;k++){S.P(x,y,mo);x+=r()<.5?(r()<.5?1:-1):0;y++}}
 // tak med droppstenar
 for(let x=0;x<W;x++){const h=3+Math.round(2*Math.sin(x/6)+Math.sin(x/2.3));R(x,0,1,h,tak)}
 for(let i=0;i<6;i++){const x=r()*W,y=8+r()*26;R(x,y,8+r()*10,1,lit(lj,.12));R(x+1,y+1,6+r()*8,1,mo)} // avsatser i berget
 for(let i=0;i<10;i++){const x=Math.floor(r()*W),L=4+Math.floor(r()*10);for(let j=0;j<L;j++){const w=Math.max(1,Math.round((1-j/L)*3.4));R(x-Math.floor(w/2),3+j,w,1,lj);S.P(x-Math.floor(w/2),3+j,lit(lj,.18))}
  if(r()<.3)S.P(x,4+L+Math.floor(r()*2),"#9fd0ff")}
 // golv
 R(0,F,W,H-F,bla?"#1c2231":"#24201c");for(let x=0;x<W;x++)if(r()<.4)R(x,F-1,1,1+Math.floor(r()*2),bla?"#1c2231":"#24201c");
 for(let i=0;i<14;i++){const x=r()*W,y=F+2+r()*(H-F-4);R(x,y,3,2,lj);S.P(x,y,lit(lj,.15))}
 if(r()<.7){const x=8+r()*70,w=8+r()*10;R(x,F+6+r()*4,w,2,"#1f3a52");S.P(x+2,F+7,"#9fd0ff")}
 if(S.djup===1&&S.kap===1&&S.fas!=="port")S.glow(0,8,34,"#cfe2ff",.22); // dagsljus från ingången
 if(S.fas==="port")return grottPort(S);
 if(S.fas==="boss")return grottSal(S);
 const sorter=bla?["kristall","kristall","svamp","ben","vattenfall","fladdermus","kristall","rotter"]:["svamp","ben","rotter","vattenfall","fackla","fladdermus","stalagmit","kristall","fackla"];
 [6,22,38,54,70,86].filter(S.fritt).forEach((x,i)=>{if(r()<.3)return;grottDekor(S,sorter[Math.floor(r()*sorter.length)],x)});
 S.dorrar.forEach(x=>grottGang(S,x,Math.floor(r()*3)));
 if(S.fas==="rum"){if(S.typ==="skatt"||S.typ==="vaktad")guldglitter(S,58,30);
  if(S.typ==="altare")ljusstrale(S,58,10,"#cfe2ff",.12);
  if(S.typ==="handlare"){R(60,0,1,12,"#4a4e56");R(58,12,5,5,"#2a2a2a");R(59,13,3,3,"#ffd96a");S.glow(60,15,14,"#ffd96a",.35)}}
}
function grottDekor(S,k,x){const {R,r}=S;if(x<38&&["kristall","svamp","stalagmit","vattenfall","ben"].includes(k))k=["rotter","fackla","fladdermus"][Math.floor(r()*3)];
 if(k==="kristall"){const c=r()<.5?["#7fe0ff","#3a9ac8"]:["#c49aff","#7a4ac8"],y=F-1;for(let i=0;i<4;i++){const h=4+Math.floor(r()*7),xx=x-4+i*2+Math.floor(r()*2);for(let j=0;j<h;j++){const w=j<2?1:2;R(xx,y-h+j,w,1,j%3?c[1]:c[0])}}
  S.glow(x,F-4,12,c[0],.35)}
 else if(k==="svamp"){for(let i=0;i<3;i++){const xx=x-3+i*3,h=2+Math.floor(r()*3);R(xx,F-h,1,h,"#cfc8b4");R(xx-1,F-h-1,3,1,"#4fd0a0")}S.glow(x,F-3,8,"#4fd0a0",.3)}
 else if(k==="ben"){skalle(S,x-2,F+3);ben(S,x+2,F+5);ben(S,x-5,F+7)}
 else if(k==="rotter"){for(let i=0;i<4;i++){let xx=x-3+i*2,y=3;const L=6+Math.floor(r()*10);for(let j=0;j<L;j++){S.P(xx,y+j,"#4a3423");if(r()<.3)xx+=r()<.5?1:-1}}}
 else if(k==="vattenfall"){R(x-1,4,3,F-4,"#3a7ab8");for(let y=6;y<F;y+=3)S.P(x+(y%2),y,"#cfe8ff");R(x-5,F,11,3,"#1f4a6e");S.P(x-3,F+1,"#cfe8ff");S.P(x+3,F,"#cfe8ff")}
 else if(k==="fackla")fackla(S,x,18);
 else if(k==="fladdermus"){for(let i=0;i<3;i++){const xx=x-4+i*4,y=5+Math.floor(r()*3);R(xx,y,1,3,"#4a3e44");S.P(xx-1,y,"#4a3e44");S.P(xx+1,y,"#4a3e44");S.P(xx-1,y+1,"#4a3e44");S.P(xx+1,y+1,"#4a3e44");S.P(xx,y+2,"#ff4d4d")}}
 else if(k==="stalagmit"){for(let j=0;j<10;j++){const w=Math.max(1,Math.round(j*.5));R(x-w,F-10+j,w*2+1,1,j<2?"#4a443a":"#3a342d")}}
}
function grottGang(S,x,v){const {R}=S,mo="#08090c";
 if(v===1){ // smal spricka
  for(let y=F-26;y<F;y++){const half=1+Math.round((y-(F-26))/26*2.5),o=(y>>2)%2;R(x-half+o-1,y,half*2+2,1,"#4a443a");R(x-half+o,y,half*2,1,mo)}R(x-5,F-1,11,1,"#4a443a");return}
 const w=v===2?18:14,top=v===2?F-13:F-21;
 valv(S,x,top-2,w+5,"#45403a");valv(S,x,top,w,"#121316");valv(S,x,top+3,w-4,mo);
 if(v===2)for(let i=0;i<5;i++)R(x-8+i*4,F-2,3,2,"#3a342d");
 S.P(x-w/2+1,top+w/2,"#5a544a")}
function grottPort(S){const {R}=S,x=68;
 valv(S,x,9,38,"#3a342d");valv(S,x,11,34,"#0d0c0e");valv(S,x,15,26,"#060507");
 for(let i=-15;i<=15;i+=4){const L=3+((i+15)%3)*2;for(let j=0;j<L;j++)R(x+i-Math.floor((L-j)/3),12+j,Math.max(1,Math.round((L-j)/2)),1,"#4a443a")}
 for(let i=-14;i<=14;i+=5){for(let j=0;j<4;j++)R(x+i-(3-j)/2,F-j-1,Math.max(1,4-j),1,"#4a443a")}
 S.P(x-4,27,"#ff3d3d");S.P(x+4,27,"#ff3d3d");S.glow(x,27,6,"#ff3d3d",.25);
 skalle(S,x-14,F+2);skalle(S,x+12,F+4);ben(S,x+3,F+6);ben(S,x-8,F+8);fackla(S,46,22);fackla(S,90,22)}
function grottSal(S){const {R,r}=S;
 for(const x of[24,90]){for(let y=0;y<F;y++){const half=3+Math.round(Math.abs(y-F/2)/(F/2)*3);R(x-half,y,half*2,1,y%5?"#4a433a":"#564e44");S.P(x-half,y,"#635a4e")}}
 for(let i=0;i<14;i++){R(46+r()*36,F+1+r()*6,3,1,"#cfc8b4")}skalle(S,52,F+2);skalle(S,74,F+5);
 R(40,F+8,40,3,"#1f3a52");R(44,F+9,8,1,"#5fb0e0");S.glow(60,F+9,18,"#3a9ac8",.3);
 grottDekor(S,"kristall",60);grottDekor(S,"fackla",40)}

/* =================== MÖRKSKOGEN =================== */
function skog(S){
 const {R,r,dd,kap}=S,lila=kap>=2; // kapitel 2+: döda, lila träd
 himmel(S,mix(lila?"#100a20":"#081222","#000000",dd*.5),mix(lila?"#2a1d40":"#1d3348","#05070c",dd*.5),0,F);
 if(dd<.8)stjarnor(S,Math.round(26*(1-dd)),26);
 if(dd<.5&&S.fas!=="port"){const mx=10+Math.floor(r()*30);R(mx+1,4,4,6,"#f3eedf");R(mx,5,6,4,"#f3eedf");S.P(mx+2,6,"#d8d2bf");S.glow(mx+3,7,14,"#cfe2ff",.2)}
 const fjarr=lila?"#1d1830":"#13233a",mitt=lila?"#160f20":"#0e1b17",mittS=lila?"#241a33":"#18302a";
 for(let x=-4;x<W+4;x+=5+Math.floor(r()*4))gran(S,x,F-3,10+Math.floor(r()*9),fjarr);
 dimma(S,30,4,.18);
 for(let x=-6;x<W+6;x+=7+Math.floor(r()*5)){if(!S.fritt(x)||S.fas==="port"&&x>48&&x<88)continue;
  if(lila&&r()<.4)dodtrad(S,x,F,16+Math.floor(r()*10));else gran(S,x,F,18+Math.floor(r()*12),mitt,mittS)}
 R(0,F,W,H-F,lila?"#1a1822":"#182a1c");
 for(let i=0;i<40;i++){const x=r()*W,y=F+r()*(H-F);S.P(x,y,lila?"#2a2636":"#24402a");S.P(x,y-1,lila?"#2a2636":"#24402a")}
 for(let i=0;i<6;i++){const x=r()*W,y=F+3+r()*8;R(x,y,3,2,"#3a3a3e");S.P(x,y,"#55555a")}
 dimma(S,F-3,3,.12+dd*.12);
 if(S.fas==="port")return skogGlanta(S,false);
 if(S.fas==="boss")return skogGlanta(S,true);
 S.dorrar.forEach(x=>skogStig(S,x,Math.floor(r()*3)));
 if(S.dorrar.length>1)skylt(S,S.dorrar[0]-11,S.dorrar.length);
 // smådetaljer
 if(r()<.6)for(let i=0;i<3;i++){const x=6+r()*30;R(x,F-1,1,2,"#cfc8b4");R(x-1,F-2,3,1,"#c0392b");S.P(x,F-2,"#efe6d0")}
 const fl=Math.round(3+r()*5);for(let i=0;i<fl;i++){const x=r()*W,y=14+r()*30;S.eld.push(()=>S.P(x,y,"#e8ff8a"));S.glow(x,y,4,"#e8ff8a",.35)}
 if(S.deep>.4)for(let i=0;i<1+Math.floor(S.deep*2);i++){const x=30+r()*60,y=26+r()*12;if(!S.fritt(x))continue;S.eld.push(()=>{S.P(x,y,"#ffcf3d");S.P(x+2,y,"#ffcf3d")})}
 if(r()<.4&&S.fritt(86)){R(84,22,10,1,"#2a1e16");R(86,19,3,3,"#6b5a48");S.P(86,20,"#ffcf3d");S.P(88,20,"#ffcf3d")} // uggla på en gren
 if(S.fas==="rum"){if(S.typ==="skatt"||S.typ==="vaktad")guldglitter(S,58,30);if(S.typ==="altare")ljusstrale(S,56,10,"#cfe2ff",.12)}
}
function dodtrad(S,x,base,h){const {R}=S,c="#2a2030";R(x-1,base-h,3,h,c);R(x-2,base-2,5,2,c);
 for(let i=0;i<3;i++){const y=base-h+3+i*4,dir=i%2?1:-1;for(let j=0;j<4+i;j++)S.P(x+dir*(2+j),y-Math.floor(j/2),c)}}
function skogStig(S,x,v){const {R}=S,mork=S.kap>=2?"#0a0710":"#050a08";
 const lov=S.kap>=2?"#1e1530":"#14261d";valv(S,x,F-23,18,lov);
 for(let i=0;i<26;i++){const a=S.r()*Math.PI,rr=8+S.r()*2;S.P(x+Math.cos(a)*rr,F-14-Math.sin(a)*rr*1.1,S.kap>=2?"#2a1f40":"#1f3a2a")}
 valv(S,x,F-19,12,lit(lov,-.45));valv(S,x,F-15,7,mork);
 for(let y=F-1;y<H;y++){const t=(y-F+1)/(H-F+1),half=2+t*8;R(x-half,y,half*2,1,"#4e4030");R(x-half,y,1,1,"#3a3024");R(x+half-1,y,1,1,"#3a3024")}
 for(let i=0;i<5;i++)S.P(x-4+S.r()*8,F+2+S.r()*9,"#6b5a44");
 if(v===1){for(let i=0;i<4;i++){const y=F+1+i*3,xx=x+(i%2?7:-8);R(xx,y-1,1,2,"#cfc8b4");R(xx-1,y-2,3,1,"#4fd0a0");S.glow(xx,y-2,5,"#4fd0a0",.35)}}
 if(v===2){R(x-9,F+5,18,3,"#4a3423");R(x-9,F+5,18,1,"#6b4a2e");S.P(x-9,F+6,"#2a1e16");S.P(x+8,F+6,"#2a1e16")}}
function skylt(S,x,n){const {R}=S;R(x,F-14,1,16,"#5a3a22");for(let i=0;i<Math.min(n,3);i++){const y=F-13+i*4,dir=i%2?-1:1;R(dir>0?x+1:x-6,y,6,2,"#7a5232");S.P(dir>0?x+7:x-7,y,"#7a5232");S.P(dir>0?x+7:x-7,y+1,"#7a5232")}}
function skogGlanta(S,inne){const {R,r}=S,x=68;
 S.A(.5,()=>{for(let y=F-2;y<H;y++){const t=(y-F+2)/12,half=16+t*4;R(x-half,y,half*2,1,"#3a5a48")}});
 for(const [dx,h] of[[-22,24],[22,26],[-15,14],[15,15]]){if(inne&&Math.abs(dx)<20){R(x+dx-2,F-h/2,4,h/2,"#6a6e78");R(x+dx-2,F-h/2,4,1,"#8a8e98");continue}gran(S,x+dx,F,h,S.kap>=2?"#160f20":"#0b1612","#18302a")}
 if(inne){dodtrad(S,x,F,22);R(x-1,F-14,3,3,"#0a0a0a");S.P(x-1,F-13,"#7fff7f");S.P(x+1,F-13,"#7fff7f")}
 S.glow(x,F-6,22,"#7fff9f",.25);dimma(S,F-4,3,.2,"#bfe8cf");
 for(let i=0;i<6;i++){const xx=x-20+r()*40,yy=20+r()*20;S.eld.push(()=>S.P(xx,yy,"#bfffcf"))}}

/* =================== DRAKVULKANEN =================== */
function vulkan(S){
 const {R,r,dd,kap}=S;
 himmel(S,mix("#1a0806","#050202",dd*.5),mix("#5a1a0e","#7a240e",dd*.4),0,F);
 S.A(.35,()=>{for(let i=0;i<8;i++){const x=r()*W,y=r()*14,w=10+r()*16;R(x,y,w,3,"#2a1a18");R(x+3,y-1,w-6,1,"#2a1a18")}});
 for(let x=0;x<W;x++){const h=8+Math.round(5*Math.sin(x/8+1)+3*Math.sin(x/3.1));R(x,F-14-h,1,h+14,"#150a08")}
 const fall=1+Math.floor(r()*2+dd*1.5);for(let i=0;i<fall;i++){const x=10+Math.floor(r()*76);if(!S.fritt(x))continue;R(x,12+Math.floor(r()*6),2,F-14,"#ff6a2b");S.P(x,16,"#ffd23d");S.P(x+1,24,"#ffd23d");S.glow(x+1,F-6,10,"#ff6a2b",.4)}
 // basaltpelare
 for(let x=0;x<W;x+=4){if(r()<.45)continue;const h=6+Math.floor(r()*14);R(x,F-h,3,h,"#1f1513");R(x,F-h,1,h,"#2e211d");R(x,F-h,3,1,"#3a2a24")}
 R(0,F-2,W,2,"#ff6a2b");R(0,F-2,W,1,"#ffd23d");S.glow(48,F+4,40,"#ff6a2b",.16+kap*.04);
 R(0,F,W,H-F,"#1a1210");
 for(let i=0;i<5+kap*2;i++){let x=r()*W,y=F+2+r()*8;const L=4+r()*8;for(let j=0;j<L;j++){S.P(x,y,"#ff6a2b");x++;if(r()<.4)y+=r()<.5?1:-1}S.glow(x-L/2,y,6,"#ff6a2b",.25)}
 for(let i=0;i<14;i++){const x=r()*W,y=r()*F;S.eld.push(()=>S.P(x,y,r()<.5?"#ff8a3d":"#ffd23d"))}
 if(S.fas==="port")return vulkPort(S);
 if(S.fas==="boss")return vulkKrater(S);
 const sorter=["kedjor","eldfat","skalle","obsidian","anga","kedjor","eldfat"];
 [8,26,44,62,80].filter(S.fritt).forEach((x,i)=>{if(r()<.35)return;vulkDekor(S,sorter[Math.floor(r()*sorter.length)],x)});
 S.dorrar.forEach(x=>vulkGang(S,x,Math.floor(r()*3)));
 if(S.fas==="rum"&&(S.typ==="skatt"||S.typ==="vaktad"))guldglitter(S,58,30);
}
function vulkDekor(S,k,x){const {R,r}=S;if(x<38&&k!=="kedjor")k="kedjor";
 if(k==="kedjor"){for(let y=0;y<18+Math.floor(r()*8);y+=2){S.P(x,y,"#5a5e66");S.P(x+(y%4?1:0),y+1,"#3a3e46")}}
 else if(k==="eldfat"){R(x-3,F-6,7,2,"#3a2a24");R(x-1,F-4,3,4,"#2a1e1a");R(x-2,F,5,1,"#2a1e1a");flamma(S,x,F-7,2)}
 else if(k==="skalle"){R(x-4,F-5,8,4,"#d8d2c0");R(x-3,F-1,6,1,"#d8d2c0");S.P(x-2,F-4,"#1a1010");S.P(x+1,F-4,"#1a1010");R(x-6,F-7,2,2,"#d8d2c0");R(x+4,F-7,2,2,"#d8d2c0");S.P(x-7,F-8,"#d8d2c0");S.P(x+6,F-8,"#d8d2c0")}
 else if(k==="obsidian"){for(let i=0;i<3;i++){const h=5+Math.floor(r()*8),xx=x-3+i*3;for(let j=0;j<h;j++)R(xx,F-h+j,j<2?1:2,1,j%3?"#120c18":"#2a2038")}}
 else if(k==="anga"){S.A(.25,()=>{for(let y=F-18;y<F;y+=2)R(x-2+Math.round(Math.sin(y/3)*2),y,4,2,"#c9c2b8")})}
}
function vulkGang(S,x,v){const {R}=S;
 if(v===2){ // stenbro över lavan in i en öppning
  valv(S,x,F-19,14,"#5a2a14");valv(S,x,F-18,12,"#030202");R(x-3,F-2,6,2,"#3a2a24");for(let y=F;y<H;y++){const half=3+(y-F)*.35;R(x-half,y,half*2,1,"#2e221e");if(y%2)R(x-half,y,half*2,1,"#3a2a24")}
  S.glow(x,F-4,8,"#ff6a2b",.3);return}
 valv(S,x,F-25,18,"#3a2a24");valv(S,x,F-24,16,"#5a2a14");valv(S,x,F-23,14,"#2a1e1a");valv(S,x,F-21,11,"#030202");
 if(v===1)for(let i=0;i<5;i++)R(x-5+i,F-1-i*2,11-2*i,1,"#3a2420");
 S.glow(x,F-2,7,"#ff6a2b",.35);S.eld.push(()=>{S.R(x-3,F-2,6,1,"#ff8a3d");S.P(x-5,F-18,"#ff8a3d");S.P(x+5,F-16,"#ff8a3d")})}
function vulkPort(S){const {R}=S,x=68;
 valv(S,x,8,30,"#241a2c");valv(S,x,10,26,"#120c18");valv(S,x,12,22,"#070409");
 for(let y=14;y<F;y+=4){S.P(x-11,y,"#5a3a7a");S.P(x+11,y+2,"#5a3a7a")}
 R(x-6,2,12,6,"#d8d2c0");R(x-4,8,8,2,"#d8d2c0");S.P(x-3,4,"#ff3d3d");S.P(x+2,4,"#ff3d3d");R(x-9,0,3,4,"#cfc8b4");R(x+6,0,3,4,"#cfc8b4");for(let i=-3;i<4;i+=2)S.P(x+i,10,"#efe6d0");
 vulkDekor(S,"eldfat",48);vulkDekor(S,"eldfat",88);S.glow(x,F-2,16,"#ff3d1d",.4);S.eld.push(()=>R(x-9,F-1,18,1,"#ff8a3d"))}
function vulkKrater(S){const {R}=S;
 for(let y=F+2;y<H;y++){const t=(y-F-2)/10,half=28-t*6;R(64-half,y,half*2,1,y%2?"#ff6a2b":"#ff8a2b")}R(42,F+3,10,1,"#ffd23d");R(70,F+6,12,1,"#ffd23d");
 S.glow(64,F+6,34,"#ff6a2b",.45);vulkDekor(S,"obsidian",30);vulkDekor(S,"obsidian",92);vulkDekor(S,"kedjor",50);vulkDekor(S,"kedjor",80)}

window.runScen=runScen;
})();
