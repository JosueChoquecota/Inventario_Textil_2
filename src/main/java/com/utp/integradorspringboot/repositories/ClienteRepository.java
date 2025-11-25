/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Cliente;
import com.utp.integradorspringboot.models.Trabajador;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ASUS
 */
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByCorreo(String correo);
    boolean existsByNDocumento(String nDocumento);
    Optional<Cliente> findByNDocumento(String nDocumento);


}
