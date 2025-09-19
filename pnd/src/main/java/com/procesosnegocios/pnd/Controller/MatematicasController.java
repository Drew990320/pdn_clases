package com.procesosnegocios.pnd.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * MatematicasController - Controlador para operaciones matemáticas
 * 
 * 🧪 CÓMO PROBAR EN POSTMAN:
 * 
 * 1. Configura el Environment con base_url = http://localhost:8080
 * 2. Crea requests GET con estas URLs:
 * 
 * 📋 ENDPOINTS DISPONIBLES:
 * - GET /api/matematicas/suma → Suma con query parameters
 * - GET /api/matematicas/suma/{a}/{b} → Suma con path variables
 * - GET /api/matematicas/resta → Resta con query parameters
 * - GET /api/matematicas/resta/{a}/{b} → Resta con path variables
 * - GET /api/matematicas/multiplicacion → Multiplicación con query parameters
 * - GET /api/matematicas/multiplicacion/{a}/{b} → Multiplicación con path variables
 * - GET /api/matematicas/cuadrado → Cuadrado con query parameter
 * - GET /api/matematicas/cuadrado/{numero} → Cuadrado con path variable
 * - GET /api/matematicas/info → Información del controlador
 * 
 * 🔗 URLs COMPLETAS PARA POSTMAN (QUERY PARAMETERS):
 * - http://localhost:8080/api/matematicas/suma?a=15&b=25
 * - http://localhost:8080/api/matematicas/resta?a=50&b=20
 * - http://localhost:8080/api/matematicas/multiplicacion?a=8&b=9
 * - http://localhost:8080/api/matematicas/cuadrado?numero=12
 * - http://localhost:8080/api/matematicas/info
 * 
 * 🔗 URLs COMPLETAS PARA POSTMAN (PATH VARIABLES):
 * - http://localhost:8080/api/matematicas/suma/15/25
 * - http://localhost:8080/api/matematicas/resta/50/20
 * - http://localhost:8080/api/matematicas/multiplicacion/8/9
 * - http://localhost:8080/api/matematicas/cuadrado/12
 * 
 * ✅ RESPUESTAS ESPERADAS:
 * - /api/matematicas/suma/15/25 → "La suma de 15.0 + 25.0 = 40.0"
 * - /api/matematicas/cuadrado/12 → "El cuadrado de 12.0 = 12.0² = 144.0"
 * - /api/matematicas/info → "Controlador de Matemáticas - Endpoints disponibles: /suma, /resta, /multiplicacion, /cuadrado"
 * 
 * 🎯 TIPS PARA POSTMAN:
 * - Todos son GET requests (no necesitan body)
 * - Query parameters: ?a=15&b=25
 * - Path variables: /15/25
 * - Respuestas en texto plano
 * - Prueba con diferentes números para ver los resultados
 * 
 * 🌐 CÓMO PROBAR EN EL EXPLORADOR:
 * 1. Ejecuta la aplicación con: ./mvnw spring-boot:run
 * 2. Abre tu navegador web
 * 3. Copia y pega estas URLs en la barra de direcciones:
 * 
 * 📊 QUERY PARAMETERS (fácil de modificar):
 *    - http://localhost:8080/api/matematicas/suma?a=15&b=25
 *    - http://localhost:8080/api/matematicas/resta?a=50&b=20
 *    - http://localhost:8080/api/matematicas/multiplicacion?a=8&b=9
 *    - http://localhost:8080/api/matematicas/cuadrado?numero=12
 *    - http://localhost:8080/api/matematicas/info
 * 
 * 🔢 PATH VARIABLES (cambia los números en la URL):
 *    - http://localhost:8080/api/matematicas/suma/15/25
 *    - http://localhost:8080/api/matematicas/resta/50/20
 *    - http://localhost:8080/api/matematicas/multiplicacion/8/9
 *    - http://localhost:8080/api/matematicas/cuadrado/12
 * 
 * 💡 TIP: Cambia los números en las URLs para probar diferentes cálculos
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
