/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.ListaProductos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaProductosRepository extends JpaRepository<ListaProductos, Integer> {
    
    // ✅ Buscar por combinación de Producto + Talla + Color
    @Query("SELECT lp FROM ListaProductos lp " +
           "WHERE lp.producto.idProducto = :idProducto " +
           "AND lp.talla.idTalla = :idTalla " +
           "AND lp.color.idColor = :idColor")
    Optional<ListaProductos> findByProductoAndTallaAndColor(
        @Param("idProducto") Integer idProducto,
        @Param("idTalla") Integer idTalla,
        @Param("idColor") Integer idColor
    );
}