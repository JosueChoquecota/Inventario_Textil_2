package com.utp.integradorspringboot.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
 
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
    private Talla talla;     
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_color", nullable = false) 
    private Color color;  
    @Column(name = "cantidad", nullable = false) 
    private int cantidad;   
    @Column(name = "precio_unitario", nullable = false)
    private BigDecimal precioUnitario;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proveedor", nullable = false) 
    private Proveedor proveedor;   

    public ListaProductos() {
    }

    public ListaProductos(Integer idListaProducto, Producto producto, Talla talla, Color color, int cantidad, BigDecimal precioUnitario, Proveedor proveedor) {
        this.idListaProducto = idListaProducto;
        this.producto = producto;
        this.talla = talla;
        this.color = color;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.proveedor = proveedor;
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

    public Talla getTalla() {
        return talla;
    }

    public void setTalla(Talla talla) {
        this.talla = talla;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }
   

}