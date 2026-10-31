/* Bland monster och tärningar – liv i striden.
   Effekter på TV:n när någon anfaller, träffar, missar, helar eller besegras:
   hjältar och monster gör utfall, projektiler flyger, den som träffas blinkar och skakar
   och siffror svävar upp. Använder funktioner från index.html när sidan körs. */
(function(){
const IMP=380;        // när en träff landar (ms efter att anfallet börjar)
let ko=[];            // pågående effekter
window.tvFx=function(typ,o={}){if(!o.till&&!o.fran)return;ko.push({typ,...o,start:performance.now()+(o.delay||0)})};
window.tvFxRensa=()=>{ko=[]};

// Hur mycket ska en figur flyttas, blinka eller tona bort just nu?
window.fxOff=function(key,t){
 const o={dx:0,dy:0,tint:null,tintA:0,alpha:1,syns:false};
 ko.forEach(e=>{const d=t-e.start;if(d<0)return;
  const riktning=e.fran&&e.fran[0]==="h"?1:-1;
  if(e.fran===key&&(e.typ==="traff"||e.typ==="miss")&&d<260){o.dx+=riktning*Math.sin(Math.PI*d/260)*4}  // utfall framåt
  if(e.till!==key)return;
  const i=d-IMP;
  if(e.typ==="traff"&&i>=0&&i<260){o.tint=e.krit?"#ffe46a":"#ffffff";o.tintA=Math.max(o.tintA,(e.krit?.75:.9)*(1-i/260));o.dx+=Math.sin(i/22)*(e.krit?2:1.2)}
  if(e.typ==="miss"&&i>=0&&i<320){o.dx+=-riktning*Math.sin(Math.PI*i/320)*3;o.dy-=Math.sin(Math.PI*i/320)*1.5}
  if((e.typ==="hela"||e.typ==="gift"||e.typ==="skydd")&&d<500){o.tint=e.typ==="hela"?"#6fe05a":e.typ==="gift"?"#8ae04a":"#8fe6ff";o.tintA=Math.max(o.tintA,.55*(1-d/500))}
  if(e.typ==="dod"&&i>=0){const p=Math.min(1,i/650);o.alpha=Math.min(o.alpha,1-p);o.dy+=p*5;o.syns=p<1}
 });return o};

// Små pixelsiffror och bokstäver (3×5)
const TECKEN={"0":"111101101101111","1":"010110010010111","2":"111001111100111","3":"111001111001111","4":"101101111001001","5":"111100111001111",
 "6":"111100111101111","7":"111001010010010","8":"111101111101111","9":"111101111001111","+":"000010111010000","-":"000000111000000","!":"010010010000010",
 "M":"101111111101101","I":"111010010010111","S":"111100111001111","Z":"111001010100111"};
function text(g,str,cx,y,col,kant="#15111a"){
 const w=str.length*4-1;let x=Math.round(cx-w/2);
 for(const ch of str){const m=TECKEN[ch];if(m){for(let p=0;p<15;p++)if(m[p]==="1"){const px=x+p%3,py=y+Math.floor(p/3);g.fillStyle=kant;g.fillRect(px-1,py,3,1);g.fillRect(px,py-1,1,3)}}x+=4}
 x=Math.round(cx-w/2);for(const ch of str){const m=TECKEN[ch];if(m){g.fillStyle=col;for(let p=0;p<15;p++)if(m[p]==="1")g.fillRect(x+p%3,y+Math.floor(p/3),1,1)}x+=4}}

const FARG={hugg:"#ffffff",pil:"#c9a87a",eldpil:"#ff8a2b",giftpil:"#6fe05a",magi:"#c49aff",eld:"#ff8a2b",is:"#8fe6ff",blixt:"#ffe46a",ljus:"#fff3b0",gift:"#6fe05a",
 stjarna:"#dfe6ec",klo:"#ff5a5a",ljud:"#ff9ad0",bett:"#ff4848"};
const mitt=p=>p?{x:p.x+p.w/2,y:p.y+p.h*.45}:null;

// Rita projektiler, smällar, siffror och gnistor ovanpå TV-bilden
window.fxRita=function(g,t,pos){
 ko=ko.filter(e=>t-e.start<2200);
 ko.forEach(e=>{const d=t-e.start;if(d<0)return;const A=mitt(pos[e.fran]),B=mitt(pos[e.till]);
  const col=FARG[e.stil]||"#ffffff",i=d-IMP;
  if((e.typ==="traff"||e.typ==="miss")&&A&&B){
   // projektiler för avståndsanfall
   const flyger=["pil","eldpil","giftpil","magi","eld","is","stjarna","ljud","gift"].includes(e.stil);
   if(flyger&&d>120&&d<IMP){const p=(d-120)/(IMP-120),x=A.x+(B.x-A.x)*p,y=A.y+(B.y-A.y)*p-Math.sin(Math.PI*p)*(e.stil.includes("pil")?4:2);
    g.fillStyle=col;if(e.stil.includes("pil")){const dir=Math.sign(B.x-A.x)||1;g.fillRect(Math.round(x-3*dir),Math.round(y),4,1);g.fillStyle="#dfe6ec";g.fillRect(Math.round(x+dir),Math.round(y),1,1)}
    else{const r=e.stil==="eld"?2:1;g.fillRect(Math.round(x-r),Math.round(y-r),r*2+1,r*2+1);g.globalAlpha=.5;g.fillRect(Math.round(x-(B.x-A.x)*.06-1),Math.round(y-1),2,2);g.globalAlpha=1}}
   if(e.stil==="blixt"&&d>200&&d<IMP+120&&e.typ==="traff"){g.fillStyle=col;let x=B.x,y=0;while(y<B.y){const nx=x+(Math.random()<.5?-2:2);g.fillRect(Math.round(Math.min(x,nx)),y,Math.abs(nx-x)+1,1);g.fillRect(Math.round(nx),y,1,4);x=nx;y+=4}}
   if(e.stil==="ljus"&&d>150&&d<IMP+200){g.globalAlpha=.45;g.fillStyle=col;g.fillRect(Math.round(B.x-3),0,7,Math.round(B.y+6));g.globalAlpha=1}
   if(e.typ==="traff"&&i>=0){
    // smällen när träffen landar
    if(i<200){const p=i/200;
     if(e.stil==="hugg"||e.stil==="bett"||e.stil==="klo"){g.fillStyle=col;const n=e.stil==="klo"?3:e.stil==="bett"?2:1;for(let k=0;k<n;k++){const ox=(k-(n-1)/2)*3;for(let s=-5;s<=5;s++)if(Math.abs(s)<=5*(1-p*.5))g.fillRect(Math.round(B.x+ox+s*.6),Math.round(B.y+s),1,1)}}
     else{g.fillStyle=col;const r=Math.round(2+p*(e.stil==="eld"?7:4));for(let a=0;a<12;a++){const v=a/12*Math.PI*2;g.fillRect(Math.round(B.x+Math.cos(v)*r),Math.round(B.y+Math.sin(v)*r),1,1)}if(e.stil==="eld"){g.globalAlpha=.6*(1-p);g.fillStyle="#ffd96a";g.fillRect(Math.round(B.x-r/2),Math.round(B.y-r/2),r,r);g.globalAlpha=1}}}
    // gnistor vid kritisk träff
    if(e.krit&&i<500)for(let k=0;k<8;k++){const v=k/8*Math.PI*2+.3,r=3+i/40;g.fillStyle=k%2?"#ffe46a":"#ffffff";g.fillRect(Math.round(B.x+Math.cos(v)*r),Math.round(B.y+Math.sin(v)*r),1,1)}
    // skadan svävar upp
    if(e.n!=null&&i<1200){const y=Math.round((pos[e.till].y)-4-i/90);g.globalAlpha=i>900?1-(i-900)/300:1;text(g,(e.till[0]==="h"?"-":"")+e.n+(e.krit?"!":""),B.x,y,e.till[0]==="h"?"#ff5a5a":e.krit?"#ffe46a":"#ffffff");g.globalAlpha=1}}
   if(e.typ==="miss"&&i>=0&&i<1000){g.globalAlpha=i>700?1-(i-700)/300:1;text(g,"MISS",B.x,Math.round(pos[e.till].y-4-i/110),"#c9ccd2");g.globalAlpha=1}}
  // helning, gift, skydd och sömn på en figur
  if(B&&(e.typ==="hela"||e.typ==="gift")&&d<1300){const gron=e.typ==="hela";
   for(let k=0;k<6;k++){const p=((d/700)+k/6)%1;g.globalAlpha=1-p;g.fillStyle=gron?(k%2?"#6fe05a":"#d8ffb0"):"#8ae04a";g.fillRect(Math.round(B.x-5+((k*7)%11)),Math.round(B.y+6-p*14),1,gron?2:1);if(gron)g.fillRect(Math.round(B.x-6+((k*7)%11)),Math.round(B.y+7-p*14),3,1)}
   g.globalAlpha=1;if(e.n!=null&&d<1200){g.globalAlpha=d>900?1-(d-900)/300:1;text(g,(gron?"+":"-")+e.n,B.x,Math.round(pos[e.till].y-4-d/90),gron?"#6fe05a":"#a8e05a");g.globalAlpha=1}}
  if(B&&e.typ==="skydd"&&d<1100){const r=Math.round(7+Math.sin(d/90)),p=d/1100;g.globalAlpha=1-p;g.fillStyle="#8fe6ff";for(let a=0;a<24;a++){const v=a/24*Math.PI*2;g.fillRect(Math.round(B.x+Math.cos(v)*r),Math.round(B.y+Math.sin(v)*r*1.3),1,1)}g.globalAlpha=1}
  if(B&&e.typ==="pepp"&&d<1100){for(let k=0;k<5;k++){const p=((d/600)+k/5)%1;g.globalAlpha=1-p;g.fillStyle="#ffe46a";const x=Math.round(B.x-4+k*2),y=Math.round(B.y-p*12);g.fillRect(x,y,1,1);g.fillRect(x-1,y+1,3,1);g.fillRect(x,y+2,1,1)}g.globalAlpha=1}
  if(B&&e.typ==="status"&&d<1400){g.globalAlpha=d>1100?1-(d-1100)/300:1;text(g,e.stil==="zz"?"Z":"-",B.x+3,Math.round(pos[e.till].y-2-d/150),e.stil==="zz"?"#c49aff":"#ff9a5a");if(e.stil==="zz"&&d>300)text(g,"Z",B.x+7,Math.round(pos[e.till].y-6-(d-300)/150),"#c49aff");g.globalAlpha=1}
 });
};
// Skakning av hela bilden vid kritiska träffar
window.fxSkak=function(t){let s=0;ko.forEach(e=>{const i=t-e.start-IMP;if(e.typ==="traff"&&e.krit&&i>=0&&i<300)s=Math.max(s,(1-i/300)*3)});return s};

// Vilken effekt passar attacken?
const STIL={eldklot:"eld",frostblixt:"is",blixt:"blixt",magisk_pil:"magi",heligt_ljus:"ljus",heligt_slag:"ljus",brinnande_pil:"eldpil",giftpil:"giftpil",giftklinga:"gift",
 shuriken:"stjarna",klosattack:"klo",hoppa_ansiktet:"klo",kasta_sig:"klo",dissonans:"ljud",hanfullt_skamt:"ljud"};
window.fxStil=function(h,A,W){if(A&&A.id&&STIL[A.id])return STIL[A.id];const f=W&&W.form;
 if(h.klass==="katt"||f==="klor")return"klo";if(f==="bage"||f==="armborst")return"pil";if(f==="stav"||f==="spo"||f==="bok")return"magi";if(f==="luta")return"ljud";return"hugg"};
})();
