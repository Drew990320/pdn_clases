package com.cineflex.mapper;

import com.cineflex.dto.pelicula.PeliculaRequest;
import com.cineflex.dto.pelicula.PeliculaResponse;
import com.cineflex.model.Pelicula;

public class PeliculaMapper {
    public static Pelicula toEntity(PeliculaRequest r) {
        Pelicula p = new Pelicula();
        p.setTitulo(r.getTitulo());
        // Campos opcionales - establecer siempre, permitir null
        p.setGenero(r.getGenero() != null && !r.getGenero().isBlank() ? r.getGenero() : null);
        p.setDuracionMin(r.getDuracionMin() != null && r.getDuracionMin() > 0 ? r.getDuracionMin() : null);
        p.setClasificacion(r.getClasificacion() != null && !r.getClasificacion().isBlank() ? r.getClasificacion() : null);
        p.setSinopsis(r.getSinopsis() != null && !r.getSinopsis().isBlank() ? r.getSinopsis() : null);
        p.setImagenUrl(r.getImagenUrl() != null && !r.getImagenUrl().isBlank() ? r.getImagenUrl() : null);
        return p;
    }

    public static void updateEntity(Pelicula p, PeliculaRequest r) {
        p.setTitulo(r.getTitulo());
        // Campos opcionales - actualizar si están presentes
        if (r.getGenero() != null) {
            p.setGenero(r.getGenero().isBlank() ? null : r.getGenero());
        }
        if (r.getDuracionMin() != null) {
            p.setDuracionMin(r.getDuracionMin() > 0 ? r.getDuracionMin() : null);
        }
        if (r.getClasificacion() != null) {
            p.setClasificacion(r.getClasificacion().isBlank() ? null : r.getClasificacion());
        }
        if (r.getSinopsis() != null) {
            p.setSinopsis(r.getSinopsis().isBlank() ? null : r.getSinopsis());
        }
        if (r.getImagenUrl() != null) {
            p.setImagenUrl(r.getImagenUrl().isBlank() ? null : r.getImagenUrl());
        }
    }

    public static PeliculaResponse toResponse(Pelicula p) {
        PeliculaResponse res = new PeliculaResponse();
        res.setId(p.getId());
        res.setTitulo(p.getTitulo());
        res.setGenero(p.getGenero());
        res.setDuracionMin(p.getDuracionMin());
        res.setClasificacion(p.getClasificacion());
        res.setSinopsis(p.getSinopsis());
        res.setImagenUrl(p.getImagenUrl());
        res.setCreatedAt(p.getCreatedAt());
        return res;
    }
}


