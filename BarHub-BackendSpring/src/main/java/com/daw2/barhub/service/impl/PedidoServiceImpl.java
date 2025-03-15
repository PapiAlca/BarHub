package com.daw2.barhub.service.impl;

import com.daw2.barhub.model.entity.Pedido;
import com.daw2.barhub.model.repository.PedidoRepository;
import com.daw2.barhub.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public Pedido save(Pedido entity) {
        return pedidoRepository.save(entity);
    }

    @Override
    public List<Pedido> findAll() {
        List<Pedido> pedidos = pedidoRepository.findAll();

        return pedidos;
    }

    @Override
    public Pedido findById(long id) {
        Pedido pedido = pedidoRepository.findById(id);

        return pedido;
    }

    @Override
    public void delete(long id) {
        Pedido pedido = pedidoRepository.findById(id);
        if (pedido != null) {
            pedidoRepository.delete(pedido);
        }
    }

    @Override
    public Pedido update(long id, Pedido entity) {
        Pedido pedidoExistente = pedidoRepository.findById(id);

        if(pedidoExistente != null){
            pedidoExistente.setUser(entity.getUser());
            pedidoExistente.setMesa(entity.getMesa());
            pedidoExistente.setFecha(entity.getFecha());
            pedidoExistente.setEstado(entity.getEstado());
            pedidoExistente.setPrecioTotal(entity.getPrecioTotal());

            return pedidoRepository.save(pedidoExistente);
        } else {
            return null;
        }
    }
}