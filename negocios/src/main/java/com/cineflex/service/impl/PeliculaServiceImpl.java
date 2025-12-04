package com.cineflex.service.impl;

import com.cineflex.dto.pelicula.PeliculaRequest;
import com.cineflex.dto.pelicula.PeliculaResponse;
import com.cineflex.mapper.PeliculaMapper;
import com.cineflex.model.Pelicula;
import com.cineflex.repository.PeliculaRepository;
import com.cineflex.service.PeliculaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PeliculaServiceImpl implements PeliculaService {

    private final PeliculaRepository peliculaRepository;

    public PeliculaServiceImpl(PeliculaRepository peliculaRepository) {
        this.peliculaRepository = peliculaRepository;
    }

    @Override
    public PeliculaResponse crear(PeliculaRequest request) {
        Pelicula p = PeliculaMapper.toEntity(request);
        return PeliculaMapper.toResponse(peliculaRepository.save(p));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PeliculaResponse> listar(String genero, String q) {
        return peliculaRepository.findAll().stream()
                .filter(p -> genero == null || genero.isBlank() || genero.equalsIgnoreCase(p.getGenero()))
                .filter(p -> q == null || q.isBlank() || p.getTitulo().toLowerCase().contains(q.toLowerCase()))
                .map(PeliculaMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PeliculaResponse detalle(Long id) {
        Pelicula p = peliculaRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Película no encontrada con id: " + id));
        return PeliculaMapper.toResponse(p);
    }

    @Override
    public PeliculaResponse actualizar(Long id, PeliculaRequest request) {
        Pelicula p = peliculaRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Película no encontrada con id: " + id));
        PeliculaMapper.updateEntity(p, request);
        return PeliculaMapper.toResponse(peliculaRepository.save(p));
    }

    @Override
    public void eliminar(Long id) {
        if (!peliculaRepository.existsById(id)) {
            throw new java.util.NoSuchElementException("Película no encontrada con id: " + id);
        }
        peliculaRepository.deleteById(id);
    }
}


