package com.utp.integradorspringboot.models;

import jakarta.persistence.*;

@Entity
@Table(name = "tallas") 

public class Talla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_talla")
    private Integer idTalla;
    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "talla", nullable = false, length = 10)
    private String Talla;

    public Talla() {
    }

    public Talla(Integer idTalla, String Talla) {
        this.idTalla = idTalla;
        this.Talla = Talla;
    }

    public Integer getIdTalla() {
        return idTalla;
    }

    public void setIdTalla(Integer idTalla) {
        this.idTalla = idTalla;
    }

    public String getTalla() {
        return Talla;
    }

    public void setTalla(String Talla) {
        this.Talla = Talla;
    }
    
    
}
