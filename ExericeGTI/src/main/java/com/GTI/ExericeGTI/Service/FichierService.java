package com.GTI.ExericeGTI.service;

import com.GTI.ExericeGTI.model.DemandeCredit;
import com.GTI.ExericeGTI.model.Fichier;
import com.GTI.ExericeGTI.model.Utilisateur;
import com.GTI.ExericeGTI.repos.DemandeCreditRepository;
import com.GTI.ExericeGTI.repos.FichierRepository;
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
import java.util.Optional;

@Service
@AllArgsConstructor
public class FichierService {

    private final FichierRepository fichierRepository;
    private final DemandeCreditRepository demandeCreditRepository;


    private final String path_fichier="/Users/BOUALLEGUE.Elyes/Desktop/Files/";

    public String uploadFile(MultipartFile file,Integer demandeCreditId) throws IOException {
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(path_fichier, fileName);

        Optional<DemandeCredit> demandeCredit = demandeCreditRepository.findById(demandeCreditId);

        Fichier fileData = fichierRepository.save(Fichier.builder()
                .nomFichier(fileName)
                .type(file.getContentType())
                .filePath(filePath.toString())  // Save the full path as a string
                .demandeCredit(demandeCredit.get())
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





}
