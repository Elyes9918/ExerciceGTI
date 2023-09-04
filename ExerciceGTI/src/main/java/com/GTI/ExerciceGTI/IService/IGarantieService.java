package com.GTI.ExerciceGTI.IService;

import com.GTI.ExerciceGTI.dataTransferObjects.GarantieRequest;
import com.GTI.ExerciceGTI.model.DemandeCredit;

public interface IGarantieService {

    void addGarantie(GarantieRequest request, DemandeCredit demandeCredit);
}
