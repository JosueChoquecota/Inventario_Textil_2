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
public class MarcaRequestDTO {
    @NotBlank(message = "El nombre de la marca no puede estar vacío")
    @Size(max = 255, message = "El nombre no puede exceder los 255 caracteres")
    private String marca; 
    @Size(max = 255, message = "La ruta del logo no puede exceder los 255 caracteres")
    private String logo; 

    @Size(max = 255, message = "La descripción del logo no puede exceder los 255 caracteres")
    private String descLogo; 

    public MarcaRequestDTO() {
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

    public String getDescLogo() {
        return descLogo;
    }

    public void setDescLogo(String descLogo) {
        this.descLogo = descLogo;
    }


}
