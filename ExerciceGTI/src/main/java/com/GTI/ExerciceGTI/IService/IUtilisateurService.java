package com.GTI.ExerciceGTI.IService;

import com.GTI.ExerciceGTI.dataTransferObjects.LoginRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.UtilisateurResponse;
import com.GTI.ExerciceGTI.util.ApiResponse;

public interface IUtilisateurService {

    void SignUp(UtilisateurRequest request);
    ApiResponse validateLogin(LoginRequest request);
    UtilisateurResponse getUserById(Integer id);

}
