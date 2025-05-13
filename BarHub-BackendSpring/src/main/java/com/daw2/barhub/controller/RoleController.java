package com.daw2.barhub.controller;

import com.daw2.barhub.auth.models.Role;
import com.daw2.barhub.auth.services.RoleService;
import com.daw2.barhub.model.dto.RoleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/")
    public List<RoleDto> getAllRoles() {
        List<Role> roles = roleService.findAll();

        return roles.stream()
                .map(role -> {
                    RoleDto dto = new RoleDto();
                    dto.setId(role.getId());
                    dto.setNombre(role.getName().name());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
