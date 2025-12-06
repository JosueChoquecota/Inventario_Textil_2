package com.utp.integradorspringboot.dtos;

public class TallaDTO {
    private Integer idTalla; 
    private String tallaProd;

    public TallaDTO() {
    }

    public TallaDTO(Integer idTalla, String tallaProd) {
        this.idTalla = idTalla;
        this.tallaProd = tallaProd;
    }

    public Integer getIdTalla() {
        return idTalla;
    }

    public void setIdTalla(Integer idTalla) {
        this.idTalla = idTalla;
    }

    public String getTallaProd() {
        return tallaProd;
    }

    public void setTallaProd(String tallaProd) {
        this.tallaProd = tallaProd;
    }
}
