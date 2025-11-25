/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import java.math.BigDecimal;
import java.util.List;

/**
 *
 * @author ASUS
 */
public class VentaRequestDTO {
    private Integer idCliente;
    private Integer idTrabajador;
    private String fecha;
    private BigDecimal precioTotal;
    private String detalle;
    private List<DetalleVentaRequestDTO> detalles;

    public VentaRequestDTO() {
    }

    public VentaRequestDTO(Integer idCliente, Integer idTrabajador, String fecha, BigDecimal precioTotal, String detalle, List<DetalleVentaRequestDTO> detalles) {
        this.idCliente = idCliente;
        this.idTrabajador = idTrabajador;
        this.fecha = fecha;
        this.precioTotal = precioTotal;
        this.detalle = detalle;
        this.detalles = detalles;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdTrabajador() {
        return idTrabajador;
    }

    public void setIdTrabajador(Integer idTrabajador) {
        this.idTrabajador = idTrabajador;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public BigDecimal getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public List<DetalleVentaRequestDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleVentaRequestDTO> detalles) {
        this.detalles = detalles;
    }

    
    
}
