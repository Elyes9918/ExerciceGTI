package com.GTI.ExerciceGTI.controller;

import com.GTI.ExerciceGTI.service.CompteService;
import com.GTI.ExerciceGTI.service.DemandeCreditService;
import com.GTI.ExerciceGTI.service.FichierService;
import com.GTI.ExerciceGTI.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class FichierController {


    private final FichierService fichierService;

    @PostMapping("/fichier")
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("file") MultipartFile file) throws IOException {

        // Check file size
        if (file.getSize() > 4 * 1024 * 1024) { // 4MB
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("File size exceeds 4MB");
        }

        // Check file type
        if (!file.getContentType().equals(MediaType.APPLICATION_PDF_VALUE)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Only PDF files are allowed");
        }

        String uploadedfile = fichierService.uploadFile(file,1);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadedfile);
    }


    @GetMapping("/fichier/{fileName}")
    public ResponseEntity<byte[]> downloadFileFromFileSystem(@PathVariable String fileName) throws IOException {
        byte[] fileData = fichierService.downloadFile(fileName);

        // Determine the file's content type based on its extension
        String extension = fichierService.getFileExtension(fileName);
        MediaType mediaType = fichierService.getMediaTypeForExtension(extension);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(mediaType)
                .body(fileData);
    }

}
