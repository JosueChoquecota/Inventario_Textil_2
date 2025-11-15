/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TrabajadorRequestDTO {
    
    @NotBlank(message = "El nombre es requerido")
    @Size(max = 255, message = "El nombre no puede exceder 255 caracteres")
    private String nombres;
    
    @NotBlank(message = "El apellido es requerido")
    @Size(max = 255, message = "El apellido no puede exceder 255 caracteres")
    private String apellidos;
    
    @NotNull(message = "El tipo de documento es requerido")
    private Integer idTipoDoc;  // ✅ ID simple del frontend
    
    @NotBlank(message = "El número de documento es requerido")
    private String nDocumento;
    
    @NotBlank(message = "El teléfono es requerido")
    @Size(max = 9, message = "El teléfono debe tener máximo 9 caracteres")
    private String telefono;
    
    @NotBlank(message = "El correo es requerido")
    @Email(message = "El correo debe ser válido")
    @Size(max = 255, message = "El correo no puede exceder 255 caracteres")
    private String correo;
    
    @NotNull(message = "El rol es requerido")
    private Integer idRol;  // ✅ ID simple del frontend
    
    
    // ⚠️ Contraseña: requerida al crear, opcional al editar
    private String contrasena;
    
    // ⚠️ Estado: Boolean para coincidir con tu BD
    private Boolean estado;
    
    public TrabajadorRequestDTO() {
    }

    public TrabajadorRequestDTO(String nombres, String apellidos, Integer idTipoDoc, String nDocumento, String telefono, String correo, Integer idRol, String contrasena, Boolean estado) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.idTipoDoc = idTipoDoc;
        this.nDocumento = nDocumento;
        this.telefono = telefono;
        this.correo = correo;
        this.idRol = idRol;
        this.contrasena = contrasena;
        this.estado = estado;
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

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
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

    
}
