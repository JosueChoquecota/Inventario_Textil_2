package com.utp.integradorspringboot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
     @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expone la carpeta uploads para que el navegador pueda acceder
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }   
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permite todas las rutas del backend
                .allowedOrigins("http://localhost:5173") // Tu frontend (React, Vite, etc.)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Cabeceras permitidas
                .allowCredentials(true); // Permite el uso de cookies o credenciales
    }
}
