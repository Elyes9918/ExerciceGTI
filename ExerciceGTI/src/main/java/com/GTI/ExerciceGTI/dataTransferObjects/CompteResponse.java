package com.GTI.ExerciceGTI.dataTransferObjects;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class CompteResponse {
    private Integer nCompte;
    private Integer devise;
    private String dateOuveurture;
}
