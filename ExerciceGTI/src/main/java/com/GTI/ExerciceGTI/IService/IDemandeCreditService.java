package com.GTI.ExerciceGTI.IService;

import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public interface IDemandeCreditService {


    DemandeCreditResponse getDemandeCredit(Integer id);

    void AjouterDemandeCredit(DemandeCreditRequest request);
    List<DemandeCreditResponse> getDemandesCredits();
    void updateDemandeCreditEtat(Integer id, Integer etat);





}
