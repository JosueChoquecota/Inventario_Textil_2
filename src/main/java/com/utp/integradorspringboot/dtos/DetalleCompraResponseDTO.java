/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import java.math.BigDecimal;

public class DetalleCompraResponseDTO {
    private Integer idDetalleCompra;
    private ListaProductoResponseDTO listaProducto; 
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subTotal;

    public DetalleCompraResponseDTO() {
    }

    public DetalleCompraResponseDTO(Integer idDetalleCompra, ListaProductoResponseDTO listaProducto, Integer cantidad, BigDecimal precioUnitario, BigDecimal subTotal) {
        this.idDetalleCompra = idDetalleCompra;
        this.listaProducto = listaProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subTotal = subTotal;
    }

    public Integer getIdDetalleCompra() {
        return idDetalleCompra;
    }

    public void setIdDetalleCompra(Integer idDetalleCompra) {
        this.idDetalleCompra = idDetalleCompra;
    }

    public ListaProductoResponseDTO getListaProducto() {
        return listaProducto;
    }

    public void setListaProducto(ListaProductoResponseDTO listaProducto) {
        this.listaProducto = listaProducto;
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

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }
    
    
}
