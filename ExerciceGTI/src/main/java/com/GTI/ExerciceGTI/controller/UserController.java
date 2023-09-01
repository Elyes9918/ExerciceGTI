package com.GTI.ExerciceGTI.controller;

import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurResponse;
import com.GTI.ExerciceGTI.service.CompteService;
import com.GTI.ExerciceGTI.service.DemandeCreditService;
import com.GTI.ExerciceGTI.service.FichierService;
import com.GTI.ExerciceGTI.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {

    private final UtilisateurService utilisateurService;


    @PostMapping("/user")
    public ResponseEntity<com.GTI.ExericeGTI.util.ApiResponse> addUser(@RequestBody UtilisateurRequest request){
        utilisateurService.SignUp(request);

        return new ResponseEntity<com.GTI.ExericeGTI.util.ApiResponse>(
                new com.GTI.ExericeGTI.util.ApiResponse(true,"User has been added succesfully"), HttpStatus.CREATED);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UtilisateurResponse>  getUser(@PathVariable("id") Integer id){
        UtilisateurResponse body = utilisateurService.getUserById(id);
        return new ResponseEntity<UtilisateurResponse>(body,HttpStatus.OK);
    }
}
