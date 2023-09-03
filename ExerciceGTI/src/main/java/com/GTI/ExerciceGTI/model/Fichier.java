package com.GTI.ExerciceGTI.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Fichier")
public class Fichier {

    @Id
    @GeneratedValue
    private Integer id;
    private String nomFichier;
    private String type;
    private Integer nature;
    private String filePath;
    private String extension;
    private String uuid;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_utilisateur",nullable = false)
    private Utilisateur utilisateur;

}
