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
    @Column(name = "codigo", length = 255)
    private String codigo;

    public Color() {
    }
    public Color(Integer idColor, String color, String codigo) {
        this.idColor = idColor;
        this.color = color;
        this.codigo = codigo;
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
    public String getCodigo() {
        return codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}