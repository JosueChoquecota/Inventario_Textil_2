/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Trabajador;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ASUS
 */
@Repository
public interface TrabajadorRepository  extends JpaRepository<Trabajador, Integer> {
    Optional<Trabajador> findByCorreo(String correo);
    List<Trabajador> findByEstado(Boolean estado);
    boolean existsByNDocumento(String nDocumento);
    // ✅ AGREGAR ESTE MÉTODO
    Optional<Trabajador> findByNDocumento(String nDocumento);
    boolean existsByCorreo(String correo);
    boolean existsBynDocumento(String nDocumento);
    
}

