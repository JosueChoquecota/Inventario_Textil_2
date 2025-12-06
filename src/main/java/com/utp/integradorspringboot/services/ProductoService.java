/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.CategoriaResponseDTO;
import com.utp.integradorspringboot.dtos.MarcaResponseDTO;
import com.utp.integradorspringboot.dtos.ProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ProductoResponseDTO;
import com.utp.integradorspringboot.dtos.StockItemDTO;
import com.utp.integradorspringboot.mappers.ProductoMapper;
import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.repositories.CategoriaRepository;
import com.utp.integradorspringboot.repositories.MarcaRepository;
import com.utp.integradorspringboot.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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
    public List<ProductoResponseDTO> obtenerProductosConStock() {
        List<Object[]> resultados = productoRepository.findProductosConStock();
        Map<Integer, ProductoResponseDTO> productosMap = new LinkedHashMap<>();

        for (Object[] row : resultados) {
            Integer idProducto = (Integer) row[0];

            ProductoResponseDTO producto = productosMap.computeIfAbsent(idProducto, k -> {
                ProductoResponseDTO p = new ProductoResponseDTO();
                p.setIdProducto(idProducto);           // row[0] - id_producto
                p.setNombre((String) row[1]);          // row[1] - nombreProducto
                // p.setImagen((String) row[2]);       // ❌ Tu SQL no tiene imagen, comenta esta línea

                MarcaResponseDTO marca = new MarcaResponseDTO();
                marca.setMarca((String) row[2]);       // row[2] - marcaNombre (no row[3])
                p.setMarca(marca);

                CategoriaResponseDTO categoria = new CategoriaResponseDTO();
                categoria.setNombre((String) row[3]);  // row[3] - categoriaNombre (no row[4])
                p.setCategoria(categoria);

                p.setStock(new ArrayList<>());
                return p;
            });

            // Índices correctos según tu SQL
            StockItemDTO stockItem = new StockItemDTO(
                (Integer) row[5],    // id_talla
                (Integer) row[7],    // id_color
                (Integer) row[9],    // cantidad
                (BigDecimal) row[10] // precio_unitario
            );

            // Agregar nombres de talla y color al StockItemDTO
            stockItem.setNombreTalla((String) row[6]);   // nombreTalla
            stockItem.setNombreColor((String) row[8]);   // nombreColor

            producto.getStock().add(stockItem);
        }

        return new ArrayList<>(productosMap.values());
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