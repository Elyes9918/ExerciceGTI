package com.GTI.ExerciceGTI.IService;

import com.GTI.ExerciceGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.CompteResponse;

import java.util.List;

public interface ICompteService {

     void addCompte(CompteRequest request);
     List<CompteResponse> getAllComptesById(Integer id);
     CompteResponse getCompteById(Integer id);
}
