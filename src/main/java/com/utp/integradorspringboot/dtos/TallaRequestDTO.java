package com.utp.integradorspringboot.dtos;
    import jakarta.validation.constraints.NotBlank;
    import jakarta.validation.constraints.NotNull;
    import jakarta.validation.constraints.Size;

public class TallaRequestDTO {
    
    @NotBlank(message = "Talla requerida")
    private String talla;
    @NotBlank(message = "Tipo de talla")
    private String tipo;
    @NotBlank(message = "Descripcion")
    private String descripcion;

    public TallaRequestDTO() {
    }  
    public TallaRequestDTO(String talla, String tipo, String descripcion) {
        this.talla = talla;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
    public String getTalla() {
        return talla;
    }
    public void setTalla(String talla) {
        this.talla = talla;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }   
}
