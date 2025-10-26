package com.utp.integradorspringboot.models;

import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name = "compras") 


public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Integer idComprar;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Integer idProveedor;
    
    @Column(name = "fecha")
    private LocalDate  fecha;
    
    @Column(name = "precio_total", nullable = false)
    private float precioTotal;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_trabajador", nullable = false) 
    private Trabajador idTrabajador;

    public Compra() {
    }

    public Compra(Integer idComprar, Integer idProveedor, LocalDate fecha, float precioTotal, Trabajador idTrabajador) {
        this.idComprar = idComprar;
        this.idProveedor = idProveedor;
        this.fecha = fecha;
        this.precioTotal = precioTotal;
        this.idTrabajador = idTrabajador;
    }

    public Integer getIdComprar() {
        return idComprar;
    }

    public void setIdComprar(Integer idComprar) {
        this.idComprar = idComprar;
    }

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
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

    public Trabajador getIdTrabajador() {
        return idTrabajador;
    }

    public void setIdTrabajador(Trabajador idTrabajador) {
        this.idTrabajador = idTrabajador;
    }
    
    
    
}
