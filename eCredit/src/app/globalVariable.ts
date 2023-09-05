export class GlobalVariables  {

    public static typeCredit: { label: string; value: number ,taux:number ,periodeMax:number }[] = [
        { label: 'Personnel', value: 1 ,taux:3,periodeMax:12},
        { label: 'Auto', value: 2, taux:2.5,periodeMax:7},
        { label: 'Travaux', value: 3 ,taux:2,periodeMax:10},
      ];

      public static typeGaranties: { label: string; value: number }[] = [
        { label: 'Réelles', value: 1 },
        { label: 'Personelles', value: 2 },
        { label: 'Morales', value: 3 },
      ];

      public static unites: { label: string; value: number,nbrMois:number }[] = [
        { label: 'Mensuelle', value: 1,nbrMois:12 },
        { label: 'Trimestrielle', value: 2,nbrMois:4 },
        { label: 'Semestrielle', value: 3,nbrMois:2 },
      ];

      public static garanties: { label: string; value: number }[] = [
        { label: "Eviction", value: 1 },
        { label: 'Vices contre les malfaçons', value: 2 },
      ];


      public static devise: { label: string; value: number }[] = [
        { label: 'TND', value: 1 },
        { label: 'EUR', value: 2 },
        { label: 'USD', value: 3 },
      ];


}