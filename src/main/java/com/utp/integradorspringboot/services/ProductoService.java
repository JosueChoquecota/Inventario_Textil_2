/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.ProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ProductoResponseDTO;
import com.utp.integradorspringboot.mappers.ProductoMapper;
import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.repositories.CategoriaRepository;
import com.utp.integradorspringboot.repositories.MarcaRepository;
import com.utp.integradorspringboot.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private MarcaRepository marcaRepository;
    @Autowired
    private ImagenService imagenService;
    @Autowired
    private ProductoMapper mapper;

    @Transactional
    public List<Producto> listarProductos() {
        List<Producto> productos = productoRepository.findAll();
        productos.forEach(p -> {
            p.getCategoria().getNombre();
            p.getMarca().getMarca();
        });
        return productos;
    }
    
    @Transactional
    public Producto obtenerPorId(Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.getCategoria().getNombre();
        producto.getMarca().getMarca();
        return producto;
    }
    
    // ✅ CREAR: Recibe la ruta de imagen desde el controlador
    @Transactional
    public Producto crear(ProductoRequestDTO dto) {
        Producto producto = mapper.toEntityRequest(dto);

        producto.setCategoria(
                categoriaRepository.findById(dto.getIdCategoria())
                        .orElseThrow(() -> new RuntimeException("Categoria no encontrada"))
        );
        producto.setMarca(
                marcaRepository.findById(dto.getIdMarca())
                        .orElseThrow(() -> new RuntimeException("Marca no encontrada"))
        );
        
        // ✅ La ruta ya viene en el DTO desde el controlador
        // No hacer nada más con la imagen aquí
        
        return productoRepository.save(producto);
    }

    // ✅ ACTUALIZAR: Recibe la ruta de imagen desde el controlador
    @Transactional
    public Producto actualizar(Integer id, ProductoRequestDTO dto) {
        Producto existente = obtenerPorId(id);
        
        // ✅ Guardar la imagen anterior para posible eliminación
        String imagenAnterior = existente.getImagen();
        
        // Actualizar campos básicos
        mapper.updateEntityFromDTO(dto, existente);
        
        existente.setCategoria(
                categoriaRepository.findById(dto.getIdCategoria())
                        .orElseThrow(() -> new RuntimeException("Categoria no encontrada"))
        );
        existente.setMarca(
                marcaRepository.findById(dto.getIdMarca())
                        .orElseThrow(() -> new RuntimeException("Marca no encontrada"))
        );
        
        // ✅ Si hay nueva imagen y es diferente a la anterior, eliminar la vieja
        if (dto.getImagen() != null 
            && !dto.getImagen().isEmpty() 
            && !dto.getImagen().equals(imagenAnterior)
            && imagenAnterior != null) {
            
            imagenService.eliminarImagen(imagenAnterior);
            System.out.println("🗑️ Imagen anterior eliminada: " + imagenAnterior);
        }
        
        return productoRepository.save(existente);
    }
    
    @Transactional
    public void eliminar(Integer id) {
        Producto producto = obtenerPorId(id);
        
        // ✅ Eliminar imagen física antes de borrar el registro
        if (producto.getImagen() != null && !producto.getImagen().isEmpty()) {
            imagenService.eliminarImagen(producto.getImagen());
        }
        
        productoRepository.deleteById(id);
    }
}