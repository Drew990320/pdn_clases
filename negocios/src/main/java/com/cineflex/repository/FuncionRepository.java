package com.cineflex.repository;

import com.cineflex.model.Funcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface FuncionRepository extends JpaRepository<Funcion, Long> {
    @Query("select f from Funcion f where (:peliculaId is null or f.pelicula.id = :peliculaId) and (:fecha is null or f.fecha = :fecha)")
    List<Funcion> findByFilters(@Param("peliculaId") Long peliculaId, @Param("fecha") LocalDate fecha);
}


