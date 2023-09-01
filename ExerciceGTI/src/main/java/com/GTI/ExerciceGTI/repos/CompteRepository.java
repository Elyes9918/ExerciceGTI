package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompteRepository extends JpaRepository<Compte, Integer> {

    @Query("select c from Compte c where c.utilisateur.nCin = :userId")
    List<Compte> findComptesByUserId(@Param("userId") Integer userID);




}
