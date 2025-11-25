package com.utp.integradorspringboot.models;

import jakarta.persistence.*;

@Entity
@Table(name = "marcas")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_marca")
    private Integer idMarca;
    @Column(name = "marca", nullable = false, length = 255)
    private String marca;
    @Column(name = "logo", length = 1024) 
    private String logo; 
    @Column(name = "descripcion")
    private String descripcion;
    
    public Marca() {
    }
    public Marca(Integer idMarca, String marca, String logo, String descripcion) {
        this.idMarca = idMarca;
        this.marca = marca;
        this.logo = logo;
        this.descripcion = descripcion;
    }
    public Integer getIdMarca() {
        return idMarca;
    }
    public void setIdMarca(Integer idMarca) {
        this.idMarca = idMarca;
    }
    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }
    public String getLogo() {
        return logo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    } 
}