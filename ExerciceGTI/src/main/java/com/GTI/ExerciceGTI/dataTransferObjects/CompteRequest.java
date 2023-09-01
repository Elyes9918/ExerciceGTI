package com.GTI.ExerciceGTI.dataTransferObjects;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class CompteRequest {

    private String dateOuverture;
    private Integer devise;
    private Integer id_utilisateur;
}
