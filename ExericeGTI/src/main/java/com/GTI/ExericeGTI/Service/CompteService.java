package com.GTI.ExericeGTI.service;

import com.GTI.ExericeGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExericeGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExericeGTI.model.Compte;
import com.GTI.ExericeGTI.model.Utilisateur;
import com.GTI.ExericeGTI.repos.CompteRepository;
import com.GTI.ExericeGTI.repos.UtilisateurRepository;
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
