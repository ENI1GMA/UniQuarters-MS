package tn.enigma.reclamationms.services;

import lombok.RequiredArgsConstructor;
import tn.enigma.reclamationms.models.Reclamation;

import java.util.List;

public interface ReclamationService {
    List<Reclamation> getReclamations();
    Reclamation getReclamation(Long id);
    Reclamation addReclamation(Reclamation r);
    Reclamation updateReclamation(Reclamation r);
    void deleteReclamation(Long id);
}
