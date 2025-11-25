/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.DetalleVenta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleVentaRepository extends JpaRepository <DetalleVenta, Integer>{
    
    List<DetalleVenta> findByVentaIdVenta(Integer idVenta);
    
    @Modifying
    @Query("DELETE FROM DetalleVenta dv WHERE dv.venta.idVenta = :idVenta")
    void deleteByVentaIdVenta(Integer idVenta);
}
