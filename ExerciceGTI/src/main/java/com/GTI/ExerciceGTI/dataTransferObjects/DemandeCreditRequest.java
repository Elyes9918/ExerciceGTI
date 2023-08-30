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
    private String observation_d;
    private Integer type_d;
    private Integer unite_d;
    private Integer nbreEcheance_d;
    private Integer montant_d;
    private List<GarantieRequest> garantieRequests;

}
