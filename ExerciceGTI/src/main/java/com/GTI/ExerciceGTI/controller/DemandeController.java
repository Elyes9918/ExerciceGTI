package com.GTI.ExerciceGTI.controller;


import com.GTI.ExerciceGTI.dataTransferObjects.CompteResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.model.DemandeCredit;
import com.GTI.ExerciceGTI.service.DemandeCreditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.GTI.ExerciceGTI.util.ApiResponse;


import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class DemandeController {

    private final DemandeCreditService demandeCreditService;


    @GetMapping("/demandeCredit")
    public ResponseEntity<List<DemandeCreditResponse>> getDemandeCredits(){
        List<DemandeCreditResponse> body = demandeCreditService.getDemandesCredits();
        return new ResponseEntity<List<DemandeCreditResponse>>(body, HttpStatus.OK);
    }

    @PostMapping("/demandeCredit")
    public ResponseEntity<ApiResponse> AjouterDemandeCredit(@RequestBody DemandeCreditRequest request){
        demandeCreditService.AjouterDemandeCredit(request);
        return new ResponseEntity<ApiResponse>(
                new ApiResponse(true,"Demande credit has been added succesfully"), HttpStatus.CREATED);
    }
    
    @PutMapping("/demandeCredit/{id}")
    public ResponseEntity<ApiResponse> updateDemandeCredit(@PathVariable("id") Integer id,@RequestBody DemandeCreditResponse
            demandeCreditResponse){
        demandeCreditService.updateDemandeCreditEtat(id,demandeCreditResponse.getEtat());
        return new ResponseEntity<ApiResponse>(new ApiResponse(true,"product Updated"),HttpStatus.OK);
    }

    @GetMapping("/demandeCredit/{id}")
    public ResponseEntity<DemandeCreditResponse>  getCompte(@PathVariable("id") Integer id){
        DemandeCreditResponse body = demandeCreditService.getDemandeCredit(id);
        return new ResponseEntity<DemandeCreditResponse>(body,HttpStatus.OK);
    }




}
