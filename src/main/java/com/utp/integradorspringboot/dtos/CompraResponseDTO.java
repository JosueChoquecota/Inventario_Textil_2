/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class CompraResponseDTO {
    private Integer idCompra;
    private ProveedorResponseDTO proveedor; 
    private LocalDate  fecha;
    private BigDecimal precioTotal;
    private TrabajadorResponseDTO trabajador; 
    private List<DetalleCompraResponseDTO> detalles; 

    public CompraResponseDTO() {
    }

    public CompraResponseDTO(Integer idCompra, ProveedorResponseDTO proveedor, LocalDate  fecha, BigDecimal precioTotal, TrabajadorResponseDTO trabajador, List<DetalleCompraResponseDTO> detalles) {
        this.idCompra = idCompra;
        this.proveedor = proveedor;
        this.fecha = fecha;
        this.precioTotal = precioTotal;
        this.trabajador = trabajador;
        this.detalles = detalles;
    }

    public Integer getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Integer idCompra) {
        this.idCompra = idCompra;
    }

    public ProveedorResponseDTO getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorResponseDTO proveedor) {
        this.proveedor = proveedor;
    }

    public LocalDate  getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate  fecha) {
        this.fecha = fecha;
    }

    public BigDecimal getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
    }

    public TrabajadorResponseDTO getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(TrabajadorResponseDTO trabajador) {
        this.trabajador = trabajador;
    }

    public List<DetalleCompraResponseDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleCompraResponseDTO> detalles) {
        this.detalles = detalles;
    }

    

}
