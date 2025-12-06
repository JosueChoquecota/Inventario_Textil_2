package com.utp.integradorspringboot.models;

import jakarta.persistence.*;

@Entity
@Table(name = "recursos")
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_recurso;

    @Column(nullable = false, unique = true)
    private String nombre; // e.g., "Trabajadores", "Dashboard"

    @Column(nullable = false)
    private String ruta; // e.g., "/dashboard/trabajadores"

    public Integer getId_recurso() {
        return id_recurso;
    }

    public void setId_recurso(Integer id_recurso) {
        this.id_recurso = id_recurso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }
}
