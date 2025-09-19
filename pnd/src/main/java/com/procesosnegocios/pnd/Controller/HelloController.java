package com.procesosnegocios.pnd.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HelloController - Controlador básico para saludos
 * 
 * 🧪 CÓMO PROBAR EN POSTMAN:
 * 
 * 1. Configura el Environment con base_url = http://localhost:8080
 * 2. Crea requests GET con estas URLs:
 * 
 * 📋 ENDPOINTS DISPONIBLES:
 * - GET /api/hello → Saludo básico
 * - GET /api/hello/world → Hello World
 * - GET /api/hello/nombre → Saludo con nombre
 * 
 * 🔗 URLs COMPLETAS PARA POSTMAN:
 * - http://localhost:8080/api/hello
 * - http://localhost:8080/api/hello/world
 * - http://localhost:8080/api/hello/nombre
 * 
 * ✅ RESPUESTAS ESPERADAS:
 * - /api/hello → "¡Hola! Bienvenido a mi aplicación Spring Boot"
 * - /api/hello/world → "Hello World!"
 * - /api/hello/nombre → "¡Hola! Mi nombre es Spring Boot"
 * 
 * 🎯 TIPS PARA POSTMAN:
 * - Todos son GET requests (no necesitan body)
 * - No requieren headers especiales
 * - Respuestas en texto plano
 * 
 * 🌐 CÓMO PROBAR EN EL EXPLORADOR:
 * 1. Ejecuta la aplicación con: ./mvnw spring-boot:run
 * 2. Abre tu navegador web
 * 3. Copia y pega estas URLs en la barra de direcciones:
 *    - http://localhost:8080/api/hello
 *    - http://localhost:8080/api/hello/world
 *    - http://localhost:8080/api/hello/nombre
 * 4. Presiona Enter para ver las respuestas
 * 5. ¡Perfecto para pruebas rápidas!
 */
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


