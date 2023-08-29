package com.GTI.ExericeGTI.dataTransferObjects;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class UtilisateurRequest {

    private String nom;
    private String prenom;
    private String mdp;
    private Integer role;
    private String situationF;
    private String dateNaissance;



}
