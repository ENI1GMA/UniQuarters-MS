package tn.enigma.reclamationms.models;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@RequiredArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String title;
    @Enumerated(EnumType.STRING)
    private ReclamationStatusType status;
    private Date date;
    private boolean isDeleted;
    private String userId;
}
