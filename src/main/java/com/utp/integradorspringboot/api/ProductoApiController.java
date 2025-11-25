/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.ProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ProductoResponseDTO;
import com.utp.integradorspringboot.mappers.ProductoMapper;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.services.ImagenService;
import com.utp.integradorspringboot.services.ProductoService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/productos")
public class ProductoApiController {

    private final ProductoService productoService;
    private final ProductoMapper productoMapper;
    private final ImagenService imagenService; // ✅ Agregar

    @Autowired
    public ProductoApiController(
            ProductoService productoService, 
            ProductoMapper productoMapper,
            ImagenService imagenService) {
        this.productoService = productoService;
        this.productoMapper = productoMapper;
        this.imagenService = imagenService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProductoResponseDTO>> listarProductos() {
        try {
            List<Producto> productos = productoService.listarProductos();
            List<ProductoResponseDTO> response = productoMapper.toDTOList(productos);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ✅ REGISTRAR
    @PostMapping(value = "/registrar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registrarProducto(
            @RequestPart("data") ProductoRequestDTO dto,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen
    ) {
        System.out.println("======================================");
        System.out.println("📥 REGISTRAR PRODUCTO");
        System.out.println("📦 DTO: " + dto);
        System.out.println("📦 Imagen: " + (imagen != null ? imagen.getOriginalFilename() : "null"));
        System.out.println("======================================");
        
        try {
            // ✅ Guardar imagen AQUÍ y setear la ruta en el DTO
            if (imagen != null && !imagen.isEmpty()) {
                String rutaImagen = imagenService.guardarImagen(imagen);
                dto.setImagen(rutaImagen);
                System.out.println("💾 Imagen guardada: " + rutaImagen);
            }
            
            Producto creado = productoService.crear(dto);
            ProductoResponseDTO response = productoMapper.toDTOResponse(creado);
            
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ✅ ACTUALIZAR
    @PutMapping(value = "/actualizar/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> actualizarProducto(
            @PathVariable Integer id,
            @RequestPart("data") ProductoRequestDTO dto,
            @RequestPart(value = "imagen", required = false) MultipartFile nuevaImagen
    ) {
        System.out.println("======================================");
        System.out.println("📥 ACTUALIZAR PRODUCTO ID: " + id);
        System.out.println("📦 DTO: " + dto);
        System.out.println("📦 Nueva imagen: " + (nuevaImagen != null ? nuevaImagen.getOriginalFilename() : "null"));
        System.out.println("======================================");
        
        try {
            // ✅ Obtener producto actual
            Producto productoActual = productoService.obtenerPorId(id);

            // ✅ Si hay nueva imagen, guardarla y setear en el DTO
            if (nuevaImagen != null && !nuevaImagen.isEmpty()) {
                System.out.println("📦 Procesando nueva imagen: " + nuevaImagen.getOriginalFilename());
                System.out.println("📦 Tamaño: " + nuevaImagen.getSize() + " bytes");
                
                // Guardar nueva imagen
                String rutaNuevaImagen = imagenService.guardarImagen(nuevaImagen);
                dto.setImagen(rutaNuevaImagen);
                System.out.println("💾 Nueva imagen guardada: " + rutaNuevaImagen);
            } else {
                System.out.println("📝 Sin imagen nueva, manteniendo la existente");
                // ✅ Mantener la imagen actual
                dto.setImagen(productoActual.getImagen());
            }

            // ✅ Actualizar producto (el service eliminará la imagen anterior si cambió)
            Producto actualizado = productoService.actualizar(id, dto);
            ProductoResponseDTO response = productoMapper.toDTOResponse(actualizado);

            System.out.println("✅ Producto actualizado correctamente");
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Integer id) {
        try {
            productoService.eliminar(id);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}