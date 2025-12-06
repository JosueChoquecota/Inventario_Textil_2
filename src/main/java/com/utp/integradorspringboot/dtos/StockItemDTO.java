/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import java.math.BigDecimal;

/**
 *
 * @author ASUS
 */
public class StockItemDTO {
    private Integer idTalla;
    private Integer idColor;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private String nombreTalla;    // ✅ Nuevo
    private String nombreColor;  

    public StockItemDTO() {
    }

    public StockItemDTO(Integer idTalla, Integer idColor, Integer cantidad, BigDecimal precioUnitario) {
        this.idTalla = idTalla;
        this.idColor = idColor;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    
    public StockItemDTO(Integer idTalla, Integer idColor, Integer cantidad, BigDecimal precioUnitario, String nombreTalla, String nombreColor) {
        this.idTalla = idTalla;
        this.idColor = idColor;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.nombreTalla = nombreTalla;
        this.nombreColor = nombreColor;
    }

    public Integer getIdTalla() {
        return idTalla;
    }

    public void setIdTalla(Integer idTalla) {
        this.idTalla = idTalla;
    }

    public Integer getIdColor() {
        return idColor;
    }

    public void setIdColor(Integer idColor) {
        this.idColor = idColor;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public String getNombreTalla() {
        return nombreTalla;
    }

    public void setNombreTalla(String nombreTalla) {
        this.nombreTalla = nombreTalla;
    }

    public String getNombreColor() {
        return nombreColor;
    }

    public void setNombreColor(String nombreColor) {
        this.nombreColor = nombreColor;
    }

   
    
}
