/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.*;

public class ProductoRequestDTO {
    
    @NotBlank
    @Size
    private String nombre;
    @NotNull
    private Integer idCategoria;   
    @NotNull
    private Integer idMarca;    
    @Size
    private String imagen;   
    @Size


    public ProductoRequestDTO() {
    }

    public ProductoRequestDTO(String nombre, Integer idCategoria, Integer idMarca, String imagen) {
        this.nombre = nombre;
        this.idCategoria = idCategoria;
        this.idMarca = idMarca;
        this.imagen = imagen;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public Integer getIdMarca() {
        return idMarca;
    }

    public void setIdMarca(Integer idMarca) {
        this.idMarca = idMarca;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    } 
}
