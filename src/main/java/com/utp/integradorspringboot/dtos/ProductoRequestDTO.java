/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ASUS
 */
public class ProductoRequestDTO {
    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;
    @NotNull(message = "El ID del tipo de idCategoria es requerido")
    private Integer idCategoria;
    @NotNull(message = "El ID del tipo de idMarca es requerido")
    private Integer idMarca;
    @NotBlank(message = "El nombre no puede estar vacío")
    private String descripcion;
    private String imagen;

    public ProductoRequestDTO() {
    }

    public ProductoRequestDTO(String nombre, Integer idCategoria, Integer idMarca, String descripcion, String imagen) {
        this.nombre = nombre;
        this.idCategoria = idCategoria;
        this.idMarca = idMarca;
        this.descripcion = descripcion;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

}
