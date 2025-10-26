/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Proveedor;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ASUS
 */
public interface ProveedorRepository  extends JpaRepository<Proveedor, Integer>{
    Optional<Proveedor> findBynDocumento(Integer nDocumento); 
    boolean existsBynDocumento(Integer nDocumento);
}
