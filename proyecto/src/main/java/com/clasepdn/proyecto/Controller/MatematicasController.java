package com.clasepdn.proyecto.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador de Matemáticas
 * 
 * Endpoints disponibles:
 * - Suma: /api/matematicas/suma?a=5&b=3 o /api/matematicas/suma/5/3
 * - Resta: /api/matematicas/resta?a=10&b=4 o /api/matematicas/resta/10/4
 * - Multiplicación: /api/matematicas/multiplicacion?a=6&b=7 o /api/matematicas/multiplicacion/6/7
 * - Cuadrado: /api/matematicas/cuadrado?numero=8 o /api/matematicas/cuadrado/8
 * - Info: /api/matematicas/info
 */
@RestController
@RequestMapping("/api/matematicas")
public class MatematicasController {

    /**
     * Suma dos números usando query parameters
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/suma?a=15&b=25
     * Resultado: "La suma de 15.0 + 25.0 = 40.0"
     */
    @GetMapping("/suma")
    public String sumar(@RequestParam(defaultValue = "0") double a, 
                       @RequestParam(defaultValue = "0") double b) {
        double resultado = a + b;
        return "La suma de " + a + " + " + b + " = " + resultado;
    }

    /**
     * Suma dos números usando path variables
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/suma/15/25
     * Resultado: "La suma de 15.0 + 25.0 = 40.0"
     */
    @GetMapping("/suma/{a}/{b}")
    public String sumarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a + b;
        return "La suma de " + a + " + " + b + " = " + resultado;
    }

    /**
     * Resta dos números usando query parameters
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/resta?a=50&b=20
     * Resultado: "La resta de 50.0 - 20.0 = 30.0"
     */
    @GetMapping("/resta")
    public String restar(@RequestParam(defaultValue = "0") double a, 
                        @RequestParam(defaultValue = "0") double b) {
        double resultado = a - b;
        return "La resta de " + a + " - " + b + " = " + resultado;
    }

    /**
     * Resta dos números usando path variables
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/resta/50/20
     * Resultado: "La resta de 50.0 - 20.0 = 30.0"
     */
    @GetMapping("/resta/{a}/{b}")
    public String restarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a - b;
        return "La resta de " + a + " - " + b + " = " + resultado;
    }

    /**
     * Multiplica dos números usando query parameters
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/multiplicacion?a=8&b=9
     * Resultado: "La multiplicación de 8.0 × 9.0 = 72.0"
     */
    @GetMapping("/multiplicacion")
    public String multiplicar(@RequestParam(defaultValue = "0") double a, 
                            @RequestParam(defaultValue = "0") double b) {
        double resultado = a * b;
        return "La multiplicación de " + a + " × " + b + " = " + resultado;
    }

    /**
     * Multiplica dos números usando path variables
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/multiplicacion/8/9
     * Resultado: "La multiplicación de 8.0 × 9.0 = 72.0"
     */
    @GetMapping("/multiplicacion/{a}/{b}")
    public String multiplicarPath(@PathVariable double a, @PathVariable double b) {
        double resultado = a * b;
        return "La multiplicación de " + a + " × " + b + " = " + resultado;
    }

    /**
     * Calcula el cuadrado de un número usando query parameter
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/cuadrado?numero=12
     * Resultado: "El cuadrado de 12.0 = 12.0² = 144.0"
     */
    @GetMapping("/cuadrado")
    public String cuadrado(@RequestParam(defaultValue = "0") double numero) {
        double resultado = numero * numero;
        return "El cuadrado de " + numero + " = " + numero + "² = " + resultado;
    }

    /**
     * Calcula el cuadrado de un número usando path variable
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/cuadrado/12
     * Resultado: "El cuadrado de 12.0 = 12.0² = 144.0"
     */
    @GetMapping("/cuadrado/{numero}")
    public String cuadradoPath(@PathVariable double numero) {
        double resultado = numero * numero;
        return "El cuadrado de " + numero + " = " + numero + "² = " + resultado;
    }

    /**
     * Muestra información sobre los endpoints disponibles
     * 
     * Ejemplo en navegador:
     * http://localhost:8080/api/matematicas/info
     * Resultado: "Controlador de Matemáticas - Endpoints disponibles: /suma, /resta, /multiplicacion, /cuadrado"
     */
    @GetMapping("/info")
    public String info() {
        return "Controlador de Matemáticas - Endpoints disponibles: /suma, /resta, /multiplicacion, /cuadrado";
    }
}
