/* Bland monster och tärningar – vilka rutor i bildarken som används.
   Varje ark är 8×8 rutor, numrerade 0–63 radvis uppifrån (0–7 är översta raden).
   sta = när figuren står still, anfall = när den anfaller. vapen = egna rutor för ett visst vapen.
   Saknas ett ark här används ruta 0. Säg till om du vill byta ruta, så ändrar jag. */
window.FIGURVAL={
 // Villes ark. "vapen" väljer rutor för ett visst vapen, annars gäller sta/anfall.
 ville_ninja:{sta:20,anfall:24,vapen:{dubbla_dolkar:{sta:38,anfall:19},giftdolkar:{sta:38,anfall:19}}},
 ville_krigare:{sta:1,anfall:13},
 ville_magiker:{sta:0,anfall:21,vapen:{runbok:{sta:31,anfall:22},trollspo:{sta:7,anfall:22}}},
 ville_bagskytt:{sta:0,anfall:44},
 ville_helare:{sta:8,anfall:14,vapen:{helig_stav:{sta:16,anfall:19},livets_stav:{sta:16,anfall:19}}},
 ville_bard:{sta:48,anfall:51,vapen:{forttrollad_luta:{sta:32,anfall:45},stormluta:{sta:32,anfall:45}}},
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
