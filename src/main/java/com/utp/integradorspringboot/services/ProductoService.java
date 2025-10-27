/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.repositories.CategoriaRepository;
import com.utp.integradorspringboot.repositories.MarcaRepository;
import com.utp.integradorspringboot.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private MarcaRepository marcaRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Transactional
    public Producto guardarOActualizarProducto(Producto producto, Integer idMarca, Integer idCategoria) {
        if (producto.getIdProducto() == null && productoRepository.existsByNombreIgnoreCase(producto.getNombre())) {
            throw new RuntimeException("Ya existe un producto con el nombre: " + producto.getNombre());
        }
        Marca marca = marcaRepository.findById(idMarca)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con ID: " + idMarca));
        producto.setMarca(marca);

        Categoria categoria = categoriaRepository.findById(idCategoria)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + idCategoria));
        producto.setCategoria(categoria);
        
        return productoRepository.save(producto);
    }
    
    public List<Producto> listarTodosProductos() {
        return productoRepository.findAll();
    }
    public Optional<Producto> buscarProductoPorId(Integer id) {
            return productoRepository.findById(id);
        }
    @Transactional
    public void eliminarProducto(Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + idProducto));
        productoRepository.delete(producto);
    }
    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }
    
}
