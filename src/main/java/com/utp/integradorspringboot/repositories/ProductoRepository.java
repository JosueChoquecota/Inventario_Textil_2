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
    
    @Query(value = """
                   SELECT 
                       p.id_producto,
                       p.nombre as nombreProducto,
                       m.marca as marcaNombre,
                       c.nombre as categoriaNombre,
                       lp.id_lista_producto,
                       lp.id_talla,
                       t.talla as nombreTalla,
                       lp.id_color,
                       col.color as nombreColor,
                       lp.cantidad,
                       lp.precio_unitario
                   FROM dbo.productos p
                   INNER JOIN dbo.marcas m ON p.id_marca = m.id_marca
                   LEFT JOIN dbo.categorias c ON p.id_categoria = c.id_categoria  
                   INNER JOIN dbo.lista_productos lp ON p.id_producto = lp.id_producto
                   INNER JOIN dbo.tallas t ON lp.id_talla = t.id_talla
                   INNER JOIN dbo.colores col ON lp.id_color = col.id_color
                   WHERE lp.cantidad > 0  -- Solo productos con stock
                   ORDER BY p.nombre, t.talla, col.color;
                   """, nativeQuery = true)
    List<Object[]> findProductosConStock();
}

