package com.GTI.ExericeGTI.repos;

import com.GTI.ExericeGTI.model.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte, Integer> {
}
