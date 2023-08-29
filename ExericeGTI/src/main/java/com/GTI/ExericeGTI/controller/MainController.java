package com.GTI.ExericeGTI.controller;


import com.GTI.ExericeGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExericeGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExericeGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExericeGTI.service.CompteService;
import com.GTI.ExericeGTI.service.DemandeCreditService;
import com.GTI.ExericeGTI.service.FichierService;
import com.GTI.ExericeGTI.service.UtilisateurService;
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


    @PostMapping("/demandeCredit")
    public ResponseEntity<ApiResponse> AjouterDemandeCredit(@RequestBody DemandeCreditRequest request){
        demandeCreditService.AjouterDemandeCredit(request);
        return new ResponseEntity<ApiResponse>(
                new ApiResponse(true,"Demande credit has been added succesfully"), HttpStatus.CREATED);
    }


    @PostMapping("/fichier")
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("file") MultipartFile file) throws IOException {
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
