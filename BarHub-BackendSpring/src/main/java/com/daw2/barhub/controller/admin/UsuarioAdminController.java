package com.daw2.barhub.controller.admin;

import com.daw2.barhub.auth.models.User;
import com.daw2.barhub.auth.services.UserService;
import com.daw2.barhub.model.dto.ErrorDto;
import com.daw2.barhub.model.dto.UsuarioDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
@RestController
@RequestMapping("/admin/usuarios")
public class UsuarioAdminController {

    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired // No es necesario si usas Lombok @RequiredArgsConstructor
    public UsuarioAdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<?> index() {
        try {
            List<User> usuarios = userService.findAll();
            return ResponseEntity.ok(UsuarioDto.from(usuarios));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ErrorDto.from("Error al obtener usuarios: " + e.getMessage()));
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody UsuarioDto usuarioDto) {
        try {
            User usuario = usuarioDto.to();
            usuario.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));
            User usuarioGuardado = userService.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(UsuarioDto.from(usuarioGuardado));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ErrorDto.from("Error al crear usuario: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        try {
            User usuario = userService.findById(id);
            if (usuario == null) {
                throw new RuntimeException("Usuario no encontrado");
            }
            return ResponseEntity.ok(UsuarioDto.from(usuario));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ErrorDto.from(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UsuarioDto usuarioDto) {
        try {
            User usuarioExistente = userService.findById(id);
            if (usuarioExistente == null) {
                throw new RuntimeException("Usuario no encontrado");
            }

            usuarioExistente.setUsername(usuarioDto.getUsername());
            usuarioExistente.setEmail(usuarioDto.getEmail());
            if (usuarioDto.getPassword() != null) {
                usuarioExistente.setPassword(passwordEncoder.encode(usuarioDto.getPassword()));
            }
            usuarioExistente.setEnabled(usuarioDto.isEnabled());

            User usuarioActualizado = userService.save(usuarioExistente);
            return ResponseEntity.ok(UsuarioDto.from(usuarioActualizado));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ErrorDto.from("Error al actualizar usuario: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ErrorDto.from("Error al eliminar usuario: " + e.getMessage()));
        }
    }
}