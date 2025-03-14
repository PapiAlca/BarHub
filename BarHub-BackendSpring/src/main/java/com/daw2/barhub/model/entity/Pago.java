package com.daw2.barhub.model.entity;

import com.daw2.barhub.model.Enum.EstadoPago;
import com.daw2.barhub.model.Enum.MetodoPago;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

/*
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name="pagos")
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @Column
    @Enumerated(EnumType.STRING)
    private MetodoPago metodoPago;

    @Column
    @Enumerated(EnumType.STRING)
    private EstadoPago estadoPago;

    @Column(precision = 10, scale = 2)
    @Digits(integer = 10, fraction = 2)
    private BigDecimal precioUnitario;

    @Column
    private LocalDate fechaPago;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
} */