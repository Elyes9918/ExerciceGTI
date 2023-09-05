package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.IService.IDemandeCreditService;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.GarantieRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExerciceGTI.model.DemandeCredit;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.DemandeCreditRepository;
import com.GTI.ExerciceGTI.repos.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DemandeCreditService implements IDemandeCreditService {

    private final DemandeCreditRepository demandeCreditRepository;
    private final UtilisateurRepository utilisateurRepository;
    private  GarantieService garantieService;


    public DemandeCreditResponse getDemandeCredit(Integer id) {
        Optional<DemandeCredit> demandeCredit = demandeCreditRepository.findById(id);

            DemandeCreditResponse demandeCreditResponse = DemandeCreditResponse.builder()
                    .numDemande(demandeCredit.get().getNDemande())
                    .idDemande(demandeCredit.get().getIdDemande())
                    .Etat(demandeCredit.get().getEtat())
                    .DateDemande(demandeCredit.get().getDateDemande())
                    .idcompte(demandeCredit.get().getNcompte())
                    .typeCredit(demandeCredit.get().getType())
                    .montant(demandeCredit.get().getMontant())
                    .unite(demandeCredit.get().getUnite())
                    .nbrEchance(demandeCredit.get().getNbreEcheance())
                    .idUser(demandeCredit.get().getUtilisateur().getNcin())
                    .observation(demandeCredit.get().getObservation())
                    .garantieRequests(demandeCredit.get().getGaranties())
                    .build();

        return demandeCreditResponse;


    }

    public void AjouterDemandeCredit(DemandeCreditRequest request){

        Optional<Utilisateur> utilisateur = Optional.ofNullable(utilisateurRepository.findByNcin(request.getNcin()));

        DemandeCredit demandeCredit = DemandeCredit.builder()
                .idDemande((int) (Math.random() * (Math.pow(10, 6 - 1) * 9) + Math.pow(10, 6 - 1)))
                .etat(0)
                .dateDemande(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .observation(request.getObservation())
                .type(request.getType())
                .montant(request.getMontant())
                .unite(request.getUnite())
                .nbreEcheance(request.getNbreEcheance())
                .ncompte(request.getNcompte())
                .utilisateur(utilisateur.get())
                .taux(request.getTaux())
                .build();

        demandeCredit = demandeCreditRepository.save(demandeCredit);


        for(GarantieRequest garantieRequest:request.getGarantieRequests()){
            garantieService.addGarantie(garantieRequest,demandeCredit);
        }



    }


    public List<DemandeCreditResponse> getDemandesCredits() {
        List<DemandeCredit> demandeCredits = demandeCreditRepository.findAll();
        List<DemandeCreditResponse> demandeCreditResponses = new ArrayList<>();

        demandeCredits.stream().forEach(demandeCredit -> {
            DemandeCreditResponse demandeCreditResponse = DemandeCreditResponse.builder()
                    .numDemande(demandeCredit.getNDemande())
                    .idDemande(demandeCredit.getIdDemande())
                    .nomClient(demandeCredit.getUtilisateur().getNom()+" "+demandeCredit.getUtilisateur().getPrenom())
                    .typeCredit(demandeCredit.getType())
                    .Etat(demandeCredit.getEtat())
                    .DateDemande(demandeCredit.getDateDemande())
                    .build();

            demandeCreditResponses.add(demandeCreditResponse);

        });

        return demandeCreditResponses;
    }

    public void updateDemandeCreditEtat(Integer id, Integer etat) {
        Optional<DemandeCredit> optDemandeCredit = demandeCreditRepository.findById(id);
        DemandeCredit demandeCredit = optDemandeCredit.get();
        demandeCredit.setEtat(etat);
        demandeCreditRepository.save(demandeCredit);
    }
}
