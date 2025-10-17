/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;

import com.utp.sistemaOdontologo.entities.enums.EstadoPago;
import com.utp.sistemaOdontologo.entities.enums.MetodoPago;
import java.time.LocalDate;

/**
 *
 * @author ASUS
 */
public class Pago {
    private final Integer idPago;
    private final Cita cita;
    private final float monto;
    private final MetodoPago metodo;
    
    private EstadoPago estadoPago;
    private LocalDate fechaPago;

    public Pago(Integer idPago, Cita cita, float monto, MetodoPago metodo, EstadoPago estadoPago, LocalDate fechaPago) {
        this.idPago = idPago;
        this.cita = cita;
        this.monto = monto;
        this.metodo = metodo;
        this.estadoPago = estadoPago;
        this.fechaPago = fechaPago;
    }

    public Integer getIdPago() {
        return idPago;
    }
    public Cita getCita() {
        return cita;
    }
    public float getMonto() {
        return monto;
    }
    public MetodoPago getMetodo() {
        return metodo;
    }
    public EstadoPago getEstadoPago() {
        return estadoPago;
    }
    public void setEstadoPago(EstadoPago estadoPago) {
        this.estadoPago = estadoPago;
    }
    public LocalDate getFechaPago() {
        return fechaPago;
    }
    public void setFechaPago(LocalDate fechaPago) {
        this.fechaPago = fechaPago;
    }  
}
