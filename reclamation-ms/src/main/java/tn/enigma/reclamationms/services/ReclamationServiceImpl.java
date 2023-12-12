package tn.enigma.reclamationms.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.enigma.reclamationms.models.Reclamation;
import tn.enigma.reclamationms.repositories.ReclamationRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReclamationServiceImpl implements ReclamationService{
    private final ReclamationRepository repository;
    @Override
    public List<Reclamation> getReclamations() {
        return repository.findAll();
    }

    @Override
    public Reclamation getReclamation(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Reclamation addReclamation(Reclamation r) {
        return repository.save(r);
    }

    @Override
    public Reclamation updateReclamation(Reclamation r) {
        return repository.save(r);
    }

    @Override
    public void deleteReclamation(Long id) {
        repository.deleteById(id);
    }
}
