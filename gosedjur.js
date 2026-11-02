/* Bland monster och tärningar – gosedjur ("familiars").
   En hjälte kan ta med ett gosedjur. Det syns bredvid hjälten och har en egen specialförmåga
   som kan användas en gång per strid. Nya gosedjur läggs till här.
   Bilden ritas med bokstäver: varje bokstav är en färg i "pal". "." är genomskinligt. */
const GOSEDJUR={
 blackis:{namn:"Bläckis",djur:"Gul bläckfisk med åtta armar",agare:"Ville",
  rows:[
   "...YYYYY...",
   "..YYYYYYY..",
   "..YLYYYYY..",
   "..YWWYWWY..",
   "..YWEYWEY..",
   "..YYYYYYY..",
   "..YYYYYYY..",
   ".YY.Y.Y.YY.",
   "Y..YY.YY..Y",
   ".Y..Y.Y..Y."],
  pal:{Y:"#ffd23d",L:"#fff3a0",W:"#ffffff",E:"#2a1a10"},
  attack:{id:"g_blackmoln",namn:"Bläckis: Bläckmoln",info:"Bläckis sprutar bläck på alla fiender. De får −3 på sina anfall i 2 rundor. Träffar alltid",
   typ:"status",alla:true,effekt:"svag",n:3,rundor:2,rop:"Bläckis sträcker ut alla åtta armarna och sprutar ett stort moln av bläck!"}},
 tigris:{namn:"Tigris",djur:"Liten vit tiger med svarta ränder och blå ögon",agare:"Svante",
  rows:[
   ".WB...BW.",
   "WWBBBBBWW",
   "WBWWWWWBW",
   "WEPWWWPEW",
   "BWWMNMWWB",
   ".WWMMMWW.",
   "..WBWBW..",
   ".WBIIIBW.",
   ".BWIIIWB.",
   ".II...II."],
  pal:{W:"#f4f4f0",B:"#2a2a33",E:"#4ab8e8",P:"#101018",M:"#efe2cc",N:"#1a1a22",I:"#e3dccd"},
  attack:{id:"g_tigerklo",namn:"Tigris: Tigerklös",info:"Tigris hoppar på en fiende och klöser: 2d6 skada som alltid träffar, och fienden får −2 på sina anfall i 2 rundor",
   typ:"auto",skada:"2d6",effekt:"svag",n:2,rundor:2,stil:"klo",rop:"Tigris fräser, tar sats och hoppar rakt på {mal} med vassa klor!"}}
};
const GDCACHE={};
// Gosedjurets bild (med samma kontur och skuggning som resten av spelet)
function gosedjurCanvas(id){const G=GOSEDJUR[id];if(!G)return null;if(!GDCACHE[id])GDCACHE[id]=rendera(gridFrom(G.rows),{K:KONTUR,...G.pal});return GDCACHE[id]}
const gosedjurAv=h=>h&&GOSEDJUR[h.gosedjur]?h.gosedjur:null;
// Liten ruta med gosedjuret, till knappar och val
function gosedjurIkon(id,cls="small"){const s=gosedjurCanvas(id),c=document.createElement("canvas");c.width=s.width+4;c.height=s.height+4;c.getContext("2d").drawImage(s,2,2);
 c.className="px wicon "+cls+" gdikon";c.setAttribute("aria-hidden","true");return c}
