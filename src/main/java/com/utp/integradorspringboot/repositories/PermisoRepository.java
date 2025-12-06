package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermisoRepository extends JpaRepository<Permiso, Integer> {
    @org.springframework.data.jpa.repository.Query("SELECT p FROM Permiso p WHERE p.rol.id_rol = :idRol")
    List<Permiso> findByRol_IdRol(@org.springframework.web.bind.annotation.PathVariable("idRol") Integer idRol);
}
