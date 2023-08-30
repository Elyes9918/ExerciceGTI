package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.DemandeCredit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeCreditRepository extends JpaRepository<DemandeCredit, Integer> {
}
