/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import jakarta.transaction.Transactional;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TrabajadorUserDetailsService implements UserDetailsService {

    private final TrabajadorRepository trabajadorRepository;

    @Autowired // Opcional si solo hay un constructor
    public TrabajadorUserDetailsService(TrabajadorRepository trabajadorRepository) {
        this.trabajadorRepository = trabajadorRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // En tu caso, el "username" es el correo electrónico
        String correo = username;

        // 1. Buscar al trabajador por correo
        Trabajador trabajador = trabajadorRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("No se encontró usuario con el correo: " + correo));

        // 2. Verificar estado (opcional pero recomendado)
        if (!trabajador.getEstado()) {
            throw new UsernameNotFoundException("La cuenta está deshabilitada: " + correo);
        }

        // 3. Crear la lista de Autoridades (Roles)
        // Spring Security necesita los roles con el prefijo "ROLE_"
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + trabajador.getRol().getNombreRol());

        // 4. Devolver el objeto "User" de Spring Security
        // Spring se encargará de verificar la contraseña
        return new org.springframework.security.core.userdetails.User(
                trabajador.getCorreo(),        // El username (correo)
                trabajador.getContrasena(),    // ¡La contraseña ENCRIPTADA de la BD!
                Collections.singletonList(authority) // La lista de roles
        );
    }
}