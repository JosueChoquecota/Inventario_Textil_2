package com.utp.integradorspringboot.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "detalle_ventas") 
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_venta")
    private Integer idDetalleVenta;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_venta", nullable = false)
    private Venta venta; 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_lista_producto", nullable = false)
    private ListaProductos listaProducto;
    @Column(name = "precio_unitario", nullable = false)
    private BigDecimal   PrecioUnitario;  
    @Column(name = "sub_total", nullable = false)
    private BigDecimal   subTotal;
    @Column(name = "cantidad", nullable = false) 
    private Integer cantidad; 

    public DetalleVenta() {
    }  
    public DetalleVenta(Integer idDetalleVenta, Venta venta, ListaProductos listaProducto, BigDecimal PrecioUnitario, BigDecimal subTotal, Integer cantidad) {
        this.idDetalleVenta = idDetalleVenta;
        this.venta = venta;
        this.listaProducto = listaProducto;
        this.PrecioUnitario = PrecioUnitario;
        this.subTotal = subTotal;
        this.cantidad = cantidad;
    }
    public Integer getIdDetalleVenta() {
        return idDetalleVenta;
    }
    public void setIdDetalleVenta(Integer idDetalleVenta) {
        this.idDetalleVenta = idDetalleVenta;
    }
    public Venta getVenta() {
        return venta;
    }
    public void setVenta(Venta venta) {
        this.venta = venta;
    }
    public ListaProductos getListaProducto() {
        return listaProducto;
    }
    public void setListaProducto(ListaProductos listaProducto) {
        this.listaProducto = listaProducto;
    }
    public BigDecimal getPrecioUnitario() {
        return PrecioUnitario;
    }
    public void setPrecioUnitario(BigDecimal PrecioUnitario) {
        this.PrecioUnitario = PrecioUnitario;
    }
    public BigDecimal getSubTotal() {
        return subTotal;
    }
    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }
    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }   
}
