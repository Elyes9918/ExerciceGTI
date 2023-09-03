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
        private Integer idUtilisateur;
        private Integer nature;
        private String extension;
        private String uuid;
}
