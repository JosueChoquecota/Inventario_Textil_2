/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.VentaRequestDTO;
import com.utp.integradorspringboot.dtos.VentaResponseDTO;
import com.utp.integradorspringboot.services.VentaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ventas")
public class VentaApiController {
    
    @Autowired 
    private VentaService ventaService;
    
    
    @GetMapping("/listar")
    public ResponseEntity<List<VentaResponseDTO>> listar() {
        return ResponseEntity.ok(ventaService.listaVentas());
    }
    @GetMapping("/{id}")
    public ResponseEntity<VentaResponseDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(ventaService.obtenerVentaPorId(id));
    }
    @PostMapping("/registrar")
    public ResponseEntity<VentaResponseDTO> registrar(@RequestBody VentaRequestDTO dto){
        return ResponseEntity.ok(ventaService.registrarVenta(dto));
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id){
        ventaService.eliminarVenta(id);
        return ResponseEntity.ok().build();
    }
    
}
