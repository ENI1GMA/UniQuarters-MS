package com.enigma.controller;

import com.enigma.entities.Universite;
import com.enigma.repositories.UniversiteRepo;
import com.enigma.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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

}


