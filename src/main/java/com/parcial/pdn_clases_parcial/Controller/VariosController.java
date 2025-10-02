package com.parcial.pdn_clases_parcial.Controller;

import java.util.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador Varios - Endpoints diversos extendidos
 */
@RestController
@RequestMapping("/api/varios")
public class VariosController {

    private Random random = new Random();

    // Lista de frases motivacionales
    private final List<String> frases = Arrays.asList(
            "Nunca te rindas 💪",
            "El éxito es la suma de pequeños esfuerzos 🚀",
            "Cree en ti y todo será posible ✨",
            "La disciplina vence al talento 🎯",
            "Haz hoy lo que otros no quieren, mañana vivirás como otros no pueden 🔥",
            "Cada día es una nueva oportunidad 🌟",
            "El fracaso es solo el comienzo del éxito 📈",
            "El conocimiento es poder 📚",
            "El esfuerzo de hoy es la recompensa de mañana 🏆",
            "El límite solo existe en tu mente 🧠"
    );

    // Lista de ciudades
    private final List<String> ciudades = Arrays.asList(
            "Nueva York", "Tokio", "París", "Londres", "Roma",
            "Barcelona", "Sídney", "Toronto", "Dubái", "Singapur",
            "Estambul", "Hong Kong", "Los Ángeles", "Berlín", "Moscú"
    );

    // ------------------ ENDPOINTS ORIGINALES ------------------

    @GetMapping("/random")
    public String generarRandom() {
        int numero = random.nextInt(101);
        return "Número aleatorio: " + numero;
    }

    @GetMapping("/random/param")
    public String generarRandomConParametro(@RequestParam(defaultValue = "100") int maximo) {
        int numero = random.nextInt(maximo + 1);
        return "Número aleatorio entre 0 y " + maximo + ": " + numero;
    }

    @GetMapping("/random/{maximo}")
    public String generarRandomPath(@PathVariable int maximo) {
        int numero = random.nextInt(maximo + 1);
        return "Número aleatorio entre 0 y " + maximo + ": " + numero;
    }

    @GetMapping("/random/rango")
    public String generarRandomRango(@RequestParam(defaultValue = "0") int minimo,
                                     @RequestParam(defaultValue = "100") int maximo) {
        if (minimo > maximo) {
            return "Error: El mínimo no puede ser mayor que el máximo";
        }
        int numero = random.nextInt(maximo - minimo + 1) + minimo;
        return "Número aleatorio entre " + minimo + " y " + maximo + ": " + numero;
    }

    @GetMapping("/saludar")
    public String saludar(@RequestParam(defaultValue = "Usuario") String nombre,
                          @RequestParam(defaultValue = "0") int edad) {
        return "Hola tienes " + nombre + " y " + edad;
    }

    @GetMapping("/saludar/{nombre}/{edad}")
    public String saludarPath(@PathVariable String nombre, @PathVariable int edad) {
        return "Hola tienes " + nombre + " y " + edad;
    }

    @GetMapping("/estudiantes")
    public String generarCiudades() {
        Collections.shuffle(ciudades);
        List<String> seleccionadas = ciudades.subList(0, 7);

        StringBuilder respuesta = new StringBuilder("Lista de ciudades seleccionadas:\n\n");
        for (int i = 0; i < seleccionadas.size(); i++) {
            respuesta.append((i + 1)).append(". ").append(seleccionadas.get(i)).append("\n");
        }
        return respuesta.toString();
    }

    @GetMapping("/frase")
    public String generarFraseAleatoria() {
        String frase = frases.get(random.nextInt(frases.size()));
        return "Frase motivacional: " + frase;
    }

    @GetMapping("/frase/{cantidad}")
    public String generarVariasFrases(@PathVariable int cantidad) {
        if (cantidad <= 0) {
            return "Error: La cantidad debe ser mayor a 0";
        }
        if (cantidad > frases.size()) {
            return "Error: La cantidad máxima es " + frases.size();
        }
        List<String> copia = new ArrayList<>(frases);
        Collections.shuffle(copia);
        return cantidad + " frases motivacionales: " + String.join(" | ", copia.subList(0, cantidad));
    }

    @GetMapping("/info")
    public String info() {
        return "Controlador Varios - Endpoints: /random, /random/param, /random/{maximo}, /random/rango, /saludar, /estudiantes, /frase";
    }

    // ------------------ NUEVOS ENDPOINTS EXTENDIDOS ------------------

    @GetMapping("/random/lista")
    public List<Integer> generarListaRandom(
            @RequestParam(defaultValue = "5") int cantidad,
            @RequestParam(defaultValue = "100") int maximo) {

        List<Integer> numeros = new ArrayList<>();
        for (int i = 0; i < cantidad; i++) {
            numeros.add(random.nextInt(maximo + 1));
        }
        return numeros;
    }

    @GetMapping(value = "/random/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> generarRandomJson(@RequestParam(defaultValue = "100") int maximo) {
        int numero = random.nextInt(maximo + 1);
        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("numero", numero);
        respuesta.put("rango", "0 - " + maximo);
        respuesta.put("timestamp", new Date());
        return respuesta;
    }

    @GetMapping(value = "/estudiantes/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> generarCiudadesJson() {
        Collections.shuffle(ciudades);
        return ciudades.subList(0, 7);
    }

    @GetMapping(value = "/frase/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> generarFraseJson() {
        String frase = frases.get(random.nextInt(frases.size()));
        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("frase", frase);
        respuesta.put("categoria", "motivacional");
        return respuesta;
    }

    @GetMapping(value = "/saludar/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> saludarJson(
            @RequestParam(defaultValue = "Usuario") String nombre,
            @RequestParam(defaultValue = "0") int edad) {

        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("mensaje", "Hola " + nombre + ", tienes " + edad + " años");
        respuesta.put("usuario", nombre);
        respuesta.put("edad", edad);
        respuesta.put("hora", new Date());
        return respuesta;
    }
}
