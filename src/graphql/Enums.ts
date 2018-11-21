export interface DictionaryInterface {
  [key: string]: string;
}

export const BillResult: DictionaryInterface = {
    A_0: 'NR SR nebude pokračovať v rokovaní o návrhu zákona',
    A_1: 'NZ vzal navrhovateľ späť',
    A_2: 'Zápis uznesenia NR SR',
    A_3: 'NZ postúpil do redakcie',
    A_4: 'Zápis spoločnej správy výborov',
    A_5: 'NZ nebol schválený',
    A_6: 'Pripravená informácia k NZ',
    A_7: 'Zákon vyšiel v Zbierke zákonov',
    A_8: 'Zákon bol vrátený prezidentom',
    A_9: 'Zapísané uznesenie výboru',
    A_10: 'Výber právneho poradcu',
    A_11: 'NZ postúpil do II. čítania',
};

export const InterpellationStatus: DictionaryInterface = {
  A_0: 'Príjem odpovede na interpeláciu',
  A_1: 'Rokovanie o interpelácii',
  A_2: 'Uzavretá odpoveď na interpeláciu',
};

export const VotingResult: DictionaryInterface = {
  A_0: 'Návrh prešiel',
  A_1: 'Návrh neprešiel',
  A_2: 'Parlament nebol uznášaniaschopný',
};
