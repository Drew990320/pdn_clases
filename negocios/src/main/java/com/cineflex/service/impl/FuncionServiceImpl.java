package com.cineflex.service.impl;

import com.cineflex.dto.funcion.FuncionRequest;
import com.cineflex.dto.funcion.FuncionResponse;
import com.cineflex.mapper.FuncionMapper;
import com.cineflex.model.Funcion;
import com.cineflex.model.Pelicula;
import com.cineflex.repository.FuncionRepository;
import com.cineflex.repository.PeliculaRepository;
import com.cineflex.service.FuncionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FuncionServiceImpl implements FuncionService {

    private final FuncionRepository funcionRepository;
    private final PeliculaRepository peliculaRepository;

    public FuncionServiceImpl(FuncionRepository funcionRepository, PeliculaRepository peliculaRepository) {
        this.funcionRepository = funcionRepository;
        this.peliculaRepository = peliculaRepository;
    }

    @Override
    public FuncionResponse crear(FuncionRequest request) {
        Pelicula p = peliculaRepository.findById(request.getPeliculaId())
                .orElseThrow(() -> new java.util.NoSuchElementException("Película no encontrada con id: " + request.getPeliculaId()));
        Funcion f = FuncionMapper.toEntity(request, p);
        return FuncionMapper.toResponse(funcionRepository.save(f));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FuncionResponse> listar(Long peliculaId, LocalDate fecha) {
        return funcionRepository.findByFilters(peliculaId, fecha).stream()
                .map(FuncionMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public FuncionResponse detalle(Long id) {
        return funcionRepository.findById(id)
                .map(FuncionMapper::toResponse)
                .orElseThrow(() -> new java.util.NoSuchElementException("Función no encontrada con id: " + id));
    }

    @Override
    public FuncionResponse actualizar(Long id, FuncionRequest request) {
        Funcion f = funcionRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Función no encontrada con id: " + id));
        Pelicula p = peliculaRepository.findById(request.getPeliculaId())
                .orElseThrow(() -> new java.util.NoSuchElementException("Película no encontrada con id: " + request.getPeliculaId()));
        FuncionMapper.updateEntity(f, request, p);
        return FuncionMapper.toResponse(funcionRepository.save(f));
    }

    @Override
    public void eliminar(Long id) {
        if (!funcionRepository.existsById(id)) {
            throw new java.util.NoSuchElementException("Función no encontrada con id: " + id);
        }
        funcionRepository.deleteById(id);
    }
}


