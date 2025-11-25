/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.CompraRequestDTO;
import com.utp.integradorspringboot.dtos.CompraResponseDTO;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import com.utp.integradorspringboot.services.CompraService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/compras")
public class CompraApiController {

    @Autowired
    private CompraService compraService;

    @GetMapping("/listar")
    public ResponseEntity<List<CompraResponseDTO>> listar() {
        return ResponseEntity.ok(compraService.listarCompras());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompraResponseDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(compraService.obtenerCompraPorId(id));
    }

    @PostMapping("/registrar")
    public ResponseEntity<CompraResponseDTO> registrar(@RequestBody CompraRequestDTO dto) {
        return ResponseEntity.ok(compraService.registrarCompra(dto));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        compraService.eliminarCompra(id);
        return ResponseEntity.ok().build();
    }
}