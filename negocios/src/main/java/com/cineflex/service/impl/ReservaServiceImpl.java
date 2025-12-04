package com.cineflex.service.impl;

import com.cineflex.dto.reserva.ReservaRequest;
import com.cineflex.dto.reserva.ReservaResponse;
import com.cineflex.dto.reserva.ReservaUpdateRequest;
import com.cineflex.exception.AsientoOcupadoException;
import com.cineflex.exception.CantidadInvalidaException;
import com.cineflex.exception.EstadoInvalidoException;
import com.cineflex.exception.FuncionPasadaException;
import com.cineflex.mapper.ReservaMapper;
import com.cineflex.model.Funcion;
import com.cineflex.model.Reserva;
import com.cineflex.repository.FuncionRepository;
import com.cineflex.repository.ReservaRepository;
import com.cineflex.service.ReservaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepository;
    private final FuncionRepository funcionRepository;

    public ReservaServiceImpl(ReservaRepository reservaRepository, FuncionRepository funcionRepository) {
        this.reservaRepository = reservaRepository;
        this.funcionRepository = funcionRepository;
    }

    private void validarFuncionNoPasada(Funcion funcion) {
        LocalDate hoy = LocalDate.now();
        LocalTime ahora = LocalTime.now();
        
        if (funcion.getFecha().isBefore(hoy) || 
            (funcion.getFecha().equals(hoy) && funcion.getHora().isBefore(ahora))) {
            throw new FuncionPasadaException("No se puede reservar para una función que ya pasó");
        }
    }

    private void validarAsientosDisponibles(Long funcionId, List<String> asientos, Long reservaIdExcluir) {
        List<Reserva.Estado> estadosOcupados = Arrays.asList(Reserva.Estado.CREADA, Reserva.Estado.PAGADA);
        List<String> asientosOcupados = reservaRepository.findAsientosOcupadosByFuncionId(funcionId, estadosOcupados);
        
        Set<String> asientosOcupadosSet = new HashSet<>(asientosOcupados);
        Set<String> asientosSolicitadosSet = new HashSet<>(asientos);
        
        if (reservaIdExcluir != null) {
            Reserva reservaActual = reservaRepository.findById(reservaIdExcluir)
                    .orElseThrow(() -> new java.util.NoSuchElementException("Reserva no encontrada"));
            asientosOcupadosSet.removeAll(reservaActual.getAsientos());
        }
        
        List<String> asientosConflictivos = asientosSolicitadosSet.stream()
                .filter(asientosOcupadosSet::contains)
                .collect(Collectors.toList());
        
        if (!asientosConflictivos.isEmpty()) {
            throw new AsientoOcupadoException("Los siguientes asientos ya están ocupados: " + String.join(", ", asientosConflictivos));
        }
    }

    private void validarCantidadVsAsientos(Integer cantidad, List<String> asientos) {
        if (cantidad != null && cantidad != asientos.size()) {
            throw new CantidadInvalidaException("La cantidad (" + cantidad + ") no coincide con el número de asientos (" + asientos.size() + ")");
        }
    }

    private void validarAsientosUnicos(List<String> asientos) {
        Set<String> asientosSet = new HashSet<>(asientos);
        if (asientosSet.size() != asientos.size()) {
            throw new IllegalArgumentException("Los asientos no pueden estar duplicados");
        }
    }

    private void validarCapacidad(Funcion funcion, List<String> asientos) {
        int capacidad = funcion.getCapacidad() != null ? funcion.getCapacidad() : 50;
        if (asientos.size() > capacidad) {
            throw new IllegalArgumentException("La cantidad de asientos solicitados excede la capacidad de la sala (" + capacidad + ")");
        }
    }

    @Override
    public ReservaResponse crear(ReservaRequest request) {
        Funcion funcion = funcionRepository.findById(request.getFuncionId())
                .orElseThrow(() -> new java.util.NoSuchElementException("Función no encontrada con id: " + request.getFuncionId()));
        
        validarFuncionNoPasada(funcion);
        validarAsientosUnicos(request.getAsientos());
        validarCapacidad(funcion, request.getAsientos());
        validarAsientosDisponibles(request.getFuncionId(), request.getAsientos(), null);
        
        if (request.getCantidad() != null) {
            validarCantidadVsAsientos(request.getCantidad(), request.getAsientos());
        }
        
        Reserva r = ReservaMapper.toEntity(request, funcion);
        return ReservaMapper.toResponse(reservaRepository.save(r));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservaResponse> listar(Long funcionId) {
        return reservaRepository.findByFilters(funcionId).stream()
                .map(ReservaMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ReservaResponse detalle(Long id) {
        return reservaRepository.findById(id)
                .map(ReservaMapper::toResponse)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reserva no encontrada con id: " + id));
    }

    @Override
    public ReservaResponse actualizar(Long id, ReservaUpdateRequest request) {
        Reserva r = reservaRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reserva no encontrada con id: " + id));
        
        if (r.getEstado() != Reserva.Estado.CREADA) {
            throw new EstadoInvalidoException("Solo se pueden editar reservas con estado CREADA");
        }
        
        Funcion funcion = r.getFuncion();
        validarFuncionNoPasada(funcion);
        validarAsientosUnicos(request.getAsientos());
        validarCapacidad(funcion, request.getAsientos());
        validarAsientosDisponibles(funcion.getId(), request.getAsientos(), id);
        
        r.setNombreCliente(request.getNombreCliente());
        r.setAsientos(request.getAsientos());
        r.setCantidad(request.getAsientos().size());
        
        return ReservaMapper.toResponse(reservaRepository.save(r));
    }

    @Override
    public void eliminar(Long id) {
        Reserva r = reservaRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reserva no encontrada con id: " + id));
        
        if (r.getEstado() != Reserva.Estado.CREADA) {
            throw new EstadoInvalidoException("Solo se pueden eliminar reservas con estado CREADA");
        }
        
        reservaRepository.delete(r);
    }

    @Override
    public ReservaResponse pagar(Long id) {
        Reserva r = reservaRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reserva no encontrada con id: " + id));
        
        if (r.getEstado() != Reserva.Estado.CREADA) {
            throw new EstadoInvalidoException("Solo se pueden pagar reservas con estado CREADA. Estado actual: " + r.getEstado());
        }
        
        r.setEstado(Reserva.Estado.PAGADA);
        return ReservaMapper.toResponse(reservaRepository.save(r));
    }

    @Override
    public ReservaResponse cancelar(Long id) {
        Reserva r = reservaRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("Reserva no encontrada con id: " + id));
        
        if (r.getEstado() == Reserva.Estado.CANCELADA) {
            throw new EstadoInvalidoException("La reserva ya está cancelada");
        }
        
        r.setEstado(Reserva.Estado.CANCELADA);
        return ReservaMapper.toResponse(reservaRepository.save(r));
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> obtenerAsientosDisponibles(Long funcionId) {
        Funcion funcion = funcionRepository.findById(funcionId)
                .orElseThrow(() -> new java.util.NoSuchElementException("Función no encontrada con id: " + funcionId));
        
        int capacidad = funcion.getCapacidad() != null ? funcion.getCapacidad() : 50;
        List<String> asientosOcupados = obtenerAsientosOcupados(funcionId);
        Set<String> asientosOcupadosSet = new HashSet<>(asientosOcupados);
        
        List<String> todosLosAsientos = generarAsientos(capacidad);
        return todosLosAsientos.stream()
                .filter(asiento -> !asientosOcupadosSet.contains(asiento))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> obtenerAsientosOcupados(Long funcionId) {
        List<Reserva.Estado> estadosOcupados = Arrays.asList(Reserva.Estado.CREADA, Reserva.Estado.PAGADA);
        return reservaRepository.findAsientosOcupadosByFuncionId(funcionId, estadosOcupados);
    }

    private List<String> generarAsientos(int capacidad) {
        List<String> asientos = new ArrayList<>();
        int filas = (int) Math.ceil(capacidad / 10.0);
        char letra = 'A';
        int numero = 1;
        
        for (int i = 0; i < filas && asientos.size() < capacidad; i++) {
            for (int j = 0; j < 10 && asientos.size() < capacidad; j++) {
                asientos.add(String.valueOf(letra) + numero);
                numero++;
            }
            letra++;
            numero = 1;
        }
        
        return asientos;
    }
}
