package com.GTI.ExericeGTI.controller;

import com.GTI.ExericeGTI.Service.*;
import com.GTI.ExericeGTI.dataTransferObjects.GetDemandeCreditDto;
import com.GTI.ExericeGTI.model.DemandeCredit;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class MainController {

    private CompteService compteService;
    private DemandeCreditService demandeCreditService;
    private FichierService fichierService;
    private GarantieService garantieService;
    private UtilisateurService utilisateurService;


}
