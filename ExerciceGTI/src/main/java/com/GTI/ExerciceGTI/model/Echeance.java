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
@Table(name="Echeance")
public class Echeance {

    @Id
    @GeneratedValue
    private Integer id;
    private double valeur;
    private Integer numero;
    private String dateEcheance;
    private Integer statusPaiement;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_demandeCredit", nullable = false)
    private DemandeCredit demandeCredit;






}
