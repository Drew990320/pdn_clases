package com.cineflex.mapper;

import com.cineflex.dto.funcion.FuncionRequest;
import com.cineflex.dto.funcion.FuncionResponse;
import com.cineflex.model.Funcion;
import com.cineflex.model.Pelicula;
import java.time.LocalDate;
import java.time.LocalTime;

public class FuncionMapper {
    public static Funcion toEntity(FuncionRequest r, Pelicula pelicula) {
        Funcion f = new Funcion();
        f.setPelicula(pelicula);
        f.setFecha(LocalDate.parse(r.getFecha()));
        f.setHora(LocalTime.parse(r.getHora()));
        f.setSala(r.getSala());
        f.setPrecio(r.getPrecio());
        return f;
    }

    public static void updateEntity(Funcion f, FuncionRequest r, Pelicula pelicula) {
        f.setPelicula(pelicula);
        f.setFecha(LocalDate.parse(r.getFecha()));
        f.setHora(LocalTime.parse(r.getHora()));
        f.setSala(r.getSala());
        f.setPrecio(r.getPrecio());
    }

    public static FuncionResponse toResponse(Funcion f) {
        FuncionResponse res = new FuncionResponse();
        res.setId(f.getId());
        res.setPeliculaId(f.getPelicula().getId());
        res.setFecha(f.getFecha().toString());
        res.setHora(f.getHora().toString());
        res.setSala(f.getSala());
        res.setPrecio(f.getPrecio());
        return res;
    }
}


