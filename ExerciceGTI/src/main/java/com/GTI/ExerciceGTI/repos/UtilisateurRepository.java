package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
}
