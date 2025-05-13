package com.daw2.barhub.auth.services;

import com.daw2.barhub.auth.models.User;
import com.daw2.barhub.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Guardar un usuario nuevo
    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Buscar usuario por ID
    public User findById(long id) {
        Optional<User> usuarioOpt = userRepository.findById(id);
        return usuarioOpt.orElse(null);
    }

    // Eliminar usuario por ID
    public void delete(long id) {
        userRepository.deleteById(id);
    }

    // Actualizar usuario
    public User update(long id, User entity) {
        Optional<User> usuarioOpt = userRepository.findById(id);

        if (usuarioOpt.isPresent()) {
            User usuarioExistente = usuarioOpt.get();

            // Actualiza solo los campos necesarios
            if (entity.getUsername() != null) usuarioExistente.setUsername(entity.getUsername());
            if (entity.getEmail() != null) usuarioExistente.setEmail(entity.getEmail());
            if (entity.getPassword() != null) usuarioExistente.setPassword(entity.getPassword());
            usuarioExistente.setEnabled(entity.isEnabled());

            return userRepository.save(usuarioExistente);
        } else {
            return null;
        }
    }
}