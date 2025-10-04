package com.proyecto.negocios.service;

import com.proyecto.negocios.dto.UsuarioDTO;
import java.util.List;

public interface UsuarioService {
    UsuarioDTO obtenerPorId(Long id);
    List<UsuarioDTO> listar();
    UsuarioDTO actualizar(Long id, UsuarioDTO dto);
    void eliminar(Long id);
}


