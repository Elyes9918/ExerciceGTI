package com.GTI.ExerciceGTI.dataTransferObjects;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class FichierRequest {
        private Integer idDemande;
        private Integer nature;
}
