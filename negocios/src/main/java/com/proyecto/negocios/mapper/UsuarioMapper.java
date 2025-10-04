package com.proyecto.negocios.mapper;

import com.proyecto.negocios.domain.Usuario;
import com.proyecto.negocios.dto.UsuarioDTO;

public class UsuarioMapper {

    public static UsuarioDTO toDTO(Usuario entity) {
        if (entity == null) {
            return null;
        }
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setNombre(entity.getNombre());
        dto.setEnabled(entity.isEnabled());
        return dto;
    }
}


