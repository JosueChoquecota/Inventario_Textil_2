/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

/**
 *
 * @author User
 */
public class TipoDocumentoDTO {
    private Integer idTipoDoc;
    private String tipo;

    public TipoDocumentoDTO() {
    }

    // Constructor con argumentos
    public TipoDocumentoDTO(Integer idTipoDoc, String tipo) {
        this.idTipoDoc = idTipoDoc;
        this.tipo = tipo;
    }

    public Integer getIdTipoDoc() {
        return idTipoDoc;
    }

    public void setIdTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
