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
    private Boolean enDevise;
    private String dateOuveurture;
}
