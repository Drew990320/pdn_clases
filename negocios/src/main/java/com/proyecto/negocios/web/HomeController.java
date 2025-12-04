package com.proyecto.negocios.web;

import com.cineflex.model.Reserva;
import com.cineflex.repository.ReservaRepository;
import com.proyecto.negocios.repository.ProductoRepository;
import com.proyecto.negocios.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin
public class HomeController {

    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReservaRepository reservaRepository;

    public HomeController(ProductoRepository productoRepository, 
                         UsuarioRepository usuarioRepository,
                         ReservaRepository reservaRepository) {
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
        this.reservaRepository = reservaRepository;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        return ResponseEntity.ok(Map.of(
                "message", "API CineFlex - Backend funcionando correctamente",
                "version", "1.0.0",
                "endpoints", Map.of(
                        "auth", "/api/auth/**",
                        "productos", "/api/productos/**",
                        "usuarios", "/api/usuarios/**",
                        "peliculas", "/api/peliculas/**",
                        "funciones", "/api/funciones/**",
                        "reservas", "/api/reservas/**",
                        "h2-console", "/h2-console"
                )
        ));
    }

    @GetMapping("/api/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        try {
            long totalProductos = productoRepository.count();
            long totalUsuarios = usuarioRepository.count();
            
            // Contar reservas activas (CREADA o PAGADA) usando stream
            long reservasActivas = reservaRepository.findAll().stream()
                    .filter(r -> r.getEstado() == Reserva.Estado.CREADA || r.getEstado() == Reserva.Estado.PAGADA)
                    .count();
            
            return ResponseEntity.ok(Map.of(
                    "totalProductos", totalProductos,
                    "totalUsuarios", totalUsuarios,
                    "reservasActivas", reservasActivas
            ));
        } catch (Exception e) {
            // En caso de error, retornar valores por defecto
            return ResponseEntity.ok(Map.of(
                    "totalProductos", 0L,
                    "totalUsuarios", 0L,
                    "reservasActivas", 0L
            ));
        }
    }
}

