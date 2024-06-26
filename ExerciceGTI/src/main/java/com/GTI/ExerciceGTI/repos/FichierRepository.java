package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Fichier;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

 @Repository
public interface FichierRepository extends JpaRepository<Fichier, Integer> {
    Optional<Fichier> findByNomFichier(String fileName);

     @Query("select f from Fichier f where f.utilisateur.ncin = :nCin")
     List<Fichier> findFichierByUserId(@Param("nCin") Integer nCin);

     Fichier findByUuid(String uuid);

     @Transactional
     void deleteById(Integer id);

}
