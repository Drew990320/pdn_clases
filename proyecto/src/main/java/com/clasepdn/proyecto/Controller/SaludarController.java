package com.clasepdn.proyecto.Controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/api/saludar")
public class SaludarController {

    // ------------------ ENDPOINTS ORIGINALES ------------------

    @GetMapping
    public String saludar() {
        return "¡Saludos desde Spring Boot!";
    }

    @GetMapping("/usuario")
    public String saludarUsuario(@RequestParam(defaultValue = "Usuario") String nombre) {
        return "¡Hola " + nombre + "! ¿Cómo estás?";
    }

    @GetMapping("/usuario/{nombre}")
    public String saludarUsuarioPath(@PathVariable String nombre) {
        return "¡Hola " + nombre + "! Bienvenido a nuestra aplicación";
    }

    @GetMapping("/despedir")
    public String despedir() {
        return "¡Hasta luego! Que tengas un buen día";
    }

    @GetMapping("/despedir/{nombre}")
    public String despedirUsuario(@PathVariable String nombre) {
        return "¡Adiós " + nombre + "! Esperamos verte pronto";
    }

    // ------------------ NUEVAS FUNCIONALIDADES ------------------

    /**
     * Saludo dinámico según la hora del día.
     * Ejemplo: GET /api/saludar/dinamico?nombre=Laura
     */
    @GetMapping("/dinamico")
    public String saludoDinamico(@RequestParam(defaultValue = "Amigo") String nombre) {
        int hora = LocalTime.now().getHour();
        String saludo;

        if (hora < 12) {
            saludo =


