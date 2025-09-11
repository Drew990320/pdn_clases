package com.clasepdn.proyecto.Controller;

import java.util.Random;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador Varios - Endpoints diversos
 * 
 * Endpoints disponibles:
 * - Número aleatorio: /api/varios/random o /api/varios/random/100
 * - Saludo: /api/varios/saludar?nombre=Juan&edad=25 o /api/varios/saludar/Juan/25
 * - Estudiantes Marvel: /api/varios/estudiantes
 * - Emojis aleatorios: /api/varios/emoji o /api/varios/emoji/5
 * - Info: /api/varios/info
 */
@RestController
@RequestMapping("/api/varios")
public class VariosController {

    private Random random = new Random();
    
    // Variable privada con emojis
    private final List<String> emojis = Arrays.asList(
        "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
        "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
        "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
        "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
        "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
        "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😯", "😦", "😧",
        "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢",
        "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "💩", "👻", "💀",
        "☠️", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽",
        "🙀", "😿", "😾", "🙈", "🙉", "🙊", "🐵", "🐒", "🦍", "🦧",
        "🐶", "🐕", "🦮", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🦁",
        "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🐮", "🐂",
        "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪",
        "🐫", "🦙", "🦒", "🐘", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹",
        "🐰", "🐇", "🐿️", "🦔", "🦇", "🐻", "🐨", "🐼", "🦥", "🦦",
        "🦡", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️",
        "🦅", "🦆", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛",
        "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷️", "🕸️", "🦂", "🐢",
        "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡",
        "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓",
        "🦍", "🐘", "🦏", "🐪", "🐫", "🦙", "🦒", "🐃", "🐂", "🐄",
        "🐎", "🐖", "🐏", "🐑", "🦌", "🐕", "🐩", "🦮", "🐈", "🐓",
        "🦃", "🦚", "🦜", "🦢", "🦩", "🕊️", "🦝", "🦨", "🦡", "🦫",
        "🦦", "🦥", "🐁", "🐀", "🐇", "🐿️", "🦔", "🐉", "🐲", "🌵",
        "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘️", "🍀", "🎍", "🎋",
        "🍃", "🍂", "🍁", "🍄", "🌾", "💐", "🌷", "🌹", "🥀", "🌺",
        "🌻", "🌼", "🌸", "🌼", "🌻", "🌺", "🌹", "🌷", "🌼", "🌻",
        "🌺", "🌹", "🌷", "🌼", "🌻", "🌺", "🌹", "🌷", "🌼", "🌻"
    );

    /**
     * Genera un número aleatorio entre 0 y 100 (por defecto)
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/random
     * Resultado: "Número aleatorio: 42"
     */
    @GetMapping("/random")
    public String generarRandom() {
        int numero = random.nextInt(101); // 0 a 100
        return "Número aleatorio: " + numero;
    }

    /**
     * Genera un número aleatorio entre 0 y el máximo especificado
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/random?maximo=50
     * Resultado: "Número aleatorio entre 0 y 50: 23"
     */
    @GetMapping("/random/param")
    public String generarRandomConParametro(@RequestParam(defaultValue = "100") int maximo) {
        int numero = random.nextInt(maximo + 1); // 0 a maximo (inclusive)
        return "Número aleatorio entre 0 y " + maximo + ": " + numero;
    }

    /**
     * Genera un número aleatorio entre 0 y el máximo especificado en la URL
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/random/50
     * Resultado: "Número aleatorio entre 0 y 50: 23"
     */
    @GetMapping("/random/{maximo}")
    public String generarRandomPath(@PathVariable int maximo) {
        int numero = random.nextInt(maximo + 1); // 0 a maximo (inclusive)
        return "Número aleatorio entre 0 y " + maximo + ": " + numero;
    }

    /**
     * Genera un número aleatorio en un rango específico
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/random/rango?minimo=10&maximo=20
     * Resultado: "Número aleatorio entre 10 y 20: 15"
     */
    @GetMapping("/random/rango")
    public String generarRandomRango(@RequestParam(defaultValue = "0") int minimo,
                                   @RequestParam(defaultValue = "100") int maximo) {
        if (minimo > maximo) {
            return "Error: El mínimo no puede ser mayor que el máximo";
        }
        int numero = random.nextInt(maximo - minimo + 1) + minimo;
        return "Número aleatorio entre " + minimo + " y " + maximo + ": " + numero;
    }

    /**
     * Saluda a una persona con su nombre y edad usando query parameters
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/saludar?nombre=Juan&edad=25
     * Resultado: "Hola tienes Juan y 25"
     */
    @GetMapping("/saludar")
    public String saludar(@RequestParam(defaultValue = "Usuario") String nombre,
                         @RequestParam(defaultValue = "0") int edad) {
        return "Hola tienes " + nombre + " y " + edad;
    }

    /**
     * Saluda a una persona con su nombre y edad usando path variables
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/saludar/Juan/25
     * Resultado: "Hola tienes Juan y 25"
     */
    @GetMapping("/saludar/{nombre}/{edad}")
    public String saludarPath(@PathVariable String nombre, @PathVariable int edad) {
        return "Hola tienes " + nombre + " y " + edad;
    }

    /**
     * Genera una lista de 13 nombres aleatorios de personajes de Marvel
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/estudiantes
     * Resultado: Lista de 13 nombres aleatorios de Marvel
     */
    @GetMapping("/estudiantes")
    public String generarEstudiantesMarvel() {
        List<String> personajesMarvel = Arrays.asList(
            "Spider-Man", "Iron Man", "Captain America", "Thor", "Black Widow",
            "Hulk", "Black Panther", "Doctor Strange", "Scarlet Witch", "Vision",
            "Ant-Man", "Wasp", "Falcon", "Winter Soldier", "Hawkeye",
            "Captain Marvel", "Gamora", "Drax", "Rocket Raccoon", "Groot",
            "Star-Lord", "Mantis", "Nebula", "Shuri", "Okoye",
            "Valkyrie", "Korg", "Miek", "Wong", "M'Baku",
            "Nakia", "T'Challa", "Bucky Barnes", "Sam Wilson", "Wanda Maximoff",
            "Pietro Maximoff", "Loki", "Heimdall", "Frigga", "Odin",
            "Jane Foster", "Darcy Lewis", "Erik Selvig", "Pepper Potts", "Happy Hogan"
        );
        
        // Crear una copia de la lista para no modificar la original
        List<String> listaAleatoria = new ArrayList<>(personajesMarvel);
        
        // Mezclar la lista
        Collections.shuffle(listaAleatoria);
        
        // Tomar los primeros 13 elementos
        List<String> estudiantesSeleccionados = listaAleatoria.subList(0, 13);
        
        // Construir la respuesta
        StringBuilder respuesta = new StringBuilder();
        respuesta.append("Lista de 13 estudiantes (personajes de Marvel):\n\n");
        
        for (int i = 0; i < estudiantesSeleccionados.size(); i++) {
            respuesta.append((i + 1)).append(". ").append(estudiantesSeleccionados.get(i)).append("\n");
        }
        
        return respuesta.toString();
    }

    /**
     * Genera un emoji aleatorio de la lista privada de emojis
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/emoji
     * Resultado: "Emoji aleatorio: 😀"
     */
    @GetMapping("/emoji")
    public String generarEmojiAleatorio() {
        String emoji = emojis.get(random.nextInt(emojis.size()));
        return "Emoji aleatorio: " + emoji;
    }

    /**
     * Genera múltiples emojis aleatorios de la lista privada
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/emoji/5
     * Resultado: "5 emojis aleatorios: 😀 😃 😄 😁 😆"
     */
    @GetMapping("/emoji/{cantidad}")
    public String generarEmojisAleatorios(@PathVariable int cantidad) {
        if (cantidad <= 0) {
            return "Error: La cantidad debe ser mayor a 0";
        }
        if (cantidad > emojis.size()) {
            return "Error: La cantidad máxima es " + emojis.size();
        }
        
        // Crear una copia de la lista de emojis y mezclarla
        List<String> emojisAleatorios = new ArrayList<>(emojis);
        Collections.shuffle(emojisAleatorios);
        
        // Tomar la cantidad especificada
        List<String> emojisSeleccionados = emojisAleatorios.subList(0, cantidad);
        
        // Construir la respuesta
        StringBuilder respuesta = new StringBuilder();
        respuesta.append(cantidad).append(" emojis aleatorios: ");
        
        for (String emoji : emojisSeleccionados) {
            respuesta.append(emoji).append(" ");
        }
        
        return respuesta.toString().trim();
    }

    /**
     * Muestra información sobre los endpoints disponibles
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/varios/info
     * Resultado: "Controlador Varios - Endpoints disponibles: /random, /random/param, /random/{maximo}, /random/rango, /saludar, /estudiantes, /emoji"
     */
    @GetMapping("/info")
    public String info() {
        return "Controlador Varios - Endpoints disponibles: /random, /random/param, /random/{maximo}, /random/rango, /saludar, /estudiantes, /emoji";
    }
}
