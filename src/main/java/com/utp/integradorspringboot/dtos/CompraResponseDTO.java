/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;

/**
 *
 * @author ASUS
 */
@Data
public class CompraResponseDTO {
    private Integer idCompra;
    private String fecha;           // "2025-11-22" para frontend
    private BigDecimal precioTotal;
    
    // Proveedor
    private Integer idProveedor;
    private String nombreProveedor;
    private Integer documentoProveedor;
    private String tipoDocumentoProveedor;
    
    // Trabajador
    private Integer idTrabajador;
    private String nombreCompletoTrabajador;
    
    // Detalles
    private List<DetalleCompraResponseDTO> detalles;
    
    // Totales
    private Integer  totalProductos;
    private Integer  totalUnidades;

    public Integer getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Integer idCompra) {
        this.idCompra = idCompra;
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

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
    }

    public String getNombreProveedor() {
        return nombreProveedor;
    }

    public void setNombreProveedor(String nombreProveedor) {
        this.nombreProveedor = nombreProveedor;
    }

    public Integer getDocumentoProveedor() {
        return documentoProveedor;
    }

    public void setDocumentoProveedor(Integer documentoProveedor) {
        this.documentoProveedor = documentoProveedor;
    }

    public String getTipoDocumentoProveedor() {
        return tipoDocumentoProveedor;
    }

    public void setTipoDocumentoProveedor(String tipoDocumentoProveedor) {
        this.tipoDocumentoProveedor = tipoDocumentoProveedor;
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

    public List<DetalleCompraResponseDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleCompraResponseDTO> detalles) {
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
