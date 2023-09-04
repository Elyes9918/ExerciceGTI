package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.IService.IFichierService;
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
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@AllArgsConstructor
public class FichierService implements IFichierService {

    private final FichierRepository fichierRepository;
    private final UtilisateurRepository utilisateurRepository;


   private final String path_fichier="/Users/BOUALLEGUE.Elyes/Desktop/Files/";
   //private final String path_fichier="/Users/Elyes/OneDrive/Desktop/Files/";


    public String uploadFile(MultipartFile file, Integer nCin, Integer nature) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileExtension = FilenameUtils.getExtension(fileName); // Using FilenameUtils from Apache Commons IO
        Optional<Utilisateur> utilisateur = Optional.ofNullable(utilisateurRepository.findByNcin(nCin));

        if (utilisateur.isPresent()) {

           utilisateur.get().getFichiers().forEach(fichier -> {
               if(Objects.equals(fichier.getNature(), nature)){
                   Fichier temp;
                   temp=fichier;
                   fichierRepository.deleteById(temp.getId());
               }
           });


            // Generate a unique ID for the file
            String fileId = UUID.randomUUID().toString();;

            // Construct the new file name as idFile.extension
            String newFileName = fileId + "." + fileExtension;

            Path filePath = Paths.get(path_fichier, newFileName);

            Fichier fileData = fichierRepository.save(Fichier.builder()
                    .nomFichier(fileName)
                    .type(file.getContentType())
                    .filePath(filePath.toString()) // Save the full path as a string
                    .utilisateur(utilisateur.get())
                    .nature(nature)
                    .extension(fileExtension)
                    .uuid(fileId)
                    .build());



            // Use Files.copy to save the uploaded file
            Files.copy(file.getInputStream(), filePath);

            if (fileData != null) {
                return "File uploaded successfully: " + filePath;
            }
        }
        return null;
    }




    public byte[] downloadFile(Fichier fichier) throws IOException {
        String filePath=fichier.getFilePath();
        byte[] files = Files.readAllBytes(new File(filePath).toPath());
        return files;
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

        fichiers.forEach(fichier ->  {
            FichierResponse fichierResponse = FichierResponse.builder()
                    .fileName(fichier.getNomFichier())
                    .url(fichier.getFilePath())
                    .type(fichier.getType())
                    .nature(fichier.getNature())
                    .idUser(fichier.getUtilisateur().getNcin())
                    .uuid(fichier.getUuid())
                    .extension(fichier.getExtension())
                    .build();

            fichierResponses.add(fichierResponse);
        });

        return fichierResponses;

    }



}
