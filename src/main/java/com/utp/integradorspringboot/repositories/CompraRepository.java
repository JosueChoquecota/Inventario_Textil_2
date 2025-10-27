package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Compra;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompraRepository extends JpaRepository<Compra,Integer>{
    List<Compra> findByIdProveedor_IdProveedor(Integer idProveedor);

    List<Compra> findByIdTrabajador_IdTrabajador(Integer idTrabajador);   
}