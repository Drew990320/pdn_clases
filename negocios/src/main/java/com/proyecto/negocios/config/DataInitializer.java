package com.proyecto.negocios.config;

import com.proyecto.negocios.domain.Usuario;
import com.proyecto.negocios.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Crear usuario administrador por defecto si no existe
        if (!usuarioRepository.existsByEmail("admin@cineflex.com")) {
            Usuario admin = new Usuario();
            admin.setEmail("admin@cineflex.com");
            admin.setNombre("Administrador");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setEnabled(true);
            usuarioRepository.save(admin);
            System.out.println("✅ Usuario administrador creado:");
            System.out.println("   Email: admin@cineflex.com");
            System.out.println("   Password: admin123");
        }

        // Crear usuario de prueba si no existe
        if (!usuarioRepository.existsByEmail("test@cineflex.com")) {
            Usuario test = new Usuario();
            test.setEmail("test@cineflex.com");
            test.setNombre("Usuario de Prueba");
            test.setPasswordHash(passwordEncoder.encode("test123"));
            test.setEnabled(true);
            usuarioRepository.save(test);
            System.out.println("✅ Usuario de prueba creado:");
            System.out.println("   Email: test@cineflex.com");
            System.out.println("   Password: test123");
        }
    }
}



