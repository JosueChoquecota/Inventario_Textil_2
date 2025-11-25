/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.CategoriaRequestDTO;
import com.utp.integradorspringboot.dtos.CategoriaResponseDTO;
import com.utp.integradorspringboot.mappers.CategoriaMapper;
import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.repositories.CategoriaRepository;
import com.utp.integradorspringboot.services.CategoriaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ASUS
 */
@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaApiController {

    private final CategoriaService categoriaService;
    private CategoriaRepository categoriaRepository;

    private final CategoriaMapper categoriaMapper = CategoriaMapper.INSTANCE;

    @Autowired
    public CategoriaApiController(CategoriaService categoriaService, CategoriaRepository categoriaRepository) {
        this.categoriaService = categoriaService;
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<CategoriaResponseDTO>> listarCategorias() {
        try {
            List<Categoria> categorias = categoriaService.listarCategoria();
            List<CategoriaResponseDTO> response = categoriaMapper.toDTOList(categorias);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarCategoria(
            @Valid @RequestBody CategoriaRequestDTO dto) {
        try {
            Categoria categoria = categoriaMapper.toEntityRequest(dto);
            Categoria guardado = categoriaService.crear(categoria);

            CategoriaResponseDTO response = categoriaMapper.toDTOResponse(guardado);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarCategoria(
            @PathVariable Integer id,
            @Valid @RequestBody CategoriaRequestDTO dto) {

        try {
            Categoria nuevosDatos = categoriaMapper.toEntityRequest(dto);
            Categoria actualizado = categoriaService.actualizar(id, nuevosDatos);

            CategoriaResponseDTO response = categoriaMapper.toDTOResponse(actualizado);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Integer id) {
        try {
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            if (e.getMessage().contains("no encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

