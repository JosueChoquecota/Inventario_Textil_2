/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Compra;
import java.time.LocalDate;
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
public interface CompraRepository extends JpaRepository <Compra, Integer> {
    /**
     * Buscar todas las compras ordenadas por fecha descendente (más reciente primero)
     */
    List<Compra> findAllByOrderByFechaDesc();
    
    /**
     * Buscar compras por proveedor
     */
    List<Compra> findByProveedorIdProveedor(Integer idProveedor);
    
    /**
     * Buscar compras por trabajador
     */
    List<Compra> findByTrabajadorIdTrabajador(Integer idTrabajador);
    
    /**
     * Buscar compras por rango de fechas
     */
    List<Compra> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
    
    /**
     * Obtener compra con todas las relaciones cargadas (EAGER)
     * Evita problemas de lazy loading
     */
    @Query("SELECT c FROM Compra c " +
           "LEFT JOIN FETCH c.proveedor " +
           "LEFT JOIN FETCH c.trabajador " +
           "WHERE c.idCompra = :id")
    Optional<Compra> findByIdWithDetails(@Param("id") Integer id);
    
    /**
     * Buscar compras de un proveedor por rango de fechas
     */
    @Query("SELECT c FROM Compra c " +
           "WHERE c.proveedor.idProveedor = :idProveedor " +
           "AND c.fecha BETWEEN :fechaInicio AND :fechaFin " +
           "ORDER BY c.fecha DESC")
    List<Compra> findByProveedorAndFechas(
        @Param("idProveedor") Integer idProveedor,
        @Param("fechaInicio") LocalDate fechaInicio,
        @Param("fechaFin") LocalDate fechaFin
    );
}
