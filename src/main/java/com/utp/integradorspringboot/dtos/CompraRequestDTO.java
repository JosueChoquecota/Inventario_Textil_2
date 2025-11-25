/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;

/**
 *
 * @author ASUS
 */
@Data
public class CompraRequestDTO {
    private Integer idProveedor;
    private Integer idTrabajador;
    private String fecha;           // "2025-11-22" desde frontend
    private BigDecimal  precioTotal;
    private List<DetalleCompraRequestDTO> detalles;

    public CompraRequestDTO() {
    }

    public CompraRequestDTO(Integer idProveedor, Integer idTrabajador, String fecha, BigDecimal precioTotal, List<DetalleCompraRequestDTO> detalles) {
        this.idProveedor = idProveedor;
        this.idTrabajador = idTrabajador;
        this.fecha = fecha;
        this.precioTotal = precioTotal;
        this.detalles = detalles;
    }

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
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

    public List<DetalleCompraRequestDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleCompraRequestDTO> detalles) {
        this.detalles = detalles;
    }

    
}
