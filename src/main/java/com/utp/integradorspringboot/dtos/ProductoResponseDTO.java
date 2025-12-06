package com.utp.integradorspringboot.dtos;

import java.util.List;

public class ProductoResponseDTO {
    private Integer idProducto;
    private String nombre;
    private String imagen;
    
    private CategoriaResponseDTO categoria;
    private MarcaResponseDTO marca;
    private String descripcion;
    private List<StockItemDTO> stock;

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public CategoriaResponseDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaResponseDTO categoria) {
        this.categoria = categoria;
    }

    public MarcaResponseDTO getMarca() {
        return marca;
    }

    public void setMarca(MarcaResponseDTO marca) {
        this.marca = marca;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<StockItemDTO> getStock() {
        return stock;
    }

    public void setStock(List<StockItemDTO> stock) {
        this.stock = stock;
    }

    
}
