/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.NotBlank;


public class MarcaRequestDTO {
    @NotBlank(message = "La marca es requerido")
    private String marca;
    @NotBlank(message = "El logo es requerido")
    private String logo; 
    @NotBlank(message = "La descripcion es requerido")
    private String descripcion;

    public MarcaRequestDTO() {
    }
    public MarcaRequestDTO(String marca, String logo, String descripcion) {
        this.marca = marca;
        this.logo = logo;
        this.descripcion = descripcion;
    }
    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }
    public String getLogo() {
        return logo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }   
}
