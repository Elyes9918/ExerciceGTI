package com.GTI.ExericeGTI.controller;

import com.GTI.ExericeGTI.dataTransferObjects.LoginRequest;
import com.GTI.ExericeGTI.model.Utilisateur;
import com.GTI.ExericeGTI.service.UtilisateurService;
import com.GTI.ExericeGTI.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UtilisateurService utilisateurService;


    @PostMapping("/validateLogin")
    public ResponseEntity<ApiResponse> validateLogin(@RequestBody LoginRequest loginRequest) {
        ApiResponse response = utilisateurService.validateLogin(loginRequest);

        return new ResponseEntity<>(response, response.isSuccess() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);

    }



}
