package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Color;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color,Integer>{
    
    Optional<Color> findByColor(String color);
    boolean existsByColor(String color);
}