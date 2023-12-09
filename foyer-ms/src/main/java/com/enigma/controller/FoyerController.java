package com.enigma.controller;

import com.enigma.entities.Foyer;
import com.enigma.entities.Universite;
import com.enigma.repositories.FoyerRepo;
import com.enigma.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    @PostMapping("")
    public Foyer addFoyer(@RequestBody Foyer foyer) {
        return foyerRepo.save(foyer);
    }
    @PutMapping ("/{idFoyer}")
    public Foyer updateFoyer(@RequestBody Foyer foyer,@PathVariable long idFoyer) {
        Foyer f = foyerRepo.findById(idFoyer).orElse(null);
        f.setNom(foyer.getNom());
        f.setCapacite(foyer.getCapacite());
        f.setLng(foyer.getLng());
        f.setLat(foyer.getLat());
        f.setIdUniversite(foyer.getIdUniversite());
        String universiteUrl = "http://UNIVERSITE-SERVICE/universities/" + foyer.getIdUniversite();

        ApiResponse apiResponseUni = template.getForObject(universiteUrl, ApiResponse.class);
        HashMap<String, Object> data = (HashMap<String, Object>) apiResponseUni.getData().get("university");

        Universite universite = new Universite(
                ((Integer) data.get("id")).longValue(),
                (String) data.get("nom"),
                (String) data.get("adresse"),
                (String) data.get("image")
        );
        f.setUniversite(universite);
        return foyerRepo.save(f);
    }
   
    @DeleteMapping  ("/{idFoyer}")
    public void affecterFoyer(@PathVariable long idFoyer) {
         foyerRepo.deleteById(idFoyer);
    }


}
