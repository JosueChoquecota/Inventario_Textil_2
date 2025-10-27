package com.utp.integradorspringboot.models;

import jakarta.persistence.*;
 
@Entity
@Table(name = "lista_productos") 

public class ListaProductos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lista_producto")
    private Integer idListaProducto;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_talla", nullable = false) 
    private Talla talls; 
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_color", nullable = false) 
    private Color color; 
    
    @Column(name = "cantidad", nullable = false) 
    private int CantidadProd; 
    
    @Column(name = "precio_unitario", nullable = false)
    private float PrecioUnitario;

    public ListaProductos() {
    }

    public ListaProductos(Integer idListaProducto, Producto producto, Talla talls, Color color, int CantidadProd, float PrecioUnitario) {
        this.idListaProducto = idListaProducto;
        this.producto = producto;
        this.talls = talls;
        this.color = color;
        this.CantidadProd = CantidadProd;
        this.PrecioUnitario = PrecioUnitario;
    }

    public Integer getIdListaProducto() {
        return idListaProducto;
    }

    public void setIdListaProducto(Integer idListaProducto) {
        this.idListaProducto = idListaProducto;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Talla getTalls() {
        return talls;
    }

    public void setTalls(Talla talls) {
        this.talls = talls;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public int getCantidadProd() {
        return CantidadProd;
    }

    public void setCantidadProd(int CantidadProd) {
        this.CantidadProd = CantidadProd;
    }

    public float getPrecioUnitario() {
        return PrecioUnitario;
    }

    public void setPrecioUnitario(float PrecioUnitario) {
        this.PrecioUnitario = PrecioUnitario;
    }

    

}