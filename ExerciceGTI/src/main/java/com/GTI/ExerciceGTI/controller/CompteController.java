package com.GTI.ExerciceGTI.controller;

import com.GTI.ExerciceGTI.dataTransferObjects.CompteRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.CompteResponse;
import com.GTI.ExerciceGTI.service.CompteService;
import com.GTI.ExerciceGTI.service.DemandeCreditService;
import com.GTI.ExerciceGTI.service.FichierService;
import com.GTI.ExerciceGTI.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class CompteController {

    private final CompteService compteService;

    @PostMapping("/compte")
    public ResponseEntity<com.GTI.ExericeGTI.util.ApiResponse> getCompte(@RequestBody CompteRequest request){
        compteService.addCompte(request);

        return new ResponseEntity<com.GTI.ExericeGTI.util.ApiResponse>(
                new com.GTI.ExericeGTI.util.ApiResponse(true,"Compte has been added succesfully"), HttpStatus.CREATED);
    }


    @GetMapping("/compte")
    public ResponseEntity<List<CompteResponse>> getAllCompte(){
        List<CompteResponse> body = compteService.getAllComptes();
        return new ResponseEntity<List<CompteResponse>>(body, HttpStatus.OK);
    }

    @GetMapping("/compte/{id}")
    public ResponseEntity<CompteResponse>  getCompte(@PathVariable("id") Integer id){
        CompteResponse body = compteService.getCompteById(id);
        return new ResponseEntity<CompteResponse>(body,HttpStatus.OK);
    }


}
