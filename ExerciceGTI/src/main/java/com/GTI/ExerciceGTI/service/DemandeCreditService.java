package com.GTI.ExerciceGTI.service;

import com.GTI.ExerciceGTI.IService.IDemandeCreditService;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditResponse;
import com.GTI.ExerciceGTI.dataTransferObjects.GarantieRequest;
import com.GTI.ExerciceGTI.dataTransferObjects.DemandeCreditRequest;
import com.GTI.ExerciceGTI.model.*;
import com.GTI.ExerciceGTI.repos.CompteRepository;
import com.GTI.ExerciceGTI.repos.DemandeCreditRepository;
import com.GTI.ExerciceGTI.repos.EcheanceRepository;
import com.GTI.ExerciceGTI.repos.UtilisateurRepository;
import com.zaxxer.hikari.HikariDataSource;
import lombok.AllArgsConstructor;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceResourceBundle;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@AllArgsConstructor
public class DemandeCreditService implements IDemandeCreditService {

    private final DemandeCreditRepository demandeCreditRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final EcheanceRepository echeanceRepository;
    private final CompteRepository compteRepository;
    private  GarantieService garantieService;



    @Autowired
    private HikariDataSource springDataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;



    public void callEcheanceProcedure(int montant, double taux, int nbEcheance, int unite, String dateDemande, int nDemande) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("FORMATION")
                .withProcedureName("EcheanceProcedure");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("p_montant", montant)
                .addValue("p_taux", taux)
                .addValue("p_nb_echeance", nbEcheance)
                .addValue("p_unite", unite)
                .addValue("p_date_demande", dateDemande)
                .addValue("p_n_demande", nDemande);

        simpleJdbcCall.execute(in);
    }

    public String downloadRapportPDF(Integer idDemande, Integer version) throws JRException {


        try {
            // Load the JasperReports template from the classpath
            String templatePath="C:\\Users\\BOUALLEGUE.Elyes\\Desktop\\Exercice\\App\\ExerciceGTI\\src\\main\\resources\\templates\\echeanceReport.jrxml";
            JasperReport jasperReport = JasperCompileManager.compileReport(templatePath);


            String language = (version == 1) ? "fr" : "en";
            Locale locale = new Locale(language);

            Optional<DemandeCredit> demandeCredit = demandeCreditRepository.findById(idDemande);
            String fileName="Crédit-"+demandeCredit.get().getUtilisateur().getNom()+"-"+language+".pdf";


            // Create a JasperPrint object by filling the report with data
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("numDemande", idDemande);
            parameters.put(JRParameter.REPORT_LOCALE,locale);
            ResourceBundle bundle = ResourceBundle.getBundle("infos",locale);
            parameters.put("REPORT_RESOURCE_BUNDLE",bundle);


            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, springDataSource.getConnection());

            // Export the JasperPrint to a PDF file
            String filePath = "C:/Users/BOUALLEGUE.Elyes/Desktop/rapports/"+fileName;
            JasperExportManager.exportReportToPdfFile(jasperPrint, filePath);
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            // Handle exceptions if needed
            return "";
        }
    }


    public DemandeCreditResponse getDemandeCredit(Integer id) {
        Optional<DemandeCredit> demandeCredit = demandeCreditRepository.findById(id);

            DemandeCreditResponse demandeCreditResponse = DemandeCreditResponse.builder()
                    .numDemande(demandeCredit.get().getNDemande())
                    .idDemande(demandeCredit.get().getIdDemande())
                    .Etat(demandeCredit.get().getEtat())
                    .DateDemande(demandeCredit.get().getDateDemande())
                    .idcompte(demandeCredit.get().getNcompte())
                    .typeCredit(demandeCredit.get().getType())
                    .montant(demandeCredit.get().getMontant())
                    .unite(demandeCredit.get().getUnite())
                    .nbrEchance(demandeCredit.get().getNbreEcheance())
                    .idUser(demandeCredit.get().getUtilisateur().getNcin())
                    .observation(demandeCredit.get().getObservation())
                    .garantieRequests(demandeCredit.get().getGaranties())
                    .build();

        return demandeCreditResponse;
    }

    public DemandeCredit AjouterDemandeCredit(DemandeCreditRequest request){

        Optional<Utilisateur> utilisateur = Optional.ofNullable(utilisateurRepository.findByNcin(request.getNcin()));

        DemandeCredit demandeCredit = DemandeCredit.builder()
                .idDemande((int) (Math.random() * (Math.pow(10, 6 - 1) * 9) + Math.pow(10, 6 - 1)))
                .etat(0)
                .dateDemande(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .observation(request.getObservation())
                .type(request.getType())
                .montant(request.getMontant())
                .unite(request.getUnite())
                .nbreEcheance(request.getNbreEcheance())
                .ncompte(request.getNcompte())
                .utilisateur(utilisateur.get())
                .taux(request.getTaux())
                .build();

        demandeCredit = demandeCreditRepository.save(demandeCredit);


        for(GarantieRequest garantieRequest:request.getGarantieRequests()){
            garantieService.addGarantie(garantieRequest,demandeCredit);
        }

        this.callEcheanceProcedure(
                demandeCredit.getMontant(),
                demandeCredit.getTaux(),
                demandeCredit.getNbreEcheance(),
                demandeCredit.getUnite(),
                demandeCredit.getDateDemande(),
                demandeCredit.getNDemande()
        );

        return demandeCredit;
    }


    public List<DemandeCreditResponse> getDemandesCredits() {
        List<DemandeCredit> demandeCredits = demandeCreditRepository.findAll();
        List<DemandeCreditResponse> demandeCreditResponses = new ArrayList<>();

        demandeCredits.stream().forEach(demandeCredit -> {
            DemandeCreditResponse demandeCreditResponse = DemandeCreditResponse.builder()
                    .numDemande(demandeCredit.getNDemande())
                    .idDemande(demandeCredit.getIdDemande())
                    .nomClient(demandeCredit.getUtilisateur().getNom()+" "+demandeCredit.getUtilisateur().getPrenom())
                    .typeCredit(demandeCredit.getType())
                    .Etat(demandeCredit.getEtat())
                    .DateDemande(demandeCredit.getDateDemande())
                    .build();

            demandeCreditResponses.add(demandeCreditResponse);

        });

        return demandeCreditResponses;
    }

    public void updateDemandeCreditEtat(Integer id, Integer etat) {
        Optional<DemandeCredit> optDemandeCredit = demandeCreditRepository.findById(id);
        DemandeCredit demandeCredit = optDemandeCredit.get();
        demandeCredit.setEtat(etat);
        demandeCreditRepository.save(demandeCredit);
    }
}
