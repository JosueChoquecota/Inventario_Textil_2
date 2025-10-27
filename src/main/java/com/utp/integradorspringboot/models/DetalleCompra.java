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
    private Compra idCompra;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_lista_producto", nullable = false)
    private ListaProductos idListaProducto;
    
    @Column(name = "precio_unitario", nullable = false)
    private float PrecioUnitario;
    
    @Column(name = "sub_total", nullable = false)
    private float subTotal;
    
    @Column(name = "cantidad", nullable = false) 
    private Number CantidadCompra; 

    public DetalleCompra() {
    }

    public DetalleCompra(Integer idDetalleCompra, Compra idCompra, ListaProductos idListaProducto, float PrecioUnitario, float subTotal, Number CantidadCompra) {
        this.idDetalleCompra = idDetalleCompra;
        this.idCompra = idCompra;
        this.idListaProducto = idListaProducto;
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

    public Compra getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Compra idCompra) {
        this.idCompra = idCompra;
    }

    public ListaProductos getIdListaProducto() {
        return idListaProducto;
    }

    public void setIdListaProducto(ListaProductos idListaProducto) {
        this.idListaProducto = idListaProducto;
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

    public Number getCantidadCompra() {
        return CantidadCompra;
    }

    public void setCantidadCompra(Number CantidadCompra) {
        this.CantidadCompra = CantidadCompra;
    }
    
}