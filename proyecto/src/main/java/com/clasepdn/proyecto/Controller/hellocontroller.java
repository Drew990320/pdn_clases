package com.clasepdn.proyecto.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

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
} 