/* =====================================================================
   Tärningsriket – äventyrens innehåll
   ---------------------------------------------------------------------
   Här finns all text, alla val, prov och strider. Spelmotorn finns i
   index.html. Vill du ändra en text räcker det att ändra här.

   Kort om formatet:
   - bild:    vilken bild TV:n visar (by, torg, skog, snar, bro, glanta,
              grotta, grotta_inne, lya, hem)
   - figur:   en person eller ett väsen som står i bilden (greta, troll,
              vatte, drake)
   - text:    det som läses upp. Tom rad (\n\n) = nytt stycke.
   - val:     knappar att välja mellan. Ett val har antingen "till"
              (nästa scen) eller "prov" (slå tärning).
   - prov:    { egenskap, svarighet, fraga, lyckas, misslyckas }
              egenskap: sty smi tal klo vis cha
              {namn} i texten byts mot hjälten som slog.
   - strid:   { fiender: [...], vinst, forlust }
   - utfall (lyckas/misslyckas/vinst) kan ha: text, till, guld, sak,
              skada (alla tappar liv), hela (antal eller "allt"), flagga
   - slut:    true betyder att kapitlet är klart.
   ===================================================================== */

window.FIENDER = {
  vatte: { namn: "Vätte", liv: 7, rustning: 11, anfall: 3, skada: "1d4+1", bild: "vatte",
           flyr: "tjuter och springer in bland träden!" },
  drake: { namn: "Glöd", liv: 18, rustning: 12, anfall: 4, skada: "1d6", bild: "drake",
           flyr: "lägger sig ner, gömmer nosen under vingen och ger upp." }
};

window.AVENTYR = [
  {
    id: "k1",
    titel: "Den försvunna lyktan",
    kort: "Någon har stulit den magiska lyktan från Mossbys torg. Utan den blir natten kolsvart.",
    start: "start",
    scener: {

      start: {
        bild: "by", figur: "greta",
        text: "Det är kväll i den lilla byn Mossby. Månen lyser blekt över hustaken och någonstans hoar en uggla.\n\nMitt på torget brukar den magiska lyktan stå och lysa varm och gul, så att ingen i byn någonsin behöver vara rädd för mörkret. Men i kväll är lyktstolpen tom.\n\nGamla Greta, byns äldsta, kommer haltande mot er med sin käpp. – Tack och lov att ni är här, hjältar! Någon har tagit lyktan. Om vi inte får tillbaka den före midnatt blir hela Mossby mörkt i hundra nätter. Snälla, kan ni hjälpa oss?",
        val: [
          { text: "Undersök torget och leta efter spår", till: "torget" },
          { text: "Skynda direkt mot skogen", till: "skogen" }
        ]
      },

      torget: {
        bild: "torg",
        text: "Ni går fram till den tomma lyktstolpen. Glaset runt den är krossat och i gruset ligger något som glittrar.\n\nKanske finns det fler ledtrådar här, om man tittar riktigt noga?",
        prov: {
          egenskap: "vis", svarighet: 10, fraga: "Vem letar efter spår?",
          lyckas: {
            text: "{namn} sätter sig på huk och tittar noga. Där! Ett litet, rött fjäll som glöder svagt, som en kola från en brasa. Och i leran syns små avtryck med tre klor, som leder mot skogen.\n\n– Ett fjäll som glöder, mumlar Greta. Det har jag bara läst om i gamla sagor …",
            flagga: "vet_drake", till: "skogen"
          },
          misslyckas: {
            text: "{namn} letar och letar men hittar bara glasbitar och en gammal knapp. Till slut ser ni att gräset är nedtrampat i riktning mot skogen. Dit måste tjuven ha gått.",
            till: "skogen"
          }
        }
      },

      skogen: {
        bild: "skog",
        text: "Skogen är mörk och full av ljud. Grenar knakar, löv prasslar och någonting litet springer förbi bakom en sten.\n\nEfter en stund delar sig stigen i två. Till vänster hör ni porlet från en bäck. Till höger växer ett tätt snår fullt av taggiga törnen, men därigenom går det snabbare.",
        val: [
          { text: "Gå vänster, mot bäcken", till: "bron" },
          { text: "Gå höger, genom törnesnåret", till: "snaret" }
        ]
      },

      snaret: {
        bild: "snar",
        text: "Törnena är vassa som synålar och grenarna fastnar i kläderna. Någon behöver gå först och hitta en väg där man kan smyga igenom utan att riva sig.",
        prov: {
          egenskap: "smi", svarighet: 11, fraga: "Vem går först och visar vägen?",
          lyckas: {
            text: "{namn} vrider sig, hukar och kliver försiktigt, och alla andra följer precis i samma spår. Ni kommer ut på andra sidan utan en enda skråma!",
            till: "glantan"
          },
          misslyckas: {
            text: "Aj, aj, aj! {namn} trasslar in sig och alla får några rejäla rivsår innan ni till slut kommer ut på andra sidan.",
            skada: 1, till: "glantan"
          }
        }
      },

      bron: {
        bild: "bro", figur: "troll",
        text: "Över bäcken går en gammal träbro. Men när ni ska gå över den kliver ett stort, mossigt troll upp ur vattnet. Det har näsa som en potatis och fötter stora som sparkcyklar.\n\n– Jag heter Bulle, mullrar trollet. Ingen går över MIN bro utan att betala! Fem guldmynt … eller så får ni lösa min gåta.",
        val: [
          { text: "Lös trollets gåta", prov: {
              egenskap: "klo", svarighet: 11, fraga: "Vem försöker lösa gåtan?",
              lyckas: {
                text: "– Vad har tänder men kan inte bita? frågar Bulle.\n\n{namn} tänker en stund och svarar: – En kam!\n\nBulle blir så glad att han dansar runt på bron. – Rätt, rätt, RÄTT! Ingen har klarat den på hundra år! Gå över, och lycka till!",
                till: "glantan" },
              misslyckas: {
                text: "– Vad har tänder men kan inte bita? frågar Bulle.\n\n{namn} gissar på en haj. – Fel! skrattar Bulle och plaskar så att alla blir genomblöta. Men han är på gott humör och låter er gå över ändå. Ni fryser lite resten av vägen.",
                skada: 1, till: "glantan" }
            } },
          { text: "Övertala trollet att släppa förbi er", prov: {
              egenskap: "cha", svarighet: 12, fraga: "Vem pratar med trollet?",
              lyckas: {
                text: "{namn} berättar om den försvunna lyktan och om att hela Mossby blir mörkt. Bulles ögon blir blanka. – Mörker är hemskt, snörvlar han. Gå över, gå över! Och det var nog en liten drake som flög förbi här nyss. Med något som lyste.",
                flagga: "vet_drake", till: "glantan" },
              misslyckas: {
                text: "– Prat, prat, prat! fnyser Bulle och plaskar så att alla blir genomblöta. Till slut tröttnar han ändå och kliver åt sidan. Ni fryser lite resten av vägen.",
                skada: 1, till: "glantan" }
            } },
          { text: "Betala fem guldmynt", krav: { guld: 5 }, utfall: {
              text: "Bulle biter i varje mynt för att se att det är äkta. Sedan bugar han djupt. – Välkomna över min fina bro!",
              guld: -5, till: "glantan" } }
        ]
      },

      glantan: {
        bild: "glanta", figur: "vatte",
        text: "Ni kommer fram till en glänta där en liten eld brinner. Runt elden sitter två vättar, små gröna varelser med spetsiga öron och stora gula ögon. De räknar en hög med blanka saker de har hittat.\n\nDe har inte sett er än.",
        val: [
          { text: "Smyg förbi dem", prov: {
              egenskap: "smi", svarighet: 12, fraga: "Vem leder er förbi?",
              lyckas: { text: "Tyst som en mus leder {namn} er runt gläntan i skuggorna. Vättarna märker ingenting!", till: "grottan" },
              misslyckas: { text: "KNAK! {namn} kliver på en torr pinne. Vättarna hoppar upp och drar fram sina små spjut. – Inkräktare!", till: "vattestrid" }
            } },
          { text: "Prata med vättarna", prov: {
              egenskap: "cha", svarighet: 11, fraga: "Vem pratar med vättarna?",
              lyckas: {
                text: "{namn} hälsar vänligt och vättarna blir så förvånade att de glömmer att vara elaka. – Lyktan? Den tog draken Glöd, säger den ena. Han bor i grottan bakom kullen. Han är inte farlig, han är bara rädd för mörkret.\n\nSom tack för att ni var snälla ger de er en flaska med rosa dryck.",
                flagga: "vet_drake", sak: "Läkedryck", till: "grottan" },
              misslyckas: { text: "– Vi pratar inte med långbenta! skriker vättarna och anfaller.", till: "vattestrid" }
            } },
          { text: "Anfall!", till: "vattestrid" }
        ]
      },

      vattestrid: {
        bild: "glanta",
        text: "Vättarna viftar med sina spjut och skriker så högt de kan. Nu blir det strid!",
        strid: {
          fiender: ["vatte", "vatte"],
          vinst: {
            text: "Vättarna har sprungit sin väg. I deras hög med blanka saker hittar ni tio guldmynt och en flaska med rosa dryck som luktar jordgubbe.",
            guld: 10, sak: "Läkedryck", till: "grottan"
          },
          forlust: "svimmat"
        }
      },

      grottan: {
        bild: "grotta",
        text: "Bakom kullen öppnar sig en stor grotta i berget. Därinne är det becksvart. Men långt, långt in ser ni ett svagt, gult sken. Lyktan!\n\nVid ingången ligger några gamla facklor.",
        val: [
          { text: "Tänd en fackla och gå in", utfall: { text: "Facklan sprakar och lyser upp väggarna. Nu kan ni se var ni sätter fötterna.", flagga: "fackla", till: "kistan" } },
          { text: "Smyg in i mörkret", prov: {
              egenskap: "vis", svarighet: 11, fraga: "Vem känner sig fram i mörkret?",
              lyckas: { text: "{namn} lyssnar på ekot och känner sig fram längs väggen. Ni kommer långt in utan att någon slår sig.", till: "kistan" },
              misslyckas: { text: "BONK! {namn} går rakt in i en stalaktit, och alla andra går in i {namn}. Aj!", skada: 1, till: "kistan" }
            } }
        ]
      },

      kistan: {
        bild: "grotta_inne",
        text: "Inne i grottan står en gammal träkista med ett rostigt lås. Den har inte öppnats på länge. Vem vet vad som finns i den?",
        val: [
          { text: "Försök dyrka upp låset", prov: {
              egenskap: "smi", svarighet: 12, fraga: "Vem försöker dyrka upp låset?",
              lyckas: { text: "Klick! {namn} får upp låset. I kistan ligger en läkedryck och en liten påse med guldmynt.", sak: "Läkedryck", guld: 5, till: "draken" },
              misslyckas: { text: "Låset sitter som fastlimmat. Det går inte. Ni får gå vidare utan kistans skatt.", till: "draken" }
            } },
          { text: "Bänd upp den med ren styrka", prov: {
              egenskap: "sty", svarighet: 13, fraga: "Vem är starkast?",
              lyckas: { text: "{namn} tar tag i locket och drar, och KRASCH! Kistan flyger upp. I den ligger en läkedryck och en liten påse med guldmynt.", sak: "Läkedryck", guld: 5, till: "draken" },
              misslyckas: { text: "{namn} drar tills ansiktet blir rött som en tomat. Locket rör sig inte en millimeter. Ni får gå vidare.", till: "draken" }
            } },
          { text: "Låt den vara och gå vidare", till: "draken" }
        ]
      },

      draken: {
        bild: "lya", figur: "drake",
        text: "Längst in i grottan sitter en liten drake, inte större än en hund. Hans fjäll glöder rött och orange, och i famnen håller han Mossbys lykta hårt, hårt.\n\nNär han ser er börjar han darra. – Snälla, ta inte min lampa, piper han. Det är så mörkt här inne på nätterna. Jag är så rädd för mörkret …",
        val: [
          { text: "Prata vänligt med draken", prov: {
              egenskap: "cha", svarighet: 13, fraga: "Vem pratar med draken?",
              lattare: { flagga: "vet_drake", svarighet: 9, varfor: "Ni visste redan att det var en drake, så ni vet vad ni ska säga." },
              lyckas: {
                text: "{namn} sätter sig på knä och pratar lugnt med draken. Han heter Glöd och har bott ensam i grottan i hela sitt liv.\n\n– Följ med oss till Mossby, säger {namn}. Där lyser det varje kväll, och du kan bo i Gretas lada. Den är varm och mysig.\n\nGlöd blinkar med sina stora ögon. Sedan ler han så att alla tänderna syns.",
                till: "slut_van" },
              misslyckas: {
                text: "{namn} försöker prata, men draken blir bara räddare. – Ni vill bara ta min lampa! skriker han och sprutar små gnistor. Han tänker inte släppa den utan strid!",
                till: "drakstrid" }
            } },
          { text: "Ge draken er brinnande fackla", krav: { flagga: "fackla" }, utfall: {
              text: "Ni räcker fram facklan. Glöd tittar på den länge. – Får … får jag den? Ni nickar. Försiktigt ställer han ner lyktan och tar facklan i stället, och han ser så lycklig ut att alla måste le.\n\n– Följ med oss hem, säger ni. I Mossby lyser det varje kväll.",
              till: "slut_van" } },
          { text: "Ta lyktan med våld", till: "drakstrid" }
        ]
      },

      drakstrid: {
        bild: "lya",
        text: "Glöd fäller ut sina små vingar och fräser. Han är liten, men han är faktiskt en drake!",
        strid: {
          fiender: ["drake"],
          vinst: { text: "Glöd ger upp och räcker fram lyktan. Han ser väldigt ledsen ut.", till: "slut_strid" },
          forlust: "svimmat"
        }
      },

      svimmat: {
        bild: "by", figur: "greta",
        text: "Allt blir svart …\n\nNär ni vaknar ligger ni i mjuka sängar hemma hos Greta. – Ni hittade vägen hem, men ni var så trötta att ni somnade på trappan, säger hon och ger er varm choklad.\n\nNu är ni utvilade igen. Natten är inte slut än. Vill ni försöka igen?",
        hela: "allt",
        val: [ { text: "Ge er av mot skogen igen", till: "skogen" } ]
      },

      slut_van: {
        bild: "hem", figur: "drake",
        text: "När ni kommer tillbaka till Mossby jublar hela byn. Lyktan sätts tillbaka på sin stolpe och lyser varmare än någonsin.\n\nOch Glöd? Han får bo i Gretas lada. Varje kväll tänder barnen i byn en liten lykta åt honom, och han är aldrig mer rädd för mörkret.\n\n– Ni är riktiga hjältar, säger Greta. Ni hittade inte bara lyktan. Ni hittade en ny vän.",
        slut: true
      },

      slut_strid: {
        bild: "hem",
        text: "Ni kommer tillbaka till Mossby med lyktan och hela byn jublar. Den sätts tillbaka på sin stolpe och lyser upp torget igen.\n\nMen när det blir tyst på kvällen tänker ni på den lilla draken som sitter ensam i den mörka grottan. Kanske ska ni gå tillbaka någon dag, med en egen lykta åt honom?",
        slut: true
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
