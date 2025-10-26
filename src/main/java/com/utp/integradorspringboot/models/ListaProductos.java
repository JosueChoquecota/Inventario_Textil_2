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
    private Integer idProducto;
    @Column(name = "id_talla", nullable = false) 
    private Integer idTalla; 
    @Column(name = "id_color", nullable = false) 
    private Integer idColor; 
    @Column(name = "cantidad", nullable = false) 
    private Number CantidadProd; 
    @Column(name = "precio_unitario", nullable = false)
    private float PrecioUnitario;

    public ListaProductos() {
    }

    public ListaProductos(Integer idListaProducto, Integer idProducto, Integer idTalla, Integer idColor, Number CantidadProd, float PrecioUnitario) {
        this.idListaProducto = idListaProducto;
        this.idProducto = idProducto;
        this.idTalla = idTalla;
        this.idColor = idColor;
        this.CantidadProd = CantidadProd;
        this.PrecioUnitario = PrecioUnitario;
    }

    public Integer getIdListaProducto() {
        return idListaProducto;
    }

    public void setIdListaProducto(Integer idListaProducto) {
        this.idListaProducto = idListaProducto;
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

    public Number getCantidadProd() {
        return CantidadProd;
    }

    public void setCantidadProd(Number CantidadProd) {
        this.CantidadProd = CantidadProd;
    }

    public float getPrecioUnitario() {
        return PrecioUnitario;
    }

    public void setPrecioUnitario(float PrecioUnitario) {
        this.PrecioUnitario = PrecioUnitario;
    }
    
}