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
public class DetalleCompraRequestDTO {
    private Integer idListaProducto;
    private Integer cantidad;
    private BigDecimal precioUnitario;

    public DetalleCompraRequestDTO() {
    }

    public DetalleCompraRequestDTO(Integer idListaProducto, Integer cantidad, BigDecimal precioUnitario) {
        this.idListaProducto = idListaProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    public Integer getIdListaProducto() {
        return idListaProducto;
    }

    public void setIdListaProducto(Integer idListaProducto) {
        this.idListaProducto = idListaProducto;
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
    
    
}
