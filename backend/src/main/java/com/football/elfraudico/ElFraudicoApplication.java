package com.football.elfraudico;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ElFraudicoApplication {

    public static void main(String[] args) {
        new EnvConfig();
        
        SpringApplication.run(ElFraudicoApplication.class, args);
    }

}
