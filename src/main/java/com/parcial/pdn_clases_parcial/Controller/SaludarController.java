package com.parcial.pdn_clases_parcial.Controller;


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
            saludo = "¡Buenos días";
        } else if (hora < 18) {
            saludo = "¡Buenas tardes";
        } else {
            saludo = "¡Buenas noches";
        }

        return saludo + " " + nombre + "!";
    }

    /**
     * Saludo en varios idiomas (es, en, fr, de).
     * Ejemplo: GET /api/saludar/idioma?nombre=Carlos&lang=fr
     */
    @GetMapping("/idioma")
    public String saludoPorIdioma(
            @RequestParam(defaultValue = "Usuario") String nombre,
            @RequestParam(defaultValue = "es") String lang) {

        Map<String, String> saludos = new HashMap<>();
        saludos.put("es", "¡Hola");
        saludos.put("en", "Hello");
        saludos.put("fr", "Bonjour");
        saludos.put("de", "Hallo");

        String saludo = saludos.getOrDefault(lang.toLowerCase(), "¡Hola");
        return saludo + " " + nombre + "!";
    }

    /**
     * Devuelve un saludo aleatorio de una lista predefinida.
     * Ejemplo: GET /api/saludar/random
     */
    @GetMapping("/random")
    public String saludoAleatorio() {
        List<String> saludos = Arrays.asList(
                "¡Qué gusto verte!",
                "¡Bienvenido!",
                "¡Encantado de saludarte!",
                "¡Un placer tenerte aquí!",
                "¡Hola, espero que tengas un gran día!"
        );
        Random random = new Random();
        return saludos.get(random.nextInt(saludos.size()));
    }

    /**
     * Devuelve un saludo en formato JSON (más estructurado).
     * Ejemplo: GET /api/saludar/json?nombre=Ana
     */
    @GetMapping(value = "/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> saludoJson(@RequestParam(defaultValue = "Usuario") String nombre) {
        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("mensaje", "¡Hola " + nombre + "!");
        respuesta.put("usuario", nombre);
        respuesta.put("horaServidor", LocalTime.now().toString());
        respuesta.put("framework", "Spring Boot");
        return respuesta;
    }

    /**
     * Devuelve lista de despedidas posibles
     * Ejemplo: GET /api/saludar/despedidas
     */
    @GetMapping("/despedidas")
    public List<String> despedidas() {
        return Arrays.asList(
                "¡Hasta pronto!",
                "¡Nos vemos luego!",
                "¡Que tengas un excelente día!",
                "¡Chao, cuídate mucho!"
        );
    }
}
