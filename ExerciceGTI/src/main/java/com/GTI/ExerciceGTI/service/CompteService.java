package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExerciceGTI.model.Compte;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.CompteRepository;
import com.GTI.ExerciceGTI.repos.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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


}
