package com.cineflex.service;

import com.cineflex.dto.funcion.FuncionRequest;
import com.cineflex.dto.funcion.FuncionResponse;
import java.time.LocalDate;
import java.util.List;

public interface FuncionService {
    FuncionResponse crear(FuncionRequest request);
    List<FuncionResponse> listar(Long peliculaId, LocalDate fecha);
    FuncionResponse detalle(Long id);
    FuncionResponse actualizar(Long id, FuncionRequest request);
    void eliminar(Long id);
}


