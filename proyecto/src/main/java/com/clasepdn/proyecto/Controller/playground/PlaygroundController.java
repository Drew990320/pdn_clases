package com.clasepdn.proyecto.Controller.playground;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/playground")
@CrossOrigin(origins = "*")
public class PlaygroundController {

    // Simulación de base de datos en memoria
    private final Map<Long, Item> items = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    // Constructor para inicializar algunos datos de ejemplo
    public PlaygroundController() {
        // Agregar algunos items de ejemplo
        Item item1 = new Item(idCounter.getAndIncrement(), "Laptop", "Portátil gaming de alta gama", 1299.99);
        Item item2 = new Item(idCounter.getAndIncrement(), "Mouse", "Mouse inalámbrico ergonómico", 45.50);
        Item item3 = new Item(idCounter.getAndIncrement(), "Teclado", "Teclado mecánico RGB", 89.99);
        
        items.put(item1.getId(), item1);
        items.put(item2.getId(), item2);
        items.put(item3.getId(), item3);
    }

    // GET - Obtener todos los items
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> itemList = new ArrayList<>(items.values());
        return ResponseEntity.ok(itemList);
    }

    // GET - Obtener un item por ID
    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = items.get(id);
        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // GET - Buscar items por nombre
    @GetMapping("/items/search")
    public ResponseEntity<List<Item>> searchItemsByName(@RequestParam String name) {
        List<Item> foundItems = items.values().stream()
                .filter(item -> item.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
        return ResponseEntity.ok(foundItems);
    }

    // POST - Crear un nuevo item
    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody ItemRequest itemRequest) {
        if (itemRequest.getName() == null || itemRequest.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Long newId = idCounter.getAndIncrement();
        Item newItem = new Item(newId, itemRequest.getName(), itemRequest.getDescription(), itemRequest.getPrice());
        items.put(newId, newItem);

        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }

    // PUT - Actualizar un item existente
    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody ItemRequest itemRequest) {
        Item existingItem = items.get(id);
        if (existingItem == null) {
            return ResponseEntity.notFound().build();
        }

        if (itemRequest.getName() == null || itemRequest.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Actualizar el item existente
        existingItem.setName(itemRequest.getName());
        existingItem.setDescription(itemRequest.getDescription());
        existingItem.setPrice(itemRequest.getPrice());

        return ResponseEntity.ok(existingItem);
    }

    // DELETE - Eliminar un item
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        Item removedItem = items.remove(id);
        if (removedItem != null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE - Eliminar todos los items
    @DeleteMapping("/items")
    public ResponseEntity<Void> deleteAllItems() {
        items.clear();
        idCounter.set(1); // Resetear el contador de IDs
        return ResponseEntity.noContent().build();
    }

    // GET - Información del playground
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getPlaygroundInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", "Playground CRUD Controller");
        info.put("description", "Controlador de ejemplo para operaciones CRUD");
        info.put("totalItems", items.size());
        info.put("endpoints", List.of(
            "GET /api/playground/items - Obtener todos los items",
            "GET /api/playground/items/{id} - Obtener item por ID",
            "GET /api/playground/items/search?name={name} - Buscar items por nombre",
            "POST /api/playground/items - Crear nuevo item",
            "PUT /api/playground/items/{id} - Actualizar item",
            "DELETE /api/playground/items/{id} - Eliminar item",
            "DELETE /api/playground/items - Eliminar todos los items"
        ));
        return ResponseEntity.ok(info);
    }

    // Clase interna para representar un Item
    public static class Item {
        private Long id;
        private String name;
        private String description;
        private Double price;

        public Item() {}

        public Item(Long id, String name, String description, Double price) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
        }

        // Getters y Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }

        @Override
        public String toString() {
            return "Item{" +
                    "id=" + id +
                    ", name='" + name + '\'' +
                    ", description='" + description + '\'' +
                    ", price=" + price +
                    '}';
        }
    }

    // Clase para las peticiones de creación/actualización
    public static class ItemRequest {
        private String name;
        private String description;
        private Double price;

        public ItemRequest() {}

        public ItemRequest(String name, String description, Double price) {
            this.name = name;
            this.description = description;
            this.price = price;
        }

        // Getters y Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
    }
}
