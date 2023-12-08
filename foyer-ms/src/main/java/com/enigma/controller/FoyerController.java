package com.enigma.controller;

import com.enigma.entities.Foyer;
import com.enigma.entities.Universite;
import com.enigma.repositories.FoyerRepo;
import com.enigma.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/foyers")
@AllArgsConstructor
public class FoyerController {
    private final FoyerRepo foyerRepo;
    private RestTemplate template;
    @GetMapping("")
    public ResponseEntity<ApiResponse> getAllFoyers() {
        ApiResponse apiResponse = new ApiResponse();
        try {
            List<Foyer> foyers = foyerRepo.findAll();
            foyers.forEach(foyer -> {
                if (foyer.getIdUniversite() == null) {
                    return;
                }
                String universiteUrl = "http://UNIVERSITE-SERVICE/universities/" + foyer.getIdUniversite();
                String stringResponse = template.getForObject(universiteUrl, String.class);
                System.out.println("stringResponse: " + stringResponse);
                ApiResponse apiResponseUni = template.getForObject(universiteUrl, ApiResponse.class);
                System.out.println("apiResponseUni: " + apiResponseUni.getData());
                HashMap<String, Object> data = (HashMap<String, Object>) apiResponseUni.getData().get("university");
                System.out.println("data: " + data);
                Universite universite = new Universite(
                        ((Integer) data.get("id")).longValue(),
                        (String) data.get("nom"),
                        (String) data.get("adresse"),
                        (String) data.get("image")
                );
                System.out.println("universite: " + universite);
                foyer.setUniversite(universite);
            });
            apiResponse.setResponse(HttpStatus.OK, "Foyers retrieved successfully.");
            apiResponse.addData("foyers", foyers);
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }
    @GetMapping("/{idFoyer}")
    public ResponseEntity<ApiResponse> getFoyer(@PathVariable long idFoyer) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Foyer foundFoyer = foyerRepo.findById(idFoyer).orElse(null);
            if (foundFoyer == null) {
                apiResponse.setResponse(HttpStatus.NOT_FOUND, "Foyer not found.");
            } else {
                apiResponse.setResponse(HttpStatus.OK, "Foyer retrieved successfully.");
                apiResponse.addData("foyer", foundFoyer);
            }
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }
}
