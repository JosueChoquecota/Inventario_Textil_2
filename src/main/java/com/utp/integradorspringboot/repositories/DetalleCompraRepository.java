/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.DetalleCompra;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleCompraRepository extends JpaRepository<DetalleCompra, Integer> {
    // Find all details for a specific purchase
    List<DetalleCompra> findByCompraIdCompra(Integer idCompra);

    // Find all details for a specific product variation
List<DetalleCompra> findByListaProducto_IdListaProducto(Integer idListaProducto);
}