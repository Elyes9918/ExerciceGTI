package com.GTI.ExericeGTI.service;

import com.GTI.ExericeGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExericeGTI.dataTransferObjects.GarantieRequest;
import com.GTI.ExericeGTI.model.Compte;
import com.GTI.ExericeGTI.model.DemandeCredit;
import com.GTI.ExericeGTI.model.Garantie;
import com.GTI.ExericeGTI.model.Utilisateur;
import com.GTI.ExericeGTI.repos.DemandeCreditRepository;
import com.GTI.ExericeGTI.repos.GarantieRepository;
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
