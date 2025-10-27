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
    private String color;

    public Color() {
    }

    public Color(Integer idColor, String color) {
        this.idColor = idColor;
        this.color = color;
    }

    public Integer getIdColor() {
        return idColor;
    }

    public void setIdColor(Integer idColor) {
        this.idColor = idColor;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    
}