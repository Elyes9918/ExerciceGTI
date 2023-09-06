package com.GTI.ExerciceGTI.controller;


import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.service.DemandeCreditService;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.GTI.ExerciceGTI.util.ApiResponse;
import org.springframework.core.io.InputStreamResource;




import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class DemandeController {

    private final DemandeCreditService demandeCreditService;

    @GetMapping("/demandeCredit/rapport/{idDemande}/{version}")
    public ResponseEntity<InputStreamResource> getRapportPDF(@PathVariable("idDemande") Integer idDemande,
                                                             @PathVariable("version") Integer version) throws JRException {

        try {
            demandeCreditService.downloadRapportPDF(idDemande,version);

            // Define the PDF file path
            String filePath = "C:/Users/BOUALLEGUE.Elyes/Desktop/rapports/rapport.pdf";

            // Prepare the response with the PDF file for download
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "rapport.pdf");

            FileInputStream fileInputStream = new FileInputStream(filePath);
            InputStreamResource inputStreamResource = new InputStreamResource(fileInputStream);

            return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.OK);
        } catch (IOException | JRException e) {
            e.printStackTrace();
            // Handle exceptions if needed
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



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
