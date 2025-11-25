/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.*;

/**
 *
 * @author ASUS
 */
@Entity
@Table(name="clientes")
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer idCliente;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_tipo_doc", nullable = true)
    private TipoDocumento tipoDocumento;
    @Column(name = "n_documento", nullable = false)
    private String nDocumento;
    @Column(name = "nombres", nullable = false, length = 255)
    private String nombres;
    @Column(name = "apellidos", nullable = false, length = 255)
    private String apellidos;
    @Column(name = "direccion", nullable = false, length = 9)
    private String direccion;
    @Column(name = "telefono", nullable = false, length = 9)
    private String telefono;
    @Column(name = "correo", nullable = false, length = 255)
    private String correo;

    public Cliente() {
    }

    public Cliente(Integer idCliente, TipoDocumento tipoDocumento, String nDocumento, String nombres, String apellidos, String direccion, String telefono, String correo) {
        this.idCliente = idCliente;
        this.tipoDocumento = tipoDocumento;
        this.nDocumento = nDocumento;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
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


    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
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
    
}
