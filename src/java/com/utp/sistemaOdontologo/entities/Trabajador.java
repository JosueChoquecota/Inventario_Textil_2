/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;

import com.utp.sistemaOdontologo.entities.enums.Rol;
import java.time.LocalDate;

/**
 *
 * @author ASUS
 */
public class Trabajador {
    private final Integer idTrabajador;
    private final Usuario usuario;
    private Contacto contacto;
    private final TipoDocumento tipoDocumento;
    private final String nombre;
    private final String apellido;
    private Rol rol;
    private final String colegiatura;
    private Especialidad especialidad;
    private final LocalDate fechaRegistro;

    public Trabajador(Integer idTrabajador, Usuario usuario, Contacto contacto, TipoDocumento tipoDocumento, String nombre, String apellido, Rol rol, String colegiatura, Especialidad especialidad, LocalDate fechaRegistro) {
        this.idTrabajador = idTrabajador;
        this.usuario = usuario;
        this.contacto = contacto;
        this.tipoDocumento = tipoDocumento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.rol = rol;
        this.colegiatura = colegiatura;
        this.especialidad = especialidad;
        this.fechaRegistro = fechaRegistro;
    }

    public Integer getIdTrabajador() {
        return idTrabajador;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Contacto getContacto() {
        return contacto;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getColegiatura() {
        return colegiatura;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setContacto(Contacto contacto) {
        this.contacto = contacto;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

  
    
}
