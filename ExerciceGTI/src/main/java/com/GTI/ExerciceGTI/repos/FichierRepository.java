package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

 @Repository
public interface FichierRepository extends JpaRepository<Fichier, Integer> {
    Optional<Fichier> findByNomFichier(String fileName);
}
