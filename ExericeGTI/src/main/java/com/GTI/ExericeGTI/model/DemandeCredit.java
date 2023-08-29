package com.GTI.ExericeGTI.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="DemandeCredit")
public class DemandeCredit {

    @Id
    @GeneratedValue
    private Integer nDemande;
    private Integer idDemande;
    private Boolean etat;
    private String dateDemande;
    private String observation;
    private Integer type;
    private Integer unite;
    private Integer nbreEcheance;
    private Integer montant;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @OneToMany(mappedBy = "demandeCredit", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Fichier> fichiers;

    @OneToMany(mappedBy = "demandeCredit", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Garantie> garanties;
}
