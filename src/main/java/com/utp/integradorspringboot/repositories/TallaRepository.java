package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Talla;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TallaRepository extends JpaRepository<Talla,Integer>{
    
    Optional<Talla> findByTallaProd(String tallaProd);
    boolean existsByTallaProd(String tallaProd);
}