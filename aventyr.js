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
               flyr: "skriker, ett ljud som får väggarna att skaka, och löses upp i tusen svarta trådar som försvinner ner i marken." },
  irrbloss:  { namn: "Irrbloss", liv: 5, rustning: 13, anfall: 4, skada: "1d4", bild: "irrbloss",
               flyr: "slocknar med ett litet pys och luktar bränt." },
  dimvarg:   { namn: "Dimvarg", liv: 14, rustning: 13, anfall: 5, skada: "1d6+2", bild: "dimvarg",
               flyr: "löses upp i vit dimma som blåser bort mellan träden." },
  dimvasen:  { namn: "Dimväsen", liv: 9, rustning: 12, anfall: 4, skada: "1d6", bild: "dimvasen",
               flyr: "sjunker ihop till en liten vit pöl på golvet." },
  spoke:     { namn: "Spöke", liv: 12, rustning: 12, anfall: 4, skada: "1d6+1", bild: "spoke",
               flyr: "bugar djupt och bleknar bort rakt genom väggen." },
  vampyrfladdermus: { namn: "Vampyrfladdermus", liv: 8, rustning: 13, anfall: 4, skada: "1d4+1", bild: "vampyrfladdermus",
               flyr: "piper argt och försvinner upp i skorstenen." },
  levande_rustning: { namn: "Levande rustning", liv: 24, rustning: 16, anfall: 5, skada: "1d8+1", bild: "levande_rustning",
               flyr: "rasar ihop i en hög av plåt som skramlar nerför trappan." },
  dimfrun:   { namn: "Grevinnan Dimma", liv: 42, rustning: 14, anfall: 6, skada: "1d8+3", bild: "dimfrun",
               flyr: "blir tunn som andedräkt en kall dag och sugs in i spegeln med ett långt, argt skrik." }
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
        bild: "gruva_inne|spindel", figur: ["spindel", "spindel"],
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
    version: 1,
    titel: "Vintern som inte tar slut",
    kort: "Lyktan krymper för varje natt och en iskall dimma kryper in över Mossby. I det gamla spökhuset på kullen hänger lyktans tvilling.",
    start: "start",
    laskrav: "k1",                                   // kapitel 1 måste vara klart
    arv: { fran: "k1", flaggor: ["glod_fri", "bulle_hjalpte"] },  // det ni gjorde i kapitel 1 följer med
    scener: {

      start: {
        bild: "by", figur: "greta",
        text: [
          "Det har gått två veckor sedan ni hämtade tillbaka lyktan. Det är mitt i augusti, men i natt frös vattnet i hinken på gården, och på morgonen låg rimfrost på alla tak.\n\nGreta står utanför er dörr igen. Den här gången är det ljust ute, men hon ser lika rädd ut som den natten.\n\n– Lyktan krymper, säger hon. Varje natt blir lågan mindre. Och tre i byn har somnat och går inte att väcka.",
          { om: "glod_fri", text: "Glöd ligger på Gretas tak som han brukar. Han är vaken och tittar åt samma håll hela tiden: mot skogen i norr." }
        ],
        val: [ { text: "Följ med Greta till torget", till: "torget" } ]
      },

      torget: {
        bild: "torg", figur: ["greta", "bo"],
        text: "På torget står lyktstolpen. Lågan i lyktan är inte större än ett ljus längre, fast den brukar lysa upp hela torget.\n\nPå bänkarna ligger tre bybor under filtar. De sover djupt, och det ligger ett tunt lager frost på filtarna, fast ingen annan fryser.\n\nBo står bredvid. Armen är lagad, och han har yxan i bältet igen.",
        val: [
          { text: "Titta närmare på de som sover", engang: "tittat_sovande", prov: {
              egenskap: "vis", svarighet: 11, fraga: "Vem undersöker dem?",
              lyckas: { text: "{namn} lutar sig fram. De andas, långsamt och lugnt, som om de drömmer något fint. Men andedräkten ryker som på vintern. Och det luktar något svagt om dem: gamla, torkade rosor.", flagga: "rosdoft", till: "torget" },
              misslyckas: { text: "{namn} skakar dem försiktigt i axeln och ropar i örat. Ingenting händer. De sover bara vidare.", till: "torget" }
            } },
          { text: "Fråga Bo om huset på kullen", engang: "fragat_bo", utfall: {
              text: "Bo blir tyst en stund.\n\n– Dimsäter, säger han till slut. Det stora huset bortom skogen. Min farfar var dräng där när han var liten. Han sa att frun i huset aldrig gick ut i solen, och att hon hade en spegel som var kallare än snö. En vinter slutade röken komma ur skorstenen, och sedan dess har ingen gått dit.",
              flagga: "vet_dimsater", till: "torget" } },
          { text: "Känn på lyktan", engang: "kant_lyktan", prov: {
              egenskap: "klo", svarighet: 12, fraga: "Vem känner på lyktan?",
              lyckas: { text: "{namn} håller handen mot glaset. Det är iskallt, trots att lågan brinner inuti. Ljuset dras liksom inåt, som vatten i ett avlopp.\n\n– Något drar i den, säger {namn}. Någon annanstans ifrån.", flagga: "lyktkall", till: "torget" },
              misslyckas: { text: "{namn} bränner sig nästan på glaset och drar undan handen. Eller var det kallt? Det gick inte att avgöra.", till: "torget" }
            } },
          { text: "Följ med Greta ner i källaren", till: "kallaren" }
        ]
      },

      kallaren: {
        bild: "kallare", figur: "greta",
        text: [
          "Greta lyfter på en lucka i golvet och går före ner. Källaren är full av syltburkar, och längst in står en kista som inte har öppnats på länge.\n\nHon tar fram en gammal ritning. På den finns två saker ritade bredvid varandra: en lykta och en spegel.\n\n– De göts samtidigt, av samma smed, säger Greta. Lyktan samlar ljus. Spegeln samlar kyla. Så länge de hänger var för sig drar spegeln i lyktan, och vinner till slut. Spegeln hänger i Dimsäter.",
          { om: "rosdoft", text: "– Rosor, säger Greta när ni berättar om lukten. Frun i Dimsäter hade ett helt rum med rosor. De blommade mitt i vintern." },
          "I kistan ligger tre saker. Greta säger att ni får välja en var det är ont om plats i ryggsäcken."
        ],
        val: [
          { text: "Ta den varma kappan", utfall: { text: "Kappan är tung och luktar lavendel, men den är så varm att ni nästan svettas bara av att hålla i den.", sak: "Varm kappa", flagga: "kappa", till: "bygrinden" } },
          { text: "Ta repet", utfall: { text: "Ett långt rep av hampa, hårt och strävt. Det går att klättra i, binda ihop sig med, eller hissa ner något tungt.", sak: "Rep", flagga: "rep", till: "bygrinden" } },
          { text: "Ta fickljuset", utfall: { text: "En liten lykta av mässing, inte större än en näve. När Greta öppnar luckan tänds en gnista inuti av sig själv.\n\n– Den är gjord av samma smed, säger hon. Den är liten. Men den är envis.", sak: "Fickljus", flagga: "fickljus", till: "bygrinden" } }
        ]
      },

      bygrinden: {
        bild: "by", figur: "bo",
        text: [
          "Bo följer med er ut till grinden i norra änden av byn. Där tar han farväl.\n\n– Ta bron över bäcken, säger han. Och gå inte efter ljus som rör sig. Min farfar sa det, och han gick dit en gång.\n\n– Vad hände med honom?\n\n– Han kom tillbaka, säger Bo. Men han pratade aldrig om det.",
          { om: "glod_fri", text: "Glöd lyfter från taket och flyger före er, lågt över vägen. Han är ingen stor drake, men han är varm, och så länge han är nära känns kylan mindre." }
        ],
        val: [ { text: "Gå mot bron", till: "bron" } ]
      },

      bron: {
        bild: "bro", figur: "troll",
        text: [
          "Bäcken är helt stilla. Det som var strömt vatten i våras ligger nu under en tjock isskorpa.\n\nMitt på bron står trollet Bulle. Han står alldeles stilla, och först tror ni att han bara är sur. Sedan ser ni att isen går ända upp till hans knän, och att det hänger istappar i hans ögonbryn.\n\n– Bulle, kan han säga. Bulle kan inte. Röra. Sig.",
          { om: "bulle_hjalpte", text: "Det var Bulle som drog upp er ur bäcken förra gången. Ni är skyldiga honom en tjänst." }
        ],
        val: [
          { text: "Glöd smälter isen", krav: { flagga: "glod_fri" }, utfall: {
              text: "Glöd landar på räcket, drar in luft och blåser en lång, varm eldstråle längs bron. Isen smälter och rinner i strömmar ner i bäcken. Bulle lyfter på ena foten, sedan den andra, och stampar så att hela bron skakar.\n\n– BULLE KAN RÖRA SIG! vrålar han. Bulle följer med! Något i det där huset gjorde Bulles bro kall!",
              flagga: "bulle_tinad", till: "dimskogen" } },
          { text: "Hugg loss honom ur isen", prov: {
              egenskap: "sty", svarighet: 13, grupp: true, fraga: "Isen är hård som sten.",
              lyckas: { text: "Ni hugger och bänder tills isen spricker i stora flak. Bulle kliver upp, skakar av sig och ser nästan generad ut.\n\n– Bulle följer med, säger han. Något i huset på kullen gjorde Bulles bro kall. Bulle vill prata med den.", flagga: "bulle_tinad", till: "dimskogen" },
              misslyckas: { text: "Isen vill inte släppa, och det går hål på den bara där det inte spelar någon roll. Till slut säger Bulle att ni ska gå. – Bulle väntar. Bulle är bra på att vänta.\n\nNi får stå i kylan länge, och alla blir frusna och stela.", skada: "1d4", till: "dimskogen" }
            } },
          { text: "{namn} värmer isen med magi", krav: { klass: "magiker" }, prov: {
              egenskap: "klo", svarighet: 12,
              lyckas: { text: "{namn} lägger händerna mot isen och viskar en formel. Isen blir först blank, sedan grå, och sedan rinner den bara bort. Bulle sträcker på sig med ett ljud som en dörr som öppnas.\n\n– Bulle följer med, säger han. Bulle är arg nu.", flagga: "bulle_tinad", till: "dimskogen" },
              misslyckas: { text: "Formeln tar i fel ände. Isen blir ännu hårdare, och det smäller till som när man går på nyis. Bulle suckar. – Gå, säger han. Bulle väntar.", till: "dimskogen" }
            } },
          { text: "Ni har inte tid, gå vidare", utfall: {
              text: "Ni klättrar förbi honom. Bulle säger ingenting, men ni känner hur han tittar efter er hela vägen över bron.", till: "dimskogen" } }
        ]
      },

      dimskogen: {
        bild: "dimskog",
        text: "På andra sidan bron tar dimman emot er som en vägg. Den är vit och tjock och luktar gamla rosor.\n\nStigen delar sig i tre, och alla tre ser likadana ut. Mellan träden rör sig små bleka ljus, ungefär som facklor, men de stannar aldrig stilla.",
        val: [
          { text: "Följ ljusen", utfall: {
              text: "Ljusen glider framför er, alltid lika långt bort. Ni går och går, tills ni plötsligt står vid bron igen, fast ni aldrig vände om.\n\nSedan slocknar ljusen. Och tänds igen, mycket närmare, och nu kommer de rakt mot er.", till: "irrbloss_strid" } },
          { text: "Lyssna efter bäcken", prov: {
              egenskap: "vis", svarighet: 13, fraga: "Vem lyssnar?",
              lyckas: { text: "{namn} blundar och lyssnar bort dimman. Någonstans till höger porlar vatten under isen. Bäcken rinner mot norr, och norrut ligger kullen.\n\nNi följer ljudet, stig efter stig, tills marken börjar luta uppåt.", till: "gravkullen" },
              misslyckas: { text: "{namn} lyssnar, men dimman slukar alla ljud. Och plötsligt är ljusen inte mellan träden längre. De är runt er.", till: "irrbloss_strid" }
            } },
          { text: "Bind ihop er med repet", krav: { sak: "Rep" }, utfall: {
              text: "Ni knyter repet runt livet på varandra, en efter en, och går med tio steg emellan. När den främste vinklar av åt fel håll känner den bakerste det genast i repet.\n\nSå tar ni er rakt igenom dimman, utan att tappa bort varandra en enda gång.", flagga: "rep_anvant", till: "gravkullen" } },
          { text: "{namn} letar efter spår i snön", krav: { klass: "bagskytt" }, prov: {
              egenskap: "vis", svarighet: 11,
              lyckas: { text: "{namn} går långsamt med blicken i marken. Här har något gått: stora tassar, fyra tår, inga klor. De går alla åt samma håll, mot kullen. Ni följer dem baklänges.", flagga: "spar_sedda", till: "gravkullen" },
              misslyckas: { text: "{namn} hittar spår, men de leder i en cirkel. Och mitt i cirkeln står ni själva, med ljusen tätt inpå.", till: "irrbloss_strid" }
            } }
        ]
      },

      irrbloss_strid: {
        bild: "dimskog",
        text: "Ljusen är inga facklor. Det är små kalla lågor med ansikten i, och de vill inte att ni ska komma fram.",
        strid: {
          fiender: ["irrbloss", "irrbloss", "irrbloss"],
          vinst: { text: "Det sista ljuset slocknar med ett pys. Och när de är borta lyfter dimman lite, precis tillräckligt för att ni ska se att marken lutar uppåt åt ett håll.", till: "gravkullen" },
          forlust: "dimskog_forlust"
        }
      },

      dimskog_forlust: {
        bild: "dimskog",
        text: "Allt blir vitt, och sedan svart.\n\nNi vaknar liggande i snön med ljusen svävande högt över er. De verkar nöjda. Ni har inte gått framåt, men ni har inte blivit kallare heller.\n\nNågonstans ovanför er finns kullen.",
        hela: "halva",
        val: [ { text: "Res er och gå vidare", till: "gravkullen" } ]
      },

      gravkullen: {
        bild: "gravkulle",
        text: "Halvvägs uppför kullen ligger en gammal gravplats. Stenarna står snett, och på den största sitter ett utsiktsglas av järn, som en liten kikare, fastbultad i stenen och riktad mot toppen.\n\nFramför stenen ligger färska tassavtryck. Stora.",
        val: [
          { text: "Titta i järnkikaren", engang: "kikat", utfall: {
              text: "Glaset är kallt mot ögat, men dimman syns inte i det. Genom kikaren ser ni huset på toppen helt tydligt: tre våningar, ett torn med en klocka, och ett glashus på baksidan där det växer något rött.\n\nOch i ett av fönstren på översta våningen står någon liten och vinkar.",
              flagga: "sett_huset", till: "gravkullen" } },
          { text: "Läs på stenarna", engang: "last_stenar", prov: {
              egenskap: "klo", svarighet: 11, fraga: "Vem läser?",
              lyckas: { text: "{namn} skrapar bort mossan. Samma efternamn om och om igen, och samma år på nästan alla: samma vinter.\n\nPå den minsta stenen står bara ett förnamn och en mening: ”Hon sov in och vaknade inte.”", flagga: "vet_barnet", till: "gravkullen" },
              misslyckas: { text: "Bokstäverna är nästan helt bortnötta, och mossan sitter hårt. {namn} får bara fram ett årtal.", till: "gravkullen" } },
            },
          { text: "Gräv i den lösa jorden vid stenen", engang: "gravt", prov: {
              egenskap: "sty", svarighet: 12, fraga: "Vem gräver?",
              lyckas: { text: "{namn} gräver med händerna i den frusna jorden tills något skramlar: en liten låda med tolv guldmynt och en läkedryck som någon gömt undan för länge sedan.", guld: 12, sak: "Läkedryck", till: "gravkullen" },
              misslyckas: { text: "Jorden är hårdfrusen, och {namn} river upp händerna på en sten utan att hitta något.", traffad: "1d4", till: "gravkullen" } },
            },
          { text: "Fortsätt uppför kullen", till: "dimvarg_strid" }
        ]
      },

      dimvarg_strid: {
        bild: "gravkulle",
        text: [
          "Ni har gått tio steg när dimman bakom er delar sig. Två vargar kliver fram, men de är inte gjorda av päls. De är gjorda av dimma, och man kan se gravstenarna rakt igenom dem.",
          { om: "spar_sedda", text: "Det var de här spåren {namn} följde. Nu vet ni i alla fall vad som gjorde dem." }
        ],
        strid: {
          fiender: ["dimvarg", "dimvarg"],
          justera: [
            { flagga: "bulle_tinad", typ: "dimvarg", liv: -4, text: "Bulle kommer ikapp uppför kullen och slänger en gravsten efter vargarna. De är skadade redan innan striden börjar." }
          ],
          vinst: { text: "Den sista vargen blåser bort i trasor. Där de stod ligger bara en kall, våt fläck i snön.\n\nOvanför er, genom dimman, ser ni äntligen huset.", till: "grinden" },
          forlust: "kulle_forlust"
        }
      },

      kulle_forlust: {
        bild: "gravkulle",
        text: "Vargarna sliter omkull er, och sedan är de bara borta.\n\nNi vaknar med frost i håret bland gravstenarna. Ingen är allvarligt skadad. Vargarna ville inte döda er. De ville skrämma er hem.\n\nDet tänker ni inte gå med på.",
        hela: "halva",
        val: [ { text: "Res er och gå upp till huset", till: "grinden" } ]
      },

      grinden: {
        bild: "grind",
        text: [
          "På toppen av kullen står en hög järngrind mellan två stenstolpar. På stolparna sitter två stenlejon, och båda är helt täckta av is.\n\nBakom grinden ligger huset. Det är mycket större än det såg ut nerifrån. Inte ett enda fönster är trasigt, och det är det som är obehagligt.\n\nGrinden är låst med en kedja och ett hänglås, och både kedjan och låset är infrusna i ett block av is.",
          { om: "sett_huset", text: "Högst upp, i fönstret där någon vinkade, är det mörkt nu." }
        ],
        val: [
          { text: "Glöd smälter låset", krav: { flagga: "glod_fri" }, utfall: {
              text: "Glöd sätter sig på kedjan och blåser. Isen smälter, låset blir rödglödgat och faller sedan isär i två delar. Grinden glider upp av sig själv, med ett gnisslande som hörs över hela kullen.", till: "framsidan" } },
          { text: "Klättra över grinden", prov: {
              egenskap: "smi", svarighet: 13, grupp: true, fraga: "Järnet är halt av is.",
              lyckas: { text: "Ni klättrar en i taget, hjälper varandra över spetsarna högst upp och landar mjukt i snön på andra sidan.", till: "framsidan" },
              misslyckas: { text: "Ni tar er över, men inte vackert. Någon halkar på det isiga järnet, och alla får skrubbsår och blåmärken av landningen.", skada: "1d4", till: "framsidan" }
            } },
          { text: "Hissa er över med repet", krav: { sak: "Rep" }, utfall: {
              text: "Ni kastar repet över en av spetsarna och drar er upp, en i taget, och firar ner er på andra sidan. Det tar en stund, men ingen slår sig.", till: "framsidan" } },
          { text: "Bulle lyfter bort grinden", krav: { flagga: "bulle_tinad" }, utfall: {
              text: "Bulle tar tag i grinden med båda händerna, sätter foten mot stolpen och drar. Järnet skriker. Sedan lossnar hela grinden med gångjärn och allt, och Bulle lägger ner den i snön som en matta.\n\n– Varsågod, säger han. Bulle väntar här. Bulle går inte in i hus.", till: "framsidan" } },
          { text: "Slå sönder isen runt låset", prov: {
              egenskap: "sty", svarighet: 14, fraga: "Vem hugger loss låset?",
              lyckas: { text: "{namn} hugger tills isblocket spricker, och sedan går låset av med ett torrt knäpp. Kedjan rasslar ner i snön.", till: "framsidan" },
              misslyckas: { text: "Isen splittras rakt i ansiktet på {namn}, och låset sitter kvar. Till slut får ni klättra över ändå, kalla och sura.", traffad: "1d4", till: "framsidan" }
            } }
        ]
      },

      framsidan: {
        bild: "grind",
        text: "Framför huset ligger en gård med en frusen fontän i mitten. I snön syns inga spår alls, varken av djur eller människor.\n\nYtterdörren står på glänt. Precis så mycket att en katt skulle komma in.\n\nOch inifrån hörs musik. Någon spelar piano, långsamt och lite falskt.",
        val: [
          { text: "Gå in genom ytterdörren", till: "hallen" },
          { text: "Gå runt huset först", engang: "runt_huset", utfall: {
              text: "Ni går ett varv runt huset genom snön. På baksidan ligger ett glashus med frostiga rutor, och bredvid det en liten källardörr som står öppen och gapar svart.\n\nNi noterar var de ligger, och går tillbaka till framsidan.",
              flagga: "vet_baksidan", till: "framsidan" } }
        ]
      },

      hallen: {
        bild: "hall",
        text: [
          "Hallen är stor som ett stall. En trappa svänger upp till andra våningen, och i taket hänger en kristallkrona som är helt täckt av istappar.\n\nPianot hörs från ett rum till vänster. Det slutar inte spela, men ingen har hälsat på er.\n\nDet är kallare inne än ute.",
          { om: "vet_spegeln", text: "Nu vet ni vad ni letar efter: spegelsalen, längst ner, bakom trappan." },
          { inteOm: "vet_spegeln", text: "Spegeln kan hänga var som helst i det här huset. Ni måste leta." }
        ],
        val: [
          { text: "Gå mot pianot, in i balsalen", engang: "varit_balsal", till: "balsalen" },
          { text: "Gå in i köket", engang: "varit_kok", till: "koket" },
          { text: "Gå in i biblioteket", engang: "varit_bibliotek", till: "biblioteket" },
          { text: "Gå ut i glashuset", engang: "varit_glashus", till: "vintertradgarden" },
          { text: "Gå upp i tornet", engang: "varit_torn", till: "klocktornet" },
          { text: "Gå upp till barnkammaren", engang: "varit_barnkammare", till: "barnkammaren" },
          { text: "Gå ner för trappan bakom trappan", krav: { flagga: "vet_spegeln" }, till: "trappan" },
          { text: "Leta efter vägen neråt", krav: { inteFlagga: "vet_spegeln" }, info: "Ni vet inte var spegeln hänger än", utfall: {
              text: "Ni letar i hallen men hittar bara en skrubb full av paraplyer. Någon i det här huset måste ha skrivit ner var spegeln finns.", till: "hallen" } }
        ]
      },

      balsalen: {
        bild: "balsal",
        text: "Balsalen är full av folk, och ändå är den tom.\n\nTjugo par dansar en långsam vals över golvet. Man ser rakt igenom dem. Vid pianot sitter en herre utan ansikte och spelar samma åtta takter om och om igen.\n\nNär ni kommer in vänder alla huvudena mot er samtidigt. Men de slutar inte dansa.",
        val: [
          { text: "Buga och dansa med dem", prov: {
              egenskap: "cha", svarighet: 13, fraga: "Vem bugar och bjuder upp?",
              lyckas: { text: "{namn} bugar djupt och sträcker fram handen. En dam i iskall klänning tar den, och de dansar ett helt varv runt salen.\n\n– Spegeln hänger i spegelsalen, viskar hon i örat på {namn}. Men nyckeln dit har trädgårdsmästaren. Och säg inte hennes namn högt.\n\nSedan släpper hon taget, och {namn} står ensam mitt på golvet. Hela salen bugar tillbaka.", flagga: ["vet_spegeln", "vet_nyckel"], till: "hallen" },
              misslyckas: { text: "{namn} bugar, men ingen tar handen. I stället börjar hela salen dansa mot er, närmare och närmare, tills ni backar ut genom dörren med hjärtat i halsgropen. Kylan från dem biter i huden.", skada: "1d4", till: "hallen" }
            } },
          { text: "{namn} spelar med på pianot", krav: { klass: "bard" }, prov: {
              egenskap: "cha", svarighet: 12,
              lyckas: { text: "{namn} sätter sig bredvid herren utan ansikte och börjar spela de åtta takterna vidare, så att valsen äntligen får ett slut.\n\nHela salen stannar. Sedan applåderar de, ljudlöst, och bleknar bort ett par i taget. Kvar på pianot ligger en liten mässingsnyckel och en börs.\n\nOch i luften hänger en mening, som om någon just hade sagt den: ”Spegelsalen. Bakom trappan.”", guld: 15, flagga: ["vet_spegeln", "har_nyckel"], till: "hallen" },
              misslyckas: { text: "{namn} slår an fel ton. Pianot tystnar, och alla spökena vrider sina huvuden helt runt för att titta. Det tar en lång stund innan ni vågar andas igen, och när ni gör det ryker andedräkten.", skada: "1d4", till: "hallen" }
            } },
          { text: "Gå tvärs igenom salen utan att titta på dem", prov: {
              egenskap: "vis", svarighet: 12, grupp: true, fraga: "Titta rakt fram. Vad som än händer.",
              lyckas: { text: "Ni går rakt över dansgolvet med blicken fäst på dörren på andra sidan. Spökena dansar förbi så nära att det blåser kallt om er, men ingen rör er.\n\nPå andra sidan, i en glaskupa, står en mässingsnyckel med en liten lapp: ”Spegelsalen”.", flagga: ["vet_spegeln", "har_nyckel"], till: "hallen" },
              misslyckas: { text: "Någon tittar. Det räcker.\n\nValsen tvärslutar, och tjugo kalla par sluter sig runt er.", till: "spokstrid" }
            } },
          { text: "Gå ut igen", till: "hallen" }
        ]
      },

      spokstrid: {
        bild: "balsal",
        text: "De bugar artigt, allihop. Sedan anfaller de.",
        strid: {
          fiender: ["spoke", "spoke", "dimvasen"],
          vinst: { text: "När det sista spöket bleknar bort tystnar pianot. På pianolocket ligger en liten mässingsnyckel med en lapp: ”Spegelsalen”.\n\nOch under locket ligger en börs som någon gömde där för hundra år sedan.", guld: 15, flagga: ["vet_spegeln", "har_nyckel"], till: "hallen" },
          forlust: "hus_forlust"
        }
      },

      koket: {
        bild: "kok",
        text: "Köket är enormt, med en spis så lång som en vägg och kopparkastruller i rader. Allt är täckt av frost.\n\nPå ett bord mitt i rummet står en middag uppdukad för tolv personer. Maten är inte rutten. Den är frusen, mitt i ett ögonblick, som om alla just hade rest sig.\n\nUppe i skorstenen hörs ett prassel.",
        val: [
          { text: "Leta i skafferiet", prov: {
              egenskap: "vis", svarighet: 11, fraga: "Vem letar i skafferiet?",
              lyckas: { text: "{namn} hittar en lucka längst in: torkat kött, hårt bröd och två flaskor med röd dryck som fortfarande är ljummen.\n\nI samma stund rasar det ner tre vampyrfladdermöss ur skorstenen.", sak: ["Läkedryck", "Läkedryck"], till: "fladdermus_strid" },
              misslyckas: { text: "{namn} välter en hylla med kopparkastruller. Oljudet hörs genom hela huset, och ur skorstenen kommer det ner något som inte tyckte om det.", till: "fladdermus_strid" }
            } },
          { text: "Tända spisen", engang: "tant_spisen", prov: {
              egenskap: "klo", svarighet: 12, fraga: "Vem tänder?",
              lyckas: { text: "{namn} får liv i veden, och en riktig eld tar fart i den stora spisen. Värmen sprider sig genom köket, och för första gången sedan bron känner ni er varma.\n\nIsen på fönstren smälter, och i rutan syns nu en text som någon ristat i glaset för länge sedan: ”Hon tål inte sitt eget namn.”", hela: "halva", flagga: "vet_namnet", till: "koket" },
              misslyckas: { text: "Veden är fuktig och vill inte ta sig. Efter en stund ger {namn} upp, med kalla fingrar och sot i ansiktet.", till: "koket" }
            } },
          { text: "Smaka på maten", engang: "smakat", utfall: {
              text: "Någon tar en tugga av det frusna köttet. Det smakar ingenting alls. Inte dåligt, bara ingenting, som att tugga snö.\n\nDet var ingen bra idé, men det var i alla fall ingen farlig idé.", till: "koket" } },
          { text: "Gå ut igen", till: "hallen" }
        ]
      },

      fladdermus_strid: {
        bild: "kok",
        text: "Tre vampyrfladdermöss virvlar runt i taket, och de är hungriga på ett sätt som fladdermöss inte brukar vara.",
        strid: {
          fiender: ["vampyrfladdermus", "vampyrfladdermus", "vampyrfladdermus"],
          vinst: { text: "Den sista fladdermusen försvinner upp i skorstenen igen. I spisens aska hittar ni några mynt som någon tappat, svarta av sot men fortfarande guld.", guld: 10, till: "koket" },
          forlust: "hus_forlust"
        }
      },

      biblioteket: {
        bild: "bibliotek",
        text: "Biblioteket går i två våningar, med en stege på räls längs väggarna. Böckerna är täckta av frost, och många av dem har frusit fast i hyllorna.\n\nPå ett bord mitt i rummet ligger en uppslagen dagbok. Bläcket är blått, och den sista raden är skriven med darrig hand.",
        val: [
          { text: "Läs dagboken", engang: "last_dagbok", utfall: {
              text: "”Spegeln hänger i spegelsalen bakom trappan. Jag orkar inte gå dit mer.\n\nSmeden sa att de två aldrig får hänga var för sig. Lyktan ger, spegeln tar. Nu tar den allt: veden, röken, till och med röster.\n\nOm någon läser det här: det finns två sätt. Slå sönder spegeln, så blir det sommar igen, men lyktan blir aldrig mer än ett ljus. Eller häng dem tillsammans, så lyser båda. Men då finns hon kvar i huset.\n\nJag vågar inte välja. Jag lägger mig bara och vilar lite först.”",
              flagga: ["vet_spegeln", "vet_valet"], till: "biblioteket" } },
          { text: "Leta efter husets ritningar", engang: "last_ritning", prov: {
              egenskap: "klo", svarighet: 12, fraga: "Vem letar bland hyllorna?",
              lyckas: { text: "{namn} hittar en rulle med ritningar över huset. Bakom trappan finns en dörr som inte syns, och bakom den en trappa ner till spegelsalen.\n\nPå ritningen står också en varning i marginalen: ”Rustningen i trappan är inte tom.”", flagga: ["vet_spegeln", "vet_rustningen"], till: "biblioteket" },
              misslyckas: { text: "{namn} drar ut rulle efter rulle, men det är bara gamla räkenskaper över hur mycket hö som gick åt varje vinter.", till: "biblioteket" }
            } },
          { text: "Leta efter något om hennes namn", krav: { flagga: "vet_namnet" }, engang: "last_namnet", prov: {
              egenskap: "vis", svarighet: 13, fraga: "Vem letar?",
              lyckas: { text: "Längst in står en kyrkbok. {namn} bläddrar till rätt vinter och hittar raden.\n\nDär står hennes namn. Det är ett helt vanligt namn, ett sådant som en gammal dam i byn kan heta. Att läsa det gör henne plötsligt mycket mindre läskig.\n\n{namn} lär sig det utantill.", flagga: "kan_namnet", till: "biblioteket" },
              misslyckas: { text: "Sidorna har frusit ihop till ett enda block. {namn} får loss två sidor, och båda är tomma.", till: "biblioteket" }
            } },
          { text: "Värm en bok mot kinden och läs den", engang: "varmt_bok", utfall: {
              text: "Någon tar ner en bok ur hyllan och håller den innanför jackan tills frosten släpper. Det är en sagobok för barn, med en liten teckning längst bak: ett barn och en stor hund, båda ritade med rödkrita.\n\nNi tar med er boken.", sak: "Sagobok", flagga: "har_sagobok", till: "biblioteket" } },
          { text: "Gå ut igen", till: "hallen" }
        ]
      },

      vintertradgarden: {
        bild: "vintertradgard",
        text: "Glashuset på baksidan är varmare än resten av huset, och det är det konstigaste hittills.\n\nHär växer rosor. Hundratals. De är helt röda och alldeles levande, mitt i ett hus där till och med maten har frusit. Doften är så stark att det svider i näsan.\n\nMitt bland rosorna står en gammal trädgårdsmästare och klipper med en sax. Han är genomskinlig, och han har inte märkt er.",
        val: [
          { text: "Hälsa försiktigt", prov: {
              egenskap: "cha", svarighet: 12, fraga: "Vem hälsar?",
              lyckas: { text: "{namn} harklar sig och säger god dag.\n\nTrädgårdsmästaren tittar upp, förvånad men glad, som om det var länge sedan någon sa något till honom.\n\n– Jaså, besök, säger han. Hon tycker om rosor, förstår ni. Så länge de blommar är hon nästan snäll. Ska ni ner i spegelsalen? Då behöver ni den här.\n\nHan räcker fram en liten mässingsnyckel, och fortsätter sedan klippa.", flagga: ["har_nyckel", "vet_spegeln"], till: "vintertradgarden" },
              misslyckas: { text: "{namn} säger god dag, lite för högt. Trädgårdsmästaren fortsätter klippa som om ingenting hänt. Han är inte här riktigt, inte på det sättet.", till: "vintertradgarden" }
            } },
          { text: "Plocka en ros", engang: "plockat_ros", utfall: {
              text: "Någon bryter av en ros vid stjälken. Den är varm i handen, som en liten eld, och den vissnar inte.\n\nTrädgårdsmästaren tittar upp och nickar. – Ta med en till henne, säger han. Hon blir alltid mjukare av rosor.", sak: "Röd ros", flagga: "har_ros", till: "vintertradgarden" } },
          { text: "Leta bland krukorna", engang: "letat_krukor", prov: {
              egenskap: "vis", svarighet: 11, fraga: "Vem rotar bland krukorna?",
              lyckas: { text: "Under en spräckt kruka hittar {namn} en liten påse med mynt och en läkedryck som trädgårdsmästaren måste ha gömt för sig själv.", guld: 14, sak: "Läkedryck", till: "vintertradgarden" },
              misslyckas: { text: "{namn} välter en kruka så att jorden ryker, och trädgårdsmästaren ser riktigt sur ut en kort stund.", till: "vintertradgarden" }
            } },
          { text: "Gå in i huset igen", till: "hallen" }
        ]
      },

      klocktornet: {
        bild: "klocktorn",
        text: "Trappan upp i tornet är smal och full av fågelbon. Högst upp hänger en klocka, stor som ett badkar, med repet avklippt.\n\nHärifrån ser ni ut över hela kullen. Dimman ligger som ett lock över skogen, ända bort till Mossby. Men precis runt tornet är luften klar.\n\nKlockan är full av is på insidan.",
        val: [
          { text: "Ring i klockan med repet", krav: { sak: "Rep" }, utfall: {
              text: "Ni knyter fast ert rep i kläppen och drar allihop.\n\nKLONG.\n\nLjudet rullar ut över hela kullen. Isen inne i klockan spricker och regnar ner som glas, och nere på marken drar sig dimman undan från huset, en bra bit åt alla håll.\n\nHela huset tystnar. Något därnere blev väldigt stört.", flagga: "klockan_ringd", till: "klocktornet" } },
          { text: "Slå på klockan med vapnen", prov: {
              egenskap: "sty", svarighet: 12, grupp: true, fraga: "Klockan är tjock. Alla måste hjälpas åt.",
              lyckas: { text: "Ni slår allihop samtidigt, och klockan svarar med ett dovt KLONG som får hela tornet att darra.\n\nIsen inuti spricker och faller, och nere på marken viker dimman undan från huset. Något därnere blev mycket stört.", flagga: "klockan_ringd", till: "klocktornet" },
              misslyckas: { text: "Ni slår och slår, men isen tar upp allt ljud. Till slut gör det bara ont i armarna, och er egen andedräkt fryser i luften.", skada: "1d4", till: "klocktornet" }
            } },
          { text: "Titta ut över kullen", engang: "utsikt", utfall: {
              text: "Härifrån syns det tydligt: dimman kommer inte utifrån. Den rinner ut ur huset, nerför kullen och vidare mot Mossby, som rök från en skorsten, fast åt fel håll.\n\nOch den kommer från något hål längst ner i huset.", flagga: "vet_spegeln", till: "klocktornet" } },
          { text: "Gå ner igen", till: "hallen" }
        ]
      },

      barnkammaren: {
        bild: "barnkammare",
        text: [
          "Längst upp i huset ligger ett litet rum med en säng, en hylla med leksaker och ett fönster som vetter mot kullen.\n\nPå golvet sitter en flicka i nattlinne och bygger ett torn av klossar. Hon är genomskinlig som de andra, men hon är inte kall. Hon ser mest uttråkad ut.\n\n– Alla andra bara dansar, säger hon utan att titta upp. Ingen vill leka.",
          { om: "vet_barnet", text: "Det var hennes namn som stod på den minsta gravstenen." }
        ],
        val: [
          { text: "Sätt er ner och lek med henne", prov: {
              egenskap: "cha", svarighet: 10, fraga: "Vem sätter sig på golvet?",
              lyckas: { text: "{namn} sätter sig på golvet och bygger vidare på tornet. De bygger det så högt att det rasar, och flickan skrattar så att fönstret imar igen.\n\nSedan blir hon allvarlig.\n\n– Hon därnere är mamma, säger hon. Hon sover inte, hon bara väntar. Hon tål inte när man säger hennes namn, och hon tål inte när man är glad. Om ni är rädda blir hon starkare.\n\nFlickan ger {namn} en trasig liten hund av trä. – Ta den. Jag kommer om ni håller i den.", sak: "Trähund", flagga: "barnet_hjalpte", till: "barnkammaren" },
              misslyckas: { text: "{namn} sätter sig ner, men flickan vänder ryggen till och fortsätter bygga.\n\n– Ni är bara här för spegeln, säger hon. Alla är bara här för spegeln.", till: "barnkammaren" }
            } },
          { text: "Läs sagoboken för henne", krav: { sak: "Sagobok" }, utfall: {
              text: "Någon sätter sig på sängkanten och börjar läsa högt ur den frusna sagoboken.\n\nFlickan kryper närmare, och mitt i sagan säger hon tyst: – Den där har jag ritat. Hunden hette Pricken.\n\nNär sagan är slut är hon mycket gladare.\n\n– Mamma är därnere, säger hon. Hon tål inte sitt eget namn, och hon tål inte om man inte är rädd. Ta den här, så kommer jag om ni behöver mig.\n\nHon räcker fram en liten trähund.", sak: "Trähund", flagga: ["barnet_hjalpte", "vet_namnet"], till: "barnkammaren" } },
          { text: "Fråga vad som hände den vintern", engang: "fragat_barnet", prov: {
              egenskap: "vis", svarighet: 12, fraga: "Vem frågar försiktigt?",
              lyckas: { text: "Flickan tittar ut genom fönstret länge innan hon svarar.\n\n– Det blev kallt, säger hon. Mamma hängde upp spegeln för att hon ville se sig själv i den hela tiden. Sedan blev det kallare. Och sedan somnade alla. Jag också.\n\nHon rycker på axlarna, som om det var länge sedan nu.", flagga: "vet_historien", till: "barnkammaren" },
              misslyckas: { text: "Flickan säger ingenting alls. Hon bara bygger vidare, och efter en stund förstår ni att hon inte tänker svara.", till: "barnkammaren" }
            } },
          { text: "Gå ner igen", till: "hallen" }
        ]
      },

      trappan: {
        bild: "hall",
        text: [
          "Bakom den stora trappan finns en dörr som är målad i samma färg som väggen. Den syns knappt.\n\nBakom den går en smal trappa rakt ner i mörkret. Kylan som kommer därifrån är inte som vanlig kyla. Den gör ont i tänderna.\n\nI trappan, halvvägs ner, står en rustning i full mundering.",
          { om: "vet_rustningen", text: "Ritningen varnade för den här rustningen. Den är inte tom." }
        ],
        val: [
          { text: "Lås upp dörren med mässingsnyckeln", krav: { flagga: "har_nyckel" }, utfall: {
              text: "Nyckeln passar perfekt och vrids runt utan ett ljud. Dörren glider upp.\n\nI samma stund lyfter rustningen i trappan långsamt på huvudet.", till: "rustning_strid" } },
          { text: "Bryt upp dörren", krav: { inteFlagga: "har_nyckel" }, prov: {
              egenskap: "sty", svarighet: 14, grupp: true, fraga: "Dörren är av ek och sitter hårt.",
              lyckas: { text: "Ni kastar er mot dörren allihop samtidigt. Karmen spricker och dörren flyger upp.\n\nOch i trappan lyfter rustningen långsamt på huvudet.", till: "rustning_strid" },
              misslyckas: { text: "Dörren sitter som gjuten, och ni slår er bara. Men oljudet väcker något: rustningen i trappan vänder sig om med ett skrapande ljud, och går mot er.", skada: "1d4", till: "rustning_strid" }
            } },
          { text: "Smyg förbi rustningen", prov: {
              egenskap: "smi", svarighet: 14, grupp: true, fraga: "Trapporna knarrar. Alla måste ner.",
              lyckas: { text: "Ni går ner på de yttersta kanterna av varje trappsteg, där de knarrar minst, och håller andan när ni passerar rustningen.\n\nDen rör sig inte. Men när den siste har passerat hör ni ett långsamt skrapande bakom er. Ni springer.", till: "dimkallaren" },
              misslyckas: { text: "Ett trappsteg knarrar som ett skott. Rustningen drar sitt svärd.", till: "rustning_strid" }
            } },
          { text: "Gå upp igen", till: "hallen" }
        ]
      },

      rustning_strid: {
        bild: "hall",
        text: "Rustningen är tom inuti. Det syns rakt igenom visiret, och det finns ingen där. Ändå lyfter den svärdet med båda händerna.",
        strid: {
          fiender: ["levande_rustning"],
          justera: [
            { flagga: "klockan_ringd", typ: "levande_rustning", liv: -6, rustning: -1, text: "Klockans ljud har skakat loss plåtarna. Rustningen skramlar och sitter illa ihop." },
            { flagga: "bulle_tinad", typ: "levande_rustning", liv: -5, text: "Bulle står utanför och dunkar i väggen så att murbruket ryker. Rustningen blir distraherad." }
          ],
          vinst: { text: "Rustningen rasar ihop i en hög av plåt som skramlar hela vägen ner för trappan.\n\nI högen ligger en gammal sköldrem med ett spänne av silver, och under den en läkedryck som någon gömt i rustningen för länge sedan.", guld: 18, sak: "Läkedryck", till: "dimkallaren" },
          forlust: "hus_forlust"
        }
      },

      hus_forlust: {
        bild: "hall",
        text: "Allt blir kallt och långsamt, och sedan vaknar ni i hallen igen, alla i en hög under kristallkronan.\n\nIngen är borta. Ingenting är stulet. Huset vill inte döda er. Huset vill att ni ska somna, precis som alla andra.\n\nDet är nästan värre.",
        hela: "halva",
        val: [ { text: "Res er", till: "hallen" } ]
      },

      dimkallaren: {
        bild: "dimkallare",
        text: [
          "Trappan slutar i en lång källargång, och här nere är dimman så tät att ni ser varandras händer men inte varandras ansikten.\n\nLängs ena väggen ligger människor på britsar. Tolv stycken. De sover lugnt under ett lager frost, och det är ingen i huset som har lagt dem där i år. De är klädda i kläder från en annan tid.\n\nLängst ner ligger tre som har moderna kläder. Det är Mossbybor.",
          { om: "rosdoft", text: "Det luktar rosor här nere också. Mycket starkare." }
        ],
        val: [
          { text: "Bär upp Mossbyborna först", utfall: {
              text: "Ni bär upp dem en i taget, hela vägen upp för den smala trappan och ut i snön på gården. Det tar lång tid och ni blir trötta i armarna och ryggen.\n\nMen när den sista ligger i säkerhet på gården vet ni att vad som än händer därnere, så kommer de att vakna.",
              flagga: "byborna_burna", skada: "1d4", till: "dimkallaren" } },
          { text: "Väck dem försiktigt", engang: "vackt", prov: {
              egenskap: "vis", svarighet: 13, fraga: "Vem försöker väcka dem?",
              lyckas: { text: "{namn} gnuggar deras händer och pratar med dem hela tiden, om byn, om torget, om vanliga saker.\n\nEn av dem rör på läpparna. – Hon sa att jag skulle få vila, viskar han. Hon sa att det var skönt.\n\nSedan somnar han igen. Men ni vet nu att de går att väcka, bara spegeln är borta.", flagga: "vet_att_de_vaknar", till: "dimkallaren" },
              misslyckas: { text: "Hur {namn} än gnuggar och ropar händer ingenting. Och kylan från britsarna kryper in i fingrarna.", till: "dimkallaren" }
            } },
          { text: "Fortsätt in mot spegelsalen", till: "spegelsalen" }
        ]
      },

      spegelsalen: {
        bild: "spegelsal", figur: "dimfrun",
        text: [
          "Gången öppnar sig i en rund sal utan fönster. Mitt på väggen hänger spegeln.\n\nDen är stor som en dörr, med en ram av svart järn, och den speglar ingenting alls. Den är bara vit, som dimma i en ram. Och det är därifrån kylan kommer.\n\nFramför spegeln står en kvinna i en gammaldags klänning. Håret ligger stilla fast det blåser omkring henne.\n\n– Så tyst det har varit här, säger hon. Och så lagom kallt. Stäng dörren efter er, är ni snälla.",
          { om: "byborna_burna", text: "Hon tittar på era tomma händer och förstår genast. – Jaså, säger hon. Ni bar upp dem. Vad onödigt." }
        ],
        val: [
          { text: "Säg hennes namn högt", krav: { flagga: "kan_namnet" }, utfall: {
              text: "{namn} tar ett steg fram och säger hennes namn, lugnt och tydligt, precis som det stod i kyrkboken.\n\nHon rycker till som om någon kastat vatten på henne. Ett ögonblick ser hon inte ut som en grevinna alls, bara som en gammal dam som frusit mycket länge.\n\n– Säg inte så, viskar hon. Men rösten är mycket mindre nu.",
              flagga: "namnet_sagt", till: "dimfru_strid" } },
          { text: "Ge henne rosen", krav: { sak: "Röd ros" }, utfall: {
              text: "Någon går fram och räcker fram den röda rosen.\n\nHon tar den utan att tänka, och i ett ögonblick luktar hela salen sommar. Hon håller rosen mot kinden och blundar.\n\nSedan ser hon spegeln i ögonvrån, och ansiktet blir hårt igen. Men hon släpper inte rosen, och handen hon håller den i kan hon inte slåss med.",
              flagga: "ros_given", till: "dimfru_strid" } },
          { text: "Håll fram trähunden", krav: { sak: "Trähund" }, utfall: {
              text: "{namn} håller upp den lilla trähunden.\n\nGrevinnan tystnar mitt i en mening. Uppe i trappan hörs små fötter, och en ljus röst ropar: – Mamma! De är snälla!\n\nGrevinnan vänder sig om mot ljudet, och hon glömmer bort er helt och hållet en lång stund.",
              flagga: "barnet_kom", till: "dimfru_strid" } },
          { text: "{namn} ber om ljus", krav: { klass: "helare" }, prov: {
              egenskap: "vis", svarighet: 13,
              lyckas: { text: "{namn} lyfter händerna och ber, och ett varmt gult sken växer fram i den vita salen. Dimman drar sig undan från golvet, och grevinnans klänning blir för ett ögonblick genomskinlig.", flagga: "ljus_i_salen", till: "dimfru_strid" },
              misslyckas: { text: "{namn} ber, men orden fryser. Grevinnan ler.\n\n– Vad gulligt, säger hon.", till: "dimfru_strid" }
            } },
          { text: "Spring fram och slå sönder spegeln direkt", prov: {
              egenskap: "sty", svarighet: 15, fraga: "Vem rusar fram mot spegeln?",
              lyckas: { text: "{namn} rusar fram och slår med allt vad {namn} har. Spegeln spricker inte, men det går en lång reva tvärs över den vita ytan, och ur revan ryker det kallt.\n\nGrevinnan skriker till, för första gången med riktig rädsla i rösten.", flagga: "spegel_sprucken", till: "dimfru_strid" },
              misslyckas: { text: "{namn} kommer halvvägs. Sedan slår kylan emot som en vägg, och {namn} kastas bakåt över golvet.", traffad: "1d8", till: "dimfru_strid" }
            } },
          { text: "Anfall!", till: "dimfru_strid" }
        ]
      },

      dimfru_strid: {
        bild: "spegelsal",
        text: "Grevinnan lyfter handen, och dimman i salen reser sig som ett hav.",
        strid: {
          fiender: ["dimfrun", "dimvasen"],
          justera: [
            { flagga: "namnet_sagt", typ: "dimfrun", liv: -8, rustning: -1, text: "Hennes namn hänger kvar i luften. Hon är mindre än hon vill vara." },
            { flagga: "ros_given", typ: "dimfrun", liv: -6, text: "Hon slåss med en hand, för i den andra håller hon rosen." },
            { flagga: "barnet_kom", typ: "dimfrun", rustning: -2, text: "Flickan står i dörren och tittar på. Grevinnan kan inte låta bli att titta tillbaka." },
            { flagga: "ljus_i_salen", typ: "dimfrun", rustning: -1, text: "Det varma skenet gör henne lättare att se, och lättare att träffa." },
            { flagga: "spegel_sprucken", typ: "dimfrun", liv: -10, text: "Revan i spegeln läcker. Hon får inte tillbaka kylan lika fort." },
            { flagga: "klockan_ringd", typ: "dimvasen", liv: -4, text: "Klockan ringer fortfarande svagt i öronen på allt som är gjort av dimma." },
            { flagga: "glod_fri", typ: "dimfrun", liv: -8, text: "Glöd kommer nerför trappan som en eldkula, sätter sig på spegelramen och blåser. Salen blir varm för första gången på hundra år." }
          ],
          vinst: { text: "Grevinnan blir tunnare och tunnare, och till slut sugs hon in i sin egen spegel med ett långt, argt skrik.\n\nSedan är det tyst. Den vita ytan i ramen rör sig långsamt, som vatten som lagt sig.\n\nSpegeln hänger kvar. Och nu är det ni som bestämmer vad som ska hända med den.", till: "efter" },
          forlust: "dimfru_forlust"
        }
      },

      dimfru_forlust: {
        bild: "dimkallare",
        text: [
          "Kylan tar er, och allt blir vitt och mjukt och skönt.\n\nNi vaknar på britsarna i källargången, bredvid de andra sovande. Ni är iskalla, men ni är vakna. Något väckte er.",
          { om: "barnet_hjalpte", text: "Vid fötterna på britsen sitter flickan i nattlinne och ser arg ut. – Ni får inte somna, säger hon. Jag har redan provat det." },
          { inteOm: "barnet_hjalpte", text: "På golvet bredvid er ligger en av era egna läkedrycker, krossad. Någon här nere ville inte att ni skulle sova." },
          "Ni kryper upp. Spegelsalen är kvar där den var."
        ],
        hela: "halva",
        val: [ { text: "Gå in i spegelsalen igen", till: "spegelsalen" } ]
      },

      efter: {
        bild: "spegelsal",
        text: [
          "Ni står framför spegeln. Den är kall, men den gör ingenting längre, inte just nu.",
          { om: "vet_valet", text: "I dagboken stod det två sätt. Slå sönder spegeln: då tar vintern slut, men lyktan blir aldrig mer än ett ljus. Eller häng spegeln bredvid lyktan: då lyser båda starkt igen, men hon finns kvar därinne." },
          { inteOm: "vet_valet", text: "Ni vet inte riktigt vad som händer om ni slår sönder den. Men ni vet vad som händer om ni låter den hänga." },
          { om: "barnet_hjalpte", text: "I trappan står flickan och tittar på er. Hon säger ingenting. Hon väntar bara, som om det var länge sedan någon frågade henne om någonting." }
        ],
        val: [
          { text: "Slå sönder spegeln", till: "slut_krossa" },
          { text: "Ta med spegeln hem till Mossby", krav: { flagga: "vet_valet" }, till: "slut_bara" },
          { text: "Fråga flickan vad ni ska göra", krav: { flagga: "barnet_hjalpte" }, engang: "fragat_flickan", utfall: {
              text: "Flickan funderar länge.\n\n– Om ni tar den med er är mamma med, säger hon. Men då är hon i alla fall inte ensam.\n\nSedan rycker hon på axlarna, som bara barn kan göra med sådant som är alldeles för stort.\n\n– Jag vill att det blir sommar, säger hon. Jag kommer inte ihåg hur det är.",
              till: "efter" } }
        ]
      },

      slut_krossa: {
        bild: "hem", figur: "greta",
        text: [
          "Ni lyfter ner spegeln från väggen, bär upp den på gården och ställer den i snön. Sedan slår ni sönder den, allihop samtidigt.\n\nDen går inte i skärvor. Den bara går sönder som is, och allt det vita rinner ut i snön och försvinner.\n\nDimman över kullen lyfter på en halv minut. Solen är så stark att det gör ont i ögonen.",
          { om: "byborna_burna", text: "Ute på gården sätter sig de tre Mossbyborna upp, mitt i snön, och undrar varför de har frost i håret mitt i augusti." },
          { inteOm: "byborna_burna", text: "Ni springer ner i källaren och bär upp alla tolv, en i taget. De tre från Mossby vaknar redan på gården. De andra nio ler i sömnen, och sedan är de borta, som om de äntligen fick åka hem." },
          { om: "barnet_hjalpte", text: "I ett fönster högst upp står en liten flicka och tittar på solen. Hon vinkar med hela armen innan hon bleknar bort." },
          "På vägen hem genom skogen är marken redan bar. När ni kommer in i Mossby står hela byn på torget igen.\n\nLyktan på stolpen lyser lugnt och gult. Den blir aldrig starkare än ett stearinljus mer. Men den slocknar inte heller."
        ],
        slut: true, slutrad: "Vintern är över. Lyktan lyser litet, men den lyser."
      },

      slut_bara: {
        bild: "hem", figur: "greta",
        text: [
          "Ni lyfter ner spegeln, lindar in den i filtar och bär den hela vägen hem. Den är tyngre för varje steg.\n\nI Mossby hänger ni upp den på torget, bredvid lyktstolpen, precis som på Gretas ritning.\n\nI samma stund de hänger bredvid varandra händer det. Lågan i lyktan växer och växer tills hela torget badar i ljus, och den vita ytan i spegeln blir klar och visar torget, husen och er.\n\nDet blir varmt. Snön på taken rinner bort på en kvart.",
          { om: "byborna_burna", text: "De tre som sov vaknar samma kväll, och den enda de minns är att någon bar dem." },
          { inteOm: "byborna_burna", text: "Ni får gå tillbaka till kullen dagen efter och hämta de tre som sov. De vaknar så fort de kommer in i ljuset på torget." },
          "Greta är tyst länge. Sedan säger hon det ingen annan vågar säga:\n\n– Hon är kvar därinne. Hon tittar på oss.\n\nOch sent på kvällen, när alla har gått hem, kan man se det: långt inne i spegeln står en kvinna i gammaldags klänning, mitt på ett torg som ser precis ut som Mossbys. Hon rör sig inte. Hon väntar bara.",
          { om: "barnet_hjalpte", text: "Bredvid henne, längst in i spegeln, syns en liten flicka i nattlinne. Hon håller sin mamma i handen. Hon ser inte ledsen ut." }
        ],
        slut: true, slutrad: "Lyktan lyser starkare än någonsin. Men någon tittar tillbaka ur spegeln."
      }
    }
  }
];

