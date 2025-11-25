/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

    import jakarta.validation.constraints.NotBlank;

public class ColorRequestDTO {
    @NotBlank(message = "Color requerida")
    private String color;
    private String codigo;

    public ColorRequestDTO() {
    }

    public ColorRequestDTO(String color, String codigo) {
        this.color = color;
        this.codigo = codigo;
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
