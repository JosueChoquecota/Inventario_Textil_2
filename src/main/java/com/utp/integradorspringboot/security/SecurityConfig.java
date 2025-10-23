/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.security;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.utp.integradorspringboot.services.TrabajadorUserDetailsService;

@Configuration
@EnableWebSecurity // Add this annotation for Spring Security configuration
@RequiredArgsConstructor
public class SecurityConfig {

    // Injected via constructor
    
    private final TrabajadorUserDetailsService userDetailesService;

    public SecurityConfig(TrabajadorUserDetailsService userDetailesService) {
        this.userDetailesService = userDetailesService;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // REMOVED the outdated authManager Bean

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    HttpMethod.POST, "/api/v1/trabajadores/registrar" 
                ).permitAll()
                .requestMatchers( // Other public paths
                    "/login",
                    "/register", // If you have a separate registration page/controller
                    "/css/**",
                    "/js/**",
                    "/vendor/**", // **Allow access to vendor files (icons!)**
                    "/img/**"  // Allow access to images if needed
                ).permitAll()
                // Role/Authority restricted paths
                .requestMatchers("/inventario/**")
                    .hasAnyAuthority("ROLE_Administrador", "ROLE_Trabajador")
                // All other requests must be authenticated
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true) 
                .failureUrl("/login?error=true")
                .permitAll() 
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout=true") 
                .invalidateHttpSession(true) 
                .deleteCookies("JSESSIONID") 
                .permitAll() 
            );

        return http.build();
    }
}