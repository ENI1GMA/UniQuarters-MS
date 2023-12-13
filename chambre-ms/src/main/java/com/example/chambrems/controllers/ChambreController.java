package com.example.chambrems.controllers;

import com.example.chambrems.entities.Bloc;
import com.example.chambrems.entities.Chambre;
import com.example.chambrems.repositories.ChambreRepo;
import com.example.chambrems.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/chambres")
@AllArgsConstructor
public class ChambreController {
    private final ChambreRepo chambreRepo;
    private RestTemplate template;

    @GetMapping("")
    public ResponseEntity<ApiResponse> getAllChambres() {
        ApiResponse apiResponse = new ApiResponse();
        try {
            List<Chambre> chambres = chambreRepo.findAll();
            chambres.forEach(ch -> {
                if (ch.getIdBloc() == null) {
                    return;
                }
                String blocUrl = "http://BLOC-SERVICE/blocs/" + ch.getIdBloc();
                String stringResponse = template.getForObject(blocUrl, String.class);

                ApiResponse apiResponseUni = template.getForObject(blocUrl, ApiResponse.class);

                HashMap<String, Object> data = (HashMap<String, Object>) apiResponseUni.getData().get("bloc");
                System.out.println("data: " + data);
                Bloc bloc = Bloc.builder()
                        .id(((Integer) data.get("id")).longValue())
                        .nom((String) data.get("nom"))
                        .capacite((String) data.get("capacite")).
                        foyerId(((Integer) data.get("foyerId")).longValue())
                        .build();
                System.out.println("Bloc: " + bloc);
                ch.setBloc(bloc);

            });
            apiResponse.setResponse(HttpStatus.OK, "Chambres retrieved successfully.");
            apiResponse.addData("chambres", chambres);
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }

    @GetMapping("/{idChambre}")
    public ResponseEntity<ApiResponse> getChambre(@PathVariable long idChambre) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Chambre foundChambre = chambreRepo.findById(idChambre).orElse(null);
            if (foundChambre == null) {
                apiResponse.setResponse(HttpStatus.NOT_FOUND, "Chambre not found.");
            } else {
                if (foundChambre.getIdBloc() != null) {
                    String blocUrl = "http://BLOC-SERVICE/blocs/" + foundChambre.getIdBloc();
                    ApiResponse apiResponseUni = template.getForObject(blocUrl, ApiResponse.class);
                    HashMap<String, Object> data = (HashMap<String, Object>) apiResponseUni.getData().get("bloc");
                    Bloc bloc = Bloc.builder()
                            .id(((Integer) data.get("id")).longValue())
                            .nom((String) data.get("nom"))
                            .capacite((String) data.get("capacite")).
                            foyerId(((Integer) data.get("foyerId")).longValue())
                            .build();
                    foundChambre.setBloc(bloc);
                }
                apiResponse.setResponse(HttpStatus.OK, "Chambre retrieved successfully.");
                apiResponse.addData("chambre", foundChambre);
            }
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse> addChambre(@RequestBody Chambre chambre) {
        ApiResponse apiResponse = new ApiResponse();
        try {

            apiResponse.setResponse(org.springframework.http.HttpStatus.CREATED, "Chambre added");

            apiResponse.addData("chambre", chambreRepo.save(chambre));
        } catch (Exception e) {
            apiResponse.setResponse(org.springframework.http.HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());


    }

    @PutMapping("/{idChambre}")
    public ResponseEntity<ApiResponse> updateChambre(@RequestBody Chambre chambre, @PathVariable long idChambre) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Chambre ch = chambreRepo.findById(idChambre).orElse(null);

            if (ch == null) {
                apiResponse.setResponse(org.springframework.http.HttpStatus.NOT_FOUND, "Chambre not found");
                return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
            }

            ch.setType(chambre.getType());
            ch.setNumero(chambre.getNumero());
            ch.setDescription(chambre.getDescription());
            ch.setCapacity(chambre.getCapacity());
            ch.setIdBloc(chambre.getIdBloc());

           /* Long idBloc = chambre.getIdBloc();
            if (idBloc != null) {
                String blocUrl = "http://BLOC-SERVICE/blocs/" + idBloc;
                ApiResponse apiResponseUni = template.getForObject(blocUrl, ApiResponse.class);
                HashMap<String, Object> data = (HashMap<String, Object>) apiResponseUni.getData().get("bloc");

                Bloc bloc = new Bloc(
                        ((Integer) data.get("id")).longValue(),
                        (String) data.get("nom"),
                        (String) data.get("adresse"),
                        (String) data.get("image")
                );

                ch.setBloc(bloc);
                ch.setIdBloc(chambre.getIdBloc());
            }*/

            Chambre updatedCh = chambreRepo.save(ch);

            apiResponse.setResponse(org.springframework.http.HttpStatus.CREATED, "Chambre updated");
            apiResponse.addData("chambre", updatedCh);
        } catch (Exception e) {
            apiResponse.setResponse(org.springframework.http.HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }


    @DeleteMapping("/{idChambre}")
    ApiResponse deleteChambre(@PathVariable long idChambre) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            chambreRepo.deleteById(idChambre);
            apiResponse.setResponse(HttpStatus.OK, "Chambre deleted successfully.");
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return apiResponse;
    }


}
