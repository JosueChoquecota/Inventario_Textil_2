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
public class VentaResponseDTO {
    
    private Integer idVenta;
    private String fecha;
    private BigDecimal precioTotal;
    
    //Cliente
    private Integer idCliente;
    private String nombreCliente;
    private Integer documentoCliente;
    private String tipoDcoumentoCliente;
    
    private Integer idTrabajador;
    private String nombreCompletoTrabajador;
    
    private List<DetalleVentaResponseDTO> detalles;
    
    private Integer totalProductos;
    private Integer totalUnidades;

    public VentaResponseDTO() {
    }

    public Integer getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Integer idVenta) {
        this.idVenta = idVenta;
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

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public Integer getDocumentoCliente() {
        return documentoCliente;
    }

    public void setDocumentoCliente(Integer documentoCliente) {
        this.documentoCliente = documentoCliente;
    }

    public String getTipoDcoumentoCliente() {
        return tipoDcoumentoCliente;
    }

    public void setTipoDcoumentoCliente(String tipoDcoumentoCliente) {
        this.tipoDcoumentoCliente = tipoDcoumentoCliente;
    }

    public Integer getIdTrabajador() {
        return idTrabajador;
    }

    public void setIdTrabajador(Integer idTrabajador) {
        this.idTrabajador = idTrabajador;
    }

    public String getNombreCompletoTrabajador() {
        return nombreCompletoTrabajador;
    }

    public void setNombreCompletoTrabajador(String nombreCompletoTrabajador) {
        this.nombreCompletoTrabajador = nombreCompletoTrabajador;
    }

    public List<DetalleVentaResponseDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleVentaResponseDTO> detalles) {
        this.detalles = detalles;
    }

    public Integer getTotalProductos() {
        return totalProductos;
    }

    public void setTotalProductos(Integer totalProductos) {
        this.totalProductos = totalProductos;
    }

    public Integer getTotalUnidades() {
        return totalUnidades;
    }

    public void setTotalUnidades(Integer totalUnidades) {
        this.totalUnidades = totalUnidades;
    }

    
    
}
