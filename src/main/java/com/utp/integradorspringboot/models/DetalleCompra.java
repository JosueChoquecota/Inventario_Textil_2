package com.utp.integradorspringboot.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
 
@Entity
@Table(name = "detalle_compras") 
public class DetalleCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_compra")
    private Integer idDetalleCompra;  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_compra", nullable = false)
    private Compra compra; 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_lista_producto", nullable = false)
    private ListaProductos listaProducto;
    @Column(name = "precio_unitario", nullable = false)
    private BigDecimal   PrecioUnitario;  
    @Column(name = "sub_total", nullable = false)
    private BigDecimal   subTotal;
    @Column(name = "cantidad", nullable = false) 
    private Integer cantidad; 

    public DetalleCompra() {
    }

    public DetalleCompra(Integer idDetalleCompra, Compra compra, ListaProductos listaProducto, BigDecimal PrecioUnitario, BigDecimal subTotal, Integer cantidad) {
        this.idDetalleCompra = idDetalleCompra;
        this.compra = compra;
        this.listaProducto = listaProducto;
        this.PrecioUnitario = PrecioUnitario;
        this.subTotal = subTotal;
        this.cantidad = cantidad;
    }

    public Integer getIdDetalleCompra() {
        return idDetalleCompra;
    }

    public void setIdDetalleCompra(Integer idDetalleCompra) {
        this.idDetalleCompra = idDetalleCompra;
    }

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
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