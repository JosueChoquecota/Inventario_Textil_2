/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import java.time.LocalDateTime;

public class TrabajadorResponseDTO {
     private Integer id;  // ✅ Cambiar según tu @Id (id_trabajador)
    
    private String nombres;
    private String apellidos;
    private String nDocumento;
    private String telefono;
    private String correo;
    
    // ✅ Información del tipo de documento
    private Integer idTipoDoc;
    private String tipoDocumentoNombre;  // Ejemplo: "DNI", "RUC"
    
    // ✅ Información del rol
    private Integer idRol;
    private String rolNombre;  // Ejemplo: "Administrador", "Vendedor"
    
    // ✅ Estado como Boolean
    private Boolean estado;
    
    private LocalDateTime fechaCreacion;

    public TrabajadorResponseDTO() {
    }

    public TrabajadorResponseDTO(Integer id, String nombres, String apellidos, String nDocumento, String telefono, String correo, Integer idTipoDoc, String tipoDocumentoNombre, Integer idRol, String rolNombre, Boolean estado, LocalDateTime fechaCreacion) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.nDocumento = nDocumento;
        this.telefono = telefono;
        this.correo = correo;
        this.idTipoDoc = idTipoDoc;
        this.tipoDocumentoNombre = tipoDocumentoNombre;
        this.idRol = idRol;
        this.rolNombre = rolNombre;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getnDocumento() {
        return nDocumento;
    }

    public void setnDocumento(String nDocumento) {
        this.nDocumento = nDocumento;
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

    public Integer getIdTipoDoc() {
        return idTipoDoc;
    }

    public void setIdTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
    }

    public String getTipoDocumentoNombre() {
        return tipoDocumentoNombre;
    }

    public void setTipoDocumentoNombre(String tipoDocumentoNombre) {
        this.tipoDocumentoNombre = tipoDocumentoNombre;
    }

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getRolNombre() {
        return rolNombre;
    }

    public void setRolNombre(String rolNombre) {
        this.rolNombre = rolNombre;
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

    
    
    
}
