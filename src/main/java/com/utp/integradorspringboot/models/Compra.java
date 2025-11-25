package com.utp.integradorspringboot.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity
@Table(name = "compras") 
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Integer idCompra;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Proveedor proveedor;   
    @Column(name = "fecha")
    private LocalDate fecha;  
    @Column(name = "precio_total", nullable = false)
    private BigDecimal   precioTotal;  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_trabajador", nullable = false) 
    private Trabajador trabajador;

    public Compra() {
    }

    public Compra(Integer idCompra, Proveedor proveedor, LocalDate fecha, BigDecimal precioTotal, Trabajador trabajador) {
        this.idCompra = idCompra;
        this.proveedor = proveedor;
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
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public BigDecimal getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }


}