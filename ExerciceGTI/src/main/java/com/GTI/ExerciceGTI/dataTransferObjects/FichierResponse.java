package com.GTI.ExerciceGTI.dataTransferObjects;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class FichierResponse {
    private String fileName;
    private String url;
    private String type;
    private Integer nature;
}
