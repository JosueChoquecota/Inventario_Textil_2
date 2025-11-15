/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 *
 * @author ASUS
 */
@Entity
@Table(name="trabajadores")
public class Trabajador {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_trabajador;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_tipo_doc", nullable = true)
    private TipoDocumento tipoDocumento;
    @Column(name = "n_documento", nullable = false)
    private String nDocumento;
    @Column(name = "nombres", nullable = false, length = 255)
    private String nombres;
    @Column(name = "apellidos", nullable = false, length = 255)
    private String apellidos;
    @Column(name = "telefono", nullable = false, length = 9)
    private String telefono;
    @Column(name = "correo", nullable = false, length = 255, unique = true)
    private String correo;
    @Column(name = "contrasena", nullable = false, length = 255)
    private String contrasena;
    @Column(name = "estado")
    private Boolean estado;
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    @ManyToOne
    @JoinColumn(name = "id_rol")
    private Rol rol;

    
    public Trabajador() {
    }

    
    public Trabajador(Integer id_trabajador, TipoDocumento tipoDocumento, String nDocumento, String nombres, String apellidos, String telefono, String correo, String contrasena, Boolean estado, LocalDateTime fechaCreacion, Rol rol) {
        this.id_trabajador = id_trabajador;
        this.tipoDocumento = tipoDocumento;
        this.nDocumento = nDocumento;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.correo = correo;
        this.contrasena = contrasena;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.rol = rol;
    }

    public Integer getId_trabajador() {
        return id_trabajador;
    }

    public void setId_trabajador(Integer id_trabajador) {
        this.id_trabajador = id_trabajador;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getnDocumento() {
        return nDocumento;
    }

    public void setnDocumento(String nDocumento) {
        this.nDocumento = nDocumento;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

 
    
}
