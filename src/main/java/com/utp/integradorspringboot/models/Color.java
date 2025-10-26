package com.utp.integradorspringboot.models;

import jakarta.persistence.*;

@Entity
@Table(name = "colores") 

public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_color")
    private Integer idColor;
    @Column(name = "color", length = 100)
    private String Color;

    public Color() {
    }

    public Color(Integer idColor, String Color) {
        this.idColor = idColor;
        this.Color = Color;
    }

    public Integer getIdColor() {
        return idColor;
    }

    public void setIdColor(Integer idColor) {
        this.idColor = idColor;
    }

    public String getColor() {
        return Color;
    }

    public void setColor(String Color) {
        this.Color = Color;
    }
    
    
    
}
