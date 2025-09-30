package com.clasepdn.proyecto.Controller;

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

    // Lista de emojis privados
    private final List<String> emojis = Arrays.asList(
            "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
            "😎", "🤩", "🥳", "😏", "😒", "😭", "😡", "🤯", "🥵", "🥶",
            "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
            "🌹", "🌺", "🌻", "🌼", "🌷", "🌱", "🌲", "🌳", "🌴", "🌵"
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
    public String generarEstudiantesMarvel() {
        List<String> personajesMarvel = Arrays.asList(
                "Spider-Man", "Iron Man", "Captain America", "Thor", "Black Widow",
                "Hulk", "Black Panther", "Doctor Strange", "Scarlet Witch", "Vision",
                "Ant-Man", "Wasp", "Falcon", "Winter Soldier", "Hawkeye",
                "Captain Marvel", "Gamora", "Drax", "Rocket Raccoon", "Groot"
        );

        Collections.shuffle(personajesMarvel);
        List<String> seleccionados = personajesMarvel.subList(0, 10);

        StringBuilder respuesta = new StringBuilder("Lista de estudiantes Marvel:\n\n");
        for (int i = 0; i < seleccionados.size(); i++) {
            respuesta.append((i + 1)).append(". ").append(seleccionados.get(i)).append("\n");
        }
        return respuesta.toString();
    }

    @GetMapping("/emoji")
    public String generarEmojiAleatorio() {
        String emoji = emojis.get(random.nextInt(emojis.size()));
        return "Emoji aleatorio: " + emoji;
    }

    @GetMapping("/emoji/{cantidad}")
    public String generarEmojisAleatorios(@PathVariable int cantidad) {
        if (cantidad <= 0) {
            return "Error: La cantidad debe ser mayor a 0";
        }
        if (cantidad > emojis.size()) {
            return "Error: La cantidad máxima es " + emojis.size();
        }
        List<String> copia = new ArrayList<>(emojis);
        Collections.shuffle(copia);
        return cantidad + " emojis aleatorios: " + String.join(" ", copia.subList(0, cantidad));
    }

    @GetMapping("/info")
    public String info() {
        return "Controlador Varios - Endpoints: /random, /random/param, /random/{maximo}, /random/rango, /saludar, /estudiantes, /emoji";
    }

    // ------------------ NUEVOS ENDPOINTS EXTENDIDOS ------------------

    /**
     * Genera múltiples números aleatorios en lista
     * Ejemplo: /api/varios/random/lista?cantidad=5&maximo=50
     */
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

    /**
     * Respuesta JSON con más datos del random
     * Ejemplo: /api/varios/random/json?maximo=50
     */
    @GetMapping(value = "/random/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> generarRandomJson(@RequestParam(defaultValue = "100") int maximo) {
        int numero = random.nextInt(maximo + 1);
        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("numero", numero);
        respuesta.put("rango", "0 - " + maximo);
        respuesta.put("timestamp", new Date());
        return respuesta;
    }

    /**
     * Devuelve estudiantes Marvel en JSON
     */
    @GetMapping(value = "/estudiantes/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> generarEstudiantesMarvelJson() {
        List<String> personajesMarvel = Arrays.asList(
                "Spider-Man", "Iron Man", "Thor", "Hulk", "Black Panther",
                "Doctor Strange", "Scarlet Witch", "Vision", "Ant-Man", "Wasp",
                "Falcon", "Winter Soldier", "Hawkeye", "Captain Marvel", "Gamora"
        );
        Collections.shuffle(personajesMarvel);
        return personajesMarvel.subList(0, 7);
    }

    /**
     * Emoji en JSON
     */
    @GetMapping(value = "/emoji/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> generarEmojiJson() {
        String emoji = emojis.get(random.nextInt(emojis.size()));
        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("emoji", emoji);
        respuesta.put("descripcion", "Emoji aleatorio generado desde lista interna");
        return respuesta;
    }

    /**
     * Saludo JSON estructurado
     */
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
