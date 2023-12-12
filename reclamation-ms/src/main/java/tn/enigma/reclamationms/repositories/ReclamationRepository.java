package tn.enigma.reclamationms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.enigma.reclamationms.models.Reclamation;;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation,Long> {
}
