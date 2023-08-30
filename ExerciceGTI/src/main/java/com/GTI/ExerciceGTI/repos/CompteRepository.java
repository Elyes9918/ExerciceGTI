package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte, Integer> {
}
