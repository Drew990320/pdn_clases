package com.clasepdn.proyecto.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/saludar")
public class SaludarController {

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
}

