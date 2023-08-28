package com.GTI.ExericeGTI.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Utilisateur")
public class Utilisateur {

    @Id
    @GeneratedValue
    private Integer nCin;
    private String motDePasse;
    private String nom;
    private String prenom;
    private String situationF;
    private Integer role;

    @OneToMany(mappedBy = "utilisateur", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Compte> comptes;

    @OneToMany(mappedBy = "utilisateur", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<DemandeCredit> demandeCredits;



}
