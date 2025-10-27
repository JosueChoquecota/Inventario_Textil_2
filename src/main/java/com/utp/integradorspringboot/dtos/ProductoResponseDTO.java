/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

public class ProductoResponseDTO {
    
    private Integer idProducto;
    private String nombre;
    private String imagen;
    private CategoriaDTO categoria;
    private MarcaDTO marca;
    
    private String descLogo;
    private String descCategoria;

    public ProductoResponseDTO() {
    }

    public ProductoResponseDTO(Integer idProducto, String nombre, String imagen, CategoriaDTO categoria, MarcaDTO marca, String descLogo, String descCategoria) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.marca = marca;
        this.descLogo = descLogo;
        this.descCategoria = descCategoria;
    }

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

    public CategoriaDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaDTO categoria) {
        this.categoria = categoria;
    }

    public MarcaDTO getMarca() {
        return marca;
    }

    public void setMarca(MarcaDTO marca) {
        this.marca = marca;
    }

    public String getDescLogo() {
        return descLogo;
    }

    public void setDescLogo(String descLogo) {
        this.descLogo = descLogo;
    }

    public String getDescCategoria() {
        return descCategoria;
    }

    public void setDescCategoria(String descCategoria) {
        this.descCategoria = descCategoria;
    }
    
    
    
}
