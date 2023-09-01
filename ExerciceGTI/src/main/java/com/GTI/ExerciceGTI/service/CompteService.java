package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.CompteResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExerciceGTI.model.Compte;
import com.GTI.ExerciceGTI.model.DemandeCredit;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.CompteRepository;
import com.GTI.ExerciceGTI.repos.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CompteService {

    private final CompteRepository compteRepository;
    private final UtilisateurRepository utilisateurRepository;


    public void addCompte(CompteRequest request){

        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(request.getId_utilisateur());

        Compte compte = Compte.builder()
                .dateOuverture(request.getDateOuverture())
                .enDevise(request.getEnDevise())
                .utilisateur(utilisateur.get())
                .build();

        compteRepository.save(compte);
    }


    public List<CompteResponse> getAllComptes() {

        List<Compte> comptes = compteRepository.findAll();
        List<CompteResponse> compteResponses = new ArrayList<>();
        for(Compte compte : comptes){
            CompteResponse compteResponse = CompteResponse.builder()
                    .nCompte(compte.getNCompte())
                    .enDevise(compte.getEnDevise())
                    .dateOuveurture(compte.getDateOuverture())
                    .build();

            compteResponses.add(compteResponse);
        }

        return compteResponses;
    }


    public CompteResponse getCompteById(Integer id) {
        Optional<Compte> compte = compteRepository.findById(id);

            CompteResponse compteResponse = CompteResponse.builder()
                    .nCompte(compte.get().getNCompte())
                    .enDevise(compte.get().getEnDevise())
                    .dateOuveurture(compte.get().getDateOuverture())
                    .build();

        return compteResponse;
    }
}
