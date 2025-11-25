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
public class DetalleVentaRequestDTO {
    
    private Integer idProducto;
    private Integer idTalla;
    private Integer idColor;
    
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subTotal;

    public DetalleVentaRequestDTO() {
    }

    public DetalleVentaRequestDTO(Integer idProducto, Integer idTalla, Integer idColor, BigDecimal precioUnitario, Integer cantidad, BigDecimal subTotal) {
        this.idProducto = idProducto;
        this.idTalla = idTalla;
        this.idColor = idColor;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
        this.subTotal = subTotal;
    }

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
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

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }
    
    
    
}
