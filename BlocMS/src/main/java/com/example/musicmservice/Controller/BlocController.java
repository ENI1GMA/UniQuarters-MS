package com.example.musicmservice.Controller;


import com.example.musicmservice.Entities.Bloc;
import com.example.musicmservice.Entities.Foyer;
import com.example.musicmservice.Response.ApiResponse;
import com.example.musicmservice.Service.IblocService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/blocs")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class BlocController {
    private final IblocService iBlocService;
    private RestTemplate template;

    @GetMapping("")
    public ResponseEntity<ApiResponse> getBlocs() {
        ApiResponse apiResponse = new ApiResponse();
        try {
            List<Bloc> blocs = iBlocService.retrieveBlocs();
            blocs.forEach(bloc -> {
                if (bloc.getFoyerId() == null) {
                    return;
                }
                String foyerUrl = "http://FOYER-SERVICE/foyers/" + bloc.getFoyerId();
                //String stringResponse = template.getForObject(foyerUrl, String.class);
                //System.out.println("stringResponse: " + stringResponse);
                ApiResponse apiResponseUni = template.getForObject(foyerUrl, ApiResponse.class);
                System.out.println("apiResponseUni: " + apiResponseUni.getData());
                HashMap<String, Object> data = (HashMap<String, Object>) apiResponseUni.getData().get("foyer");
                System.out.println("data: " + data);
                //Foyer foyer = (Foyer) data.get("foyer");
                Foyer foyer = Foyer.builder()
                        .id(((Integer) data.get("id")).longValue())
                        .nom((String) data.get("nom"))
                        //.capacite((Long) data.get("capacite"))
                        //.lng((Double) data.get("lng"))
                        //.lat((Double) data.get("lat"))
                        .build();
                System.out.println("foyer: " + foyer);
                bloc.setFoyer(foyer);
            });
            apiResponse.setResponse(HttpStatus.OK, "Blocs retrieved");
            apiResponse.addData("blocs", blocs);
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }

    @GetMapping("/data")
    public List<Bloc> loadData() {
        //retrieving data without api response to facilitate consumption via scheduler
        return iBlocService.retrieveBlocs();
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse> addBloc(@RequestBody Bloc bloc) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            System.out.println("BLOOOC TO BE ADDDE //// " + bloc);
            //Bloc addedBloc = iBlocService.addBloc(bloc);
            //throw new RuntimeException("Test exception");
            apiResponse.setResponse(HttpStatus.CREATED, "Bloc added");
            apiResponse.addData("bloc", iBlocService.addBloc(bloc));
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }

    @PutMapping("/{idBloc}")
    public ResponseEntity<ApiResponse> updateBloc(@RequestBody Bloc bloc, @PathVariable long idBloc) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Bloc foundBloc = iBlocService.retrieveBloc(idBloc);
            if (foundBloc == null) {
                throw new RuntimeException("Bloc not found");
            }
            bloc.setId(idBloc);
            Bloc updatedBloc = iBlocService.updateBloc(bloc);
            apiResponse.setResponse(HttpStatus.OK, "Bloc updated");
            apiResponse.addData("bloc", updatedBloc);
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }

    @GetMapping("/{idBloc}")
    public ResponseEntity<ApiResponse> retrieveBloc(@PathVariable long idBloc) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Bloc foundBloc = iBlocService.retrieveBloc(idBloc);
            if (foundBloc == null) {
                throw new RuntimeException("Bloc not found");
            }
            if (foundBloc.getFoyerId() == null) {
                apiResponse.setResponse(HttpStatus.OK, "Bloc retrieved");
                apiResponse.addData("bloc", foundBloc);
            }else{
                String foyerUrl = "http://FOYER-SERVICE/foyers/" + foundBloc.getFoyerId();
                ApiResponse apiResponseUni = template.getForObject(foyerUrl, ApiResponse.class);
                HashMap<String, Object> data = (HashMap<String, Object>) apiResponseUni.getData().get("foyer");
                Foyer foyer = Foyer.builder()
                        .id(((Integer) data.get("id")).longValue())
                        .nom((String) data.get("nom"))
                        //.capacite((Long) data.get("capacite"))
                        //.lng((Double) data.get("lng"))
                        //.lat((Double) data.get("lat"))
                        .build();
                foundBloc.setFoyer(foyer);

                apiResponse.setResponse(HttpStatus.OK, "Bloc retrieved");
                apiResponse.addData("bloc", foundBloc);}
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }


    @DeleteMapping("/{idBloc}")
    public ResponseEntity<ApiResponse> removeBloc(@PathVariable long idBloc) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Bloc foundBloc = iBlocService.retrieveBloc(idBloc);
            if (foundBloc == null) {
                throw new RuntimeException("Bloc not found");
            }
            iBlocService.removeBloc(idBloc);
            apiResponse.setResponse(HttpStatus.OK, "Bloc removed");
        } catch (Exception e) {
            apiResponse.setResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(apiResponse, apiResponse._getHttpStatus());
    }


}
