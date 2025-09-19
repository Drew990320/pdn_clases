package com.procesosnegocios.pnd.service;

import com.procesosnegocios.pnd.entity.User;
import com.procesosnegocios.pnd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Servicio para manejo de usuarios
 */
@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        return user;
    }
    
    /**
     * Registrar un nuevo usuario
     */
    public User registerUser(User user) {
        // Verificar si el usuario ya existe
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }
        
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Encriptar la contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Guardar el usuario
        return userRepository.save(user);
    }
    
    /**
     * Buscar usuario por email
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }
    
    /**
     * Buscar usuario por nombre de usuario
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
    }
    
    /**
     * Generar token de reset de contraseña
     */
    public void generateResetToken(String email) {
        User user = findByEmail(email);
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // Token válido por 1 hora
        userRepository.save(user);
        
        // Aquí podrías enviar un email con el token
        // Por ahora solo lo guardamos en la base de datos
        System.out.println("Token de reset para " + email + ": " + token);
    }
    
    /**
     * Resetear contraseña con token
     */
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));
        
        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("El token ha expirado");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }
    
    /**
     * Verificar si el token es válido
     */
    public boolean isTokenValid(String token) {
        try {
            User user = userRepository.findByResetToken(token)
                    .orElseThrow(() -> new RuntimeException("Token inválido"));
            return user.getResetTokenExpiry().isAfter(LocalDateTime.now());
        } catch (Exception e) {
            return false;
        }
    }
}
