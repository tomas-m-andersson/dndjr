/* =====================================================================
   Tärningsriket – texter till grottkrypningen
   ---------------------------------------------------------------------
   Varje händelse har en lista med varianter. Spelet väljer en på måfå,
   och samma rad visas aldrig två gånger i rad.

   En lista kan vara uppdelad per plats:
     { alla: [...], slottet: [...], grottorna: [...], skogen: [...], vulkanen: [...] }
   Då blandas "alla" med platsens egna rader.

   Ord inom klamrar byts ut:
     {namn}  hjälten        {gen}  hjältens (Villes, Tomas)
     {mal}   fienden        {m}    monstren i rummet
     {n}     ett tal        {vapen} hjältens vapen (svärdet, staven …)
     {boss}  bossen på platsen
   ===================================================================== */

window.TEXTER = {

  /* ---------- in i en plats ---------- */
  start: {
    slottet: [
      "{alla} knuffar upp den knarrande porten och kliver in i Spökslottet Korpholm. Dörren slår igen bakom er.",
      "Vindbryggan gnisslar under era fötter. {alla} går in genom porten till Korpholm, där ingen har bott på hundra år.",
      "Korparna på tornet tystnar när {alla} går in i slottet. Det luktar damm och gammalt stearin.",
      "{alla} smyger in genom ett trasigt fönster i Korpholms gamla kök. Någonstans uppe i slottet slår en klocka tolv."
    ],
    grottorna: [
      "{alla} tänder facklorna och kryper in i grottan under Kråkberget. Vatten droppar från taket.",
      "Grottöppningen ser ut som en gapande mun. {alla} tar ett djupt andetag och går in.",
      "{alla} klättrar ner för en hal stenkant och står plötsligt i ett mörker så tätt att facklorna knappt räcker.",
      "En kall vind blåser ut ur Kråkberget. {alla} drar åt mantlarna och går in i grottan."
    ],
    skogen: [
      "{alla} lämnar vägen och kliver in bland de svarta granarna i Mörkskogen. Dimman sluter sig bakom er.",
      "Månen försvinner bakom molnen när {alla} går in i Mörkskogen. Det enda som hörs är era steg.",
      "{alla} följer en smal djurstig in i Mörkskogen. Mellan träden blinkar något gult och försvinner.",
      "Grenarna bildar ett tak över stigen. {alla} går in i Mörkskogen, och det blir genast kallare."
    ],
    vulkanen: [
      "{alla} tar ett djupt andetag och kliver in genom den heta porten i Drakvulkanen. Luften darrar av värme.",
      "Svavelrök sticker i näsan när {alla} går in i Drakvulkanen. Marken under fötterna är varm.",
      "Lavan lyser rött långt där nere. {alla} börjar gå nedför den smala stigen in i vulkanen.",
      "Ett mullrande hörs djupt inne i berget när {alla} kliver in i Drakvulkanen. Något stort sover därinne."
    ]
  },

  /* ---------- vägskäl ---------- */
  delning: {
    alla: [
      "Vägen delar sig. Varje väg döljer något olika.",
      "Ni stannar där vägen delar sig. Vilken känns rätt?",
      "Ledtrådarna säger lite, men inte allt.",
      "Ni kan lyssna först. Men gör det tyst.",
      "Två vägar, kanske fler. Ingen av dem ser säker ut.",
      "Någon har ristat pilar på väggen här, men de pekar åt olika håll.",
      "Det är tyst. Alldeles för tyst. Vart går ni?",
      "Ni står vid ett vägskäl. Fackelljuset fladdrar, som om det också tvekar.",
      "Varje väg luktar olika. Det säger något om vad som väntar.",
      "Ni har gått långt nu. Men vägen fortsätter, åt flera håll.",
      "Fotspår leder åt alla håll. Någon har varit här före er.",
      "Ni tittar på varandra. Någon måste bestämma."
    ],
    slottet: [
      "Korridoren delar sig. Någonstans knarrar en dörr.",
      "Porträtt stirrar på er från väggarna där gången delar sig.",
      "Kall luft strömmar ut ur mer än en dörröppning.",
      "En trappa leder upp, en annan ner, och en dörr står på glänt.",
      "Rustningar står uppradade längs väggen. En av dem har vridit på huvudet."
    ],
    grottorna: [
      "Tunneln delar sig. Vatten droppar någonstans i mörkret.",
      "Facklans sken når mer än en öppning i berget.",
      "Ben knastrar under fötterna där gångarna möts.",
      "Grottan delar sig runt en stor stenpelare. Båda sidorna är svarta.",
      "Fladdermöss flyger förbi och försvinner in i en av gångarna."
    ],
    skogen: [
      "Stigen delar sig mellan de gamla träden. Något prasslar.",
      "Stigarna slingrar bort i dimman. Ingen av dem ser vänlig ut.",
      "En uggla hoar. Stigarna framför er försvinner i mörkret.",
      "Ett omkullfallet träd delar stigen i två.",
      "Svampar lyser svagt längs en av stigarna. De andra är helt mörka."
    ],
    vulkanen: [
      "Marken spricker upp i flera brinnande stigar.",
      "Röken driver över vägskälet. Alla vägar luktar svavel.",
      "Kedjor skramlar längre fram. Vägen delar sig i hettan.",
      "Två broar av sten leder över lavan. Den ena har sprickor.",
      "Lavan bubblar. Det finns mer än en väg, och alla är heta."
    ]
  },
  en_vag: [
    "Det finns bara en väg framåt.",
    "Gången går bara åt ett håll. Ni kan i alla fall lyssna först.",
    "Ingen väg att välja. Bara framåt.",
    "En enda dörr. Vad som än väntar bakom den, så måste ni dit.",
    "Stigen är smal och leder bara vidare in."
  ],
  porten: {
    alla: [
      "Gången slutar vid en stor port. Längst in väntar {boss}.",
      "Det finns ingen väg runt. Bakom nästa dörr väntar {boss}.",
      "Väggarna är täckta av klösmärken. Någonstans här inne väntar {boss}."
    ],
    slottet: ["En stor dubbeldörr med järnbeslag. Bakom den: tronsalen, och {boss}."],
    grottorna: ["Grottan öppnar sig mot en enorm sal. Något stort andas därinne."],
    skogen: ["Träden står i en ring runt en glänta. Mitt i den väntar något."],
    vulkanen: ["Hettan är nästan för mycket. Längst ner i kratern rör sig något stort."]
  },
  vidare: {
    alla: [
      "Ni går vidare.",
      "Ni samlar ihop er och fortsätter.",
      "Ni lämnar rummet bakom er.",
      "Ni går djupare in.",
      "Ni tar en klunk vatten och går vidare.",
      "Ingen säger något. Ni fortsätter bara.",
      "Ni torkar svetten ur pannan och går vidare."
    ],
    slottet: ["Ni smyger vidare genom de dammiga salarna.", "En trappa knarrar under era fötter när ni går vidare."],
    grottorna: ["Ni kryper vidare genom en trång spricka.", "Vattnet plaskar runt era fötter när ni går vidare."],
    skogen: ["Ni följer stigen djupare in bland träden.", "Grenarna river i kläderna när ni går vidare."],
    vulkanen: ["Ni hoppar över en spricka med lava och går vidare.", "Askan virvlar runt era fötter när ni går vidare."]
  },
  djupare: {
    slottet: ["Alla har vilat och känner sig starka igen. Ni hittar en vindlande trappa som leder ner i fängelsehålorna."],
    grottorna: ["Alla har vilat och känner sig starka igen. Ni hittar en spricka som leder djupare in i berget."],
    skogen: ["Alla har vilat och känner sig starka igen. Ni hittar en igenvuxen stig som leder djupare in i skogen."],
    vulkanen: ["Alla har vilat och känner sig starka igen. Ni hittar en bro av kedjor över lavan som leder djupare ner."]
  },

  /* ---------- ledtrådar vid dörrarna ---------- */
  ledtradar: {
    alla: [
      { h: "Ni hör skrapande ljud och tunga steg.", o: { strid: 5, sovare: 3, resenar: 2 } },
      { h: "Något glimmar i mörkret.", o: { skatt: 3, vaktad: 3, falla: 2, kista: 2 } },
      { h: "Det luktar rök och stekt kött.", o: { lager: 4, handlare: 2, strid: 2, vaktad: 2 } },
      { h: "Det är alldeles för tyst.", o: { falla: 3, altare: 2, sovare: 3, skatt: 2 } },
      { h: "Någonstans porlar vatten.", o: { brunn: 4, strid: 3, altare: 3 } },
      { h: "Någon viskar.", o: { resenar: 3, handlare: 3, strid: 4 } },
      { h: "Ett svagt ljus fladdrar längre fram.", o: { lager: 3, altare: 2, handlare: 2, falla: 3 } },
      { h: "Något snarkar, djupt och långsamt.", o: { sovare: 6, strid: 2, lager: 2 } },
      { h: "Ni hör mynt som klirrar.", o: { handlare: 4, skatt: 3, vaktad: 3 } },
      { h: "En mjuk sång hörs på avstånd.", o: { altare: 3, resenar: 3, handlare: 2, falla: 2 } },
      { h: "Det finns färskt blod på marken.", o: { strid: 5, vaktad: 3, resenar: 2 } },
      { h: "Någon har ristat en varning här.", o: { falla: 5, vaktad: 3, strid: 2 } },
      { h: "Det luktar sött, som blommor.", o: { brunn: 3, altare: 3, falla: 2, skatt: 2 } },
      { h: "Små fotspår leder ditåt.", o: { handlare: 3, skatt: 3, falla: 2, strid: 2 } },
      { h: "Ett lågt morrande. Sedan tystnad.", o: { strid: 5, sovare: 3, vaktad: 2 } },
      { h: "Ni känner värme mot ansiktet.", o: { lager: 4, altare: 2, falla: 2, strid: 2 } },
      { h: "Någon stönar svagt, som om den har ont.", o: { resenar: 6, strid: 2, falla: 2 } },
      { h: "Ett tungt lås skramlar i draget.", o: { kista: 5, vaktad: 3, skatt: 2 } },
      { h: "Ni hör ett klick, som av en mekanism.", o: { falla: 6, kista: 3, skatt: 1 } },
      { h: "Det luktar rökelse.", o: { altare: 5, handlare: 2, resenar: 2 } },
      { h: "Något skrattar tyst därinne.", o: { strid: 4, handlare: 3, falla: 3 } },
      { h: "Det droppar, långsamt och jämnt.", o: { brunn: 5, falla: 2, sovare: 2 } },
      { h: "Ni hör många små fötter som springer.", o: { strid: 6, vaktad: 2, skatt: 2 } },
      { h: "Golvet är alldeles för rent här.", o: { falla: 6, skatt: 2, altare: 2 } },
      { h: "En gammal sång nynnas, lite falskt.", o: { handlare: 5, resenar: 3, lager: 2 } },
      { h: "Ni känner en svag doft av mat.", o: { lager: 5, handlare: 3, resenar: 2 } },
      { h: "Det glittrar i en spricka i dörren.", o: { skatt: 5, vaktad: 3, falla: 2 } },
      { h: "Någon andas tungt. Det låter stort.", o: { sovare: 5, strid: 4, vaktad: 1 } },
      { h: "Ett svagt blått sken syns under dörren.", o: { altare: 4, brunn: 3, falla: 3 } },
      { h: "Spindelväv täcker öppningen.", o: { strid: 4, skatt: 2, sovare: 2, falla: 2 } }
    ],
    slottet: [
      { h: "En spöklik melodi spelas på ett gammalt piano.", o: { strid: 3, altare: 3, falla: 2, resenar: 2 } },
      { h: "Kedjor rasslar bakom dörren.", o: { strid: 5, sovare: 3, vaktad: 2 } },
      { h: "Ett porträtt bredvid dörren har ögon som följer er.", o: { falla: 4, strid: 3, skatt: 3 } },
      { h: "Det luktar gammalt vin och damm.", o: { skatt: 3, kista: 3, lager: 2, handlare: 2 } },
      { h: "En rustning bredvid dörren har ett glänsande svärd.", o: { vaktad: 5, strid: 3, skatt: 2 } }
    ],
    grottorna: [
      { h: "Fladdermöss flyger ut ur öppningen.", o: { strid: 4, sovare: 3, skatt: 3 } },
      { h: "Ni hör hackande, som av en hacka mot sten.", o: { handlare: 3, resenar: 3, strid: 4 } },
      { h: "Väggarna glittrar av kristaller.", o: { skatt: 4, vaktad: 3, brunn: 3 } },
      { h: "Det luktar mögel och något surt.", o: { strid: 4, falla: 3, sovare: 3 } },
      { h: "En underjordisk bäck rinner in i gången.", o: { brunn: 5, strid: 3, falla: 2 } }
    ],
    skogen: [
      { h: "Ett vargylande hörs, nära.", o: { strid: 6, sovare: 2, vaktad: 2 } },
      { h: "Det luktar tall och brasa.", o: { lager: 5, resenar: 3, handlare: 2 } },
      { h: "Lysande svampar växer i en ring.", o: { altare: 4, falla: 3, brunn: 3 } },
      { h: "Grenar knäcks, som om något stort går där.", o: { strid: 4, sovare: 4, vaktad: 2 } },
      { h: "En liten bäck porlar mellan stenarna.", o: { brunn: 5, lager: 3, resenar: 2 } }
    ],
    vulkanen: [
      { h: "Lavan bubblar och sprutar gnistor.", o: { falla: 5, strid: 3, skatt: 2 } },
      { h: "Ni hör ett fräsande, som av eld.", o: { strid: 5, vaktad: 3, falla: 2 } },
      { h: "Det glimmar av guld mellan de svarta stenarna.", o: { skatt: 4, vaktad: 4, falla: 2 } },
      { h: "En svag sval vind kommer från den vägen.", o: { brunn: 4, lager: 3, resenar: 3 } },
      { h: "Något stort slår med vingarna i mörkret.", o: { strid: 4, sovare: 4, vaktad: 2 } }
    ]
  },

  /* ---------- rum ---------- */
  strid: {
    alla: [
      "Ni möter {m}!",
      "Ur mörkret kliver {m}!",
      "Ni har knappt kommit in förrän {m} anfaller!",
      "Det är inte tomt här. {m} vänder sig mot er!",
      "Plötsligt står {m} framför er.",
      "Något rör sig i skuggorna. Det är {m}!",
      "{m} har väntat på er.",
      "Ni hör ett vrål. {m} rusar fram!"
    ],
    slottet: ["Dörren slår upp, och där står {m}!", "Ljusen fladdrar och slocknar. När de tänds igen står {m} mitt i salen."],
    grottorna: ["Stenar rasar från taket. Ur dammet kommer {m}!", "Ni kliver in i en grotta, och {m} tittar upp från sin måltid."],
    skogen: ["Buskarna prasslar, och ut springer {m}!", "Ni kommer ut på en glänta. {m} väntar i månskenet."],
    vulkanen: ["Lavan fräser, och ur hettan kliver {m}!", "Röken skingras och visar {m}."]
  },
  vaktad: [
    "Bakom en hög med ben står en kista. Men något vaktar den: {m}.",
    "Ni ser en glittrande skatt. Framför den står {m}.",
    "En kista står mitt i rummet. {m} har bestämt att den är deras.",
    "Någon har byggt ett litet förråd här. {m} vaktar det och tänker inte dela.",
    "Guld glimmar i hörnet. Men {m} reser sig och spärrar vägen."
  ],
  vaktad_oppen: [
    "Kistan som de vaktade står öppen.",
    "Nu är vägen fri till skatten.",
    "Ingen vaktar skatten längre. Den är er."
  ],
  skatt: [
    "Ni hittar en skattkista!",
    "I ett hörn står en gammal kista. Locket glider upp.",
    "Under en lös sten ligger ett paket inslaget i tyg.",
    "En död äventyrare har lämnat sin ryggsäck här. Den är full.",
    "Mitt på golvet står en kista. Ingen vaktar den. Konstigt.",
    "Bakom ett förfallet draperi hittar ni ett gömt fack.",
    "Ni hittar en liten pung som någon har tappat."
  ],
  sovare: [
    "Något stort sover i gången: {m}.",
    "{m} snarkar högt i ett hörn.",
    "Ni hör tunga andetag. {m} sover precis där ni måste gå förbi.",
    "Mitt i rummet sover {m}. Ett öga verkar nästan öppet.",
    "{m} har somnat vid en slocknad eld. Ingen har märkt er. Än.",
    "Det luktar unket. {m} sover djupt i ett hörn."
  ],
  kista: [
    "En järnbeslagen kista med ett tungt lås.",
    "En kista av mörkt trä står mot väggen. Låset är rostigt men starkt.",
    "En liten kista med ett hänglås format som en dödskalle.",
    "En stor kista med tre lås. Bara ett av dem är låst.",
    "En kista med gamla runor på locket. Låset ser knepigt ut."
  ],
  lager: [
    "En övergiven lägerplats. Glöden i elden är fortfarande varm.",
    "Någon har slagit läger här. Det finns ved och en kittel.",
    "Ett skyddat hörn med en gammal eldstad. Här kan man vila.",
    "Ett litet läger med sovsäckar. Ägarna har gått för länge sedan.",
    "En grotta med torr sand på golvet. Perfekt för att vila en stund."
  ],
  brunn: [
    "En gammal brunn. Vattnet är mörkt och stilla.",
    "En liten källa bubblar upp ur golvet. Vattnet glittrar.",
    "En brunn av sten med en hink på ett rep. Det luktar friskt.",
    "Vattnet i brunnen skimrar i alla regnbågens färger.",
    "En fontän med en stenfisk i mitten. Vattnet rinner ur dess mun."
  ],
  altare: [
    { text: "Ett gammalt altare till en bortglömd gud.", gud: "den bortglömda guden" },
    { text: "Ett altare täckt av mossa. En sten är formad som en uggla.", gud: "Ugglemodern" },
    { text: "Ett svart altare med en röd ädelsten i mitten.", gud: "Den röda kungen" },
    { text: "Ett altare med en staty av en kvinna som håller en lykta.", gud: "Ljusbärerskan" },
    { text: "Ett altare av is, trots att det inte är kallt här.", gud: "Vinterns herre" },
    { text: "Ett altare med tusen små ljus som tänds av sig själva.", gud: "De tusen ljusens gud" }
  ],
  altare_ok: [
    "{namn} ber till {gud}, och ett varmt ljus fyller rummet.",
    "{namn} knäböjer. {gud} svarar med ett mjukt sken.",
    "En röst viskar {gen} namn. {gud} är nöjd.",
    "Ljusen flammar upp. {gud} välsignar er."
  ],
  altare_arg: [
    "{gud} blir arg! En blixt slår ner i {namn}.",
    "Altaret blir svart. {gud} tycker inte om {namn}.",
    "Ett kallt skratt ekar. {gud} straffar {namn}."
  ],
  offer: [
    "Ni lägger guldet på altaret. Det försvinner i ett sken.",
    "Guldet smälter och rinner ner i altaret. Ni känner er välsignade.",
    "Myntet försvinner. Ett varmt sken lägger sig över er."
  ],
  resenar: [
    { text: "En skadad äventyrare sitter lutad mot väggen.", vem: "henne", ok: "Hon viskar vad som väntar vid nästa vägskäl.", nej: "Hon litar inte på {namn} och vänder bort huvudet.", dryck: "Hon dricker och färgen kommer tillbaka i ansiktet. Hon berättar om allt hon sett." },
    { text: "En gammal dvärg sitter fast under en sten. – Hjälp, hjälp!", vem: "dvärgen", ok: "Dvärgen berättar vad han såg innan stenen föll.", nej: "– Gå bort, ni ser ut som tjuvar, muttrar dvärgen.", dryck: "Dvärgen dricker, rycker loss benet och skrattar. Han berättar om allt han sett." },
    { text: "En vilsen trollkarlselev sitter och gråter. Hans trollstav är bruten.", vem: "eleven", ok: "Eleven ritar en karta i dammet. Nu vet ni vad som väntar.", nej: "Eleven skakar på huvudet och snörvlar.", dryck: "Eleven dricker och slutar gråta. Han berättar allt han har sett." },
    { text: "En riddare i bucklig rustning ligger på golvet. – Vatten …", vem: "riddaren", ok: "Riddaren pekar och berättar vad som finns längre fram.", nej: "Riddaren är för trött för att prata.", dryck: "Riddaren reser sig och bugar. Han berättar om faror han har sett." },
    { text: "En kringvandrande spelman sitter med en trasig fiol. Han har stukat foten.", vem: "spelmannen", ok: "Spelmannen sjunger en visa om vägen framåt. Den är full av ledtrådar.", nej: "Spelmannen sjunger bara en sorglig visa.", dryck: "Spelmannen dricker, stämmer fiolen och spelar en visa om allt han sett." },
    { text: "En liten tomte har fastnat i en fälla. – Släpp mig, så berättar jag något!", vem: "tomten", ok: "Tomten viskar vad som gömmer sig bakom nästa dörrar.", nej: "Tomten fnyser och vägrar säga något.", dryck: "Tomten dricker, hoppar högt av glädje och berättar allt." }
  ],
  handlare: [
    "En liten tomtegubbe med en jättestor ryggsäck. – Köpa något, hjältar?",
    "En gammal dam med en kärra full av flaskor. – Bästa dryckerna i hela berget!",
    "En räv i väst och hatt bugar djupt. – Varor för modiga resenärer!",
    "En dvärg har ställt upp ett litet bord. – Vapen slipas, ringar säljs. Bara guld, tack.",
    "En lång, smal man i lila mantel. Han ler lite för mycket. – Jag har precis det ni behöver."
  ],
  handel_kop: [
    "Ni köper en {sak} för {n} guld.",
    "Handlaren ger er en {sak} och tar {n} guld.",
    "– Ett gott val! Ni får en {sak} för {n} guld."
  ],

  /* ---------- bossar ---------- */
  boss: {
    slottet: [
      "Tronen knakar. Slottsherren reser sig: {m}!",
      "Alla ljus slocknar. När de tänds igen står {m} framför tronen.",
      "En kall röst säger: – Ni skulle aldrig ha kommit hit. Det är {m}!"
    ],
    grottorna: [
      "Golvet skakar. Ur mörkret reser sig grottans härskare: {m}!",
      "Stenar rasar. Något enormt vaknar: {m}!",
      "Två stora ögon öppnas i mörkret. Det är {m}!"
    ],
    skogen: [
      "Träden böjer sig undan. Skogens mörker tar form: {m}!",
      "Dimman samlas till en skugga. Ur den kliver {m}!",
      "Alla fåglar flyger iväg på en gång. Sedan kommer {m}."
    ],
    vulkanen: [
      "Lavan exploderar uppåt. Ur elden reser sig {m}!",
      "Ett vrål får hela vulkanen att skaka. {m} har vaknat!",
      "Vingar slår i hettan. {m} landar framför er!"
    ]
  },
  boss_besegrad: {
    alla: ["{boss} är besegrad!", "Det är över. {boss} är besegrad!"],
    slottet: ["Slottet blir tyst. Spökena försvinner ett efter ett. {boss} är besegrad!"],
    grottorna: ["Grottan slutar skaka. {boss} är besegrad!"],
    skogen: ["Dimman lättar och månen tittar fram. {boss} är besegrad!"],
    vulkanen: ["Lavan lugnar sig. {boss} är besegrad!"]
  },

  /* ---------- sovande monster ---------- */
  sov_ok: [
    "{namn} leder er förbi utan ett ljud.",
    "Ni smyger förbi på tå. Ingen snarkning avbryts.",
    "{namn} visar vägen i skuggorna. Monstret sover vidare.",
    "Ett snarkande ljud, ett mumlande. Men ni kommer förbi."
  ],
  sov_vaknar: [
    "En sten skramlar under {gen} fot. Monstret vaknar!",
    "{namn} nyser. Det blir dödstyst. Sedan öppnas ett öga.",
    "En gren knäcks under {gen} fot. Nu är det vaket!",
    "{namn} snubblar på en kittel. KLONK! Alla vaknar."
  ],
  overfall: [
    "Ni smyger fram och anfaller!",
    "Ett, två, tre: ni anfaller medan de sover!",
    "Ni kryper närmare. Nu!"
  ],

  /* ---------- kistor ---------- */
  kista_dyrk_ok: ["Klick! {namn} dyrkar upp låset.", "{namn} pillar med en hårnål. Låset ger efter.", "Efter en stund hörs ett nöjt klick. {namn} har öppnat kistan."],
  kista_nal: ["En giftnål sticker {namn}: {n} i skada. Men locket glider upp.", "Aj! En nål i låset sticker {namn}: {n} i skada. Men kistan öppnas.", "Låset sprutar giftigt damm på {namn}: {n} i skada. Locket öppnas ändå."],
  kista_bryt_ok: ["{namn} bänder upp locket!", "Med ett brak flyger locket upp. {namn} är stark!", "{namn} sliter och drar tills gångjärnen ger efter."],
  kista_bryt_nej: ["Låset håller. {namn} skrapar knogarna: {n} i skada.", "Kistan rör sig inte. {namn} slår sig: {n} i skada.", "{namn} drar så hårt att det knakar i ryggen: {n} i skada."],

  /* ---------- lyssna ---------- */
  lyssna_ok: [
    "{namn} trycker örat mot stenen och lyssnar. Nu vet ni vad som väntar.",
    "{namn} håller andan och lyssnar länge. Varje dörr har sitt eget ljud.",
    "{namn} kikar genom ett nyckelhål och lyssnar. Nu vet ni.",
    "{namn} lägger handen mot dörrarna och känner efter. Ni vet vad som finns där."
  ],
  lyssna_bakhall: [
    "{namn} lyssnar, men något hör er först! {m} rusar fram ur skuggorna!",
    "En dörr flyger upp mitt framför {namn}. {m} har hört er!",
    "{namn} lutar sig mot dörren. Den ger efter, och där står {m}!"
  ],
  lyssna_inget: [
    "{namn} lyssnar, men hör bara sitt eget hjärta.",
    "{namn} hör ingenting alls. Det kan vara bra. Eller mycket dåligt.",
    "{namn} lyssnar länge. Ett eko. Kanske. Det går inte att säga.",
    "{namn} hör bara vind. Ni får gissa."
  ],

  /* ---------- vila ---------- */
  vila_full: ["{namn} är redan utvilad och håller vakt.", "{namn} har inga sår att lägga om och vässar {vapen} i stället.", "{namn} är pigg och tittar efter faror."],
  vila_kort: ["{namn} vilar med ett öga öppet. +{n} liv.", "{namn} lägger om ett skrubbsår. +{n} liv.", "{namn} äter lite bröd och vilar fötterna. +{n} liv."],
  vila_lang: ["{namn} sover vid elden. +{n} liv.", "{namn} somnar direkt och drömmer om hemma. +{n} liv.", "{namn} snarkar högt hela natten. +{n} liv."],
  vila_bakhall: ["Men röken lockade dit något! Ni vaknar med ett ryck: {m}!", "Mitt i natten hörs steg. Ni vaknar, och där står {m}!", "Någon tar fram en fackla. Ljuset visar {m} precis bredvid er!"],

  /* ---------- brunn ---------- */
  brunn_bra: ["{namn} dricker. Vattnet är friskt och klart. +{n} liv.", "{namn} dricker och känner sig som ny. +{n} liv.", "Vattnet smakar mynta. {namn} får +{n} liv."],
  brunn_visdom: ["{namn} dricker ur en visdomskälla! Bilder av gamla strider flimrar förbi. +{n} XP.", "{namn} ser plötsligt saker som hänt för länge sedan. +{n} XP."],
  brunn_gift: ["Bittert! Vattnet var förgiftat. {namn} tar {n} i skada.", "{namn} får ont i magen direkt. {n} i skada.", "Vattnet smakar rutten fisk. {namn} tar {n} i skada."],
  brunn_monster: ["Vattnet börjar bubbla. Något reser sig ur brunnen: {m}!", "Ur brunnen sträcks en hand. Sedan kommer {m}!"],

  /* ---------- fällor ---------- */
  fallor: {
    alla: [
      { egen: "smi", alla: false, varn: "Golvet ger vika under fötterna!", ok: "hoppar undan i sista stund", traff: "faller ner i en spjutgrop" },
      { egen: "smi", alla: false, varn: "Små hål i väggen. Klick!", ok: "duckar för giftpilarna", traff: "träffas av giftiga pilar" },
      { egen: "smi", alla: true, varn: "Taket mullrar. Stenar faller!", ok: "hoppar åt sidan", traff: "träffas av fallande sten" },
      { egen: "smi", alla: true, varn: "En platta klickar. Flammor sprutar ur golvet!", ok: "kastar sig undan lågorna", traff: "bränns av lågorna" },
      { egen: "tal", alla: true, varn: "Grön rök väller fram ur väggarna!", ok: "håller andan", traff: "hostar och mår illa av gasen" },
      { egen: "smi", alla: false, varn: "Något susar ner från taket!", ok: "duckar för den svängande yxan", traff: "träffas av en svängande yxa" },
      { egen: "vis", alla: false, varn: "En runa på golvet börjar glöda!", ok: "känner magin och kliver runt runan", traff: "får en magisk stöt från runan" },
      { egen: "sty", alla: false, varn: "Väggarna börjar röra sig mot varandra!", ok: "håller emot tills mekanismen stannar", traff: "kläms mellan väggarna" },
      { egen: "smi", alla: false, varn: "Ett nät faller ner från taket!", ok: "rullar undan", traff: "trasslar in sig och slår sig" },
      { egen: "vis", alla: true, varn: "Ett högt ljud skär i öronen!", ok: "håller för öronen i tid", traff: "blir yr av ljudet" }
    ],
    slottet: [
      { egen: "smi", alla: false, varn: "En rustning vid väggen svingar sin yxa!", ok: "ducker under yxan", traff: "träffas av rustningens yxa" },
      { egen: "vis", alla: true, varn: "Ett spöke susar genom rummet!", ok: "blundar och står still", traff: "fryser till is av spökets beröring" }
    ],
    grottorna: [
      { egen: "smi", alla: true, varn: "Istappar av sten lossnar från taket!", ok: "hoppar undan", traff: "träffas av en vass sten" },
      { egen: "sty", alla: false, varn: "Marken blir till kvicksand!", ok: "drar sig upp ur sanden", traff: "sjunker ner och slår sig" }
    ],
    skogen: [
      { egen: "smi", alla: false, varn: "En snara drar åt runt foten!", ok: "skär sig loss", traff: "slungas upp i ett träd" },
      { egen: "tal", alla: true, varn: "Svampar sprutar ut gula sporer!", ok: "håller andan", traff: "nyser och får klåda" }
    ],
    vulkanen: [
      { egen: "smi", alla: true, varn: "Lava sprutar upp ur en spricka!", ok: "hoppar över lavan", traff: "bränns av lavan" },
      { egen: "tal", alla: true, varn: "Svavelrök väller ut!", ok: "drar upp manteln för munnen", traff: "hostar och får tårar i ögonen" }
    ]
  },

  /* ---------- seger, nivå, fly ---------- */
  seger: ["Seger! Alla får {n} XP.", "Ni vann! Alla får {n} XP.", "Striden är över. Alla får {n} XP.", "Det sista monstret faller. Alla får {n} XP."],
  vaknar: ["{namn} vaknar med 1 liv.", "{namn} slår upp ögonen och mumlar: – Vad hände?", "{namn} hostar och sätter sig upp. 1 liv."],
  andan: ["{namn} hämtar andan och lägger om såren. +{n} liv.", "{namn} sätter sig en stund. +{n} liv.", "{namn} dricker lite vatten och torkar svetten. +{n} liv.", "{namn} binder om ett sår. +{n} liv."],
  niva: ["★ Nivå upp! {namn} är nu nivå {n}!", "★ {namn} har blivit starkare och är nu nivå {n}!", "★ {namn} känner sig mäktigare. Nivå {n}!"],
  fallen: ["Sällskapet har fallit.", "Mörkret tar över. Sällskapet har fallit.", "Det sista ljuset slocknar. Sällskapet har fallit."],
  fly_ok: ["Sällskapet springer för livet och kommer undan!", "Ni springer så fort benen bär. Ni klarade er!", "Ni slänger igen en dörr bakom er. Ni är säkra, för den här gången."],
  fly_nej: ["{namn} försöker fly, men vägen är blockerad.", "{namn} springer, men snubblar.", "Fienderna står i vägen. {namn} kommer inte förbi."],

  /* ---------- strid (gäller även berättelsen) ---------- */
  traff: {
    alla: ["{namn} träffar {mal} med {vapen} och gör {n} i skada.", "{namn} slår till {mal} med {vapen}. {n} i skada!", "{vapen} träffar {mal}. {n} i skada."],
    krigare: ["{namn} hugger {mal} med {vapen}. {n} i skada!", "{namn} drämmer till {mal} med {vapen}. {n} i skada.", "Ett tungt hugg från {namn} träffar {mal}. {n} i skada."],
    magiker: ["{namn} slår {mal} med {vapen}. Gnistor flyger. {n} i skada.", "{gen} {vapen} lyser när den träffar {mal}. {n} i skada.", "{namn} riktar {vapen} mot {mal}. En stöt av magi: {n} i skada."],
    bagskytt: ["{gen} pil träffar {mal}. {n} i skada!", "{namn} skjuter {vapen} rakt in i {mal}. {n} i skada.", "Pilen visslar genom luften och träffar {mal}. {n} i skada."],
    ninja: ["{namn} dyker upp bakom {mal} och hugger. {n} i skada!", "Ett blixtsnabbt hugg med {vapen}. {mal} tar {n} i skada.", "{namn} snurrar runt och träffar {mal}. {n} i skada."],
    helare: ["{namn} slår {mal} med {vapen}. {n} i skada.", "{namn} säger en bön och slår till {mal}. {n} i skada.", "{gen} {vapen} träffar {mal} med ett dovt dunk. {n} i skada."],
    bard: ["{namn} sticker {mal} med {vapen} och skrattar. {n} i skada.", "{namn} dansar fram och träffar {mal}. {n} i skada!", "Ett elegant stick från {namn}. {mal} tar {n} i skada."],
    katt: ["{namn} klöser {mal}. {n} i skada!", "{namn} biter {mal} i benet. {n} i skada.", "{namn} hoppar upp och river {mal}. {n} i skada."]
  },
  krit: ["KRITISK TRÄFF!", "PERFEKT TRÄFF!", "VILKEN TRÄFF!", "MITT I PRICK!"],
  miss: [
    "{namn} missar. {mal} hoppar undan i sista stund!",
    "{namn} slår, men {mal} duckar.",
    "Nästan! {mal} viker undan.",
    "{gen} anfall studsar mot {mal} utan att göra något.",
    "{mal} parerar anfallet.",
    "{namn} siktar fel. Det blev bara luft."
  ],
  fummel: [
    "Hoppsan! {namn} snubblar och missar helt.",
    "{namn} tappar nästan {vapen}. Miss!",
    "{namn} halkar och landar på rumpan. Miss!",
    "{namn} slår så hårt att {vapen} fastnar i väggen. Miss!"
  ],
  fiende_traff: {
    alla: ["{mal} träffar {namn} och gör {n} i skada.", "{mal} slår till {namn}. {n} i skada.", "Aj! {mal} träffar {namn}. {n} i skada."],
    varg: ["{mal} biter {namn} i armen. {n} i skada.", "{mal} hoppar på {namn} och river. {n} i skada."],
    lavahund: ["{mal} biter {namn} med glödande tänder. {n} i skada.", "{mal} sprutar gnistor över {namn}. {n} i skada."],
    spindel: ["{mal} biter {namn}. Det svider. {n} i skada.", "{mal} spottar nät på {namn} och biter. {n} i skada."],
    skelett: ["{mal} hugger {namn} med ett rostigt svärd. {n} i skada.", "{mal} slår {namn} med en benknota. {n} i skada."],
    slem: ["{mal} slukar {gen} arm. Det bränns! {n} i skada.", "{mal} kastar sig över {namn}. {n} i skada."],
    eldimp: ["{mal} kastar en eldboll på {namn}. {n} i skada.", "{mal} bränner {namn} med sin svans. {n} i skada."],
    fladdermus: ["{mal} biter {namn} i örat. {n} i skada.", "{mal} flaxar i ansiktet på {namn} och biter. {n} i skada."],
    ratta: ["{mal} biter {namn} i tån. {n} i skada.", "{mal} springer upp för {gen} ben och biter. {n} i skada."],
    skuggling: ["{mal} sveper genom {namn}. Kylan gör ont. {n} i skada."],
    skuggan: ["{mal} sträcker ut en kall arm mot {namn}. {n} i skada.", "{mal} viskar {gen} namn, och det gör ont. {n} i skada."],
    troll: ["{mal} slår {namn} med en trädstam. {n} i skada!", "{mal} trampar på {namn}. {n} i skada."],
    krak: ["{mal} svingar sin yxa mot {namn}. {n} i skada!", "{mal} skallar {namn} med hornhjälmen. {n} i skada."],
    vatte: ["{mal} sticker {namn} med sitt spjut. {n} i skada.", "{mal} biter {namn} i benet. {n} i skada."],
    spokriddare: ["{mal} hugger {namn} med sitt spöksvärd. {n} i skada.", "{mal} slår {namn} med skölden. {n} i skada."],
    eldklo: ["{mal} sprutar eld över {namn}. {n} i skada!", "{mal} slår {namn} med svansen. {n} i skada!"]
  },
  fiende_miss: [
    "{namn} duckar. {mal} missar!",
    "{mal} slår, men {namn} hoppar undan.",
    "{gen} rustning tar smällen. Ingen skada!",
    "{mal} snubblar på sina egna fötter.",
    "{namn} parerar anfallet.",
    "Det susar förbi {gen} öra. Miss!"
  ],
  svimmar: ["{namn} blir yr och svimmar!", "{namn} faller ihop.", "{namn} segnar ner på golvet."]
};
