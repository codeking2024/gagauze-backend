const rules = {
  positive: {
    present: {
      1: {
        "a,ȇ,ı": {
          1: { singular: "ȇrım", plural: "ȇrız" },
          2: { singular: "ȇrsın", plural: "ȇrsınız" },
          3: { singular: "ȇr", plural: "ȇrlar" },
        },
        "o,u": {
          1: { singular: "yȇrım", plural: "yȇrız" },
          2: { singular: "yȇrsın", plural: "yȇrsınız" },
          3: { singular: "yȇr", plural: "yȇrlar" },
        },
        "ä,e,i": {
          1: { singular: "erim", plural: "eriz" },
          2: { singular: "ersin", plural: "ersiniz" },
          3: { singular: "er", plural: "erlär" },
        },
        "ö,ü": {
          1: { singular: "yerim", plural: "yeriz" },
          2: { singular: "yersin", plural: "yersiniz" },
          3: { singular: "yer", plural: "yerlär" },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: { singular: "ȇrım", plural: "ȇrız" },
          2: { singular: "ȇrsın", plural: "ȇrsınız" },
          3: { singular: "ȇr", plural: "ȇrlar" },
        },
        "ä,e,i,ö,ü": {
          1: { singular: "erim", plural: "eriz" },
          2: { singular: "ersin", plural: "ersiniz" },
          3: { singular: "er", plural: "erlär" },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: { singular: "ȇrım", plural: "ȇrız" },
          2: { singular: "ȇrsın", plural: "ȇrsınız" },
          3: { singular: "ȇr", plural: "ȇrlar" },
        },
        "ä,e,i,ö,ü": {
          1: { singular: "erim", plural: "eriz" },
          2: { singular: "ersin", plural: "ersiniz" },
          3: { singular: "er", plural: "erlär" },
        },
      },
      4: {
        "a,ȇ,ı,o,u": {
          1: { singular: "dȇrım", plural: "dȇrız" },
          2: { singular: "dȇrsın", plural: "dȇrsınız" },
          3: { singular: "dȇr", plural: "dȇrlar" },
        },
        "ä,e,i,ö,ü": {
          1: { singular: "derim", plural: "deriz" },
          2: { singular: "dersin", plural: "dersiniz" },
          3: { singular: "der", plural: "derlär" },
        },
      },
    },
    longpasttense: {
      1: {
        "a,ȇ,ı": {
          1: {
            singular: ["dıydım", "я давно"],
            plural: ["dıydık", "мы давно"],
          },
          2: {
            singular: ["dıydın", "ты давно"],
            plural: ["dıydınız", "вы давно"],
          },
          3: {
            singular: ["dıydı", ["он давно", "она давно", "оно давно"]],
            plural: ["dıydılar", "они давно"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["diydin", "я давно"],
            plural: ["diydik", "мы давно"],
          },
          2: {
            singular: ["diydin", "ты давно"],
            plural: ["diydiniz", "вы давно"],
          },
          3: {
            singular: ["diydi", ["он давно", "она давно", "оно давно"]],
            plural: ["diydilär", "они давно"],
          },
        },
        "o,u": {
          1: {
            singular: ["duydum", "я давно"],
            plural: ["duyduk", "мы давно"],
          },
          2: {
            singular: ["duydun", "ты давно"],
            plural: ["duydunuz", "вы давно"],
          },
          3: {
            singular: ["duydu", ["он давно", "она давно", "оно давно"]],
            plural: ["duydular", "они давно"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["düydüm", "я давно"],
            plural: ["düydük", "мы давно"],
          },
          2: {
            singular: ["düydün", "ты давно"],
            plural: ["düydünüz", "вы давно"],
          },
          3: {
            singular: ["düydü", ["он давно", "она давно", "оно давно"]],
            plural: ["düydülär", "они давно"],
          },
        },
      },
      2: {
        "a,ȇ,ı": {
          1: {
            singular: ["dıydım", "я давно"],
            plural: ["dıydık", "мы давно"],
          },
          2: {
            singular: ["dıydın", "ты давно"],
            plural: ["dıydınız", "вы давно"],
          },
          3: {
            singular: ["dıydı", ["он давно", "она давно", "оно давно"]],
            plural: ["dıydılar", "они давно"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["diydim", "я давно"],
            plural: ["diydik", "мы давно"],
          },
          2: {
            singular: ["diydim", "ты давно"],
            plural: ["diydiniz", "вы давно"],
          },
          3: {
            singular: ["diydi", ["он давно", "она давно", "оно давно"]],
            plural: ["diydilär", "они давно"],
          },
        },
        "o,u": {
          1: {
            singular: ["duydum", "я давно"],
            plural: ["duyduk", "мы давно"],
          },
          2: {
            singular: ["duydun", "ты давно"],
            plural: ["duydunuz", "вы давно"],
          },
          3: {
            singular: ["duydu", ["он давно", "она давно", "оно давно"]],
            plural: ["duydular", "они давно"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["düydüm", "я давно"],
            plural: ["düydük", "мы давно"],
          },
          2: {
            singular: ["düydün", "ты давно"],
            plural: ["düydünüz", "вы давно"],
          },
          3: {
            singular: ["düydü", ["он давно", "она давно", "оно давно"]],
            plural: ["düydülär", "они давно"],
          },
        },
      },
      3: {
        "a,ȇ,ı": {
          1: {
            singular: ["tıydım", "я давно"],
            plural: ["tıydık", "мы давно"],
          },
          2: {
            singular: ["tıydın", "ты давно"],
            plural: ["tıydınız", "вы давно"],
          },
          3: {
            singular: ["tıydı", ["он давно", "она давно", "оно давно"]],
            plural: ["tıydılar", "они давно"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["tiydim", "я давно"],
            plural: ["tıydik", "мы давно"],
          },
          2: {
            singular: ["tiydin", "ты давно"],
            plural: ["tıydiniz", "вы давно"],
          },
          3: {
            singular: ["tiydi", ["он давно", "она давно", "оно давно"]],
            plural: ["tiydilär", "они давно"],
          },
        },
        "o,u": {
          1: {
            singular: ["tuydum", "я давно"],
            plural: ["tuyduk", "мы давно"],
          },
          2: {
            singular: ["tuydun", "ты давно"],
            plural: ["tuydunuz", "вы давно"],
          },
          3: {
            singular: ["tuydu", ["он давно", "она давно", "оно давно"]],
            plural: ["tuydular", "они давно"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["tüydüm", "я давно"],
            plural: ["tüydük", "мы давно"],
          },
          2: {
            singular: ["tüydün", "ты давно"],
            plural: ["tüydünüz", "вы давно"],
          },
          3: {
            singular: ["tüydü", ["он давно", "она давно", "оно давно"]],
            plural: ["tüydülär", "они давно"],
          },
        },
      },
      4: {
        "a,ȇ,ı": {
          1: {
            singular: ["ttıydım", "я давно"],
            plural: ["ttıydık", "мы давно"],
          },
          2: {
            singular: ["ttıydın", "ты давно"],
            plural: ["ttıydınız", "вы давно"],
          },
          3: {
            singular: ["ttıydı", ["он давно", "она давно", "оно давно"]],
            plural: ["ttıydılar", "они давно"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["ttiydim", "я давно"],
            plural: ["ttıydik", "мы давно"],
          },
          2: {
            singular: ["ttiydin", "ты давно"],
            plural: ["ttıydiniz", "вы давно"],
          },
          3: {
            singular: ["ttiydi", ["он давно", "она давно", "оно давно"]],
            plural: ["ttiydilär", "они давно"],
          },
        },
        "o,u": {
          1: {
            singular: ["ttuydum", "я давно"],
            plural: ["ttuyduk", "мы давно"],
          },
          2: {
            singular: ["ttuydun", "ты давно"],
            plural: ["ttuydunuz", "вы давно"],
          },
          3: {
            singular: ["ttuydu", ["он давно", "она давно", "оно давно"]],
            plural: ["ttuydular", "они давно"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["ttüydüm", "я давно"],
            plural: ["ttüydük", "мы давно"],
          },
          2: {
            singular: ["ttüydün", "ты давно"],
            plural: ["ttüydünüz", "вы давно"],
          },
          3: {
            singular: ["ttüydü", ["он давно", "она давно", "оно давно"]],
            plural: ["ttüydülär", "они давно"],
          },
        },
      },
    },
    pasttense: {
      1: {
        "a,ȇ,ı": {
          1: { singular: ["dım", "я"], plural: ["dık", "мы"] },
          2: { singular: ["dın", "ты"], plural: ["dınız", "вы"] },
          3: { singular: ["dı", "он"], plural: ["dılar", "они"] },
        },
        "ä,e,i": {
          1: { singular: ["dim", "я"], plural: ["dik", "мы"] },
          2: { singular: ["din", "ты"], plural: ["diniz", "вы"] },
          3: { singular: ["di", "он"], plural: ["dilär", "они"] },
        },
        "o,u": {
          1: { singular: ["dum", "я"], plural: ["duk", "мы"] },
          2: { singular: ["dun", "ты"], plural: ["dunuz", "вы"] },
          3: { singular: ["du", "он"], plural: ["dular", "они"] },
        },
        "ö,ü": {
          1: { singular: ["düm", "я"], plural: ["dük", "мы"] },
          2: { singular: ["dün", "ты"], plural: ["dünüz", "вы"] },
          3: { singular: ["dü", "он"], plural: ["dülär", "они"] },
        },
      },
      2: {
        "a,ȇ,ı": {
          1: { singular: ["dım", "я"], plural: ["dık", "мы"] },
          2: { singular: ["dın", "ты"], plural: ["dınız", "вы"] },
          3: { singular: ["dı", "он"], plural: ["dılar", "они"] },
        },
        "ä,e,i": {
          1: { singular: ["dim", "я"], plural: ["dik", "мы"] },
          2: { singular: ["din", "ты"], plural: ["diniz", "вы"] },
          3: { singular: ["di", "он"], plural: ["dilär", "они"] },
        },
        "o,u": {
          1: { singular: ["dum", "я"], plural: ["duk", "мы"] },
          2: { singular: ["dun", "ты"], plural: ["dunuz", "вы"] },
          3: { singular: ["du", "он"], plural: ["dular", "они"] },
        },
        "ö,ü": {
          1: { singular: ["düm", "я"], plural: ["dük", "мы"] },
          2: { singular: ["dün", "ты"], plural: ["dünüz", "вы"] },
          3: { singular: ["dü", "он"], plural: ["dülär", "они"] },
        },
      },
      3: {
        "a,ȇ,ı": {
          1: { singular: ["tım", "я"], plural: ["tık", "мы"] },
          2: { singular: ["tın", "ты"], plural: ["tınız", "вы"] },
          3: { singular: ["tı", "он"], plural: ["tılar", "они"] },
        },
        "ä,e,i": {
          1: { singular: ["tim", "я"], plural: ["tik", "мы"] },
          2: { singular: ["tin", "ты"], plural: ["tiniz", "вы"] },
          3: { singular: ["ti", "он"], plural: ["tilär", "они"] },
        },
        "o,u": {
          1: { singular: ["tum", "я"], plural: ["tuk", "мы"] },
          2: { singular: ["tun", "ты"], plural: ["tunuz", "вы"] },
          3: { singular: ["tu", "он"], plural: ["tular", "они"] },
        },
        "ö,ü": {
          1: { singular: ["tüm", "я"], plural: ["tük", "мы"] },
          2: { singular: ["tün", "ты"], plural: ["tünüz", "вы"] },
          3: { singular: ["tü", "он"], plural: ["tülär", "они"] },
        },
      },
      4: {
        "a,ȇ,ı": {
          1: { singular: ["ttım", "я"], plural: ["ttık", "мы"] },
          2: { singular: ["ttın", "ты"], plural: ["ttınız", "вы"] },
          3: { singular: ["ttı", "он"], plural: ["ttılar", "они"] },
        },
        "ä,e,i": {
          1: { singular: ["ttim", "я"], plural: ["ttik", "мы"] },
          2: { singular: ["ttin", "ты"], plural: ["ttiniz", "вы"] },
          3: { singular: ["tti", "он"], plural: ["ttilär", "они"] },
        },
        "o,u": {
          1: { singular: ["ttum", "я"], plural: ["ttuk", "мы"] },
          2: { singular: ["ttun", "ты"], plural: ["ttunuz", "вы"] },
          3: { singular: ["ttu", "он"], plural: ["ttular", "они"] },
        },
        "ö,ü": {
          1: { singular: ["ttüm", "я"], plural: ["ttük", "мы"] },
          2: { singular: ["ttün", "ты"], plural: ["ttünüz", "вы"] },
          3: { singular: ["ttü", "он"], plural: ["ttülär", "они"] },
        },
      },
    },
    future: {
      1: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["yacam", "я буду"], plural: ["yacaz", "мы будем"] },
          2: {
            singular: ["yacan", "ты будешь"],
            plural: ["yacanız", "вы будете"],
          },
          3: {
            singular: ["yacek", "он будет"],
            plural: ["yaceklar", "они будут"],
          },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["yecem", "я буду"], plural: ["yecez", "мы будем"] },
          2: {
            singular: ["yecen", "ты будешь"],
            plural: ["yeceniz", "вы будете"],
          },
          3: {
            singular: ["yecek", "он будет"],
            plural: ["yeceklär", "они будут"],
          },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["acam", "я буду"], plural: ["acaz", "мы будем"] },
          2: {
            singular: ["acan", "ты будешь"],
            plural: ["acanız", "вы будете"],
          },
          3: {
            singular: ["acek", "он будет"],
            plural: ["aceklar", "они будут"],
          },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["ecem", "я буду"], plural: ["ecez", "мы будем"] },
          2: {
            singular: ["ecen", "ты будешь"],
            plural: ["eceniz", "вы будете"],
          },
          3: {
            singular: ["ecek", "он будет"],
            plural: ["eceklär", "они будут"],
          },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["acam", "я буду"], plural: ["acaz", "мы будем"] },
          2: {
            singular: ["acan", "ты будешь"],
            plural: ["acanız", "вы будете"],
          },
          3: {
            singular: ["acek", "он будет"],
            plural: ["aceklar", "они будут"],
          },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["ecem", "я буду"], plural: ["ecez", "мы будем"] },
          2: {
            singular: ["ecen", "ты будешь"],
            plural: ["eceniz", "вы будете"],
          },
          3: {
            singular: ["ecek", "он будет"],
            plural: ["eceklär", "они будут"],
          },
        },
      },
      4: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["dacam", "я буду"], plural: ["dacaz", "мы будем"] },
          2: {
            singular: ["dacan", "ты будешь"],
            plural: ["dacanız", "вы будете"],
          },
          3: {
            singular: ["dacek", "он будет"],
            plural: ["daceklar", "они будут"],
          },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["decem", "я буду"], plural: ["decez", "мы будем"] },
          2: {
            singular: ["decen", "ты будешь"],
            plural: ["deceniz", "вы будете"],
          },
          3: {
            singular: ["decek", "он будет"],
            plural: ["deceklär", "они будут"],
          },
        },
      },
    },
    futuresimple: {
      1: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["yacam", "я"], plural: ["yacaz", "мы"] },
          2: { singular: ["yacan", "ты"], plural: ["yacanız", "вы"] },
          3: { singular: ["yacek", "он"], plural: ["yaceklar", "они"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["yecem", "я"], plural: ["yecez", "мы"] },
          2: { singular: ["yecen", "ты"], plural: ["yeceniz", "вы"] },
          3: { singular: ["yecek", "он"], plural: ["yeceklär", "они"] },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["acam", "я"], plural: ["acaz", "мы"] },
          2: { singular: ["acan", "ты"], plural: ["acanız", "вы"] },
          3: { singular: ["acek", "он"], plural: ["aceklar", "они"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["ecem", "я"], plural: ["ecez", "мы"] },
          2: { singular: ["ecen", "ты"], plural: ["eceniz", "вы"] },
          3: { singular: ["ecek", "он"], plural: ["eceklär", "они"] },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["acam", "я"], plural: ["acaz", "мы"] },
          2: { singular: ["acan", "ты"], plural: ["acanız", "вы"] },
          3: { singular: ["acek", "он"], plural: ["aceklar", "они"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["ecem", "я"], plural: ["ecez", "мы"] },
          2: { singular: ["ecen", "ты"], plural: ["eceniz", "вы"] },
          3: { singular: ["ecek", "он"], plural: ["eceklär", "они"] },
        },
      },
      4: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["dacam", "я"], plural: ["dacaz", "мы"] },
          2: { singular: ["dacan", "ты"], plural: ["dacanız", "вы"] },
          3: { singular: ["dacek", "он"], plural: ["daceklar", "они"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["decem", "я"], plural: ["decez", "мы"] },
          2: { singular: ["decen", "ты"], plural: ["deceniz", "вы"] },
          3: { singular: ["decek", "он"], plural: ["deceklär", "они"] },
        },
      },
    },
    conditional: {
      1: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["yarsam", ["если я", "если бы я"]],
            plural: ["yarsak", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["yarsan", ["если ты", "если бы ты"]],
            plural: ["yarsanız", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "yarsa",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["yarsalar", ["если они", "если бы они"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["yärsäm", ["если я", "если бы я"]],
            plural: ["yärsäk", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["yärsän", ["если ты", "если бы ты"]],
            plural: ["yärsäniz", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "yärsä",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["yärsälär", ["если они", "если бы они"]],
          },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["arsam", ["если я", "если бы я"]],
            plural: ["arsak", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["arsan", ["если ты", "если бы ты"]],
            plural: ["arsanız", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "arsa",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["arsalar", ["если они", "если бы они"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["ärsäm", ["если я", "если бы я"]],
            plural: ["ärsäk", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["ärsän", ["если ты", "если бы ты"]],
            plural: ["ärsäniz", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "ärsä",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["ärsälär", ["если они", "если бы они"]],
          },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["arsam", ["если я", "если бы я"]],
            plural: ["arsak", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["arsan", ["если ты", "если бы ты"]],
            plural: ["arsanız", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "arsa",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["arsalar", ["если они", "если бы они"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["ärsäm", ["если я", "если бы я"]],
            plural: ["ärsäk", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["ärsän", ["если ты", "если бы ты"]],
            plural: ["ärsäniz", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "ärsä",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["ärsälär", ["если они", "если бы они"]],
          },
        },
      },
      4: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["darsam", ["если я", "если бы я"]],
            plural: ["darsak", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["darsan", ["если ты", "если бы ты"]],
            plural: ["darsanız", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "darsa",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["darsalar", ["если они", "если бы они"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["därsäm", ["если я", "если бы я"]],
            plural: ["därsäk", ["если мы", "если бы мы"]],
          },
          2: {
            singular: ["därsän", ["если ты", "если бы ты"]],
            plural: ["därsäniz", ["если вы", "если бы вы"]],
          },
          3: {
            singular: [
              "därsä",
              [
                "если он",
                "если она",
                "если оно",
                "если бы он",
                "если бы она",
                "если бы оно",
              ],
            ],
            plural: ["därsälär", ["если они", "если бы они"]],
          },
        },
      },
    },
    imperative: {
      1: {
        "a,ȇ,ı,o,u": { 2: { plural: "ın" } },
        "ä,e,i,ö,ü": { 2: { plural: "in" } },
      },
      2: {
        "a,ȇ,ı,o,u": { 2: { plural: "ın" } },
        "ä,e,i,ö,ü": { 2: { plural: "in" } },
      },
      3: {
        "a,ȇ,ı,o,u": { 2: { plural: "ın" } },
        "ä,e,i,ö,ü": { 2: { plural: "in" } },
      },
      4: {
        "a,ȇ,ı,o,u": { 2: { plural: "ın" } },
        "ä,e,i,ö,ü": { 2: { plural: "in" } },
      },
    },
  },
  negative: {
    present: {
      1: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["mȇȇrım", "я не"], plural: ["mȇȇrız", "мы не"] },
          2: { singular: ["mȇȇrsın", "ты не"], plural: ["mȇȇrsınız", "вы не"] },
          3: { singular: ["mȇȇr", "он не"], plural: ["mȇȇrlar", "они не"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["meerım", "я не"], plural: ["meerız", "мы не"] },
          2: { singular: ["meersın", "ты не"], plural: ["meersınız", "вы не"] },
          3: { singular: ["meer", "он не"], plural: ["meerlär", "они не"] },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["mȇȇrım", "я не"], plural: ["mȇȇrız", "мы не"] },
          2: { singular: ["mȇȇrsın", "ты не"], plural: ["mȇȇrsınız", "вы не"] },
          3: { singular: ["mȇȇr", "он не"], plural: ["mȇȇrlar", "они не"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["meerım", "я не"], plural: ["meerız", "мы не"] },
          2: { singular: ["meersın", "ты не"], plural: ["meersınız", "вы не"] },
          3: { singular: ["meer", "он не"], plural: ["meerlär", "они не"] },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["mȇȇrım", "я не"], plural: ["mȇȇrız", "мы не"] },
          2: { singular: ["mȇȇrsın", "ты не"], plural: ["mȇȇrsınız", "вы не"] },
          3: { singular: ["mȇȇr", "он не"], plural: ["mȇȇrlar", "они не"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["meerım", "я не"], plural: ["meerız", "мы не"] },
          2: { singular: ["meersın", "ты не"], plural: ["meersınız", "вы не"] },
          3: { singular: ["meer", "он не"], plural: ["meerlär", "они не"] },
        },
      },
      4: {
        "a,ȇ,ı,o,u": {
          1: { singular: ["tmȇȇrım", "я не"], plural: ["tmȇȇrız", "мы не"] },
          2: {
            singular: ["tmȇȇrsın", "ты не"],
            plural: ["tmȇȇrsınız", "вы не"],
          },
          3: { singular: ["tmȇȇr", "он не"], plural: ["tmȇȇrlar", "они не"] },
        },
        "ä,e,i,ö,ü": {
          1: { singular: ["tmeerım", "я не"], plural: ["tmeerız", "мы не"] },
          2: {
            singular: ["tmeersın", "ты не"],
            plural: ["tmeersınız", "вы не"],
          },
          3: { singular: ["tmeer", "он не"], plural: ["tmeerlär", "они не"] },
        },
      },
    },
    longpasttense: {
      1: {
        "a,ȇ,ı": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
        "o,u": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
      },
      2: {
        "a,ȇ,ı": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
        "o,u": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
      },
      3: {
        "a,ȇ,ı": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
        "o,u": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
      },
      4: {
        "a,ȇ,ı": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ä,e,i": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
        "o,u": {
          1: {
            singular: ["madıydım", "я давно не"],
            plural: ["madıydık", "мы давно не"],
          },
          2: {
            singular: ["madıydın", "ты давно не"],
            plural: ["madıydınız", "вы давно не"],
          },
          3: {
            singular: ["madıydı", "он давно не"],
            plural: ["madıydılar", "они давно не"],
          },
        },
        "ö,ü": {
          1: {
            singular: ["mediydim", "я давно не"],
            plural: ["mediydik", "мы давно не"],
          },
          2: {
            singular: ["mediydim", "ты давно не"],
            plural: ["mediydiniz", "вы давно не"],
          },
          3: {
            singular: ["mediydi", "он давно не"],
            plural: ["mediydilär", "они давно не"],
          },
        },
      },
    },
    pasttense: {
      1: {
        "a,ȇ,ı": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ä,e,i": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
        "o,u": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ö,ü": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
      },
      2: {
        "a,ȇ,ı": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ä,e,i": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
        "o,u": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ö,ü": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
      },
      3: {
        "a,ȇ,ı": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ä,e,i": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
        "o,u": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ö,ü": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
      },
      4: {
        "a,ȇ,ı": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ä,e,i": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
        "o,u": {
          1: { singular: ["madım", "я не"], plural: ["madık", "мы не"] },
          2: { singular: ["madın", "ты не"], plural: ["madınız", "вы не"] },
          3: { singular: ["madı", "он не"], plural: ["madılar", "они не"] },
        },
        "ö,ü": {
          1: { singular: ["medim", "я не"], plural: ["medik", "мы не"] },
          2: { singular: ["medim", "ты не"], plural: ["mediniz", "вы не"] },
          3: { singular: ["medi", "он не"], plural: ["medilär", "они не"] },
        },
      },
    },
    future: {
      1: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не буду", "я не буду"]],
            plural: ["mayacaz", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["mayacan", ["не будешь", "ты не будешь"]],
            plural: ["mayacanız", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["mayacak", ["не будет", "он не будет"]],
            plural: ["mayacaklar", ["не будут", "они не будут"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["meyecem", ["не буду", "я не буду"]],
            plural: ["meyecez", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["meyecen", ["не будешь", "ты не будешь"]],
            plural: ["meyeceniz", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["meyecek", ["не будет", "он не будет"]],
            plural: ["meyeceklär", ["не будут", "они не будут"]],
          },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не буду", "я не буду"]],
            plural: ["mayacaz", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["mayacan", ["не будешь", "ты не будешь"]],
            plural: ["mayacanız", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["mayacak", ["не будет", "он не будет"]],
            plural: ["mayacaklar", ["не будут", "они не будут"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["meyecem", ["не буду", "я не буду"]],
            plural: ["meyecez", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["meyecen", ["не будешь", "ты не будешь"]],
            plural: ["meyeceniz", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["meyecek", ["не будет", "он не будет"]],
            plural: ["meyeceklär", ["не будут", "они не будут"]],
          },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не буду", "я не буду"]],
            plural: ["mayacaz", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["mayacan", ["не будешь", "ты не будешь"]],
            plural: ["mayacanız", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["mayacak", ["не будет", "он не будет"]],
            plural: ["mayacaklar", ["не будут", "они не будут"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["meyecem", ["не буду", "я не буду"]],
            plural: ["meyecez", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["meyecen", ["не будешь", "ты не будешь"]],
            plural: ["meyeceniz", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["meyecek", ["не будет", "он не будет"]],
            plural: ["meyeceklär", ["не будут", "они не будут"]],
          },
        },
      },
      // Optional: alternative variation with prefix t- (possibly dialectal or contextual variant)
      4: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не буду", "я не буду"]],
            plural: ["tmayacaz", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["tmayacan", ["не будешь", "ты не будешь"]],
            plural: ["tmayacanız", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["tmayacak", ["не будет", "он не будет"]],
            plural: ["mayacaklar", ["не будут", "они не будут"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["tmeyecem", ["не буду", "я не буду"]],
            plural: ["tmeyecez", ["не будем", "мы не будем"]],
          },
          2: {
            singular: ["tmeyecen", ["не будешь", "ты не будешь"]],
            plural: ["tmeyeceniz", ["не будете", "вы не будете"]],
          },
          3: {
            singular: ["tmeyecek", ["не будет", "он не будет"]],
            plural: ["meyeceklär", ["не будут", "они не будут"]],
          },
        },
      },
    },
    futuresimple: {
      1: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не", "я не"]],
            plural: ["mayacaz", ["не", "мы не"]],
          },
          2: {
            singular: ["mayacan", ["не", "ты не"]],
            plural: ["mayacanız", ["не", "вы не"]],
          },
          3: {
            singular: ["mayacak", ["не", "он не"]],
            plural: ["mayacaklar", ["не", "они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["meyecem", ["не", "я не"]],
            plural: ["meyecez", ["не", "мы не"]],
          },
          2: {
            singular: ["meyecen", ["не", "ты не"]],
            plural: ["meyeceniz", ["не", "вы не"]],
          },
          3: {
            singular: ["meyecek", ["не", "он не"]],
            plural: ["meyeceklär", ["не", "они не"]],
          },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не", "я не"]],
            plural: ["mayacaz", ["не", "мы не"]],
          },
          2: {
            singular: ["mayacan", ["не", "ты не"]],
            plural: ["mayacanız", ["не", "вы не"]],
          },
          3: {
            singular: ["mayacak", ["не", "он не"]],
            plural: ["mayacaklar", ["не", "они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["meyecem", ["не", "я не"]],
            plural: ["meyecez", ["не", "мы не"]],
          },
          2: {
            singular: ["meyecen", ["не", "ты не"]],
            plural: ["meyeceniz", ["не", "вы не"]],
          },
          3: {
            singular: ["meyecek", ["не", "он не"]],
            plural: ["meyeceklär", ["не", "они не"]],
          },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не", "я не"]],
            plural: ["mayacaz", ["не", "мы не"]],
          },
          2: {
            singular: ["mayacan", ["не", "ты не"]],
            plural: ["mayacanız", ["не", "вы не"]],
          },
          3: {
            singular: ["mayacak", ["не", "он не"]],
            plural: ["mayacaklar", ["не", "они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["meyecem", ["не", "я не"]],
            plural: ["meyecez", ["не", "мы не"]],
          },
          2: {
            singular: ["meyecen", ["не", "ты не"]],
            plural: ["meyeceniz", ["не", "вы не"]],
          },
          3: {
            singular: ["meyecek", ["не", "он не"]],
            plural: ["meyeceklär", ["не", "они не"]],
          },
        },
      },
      4: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["mayacam", ["не", "я не"]],
            plural: ["tmayacaz", ["не", "мы не"]],
          },
          2: {
            singular: ["tmayacan", ["не", "ты не"]],
            plural: ["tmayacanız", ["не", "вы не"]],
          },
          3: {
            singular: ["tmayacak", ["не", "он не"]],
            plural: ["tmayacaklar", ["не", "они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["meyecem", ["не", "я не"]],
            plural: ["tmeyecez", ["не", "мы не"]],
          },
          2: {
            singular: ["tmeyecen", ["не", "ты не"]],
            plural: ["tmeyeceniz", ["не", "вы не"]],
          },
          3: {
            singular: ["tmeyecek", ["не", "он не"]],
            plural: ["tmeyeceklär", ["не", "они не"]],
          },
        },
      }, // ✅ final confirmed version for index 4
    },
    conditional: {
      1: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["marsam", ["если я не", "если бы я не"]],
            plural: ["marsak", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["marsan", ["если ты не", "если бы ты не"]],
            plural: ["marsanız", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "marsa",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["marsalar", ["если они не", "если бы они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["mersäm", ["если я не", "если бы я не"]],
            plural: ["mersäk", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["mersän", ["если ты не", "если бы ты не"]],
            plural: ["mersäniz", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "mersä",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["mersälär", ["если они не", "если бы они не"]],
          },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["marsam", ["если я не", "если бы я не"]],
            plural: ["marsak", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["marsan", ["если ты не", "если бы ты не"]],
            plural: ["marsanız", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "marsa",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["marsalar", ["если они не", "если бы они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["mersäm", ["если я не", "если бы я не"]],
            plural: ["mersäk", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["mersän", ["если ты не", "если бы ты не"]],
            plural: ["mersäniz", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "mersä",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["mersälär", ["если они не", "если бы они не"]],
          },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["marsam", ["если я не", "если бы я не"]],
            plural: ["marsak", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["marsan", ["если ты не", "если бы ты не"]],
            plural: ["marsanız", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "marsa",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["marsalar", ["если они не", "если бы они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["mersäm", ["если я не", "если бы я не"]],
            plural: ["mersäk", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["mersän", ["если ты не", "если бы ты не"]],
            plural: ["mersäniz", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "mersä",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["mersälär", ["если они не", "если бы они не"]],
          },
        },
      },
      4: {
        // ✅ Final confirmed variation
        "a,ȇ,ı,o,u": {
          1: {
            singular: ["tmarsam", ["если я не", "если бы я не"]],
            plural: ["tmarsak", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["tmarsan", ["если ты не", "если бы ты не"]],
            plural: ["tmarsanız", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "tmarsa",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["tmarsalar", ["если они не", "если бы они не"]],
          },
        },
        "ä,e,i,ö,ü": {
          1: {
            singular: ["tmersäm", ["если я не", "если бы я не"]],
            plural: ["tmersäk", ["если мы не", "если бы мы не"]],
          },
          2: {
            singular: ["tmersän", ["если ты не", "если бы ты не"]],
            plural: ["tmersäniz", ["если вы не", "если бы вы не"]],
          },
          3: {
            singular: [
              "tmersä",
              [
                "если он не",
                "если она не",
                "если оно не",
                "если бы он не",
                "если бы она не",
                "если бы оно не",
              ],
            ],
            plural: ["tmersälär", ["если они не", "если бы они не"]],
          },
        },
      },
    },
    imperative: {
      1: {
        "a,ȇ,ı,o,u": {
          2: { singular: "ma", plural: "mayın" },
        },
        "ä,e,i,ö,ü": {
          2: { singular: "mä", plural: "meyin" },
        },
      },
      2: {
        "a,ȇ,ı,o,u": {
          2: { singular: "ma", plural: "mayın" },
        },
        "ä,e,i,ö,ü": {
          2: { singular: "mä", plural: "meyin" },
        },
      },
      3: {
        "a,ȇ,ı,o,u": {
          2: { singular: "ma", plural: "mayın" },
        },
        "ä,e,i,ö,ü": {
          2: { singular: "mä", plural: "meyin" },
        },
      },
      4: {
        "a,ȇ,ı,o,u": {
          2: { singular: "ma", plural: "mayın" },
        },
        "ä,e,i,ö,ü": {
          2: { singular: "mä", plural: "meyin" },
        },
      },
    },
  },
};
module.exports = { rules };
