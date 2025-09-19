package com.procesosnegocios.pnd.Controller.playground;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * PlaygroundController - Controlador CRUD para personajes de Marvel
 * 
 * 🧪 CÓMO PROBAR EN POSTMAN:
 * 
 * 1. Configura el Environment con base_url = http://localhost:8080
 * 2. Crea requests con estos métodos y URLs:
 * 
 * 📋 ENDPOINTS DISPONIBLES:
 * - GET /api/playground/crud → Obtener todos los personajes
 * - GET /api/playground/crud/{index} → Obtener personaje por índice
 * - POST /api/playground/crud → Agregar nuevo personaje
 * - PUT /api/playground/crud/{index} → Actualizar personaje existente
 * - DELETE /api/playground/crud/{index} → Eliminar personaje específico
 * - DELETE /api/playground/crud → Eliminar todos los personajes
 * 
 * 🔗 URLs COMPLETAS PARA POSTMAN:
 * - GET http://localhost:8080/api/playground/crud
 * - GET http://localhost:8080/api/playground/crud/0
 * - POST http://localhost:8080/api/playground/crud
 * - PUT http://localhost:8080/api/playground/crud/0
 * - DELETE http://localhost:8080/api/playground/crud/0
 * - DELETE http://localhost:8080/api/playground/crud
 * 
 * 📝 BODY PARA POST/PUT (JSON):
 * {
 *   "personaje": "Deadpool"
 * }
 * 
 * ✅ RESPUESTAS ESPERADAS:
 * - GET /api/playground/crud → Lista JSON de todos los personajes
 * - GET /api/playground/crud/0 → "Spider-Man" (primer personaje)
 * - POST → {"mensaje": "Personaje agregado exitosamente", "personaje": "Deadpool", "total": 46}
 * - PUT → {"mensaje": "Personaje actualizado exitosamente", "personaje_anterior": "Spider-Man", "personaje_nuevo": "Deadpool", "indice": 0}
 * - DELETE → {"mensaje": "Personaje eliminado exitosamente", "personaje_eliminado": "Spider-Man", "indice": 0, "total_restante": 44}
 * 
 * 🎯 TIPS PARA POSTMAN:
 * - GET requests: No necesitan body ni headers especiales
 * - POST/PUT requests: Necesitan header "Content-Type: application/json"
 * - DELETE requests: No necesitan body
 * - Respuestas en formato JSON
 * - Los índices empiezan en 0
 * - Prueba primero GET para ver los personajes disponibles
 * 
 * 🌐 CÓMO PROBAR EN EL EXPLORADOR (solo GET requests):
 * 1. Ejecuta la aplicación con: ./mvnw spring-boot:run
 * 2. Abre tu navegador web
 * 3. Copia y pega estas URLs en la barra de direcciones:
 * 
 * 📋 VER PERSONAJES:
 *    - http://localhost:8080/api/playground/crud
 *      (Muestra todos los personajes en formato JSON)
 * 
 * 👤 VER PERSONAJE ESPECÍFICO:
 *    - http://localhost:8080/api/playground/crud/0
 *      (Muestra el primer personaje: "Spider-Man")
 *    - http://localhost:8080/api/playground/crud/1
 *      (Muestra el segundo personaje: "Iron Man")
 *    - http://localhost:8080/api/playground/crud/2
 *      (Muestra el tercer personaje: "Captain America")
 * 
 * ⚠️ NOTA: Para POST, PUT y DELETE necesitas usar Postman o curl
 *    porque requieren enviar datos JSON en el body
 */
@RestController
@RequestMapping("/api/playground/crud")
public class PlaygroundController {

    private List<String> personajesMarvel = new ArrayList<>(List.of(
            "Spider-Man", "Iron Man", "Captain America", "Thor", "Black Widow",
            "Hulk", "Black Panther", "Doctor Strange", "Scarlet Witch", "Vision",
            "Ant-Man", "Wasp", "Falcon", "Winter Soldier", "Hawkeye",
            "Captain Marvel", "Gamora", "Drax", "Rocket Raccoon", "Groot",
            "Star-Lord", "Mantis", "Nebula", "Shuri", "Okoye",
            "Valkyrie", "Korg", "Miek", "Wong", "M'Baku",
            "Nakia", "T'Challa", "Bucky Barnes", "Sam Wilson", "Wanda Maximoff",
            "Pietro Maximoff", "Loki", "Heimdall", "Frigga", "Odin",
            "Jane Foster", "Darcy Lewis", "Erik Selvig", "Pepper Potts", "Happy Hogan"
    ));

    // GET - Obtener todos los personajes
    @GetMapping
    public ResponseEntity<List<String>> getPersonajesMarvel() {
        return ResponseEntity.ok(personajesMarvel);
    }

    // GET - Obtener un personaje por índice
    @GetMapping("/{index}")
    public ResponseEntity<String> getPersonajeByIndex(@PathVariable int index) {
        if (index >= 0 && index < personajesMarvel.size()) {
            return ResponseEntity.ok(personajesMarvel.get(index));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST - Agregar un nuevo personaje
    @PostMapping
    public ResponseEntity<Map<String, Object>> addPersonaje(@RequestBody Map<String, String> request) {
        String nuevoPersonaje = request.get("personaje");
        
        if (nuevoPersonaje == null || nuevoPersonaje.trim().isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "El campo 'personaje' es requerido y no puede estar vacío");
            return ResponseEntity.badRequest().body(error);
        }
        
        personajesMarvel.add(nuevoPersonaje.trim());
        
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Personaje agregado exitosamente");
        response.put("personaje", nuevoPersonaje.trim());
        response.put("total", personajesMarvel.size());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // PUT - Actualizar un personaje existente
    @PutMapping("/{index}")
    public ResponseEntity<Map<String, Object>> updatePersonaje(@PathVariable int index, @RequestBody Map<String, String> request) {
        String nuevoPersonaje = request.get("personaje");
        
        if (index < 0 || index >= personajesMarvel.size()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Índice fuera de rango");
            return ResponseEntity.notFound().build();
        }
        
        if (nuevoPersonaje == null || nuevoPersonaje.trim().isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "El campo 'personaje' es requerido y no puede estar vacío");
            return ResponseEntity.badRequest().body(error);
        }
        
        String personajeAnterior = personajesMarvel.get(index);
        personajesMarvel.set(index, nuevoPersonaje.trim());
        
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Personaje actualizado exitosamente");
        response.put("personaje_anterior", personajeAnterior);
        response.put("personaje_nuevo", nuevoPersonaje.trim());
        response.put("indice", index);
        
        return ResponseEntity.ok(response);
    }

    // DELETE - Eliminar un personaje
    @DeleteMapping("/{index}")
    public ResponseEntity<Map<String, Object>> deletePersonaje(@PathVariable int index) {
        if (index < 0 || index >= personajesMarvel.size()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Índice fuera de rango");
            return ResponseEntity.notFound().build();
        }
        
        String personajeEliminado = personajesMarvel.remove(index);
        
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Personaje eliminado exitosamente");
        response.put("personaje_eliminado", personajeEliminado);
        response.put("indice", index);
        response.put("total_restante", personajesMarvel.size());
        
        return ResponseEntity.ok(response);
    }

    // DELETE - Eliminar todos los personajes
    @DeleteMapping
    public ResponseEntity<Map<String, Object>> deleteAllPersonajes() {
        int totalEliminados = personajesMarvel.size();
        personajesMarvel.clear();
        
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Todos los personajes han sido eliminados");
        response.put("total_eliminados", totalEliminados);
        
        return ResponseEntity.ok(response);
    }
}
