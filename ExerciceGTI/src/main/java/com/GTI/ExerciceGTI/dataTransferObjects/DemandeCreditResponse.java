package com.GTI.ExerciceGTI.dataTransferObjects;


import com.GTI.ExerciceGTI.model.Garantie;
import lombok.*;

import java.util.List;

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
    private Integer montant;
    private Integer nbrEchance;
    private Integer unite;
    private Integer Etat;
    private String DateDemande;
    private Integer idUser;
    private Integer idcompte;
    private List<Garantie> garantieRequests;
    private String observation;


}
