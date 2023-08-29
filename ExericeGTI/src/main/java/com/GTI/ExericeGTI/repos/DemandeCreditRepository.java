package com.GTI.ExericeGTI.repos;

import com.GTI.ExericeGTI.model.DemandeCredit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeCreditRepository extends JpaRepository<DemandeCredit, Integer> {
}
