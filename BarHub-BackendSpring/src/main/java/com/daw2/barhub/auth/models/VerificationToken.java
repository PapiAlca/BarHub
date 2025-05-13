package com.daw2.barhub.auth.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String token;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private Instant expiryDate;

    public VerificationToken(String token, User user) {
        this.user = user;
        this.token = token;
        this.expiryDate = Instant.now().plusSeconds(86400); // 24 horas
    }

    public VerificationToken(User user) {
        this.token = UUID.randomUUID().toString();
        this.user = user;
        this.expiryDate = Instant.now().plusSeconds(86400);
    }
}