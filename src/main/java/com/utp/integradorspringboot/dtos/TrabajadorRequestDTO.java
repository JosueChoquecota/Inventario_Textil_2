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
    
  // 1. Private Fields
    @NotNull(message = "El ID de tipo de documento es requerido")
    private Integer idTipoDoc;

    @NotNull(message = "El número de documento es requerido")
    private Integer nDocumento;

    @NotBlank(message = "El nombre es requerido")
    private String nombres;
    
    @NotBlank(message = "El nombre es requerido")
    private String apellidos;
    @NotBlank(message = "El telefono es requerido")
    private String telefono;
    @NotNull(message = "El correo es requerido")
    private String correo;
    @NotBlank(message = "La contrasena es requerido")
    private String contrasena;
    // ... (otros campos privados) ...

    @NotNull(message = "El ID de rol es requerido")
    private Integer idRol;

    // 3. Public No-Argument Constructor
    public TrabajadorRequestDTO() {
    }

    // (Opcional: puedes tener otros constructores si los necesitas)
    public TrabajadorRequestDTO(Integer idTipoDoc, Integer nDocumento, /*... otros ...*/ Integer idRol) {
       this.idTipoDoc = idTipoDoc;
       this.nDocumento = nDocumento;
       // ... asignar otros ...
       this.idRol = idRol;
    }  

    public Integer getIdTipoDoc() {
        return idTipoDoc;
    }

    public void setIdTipoDoc(Integer idTipoDoc) {
        this.idTipoDoc = idTipoDoc;
    }

    public Integer getnDocumento() {
        return nDocumento;
    }

    public void setnDocumento(Integer nDocumento) {
        this.nDocumento = nDocumento;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
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
    
    
    
    
    
    
}
