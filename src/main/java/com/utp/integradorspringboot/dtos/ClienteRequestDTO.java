package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public class ClienteRequestDTO {
    @NotBlank(message = "El nombre es requerido")
    private String nombres;
    @NotBlank(message = "El apellidos es requerido")
    private String apellidos;
    @NotNull(message = "El idTipoDoc es requerido")
    private Integer idTipoDoc;
    @NotBlank(message = "El nDocumento es requerido")
    private String nDocumento;
    @NotBlank(message = "El direccion es requerido")
    private String direccion;
    @NotBlank(message = "El telefono es requerido")
    private String telefono;
    @NotBlank(message = "El correo es requerido")
    private String correo;

    public ClienteRequestDTO() {
    }

    public ClienteRequestDTO(String nombres, String apellidos, Integer idTipoDoc, String nDocumento, String direccion, String telefono, String correo) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.idTipoDoc = idTipoDoc;
        this.nDocumento = nDocumento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
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
