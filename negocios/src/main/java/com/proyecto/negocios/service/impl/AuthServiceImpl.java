package com.proyecto.negocios.service.impl;

import com.proyecto.negocios.domain.Usuario;
import com.proyecto.negocios.dto.auth.ForgotPasswordRequest;
import com.proyecto.negocios.dto.auth.LoginRequest;
import com.proyecto.negocios.dto.auth.RegisterRequest;
import com.proyecto.negocios.dto.auth.ResetPasswordRequest;
import com.proyecto.negocios.repository.UsuarioRepository;
import com.proyecto.negocios.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Long register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        Usuario u = new Usuario();
        u.setEmail(request.getEmail());
        u.setNombre(request.getNombre());
        u.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        Usuario saved = usuarioRepository.save(u);
        return saved.getId();
    }

    @Override
    public Long login(LoginRequest request) {
        Usuario u = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado"));
        if (!passwordEncoder.matches(request.getPassword(), u.getPasswordHash())) {
            throw new IllegalArgumentException("Credenciales inválidas");
        }
        return u.getId();
    }

    @Override
    public String forgotPassword(ForgotPasswordRequest request) {
        Usuario u = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado"));
        String token = UUID.randomUUID().toString();
        u.setResetToken(token);
        u.setResetTokenExp(Instant.now().plus(30, ChronoUnit.MINUTES));
        usuarioRepository.save(u);
        // En producción, enviar email. Para pruebas, devolvemos el token.
        return token;
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        Usuario u = usuarioRepository.findByResetToken(request.getToken())
                .orElseThrow(() -> new NoSuchElementException("Token inválido"));
        if (u.getResetTokenExp() == null || Instant.now().isAfter(u.getResetTokenExp())) {
            throw new IllegalArgumentException("Token expirado");
        }
        u.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        u.setResetToken(null);
        u.setResetTokenExp(null);
        usuarioRepository.save(u);
    }
}


