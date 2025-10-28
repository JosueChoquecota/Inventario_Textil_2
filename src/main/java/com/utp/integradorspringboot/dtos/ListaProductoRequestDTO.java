/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 *
 * @author ASUS
 */
public class ListaProductoRequestDTO {
    @NotNull(message = "El ID del producto es requerido")
    private Integer idProducto;

    @NotNull(message = "El ID de la talla es requerido")
    private Integer idTalla;

    @NotNull(message = "El ID del color es requerido")
    private Integer idColor;

    @NotNull(message = "El ID del proveedor es requerido")
    private Integer idProveedor;

    @NotNull(message = "La cantidad es requerida")
    @Min(value = 0, message = "La cantidad debe ser mayor o igual a 0")
    private Integer cantidad;

    @NotNull(message = "El precio unitario es requerido")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio unitario debe ser mayor a 0")
    private BigDecimal precioUnitario;

    public ListaProductoRequestDTO() {
    }

    public ListaProductoRequestDTO(Integer idProducto, Integer idTalla, Integer idColor, Integer idProveedor, Integer cantidad, BigDecimal precioUnitario) {
        this.idProducto = idProducto;
        this.idTalla = idTalla;
        this.idColor = idColor;
        this.idProveedor = idProveedor;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
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

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
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
