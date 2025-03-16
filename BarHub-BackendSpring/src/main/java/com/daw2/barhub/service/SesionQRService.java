package com.daw2.barhub.service;

import com.daw2.barhub.model.entity.SesionQR;

import java.util.List;

public interface SesionQRService {
    SesionQR save(SesionQR entity);

    List<SesionQR> findAll();

    SesionQR findById(long id);

    void delete(long id);

    SesionQR update(long id, SesionQR entity);
}