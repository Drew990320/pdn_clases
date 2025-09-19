package com.procesosnegocios.pnd.repository;

import com.procesosnegocios.pnd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio para la entidad User
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Buscar usuario por nombre de usuario
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Buscar usuario por email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Verificar si existe un usuario con el nombre de usuario dado
     */
    boolean existsByUsername(String username);
    
    /**
     * Verificar si existe un usuario con el email dado
     */
    boolean existsByEmail(String email);
    
    /**
     * Buscar usuario por token de reset
     */
    Optional<User> findByResetToken(String resetToken);
}
