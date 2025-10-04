package com.SpringSecurityJWT.auth.service;

import com.SpringSecurityJWT.auth.dto.AuthenticationRequest;
import com.SpringSecurityJWT.auth.dto.AuthenticationResponse;
import com.SpringSecurityJWT.auth.entity.User;
import com.SpringSecurityJWT.auth.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthenticationService(AuthenticationManager authenticationManager, UserRepository userRepository, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthenticationResponse login(@Valid AuthenticationRequest request) {

        // Autenticación del usuario con los detalles proporcionados
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        authenticationManager.authenticate(authenticationToken);

        // Buscar el usuario en la base de datos
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generar el token JWT utilizando el servicio JwtService
        String jwt = jwtService.generateToken(user);

        // Retornar la respuesta con el JWT generado
        return new AuthenticationResponse(jwt);
    }
}
