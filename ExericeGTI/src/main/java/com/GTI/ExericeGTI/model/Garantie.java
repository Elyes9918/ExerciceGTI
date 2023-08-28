package com.GTI.ExericeGTI.model;


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
@Table(name="Garantie")
public class Garantie {

    @Id
    @GeneratedValue
    private Integer id;
    private Integer nature;
    private Integer type;
    private Integer valeur;
    private Integer devise;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_demandeCredit", nullable = false)
    private DemandeCredit demandeCredit;

}
