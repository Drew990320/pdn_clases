package com.cineflex.repository;

import com.cineflex.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    @Query("select r from Reserva r where (:funcionId is null or r.funcion.id = :funcionId) order by r.createdAt desc")
    List<Reserva> findByFilters(@Param("funcionId") Long funcionId);

    @Query("select r from Reserva r where r.funcion.id = :funcionId and r.estado in :estados")
    List<Reserva> findByFuncionIdAndEstadoIn(@Param("funcionId") Long funcionId, @Param("estados") List<Reserva.Estado> estados);

    @Query("select distinct asiento from Reserva r join r.asientos asiento where r.funcion.id = :funcionId and r.estado in :estados")
    List<String> findAsientosOcupadosByFuncionId(@Param("funcionId") Long funcionId, @Param("estados") List<Reserva.Estado> estados);

    @Query("select count(r) from Reserva r where r.estado in :estados")
    long countByEstadoIn(@Param("estados") List<Reserva.Estado> estados);
}


