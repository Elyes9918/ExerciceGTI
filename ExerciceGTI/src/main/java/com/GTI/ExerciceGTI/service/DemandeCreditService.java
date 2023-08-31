package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.GarantieRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExerciceGTI.model.DemandeCredit;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.CompteRepository;
import com.GTI.ExerciceGTI.repos.DemandeCreditRepository;
import com.GTI.ExerciceGTI.repos.GarantieRepository;
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
public class DemandeCreditService {

    private final DemandeCreditRepository demandeCreditRepository;
    private final UtilisateurRepository utilisateurRepository;
    private  GarantieService garantieService;


    public void AjouterDemandeCredit(DemandeCreditRequest request){

        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(request.getNcin());

        DemandeCredit demandeCredit = DemandeCredit.builder()
                .idDemande((int) (Math.random() * (Math.pow(10, 6 - 1) * 9) + Math.pow(10, 6 - 1)))
                .etat(0)
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


    public List<DemandeCreditResponse> getDemandesCredits() {
        List<DemandeCredit> demandeCredits = demandeCreditRepository.findAll();
        List<DemandeCreditResponse> demandeCreditResponses = new ArrayList<>();
        for(DemandeCredit demandeCredit : demandeCredits){
            DemandeCreditResponse demandeCreditResponse = DemandeCreditResponse.builder()
                    .numDemande(demandeCredit.getNDemande())
                    .idDemande(demandeCredit.getIdDemande())
                    .nomClient(demandeCredit.getUtilisateur().getNom()+" "+demandeCredit.getUtilisateur().getPrenom())
                    .typeCredit(demandeCredit.getType())
                    .Etat(demandeCredit.getEtat())
                    .DateDemande(demandeCredit.getDateDemande())
                    .build();

            demandeCreditResponses.add(demandeCreditResponse);
        }

        return demandeCreditResponses;
    }

    public void updateDemandeCreditEtat(Integer id, Integer etat) {
        Optional<DemandeCredit> optDemandeCredit = demandeCreditRepository.findById(id);
        DemandeCredit demandeCredit = optDemandeCredit.get();
        demandeCredit.setEtat(etat);
        demandeCreditRepository.save(demandeCredit);
    }
}
