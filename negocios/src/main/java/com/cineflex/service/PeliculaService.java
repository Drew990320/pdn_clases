package com.cineflex.service;

import com.cineflex.dto.pelicula.PeliculaRequest;
import com.cineflex.dto.pelicula.PeliculaResponse;
import java.util.List;

public interface PeliculaService {
    PeliculaResponse crear(PeliculaRequest request);
    List<PeliculaResponse> listar(String genero, String q);
    PeliculaResponse detalle(Long id);
    PeliculaResponse actualizar(Long id, PeliculaRequest request);
    void eliminar(Long id);
}


