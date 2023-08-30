package com.GTI.ExerciceGTI.dataTransferObjects;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Builder
public class LoginRequest {

    private Integer ncin;
    private String password;
}
