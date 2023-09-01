package com.GTI.ExerciceGTI.dataTransferObjects;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class UtilisateurResponse {

    private Integer ncin;
    private String nom;
    private String prenom;
    private Integer role;
    private String situationF;
    private String dateNaissance;
}
