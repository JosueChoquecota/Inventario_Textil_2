/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.ListaProductos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaProductosRepository extends JpaRepository<ListaProductos, Integer> {

    Optional<ListaProductos> findByProductoIdProductoAndTallaIdTallaAndColorIdColor(
            Integer idProducto, Integer idTalla, Integer idColor);
    List<ListaProductos> findByProductoIdProducto(Integer idProducto);
    
    boolean existsByProductoIdProductoAndTallaIdTallaAndColorIdColor(
            Integer idProducto, Integer idTalla, Integer idColor);
}