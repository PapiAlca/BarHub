package com.daw2.barhub.auth.services;

import com.daw2.barhub.auth.models.User;
import com.daw2.barhub.auth.models.VerificationToken;
import com.daw2.barhub.auth.repository.UserRepository;
import com.daw2.barhub.auth.repository.VerificationTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Transactional
    public void registerUser(User user) {
        // Codificar la contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false); // Deshabilitado hasta verificar

        // Guardar usuario
        User savedUser = userRepository.save(user);

        // Crear token de verificación
        VerificationToken token = new VerificationToken(savedUser);
        tokenRepository.save(token);

        // Enviar email
        emailService.sendVerificationEmail(savedUser.getEmail(), token.getToken());
    }
}
