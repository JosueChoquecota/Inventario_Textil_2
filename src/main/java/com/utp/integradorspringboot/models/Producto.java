/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.models;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer idProducto;

    @Column(name = "nombre", nullable = false, length = 255)
    private String nombre;

    @Column(name = "imagen", length = 255)
    private String imagen; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_marca", nullable = false)
    private Marca marca;

    public Producto() {
    }

    // Constructor actualizado
    public Producto(Integer idProducto, String nombre, String imagen, Categoria categoria, Marca marca) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.marca = marca;
    }

    // --- Getters y Setters ---
    public Integer getIdProducto() { return idProducto; }
    public void setIdProducto(Integer idProducto) { this.idProducto = idProducto; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    // Getter/Setter actualizados
    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    public Marca getMarca() { return marca; }
    public void setMarca(Marca marca) { this.marca = marca; }

}