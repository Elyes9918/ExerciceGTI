package com.GTI.ExerciceGTI.service;

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
public class GarantieService {

    private final GarantieRepository garantieRepository;
    private final DemandeCreditRepository demandeCreditRepository;

    public void addGarantie(GarantieRequest request,DemandeCredit demandeCredit){

        //Optional<DemandeCredit> demandeCredit = demandeCreditRepository.findById(request.getId_demandeCredit());

        Garantie garantie = Garantie.builder()
                .devise(request.getDevise())
                .nature(request.getNature())
                .type(request.getType())
                .valeur(request.getValeur())
                .demandeCredit(demandeCredit)
                .build();

        garantieRepository.save(garantie);
    }
}
