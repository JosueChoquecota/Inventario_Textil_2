package com.utp.integradorspringboot.models;

import jakarta.persistence.*;

@Entity 
@Table(name = "tallas") 
public class Talla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_talla")
    private Integer idTalla; 
    @Column(name = "talla", nullable = false, length = 10, unique = true)
    private String talla;
    @Column(name = "tipo", nullable = false, length = 20)
    private String tipo;
    @Column(name = "descripcion", nullable = false, length = 255)
    private String descripcion;

    public Talla() {
    }

    public Talla(Integer idTalla, String talla, String tipo, String descripcion) {
        this.idTalla = idTalla;
        this.talla = talla;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
    public Integer getIdTalla() {
        return idTalla;
    }
    public void setIdTalla(Integer idTalla) {
        this.idTalla = idTalla;
    }
    public String getTalla() {
        return talla;
    }
    public void setTalla(String talla) {
        this.talla = talla;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}