package com.enigma.controller;

import com.enigma.entities.Universite;
import com.enigma.repositories.UniversiteRepo;
import com.enigma.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3081", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE})
@RestController
@RequestMapping("/universities")
@AllArgsConstructor
public class UniversiteController {

    UniversiteRepo universiteRepo;
    @GetMapping("")
    public ResponseEntity<ApiResponse> getUniversities() {
        ApiResponse apiResponse = new ApiResponse();
        try {
            apiResponse.setResponse(org.springframework.http.HttpStatus.OK, "Universities retrieved");
            List<Universite> universities = universiteRepo.findAll();
            System.out.println("unis: " + universities);
            apiResponse.addData("universities", universities);
        } catch (Exception e) {
            apiResponse.setResponse(org.springframework.http.HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }

    @GetMapping("/{idUniversity}")
    public ResponseEntity<ApiResponse> getUniversity(@PathVariable long idUniversity) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            apiResponse.setResponse(org.springframework.http.HttpStatus.OK, "University retrieved");
            Universite university = universiteRepo.findById(idUniversity).orElse(null);
            System.out.println("uni: " + university);
            apiResponse.addData("university", university);
        } catch (Exception e) {
            apiResponse.setResponse(org.springframework.http.HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }
    @PostMapping("")
    public ResponseEntity<ApiResponse>  addUni(@RequestBody Universite uni) {
        System.out.println("Received POST request for adding university: " + uni);

        ApiResponse apiResponse = new ApiResponse();
        try {

            apiResponse.setResponse(org.springframework.http.HttpStatus.CREATED, "University added");

            apiResponse.addData("universite", universiteRepo.save(uni));
        } catch (Exception e) {
            apiResponse.setResponse(org.springframework.http.HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());


    }
    @PostMapping("/testpost")
    public ResponseEntity<String> testPost() {
        return ResponseEntity.ok("Test POST request successful");
    }
    @PutMapping("/{idUni}")
    public ResponseEntity<ApiResponse> updateFoyer(@RequestBody Universite uni, @PathVariable long idUni) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Universite u = universiteRepo.findById(idUni).orElse(null);

            if (u == null) {
                apiResponse.setResponse(org.springframework.http.HttpStatus.NOT_FOUND, "University not found");
                return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
            }

            u.setNom(uni.getNom());
            u.setAdresse(uni.getAdresse());
            u.setImage(uni.getImage());
            Universite updatedUni = universiteRepo.save(u);

            apiResponse.setResponse(org.springframework.http.HttpStatus.CREATED, "University updated");
            apiResponse.addData("university", updatedUni);
        } catch (Exception e) {
            apiResponse.setResponse(org.springframework.http.HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }


    @DeleteMapping  ("/{idUni}")
    public void delete(@PathVariable long idUni) {
        universiteRepo.deleteById(idUni);
    }


}


