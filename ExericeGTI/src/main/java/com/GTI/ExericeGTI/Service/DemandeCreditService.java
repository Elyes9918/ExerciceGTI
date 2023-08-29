package com.GTI.ExericeGTI.service;

import com.GTI.ExericeGTI.dataTransferObjects.GarantieRequest;
import com.GTI.ExericeGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExericeGTI.model.DemandeCredit;
import com.GTI.ExericeGTI.model.Utilisateur;
import com.GTI.ExericeGTI.repos.CompteRepository;
import com.GTI.ExericeGTI.repos.DemandeCreditRepository;
import com.GTI.ExericeGTI.repos.GarantieRepository;
import com.GTI.ExericeGTI.repos.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DemandeCreditService {

    private final DemandeCreditRepository demandeCreditRepository;
    private final UtilisateurRepository utilisateurRepository;
    private  GarantieService garantieService;


    public void AjouterDemandeCredit(DemandeCreditRequest request){

        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(request.getNcin());

        DemandeCredit demandeCredit = DemandeCredit.builder()
                .idDemande((int) (Math.random() * (Math.pow(10, 6 - 1) * 9) + Math.pow(10, 6 - 1)))
                .etat(false)
                .dateDemande(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .observation(request.getObservation_d())
                .type(request.getType_d())
                .montant(request.getMontant_d())
                .unite(request.getUnite_d())
                .nbreEcheance(request.getNbreEcheance_d())
                .utilisateur(utilisateur.get())
                .build();

        demandeCredit = demandeCreditRepository.save(demandeCredit);

        for(GarantieRequest garantieRequest:request.getGarantieRequests()){
            garantieService.addGarantie(garantieRequest,demandeCredit);
        }


    }






}
