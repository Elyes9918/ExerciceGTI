package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.dataTransferObjects.LoginRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.UtilisateurRepository;
import com.GTI.ExericeGTI.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public ApiResponse validateLogin(LoginRequest request){

        Optional<Utilisateur> user = utilisateurRepository.findById(request.getNcin());

        if (user.isEmpty() || !user.get().getMotDePasse().equals(request.getPassword())) {
            return new ApiResponse(false, "Invalid username or password");
        }

        return new ApiResponse(true, "Login successful");
    }


}
