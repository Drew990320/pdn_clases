package com.SpringSecurityJWT;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SpringSecurityJwtApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityJwtApplication.class, args);
    }

    private final PasswordEncoder passwordEncoder;

    public SpringSecurityJwtApplication(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    //todo 1:00:00 -> https://www.youtube.com/watch?v=735a83FQR2I
    //todo Generar password para script import
//    @Bean
//    public CommandLineRunner createPasswordsCommand() {
//        return args -> {
//            System.out.println(passwordEncoder.encode("1007912636"));
//            System.out.println(passwordEncoder.encode("60415654"));
//        };
//
//    }
}
