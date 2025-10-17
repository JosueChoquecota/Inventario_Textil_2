/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;

/**
 *
 * @author ASUS
 */
public class TipoDocumento {
    private final Integer idTipoDocumento;
    private final String nombre;
    private final int longitud;

    public TipoDocumento(Integer idTipoDocumento, String nombre, int longitud) {
        this.idTipoDocumento = idTipoDocumento;
        this.nombre = nombre;
        this.longitud = longitud;
    }

    public Integer getIdTipoDocumento() {
        return idTipoDocumento;
    }
    public String getNombre() {
        return nombre;
    }
    public int getLongitud() {
        return longitud;
    }  
}
