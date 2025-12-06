package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Integer> {
}
