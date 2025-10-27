/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 *
 * @author ASUS
 */
public class CategoriaRequestDTO {
    @NotBlank(message = "El nombre de la categoría no puede estar vacío")
    @Size(max = 255, message = "El nombre no puede exceder los 255 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción no puede exceder los 255 caracteres")
    private String descripcion;

    // --- Constructor Vacío ---
    public CategoriaRequestDTO() {
    }

    // --- Getters y Setters ---
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
