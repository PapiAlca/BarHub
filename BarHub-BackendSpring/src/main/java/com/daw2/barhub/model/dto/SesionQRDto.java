package com.daw2.barhub.model.dto;

import com.daw2.barhub.auth.models.User;
import com.daw2.barhub.model.entity.Mesa;
import com.daw2.barhub.model.entity.SesionQR;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SesionQRDto {
    private Long id;

    @JsonProperty("id_mesa")
    private Long idMesa;

    @JsonProperty("id_user")
    private Long idUser;

    @JsonProperty("token")
    private String token;

    @JsonProperty("fecha_sesion")
    private LocalDate fechaSesion;

    public static SesionQRDto from(SesionQR sesionQR) {
        SesionQRDto dto = null;

        if (sesionQR != null) {
            dto = new SesionQRDto();
            dto.setId(sesionQR.getId());
            dto.setIdMesa(sesionQR.getMesa().getId());
            dto.setIdUser(sesionQR.getUser().getId());
            dto.setToken(sesionQR.getToken());
            dto.setFechaSesion(sesionQR.getFechaSesion());
        }

        return dto;
    }

    public static List<SesionQRDto> from(List<SesionQR> sesionQRs) {
        List<SesionQRDto> dtos = new ArrayList<>();

        if (sesionQRs != null) {
            dtos = new ArrayList<SesionQRDto>();
            for(SesionQR sesionQR : sesionQRs) {
                dtos.add(from(sesionQR));
            }
        }

        return dtos;
    }

    public SesionQR to() {
        SesionQR sesionQR = new SesionQR();

        sesionQR.setId(getId());

        if(idMesa != null) {
            Mesa mesa = new Mesa();
            mesa.setId(idMesa);
            sesionQR.setMesa(mesa);
        }

        if(idUser != null) {
            User user = new User();
            user.setId(idUser);
            sesionQR.setUser(user);
        }

        sesionQR.setToken(getToken());
        sesionQR.setFechaSesion(getFechaSesion());

        return sesionQR;
    }
}