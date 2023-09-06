package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Compte;
import com.GTI.ExerciceGTI.model.DemandeCredit;
import com.GTI.ExerciceGTI.model.Echeance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface EcheanceRepository extends JpaRepository<Echeance, Integer> {

    @Query("select e from Echeance e where e.demandeCredit.nDemande = :nDemande")
    List<Echeance> findAllEcheanceByIdDemande(@Param("nDemande") Integer nDemande);


}
