package com.procesosnegocios.pnd.controller;

import com.procesosnegocios.pnd.entity.User;
import com.procesosnegocios.pnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST para la API del frontend React
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class ApiController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Obtener perfil del usuario autenticado
     */
    @GetMapping("/user/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body(Map.of("error", "No autenticado"));
            }
            
            String username = authentication.getName();
            User user = userService.findByUsername(username);
            
            // Crear respuesta sin información sensible
            Map<String, Object> userProfile = new HashMap<>();
            userProfile.put("id", user.getId());
            userProfile.put("username", user.getUsername());
            userProfile.put("email", user.getEmail());
            userProfile.put("fullName", user.getFullName());
            userProfile.put("enabled", user.isEnabled());
            userProfile.put("createdAt", user.getCreatedAt());
            
            return ResponseEntity.ok(userProfile);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error al obtener perfil: " + e.getMessage()));
        }
    }
    
    /**
     * Verificar estado de autenticación
     */
    @GetMapping("/auth/status")
    public ResponseEntity<?> getAuthStatus(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        
        if (authentication != null && authentication.isAuthenticated()) {
            response.put("username", authentication.getName());
        }
        
        return ResponseEntity.ok(response);
    }
}
