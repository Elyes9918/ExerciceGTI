package com.GTI.ExericeGTI.service;

import com.GTI.ExericeGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExericeGTI.model.Utilisateur;
import com.GTI.ExericeGTI.repos.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UtilisateurService {
    private final UtilisateurRepository utilisateurRepository;
    public void SignUp(UtilisateurRequest request){

        Utilisateur utilisateur = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .role(request.getRole())
                .situationF(request.getSituationF())
                .motDePasse(request.getMdp())
                .dateNaissance(request.getDateNaissance())
                .build();

        utilisateurRepository.save(utilisateur);
    }


}
