package com.cineflex.controller;

import com.cineflex.dto.pelicula.PeliculaRequest;
import com.cineflex.dto.pelicula.PeliculaResponse;
import com.cineflex.service.PeliculaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/peliculas")
@CrossOrigin
public class PeliculaController {

    private final PeliculaService peliculaService;

    public PeliculaController(PeliculaService peliculaService) {
        this.peliculaService = peliculaService;
    }

    @PostMapping
    public ResponseEntity<PeliculaResponse> crear(@Valid @RequestBody PeliculaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(peliculaService.crear(request));
    }

    @GetMapping
    public ResponseEntity<List<PeliculaResponse>> listar(@RequestParam(required = false) String genero,
                                                          @RequestParam(required = false) String q) {
        return ResponseEntity.ok(peliculaService.listar(genero, q));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeliculaResponse> detalle(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(peliculaService.detalle(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PeliculaResponse> actualizar(@PathVariable Long id, 
                                                         @Valid @RequestBody PeliculaRequest request) {
        try {
            return ResponseEntity.ok(peliculaService.actualizar(id, request));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            peliculaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


