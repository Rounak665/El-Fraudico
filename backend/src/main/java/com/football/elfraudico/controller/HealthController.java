package com.football.elfraudico.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/health")
    public String healthCheck() {
        System.out.println("Health check endpoint hit");
        return "El Fraudico is alive ⚽";
    }
}
