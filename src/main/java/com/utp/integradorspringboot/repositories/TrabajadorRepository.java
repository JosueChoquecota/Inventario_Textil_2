/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Trabajador;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ASUS
 */
@Repository
public interface TrabajadorRepository  extends JpaRepository<Trabajador, Integer> {
    
    // Buscar trabajador por correo (para login)
    Optional<Trabajador> findByCorreo(String correo);

    // Verificar si un correo ya existe (para validación en registro)
    boolean existsByCorreo(String correo);
}

