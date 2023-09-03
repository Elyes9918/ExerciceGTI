package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Garantie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface GarantieRepository extends JpaRepository<Garantie, Integer> {
}
