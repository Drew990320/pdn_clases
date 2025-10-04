package com.proyecto.negocios.service.impl;

import com.proyecto.negocios.dto.UsuarioDTO;
import com.proyecto.negocios.mapper.UsuarioMapper;
import com.proyecto.negocios.repository.UsuarioRepository;
import com.proyecto.negocios.service.UsuarioService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioDTO obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .map(UsuarioMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioDTO> listar() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioDTO actualizar(Long id, UsuarioDTO dto) {
        return usuarioRepository.findById(id)
                .map(u -> {
                    u.setNombre(dto.getNombre());
                    u.setEmail(dto.getEmail());
                    u.setEnabled(dto.isEnabled());
                    return UsuarioMapper.toDTO(usuarioRepository.save(u));
                })
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado"));
    }

    @Override
    public void eliminar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new NoSuchElementException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }
}


