/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class CompraRequestDTO {

    @NotNull(message = "El ID del proveedor es requerido")
    private Integer idProveedor;
    @NotNull(message = "La fecha es requerida")
    @FutureOrPresent(message = "La fecha no puede ser pasada")
    private LocalDate  fecha;
    @NotNull(message = "El ID de lista_producto es requerido") // ID de la variación (Producto+Talla+Color)
    private Integer idListaProducto; 
    @NotNull(message = "La cantidad es requerida")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;
    @NotNull(message = "El precio unitario es requerido")
    private BigDecimal precioUnitario; 
    
    public CompraRequestDTO() {
    }

    public CompraRequestDTO(Integer idProveedor, LocalDate  fecha, Integer idListaProducto, Integer cantidad, BigDecimal precioUnitario) {
        this.idProveedor = idProveedor;
        this.fecha = fecha;
        this.idListaProducto = idListaProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
    }

    public LocalDate  getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate  fecha) {
        this.fecha = fecha;
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