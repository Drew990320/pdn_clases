package com.cineflex.mapper;

import com.cineflex.dto.reserva.ReservaRequest;
import com.cineflex.dto.reserva.ReservaResponse;
import com.cineflex.model.Funcion;
import com.cineflex.model.Reserva;

public class ReservaMapper {
    public static Reserva toEntity(ReservaRequest r, Funcion funcion) {
        Reserva res = new Reserva();
        res.setNombreCliente(r.getNombreCliente());
        res.setAsientos(r.getAsientos());
        res.setCantidad(r.getCantidad() != null ? r.getCantidad() : r.getAsientos().size());
        res.setFuncion(funcion);
        return res;
    }

    public static ReservaResponse toResponse(Reserva r) {
        ReservaResponse res = new ReservaResponse();
        res.setId(r.getId());
        res.setNombreCliente(r.getNombreCliente());
        res.setFuncionId(r.getFuncion().getId());
        res.setAsientos(r.getAsientos());
        res.setCantidad(r.getCantidad());
        res.setEstado(r.getEstado().name());
        res.setCreatedAt(r.getCreatedAt());
        res.setPrecioTotal(r.getPrecioTotal());
        res.setPaidAt(r.getPaidAt());
        res.setCancelledAt(r.getCancelledAt());
        return res;
    }
}


