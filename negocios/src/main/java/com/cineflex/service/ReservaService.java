package com.cineflex.service;

import com.cineflex.dto.reserva.ReservaRequest;
import com.cineflex.dto.reserva.ReservaResponse;
import com.cineflex.dto.reserva.ReservaUpdateRequest;

import java.util.List;

public interface ReservaService {
    ReservaResponse crear(ReservaRequest request);
    List<ReservaResponse> listar(Long funcionId);
    ReservaResponse detalle(Long id);
    ReservaResponse actualizar(Long id, ReservaUpdateRequest request);
    void eliminar(Long id);
    ReservaResponse pagar(Long id);
    ReservaResponse cancelar(Long id);
    List<String> obtenerAsientosDisponibles(Long funcionId);
    List<String> obtenerAsientosOcupados(Long funcionId);
}


