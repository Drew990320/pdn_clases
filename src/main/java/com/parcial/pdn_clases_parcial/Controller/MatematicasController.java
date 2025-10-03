package com.parcial.pdn_clases_parcial.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.*;

/**
 * Controlador de Matemáticas (retrocompatible + nuevas funcionalidades)
 */
@RestController
@RequestMapping("/api/matematicas")
public class MatematicasController {

    // ------------------------
    // Endpoints originales (retrocompatibles)
    // ------------------------

    @GetMapping("/suma")
    public String sumar(@RequestParam(defaultValue = "0") double a,
                        @RequestParam(defaultValue = "0") double b) {
        double resultado = a + b;
        return "La suma de " + a + " + " + b + " = " + resultado;
    }

    @GetMapping("/suma/{a}/{b}")
    public String sumarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a + b;
        return "La suma de " + a + " + " + b + " = " + resultado;
    }

    @GetMapping("/resta")
    public String restar(@RequestParam(defaultValue = "0") double a,
                         @RequestParam(defaultValue = "0") double b) {
        double resultado = a - b;
        return "La resta de " + a + " - " + b + " = " + resultado;
    }

    @GetMapping("/resta/{a}/{b}")
    public String restarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a - b;
        return "La resta de " + a + " - " + b + " = " + resultado;
    }

    @GetMapping("/multiplicacion")
    public String multiplicar(@RequestParam(defaultValue = "0") double a,
                              @RequestParam(defaultValue = "0") double b) {
        double resultado = a * b;
        return "La multiplicación de " + a + " × " + b + " = " + resultado;
    }

    @GetMapping("/multiplicacion/{a}/{b}")
    public String multiplicarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a * b;
        return "La multiplicación de " + a + " × " + b + " = " + resultado;
    }

    @GetMapping("/cuadrado")
    public String cuadrado(@RequestParam(defaultValue = "0") double numero) {
        double resultado = numero * numero;
        return "El cuadrado de " + numero + " = " + numero + "² = " + resultado;
    }

    @GetMapping("/cuadrado/{numero}")
    public String cuadradoPath(@PathVariable double numero) {
        double resultado = numero * numero;
        return "El cuadrado de " + numero + " = " + numero + "² = " + resultado;
    }

    @GetMapping("/info")
    public String info() {
        return "Controlador de Matemáticas - Endpoints disponibles: /suma, /resta, /multiplicacion, /cuadrado";
    }

    // ------------------------
    // Nuevas funcionalidades
    // ------------------------

    // División segura
    @GetMapping("/division")
    public ResponseEntity<String> dividir(@RequestParam double a, @RequestParam double b) {
        if (b == 0) {
            return ResponseEntity.badRequest().body("Error: no se puede dividir por cero ❌");
        }
        double resultado = a / b;
        return ResponseEntity.ok("La división de " + a + " ÷ " + b + " = " + resultado);
    }

    // Potencia (a^b)
    @GetMapping("/potencia/{a}/{b}")
    public String potencia(@PathVariable double a, @PathVariable double b) {
        double resultado = Math.pow(a, b);
        return a + " ^ " + b + " = " + resultado;
    }

    // Raíz cuadrada
    @GetMapping("/raiz/{numero}")
    public ResponseEntity<String> raiz(@PathVariable double numero) {
        if (numero < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: no se puede calcular raíz de número negativo ❌");
        }
        double resultado = Math.sqrt(numero);
        return ResponseEntity.ok("La raíz cuadrada de " + numero + " = " + resultado);
    }

    // Factorial (simulación)
    @GetMapping("/factorial/{n}")
    public String factorial(@PathVariable int n) {
        long resultado = 1;
        for (int i = 1; i <= n; i++) {
            resultado *= i;
        }
        return "El factorial de " + n + " = " + resultado;
    }

    // Operaciones disponibles (JSON)
    @GetMapping("/operaciones")
    public ResponseEntity<Map<String, Object>> operacionesDisponibles() {
        Map<String, Object> info = new LinkedHashMap<>();
        info.put("suma", "GET /api/matematicas/suma?a=5&b=3");
        info.put("resta", "GET /api/matematicas/resta?a=10&b=4");
        info.put("multiplicacion", "GET /api/matematicas/multiplicacion?a=6&b=7");
        info.put("cuadrado", "GET /api/matematicas/cuadrado?numero=8");
        info.put("division", "GET /api/matematicas/division?a=10&b=2");
        info.put("potencia", "GET /api/matematicas/potencia/2/3");
        info.put("raiz", "GET /api/matematicas/raiz/16");
        info.put("factorial", "GET /api/matematicas/factorial/5");
        return ResponseEntity.ok(info);
    }
}

/*
    @GetMapping("/multiplicacion/{a}/{b}")
    public String multiplicarPath(@PathVariable double a, @PathVariable double b) {
        double resu
*/