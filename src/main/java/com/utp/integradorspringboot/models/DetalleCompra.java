package com.utp.integradorspringboot.models;

import jakarta.persistence.*;
 
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
    private ListaProductos listaProductos;
    
    @Column(name = "precio_unitario", nullable = false)
    private float PrecioUnitario;
    
    @Column(name = "sub_total", nullable = false)
    private float subTotal;
    
    @Column(name = "cantidad", nullable = false) 
    private int CantidadCompra; 

    public DetalleCompra() {
    }

    public DetalleCompra(Integer idDetalleCompra, Compra compra, ListaProductos listaProductos, float PrecioUnitario, float subTotal, int CantidadCompra) {
        this.idDetalleCompra = idDetalleCompra;
        this.compra = compra;
        this.listaProductos = listaProductos;
        this.PrecioUnitario = PrecioUnitario;
        this.subTotal = subTotal;
        this.CantidadCompra = CantidadCompra;
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

    public ListaProductos getListaProductos() {
        return listaProductos;
    }

    public void setListaProductos(ListaProductos listaProductos) {
        this.listaProductos = listaProductos;
    }

    public float getPrecioUnitario() {
        return PrecioUnitario;
    }

    public void setPrecioUnitario(float PrecioUnitario) {
        this.PrecioUnitario = PrecioUnitario;
    }

    public float getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(float subTotal) {
        this.subTotal = subTotal;
    }

    public int getCantidadCompra() {
        return CantidadCompra;
    }

    public void setCantidadCompra(int CantidadCompra) {
        this.CantidadCompra = CantidadCompra;
    }

    
}