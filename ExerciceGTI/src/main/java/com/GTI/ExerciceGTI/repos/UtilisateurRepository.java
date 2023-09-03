package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Fichier;
import com.GTI.ExerciceGTI.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    Utilisateur findByNcin(Integer nCin);

}
