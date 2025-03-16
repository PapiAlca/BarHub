package com.daw2.barhub.service.impl;

import com.daw2.barhub.auth.models.User;
import com.daw2.barhub.auth.repository.UserRepository;
import com.daw2.barhub.model.entity.Mesa;
import com.daw2.barhub.model.entity.SesionQR;
import com.daw2.barhub.model.repository.MesaRepository;
import com.daw2.barhub.model.repository.SesionQRRepository;
import com.daw2.barhub.service.SesionQRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SesionQRServiceImpl implements SesionQRService {

    @Autowired
    private SesionQRRepository sesionQRRepository;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public SesionQR save(SesionQR entity) {
        return this.sesionQRRepository.save(entity);
    }

    @Override
    public List<SesionQR> findAll() {
        return sesionQRRepository.findAll();
    }

    @Override
    public SesionQR findById(long id) {
        return sesionQRRepository.findSesionQRById(id);
    }

    @Override
    public void delete(long id) {
        SesionQR sesion = sesionQRRepository.findById(id);

        if (sesion != null) {
            sesionQRRepository.delete(sesion);
        }
    }

    @Override
    public SesionQR update(long id, SesionQR entity) {
        SesionQR sesionExistente = this.sesionQRRepository.findById(id);

        if (sesionExistente != null) {
            if(entity.getMesa() != null) {
                Mesa mesa = mesaRepository.findById(entity.getMesa().getId())
                        .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));
                sesionExistente.setMesa(mesa);
            };

            if(entity.getUser() != null) {
                User user = userRepository.findById(entity.getUser().getId())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                sesionExistente.setUser(user);
            }

            sesionExistente.setToken(entity.getToken());
            sesionExistente.setFechaSesion(entity.getFechaSesion());

            return this.sesionQRRepository.save(sesionExistente);
        } else {
            return null;
        }
    }
}