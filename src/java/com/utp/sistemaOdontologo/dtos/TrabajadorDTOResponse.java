/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.dtos;

import java.time.LocalDate;

/**
 *
 * @author ASUS
 */
public class TrabajadorDTOResponse {
    private  Integer idTrabajador;
    private  Integer idUsuario;
    private Integer idContacto;
    private  Integer idTipoDocumento;
    private  String nombre;
    private  String apellido;
    private Integer idRol;
    private  String colegiatura;
    private Integer idEspecialidad;
    private  LocalDate fechaRegistro;

    public TrabajadorDTOResponse(Integer idTrabajador, Integer idUsuario, Integer idContacto, Integer idTipoDocumento, String nombre, String apellido, Integer idRol, String colegiatura, Integer idEspecialidad, LocalDate fechaRegistro) {
        this.idTrabajador = idTrabajador;
        this.idUsuario = idUsuario;
        this.idContacto = idContacto;
        this.idTipoDocumento = idTipoDocumento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.idRol = idRol;
        this.colegiatura = colegiatura;
        this.idEspecialidad = idEspecialidad;
        this.fechaRegistro = fechaRegistro;
    }

    public Integer getIdTrabajador() {
        return idTrabajador;
    }

    public void setIdTrabajador(Integer idTrabajador) {
        this.idTrabajador = idTrabajador;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdContacto() {
        return idContacto;
    }

    public void setIdContacto(Integer idContacto) {
        this.idContacto = idContacto;
    }

    public Integer getIdTipoDocumento() {
        return idTipoDocumento;
    }

    public void setIdTipoDocumento(Integer idTipoDocumento) {
        this.idTipoDocumento = idTipoDocumento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getColegiatura() {
        return colegiatura;
    }

    public void setColegiatura(String colegiatura) {
        this.colegiatura = colegiatura;
    }

    public Integer getIdEspecialidad() {
        return idEspecialidad;
    }

    public void setIdEspecialidad(Integer idEspecialidad) {
        this.idEspecialidad = idEspecialidad;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
    
    
    
}
