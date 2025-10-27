package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.ListaProductos;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListaProductosRepository extends JpaRepository<ListaProductos,Integer>{
    //List<ListaProductos> findByIdProducto(Integer idProducto); REVISAR AUN
    List<ListaProductos> findByIdTalla_IdTalla(Integer idTalla);
    List<ListaProductos> findByIdColor_IdColor(Integer idColor);
} 