/* Bland monster och tärningar – vilka rutor i bildarken som används.
   Varje ark är 8×8 rutor, numrerade 0–63 radvis uppifrån (0–7 är översta raden).
   sta = när figuren står still, anfall = när den anfaller. vapen = egna rutor för ett visst vapen.
   Saknas ett ark här används ruta 0. Säg till om du vill byta ruta, så ändrar jag. */
window.FIGURVAL={
 // Villes ark. "vapen" väljer rutor för ett visst vapen, annars gäller sta/anfall.
 ville_ninja:{sta:2,anfall:18,vapen:{klinga:{sta:3,anfall:19},dubbla_dolkar:{sta:17,anfall:25},katana:{sta:2,anfall:18},skuggkatana:{sta:20,anfall:44},giftdolkar:{sta:41,anfall:53},manklinga:{sta:24,anfall:61}}},
 ville_krigare:{sta:0,anfall:24,vapen:{svard:{sta:0,anfall:24},tvahandssvard:{sta:10,anfall:26},stridsyxa:{sta:11,anfall:27},flammsvard:{sta:4,anfall:20},askhammare:{sta:29,anfall:37},drakdrapare:{sta:6,anfall:47}}},
 ville_magiker:{sta:0,anfall:24,vapen:{stav:{sta:0,anfall:24},trollspo:{sta:1,anfall:9},runbok:{sta:3,anfall:11},stjarnstav:{sta:4,anfall:12},isstav:{sta:5,anfall:13},skuggstav:{sta:7,anfall:15}}},
 ville_bagskytt:{sta:0,anfall:28,vapen:{pilbage:{sta:0,anfall:28},kortbage:{sta:2,anfall:29},armborst:{sta:5,anfall:30},alvbage:{sta:6,anfall:36},eldbage:{sta:45,anfall:46},giftbage:{sta:7,anfall:62}}},
 ville_helare:{sta:0,anfall:24,vapen:{klubba:{sta:0,anfall:24},morgonstjarna:{sta:1,anfall:35},helig_stav:{sta:3,anfall:27},solklubba:{sta:4,anfall:36},livets_stav:{sta:6,anfall:46},valsignad_hammare:{sta:7,anfall:31}}},
 ville_bard:{sta:10,anfall:32,vapen:{varja:{sta:10,anfall:32},piska:{sta:11,anfall:34},forttrollad_luta:{sta:2,anfall:37},silvervarja:{sta:5,anfall:21},stormluta:{sta:3,anfall:24},ormpiska:{sta:7,anfall:31}}},
 bjorn:{sta:0,flip:true},
 kultist:{sta:0,flip:true},
 ratta:{sta:0,flip:true},
 varg:{sta:0,flip:true},
 bandit:{sta:0,flip:true},
 rovarhovding:{sta:0,flip:true},
 skelett:{sta:0,flip:true},
 spoke:{sta:0,flip:true},
 vatte:{sta:0,flip:true},
 krak:{sta:0,flip:true},
 eldprast:{sta:0,flip:true},
 dimvasen:{sta:0,flip:true},
 ent:{sta:0,flip:true},
 handlare:{sta:0,flip:true},
 greta:{sta:0,flip:true},
 bo:{sta:0,flip:true},
 fange_4:{sta:0,flip:true},
 eldklo:{sta:0,flip:true}
};
