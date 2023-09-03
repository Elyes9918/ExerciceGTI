package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Integer> {

    @Query("select c from Compte c where c.utilisateur.ncin = :nCin")
    List<Compte> findComptesByUserId(@Param("nCin") Integer nCin);




}
