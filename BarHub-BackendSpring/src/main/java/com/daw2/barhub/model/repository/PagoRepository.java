package com.daw2.barhub.model.repository;

import com.daw2.barhub.model.entity.Pago;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PagoRepository extends JpaRepository<Pago, Long> {
    Pago findById(long id);

    Pago findPagoById(long id);
}