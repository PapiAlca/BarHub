package com.daw2.barhub.model.repository;

import com.daw2.barhub.model.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    Pedido findById(long pedidoId);
}