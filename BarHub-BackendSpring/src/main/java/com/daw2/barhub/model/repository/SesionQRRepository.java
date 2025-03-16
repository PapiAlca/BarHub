package com.daw2.barhub.model.repository;

import com.daw2.barhub.model.entity.SesionQR;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SesionQRRepository extends JpaRepository<SesionQR, Long> {
    SesionQR findById(long id);

    SesionQR findSesionQRById(long id);
}