/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.CategoriaDTO;
import com.utp.integradorspringboot.dtos.CategoriaRequestDTO;
import com.utp.integradorspringboot.mappers.CategoriaMapper;
import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.services.CategoriaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaApiController {

    @Autowired
    private CategoriaService categoriaService;
    private final CategoriaMapper categoriaMapper = CategoriaMapper.INSTANCE;

    @PostMapping("/registrar")
    public ResponseEntity<?> crearCategoria(@Valid @RequestBody CategoriaRequestDTO requestDto) {
        try {
            Categoria categoriaNueva = categoriaMapper.dtoToEntity(requestDto);
            Categoria categoriaGuardada = categoriaService.guardarOActualizarCategoria(categoriaNueva);
            CategoriaDTO responseDto = categoriaMapper.entityToDto(categoriaGuardada);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear categoría.");
        }
    }
    @GetMapping("/listar")
    public ResponseEntity<List<CategoriaDTO>> listarCategorias() {
        List<Categoria> categorias = categoriaService.listarTodasCategorias();
        List<CategoriaDTO> categoriasDto = categorias.stream()
                .map(categoriaMapper::entityToDto)
                .toList();
        return ResponseEntity.ok(categoriasDto);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCategoriaPorId(@PathVariable Integer id) {
        try {
            Categoria categoria = categoriaService.buscarCategoriaPorId(id);
            CategoriaDTO responseDto = categoriaMapper.entityToDto(categoria);
            return ResponseEntity.ok(responseDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarCategoria(
            @PathVariable Integer id,
            @RequestBody CategoriaRequestDTO requestDto
    ) {
        try {
            Categoria categoriaExistente = categoriaService.buscarCategoriaPorId(id);

            categoriaExistente.setNombre(requestDto.getNombre());
            categoriaExistente.setDescripcion(requestDto.getDescripcion());

            Categoria categoriaActualizada = categoriaService.guardarOActualizarCategoria(categoriaExistente);
            CategoriaDTO responseDto = categoriaMapper.entityToDto(categoriaActualizada);

            return ResponseEntity.ok(responseDto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar la categoría: " + e.getMessage());
        }
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Integer id) {
        try {
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.ok("Categoría eliminada correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la categoría: " + e.getMessage());
        }
    }
}