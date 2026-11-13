/* Bland monster och tärningar – egna bilder (den grafiska overhaulen) och dev-läget.

   DEV-LÄGE: ligger sidan i mappen /dev/ på GitHub, eller öppnas den direkt från datorn, är det
   dev-kopian. Den sparar allt under egna nycklar och i filen dev/hjaltar.json, så att det riktiga
   spelet aldrig påverkas.

   EGNA BILDER ligger i sex mappar bredvid index.html (samma namn som i overhaul-mappen på datorn).
   - Figurer är ark på 256×256 pixlar med 8×8 rutor à 32×32 (64 varianter), på magenta bakgrund.
   - Bakgrunder är 320×180 pixlar.
   Finns ingen bildfil ritar spelet som förut. Vilken ruta som används står i figurval.js. */
window.DEV=location.protocol==="file:"||/\/dev(\/|$)/.test(location.pathname);
(function(){
const MAPP={figur:"Hjältar Monster Personer",boss:"Bossar",sak:"Gosedjur Vapen Föremål",bakgrund:"Bakgrunder och miljöer",ikon:"Ikoner till knappar",lager:"Lägerdelar"};
window.BILDMAPPAR=MAPP;
const filer=new Map();   // sökväg -> {status, c}
const rutor=new Map();   // sökväg#ruta -> 32×32-canvas
let antal=0,omritning=null;

// Magenta blir genomskinligt. På webben läses pixlarna direkt. Öppnas spelet från datorn (file://)
// får sidan inte läsa pixlar, och då gör ett SVG-filter samma sak.
const ARMagenta=(r,g,b)=>2-r/255+g/255-b/255<.45;
function svgFilter(){if(document.getElementById("bmt-magenta"))return;
 const d=document.createElement("div");d.style.cssText="position:absolute;width:0;height:0;overflow:hidden";
 d.innerHTML='<svg width="0" height="0"><filter id="bmt-magenta" color-interpolation-filters="sRGB">'
  +'<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 1 -1 0 2" result="m"/>'
  +'<feComponentTransfer in="m" result="k"><feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1"/></feComponentTransfer>'
  +'<feComposite in="SourceGraphic" in2="k" operator="in"/></filter></svg>';
 (document.body||document.documentElement).append(d)}
function nyckla(img){
 const W=img.naturalWidth,H=img.naturalHeight,c=document.createElement("canvas");c.width=W;c.height=H;
 const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(img,0,0);
 try{const d=g.getImageData(0,0,W,H),p=d.data;for(let i=0;i<p.length;i+=4)if(ARMagenta(p[i],p[i+1],p[i+2]))p[i+3]=0;g.putImageData(d,0,0);return c}
 catch(e){svgFilter();const c2=document.createElement("canvas");c2.width=W;c2.height=H;const g2=c2.getContext("2d");g2.filter="url(#bmt-magenta)";g2.drawImage(img,0,0);g2.filter="none";return c2}}

// Ladda en fil (en gång). Ger null tills den finns.
function fil(mapp,namn,figur){
 const k=mapp+"/"+namn;let s=filer.get(k);
 if(!s){s={status:"laddar",c:null};filer.set(k,s);const img=new Image();
  img.onload=()=>{try{s.c=figur?nyckla(img):img}catch(e){s.c=null}s.status=s.c?"ok":"saknas";if(s.c){antal++;ritaOm()}};
  img.onerror=()=>{s.status="saknas"};img.src=encodeURI(k)+".png"}
 return s.status==="ok"?s.c:null}
window.egnaBilderAntal=()=>antal;
// Lägrets delar: en bakgrund per bygge och nivå, t.ex. Lägerdelar/lager_eld_2.png
window.lagerBild=(id,n)=>fil(MAPP.lager,"lager_"+id+"_"+n,false);

// En ruta ur ett ark. figurval.js kan välja ruta för "sta" (stå still) och "anfall".
function ruta(mapp,namn,roll,vapen,Vin){
 const ark=fil(mapp,namn,true);if(!ark)return null;
 // Bossar och lägerdelar har rutor på 64×64 (4×4 i arket), allt annat 32×32 (8×8)
 const stor=mapp===MAPP.boss||mapp===MAPP.lager,V=Vin||(window.FIGURVAL||{})[namn]||{},cell=V.cell||(ark.width===256&&ark.height===256?(stor?64:32):Math.min(ark.width,ark.height));
 // hjältarnas ark har rutor per vapen: FIGURVAL.ville_ninja.vapen.katana = {sta, anfall}
 const W=(vapen&&V.vapen&&V.vapen[vapen])||V,per=Math.max(1,Math.floor(ark.width/cell)),anf=roll==="anfall"&&W.anfall!=null,nr=anf?W.anfall:(W.sta??V.sta??0);
 // flip vänder hela arket, vs/va vänder bara stå- eller anfallsbilden (för rutor där figuren tittar åt fel håll)
 const fl=!!V.flip!==!!(anf?W.va:W.vs),k=mapp+"/"+namn+"#"+nr+(fl?"v":"");
 if(!rutor.has(k)){const c=document.createElement("canvas");c.width=cell;c.height=cell;
  const g=c.getContext("2d");if(fl){g.translate(cell,0);g.scale(-1,1)} // flip: figuren tittar åt andra hållet (t.ex. lånade figurer från Fantasyvärlden)
  g.drawImage(ark,(nr%per)*cell,Math.floor(nr/per)*cell,cell,cell,0,0,cell,cell);rutor.set(k,c)}
 return rutor.get(k)}
// Första bilden som finns, bland flera namn och mappar
// En sak kan ligga i ett gemensamt ark: FIGURVAL.svard = {ark:"vapen_krigare", sta:12}. En egen fil med sakens namn går före.
function forsta(namnLista,mappLista,roll,vapen){for(const n of namnLista)for(const m of mappLista){const A=(window.FIGURVAL||{})[n],c=ruta(MAPP[m],n,roll,vapen)||(A&&A.ark?ruta(MAPP[m],A.ark,roll,vapen,A):null);if(c)return c}return null}

window.egenHjalte=(h,roll)=>{if(!h)return null;const v=window.vapenAv?vapenAv(h).id:h.vapen;
 // egen vald bild (från Ändra): används när hjälten står still
 const egen=h.bildval&&h.bildval[h.klass+"|"+v];
 if(egen!=null&&roll!=="anfall"){const n=h.id+"_"+h.klass,c=ruta(MAPP.figur,n,"sta",null,{...((window.FIGURVAL||{})[n]||{}),vapen:null,sta:egen<0?-egen-1:egen,vs:egen<0});if(c)return c} // negativt tal = vald bild som är vänd
 return forsta([h.id+"_"+v,h.id+"_"+h.klass,h.id],["figur"],roll,v)};
// Hela arket för hjältens klass, till bildväljaren under Ändra
window.hjalteArk=h=>{const n=h.id+"_"+h.klass,c=fil(MAPP.figur,n,true);if(!c)return null;const V=(window.FIGURVAL||{})[n]||{};return{c,cell:V.cell||32,flip:!!V.flip}};
window.egenMonster=(k,boss,roll)=>forsta([k],boss?["boss","figur"]:["figur","boss"],roll);
window.egenPerson=(k,roll)=>forsta([k],["figur","sak"],roll);
window.egenSak=k=>forsta([k],["sak","figur"]);
window.egenIkon=k=>forsta(["ikon_"+k],["ikon"]);
window.kortBild=namn=>fil(MAPP.bakgrund,namn,false);
// Byt en liten bild mot den egna bilden när den finns (ritas om när bilden har laddats)
window.medEgenBild=(cv,hamta)=>{const gammal=cv._rita;cv._rita=()=>{const b=hamta();if(!b){if(gammal)gammal();return}
 cv.width=b.width;cv.height=b.height;const g=cv.getContext("2d");g.imageSmoothingEnabled=false;g.clearRect(0,0,cv.width,cv.height);g.drawImage(b,0,0)};cv._rita();return cv};
// Startsidans och äventyrssidans stora bilder: kortbilden om den finns, annars som förut
window.medKort=(cv,namn)=>{const gammal=cv._rita,tv=cv._tv;delete cv._tv;cv._rita=()=>{const b=kortBild(namn);
 if(b){cv.width=320;cv.height=180;const g=cv.getContext("2d");g.imageSmoothingEnabled=false;ritaBakgrund(g,b,320,180);return}
 if(gammal)gammal();else if(tv&&window.drawTV){drawTV(cv,tv[0],tv[1]);delete cv._tv}};cv._rita();return cv};
window.egenGosedjur=(k,roll)=>forsta([k],["sak","figur"],roll);

// Rita en bakgrund på hela TV:n. Är den större än 320×180 (t.ex. 344×192) skärs kanterna bort lika mycket på alla sidor.
window.ritaBakgrund=function(g,b,W,H){const bw=b.naturalWidth||b.width,bh=b.naturalHeight||b.height;
 if(bw>=W&&bh>=H)g.drawImage(b,Math.floor((bw-W)/2),Math.floor((bh-H)/2),W,H,0,0,W,H);else g.drawImage(b,0,0,W,H)};
// Vilken bakgrundsfil hör till en bild på TV:n?
window.bakgrundBild=function(bild){
 if(typeof bild!=="string")return null;
 if(bild.startsWith("run|")){const p=bild.split("|"),kap=Math.min(2,Math.max(1,+p[2]||1));return fil(MAPP.bakgrund,p[1]+"_"+kap+"_"+(p[4]||"rum"),false)}
 return fil(MAPP.bakgrund,"berattelse_"+bild.split("|")[0],false)};

// Bilder som står still (till exempel korten på äventyrssidan) ritas om när en ny bild har laddats
function ritaOm(){clearTimeout(omritning);omritning=setTimeout(()=>{
 document.querySelectorAll("canvas").forEach(c=>{if(!c.isConnected)return;if(c._rita)c._rita();else if(c._tv&&window.drawTV)drawTV(c,c._tv[0],c._tv[1])})},150)}

// Rita en ruta: mitt på cx, fötterna på bot, storlek s (i TV:ns rutnät)
window.ritaRuta=function(g,c,cx,bot,s,{flip=false,alpha=1}={}){
 const x=cx-s/2,y=bot-s;g.save();g.globalAlpha=alpha;g.imageSmoothingEnabled=false;
 if(flip){g.translate(x+s,y);g.scale(-1,1);g.drawImage(c,0,0,s,s)}else g.drawImage(c,x,y,s,s);g.restore();return{x,y,w:s,h:s,skala:s/c.width}};

// Tydlig märkning så att man aldrig blandar ihop dev-kopian med det riktiga spelet
if(window.DEV){document.title="DEV – "+document.title;
 addEventListener("DOMContentLoaded",()=>{const d=document.createElement("div");d.textContent="DEV-KOPIA";
  d.style.cssText="position:fixed;left:8px;bottom:8px;z-index:9999;background:#c0392b;color:#fff;font:800 12px/1 Nunito,system-ui,sans-serif;padding:6px 9px;border-radius:6px;letter-spacing:.06em;pointer-events:none;opacity:.9";
  document.body.append(d)})}
})();
