package com.clasepdn.proyecto.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.*;

// 🔹 Retrocompatibilidad garantizada (se mantiene el RequestMapping base)
@RestController
@RequestMapping("/api/hello")
public class HelloController {

    // ------------------------
    // Endpoints originales (retrocompatibles)
    // ------------------------

    @GetMapping
    public String hello() {
        return "¡Hola! Bienvenido a mi aplicación Spring Boot";
    }

    @GetMapping("/world")
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping("/nombre")
    public String helloConNombre() {
        return "¡Hola! Mi nombre es Spring Boot";
    }

    // ------------------------
    // Nuevas funcionalidades añadidas
    // ------------------------

    // Ejemplo: endpoint dinámico con parámetro
    @GetMapping("/saludo/{nombre}")
    public String saludoPersonalizado(@PathVariable String nombre) {
        return "¡Hola, " + nombre + "! Bienvenido a la aplicación 🚀";
    }

    // Ejemplo: devolver un JSON con ResponseEntity
    @GetMapping("/json")
    public ResponseEntity<Map<String, Object>> saludoJson() {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Este es un endpoint JSON");
        respuesta.put("fecha", new Date());
        respuesta.put("version", "1.0.0");
        return ResponseEntity.ok(respuesta);
    }

    // Ejemplo: endpoint que simula un listado
    @GetMapping("/usuarios")
    public List<String> obtenerUsuarios() {
        return Arrays.asList("Alice", "Bob", "Carlos", "Diana");
    }

    // Ejemplo: endpoint tipo POST (aunque no haga lógica real)
    @PostMapping("/crear")
    public ResponseEntity<String> crearUsuario(@RequestBody Map<String, String> body) {
        String nombre = body.getOrDefault("nombre", "Desconocido");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Usuario " + nombre + " creado (simulación)");
    }

    // Ejemplo: endpoint DELETE (simulación)
    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<String> borrarUsuario(@PathVariable String id) {
        return ResponseEntity.ok("Usuario con ID " + id + " eliminado (simulación)");
    }

    // Ejemplo: endpoint con query params (?edad=20)
    @GetMapping("/validar")
    public String validarEdad(@RequestParam(defaultValue = "0") int edad) {
        if (edad >= 18) {
            return "Eres mayor de edad ✅";
        } else {
            return "Eres menor de edad ❌";
        }
    }
}



