package com.utp.integradorspringboot.dtos;

public class ProveedorResponseDTO {

    private Integer idProveedor;
    private String nombres;
    private String apellidos; 
    private Integer nDocumento; 
    private String direccion;
    private String telefono;
    private TipoDocumentoDTO tipoDocumento;

    public ProveedorResponseDTO() {
    }
    
    public ProveedorResponseDTO(Integer idProveedor, String nombres, String apellidos, Integer nDocumento, String direccion, String telefono, TipoDocumentoDTO tipoDocumento) {
        this.idProveedor = idProveedor;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.nDocumento = nDocumento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.tipoDocumento = tipoDocumento;
    }


    public Integer getIdProveedor() { return idProveedor; }
    public void setIdProveedor(Integer idProveedor) { this.idProveedor = idProveedor; }
    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }
    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public Integer getNDocumento() { return nDocumento; } // Corrected name
    public void setNDocumento(Integer nDocumento) { this.nDocumento = nDocumento; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public TipoDocumentoDTO getTipoDocumento() { return tipoDocumento; }
    public void setTipoDocumento(TipoDocumentoDTO tipoDocumento) { this.tipoDocumento = tipoDocumento; }
}