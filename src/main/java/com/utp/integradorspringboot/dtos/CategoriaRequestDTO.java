/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author ASUS
 */
public class CategoriaRequestDTO {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    @NotBlank(message = "La descripcion es requerido")
    private String descripcion;

    public CategoriaRequestDTO() {
    }

    public CategoriaRequestDTO(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    
}
