/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

/**
 *
 * @author ASUS
 */
public class MarcaDTO {
    private Integer idMarca;
    private String marca;
    private String logo;
    private String descLogo;

    public MarcaDTO() {
    }

    public MarcaDTO(String marca, String logo, String descLogo) {
        this.marca = marca;
        this.logo = logo;
        this.descLogo = descLogo;
    }

    public Integer getIdMarca() {
        return idMarca;
    }

    public void setIdMarca(Integer idMarca) {
        this.idMarca = idMarca;
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
