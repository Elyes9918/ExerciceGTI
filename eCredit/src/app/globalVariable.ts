export class GlobalVariables  {

    public static typeCredit: { label: string; value: number }[] = [
        { label: 'Crédit Personnel', value: 1 },
        { label: 'Crédit Auto', value: 2 },
        { label: 'Crédit Travaux', value: 3 },
      ];

      public static typeGaranties: { label: string; value: number }[] = [
        { label: 'Garanties réelles', value: 1 },
        { label: 'Garanties personelles', value: 2 },
        { label: 'Garanties morales', value: 3 },
      ];

      public static unites: { label: string; value: number }[] = [
        { label: 'TND', value: 1 },
        { label: 'EUR', value: 2 },
        { label: 'USD', value: 3 },
      ];




}