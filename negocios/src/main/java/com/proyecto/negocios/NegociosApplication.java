package com.proyecto.negocios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.proyecto.negocios", "com.cineflex"})
@EnableJpaRepositories(basePackages = {"com.proyecto.negocios.repository", "com.cineflex.repository"})
@EntityScan(basePackages = {"com.proyecto.negocios.domain", "com.cineflex.model"})
public class NegociosApplication {

    public static void main(String[] args) {
        SpringApplication.run(NegociosApplication.class, args);
    }
}



