package com.cineflex.controller;

import com.cineflex.dto.reserva.ReservaRequest;
import com.cineflex.dto.reserva.ReservaResponse;
import com.cineflex.dto.reserva.ReservaUpdateRequest;
import com.cineflex.exception.AsientoOcupadoException;
import com.cineflex.exception.CantidadInvalidaException;
import com.cineflex.exception.EstadoInvalidoException;
import com.cineflex.exception.FuncionPasadaException;
import com.cineflex.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public ResponseEntity<ReservaResponse> crear(@Valid @RequestBody ReservaRequest request) {
        try {
            // Las excepciones serán manejadas por GlobalExceptionHandler
            return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.crear(request));
        } catch (Exception e) {
            // Log para debugging
            System.err.println("Error en crear reserva: " + e.getClass().getName());
            System.err.println("Mensaje: " + e.getMessage());
            e.printStackTrace();
            // Re-lanzar para que GlobalExceptionHandler lo maneje
            throw e;
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservaResponse>> listar(@RequestParam(required = false) Long funcionId) {
        return ResponseEntity.ok(reservaService.listar(funcionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponse> detalle(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservaService.detalle(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaResponse> actualizar(@PathVariable Long id, @Valid @RequestBody ReservaUpdateRequest request) {
        try {
            return ResponseEntity.ok(reservaService.actualizar(id, request));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (EstadoInvalidoException | AsientoOcupadoException | FuncionPasadaException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            reservaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (EstadoInvalidoException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/pagar")
    public ResponseEntity<ReservaResponse> pagar(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservaService.pagar(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (EstadoInvalidoException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<ReservaResponse> cancelar(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservaService.cancelar(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (EstadoInvalidoException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/funciones/{funcionId}/asientos-disponibles")
    public ResponseEntity<List<String>> obtenerAsientosDisponibles(@PathVariable Long funcionId) {
        try {
            return ResponseEntity.ok(reservaService.obtenerAsientosDisponibles(funcionId));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/funciones/{funcionId}/asientos-ocupados")
    public ResponseEntity<List<String>> obtenerAsientosOcupados(@PathVariable Long funcionId) {
        try {
            return ResponseEntity.ok(reservaService.obtenerAsientosOcupados(funcionId));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


