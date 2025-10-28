/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.ProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ProductoResponseDTO;
import com.utp.integradorspringboot.mappers.ProductoMapper;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.services.ProductoService;
import java.io.File;
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
@RequestMapping("/api/v1/inventario")
public class InventarioApiController {
    private final ProductoService productoService;
    private final ProductoMapper productoMapper = ProductoMapper.INSTANCE; 

    @Autowired
    public InventarioApiController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping(value = "/registrar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearProducto(
            @RequestPart("data") ProductoRequestDTO requestDto,
            @RequestPart(value = "imagen", required = false) MultipartFile imagenFile
    ) {
        try {
            Producto producto = productoMapper.requestDtoToEntity(requestDto);
            if (imagenFile != null && !imagenFile.isEmpty()) {
                String uploadDir = "uploads/productos/";

                File directorio = new File(uploadDir);
                if (!directorio.exists()) {
                    directorio.mkdirs();
                }

                String nombreArchivo = System.currentTimeMillis() + "_" + imagenFile.getOriginalFilename();
                Path rutaArchivo = Paths.get(uploadDir, nombreArchivo);
                Files.copy(imagenFile.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);
                producto.setImagen(uploadDir + nombreArchivo);
            } else {
                producto.setImagen("uploads/productos/default.png");
            }

            Producto productoGuardado = productoService.guardarOActualizarProducto(
                    producto,
                    requestDto.getIdMarca(),
                    requestDto.getIdCategoria()
            );
            ProductoResponseDTO responseDto = productoMapper.entityToResponseDto(productoGuardado);

            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el producto: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProductoResponseDTO>> listarProductos() {
        List<Producto> productos = productoService.listarTodosProductos();
        List<ProductoResponseDTO> responseDtos = productoMapper.entityListToResponseDtoList(productos);
        return ResponseEntity.ok(responseDtos); // 200 OK
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarProductoPorId(@PathVariable Integer id) {
        try {
            Producto producto = productoService.buscarProductoPorId(id)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            ProductoResponseDTO responseDto = productoMapper.entityToResponseDto(producto);
            return ResponseEntity.ok(responseDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
        }
    }
    @PutMapping(value = "/actualizar/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> actualizarProducto(
            @PathVariable Integer id,
            @RequestPart("data") ProductoRequestDTO requestDto,
            @RequestPart(value = "imagen", required = false) MultipartFile imagenFile) {

        try {
            Producto productoExistente = productoService.buscarProductoPorId(id)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            productoExistente.setNombre(requestDto.getNombre());

            if (imagenFile != null && !imagenFile.isEmpty()) {
                String uploadDir = "uploads/productos/";
                File directorio = new File(uploadDir);
                if (!directorio.exists()) directorio.mkdirs();

                String nombreArchivo = System.currentTimeMillis() + "_" + imagenFile.getOriginalFilename();
                Path rutaArchivo = Paths.get(uploadDir, nombreArchivo);
                Files.copy(imagenFile.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);
                productoExistente.setImagen(uploadDir + nombreArchivo);
            }

            Producto productoActualizado = productoService.guardarOActualizarProducto(
                    productoExistente,
                    requestDto.getIdMarca(),
                    requestDto.getIdCategoria()
            );

            return ResponseEntity.ok(productoActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar: " + e.getMessage());
        }
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Integer id) {
        try {
            productoService.eliminarProducto(id); 
            return ResponseEntity.noContent().build(); 
        } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al eliminar el producto.");
        }
    }
}
