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
    private Integer nature;
    private Integer type;
    private Integer valeur;

}
