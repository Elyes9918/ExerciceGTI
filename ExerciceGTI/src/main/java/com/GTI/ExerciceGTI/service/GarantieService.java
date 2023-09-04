package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.IService.IGarantieService;
import com.GTI.ExerciceGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.GarantieRequest;
import com.GTI.ExerciceGTI.model.Compte;
import com.GTI.ExerciceGTI.model.DemandeCredit;
import com.GTI.ExerciceGTI.model.Garantie;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.DemandeCreditRepository;
import com.GTI.ExerciceGTI.repos.GarantieRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class GarantieService implements IGarantieService {

    private final GarantieRepository garantieRepository;
    private final DemandeCreditRepository demandeCreditRepository;

    public void addGarantie(GarantieRequest request,DemandeCredit demandeCredit){

        Garantie garantie = Garantie.builder()
                .devise(request.getDevise())
                .nature(request.getNatureGarantie())
                .type(request.getTypeGarantie())
                .valeur(request.getValeur())
                .demandeCredit(demandeCredit)
                .build();

        garantieRepository.save(garantie);
    }
}
