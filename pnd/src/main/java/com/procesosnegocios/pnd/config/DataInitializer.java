package com.procesosnegocios.pnd.config;

import com.procesosnegocios.pnd.entity.User;
import com.procesosnegocios.pnd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Inicializador de datos para crear usuarios por defecto
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Crear usuario administrador por defecto si no existe
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Administrador del Sistema");
            admin.setEnabled(true);
            
            userRepository.save(admin);
            System.out.println("✅ Usuario administrador creado:");
            System.out.println("   Usuario: admin");
            System.out.println("   Contraseña: admin123");
        }
        
        // Crear usuario de prueba si no existe
        if (!userRepository.existsByUsername("usuario")) {
            User usuario = new User();
            usuario.setUsername("usuario");
            usuario.setEmail("usuario@example.com");
            usuario.setPassword(passwordEncoder.encode("usuario123"));
            usuario.setFullName("Usuario de Prueba");
            usuario.setEnabled(true);
            
            userRepository.save(usuario);
            System.out.println("✅ Usuario de prueba creado:");
            System.out.println("   Usuario: usuario");
            System.out.println("   Contraseña: usuario123");
        }
        
        System.out.println("🚀 Sistema de autenticación listo!");
        System.out.println("📱 Accede a: http://localhost:8080/login");
    }
}
