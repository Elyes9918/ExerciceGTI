package com.GTI.ExerciceGTI.dataTransferObjects;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class DemandeCreditResponse {

    private Integer numDemande;
    private Integer idDemande;
    private String nomClient;
    private Integer typeCredit;
    private Integer Etat;
    private String DateDemande;


}
