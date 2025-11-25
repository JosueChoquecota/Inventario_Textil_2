/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.DetalleCompra;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ASUS
 */
@Repository
public interface DetalleCompraRepository extends JpaRepository <DetalleCompra, Integer>{
   // ✅ Obtener detalles de una compra
    List<DetalleCompra> findByCompraIdCompra(Integer idCompra);
    
    // ✅ Eliminar detalles de una compra
    @Modifying
    @Query("DELETE FROM DetalleCompra dc WHERE dc.compra.idCompra = :idCompra")
    void deleteByCompraIdCompra(Integer idCompra);
}
