package com.GTI.ExerciceGTI.IService;

import com.GTI.ExerciceGTI.dataTransferObjects.FichierResponse;
import com.GTI.ExerciceGTI.model.Fichier;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IFichierService {

    String uploadFile(MultipartFile file, Integer nCin, Integer nature) throws IOException;
    byte[] downloadFile(Fichier fichier) throws IOException;
    MediaType getMediaTypeForExtension(String extension);
    List<FichierResponse> getFichiers(Integer id);
}
