/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;
import com.utp.sistemaOdontologo.entities.enums.TipoContacto;

/**
 *
 * @author ASUS
 */
public class Contacto {
    private  Integer idContacto;
    private TipoContacto tipoContacto;
    private String telefono;
    private String correo;
    private String direccion;

    public Contacto() {
    }

    public Contacto(Integer idContacto, TipoContacto tipoContacto, String telefono, String correo, String direccion) {
        this.idContacto = idContacto;
        this.tipoContacto = tipoContacto;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
    }

    public Integer getIdContacto() {
        return idContacto;
    }
    public TipoContacto getTipoContacto() {
        return tipoContacto;
    }
    public String getTelefono() {
        return telefono;
    }
    public String getCorreo() {
        return correo;
    }
    public String getDireccion() {
        return direccion;
    }
    public void setTipoContacto(TipoContacto tipoContacto) {
        this.tipoContacto = tipoContacto;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }  

    public void setIdContacto(Integer idContacto) {
        this.idContacto = idContacto;
    }
    
    
}
