package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.dataTransferObjects.CompteResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.FichierRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.FichierResponse;
import com.GTI.ExerciceGTI.model.Compte;
import com.GTI.ExerciceGTI.model.DemandeCredit;
import com.GTI.ExerciceGTI.model.Fichier;
import com.GTI.ExerciceGTI.model.Utilisateur;
import com.GTI.ExerciceGTI.repos.DemandeCreditRepository;
import com.GTI.ExerciceGTI.repos.FichierRepository;
import com.GTI.ExerciceGTI.repos.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FichierService {

    private final FichierRepository fichierRepository;
    private final UtilisateurRepository utilisateurRepository;


   // private final String path_fichier="/Users/BOUALLEGUE.Elyes/Desktop/Files/";
   private final String path_fichier="/Users/Elyes/OneDrive/Desktop/Files/";


    public String uploadFile(MultipartFile file,Integer nCin,Integer nature) throws IOException {
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(path_fichier, fileName);

        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(nCin);

        Fichier fileData = fichierRepository.save(Fichier.builder()
                .nomFichier(fileName)
                .type(file.getContentType())
                .filePath(filePath.toString())  // Save the full path as a string
                .utilisateur(utilisateur.get())
                .nature(nature)
                .build());

        // Use Files.copy to save the uploaded file
        Files.copy(file.getInputStream(), filePath);

        if (fileData != null) {
            return "File uploaded successfully: " + filePath;
        }
        return null;
    }

    public byte[] downloadFile(String fileName) throws IOException {
        Optional<Fichier> fileData = fichierRepository.findByNomFichier(fileName);
        String filePath=fileData.get().getFilePath();
        byte[] files = Files.readAllBytes(new File(filePath).toPath());
        return files;
    }

    // Helper method to extract file extension from the file name
    public String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex + 1);
        }
        return "";
    }

    // Helper method to get MediaType based on file extension
    public MediaType getMediaTypeForExtension(String extension) {
        switch (extension.toLowerCase()) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG;
            case "png":
                return MediaType.IMAGE_PNG;
            case "pdf":
                return MediaType.APPLICATION_PDF;
            // Add more cases for other file types as needed
            default:
                return MediaType.APPLICATION_OCTET_STREAM; // Default to binary stream
        }
    }


    public List<FichierResponse> getFichiers(Integer id) {
        List<Fichier> fichiers = fichierRepository.findFichierByUserId(id);
        List<FichierResponse> fichierResponses = new ArrayList<>();
        for(Fichier fichier : fichiers){
            FichierResponse fichierResponse = FichierResponse.builder()
                    .fileName(fichier.getNomFichier())
                    .url(fichier.getFilePath())
                    .type(fichier.getType())
                    .nature(fichier.getNature())
                    .idUser(fichier.getUtilisateur().getNCin())
                    .build();

            fichierResponses.add(fichierResponse);
        }

        return fichierResponses;

    }



}
