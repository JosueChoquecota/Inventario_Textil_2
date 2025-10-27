package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.DetalleCompra;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleCompraRepository extends JpaRepository<DetalleCompra,Integer>{
    
    List<DetalleCompra> findByIdCompra_IdCompra(Integer idCompra);
    
    List<DetalleCompra> findByIdListaProducto_IdListaProducto(Integer idListaProducto);
    
}