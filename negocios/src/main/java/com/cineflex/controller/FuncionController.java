package com.cineflex.controller;

import com.cineflex.dto.funcion.FuncionRequest;
import com.cineflex.dto.funcion.FuncionResponse;
import com.cineflex.service.FuncionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/funciones")
@CrossOrigin
public class FuncionController {

    private final FuncionService funcionService;

    public FuncionController(FuncionService funcionService) {
        this.funcionService = funcionService;
    }

    @PostMapping
    public ResponseEntity<FuncionResponse> crear(@Valid @RequestBody FuncionRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(funcionService.crear(request));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<FuncionResponse>> listar(@RequestParam(required = false) Long peliculaId,
                                                        @RequestParam(required = false) String fecha) {
        try {
            LocalDate f = (fecha == null || fecha.isBlank()) ? null : LocalDate.parse(fecha);
            return ResponseEntity.ok(funcionService.listar(peliculaId, f));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionResponse> detalle(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(funcionService.detalle(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionResponse> actualizar(@PathVariable Long id, 
                                                       @Valid @RequestBody FuncionRequest request) {
        try {
            return ResponseEntity.ok(funcionService.actualizar(id, request));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            funcionService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


