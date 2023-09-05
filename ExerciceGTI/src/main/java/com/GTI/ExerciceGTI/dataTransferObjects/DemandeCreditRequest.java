package com.GTI.ExerciceGTI.dataTransferObjects;


import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class DemandeCreditRequest {

    private Integer ncin;
    private Integer ncompte;
    private String observation;
    private Integer type;
    private Integer unite;
    private Integer nbreEcheance;
    private Integer montant;
    private double taux;
    private List<GarantieRequest> garantieRequests;

}
