package tn.enigma.reclamationms.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.enigma.reclamationms.models.Reclamation;
import tn.enigma.reclamationms.services.ReclamationService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
@RequestMapping("reclamation")
public class ReclamationController {
    private final ReclamationService service;

    @GetMapping("")
    public List<Reclamation> getReclamation(){
        return service.getReclamations();
    }

    @GetMapping("/{id}")
    public Reclamation getReclamatio(@PathVariable Long id){
        return service.getReclamation(id);
    }

    @PostMapping("")
    public Reclamation addReclamation(@RequestBody Reclamation r){
        return service.addReclamation(r);
    }

    @PutMapping("")
    public Reclamation updateReclamation(@RequestBody Reclamation r){
        return service.updateReclamation(r);
    }

    @DeleteMapping("/{id}")
    public void deleteReclamation(@PathVariable Long id){
        service.deleteReclamation(id);
    }
}
