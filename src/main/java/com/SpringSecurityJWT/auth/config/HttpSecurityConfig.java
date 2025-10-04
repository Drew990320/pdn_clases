package com.SpringSecurityJWT.auth.config;

import com.SpringSecurityJWT.auth.config.security.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class HttpSecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter authenticationFilter;

    public HttpSecurityConfig(AuthenticationProvider authenticationProvider, JwtAuthenticationFilter authenticationFilter) {
        this.authenticationProvider = authenticationProvider;
        this.authenticationFilter = authenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionMangConfig -> sessionMangConfig
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authConfig -> {

                    // Configurar rutas públicas
                    authConfig.requestMatchers(HttpMethod.POST, "/auth/authenticate").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/auth/public-access").permitAll();
                    authConfig.requestMatchers("/error").permitAll();

                    // Configurar rutas protegidas para productos
                    authConfig.requestMatchers(HttpMethod.GET, "/products").hasAuthority("READ_ALL_PRODUCTS");
                    authConfig.requestMatchers(HttpMethod.POST, "/products").hasAuthority("SAVE_ONE_PRODUCT");

                    // Rutas de administración protegidas
                    authConfig.requestMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMINISTRATOR");
                    authConfig.requestMatchers(HttpMethod.POST, "/admin/**").hasRole("ADMINISTRATOR");

                    // Denegar todas las rutas no especificadas
                    authConfig.anyRequest().denyAll();
                });

        return http.build();
    }
}
