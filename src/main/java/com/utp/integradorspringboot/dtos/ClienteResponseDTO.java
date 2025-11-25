/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

/**
 *
 * @author ASUS
 */
public class ClienteResponseDTO {
    private Integer idCliente;
    private String nombres;
    private String apellidos;
    private Integer idTipoDoc;
    private String tipoDocumento;
    private String nDocumento;
    private String direccion;
    private String telefono;
    private String correo;

    public ClienteResponseDTO() {
    }


    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
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

    public Integer getIdTipoDoc() {
        return idTipoDoc;
    }

    public void setIdTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getnDocumento() {
        return nDocumento;
    }

    public void setnDocumento(String nDocumento) {
        this.nDocumento = nDocumento;
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

