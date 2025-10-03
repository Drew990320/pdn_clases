package com.parcial.pdn_clases_parcial.Controller.playground;


import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/playground")
public class PlaygroundController {

    /**
     * Endpoint básico: retorna un mensaje de bienvenida
     * http://localhost:8080/api/playground
     */
    @GetMapping
    public String home() {
        return "Bienvenido al Playground Controller 🚀 - aquí puedes probar varias cosas.";
    }

    /**
     * Concatenar dos textos (query params)
     * http://localhost:8080/api/playground/concat?texto1=Hola&texto2=Mundo
     */
    @GetMapping("/concat")
    public String concatenar(@RequestParam String texto1,
                             @RequestParam String texto2) {
        return "Resultado: " + texto1 + " " + texto2;
    }

    /**
     * Generar una lista de números aleatorios
     * http://localhost:8080/api/playground/random?cantidad=5
     */
    @GetMapping("/random")
    public List<Integer> numerosAleatorios(@RequestParam(defaultValue = "5") int cantidad) {
        Random rand = new Random();
        List<Integer> numeros = new ArrayList<>();
        for (int i = 0; i < cantidad; i++) {
            numeros.add(rand.nextInt(100) + 1); // números del 1 al 100
        }
        return numeros;
    }

    /**
     * Invertir una cadena usando path variable
     * http://localhost:8080/api/playground/reverse/HolaMundo
     */
    @GetMapping("/reverse/{texto}")
    public String invertirTexto(@PathVariable String texto) {
        return "Texto original: " + texto + " | Texto invertido: " + new StringBuilder(texto).reverse();
    }

    /**
     * Calcular factorial de un número
     * http://localhost:8080/api/playground/factorial/5
     */
    @GetMapping("/factorial/{numero}")
    public String factorial(@PathVariable int numero) {
        if (numero < 0) return "Error: el número debe ser >= 0";

        long resultado = 1;
        for (int i = 1; i <= numero; i++) {
            resultado *= i;
        }
        return "El factorial de " + numero + " es " + resultado;
    }

    /**
     * Jugar con listas de colores
     * http://localhost:8080/api/playground/colores
     */
    @GetMapping("/colores")
    public List<String> colores() {
        return Arrays.asList("Rojo", "Verde", "Azul", "Amarillo", "Naranja", "Morado");
    }

    /**
     * Info de los endpoints disponibles
     * http://localhost:8080/api/playground/info
     */
    @GetMapping("/info")
    public String info() {
        return "PlaygroundController - Endpoints: /concat, /random, /reverse/{texto}, /factorial/{numero}, /colores";
    }
}
