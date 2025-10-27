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
    private String tallaProd;

    public Talla() {
    }

    public Talla(Integer idTalla, String tallaProd) {
        this.idTalla = idTalla;
        this.tallaProd = tallaProd;
    }

    public Integer getIdTalla() {
        return idTalla;
    }

    public void setIdTalla(Integer idTalla) {
        this.idTalla = idTalla;
    }

    public String getTallaProd() {
        return tallaProd;
    }

    public void setTallaProd(String tallaProd) {
        this.tallaProd = tallaProd;
    }

}