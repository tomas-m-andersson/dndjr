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
 tomas_ninja:{sta:2,anfall:18,vapen:{klinga:{sta:3,anfall:19},dubbla_dolkar:{sta:1,anfall:17},katana:{sta:2,anfall:18,va:true},skuggkatana:{sta:6,anfall:44,va:true},giftdolkar:{sta:4,anfall:20},manklinga:{sta:22,anfall:38,va:true}}},
 tomas_helare:{sta:0,anfall:8,vapen:{klubba:{sta:0,anfall:8},morgonstjarna:{sta:2,anfall:18},helig_stav:{sta:4,anfall:12},solklubba:{sta:5,anfall:13},livets_stav:{sta:53,anfall:61},valsignad_hammare:{sta:6,anfall:14}}},
 tomas_bard:{sta:0,anfall:32,vapen:{varja:{sta:0,anfall:32},piska:{sta:11,anfall:27},forttrollad_luta:{sta:24,anfall:25},silvervarja:{sta:5,anfall:37},stormluta:{sta:53,anfall:54},ormpiska:{sta:15,anfall:61}}},
 linda_krigare:{sta:4,anfall:5,vapen:{svard:{sta:4,anfall:5},tvahandssvard:{sta:16,anfall:41},stridsyxa:{sta:12,anfall:13},flammsvard:{sta:28,anfall:36},askhammare:{sta:37,anfall:45},drakdrapare:{sta:62,anfall:63}}},
 linda_magiker:{sta:1,anfall:9,vapen:{stav:{sta:1,anfall:9},trollspo:{sta:17,anfall:19,vs:true,va:true},runbok:{sta:10,anfall:11},stjarnstav:{sta:24,anfall:28},isstav:{sta:32,anfall:36},skuggstav:{sta:40,anfall:44}}},
 linda_bagskytt:{sta:0,anfall:32,vapen:{pilbage:{sta:0,anfall:32},kortbage:{sta:1,anfall:33},armborst:{sta:20,anfall:43},alvbage:{sta:5,anfall:37},eldbage:{sta:6,anfall:14},giftbage:{sta:7,anfall:15}}},
 linda_ninja:{sta:2,anfall:26,vapen:{klinga:{sta:2,anfall:26},dubbla_dolkar:{sta:17,anfall:21,vs:true},katana:{sta:4,anfall:27},skuggkatana:{sta:32,anfall:36},giftdolkar:{sta:40,anfall:44},manklinga:{sta:48,anfall:52}}},
 linda_helare:{sta:8,anfall:16,vapen:{klubba:{sta:8,anfall:16},morgonstjarna:{sta:9,anfall:25},helig_stav:{sta:4,anfall:12},solklubba:{sta:11,anfall:19},livets_stav:{sta:5,anfall:13},valsignad_hammare:{sta:7,anfall:15}}},
 linda_bard:{sta:1,anfall:25,vapen:{varja:{sta:1,anfall:25},piska:{sta:2,anfall:18},forttrollad_luta:{sta:5,anfall:13},silvervarja:{sta:36,anfall:44},stormluta:{sta:7,anfall:31},ormpiska:{sta:60,anfall:61}}},
 svante_krigare:{sta:3,anfall:32,vapen:{svard:{sta:3,anfall:32,vs:true},tvahandssvard:{sta:25,anfall:41},stridsyxa:{sta:21,anfall:42},flammsvard:{sta:36,anfall:52},askhammare:{sta:53,anfall:61},drakdrapare:{sta:55,anfall:63}}},
 svante_magiker:{sta:0,anfall:8,vapen:{stav:{sta:0,anfall:8},trollspo:{sta:1,anfall:9},runbok:{sta:3,anfall:11},stjarnstav:{sta:4,anfall:12},isstav:{sta:5,anfall:13},skuggstav:{sta:7,anfall:15}}},
 svante_bagskytt:{sta:0,anfall:16,vapen:{pilbage:{sta:0,anfall:16,vs:true,va:true},kortbage:{sta:1,anfall:17},armborst:{sta:19,anfall:35},alvbage:{sta:4,anfall:12},eldbage:{sta:5,anfall:13},giftbage:{sta:7,anfall:15}}},
 svante_ninja:{sta:4,anfall:20,vapen:{klinga:{sta:4,anfall:20,vs:true},dubbla_dolkar:{sta:17,anfall:21},katana:{sta:32,anfall:36},skuggkatana:{sta:40,anfall:44},giftdolkar:{sta:48,anfall:52},manklinga:{sta:56,anfall:57}}},
 svante_helare:{sta:8,anfall:16,vapen:{klubba:{sta:8,anfall:16},morgonstjarna:{sta:1,anfall:9},helig_stav:{sta:3,anfall:11},solklubba:{sta:4,anfall:12},livets_stav:{sta:6,anfall:14},valsignad_hammare:{sta:7,anfall:15}}},
 svante_bard:{sta:1,anfall:9,vapen:{varja:{sta:1,anfall:9},piska:{sta:16,anfall:24},forttrollad_luta:{sta:32,anfall:33},silvervarja:{sta:5,anfall:13},stormluta:{sta:36,anfall:44},ormpiska:{sta:20,anfall:28}}},
 benjamin_krigare:{sta:1,anfall:9,vapen:{svard:{sta:1,anfall:9},tvahandssvard:{sta:2,anfall:10,vs:true},stridsyxa:{sta:3,anfall:11,vs:true},flammsvard:{sta:4,anfall:12,vs:true},askhammare:{sta:5,anfall:13,vs:true,va:true},drakdrapare:{sta:7,anfall:15,vs:true,va:true}}},
 benjamin_magiker:{sta:0,anfall:16,vapen:{stav:{sta:0,anfall:16},trollspo:{sta:2,anfall:18},runbok:{sta:11,anfall:27},stjarnstav:{sta:5,anfall:13},isstav:{sta:6,anfall:14},skuggstav:{sta:7,anfall:15}}},
 benjamin_bagskytt:{sta:0,anfall:16,vapen:{pilbage:{sta:0,anfall:16,vs:true},kortbage:{sta:2,anfall:18},armborst:{sta:19,anfall:43,va:true},alvbage:{sta:4,anfall:12},eldbage:{sta:5,anfall:13},giftbage:{sta:7,anfall:15}}},
 benjamin_ninja:{sta:1,anfall:33,vapen:{klinga:{sta:1,anfall:33},dubbla_dolkar:{sta:2,anfall:34,va:true},katana:{sta:3,anfall:35,va:true},skuggkatana:{sta:29,anfall:30,vs:true,va:true},giftdolkar:{sta:48,anfall:50},manklinga:{sta:52,anfall:53,va:true}}},
 benjamin_helare:{sta:1,anfall:9,vapen:{klubba:{sta:1,anfall:9},morgonstjarna:{sta:3,anfall:11},helig_stav:{sta:4,anfall:32},solklubba:{sta:5,anfall:13},livets_stav:{sta:6,anfall:14},valsignad_hammare:{sta:7,anfall:15}}},
 benjamin_bard:{sta:0,anfall:24,vapen:{varja:{sta:0,anfall:24},piska:{sta:3,anfall:11},forttrollad_luta:{sta:8,anfall:9},silvervarja:{sta:4,anfall:12},stormluta:{sta:16,anfall:17},ormpiska:{sta:22,anfall:23}}},
 sally_katt:{sta:0,anfall:5},
 // Gosedjuren
 blackis:{sta:0,anfall:61},tigris:{sta:0,anfall:19},
 // Monster och personer (sta, anfall)
 askskelett:{sta:0,anfall:5},bandit:{sta:0,anfall:12,flip:true},bjorn:{sta:0,anfall:5,flip:true},bo:{sta:0},dimvarg:{sta:0,anfall:4},dimvasen:{sta:0,anfall:1,flip:true},
 eldimp:{sta:0,anfall:4},eldprast:{sta:0,anfall:4},eldsalamander:{sta:0,anfall:4},ent:{cell:32,sta:0,anfall:4},fladdermus:{sta:0,anfall:2},gargoyl:{sta:0,anfall:1,flip:true},
 giftspindel:{sta:0,anfall:5},haxa:{sta:0,anfall:2,flip:true},irrbloss:{sta:0,anfall:9},kobold:{sta:0,anfall:7},krak:{sta:0,anfall:1},krakor:{sta:0,anfall:1},
 kultist:{sta:0,anfall:4,flip:true},lavahund:{sta:0,anfall:9},levande_rustning:{sta:0,anfall:1},magmaslem:{sta:0,anfall:6},nekromantiker:{sta:0,anfall:5},orm:{sta:0,anfall:5},
 ratta:{sta:0,anfall:1,flip:true},rovarhovding:{sta:0,anfall:5},skelett:{sta:0,anfall:1},skuggling:{sta:0,anfall:1},slem:{sta:0,anfall:4},spindel:{sta:0,anfall:5},
 spoke:{sta:0,anfall:10,flip:true},spokriddare:{sta:0,anfall:1},svampman:{sta:0,anfall:1},troll:{sta:0,anfall:4},vampyrfladdermus:{sta:0,anfall:2},varg:{sta:0,anfall:10},
 varulv:{sta:0,anfall:2},vatte:{sta:0,anfall:1,flip:true},vattesjaman:{sta:0,anfall:3},vildsvin:{sta:0,anfall:8},
 handlare:{sta:0,flip:true},
 greta:{sta:0,flip:true},
 fange_1:{sta:0,flip:true},
 // Bossar: arken i mappen Bossar har 32×32-rutor (utom Eldklo som har 64×64)
 eldklo:{sta:0,anfall:1,flip:true},
 basilisk:{cell:32,sta:0,anfall:2},dimfrun:{cell:32,sta:0,anfall:2},golem:{cell:32,sta:0,anfall:2},grottroll:{cell:32,sta:0,anfall:2},jattemask:{cell:32,sta:0,anfall:2},mork_riddare:{cell:32,sta:0,anfall:2},skuggan:{cell:32,sta:0,anfall:2},vampyr:{cell:32,sta:0,anfall:2},
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
