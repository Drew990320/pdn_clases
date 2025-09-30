package com.clasepdn.proyecto.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.*;

/**
 * Controlador de Matemáticas (retrocompatible + nuevas funcionalidades)
 */
@RestController
@RequestMapping("/api/matematicas")
public class MatematicasController {

    // ------------------------
    // Endpoints originales (retrocompatibles)
    // ------------------------

    @GetMapping("/suma")
    public String sumar(@RequestParam(defaultValue = "0") double a,
                        @RequestParam(defaultValue = "0") double b) {
        double resultado = a + b;
        return "La suma de " + a + " + " + b + " = " + resultado;
    }

    @GetMapping("/suma/{a}/{b}")
    public String sumarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a + b;
        return "La suma de " + a + " + " + b + " = " + resultado;
    }

    @GetMapping("/resta")
    public String restar(@RequestParam(defaultValue = "0") double a,
                         @RequestParam(defaultValue = "0") double b) {
        double resultado = a - b;
        return "La resta de " + a + " - " + b + " = " + resultado;
    }

    @GetMapping("/resta/{a}/{b}")
    public String restarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a - b;
        return "La resta de " + a + " - " + b + " = " + resultado;
    }

    @GetMapping("/multiplicacion")
    public String multiplicar(@RequestParam(defaultValue = "0") double a,
                              @RequestParam(defaultValue = "0") double b) {
        double resultado = a * b;
        return "La multiplicación de " + a + " × " + b + " = " + resultado;
    }

    @GetMapping("/multiplicacion/{a}/{b}")
    public String multiplicarPath(@PathVariable double a, @PathVariable double b) {
        double resu
