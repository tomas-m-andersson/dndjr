/* =====================================================================
   Bland monster och tärningar – äventyrens innehåll
   ---------------------------------------------------------------------
   Här finns all text, alla val, prov och strider. Spelmotorn finns i
   index.html. Vill du ändra en text räcker det att ändra här.

   Kort om formatet:
   - bild:    vad TV:n visar (by, torg, skog, bro, lager, gruva,
              gruva_inne, sal, hem …)
   - figur:   vem som står i bilden (greta, bo, troll, vatte, krak,
              drake, drake_bur, skuggan …). Kan vara en lista.
   - text:    det som läses upp. Tom rad (\n\n) = nytt stycke.
              Kan också vara en lista med stycken. Ett stycke som
              { om: "flagga", text } visas bara om flaggan finns, och
              { inteOm: "flagga", text } bara om den saknas.
   - val:     knappar. Ett val har "till", "utfall" eller "prov".
       krav:  { guld, sak, flagga, inteFlagga, klass, folk }
              klass/folk: valet syns bara om någon i sällskapet är det,
              och den hjälten slår själv. {namn} = den hjälten.
       engang: valet kan bara väljas en gång (namnet blir en flagga).
   - prov:    { egenskap, svarighet, fraga, lyckas, misslyckas,
                grupp (alla slår, hälften måste lyckas),
                lattare: { flagga, svarighet, varfor } }
              egenskap: sty smi tal klo vis cha
   - strid:   { fiender, vinst, forlust, justera: [{ flagga, typ, liv,
                rustning, text }] }
   - utfall:  text, till, guld (eller "halva" = tappa halva), sak,
              tappa ("alla" eller en sak), skada (alla), traffad (bara
              den som slog), hela (antal, "halva" eller "allt"), flagga
   - slut:    true betyder att kapitlet är klart.
   ===================================================================== */

window.FIENDER = {
  varg:      { namn: "Varg", liv: 11, rustning: 13, anfall: 4, skada: "2d4", bild: "varg",
               flyr: "gnyr till och försvinner in i mörkret." },
  vatte:     { namn: "Vätte", liv: 7, rustning: 13, anfall: 4, skada: "1d6+1", bild: "vatte",
               flyr: "faller ihop och blir liggande." },
  krak:      { namn: "Krak", liv: 22, rustning: 15, anfall: 5, skada: "1d8+2", bild: "krak",
               flyr: "tappar yxan, vrålar av ilska och flyr ut i natten." },
  spindel:   { namn: "Jättespindel", liv: 7, rustning: 12, anfall: 4, skada: "1d6", bild: "spindel",
               flyr: "kryper ihop och slutar röra sig." },
  skuggling: { namn: "Skuggling", liv: 6, rustning: 12, anfall: 3, skada: "1d4+1", bild: "skuggling",
               flyr: "löses upp som rök." },
  skuggan:   { namn: "Skuggan", liv: 32, rustning: 13, anfall: 5, skada: "1d8+2", bild: "skuggan",
               flyr: "skriker, ett ljud som får väggarna att skaka, och löses upp i tusen svarta trådar som försvinner ner i marken." }
};

window.AVENTYR = [
  {
    id: "k1",
    version: 2, // höj när kapitlet skrivs om, så börjar sparade framsteg om
    titel: "Lyktan och Skuggan",
    kort: "Mossbys magiska lykta är stulen och vakten ligger skadad. Före gryningen måste någon hämta tillbaka den, annars kommer skuggorna.",
    start: "start",
    scener: {

      start: {
        bild: "by", figur: "greta",
        text: "Det är mitt i natten när ni väcks av att någon bankar på dörren. Ute på gatan står gamla Greta med en fackla i handen. Hon är blek.\n\n– Lyktan är borta, säger hon. Någon har brutit sig in på torget och tagit den. Vakten Bo försökte stoppa dem, men han ligger skadad vid brunnen.\n\nGreta tittar upp mot himlen, där molnen drar fram över månen.\n\n– Ni förstår inte vad det betyder. Lyktan är inte bara en lampa. Så länge den lyser kan skuggorna inte komma in i byn. Ni har tid till gryningen. Efter det kommer de.",
        val: [ { text: "Klä på er och gå ut", till: "byn" } ]
      },

      byn: {
        bild: "by", figur: "greta",
        text: [
          "Byn är tyst. Snön knarrar under era fötter.",
          { inteOm: "sett_torget", text: "På torget står den tomma lyktstolpen med krossat glas runt foten." },
          { inteOm: "sett_bo", text: "Vid brunnen ligger vakten Bo i snön med en pil i axeln." },
          { om: "bo_omlagd", text: "Bo sitter lutad mot brunnen med axeln omlindad. Greta har lagt en filt över honom, och han nickar åt er att skynda er." },
          { om: "bo_svimmad", text: "Greta sitter på knä bredvid Bo, som fortfarande inte har vaknat. Hon viftar åt er att gå. – Jag tar hand om honom. Gå nu!" },
          { inteOm: ["sett_torget", "sett_bo"], text: "Bortom husen börjar Svartskogen.\n\nVad gör ni?" },
          { om: "sett_torget", inteOm: "sett_bo", text: "Bortom husen börjar Svartskogen.\n\nVad gör ni nu?" },
          { om: "sett_bo", inteOm: "sett_torget", text: "Bortom husen börjar Svartskogen.\n\nVad gör ni nu?" },
          { om: ["sett_torget", "sett_bo"], text: "Det finns inget mer ni kan göra här. Bortom husen väntar Svartskogen, och natten går fort." }
        ],
        val: [
          { text: "Undersök torget", engang: "sett_torget", till: "torget" },
          { text: "Hjälp vakten Bo", engang: "sett_bo", till: "bo" },
          { text: "Ge er av mot Svartskogen", till: "skogen" }
        ]
      },

      torget: {
        bild: "torg",
        text: "Glaset runt lyktstolpen är krossat. I snön finns fotspår, många och små, och några som är större. Någon har slagit sönder glaset med något tungt.",
        prov: {
          egenskap: "vis", svarighet: 13, fraga: "Vem letar efter ledtrådar?",
          lyckas: {
            text: "{namn} sätter sig på huk och tittar noga. Spåren kommer från vättar, minst fyra stycken, och en som är mycket större. I snön ligger en svart pil med en röd fjäder. Det är märket som vättarna i Svartskogen använder.\n\nOch något mer: på stolpen sitter svart sot, som om något kallt och mörkt har rört vid den. Det luktar inte som rök. Det luktar ingenting alls.",
            flagga: "spar", till: "byn" },
          misslyckas: {
            text: "Snön är så nedtrampad att det är svårt att se något. {namn} hittar bara glasbitar och en riktning: spåren leder mot Svartskogen.",
            till: "byn" }
        }
      },

      bo: {
        bild: "by", figur: "bo",
        text: "Vakten Bo ligger mot brunnen och biter ihop. Pilen sitter djupt i axeln.\n\n– Vättar, väser han. Ett helt gäng. Och deras hövding, Krak, ett stort monster med yxa. Men det var inte vättarna jag var rädd för …",
        val: [
          { text: "{namn} tar hand om såret", krav: { klass: "helare" }, utfall: {
              text: "{namn} drar försiktigt ut pilen, lägger om såret och säger några lugnande ord. Bo andas ut.\n\n– Tack, säger han. Lyssna nu. Vättarna har ett läger vid Gamla gruvan, på andra sidan bäcken. Men de jobbar åt någon. Jag såg den. Något svart som rörde sig som rök, utan ansikte.\n\nHan tar fram en läderpåse med guldmynt och en liten flaska och ger dem till er. – Ta det här. Ni kommer att behöva det.",
              flagga: ["vet_lager", "vet_skuggan", "bo_omlagd"], guld: 10, sak: "Läkedryck", till: "byn" } },
          { text: "Försök stoppa blödningen", prov: {
              egenskap: "vis", svarighet: 12, fraga: "Vem tar hand om Bo?",
              lyckas: {
                text: "{namn} trycker hårt mot såret och binder om det med en bit av sin mantel. Bo slutar skaka.\n\n– Vättarna har ett läger vid Gamla gruvan, på andra sidan bäcken, säger han. Men de jobbar åt någon. Något svart, som rörde sig som rök …\n\nHan räcker fram en läderpåse med guldmynt. – Ta den. Köp er förbi trollet vid bäcken om ni måste.",
                flagga: ["vet_lager", "vet_skuggan", "bo_omlagd"], guld: 10, till: "byn" },
              misslyckas: {
                text: "{namn} gör sitt bästa, men Bo har förlorat för mycket blod. Han hinner bara viska ”gruvan …” innan han svimmar. Greta skyndar fram och tar hand om honom.",
                flagga: ["vet_lager", "bo_svimmad"], till: "byn" }
            } }
        ]
      },

      skogen: {
        bild: "skog",
        text: "Svartskogen är kolsvart. Granarna står så tätt att månljuset knappt når marken. Någonstans långt bort ylar en varg. Sedan en till. Närmare.\n\nVättarnas spår är svåra att följa i mörkret. Går ni fel kan ni gå rakt i armarna på det som ylar.",
        val: [
          { text: "{namn} ser i mörker och leder vägen", krav: { folk: "katt" }, utfall: {
              text: "För {namn} är natten inte svart, bara grå. Spåren syns tydligt, och {namn} kan lukta sig fram. {namn} leder er i en stor båge runt vargarnas revir och fram till bäcken utan ett ljud.",
              till: "vadet" } },
          { text: "{namn} spårar vättarna", krav: { klass: "bagskytt" }, prov: {
              egenskap: "vis", svarighet: 9, fraga: "",
              lyckas: { text: "{namn} läser spåren som en bok: brutna kvistar, nedtrampad mossa, en tappad vättesko. Ni håller er i medvind så att vargarna inte känner er lukt.", till: "vadet" },
              misslyckas: { text: "Spåren tar slut vid en bäckfåra. När {namn} letar efter dem igen hör ni ett morrande bakom er.", till: "vargstrid" }
            } },
          { text: "Följ spåren så gott ni kan", prov: {
              egenskap: "vis", svarighet: 13, fraga: "Vem går först och letar spår?",
              lattare: { flagga: "spar", svarighet: 10, varfor: "Ni vet redan hur vättarnas spår ser ut, så det blir lättare." },
              lyckas: { text: "{namn} hittar spåren och följer dem tyst genom skogen. Vargarnas ylande hörs, men alltid lite längre bort.", till: "vadet" },
              misslyckas: { text: "{namn} tappar spåren. Ni går i cirklar, och plötsligt glimmar gula ögon mellan träden. Två stycken. Sedan fyra.", till: "vargstrid" }
            } }
        ]
      },

      vargstrid: {
        bild: "skog", figur: ["varg", "varg"],
        text: "Två stora gråvargar kliver fram ur mörkret. De är magra och hungriga, och de har bestämt sig för att ni är middag.",
        strid: {
          fiender: ["varg", "varg"],
          vinst: { text: "Vargarna ger upp och försvinner in bland träden. En bit bort hittar ni en liten påse som en vätte har tappat, med några mynt i. Spåren leder vidare mot bäcken.", guld: 5, till: "vadet" },
          forlust: "vargar_forlust"
        }
      },

      vargar_forlust: {
        bild: "bro", figur: "troll",
        text: "Det sista ni minns är vargarnas tänder i mörkret.\n\nNär ni vaknar ligger ni vid en eld under en bro. Ett stort, mossigt troll petar i glöden.\n\n– Bulle jagade bort vargarna, mullrar det. Bulle gillar inte vargar. Men räddning kostar. Bulle tog lite guld.\n\nNi är mörbultade, men ni lever.",
        hela: 3,
        val: [ { text: "Res er och fortsätt", utfall: { guld: "halva", flagga: "bulle_hjalpte", till: "vadet" } } ]
      },

      vadet: {
        bild: "bro", figur: "troll",
        text: "Bäcken är bred och strid av smältvatten. Över den går en gammal bro, och på bron står trollet Bulle, stort som ett vedskjul, med armarna i kors.\n\n– Ingen går över Bulles bro utan att betala, mullrar han. Tio guld. Eller så löser ni Bulles gåta. Svarar ni fel åker ni i bäcken.",
        val: [
          { text: "Betala tio guld", krav: { guld: 10 }, utfall: {
              text: "Bulle biter i varje mynt. Sedan kliver han åt sidan. – Vättar gick över i natt, säger han. De bar en bur. Något i buren lyste rött. Bulle tyckte inte om det.",
              guld: -10, flagga: "vet_drake", till: "lagret" } },
          { text: "Lös trollets gåta", prov: {
              egenskap: "klo", svarighet: 14, fraga: "Vem svarar på gåtan?",
              lyckas: {
                text: "– Ju mer du tar, desto mer lämnar du efter dig. Vad är det? frågar Bulle.\n\n{namn} tänker länge. Sedan tittar {namn} ner på snön. – Fotsteg!\n\nBulle stirrar. Sedan skrattar han så att bron skakar. – Ingen har klarat den på tvåhundra år! Gå över. Och se upp: vättarna bar en bur i natt. Något i den lyste rött.",
                flagga: "vet_drake", till: "lagret" },
              misslyckas: {
                text: "– Ju mer du tar, desto mer lämnar du efter dig. Vad är det?\n\n{namn} gissar på ”pengar”. Bulle grymtar, lyfter upp {namn} i kragen och slänger ner i bäcken. Ni andra hoppar efter. Vattnet är iskallt och strömmen stark. Er packning blir dyblöt, och en läkedryck flyter iväg.",
                traffad: "1d6", tappa: "Läkedryck", till: "lagret" }
            } },
          { text: "Övertala trollet", prov: {
              egenskap: "cha", svarighet: 14, fraga: "Vem pratar med Bulle?",
              lattare: { flagga: "bulle_hjalpte", svarighet: 9, varfor: "Bulle har redan räddat er en gång. Han verkar gilla er." },
              lyckas: {
                text: "{namn} berättar om lyktan och om skuggorna som kommer i gryningen. Bulle blir tyst länge.\n\n– Skuggor tycker inte om troll heller, säger han till slut och kliver åt sidan. Gå. Och se upp: vättarna bar en bur i natt. Något i den lyste rött.",
                flagga: "vet_drake", till: "lagret" },
              misslyckas: {
                text: "– Prat! fnyser Bulle. Ni får vada över. Strömmen sliter i benen och vattnet är så kallt att det gör ont.",
                skada: "1d4", till: "lagret" }
            } },
          { text: "Vada över bäcken en bit bort", prov: {
              egenskap: "sty", svarighet: 12, grupp: true, fraga: "Strömmen är stark.",
              lyckas: { text: "Ni håller i varandra och tar er över, steg för steg. Kalla och blöta, men hela.", till: "lagret" },
              misslyckas: { text: "Strömmen tar tag i er. Ni kravlar upp på andra sidan, men alla har slagit sig på stenarna, och en läkedryck har flutit iväg.", skada: "1d4", tappa: "Läkedryck", till: "lagret" }
            } }
        ]
      },

      lagret: {
        bild: "lager", figur: "drake_bur",
        text: "På en glänta framför ett gammalt gruvhål brinner en lägereld. Runt den sitter fyra vättar och gnager på ben. Bredvid står en järnbur, och i buren ligger en liten drake med glödande röda fjäll. Han har kedjor runt nosen.\n\nVättarna har inte sett er. Än.",
        val: [
          { text: "Smyg fram till buren", prov: {
              egenskap: "smi", svarighet: 13, grupp: true, fraga: "Ni måste alla ta er förbi vättarna utan ett ljud.",
              lyckas: { text: "Ni rör er i skuggorna, ett steg i taget. En vätte vänder sig om, men tittar rakt förbi er. Ni når buren.", till: "buren" },
              misslyckas: { text: "Någon kliver på en torr gren. Fyra par gula ögon vänds mot er. – Inkräktare! skriker en vätte och tar sitt spjut.", till: "vattestrid" }
            } },
          { text: "{namn} smyger fram ensam", krav: { klass: "ninja" }, prov: {
              egenskap: "smi", svarighet: 11,
              lyckas: { text: "{namn} glider fram som en skugga och vinkar åt er att följa i exakt samma spår. Ni når buren utan att någon märker något.", till: "buren" },
              misslyckas: { text: "{namn} är nästan framme när en vätte reser sig för att hämta mer ved och tittar rakt på {namn}. – Larm!", till: "vattestrid" }
            } },
          { text: "{namn} skapar en illusion", krav: { klass: "magiker" }, prov: {
              egenskap: "klo", svarighet: 12,
              lyckas: { text: "{namn} viskar en formel. Ute i skogen hörs plötsligt ljudet av något stort som bryter grenar. Vättarna hoppar upp, tar sina spjut och springer dit. Ni har fri väg till buren.", till: "buren" },
              misslyckas: { text: "Illusionen fladdrar och försvinner. Vättarna stirrar på det glittrande ljuset, och sedan på er.", till: "vattestrid" }
            } },
          { text: "{namn} sjunger en vaggvisa", krav: { klass: "bard" }, prov: {
              egenskap: "cha", svarighet: 13,
              lyckas: { text: "{namn} sjunger lågt och mjukt från skuggorna. En efter en börjar vättarna gäspa, och snart snarkar alla fyra.", till: "buren" },
              misslyckas: { text: "En vätte somnar. De andra tre springer mot er med spjuten i högsta hugg.", till: "vattestrid" }
            } },
          { text: "Anfall!", till: "vattestrid" }
        ]
      },

      vattestrid: {
        bild: "lager",
        text: "Vättarna kastar sina ben, tar sina spjut och anfaller. De är små, men de är snabba och elaka.",
        strid: {
          fiender: ["vatte", "vatte", "vatte"],
          vinst: { text: "Den sista vätten faller. Vid elden hittar ni deras byte: några guldmynt och en läkedryck. I buren tittar den lilla draken på er med stora, rädda ögon.", guld: 8, sak: "Läkedryck", till: "buren" },
          forlust: "fangad"
        }
      },

      fangad: {
        bild: "lager", figur: "drake_bur",
        text: "Ni vaknar med en dunkande huvudvärk. Ni sitter i en järnbur, och vättarna har tagit all er packning och hälften av ert guld.\n\nI buren bredvid ligger den lilla draken. Han tittar på er och viskar: – Jag heter Glöd. Om ni får upp er bur, så hjälp mig också. Snälla.\n\nVättarna sover vid elden. Det är er chans.",
        hela: "halva",
        val: [
          { text: "Böj isär gallret", utfall: { tappa: "alla", guld: "halva", till: "fly_sty" } },
          { text: "Dyrka upp låset med ett spänne", utfall: { tappa: "alla", guld: "halva", till: "fly_smi" } }
        ]
      },
      fly_sty: {
        bild: "lager", figur: "drake_bur",
        text: "Gallret är gammalt och rostigt. Kanske håller det inte om man tar i ordentligt.",
        prov: {
          egenskap: "sty", svarighet: 13, fraga: "Vem är starkast?",
          lyckas: { text: "{namn} tar spjärn och drar. Gallret gnisslar och böjs. Ni kryper ut och bänder upp Glöds bur på samma sätt. Glöd sliter av sig kedjorna och ler.\n\n– Skuggan har lyktan, viskar han. Den är i gruvan. Den äter ljuset. Jag kan hjälpa er.", flagga: "glod_fri", till: "gruvan" },
          misslyckas: { text: "Gallret skramlar. En vätte vaknar, går fram och slår {namn} med spjutskaftet innan han somnar om. Ni får försöka igen, tystare den här gången.", traffad: "1d4", till: "fly_sty" }
        }
      },
      fly_smi: {
        bild: "lager", figur: "drake_bur",
        text: "Låset är enkelt, men det sitter på utsidan. Man måste sträcka ut handen genom gallret och dyrka utan att se.",
        prov: {
          egenskap: "smi", svarighet: 13, fraga: "Vem har de smidigaste fingrarna?",
          lyckas: { text: "Klick. {namn} öppnar er bur och sedan Glöds. Draken sliter av sig kedjorna och ler.\n\n– Skuggan har lyktan, viskar han. Den är i gruvan. Den äter ljuset. Jag kan hjälpa er.", flagga: "glod_fri", till: "gruvan" },
          misslyckas: { text: "Spännet glider och skramlar mot järnet. En vätte vaknar, går fram och slår {namn} på fingrarna innan han somnar om. Ni får försöka igen.", traffad: "1d4", till: "fly_smi" }
        }
      },

      buren: {
        bild: "lager", figur: "drake_bur",
        text: "Draken i buren är inte större än en hund. Han lyfter huvudet och tittar på er.\n\n– Jag heter Glöd, viskar han genom kedjorna. Vättarna fångade mig för att jag lyser. De ville använda mig som lykta i gruvan, men Skuggan tyckte inte om mitt ljus, så de tog er lykta i stället. Släpp ut mig, så hjälper jag er.\n\nBuren är låst med ett tungt hänglås.",
        val: [
          { text: "Dyrka upp hänglåset", prov: {
              egenskap: "smi", svarighet: 13, fraga: "Vem dyrkar?",
              lyckas: { text: "Klick! Låset öppnas. Glöd skakar av sig kedjorna och sträcker på vingarna. – Tack. Nu går vi och hämtar er lykta.", flagga: "glod_fri", till: "gruvan" },
              misslyckas: { text: "Låset sitter fast. När {namn} försöker igen hörs tunga steg bakom er. – VEM RÖR MIN DRAKE? vrålar en röst.", till: "krakstrid" }
            } },
          { text: "Bryt upp buren", prov: {
              egenskap: "sty", svarighet: 14, fraga: "Vem är starkast?",
              lyckas: { text: "{namn} drar i gallret tills det ger efter med ett gnissel. Glöd kryper ut och skakar av sig kedjorna. – Tack. Nu går vi och hämtar er lykta.", flagga: "glod_fri", till: "gruvan" },
              misslyckas: { text: "Gallret gnisslar högt. För högt. Från gruvan hörs ett vrål och tunga steg. – VEM RÖR MIN DRAKE?", till: "krakstrid" }
            } },
          { text: "Låt draken vara och gå mot gruvan", till: "gruvan" }
        ]
      },

      krakstrid: {
        bild: "lager", figur: ["krak", "vatte"],
        text: "Ut ur mörkret kliver Krak, vättarnas hövding. Han är dubbelt så stor som en vanlig vätte, har hornhjälm och en yxa som skulle kunna klyva en stubbe. Bakom honom springer en vätte.",
        strid: {
          fiender: ["krak", "vatte"],
          vinst: { text: "Krak är borta. I snön ligger nyckeln till buren, som han tappade. Ni öppnar den, och Glöd sliter av sig kedjorna.\n\n– Skuggan har lyktan, säger han. Den är i gruvan. Den äter ljuset. Jag följer med er.", guld: 10, flagga: ["glod_fri", "krak_borta"], till: "gruvan_tom" },
          forlust: "fangad"
        }
      },

      gruvan: {
        bild: "gruva", figur: "krak",
        text: "Gruvans ingång är ett svart hål i berget, inramat av gamla timmerstockar. Framför den står Krak, vättarnas hövding, stor som en dörr, med en yxa i handen. Han har inte sett er än, men han står mitt i vägen.",
        val: [
          { text: "Låt Glöd flyga mot honom", krav: { flagga: "glod_fri" }, utfall: {
              text: "Glöd störtar fram ur mörkret och sprutar en eldstråle rakt på Kraks hjälm. Krak vrålar och viftar med yxan, och nu ser han er också.", flagga: "glod_anfall", till: "krakstrid2" } },
          { text: "Lura honom att ni är vättar med ett budskap", prov: {
              egenskap: "cha", svarighet: 15, fraga: "Vem pratar?",
              lyckas: { text: "{namn} sänker rösten och väser: – Hövding! Människorna kommer från byn! Hundra stycken! Krak svär, tar sin yxa och springer mot skogen för att möta dem. Vägen är fri.", flagga: "krak_borta", till: "gruva_inne" },
              misslyckas: { text: "Krak tittar länge på {namn}. – Du är ingen vätte, säger han. Du är frukost.", till: "krakstrid2" }
            } },
          { text: "Anfall!", till: "krakstrid2" }
        ]
      },

      krakstrid2: {
        bild: "gruva", figur: "krak",
        text: "Krak lyfter yxan och visslar. En vätte kommer springande ut ur gruvan.",
        strid: {
          fiender: ["krak", "vatte"],
          justera: [ { flagga: "glod_anfall", typ: "krak", liv: -8, text: "Glöds eld har redan bränt Krak. Han börjar striden svagare." } ],
          vinst: { text: "Krak flyr ut i skogen. Vägen in i gruvan är fri.", guld: 10, flagga: "krak_borta", till: "gruva_inne" },
          forlust: "fangad"
        }
      },

      gruvan_tom: {
        bild: "gruva",
        text: "Framför gruvans svarta ingång ligger vättarnas vakter utslagna. Det luktar fukt och gammal sten. Långt därinne hörs något som låter som en viskning.",
        val: [ { text: "Gå in i gruvan", till: "gruva_inne" } ]
      },

      gruva_inne: {
        bild: "gruva_inne",
        text: "Gruvgången är trång och lågt i tak. Gamla stöttor av trä knakar. Längs golvet går räls, och här och där hänger en lykta som någon för länge sedan har glömt.\n\nGången delar sig. Rälsen fortsätter rakt fram. Till vänster går en stege ner i ett djupt schakt.",
        val: [
          { text: "Vila en stund", engang: "vilat", info: "Alla får tillbaka halva sitt liv. Går bara en gång.", utfall: {
              text: "Ni sätter er med ryggen mot berget och delar på det lilla ni har. Ingen säger något. Efter en stund känner ni er starkare.",
              hela: "halva", till: "gruva_inne" } },
          { text: "Följ rälsen", till: "fallan" },
          { text: "Klättra ner i schaktet", prov: {
              egenskap: "sty", svarighet: 12, grupp: true, fraga: "Stegen är rutten och hal.",
              lyckas: { text: "Ni klättrar ner, pinne för pinne. Längst ner fortsätter en gång mot ett svagt, kallt ljus.", till: "salen_fore" },
              misslyckas: { text: "En pinne går av. Ni halkar, glider och landar i en hög längst ner. Det gör ont, men ni är där.", skada: "1d6", till: "salen_fore" }
            } }
        ]
      },

      fallan: {
        bild: "gruva_inne",
        text: "Rälsen leder djupare in. Golvet är täckt av damm, men mitt i gången ligger en sten som är alldeles ren. Som om någon har ställt den där med flit.",
        prov: {
          egenskap: "vis", svarighet: 13, fraga: "Vem går först?",
          lyckas: { text: "{namn} stannar. Stenen är en tryckplatta, och i väggen sitter små hål. Ni kliver försiktigt runt den. Längre fram hänger tjocka, vita nät från taket.", till: "spindelboet" },
          misslyckas: { text: "{namn} kliver på stenen. KLICK. Små pilar skjuter ut ur väggen och träffar. Det svider. Längre fram hänger tjocka, vita nät från taket.", traffad: "2d4", till: "spindelboet" }
        }
      },

      spindelboet: {
        bild: "gruva_inne", figur: ["spindel", "spindel"],
        text: "Gången är full av spindelnät. I näten hänger gamla saker: en hjälm, en ryggsäck, en sko. Och i taket rör sig något. Två spindlar, stora som hundar, sitter och väntar.",
        val: [
          { text: "Smyg förbi under näten", prov: {
              egenskap: "smi", svarighet: 13, grupp: true, fraga: "Ni får inte nudda en enda tråd.",
              lyckas: { text: "Ni kryper under näten, långsamt, långsamt. Spindlarna rör sig inte. Ni kommer förbi.", till: "salen_fore" },
              misslyckas: { text: "Någon nuddar en tråd. Hela nätet darrar, och spindlarna släpper sig ner från taket.", till: "spindelstrid" }
            } },
          { text: "Anfall spindlarna", till: "spindelstrid" }
        ]
      },

      spindelstrid: {
        bild: "gruva_inne",
        text: "Spindlarna kommer emot er med käkarna öppna.",
        strid: {
          fiender: ["spindel", "spindel"],
          vinst: { text: "Spindlarna rör sig inte längre. I den gamla ryggsäcken i nätet hittar ni guldmynt och en läkedryck. Någon annan har varit här före er. Den kom inte ut.", guld: 10, sak: "Läkedryck", till: "salen_fore" },
          forlust: "gruva_forlust"
        }
      },

      gruva_forlust: {
        bild: "gruva", figur: "greta",
        text: "Allt blir svart.\n\nNär ni vaknar ligger ni utanför gruvan i snön. Greta står böjd över er med sin fackla. Hon har följt efter er hela vägen.\n\n– Ni lever, säger hon. Det räcker. Men natten är snart slut. Ni måste in igen.",
        hela: "halva",
        val: [ { text: "Gå in i gruvan igen", till: "gruva_inne" } ]
      },

      salen_fore: {
        bild: "gruva_inne",
        text: "Gången slutar vid en stor öppning. Därinne är det kallt, så kallt att andedräkten fryser. Ni hör viskningar, många röster på en gång, som säger ingenting.\n\nGreta sa att skuggorna inte tål ljuset från lyktan. Om ni bara kunde komma åt den.",
        val: [
          { text: "Vila en stund innan ni går in", engang: "vilat", info: "Alla får tillbaka halva sitt liv. Går bara en gång.", utfall: {
              text: "Ni sätter er tätt ihop och samlar mod. Ingen vet vad som väntar därinne. Men ni är tillsammans.", hela: "halva", till: "salen_fore" } },
          { text: "Gå in", till: "salen" }
        ]
      },

      salen: {
        bild: "sal", figur: ["skuggan", "skuggling"],
        text: "Salen är enorm. I mitten står en stenpelare, och på den står Mossbys lykta. Men ljuset är svagt, som om något suger i sig det.\n\nFramför pelaren svävar Skuggan. Den är dubbelt så lång som en vuxen och gjord av mörker, med två kalla, vita ögon. Bredvid den virvlar en mindre skugga.\n\n– Ljuset är mitt nu, viskar Skuggan med tusen röster. Och snart är er by det också.",
        val: [
          { text: "Låt Glöd flyga mot lyktan", krav: { flagga: "glod_fri" }, utfall: {
              text: "Glöd störtar fram, slår vingarna runt lyktan och blåser. Hans eld flyter in i den, och lyktan flammar upp. Skuggan skriker och krymper ihop.",
              flagga: "glod_eld", till: "skuggstrid" } },
          { text: "Smyg fram och ta lyktan", prov: {
              egenskap: "smi", svarighet: 15, fraga: "Vem springer efter lyktan?",
              lyckas: { text: "{namn} rusar fram, griper lyktan och lyfter den högt. Ljuset slår mot Skuggan som en våg. Den viker undan och blir mindre.", flagga: "lykta_tagen", till: "skuggstrid" },
              misslyckas: { text: "{namn} är nästan framme när Skuggan sveper till med en kall arm. {namn} kastas bakåt mot väggen.", traffad: "1d8", till: "skuggstrid" }
            } },
          { text: "{namn} ber om ljus", krav: { klass: "helare" }, prov: {
              egenskap: "vis", svarighet: 13,
              lyckas: { text: "{namn} lyfter handen och ber. Ett varmt sken växer fram runt sällskapet, och Skuggans kalla ögon smalnar.", flagga: "ljusbon", till: "skuggstrid" },
              misslyckas: { text: "{namn} ber, men orden försvinner i mörkret. Skuggan skrattar.", till: "skuggstrid" }
            } },
          { text: "Anfall!", till: "skuggstrid" }
        ]
      },

      skuggstrid: {
        bild: "sal",
        text: "Skuggan sträcker ut sina armar. Det blir kallt, kallt, kallt.",
        strid: {
          fiender: ["skuggan", "skuggling"],
          justera: [
            { flagga: "glod_eld", typ: "skuggan", liv: -10, rustning: -2, text: "Glöds eld i lyktan bränner Skuggan. Den är svagare och lättare att träffa." },
            { flagga: "lykta_tagen", typ: "skuggan", liv: -8, text: "Lyktans ljus har redan skadat Skuggan." },
            { flagga: "ljusbon", typ: "skuggan", rustning: -2, text: "Det varma skenet gör Skuggan lättare att träffa." }
          ],
          vinst: { text: "Det blir alldeles tyst. Sedan börjar lyktan lysa, starkare och starkare, tills hela salen är gul och varm.\n\nNi tar lyktan och går mot utgången. När ni kommer ut ur gruvan har himlen börjat bli ljus i öster. Ni hann.", till: "efter" },
          forlust: "skugga_forlust"
        }
      },

      skugga_forlust: {
        bild: "gruva_inne",
        text: "Kylan tar över och allt blir svart.\n\nNär ni vaknar ligger ni i gången utanför salen. Skuggan har inte följt efter. Den vet att ni inte orkar. Ni är svaga och frusna, och någonstans långt borta har tuppen i Mossby börjat gala.\n\nDet finns bara en chans kvar.",
        hela: "halva",
        val: [ { text: "Res er och gå in igen", till: "salen" } ]
      },

      efter: {
        bild: "gruva",
        text: "Ni står utanför gruvan med lyktan i händerna. Den värmer som en liten sol.",
        val: [
          { text: "Gå hem till Mossby med Glöd", krav: { flagga: "glod_fri" }, utfall: { guld: 20, till: "slut_glod" } },
          { text: "Gå hem till Mossby", krav: { inteFlagga: "glod_fri" }, utfall: { guld: 20, till: "slut" } }
        ]
      },

      slut_glod: {
        bild: "hem", figur: ["greta", "drake"],
        text: "När ni kommer in i Mossby i gryningen står hela byn på torget. Lyktan sätts tillbaka på sin stolpe och lyser upp varenda vrå. Bo står där med armen i band och nickar mot er.\n\nGreta tar emot er en efter en. Hon ger er en påse med guldmynt som hela byn har samlat ihop.\n\nOch Glöd? Han lägger sig på Gretas tak, där lyktans sken når honom. – Jag stannar ett tag, säger han. Ifall skuggorna kommer tillbaka.\n\nFör någonstans djupt under berget finns det fler.",
        slut: true, slutrad: "Lyktan lyser igen, och ni har fått en drake som vän."
      },

      slut: {
        bild: "hem", figur: "greta",
        text: "När ni kommer in i Mossby i gryningen står hela byn på torget. Lyktan sätts tillbaka på sin stolpe och lyser upp varenda vrå.\n\nGreta tar emot er och ger er en påse med guldmynt som hela byn har samlat ihop.\n\nMen när ni går hem tänker ni på den lilla draken i buren vid gruvan. Vättarna kommer tillbaka. Och någonstans djupt under berget finns det fler skuggor.",
        slut: true, slutrad: "Lyktan lyser igen. Men inte alla blev räddade."
      }
    }
  },

  {
    id: "k2",
    titel: "Kapitel 2",
    kort: "Nästa äventyr skrivs snart.",
    kommer: true
  }
];
