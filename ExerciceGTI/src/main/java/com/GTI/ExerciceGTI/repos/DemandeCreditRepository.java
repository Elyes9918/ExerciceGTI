package com.GTI.ExerciceGTI.repos;

import com.GTI.ExerciceGTI.model.DemandeCredit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;

@Repository
public interface DemandeCreditRepository extends JpaRepository<DemandeCredit, Integer> {


}
