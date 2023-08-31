package com.GTI.ExerciceGTI.controller;


import com.GTI.ExerciceGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExerciceGTI.service.CompteService;
import com.GTI.ExerciceGTI.service.DemandeCreditService;
import com.GTI.ExerciceGTI.service.FichierService;
import com.GTI.ExerciceGTI.service.UtilisateurService;
import com.GTI.ExericeGTI.util.ApiResponse;
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
public class MainController {

    private final UtilisateurService utilisateurService;
    private final CompteService compteService;
    private final FichierService fichierService;
    private final DemandeCreditService demandeCreditService;

    @PostMapping("/user")
    public ResponseEntity<ApiResponse> addUser(@RequestBody UtilisateurRequest request){
        utilisateurService.SignUp(request);

        return new ResponseEntity<ApiResponse>(
                new ApiResponse(true,"User has been added succesfully"), HttpStatus.CREATED);
    }

    @PostMapping("/compte")
    public ResponseEntity<ApiResponse> addCompte(@RequestBody CompteRequest request){
        compteService.addCompte(request);

        return new ResponseEntity<ApiResponse>(
                new ApiResponse(true,"Compte has been added succesfully"), HttpStatus.CREATED);
    }





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
