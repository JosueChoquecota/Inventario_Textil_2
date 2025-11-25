/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Producto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ASUS
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    @Query("SELECT DISTINCT p FROM Producto p " +
           "LEFT JOIN FETCH p.categoria " +
           "LEFT JOIN FETCH p.marca")
    List<Producto> findAllWithRelaciones();
    
    @Query("SELECT p FROM Producto p " +
           "LEFT JOIN FETCH p.categoria " +
           "LEFT JOIN FETCH p.marca " +
           "WHERE p.idProducto = :id")
    Optional<Producto> findByIdWithRelaciones(@Param("id") Integer id);
}

