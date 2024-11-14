/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Alumno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author jcerv
 */
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    List<Alumno> findByNombresContaining(String nombres);
    List<Alumno> findByNombres(String nombres);

}
