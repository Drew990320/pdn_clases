package com.SpringSecurityJWT.auth.service;

import com.SpringSecurityJWT.auth.entity.User;
import com.SpringSecurityJWT.auth.utils.TokenData;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JwtService {

    @Value("${security.jwt.permissions}")
    private String CLAIM_AUTHORITIES;

    @Value("${security.jwt.secret-key}")
    private String SECRET_KEY;

    @Value("${security.jwt.expiration-minutes}")
    private long EXPIRATION_MINUTES;

    // Generación del token
    public String generateToken(User user) {
        return Jwts.builder()
                .setClaims(buildExtraClaims(user))
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + Duration.ofMinutes(EXPIRATION_MINUTES).toMillis()))
                .signWith(generateKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Construcción de claims adicionales
    private Map<String, Object> buildExtraClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().getName()); // Guardamos el nombre del rol
        claims.put(CLAIM_AUTHORITIES, user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList())); // Guardamos las autoridades como una lista de strings
        return claims;
    }

    // Validación de token
    public boolean isTokenValid(String jwt, User user) {
        final String username = extractUsername(jwt);
        return username.equals(user.getUsername()) && !isTokenExpired(jwt);
    }

    // Extracción del nombre de usuario
    public String extractUsername(String jwt) {
        return extractAllClaims(jwt).getSubject();
    }

    // Verificación de expiración del token
    public boolean isTokenExpired(String jwt) {
        return extractAllClaims(jwt).getExpiration().before(new Date());
    }

    // Extracción de todos los claims
    private Claims extractAllClaims(String jwt) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(generateKey())
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (JwtException e) {
            throw new IllegalStateException("Token inválido: " + e.getMessage());
        }
    }

    // Generación de la clave para firmar el token
    private Key generateKey() {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extracción de las autoridades del token
    public List<GrantedAuthority> extractAuthorities(String jwt) {
        Claims claims = extractAllClaims(jwt);
        if (claims.get(CLAIM_AUTHORITIES) instanceof List<?> authoritiesList) {
            if (authoritiesList.isEmpty() || authoritiesList.get(0) instanceof String) {
                return authoritiesList.stream()
                        .map(String.class::cast)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
            }
        }
        throw new IllegalStateException("Las autoridades no están en el formato esperado.");
    }

    // Extracción de datos del token
    public TokenData extractTokenData(String jwt) {
        Claims claims = extractAllClaims(jwt);
        return new TokenData(
                claims.getSubject(),
                extractAuthorities(jwt)
        );
    }
}