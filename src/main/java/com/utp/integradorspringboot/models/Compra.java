package com.utp.integradorspringboot.models;

import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name = "compras") 
 

public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Integer idCompra;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Proveedor Proveedor;
    
    @Column(name = "fecha")
    private LocalDate  fecha;
    
    @Column(name = "precio_total", nullable = false)
    private float precioTotal;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_trabajador", nullable = false) 
    private Trabajador trabajador;

    public Compra() {
    }

    public Compra(Integer idCompra, Proveedor Proveedor, LocalDate fecha, float precioTotal, Trabajador trabajador) {
        this.idCompra = idCompra;
        this.Proveedor = Proveedor;
        this.fecha = fecha;
        this.precioTotal = precioTotal;
        this.trabajador = trabajador;
    }

    public Integer getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Integer idCompra) {
        this.idCompra = idCompra;
    }

    public Proveedor getProveedor() {
        return Proveedor;
    }

    public void setProveedor(Proveedor Proveedor) {
        this.Proveedor = Proveedor;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public float getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(float precioTotal) {
        this.precioTotal = precioTotal;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }

    

}