package com.daw2.barhub.model.entity;

import com.daw2.barhub.model.Enum.EstadoMesa;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Entity
@Table(name="mesas")
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String codigoQR;

    @Column
    @Enumerated(EnumType.STRING)
    private EstadoMesa estado;
}