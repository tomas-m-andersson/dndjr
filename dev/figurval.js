/* Bland monster och tärningar – vilka rutor i bildarken som används.
   Varje ark är 8×8 rutor, numrerade 0–63 radvis uppifrån (0–7 är översta raden).
   sta = när figuren står still, anfall = när den anfaller. vapen = egna rutor för ett visst vapen.
   vs/va = vänd just stå-/anfallsbilden. flip = vänd figuren (lånade figurer från Fantasyvärlden tittar åt andra hållet). cell = rutans storlek om den inte är 32.
   ark = saken ligger i ett gemensamt ark. Saknas ett namn här används ruta 0. */
window.FIGURVAL={
 appikon:{sta:1}, // appikonen ligger i ruta 1 (4×4-ark)
 // Hjältarna. "vapen" väljer rutor för ett visst vapen, annars gäller sta/anfall.
 ville_ninja:{sta:2,anfall:18,vapen:{klinga:{sta:3,anfall:19},dubbla_dolkar:{sta:17,anfall:25},katana:{sta:2,anfall:18},skuggkatana:{sta:20,anfall:44,va:true},giftdolkar:{sta:41,anfall:53},manklinga:{sta:24,anfall:61}}},
 ville_krigare:{sta:0,anfall:24,vapen:{svard:{sta:0,anfall:24},tvahandssvard:{sta:10,anfall:26},stridsyxa:{sta:11,anfall:27},flammsvard:{sta:4,anfall:20},askhammare:{sta:29,anfall:37},drakdrapare:{sta:6,anfall:47}}},
 ville_magiker:{sta:0,anfall:24,vapen:{stav:{sta:0,anfall:24},trollspo:{sta:1,anfall:9},runbok:{sta:3,anfall:11,vs:true,va:true},stjarnstav:{sta:4,anfall:12},isstav:{sta:5,anfall:13},skuggstav:{sta:7,anfall:15}}},
 ville_bagskytt:{sta:0,anfall:28,vapen:{pilbage:{sta:0,anfall:28,vs:true},kortbage:{sta:2,anfall:29},armborst:{sta:5,anfall:30},alvbage:{sta:6,anfall:36},eldbage:{sta:45,anfall:46},giftbage:{sta:7,anfall:62}}},
 ville_helare:{sta:0,anfall:24,vapen:{klubba:{sta:0,anfall:24},morgonstjarna:{sta:1,anfall:35,va:true},helig_stav:{sta:3,anfall:27,va:true},solklubba:{sta:4,anfall:36},livets_stav:{sta:6,anfall:46},valsignad_hammare:{sta:7,anfall:31}}},
 ville_bard:{sta:10,anfall:32,vapen:{varja:{sta:10,anfall:32},piska:{sta:11,anfall:34},forttrollad_luta:{sta:2,anfall:37},silvervarja:{sta:5,anfall:21},stormluta:{sta:3,anfall:24},ormpiska:{sta:7,anfall:31}}},
 tomas_krigare:{sta:0,anfall:16,vapen:{svard:{sta:0,anfall:16},tvahandssvard:{sta:2,anfall:18},stridsyxa:{sta:3,anfall:29},flammsvard:{sta:6,anfall:22},askhammare:{sta:7,anfall:23},drakdrapare:{sta:36,anfall:38,vs:true}}},
 tomas_magiker:{sta:0,anfall:8,vapen:{stav:{sta:0,anfall:8},trollspo:{sta:1,anfall:9},runbok:{sta:3,anfall:11,vs:true},stjarnstav:{sta:4,anfall:12},isstav:{sta:5,anfall:13},skuggstav:{sta:7,anfall:15}}},
 tomas_bagskytt:{sta:0,anfall:16,vapen:{pilbage:{sta:0,anfall:16,vs:true,va:true},kortbage:{sta:2,anfall:18,vs:true,va:true},armborst:{sta:3,anfall:35,vs:true,va:true},alvbage:{sta:4,anfall:36},eldbage:{sta:45,anfall:46},giftbage:{sta:6,anfall:56}}},
 tomas_ninja:{sta:2,anfall:18,vapen:{klinga:{sta:3,anfall:19},dubbla_dolkar:{sta:1,anfall:17},katana:{sta:2,anfall:18},skuggkatana:{sta:6,anfall:44,va:true},giftdolkar:{sta:4,anfall:20},manklinga:{sta:22,anfall:38}}},
 tomas_helare:{sta:0,anfall:8,vapen:{klubba:{sta:0,anfall:8},morgonstjarna:{sta:10,anfall:18},helig_stav:{sta:3,anfall:12},solklubba:{sta:4,anfall:13},livets_stav:{sta:5,anfall:53},valsignad_hammare:{sta:6,anfall:14}}},
 tomas_bard:{sta:0,anfall:32,vapen:{varja:{sta:0,anfall:32},piska:{sta:11,anfall:27},forttrollad_luta:{sta:24,anfall:25},silvervarja:{sta:5,anfall:37},stormluta:{sta:53,anfall:54},ormpiska:{sta:15,anfall:61}}},
 linda_krigare:{sta:4,anfall:5,vapen:{svard:{sta:4,anfall:5},tvahandssvard:{sta:16,anfall:41},stridsyxa:{sta:12,anfall:13},flammsvard:{sta:28,anfall:36},askhammare:{sta:37,anfall:45},drakdrapare:{sta:62,anfall:63}}},
 linda_magiker:{sta:1,anfall:9,vapen:{stav:{sta:1,anfall:6},trollspo:{sta:9,anfall:14},runbok:{sta:17,anfall:19},stjarnstav:{sta:24,anfall:28},isstav:{sta:32,anfall:36},skuggstav:{sta:40,anfall:44}}},
 linda_bagskytt:{sta:0,anfall:32,vapen:{pilbage:{sta:0,anfall:32},kortbage:{sta:1,anfall:33},armborst:{sta:20,anfall:43},alvbage:{sta:5,anfall:37},eldbage:{sta:6,anfall:14},giftbage:{sta:7,anfall:15}}},
 linda_ninja:{sta:2,anfall:26,vapen:{klinga:{sta:2,anfall:10},dubbla_dolkar:{sta:17,anfall:21,vs:true},katana:{sta:25,anfall:27},skuggkatana:{sta:32,anfall:36},giftdolkar:{sta:40,anfall:44},manklinga:{sta:48,anfall:52}}},
 linda_helare:{sta:8,anfall:16,vapen:{klubba:{sta:8,anfall:16},morgonstjarna:{sta:9,anfall:25},helig_stav:{sta:11,anfall:19},solklubba:{sta:4,anfall:12},livets_stav:{sta:5,anfall:13},valsignad_hammare:{sta:7,anfall:15}}},
 linda_bard:{sta:1,anfall:25,vapen:{varja:{sta:1,anfall:20},piska:{sta:2,anfall:18},forttrollad_luta:{sta:5,anfall:22},silvervarja:{sta:36,anfall:44},stormluta:{sta:7,anfall:31},ormpiska:{sta:60,anfall:61}}},
 svante_krigare:{sta:3,anfall:32,vapen:{svard:{sta:3,anfall:32,vs:true},tvahandssvard:{sta:25,anfall:41},stridsyxa:{sta:21,anfall:42},flammsvard:{sta:36,anfall:52},askhammare:{sta:53,anfall:61},drakdrapare:{sta:55,anfall:63}}},
 svante_magiker:{sta:0,anfall:8,vapen:{stav:{sta:0,anfall:8},trollspo:{sta:1,anfall:9},runbok:{sta:3,anfall:11},stjarnstav:{sta:4,anfall:12},isstav:{sta:5,anfall:13},skuggstav:{sta:7,anfall:15}}},
 svante_bagskytt:{sta:0,anfall:16,vapen:{pilbage:{sta:0,anfall:16,vs:true,va:true},kortbage:{sta:1,anfall:17},armborst:{sta:19,anfall:35},alvbage:{sta:4,anfall:12},eldbage:{sta:5,anfall:13},giftbage:{sta:7,anfall:15}}},
 svante_ninja:{sta:4,anfall:20,vapen:{klinga:{sta:4,anfall:20},dubbla_dolkar:{sta:17,anfall:21},katana:{sta:32,anfall:36},skuggkatana:{sta:40,anfall:44},giftdolkar:{sta:48,anfall:52},manklinga:{sta:56,anfall:57}}},
 svante_helare:{sta:8,anfall:16,vapen:{klubba:{sta:8,anfall:16},morgonstjarna:{sta:1,anfall:9},helig_stav:{sta:3,anfall:11},solklubba:{sta:4,anfall:12},livets_stav:{sta:6,anfall:14},valsignad_hammare:{sta:7,anfall:15}}},
 svante_bard:{sta:1,anfall:9,vapen:{varja:{sta:1,anfall:9},piska:{sta:16,anfall:24},forttrollad_luta:{sta:32,anfall:33},silvervarja:{sta:5,anfall:13},stormluta:{sta:36,anfall:44},ormpiska:{sta:20,anfall:21}}},
 benjamin_krigare:{sta:1,anfall:9,vapen:{svard:{sta:1,anfall:9},tvahandssvard:{sta:2,anfall:10,vs:true},stridsyxa:{sta:3,anfall:11,vs:true},flammsvard:{sta:4,anfall:12,vs:true},askhammare:{sta:5,anfall:13,vs:true,va:true},drakdrapare:{sta:7,anfall:15,vs:true,va:true}}},
 benjamin_magiker:{sta:0,anfall:16,vapen:{stav:{sta:0,anfall:16},trollspo:{sta:18,anfall:26},runbok:{sta:11,anfall:27},stjarnstav:{sta:5,anfall:13},isstav:{sta:6,anfall:14},skuggstav:{sta:7,anfall:15}}},
 benjamin_bagskytt:{sta:0,anfall:16,vapen:{pilbage:{sta:0,anfall:16,vs:true},kortbage:{sta:2,anfall:18},armborst:{sta:19,anfall:43,va:true},alvbage:{sta:4,anfall:12},eldbage:{sta:5,anfall:21},giftbage:{sta:7,anfall:15}}},
 benjamin_ninja:{sta:1,anfall:33,vapen:{klinga:{sta:1,anfall:33},dubbla_dolkar:{sta:2,anfall:34,va:true},katana:{sta:3,anfall:35,va:true},skuggkatana:{sta:29,anfall:30,vs:true,va:true},giftdolkar:{sta:48,anfall:50},manklinga:{sta:52,anfall:53}}},
 benjamin_helare:{sta:1,anfall:9,vapen:{klubba:{sta:1,anfall:9},morgonstjarna:{sta:11,anfall:13},helig_stav:{sta:4,anfall:32},solklubba:{sta:6,anfall:30},livets_stav:{sta:14,anfall:36},valsignad_hammare:{sta:7,anfall:31,va:true}}},
 benjamin_bard:{sta:0,anfall:24,vapen:{varja:{sta:0,anfall:24},piska:{sta:3,anfall:6},forttrollad_luta:{sta:8,anfall:9},silvervarja:{sta:5,anfall:37},stormluta:{sta:16,anfall:17},ormpiska:{sta:22,anfall:23}}},
 sally_katt:{sta:0,anfall:5},
 // Gosedjuren
 blackis:{sta:0,vs:true,anfall:39},tigris:{sta:0,vs:true,anfall:19},
 // Monster och personer (sta, anfall)
 askskelett:{sta:0,anfall:5},bandit:{sta:0,anfall:12,flip:true},bjorn:{sta:0,anfall:5,flip:true},bo:{sta:0,flip:true},dimvarg:{sta:0,anfall:4},dimvasen:{sta:0,anfall:1},
 eldimp:{sta:0,anfall:4,flip:true},eldprast:{sta:0,anfall:4,flip:true},eldsalamander:{sta:0,anfall:4},ent:{cell:32,sta:0,anfall:4,flip:true},fladdermus:{sta:0,anfall:2},gargoyl:{sta:0,anfall:1,flip:true},
 giftspindel:{sta:0,anfall:5},haxa:{sta:0,anfall:2,flip:true},irrbloss:{sta:0,anfall:9},kobold:{sta:0,anfall:7,flip:true},krak:{sta:0,anfall:1,flip:true},krakor:{sta:0,anfall:1},
 kultist:{sta:0,anfall:4,flip:true},lavahund:{sta:0,anfall:9},levande_rustning:{sta:0,anfall:1},magmaslem:{sta:0,anfall:6},nekromantiker:{sta:0,anfall:5,flip:true},orm:{sta:0,anfall:5,flip:true},
 ratta:{sta:0,anfall:1,flip:true},rovarhovding:{sta:0,anfall:5,flip:true},skelett:{sta:0,anfall:1,flip:true},skuggling:{sta:0,anfall:1},slem:{sta:0,anfall:4},spindel:{sta:0,anfall:5},
 spoke:{sta:0,anfall:10},spokriddare:{sta:0,anfall:1},svampman:{sta:0,anfall:1,flip:true},troll:{sta:0,anfall:4},vampyrfladdermus:{sta:0,anfall:2},varg:{sta:0,anfall:10,flip:true},
 varulv:{sta:0,anfall:2,flip:true},vatte:{sta:0,anfall:1,flip:true},vattesjaman:{sta:0,anfall:3,flip:true},vildsvin:{sta:0,anfall:8},
 handlare:{sta:0},
 greta:{sta:0,flip:true},
 fange_1:{sta:0},
 // personerna i rummen "någon behöver hjälp" och handlarna
 resenar_dvarg:{sta:0},resenar_elev:{sta:0,flip:true},resenar_riddare:{sta:1},resenar_spelman:{sta:0},resenar_tomte:{sta:0,flip:true},
 handlare_dam:{sta:0,bred:64},handlare_rav:{sta:2},handlare_dvarg:{sta:0,flip:true},handlare_mantel:{sta:3},
 fange_3:{sta:0,flip:true},
 // Bossar: arken i mappen Bossar har 32×32-rutor (utom Eldklo som har 64×64)
 eldklo:{sta:0,anfall:1,flip:true},
 basilisk:{cell:32,sta:0,anfall:2},dimfrun:{cell:32,sta:0,anfall:2,flip:true},golem:{cell:32,sta:0,anfall:2},grottroll:{cell:32,sta:0,anfall:2,flip:true},jattemask:{cell:32,sta:0,anfall:2},mork_riddare:{cell:32,sta:0,anfall:2},skuggan:{cell:32,sta:0,anfall:2},vampyr:{cell:32,sta:0,anfall:2,flip:true,storlek:3},
 // Trädväktaren finns både som vanlig figur och som boss. Bossarket (32×32) går före när han är boss.
 // Saker i gemensamma ark: vapen, föremål, saker i rummen och ikoner till knapparna
 svard:{ark:"vapen_krigare",sta:0},tvahandssvard:{ark:"vapen_krigare",sta:1},stridsyxa:{ark:"vapen_krigare",sta:3},flammsvard:{ark:"vapen_krigare",sta:4},askhammare:{ark:"vapen_krigare",sta:6},drakdrapare:{ark:"vapen_krigare",sta:7},
 stav:{ark:"vapen_magiker",sta:0},trollspo:{ark:"vapen_magiker",sta:1},runbok:{ark:"vapen_magiker",sta:2},stjarnstav:{ark:"vapen_magiker",sta:4},isstav:{ark:"vapen_magiker",sta:5},skuggstav:{ark:"vapen_magiker",sta:7},
 pilbage:{ark:"vapen_bagskytt",sta:0},kortbage:{ark:"vapen_bagskytt",sta:1},armborst:{ark:"vapen_bagskytt",sta:3},alvbage:{ark:"vapen_bagskytt",sta:4},eldbage:{ark:"vapen_bagskytt",sta:6},giftbage:{ark:"vapen_bagskytt",sta:7},
 klinga:{ark:"vapen_ninja",sta:0},dubbla_dolkar:{ark:"vapen_ninja",sta:1},katana:{ark:"vapen_ninja",sta:2},skuggkatana:{ark:"vapen_ninja",sta:4},giftdolkar:{ark:"vapen_ninja",sta:5},manklinga:{ark:"vapen_ninja",sta:6},
 klubba:{ark:"vapen_helare",sta:0},morgonstjarna:{ark:"vapen_helare",sta:1},helig_stav:{ark:"vapen_helare",sta:2},solklubba:{ark:"vapen_helare",sta:4},livets_stav:{ark:"vapen_helare",sta:5},valsignad_hammare:{ark:"vapen_helare",sta:6},
 varja:{ark:"vapen_bard",sta:0},piska:{ark:"vapen_bard",sta:1},forttrollad_luta:{ark:"vapen_bard",sta:2},silvervarja:{ark:"vapen_bard",sta:3},stormluta:{ark:"vapen_bard",sta:4},ormpiska:{ark:"vapen_bard",sta:5},
 guld:{ark:"foremal",sta:0},dryck:{ark:"foremal",sta:1},stor_dryck:{ark:"foremal",sta:2},ryggsack:{ark:"foremal",sta:3},magiskt_vapen:{ark:"foremal",sta:4},skyddsring:{ark:"foremal",sta:5},karta:{ark:"foremal",sta:6},nyckel:{ark:"foremal",sta:7},klor:{ark:"foremal",sta:8},logga:{ark:"foremal",sta:9},
 kista:{ark:"rumsaker",sta:0},kista_oppen:{ark:"rumsaker",sta:1},brunn:{ark:"rumsaker",sta:2},altare:{ark:"rumsaker",sta:4},lagereld:{ark:"rumsaker",sta:6},
 ikon_kraftslag:{ark:"ikoner_1",sta:0},ikon_dubbelhugg:{ark:"ikoner_1",sta:1},ikon_virvelhugg:{ark:"ikoner_1",sta:2},ikon_skoldslag:{ark:"ikoner_1",sta:3},ikon_utmana:{ark:"ikoner_1",sta:4},ikon_andra_andningen:{ark:"ikoner_1",sta:5},ikon_magisk_pil:{ark:"ikoner_1",sta:7},ikon_eldklot:{ark:"ikoner_1",sta:11},ikon_frostblixt:{ark:"ikoner_1",sta:12},ikon_blixt:{ark:"ikoner_1",sta:14},ikon_somnformel:{ark:"ikoner_1",sta:22},ikon_skyddsbubbla:{ark:"ikoner_1",sta:15},
 ikon_sikta_noga:{ark:"ikoner_2",sta:0},ikon_dubbelskott:{ark:"ikoner_2",sta:1},ikon_pilregn:{ark:"ikoner_2",sta:2},ikon_benskott:{ark:"ikoner_2",sta:4},ikon_brinnande_pil:{ark:"ikoner_2",sta:5},ikon_giftpil:{ark:"ikoner_2",sta:6},ikon_smygattack:{ark:"ikoner_2",sta:22},ikon_shuriken:{ark:"ikoner_2",sta:15},ikon_tryckpunkt:{ark:"ikoner_2",sta:36},ikon_giftklinga:{ark:"ikoner_2",sta:29},ikon_rokbomb:{ark:"ikoner_2",sta:30},ikon_skuggsteg:{ark:"ikoner_2",sta:31},
 ikon_lakande_ord:{ark:"ikoner_3",sta:0},ikon_helande_vag:{ark:"ikoner_3",sta:4},ikon_valsignelse:{ark:"ikoner_3",sta:8},ikon_heligt_ljus:{ark:"ikoner_3",sta:12},ikon_heligt_slag:{ark:"ikoner_3",sta:16},ikon_vack:{ark:"ikoner_3",sta:20},ikon_peppsang:{ark:"ikoner_3",sta:24},ikon_hanfullt_skamt:{ark:"ikoner_3",sta:28},ikon_vaggvisa:{ark:"ikoner_3",sta:32},ikon_hjaltesang:{ark:"ikoner_3",sta:36},ikon_dissonans:{ark:"ikoner_3",sta:40},ikon_snabba_fingrar:{ark:"ikoner_3",sta:44},
 ikon_klosattack:{ark:"ikoner_4",sta:0},ikon_hoppa_ansiktet:{ark:"ikoner_4",sta:3},ikon_frasa:{ark:"ikoner_4",sta:5},ikon_kasta_sig:{ark:"ikoner_4",sta:12},ikon_nio_liv:{ark:"ikoner_4",sta:13},ikon_leka:{ark:"ikoner_4",sta:14},ikon_anfall:{ark:"ikoner_4",sta:6},ikon_dryck:{ark:"ikoner_4",sta:54},ikon_fly:{ark:"ikoner_4",sta:47},
};

// Vilka rutor i hjältarnas ark som visar vilket vapen. Bildväljaren under Ändra visar bara rutorna för hjältens vapen.
window.VAPENRUTOR={
 benjamin_krigare:{svard:[0,1,9,16,24,32,46,48,51,56,57],tvahandssvard:[2,10,17,22,26,35,42,50,58],stridsyxa:[3,11,18,19,27,43,59],flammsvard:[4,12,20,28,36,44,52,60],askhammare:[5,13,21,29,37,45,53,61],drakdrapare:[7,15,23,31,39,47,62,63]},
 tomas_krigare:{svard:[0,1,5,9,16,24,35,55,56,57],tvahandssvard:[2,10,12,13,18,19,21,27,30,50],stridsyxa:[3,4,11,29,58,59],flammsvard:[6,14,20,22,28,60,62],askhammare:[7,15,17,23,25,37,45,46,61],drakdrapare:[31,36,38,39,41,42,43,44,63]},
 ville_krigare:{svard:[0,3,24,32,35,38,40,54,56,57],tvahandssvard:[10,25,26,41,42,49,50,58],stridsyxa:[11,27,43,51,59],flammsvard:[4,12,20,28,36,44,52,60],askhammare:[13,21,22,29,30,37,45,46,53,61],drakdrapare:[6,7,14,15,31,47,62,63]},
 linda_krigare:{svard:[3,4,5,6,40,56,57],tvahandssvard:[16,21,26,41,42,58],stridsyxa:[12,13,14,20,22,35,43,51,59],flammsvard:[28,29,30,36,44,52,60],askhammare:[37,38,45,46,53,54,61],drakdrapare:[62,63]},
 svante_krigare:{svard:[0,1,2,3,4,5,6,8,9,10,11,12,13,32,34,39],tvahandssvard:[25,33,35,40,41,43,51],stridsyxa:[17,18,19,20,21,26,37,38,42,44,45,46],flammsvard:[14,36,52,60],askhammare:[53,54,61,62],drakdrapare:[7,15,55,63]},
 tomas_magiker:{stav:[0,8,16,24,32,40,48,56],trollspo:[1,2,9,10,17,18,25,26,33,34,41,42,49,50,57,58],runbok:[3,11,19,27,35,43,51,59],stjarnstav:[4,12,20,28,36,44,52,60],isstav:[5,13,21,29,37,45,53,61],skuggstav:[6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]},
 ville_magiker:{stav:[0,8,16,24,32,40,48,56],trollspo:[1,2,9,10,17,18,25,26,33,34,41,42,49,50,57,58],runbok:[3,11,19,27,35,43,51,59],stjarnstav:[4,12,20,28,36,44,52,60],isstav:[5,13,21,29,37,45,53,61],skuggstav:[6,7,15,23,30,31,38,47,54,55,62]},
 linda_magiker:{stav:[0,1,2,3,4,5,6,7,48,49,56,57],trollspo:[8,9,10,11,14,15,51],runbok:[16,17,18,19,20,21,22,23],stjarnstav:[24,25,26,27,28,29,30,31,52,60],isstav:[32,33,34,35,36,37,38,39,61,62],skuggstav:[40,41,42,43,44,45,46,47,53,54,55,63]},
 svante_magiker:{stav:[0,8,16,24,32,40,48,56],trollspo:[1,2,9,10,17,18,25,26,33,34,41,42,49,50,57,58],runbok:[3,11,19,27,35,43,51,59],stjarnstav:[4,12,20,28,36,44,52,60],isstav:[5,13,21,29,37,45,53,61],skuggstav:[6,7,14,15,22,23,31,39,47,55,63]},
 benjamin_magiker:{stav:[0,1,16,17,25,32,40,48,49,53,56],trollspo:[2,18,26,33,50,57,58],runbok:[3,4,11,12,19,27,35],stjarnstav:[5,13,20,21,28,29,36,37,44,45,52,60],isstav:[6,14,22,30,38,46,54],skuggstav:[7,15,23,31,39,47,55,62]},
 tomas_bagskytt:{pilbage:[0,16,20,24,32,41,42,57],kortbage:[1,2,5,17,18,21,26,33],armborst:[3,19,23,34,35,43,59],alvbage:[4,22,28,36,37,38,44,52,54,60],eldbage:[40,45,46,48,49,50],giftbage:[6,56,58,61,62,63]},
 ville_bagskytt:{pilbage:[0,3,4,24,27,28,32,40,48,56,57,58,59],kortbage:[1,2,9,10,17,18,25,26,29,33,34,49],armborst:[5,30,35,41,42,43,44,50],alvbage:[6,36,37,52,60],eldbage:[45,46,54],giftbage:[7,47,55,61,62,63]},
 linda_bagskytt:{pilbage:[0,8,32,40],kortbage:[1,2,9,11,16,17,18,30,33,34,41,42,60],armborst:[4,12,20,21,22,35,43,44,45],alvbage:[5,13,36,37,38,59],eldbage:[6,14,46,61],giftbage:[7,15,47,63]},
 svante_bagskytt:{pilbage:[0,8,16,32,40,48,56],kortbage:[1,3,9,10,11,17,18,33,41,49,50,57],armborst:[19,35,51],alvbage:[4,12,20,28,36,44,52,60],eldbage:[5,13,21,29,37,45,53,61],giftbage:[7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]},
 benjamin_bagskytt:{pilbage:[0,3,8,16,24,27,32,40,48],kortbage:[1,2,9,10,11,17,18,25,26,33,34,35,41,42,49,50,51,57],armborst:[19,43,56,58,59],alvbage:[4,12,13,20,28,36,44,52,60],eldbage:[5,21,29,45,53,61],giftbage:[6,7,15,22,23,30,31,46,47,54,55,62,63]},
 tomas_ninja:{klinga:[3,16,19,31,32,33],dubbla_dolkar:[0,1,17,21,40,41],katana:[2,18,36],skuggkatana:[6,8,42,43,44,45,46,47],giftdolkar:[4,5,20,48,49,52,53,54,55,57],manklinga:[22,37,38,50,51,63]},
 ville_ninja:{klinga:[1,3,19,28,35,39,46],dubbla_dolkar:[4,17,25],katana:[2,18,37,43],skuggkatana:[6,20,21,22,44,45],giftdolkar:[5,7,23,41,42,47,53,54,59],manklinga:[24,36,55,61,62]},
 linda_ninja:{klinga:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],dubbla_dolkar:[16,17,18,19,20,21,22,23],katana:[25,26,27,56,57],skuggkatana:[28,29,30,31,32,33,34,35,36,37,38,39,60,61],giftdolkar:[40,41,42,43,44,45,46,47,62,63],manklinga:[48,49,50,51,52,53,54,55]},
 svante_ninja:{klinga:[4,5,7,13,15,16,20,23,60],dubbla_dolkar:[6,17,18,21,24,25,26,27,28,29,30,31],katana:[32,33,34,35,36,39],skuggkatana:[40,41,42,43,44,45,46,47],giftdolkar:[38,48,49,50,51,52,53,54,55],manklinga:[37,56,57,59,61,62,63]},
 benjamin_ninja:{klinga:[1,5,6,7,12,14,17,32,33,39],dubbla_dolkar:[2,4,8,9,10,11,13,34,36,37,62],katana:[3,16,26,27,35,38,43],skuggkatana:[20,21,22,28,29,30,31,45,46,47],giftdolkar:[48,49,50,51,60,61],manklinga:[41,44,52,53,54,63]},
 tomas_helare:{klubba:[0,1,2,8,9,16,24,32,40,48,56,57,58],morgonstjarna:[10,17,18,26,33,34,41,49,50],helig_stav:[3,12,19,20,36,42,44],solklubba:[4,13,21,28,29,35,37,43,45],livets_stav:[5,52,53,54],valsignad_hammare:[6,7,14,15,22,23,30,31,38,46,47,60,61,62,63]},
 ville_helare:{klubba:[0,8,24,25,32,48,56],morgonstjarna:[1,9,10,33,34,35],helig_stav:[2,3,27,28,41,44,59],solklubba:[4,11,12,26,29,36],livets_stav:[5,6,13,14,30,37,38,45,46],valsignad_hammare:[7,15,31,39,47]},
 linda_helare:{klubba:[3,8,16,24,32,40,48,56],morgonstjarna:[9,10,17,18,25,26,33,34,41,42,49,50,57,58],helig_stav:[11,19,35,43,59],solklubba:[4,12,20,27,28,36,44,51,52],livets_stav:[5,6,13,14,21,22,29,30,37,38,45,46,53,60,61],valsignad_hammare:[7,15,54,55,62]},
 svante_helare:{klubba:[0,8,16,24,32,40,48,56],morgonstjarna:[1,9,17,26,33,42,49,50,57,58],helig_stav:[3,11,19,27,35,43,51,59],solklubba:[4,5,12,13,21,36,44,52,60],livets_stav:[6,14,22,30,37,38,45,46,53,54,61],valsignad_hammare:[7,15,23,39,47,55,62,63]},
 benjamin_helare:{klubba:[1,2,8,9,19,24,25,28,48,49,51,52,56,57],morgonstjarna:[11,12,13,21,26,27,29,53,54,62],helig_stav:[4,5,32,33,34,35,46],solklubba:[6,30],livets_stav:[14,36,38,59,60],valsignad_hammare:[7,31,47,55]},
 tomas_bard:{varja:[0,1,2,3,4,6,7,8,32,33,35],piska:[11,12,26,27,34],forttrollad_luta:[24,25,28,29,30,31,51,52,57,58],silvervarja:[5,36,37,44,45,46],stormluta:[47,53,54,55],ormpiska:[15,59,60,61,62,63]},
 ville_bard:{varja:[10,23,32,33,40,43],piska:[6,11,14,15,34,35],forttrollad_luta:[1,2,17,18,36,37,38,39,60,61],silvervarja:[5,20,21,22],stormluta:[3,24,25,28,29,46,47,62,63],ormpiska:[7,30,31,44,45]},
 linda_bard:{varja:[1,16,20,21,24,28,29,32,37,40,45,48,51,52,56],piska:[2,3,18,19,34,42,50,58,59],forttrollad_luta:[5,6,22,30,38,39,46,47],silvervarja:[4,36,44],stormluta:[7,23,31,53,54,55],ormpiska:[60,61,62,63]},
 svante_bard:{varja:[1,2,3,8,9,10,48],piska:[16,17,24,51,56,57],forttrollad_luta:[32,33,34,35,40,42,58,60,61],silvervarja:[5,6,7,12,13,14,15,49,50],stormluta:[36,37,38,39,44,46,62,63],ormpiska:[20,21,22,26,27,29,30,52,53,54]},
 benjamin_bard:{varja:[0,1,2,4,11,24,25,28,48,52,60],piska:[3,6,7,26,27,29,30,31,49,50,53],forttrollad_luta:[8,9,10,12,32,33,51,54,55],silvervarja:[5,34,36,37,38,39],stormluta:[16,17,18,20,21,40,41,44,45,58,61,62],ormpiska:[19,22,23,42,43,46,47,59,63]}
};

// Bakgrunder där golvet slutar en bit upp: figurerna flyttas upp så många pixlar (bakgrunden är 320×180)
window.FOTLYFT={
 slottet_2_rum:14,   // mörk kant längst ner
 slottet_2_d1:22,    // trappsteg längst ner
 slottet_2_port:8    // golvet slutar en bit upp
};
