package com.procesosnegocios.pnd.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * SaludarController - Controlador para saludos y despedidas
 * 
 * 🧪 CÓMO PROBAR EN POSTMAN:
 * 
 * 1. Configura el Environment con base_url = http://localhost:8080
 * 2. Crea requests GET con estas URLs:
 * 
 * 📋 ENDPOINTS DISPONIBLES:
 * - GET /api/saludar → Saludo general
 * - GET /api/saludar/usuario → Saludo con nombre (query parameter)
 * - GET /api/saludar/usuario/{nombre} → Saludo con nombre (path variable)
 * - GET /api/saludar/despedir → Despedida general
 * - GET /api/saludar/despedir/{nombre} → Despedida personalizada
 * 
 * 🔗 URLs COMPLETAS PARA POSTMAN:
 * - http://localhost:8080/api/saludar
 * - http://localhost:8080/api/saludar/usuario?nombre=Juan
 * - http://localhost:8080/api/saludar/usuario/María
 * - http://localhost:8080/api/saludar/despedir
 * - http://localhost:8080/api/saludar/despedir/Carlos
 * 
 * ✅ RESPUESTAS ESPERADAS:
 * - /api/saludar → "¡Saludos desde Spring Boot!"
 * - /api/saludar/usuario?nombre=Juan → "¡Hola Juan! ¿Cómo estás?"
 * - /api/saludar/usuario/María → "¡Hola María! Bienvenido a nuestra aplicación"
 * - /api/saludar/despedir → "¡Hasta luego! Que tengas un buen día"
 * - /api/saludar/despedir/Carlos → "¡Adiós Carlos! Esperamos verte pronto"
 * 
 * 🎯 TIPS PARA POSTMAN:
 * - Todos son GET requests (no necesitan body)
 * - Query parameter: ?nombre=Juan
 * - Path variable: /Juan
 * - Respuestas en texto plano
 * - Prueba con diferentes nombres
 * 
 * 🌐 CÓMO PROBAR EN EL EXPLORADOR:
 * 1. Ejecuta la aplicación con: ./mvnw spring-boot:run
 * 2. Abre tu navegador web
 * 3. Copia y pega estas URLs en la barra de direcciones:
 * 
 * 👋 SALUDOS BÁSICOS:
 *    - http://localhost:8080/api/saludar
 *    - http://localhost:8080/api/saludar/despedir
 * 
 * 👤 SALUDOS PERSONALIZADOS (cambia el nombre):
 *    - http://localhost:8080/api/saludar/usuario?nombre=Juan
 *    - http://localhost:8080/api/saludar/usuario/María
 *    - http://localhost:8080/api/saludar/despedir/Carlos
 * 
 * 💡 TIP: Cambia "Juan", "María", "Carlos" por tu nombre o cualquier otro
 */
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

