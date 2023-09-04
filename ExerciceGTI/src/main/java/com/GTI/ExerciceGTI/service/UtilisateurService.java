package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.IService.IUtilisateurService;
import com.GTI.ExerciceGTI.dataTransferObjects.CompteResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.LoginRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurResponse;
import com.GTI.ExerciceGTI.model.Compte;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.UtilisateurRepository;
import com.GTI.ExerciceGTI.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UtilisateurService implements IUtilisateurService {
    private final UtilisateurRepository utilisateurRepository;
    public void SignUp(UtilisateurRequest request){

        Utilisateur utilisateur = Utilisateur.builder()
                .ncin(Integer.parseInt(request.getNcin()))
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

        Optional<Utilisateur> user = Optional.ofNullable(utilisateurRepository.findByNcin(request.getNcin()));

        if (user.isEmpty() || !user.get().getMotDePasse().equals(request.getPassword())) {
            return new ApiResponse(false, "Invalid username or password");
        }

        return new ApiResponse(true, "Login successful");
    }


    public UtilisateurResponse getUserById(Integer id) {
        Optional<Utilisateur> utilisateur = Optional.ofNullable(utilisateurRepository.findByNcin(id));

        UtilisateurResponse utilisateurResponse = UtilisateurResponse.builder()
                .ncin(utilisateur.get().getNcin())
                .nom(utilisateur.get().getNom())
                .prenom(utilisateur.get().getPrenom())
                .role(utilisateur.get().getRole())
                .situationF(utilisateur.get().getSituationF())
                .dateNaissance(utilisateur.get().getDateNaissance())
                .build();

        return utilisateurResponse;
    }
}
