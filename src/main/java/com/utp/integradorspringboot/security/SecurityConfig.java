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
import java.util.List;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    
    private final TrabajadorUserDetailsService userDetailsService;

    public SecurityConfig(TrabajadorUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOriginPatterns(List.of("http://localhost:5173"));
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                config.setAllowCredentials(true);
                return config;
            }))
            
            .authorizeHttpRequests(auth -> auth
                // Recursos estáticos públicos
                .requestMatchers("/vendor/**", "/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()
                
                // Endpoints de autenticación públicos
                .requestMatchers("/api/v1/auth/**").permitAll()
                
                // API protegida
                .requestMatchers("/api/v1/**").authenticated()
                
                // Todo lo demás requiere autenticación
                .anyRequest().authenticated()
            )
            
            // Deshabilitar form login de Spring (usaremos REST API)
            .formLogin(form -> form.disable())
            
            // Configurar logout personalizado
            .logout(logout -> logout
                .logoutUrl("/api/v1/auth/logout")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(200);
                    response.getWriter().write("{\"message\":\"Sesión cerrada correctamente\"}");
                })
            )
            
            .httpBasic(basic -> basic.disable())
            
            .authenticationProvider(authenticationProvider());

        return http.build();
    }
}