package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Compra;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompraRepository extends JpaRepository<Compra, Integer> {
    List<Compra> findByProveedorIdProveedor(Integer idProveedor);
    List<Compra> findByFechaBetween(LocalDateTime startDate, LocalDateTime endDate);
    long countByProveedorIdProveedor(Integer idProveedor); 
}