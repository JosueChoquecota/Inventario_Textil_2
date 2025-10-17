/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;

import java.time.LocalDate;

public class Empresa {
    private final Integer idEmpresa;
    private  String nombre;
    private final String ruc;
    private  String direccion;
    private  String telefono;
    private  String correo;
    private  String logo;
    private final LocalDate fechaCreacion;

    public Empresa(Integer idEmpresa, String nombre, String ruc, String direccion, String telefono, String correo, String logo, LocalDate fechaCreacion) {
        this.idEmpresa = idEmpresa;
        this.nombre = nombre;
        this.ruc = ruc;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.logo = logo;
        this.fechaCreacion = fechaCreacion;
    }

    public Integer getIdEmpresa() {
        return idEmpresa;
    }
    public String getNombre() {
        return nombre;
    }
    public String getRuc() {
        return ruc;
    }
    public String getDireccion() {
        return direccion;
    }
    public String getTelefono() {
        return telefono;
    }
    public String getCorreo() {
        return correo;
    }
    public String getLogo() {
        return logo;
    }
    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
}
