/* Bland monster och tärningar – egna bilder (den grafiska overhaulen) och dev-läget.

   DEV-LÄGE: ligger sidan i mappen /dev/ är det dev-kopian. Den sparar allt under egna nycklar
   i webbläsaren och i filen dev/hjaltar.json, så att det riktiga spelet aldrig påverkas.
   Koden är exakt samma i båda mapparna, så dev-kopian kan flyttas till det riktiga spelet rakt av.

   EGNA BILDER: finns en bildfil i mappen bilder/ används den, annars ritar spelet som förut.
   Figurer ritas på magenta (#FF00FF). Magentan blir genomskinlig och bilden beskärs till figuren. */
// KLASSISKA VERSIONEN: spelet som det såg ut före den stora grafiska uppdateringen (2026-11-14).
// Den sparar under egna nycklar och i klassisk/hjaltar.json, så den påverkar inte huvudspelet.
window.DEV=false;window.KLASSISK=true;
(function(){
const BAS="bilder/";
const lista=new Map();   // "mapp/namn" -> {status, c}
let antal=0,omritning=null;

// Magenta blir genomskinligt, och bilden beskärs runt figuren
function nyckla(img){
 const c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;
 const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(img,0,0);
 const d=g.getImageData(0,0,c.width,c.height),p=d.data,W=c.width;let x0=W,y0=c.height,x1=-1,y1=-1;
 for(let i=0;i<p.length;i+=4){const r=p[i],gr=p[i+1],b=p[i+2];
  if(r>140&&b>140&&gr<120&&Math.abs(r-b)<80&&gr<Math.min(r,b)-60){p[i+3]=0;continue}
  if(p[i+3]>8){const k=i>>2,x=k%W,y=(k-x)/W;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}
 if(x1<0)return null;g.putImageData(d,0,0);
 const t=document.createElement("canvas");t.width=x1-x0+1;t.height=y1-y0+1;t.getContext("2d").drawImage(c,-x0,-y0);return t}

// Hämta en bild. Ger null tills den har laddats (eller om den inte finns).
window.egenBild=function(){return null}; // den klassiska versionen använder bara de ritade pixelbilderna
window._oanvand=function(mapp,namn,figur=true){
 if(!namn)return null;const k=mapp+"/"+namn;let s=lista.get(k);
 if(!s){s={status:"laddar",c:null};lista.set(k,s);const img=new Image();
  img.onload=()=>{try{s.c=figur?nyckla(img):img}catch(e){s.c=null}s.status=s.c?"ok":"saknas";if(s.c){antal++;ritaOm()}};
  img.onerror=()=>{s.status="saknas"};img.src=BAS+k+".png"}
 return s.status==="ok"?s.c:null};
window.egnaBilderAntal=()=>antal;

// Bilder som inte rör sig (till exempel korten på äventyrssidan) ritas om när en ny bild har laddats
function ritaOm(){clearTimeout(omritning);omritning=setTimeout(()=>{
 document.querySelectorAll("canvas").forEach(c=>{if(c._tv&&c.isConnected&&window.drawTV)drawTV(c,c._tv[0],c._tv[1])})},150)}

// Rita en bild med en viss höjd, mitt på cx och med fötterna på bot
window.ritaBild=function(g,b,cx,bot,H,{flip=false,alpha=1}={}){
 const W=b.width*H/b.height,x=cx-W/2,y=bot-H;g.save();g.globalAlpha=alpha;g.imageSmoothingEnabled=true;g.imageSmoothingQuality="high";
 if(flip){g.translate(x+W,y);g.scale(-1,1);g.drawImage(b,0,0,W,H)}else g.drawImage(b,x,y,W,H);g.restore();return{x,y,w:W,h:H,skala:H/b.height}};

// Vilken bakgrundsfil hör till en bild på TV:n?
window.bakgrundBild=function(bild){
 if(typeof bild!=="string")return null;
 if(bild.startsWith("run|")){const p=bild.split("|"),kap=Math.min(2,Math.max(1,+p[2]||1));return egenBild("bakgrunder",p[1]+"_"+kap+"_"+(p[4]||"rum"),false)}
 return egenBild("bakgrunder","berattelse_"+bild.split("|")[0],false)};

// Tydlig märkning så att man aldrig blandar ihop dev-kopian med det riktiga spelet
if(window.KLASSISK){document.title=document.title+" (klassisk)";
 addEventListener("DOMContentLoaded",()=>{const d=document.createElement("div");d.textContent="KLASSISK VERSION";
  d.style.cssText="position:fixed;left:8px;bottom:8px;z-index:9999;background:#6b4f1d;color:#fff;font:800 12px/1 Nunito,system-ui,sans-serif;padding:6px 9px;border-radius:6px;letter-spacing:.06em;pointer-events:none;opacity:.9";
  document.body.append(d)})}
})();
