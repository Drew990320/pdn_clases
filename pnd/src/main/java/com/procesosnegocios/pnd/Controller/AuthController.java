package com.procesosnegocios.pnd.controller;

import com.procesosnegocios.pnd.entity.User;
import com.procesosnegocios.pnd.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador para manejo de autenticación
 */
@Controller
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Página de inicio - redirige a login
     */
    @GetMapping("/")
    public String home() {
        return "redirect:/login";
    }
    
    /**
     * Página de login
     */
    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error,
                       @RequestParam(value = "logout", required = false) String logout,
                       Model model) {
        if (error != null) {
            model.addAttribute("error", "Credenciales inválidas. Inténtalo de nuevo.");
        }
        if (logout != null) {
            model.addAttribute("message", "Has cerrado sesión exitosamente.");
        }
        return "auth/login";
    }
    
    /**
     * Página de registro
     */
    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new User());
        return "auth/register";
    }
    
    /**
     * Procesar registro
     */
    @PostMapping("/register")
    public String processRegister(@Valid @ModelAttribute("user") User user,
                                 BindingResult result,
                                 RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "auth/register";
        }
        
        try {
            userService.registerUser(user);
            redirectAttributes.addFlashAttribute("success", "Usuario registrado exitosamente. Puedes iniciar sesión.");
            return "redirect:/login";
        } catch (RuntimeException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/register";
        }
    }
    
    /**
     * Página de olvidé mi contraseña
     */
    @GetMapping("/forgot-password")
    public String forgotPassword() {
        return "auth/forgot-password";
    }
    
    /**
     * Procesar solicitud de reset de contraseña
     */
    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam("email") String email,
                                       RedirectAttributes redirectAttributes) {
        try {
            userService.generateResetToken(email);
            redirectAttributes.addFlashAttribute("success", 
                "Si el email existe, se ha enviado un enlace para resetear tu contraseña.");
        } catch (RuntimeException e) {
            // No revelamos si el email existe o no por seguridad
            redirectAttributes.addFlashAttribute("success", 
                "Si el email existe, se ha enviado un enlace para resetear tu contraseña.");
        }
        return "redirect:/forgot-password";
    }
    
    /**
     * Página de reset de contraseña
     */
    @GetMapping("/reset-password")
    public String resetPassword(@RequestParam("token") String token, Model model) {
        if (!userService.isTokenValid(token)) {
            model.addAttribute("error", "Token inválido o expirado.");
            return "auth/reset-password";
        }
        
        model.addAttribute("token", token);
        return "auth/reset-password";
    }
    
    /**
     * Procesar reset de contraseña
     */
    @PostMapping("/reset-password")
    public String processResetPassword(@RequestParam("token") String token,
                                      @RequestParam("password") String password,
                                      @RequestParam("confirmPassword") String confirmPassword,
                                      RedirectAttributes redirectAttributes) {
        if (!password.equals(confirmPassword)) {
            redirectAttributes.addFlashAttribute("error", "Las contraseñas no coinciden.");
            return "redirect:/reset-password?token=" + token;
        }
        
        try {
            userService.resetPassword(token, password);
            redirectAttributes.addFlashAttribute("success", "Contraseña actualizada exitosamente.");
            return "redirect:/login";
        } catch (RuntimeException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/reset-password?token=" + token;
        }
    }
    
    /**
     * Dashboard principal
     */
    @GetMapping("/dashboard")
    public String dashboard(Authentication authentication, Model model) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        model.addAttribute("user", user);
        return "dashboard/index";
    }
    
    /**
     * Página de acceso denegado
     */
    @GetMapping("/access-denied")
    public String accessDenied() {
        return "error/access-denied";
    }
    
    // ========== ENDPOINTS REST PARA REACT ==========
    
    /**
     * API REST para registro de usuarios
     */
    @PostMapping(value = "/api/register", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> apiRegister(@Valid @RequestBody User user) {
        try {
            userService.registerUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuario registrado exitosamente. Puedes iniciar sesión.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * API REST para solicitar reset de contraseña
     */
    @PostMapping(value = "/api/forgot-password", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> apiForgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            userService.generateResetToken(email);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Si el email existe, se ha enviado un enlace para resetear tu contraseña.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // No revelamos si el email existe o no por seguridad
            Map<String, String> response = new HashMap<>();
            response.put("message", "Si el email existe, se ha enviado un enlace para resetear tu contraseña.");
            return ResponseEntity.ok(response);
        }
    }
    
    /**
     * API REST para reset de contraseña
     */
    @PostMapping(value = "/api/reset-password", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> apiResetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String password = request.get("password");
            String confirmPassword = request.get("confirmPassword");
            
            if (!password.equals(confirmPassword)) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Las contraseñas no coinciden.");
                return ResponseEntity.badRequest().body(response);
            }
            
            userService.resetPassword(token, password);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Contraseña actualizada exitosamente.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
