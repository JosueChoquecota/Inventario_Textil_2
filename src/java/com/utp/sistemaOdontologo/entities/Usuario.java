/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;

import com.utp.sistemaOdontologo.entities.enums.EstadoUsuario;


public class Usuario {
    private final Integer idUsuario;
    private final String usuario;
    private String contrasena;
    private EstadoUsuario estado;
    private final Empresa empresa;

    public Usuario(Integer idUsuario, String usuario, String contrasena, EstadoUsuario estado, Empresa empresa) {
        this.idUsuario = idUsuario;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.estado = estado;
        this.empresa = empresa;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public EstadoUsuario getEstado() {
        return estado;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public void setEstado(EstadoUsuario estado) {
        this.estado = estado;
    }
}
