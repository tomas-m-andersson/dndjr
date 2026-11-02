/* Bland monster och tärningar – gosedjur ("familiars").
   En hjälte kan ta med ett gosedjur. Det syns bredvid hjälten och har en egen specialförmåga
   som kan användas en gång per strid. Nya gosedjur läggs till här.
   Bilden ritas med bokstäver: varje bokstav är en färg i "pal". "." är genomskinligt. */
const GOSEDJUR={
 blackis:{namn:"Bläckis",djur:"Gul bläckfisk med åtta armar",agare:"Ville",
  rows:[
   "....YYY....",
   "...YYYYY...",
   "..YLLYYYY..",
   "..YWWYWWY..",
   "..YWEYWEY..",
   "..YPYMYPY..",
   "...YYYYY...",
   ".YY.Y.Y.YY.",
   "Y..YY.YY..Y",
   ".Y..Y.Y..Y."],
  pal:{Y:"#ffd23d",L:"#fff3a0",W:"#ffffff",E:"#2a1a10",P:"#ff8fa0",M:"#c0602a"},
  attack:{id:"g_blackmoln",namn:"Bläckis: Bläckmoln",info:"Bläckis sprutar bläck på alla fiender. De får −3 på sina anfall i 2 rundor. Träffar alltid",
   typ:"status",alla:true,effekt:"svag",n:3,rundor:2,rop:"Bläckis sträcker ut alla åtta armarna och sprutar ett stort moln av bläck!"}}
};
const GDCACHE={};
// Gosedjurets bild (med samma kontur och skuggning som resten av spelet)
function gosedjurCanvas(id){const G=GOSEDJUR[id];if(!G)return null;if(!GDCACHE[id])GDCACHE[id]=rendera(gridFrom(G.rows),{K:KONTUR,...G.pal});return GDCACHE[id]}
const gosedjurAv=h=>h&&GOSEDJUR[h.gosedjur]?h.gosedjur:null;
// Liten ruta med gosedjuret, till knappar och val
function gosedjurIkon(id,cls="small"){const s=gosedjurCanvas(id),c=document.createElement("canvas");c.width=s.width+4;c.height=s.height+4;c.getContext("2d").drawImage(s,2,2);
 c.className="px wicon "+cls+" gdikon";c.setAttribute("aria-hidden","true");return c}
