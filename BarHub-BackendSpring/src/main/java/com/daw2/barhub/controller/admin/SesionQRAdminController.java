package com.daw2.barhub.controller.admin;

import com.daw2.barhub.model.dto.ErrorDto;
import com.daw2.barhub.model.dto.SesionQRDto;
import com.daw2.barhub.model.entity.SesionQR;
import com.daw2.barhub.service.SesionQRService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/admin/sesiones_qr")
public class SesionQRAdminController {
    @Autowired
    private SesionQRService sesionQRService;

    @GetMapping("/")
    public List<SesionQR> index() {
        return sesionQRService.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody SesionQRDto sesionQDto) {
        try {
            SesionQR sesionQR = sesionQDto.to();
            sesionQRService.save(sesionQR);
            return ResponseEntity.ok(SesionQRDto.from(sesionQR));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorDto.from("La sesión QR no se ha guardado " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(SesionQRDto.from(sesionQRService.findById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorDto.from("Error: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SesionQR sesion) {
        try {
            SesionQR sesionActualizada = sesionQRService.update(id, sesion);
            if (sesionActualizada != null) {
                return ResponseEntity.status(HttpStatus.OK).body(sesionActualizada);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorDto.from("La sesión QR no ha sido encontrada."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            sesionQRService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("La sesión QR con id " + id + " ha sido eliminada");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorDto.from("La sesión QR no ha sido encontrada " + e.getMessage()));
        }
    }
}