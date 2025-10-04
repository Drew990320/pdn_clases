package com.SpringSecurityJWT.auth.config;

import com.SpringSecurityJWT.auth.config.security.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class HttpSecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter authenticationFilter;

    public HttpSecurityConfig(AuthenticationProvider authenticationProvider,
                              JwtAuthenticationFilter authenticationFilter) {
        this.authenticationProvider = authenticationProvider;
        this.authenticationFilter = authenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors().and() // 👈 habilitar CORS en Spring Security
                .sessionManagement(sessionMangConfig -> sessionMangConfig
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authConfig -> {

                    // Rutas públicas
                    authConfig.requestMatchers(HttpMethod.POST, "/auth/authenticate").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/auth/public-access").permitAll();
                    authConfig.requestMatchers("/error").permitAll();

                    // Rutas protegidas de productos
                    authConfig.requestMatchers(HttpMethod.GET, "/products").hasAuthority("READ_ALL_PRODUCTS");
                    authConfig.requestMatchers(HttpMethod.POST, "/products").hasAuthority("SAVE_ONE_PRODUCT");

                    // Rutas admin protegidas
                    authConfig.requestMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMINISTRATOR");
                    authConfig.requestMatchers(HttpMethod.POST, "/admin/**").hasRole("ADMINISTRATOR");

                    // Todo lo demás, denegado
                    authConfig.anyRequest().denyAll();
                });

        return http.build();
    }

    // ✅ Configuración de CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Cambia esto por la URL de tu frontend (React)
        configuration.setAllowedOrigins(List.of("http://localhost:5174"));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // permite enviar Authorization en headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
