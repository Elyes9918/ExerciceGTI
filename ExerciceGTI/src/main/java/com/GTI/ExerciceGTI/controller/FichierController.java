package com.GTI.ExerciceGTI.controller;

import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.FichierRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.FichierResponse;
import com.GTI.ExerciceGTI.model.Fichier;
import com.GTI.ExerciceGTI.repos.FichierRepository;
import com.GTI.ExerciceGTI.service.CompteService;
import com.GTI.ExerciceGTI.service.DemandeCreditService;
import com.GTI.ExerciceGTI.service.FichierService;
import com.GTI.ExerciceGTI.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class FichierController {


    private final FichierService fichierService;
    private final FichierRepository fichierRepository;

    @PostMapping("/fichier")
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("file") MultipartFile file,
                                                     @RequestParam("idUser") String idUser,
                                                     @RequestParam("nature") String nature) throws IOException {

        // Check file size
        if (file.getSize() > 4 * 1024 * 1024) { // 4MB
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("File size exceeds 4MB");
        }

        String uploadedfile = fichierService.uploadFile(file,Integer.parseInt(idUser),Integer.parseInt(nature));
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadedfile);
    }

    @GetMapping("/fichiers/{id}")
    public ResponseEntity<List<FichierResponse>> getFichiers(@PathVariable("id") Integer id){
        List<FichierResponse> body = fichierService.getFichiers(id);
        return new ResponseEntity<List<FichierResponse>>(body,HttpStatus.OK);
    }

    @GetMapping("/fichier/{uuid}")
    public ResponseEntity<byte[]> downloadFileFromFileSystem(@PathVariable String uuid) throws IOException {
        Optional<Fichier> fichier = Optional.ofNullable(fichierRepository.findByUuid(uuid));
        byte[] fileData = fichierService.downloadFile(fichier.get());
        MediaType mediaType = fichierService.getMediaTypeForExtension(fichier.get().getExtension());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentDispositionFormData("attachment", fichier.get().getNomFichier()); // Set original filename

        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .contentType(mediaType)
                .body(fileData);
    }

}
