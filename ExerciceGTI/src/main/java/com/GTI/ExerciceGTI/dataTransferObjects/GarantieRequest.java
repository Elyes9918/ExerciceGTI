package com.GTI.ExerciceGTI.dataTransferObjects;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class GarantieRequest {

    private Integer devise;
    private Integer natureGarantie;
    private Integer typeGarantie;
    private Integer valeur;

}
