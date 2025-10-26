package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.*;

public class ProveedorRequestDTO {

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 255)
    private String nombres;
    @NotBlank(message = "El apellido/razón social no puede estar vacío")
    @Size(max = 255)
    private String apellidos;
    @NotNull(message = "El ID del tipo de documento es requerido")
    private Integer idTipoDoc;
    @NotNull(message = "El número de documento es requerido")
    private Integer nDocumento; 
    @Size(max = 255)
    private String direccion;
    @Size(max = 9) 
    private String telefono;

    public ProveedorRequestDTO() {
    }

    public ProveedorRequestDTO(String nombres, String apellidos, Integer idTipoDoc, Integer nDocumento, String direccion, String telefono) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.idTipoDoc = idTipoDoc;
        this.nDocumento = nDocumento;
        this.direccion = direccion;
        this.telefono = telefono;
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

    public Integer getnDocumento() {
        return nDocumento;
    }

    public void setnDocumento(Integer nDocumento) {
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

    
 
}
