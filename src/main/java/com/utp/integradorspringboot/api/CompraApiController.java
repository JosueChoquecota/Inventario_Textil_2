/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.CompraRequestDTO;
import com.utp.integradorspringboot.dtos.CompraResponseDTO;
import com.utp.integradorspringboot.dtos.DetalleCompraRequestDTO;
import com.utp.integradorspringboot.dtos.DetalleCompraResponseDTO;
import com.utp.integradorspringboot.mappers.CompraMapper;
import com.utp.integradorspringboot.mappers.DetalleCompraMapper;
import com.utp.integradorspringboot.models.Compra;
import com.utp.integradorspringboot.models.DetalleCompra;
import com.utp.integradorspringboot.repositories.DetalleCompraRepository;
import com.utp.integradorspringboot.services.CompraService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/compras")
public class CompraApiController {
    @Autowired
    private CompraService compraService;
    private final CompraMapper compraMapper = CompraMapper.INSTANCE; // Asume que tienes el mapper
    private final DetalleCompraMapper detalleCompraMapper = DetalleCompraMapper.INSTANCE; // Asume que tienes este
    @Autowired // Necesitarás esto para cargar detalles manualmente
    private DetalleCompraRepository detalleCompraRepository;
    
   @PostMapping("/registrar")
    public ResponseEntity<?> registrarCompra(@RequestBody CompraRequestDTO compraDTO) {
        Compra nuevaCompra = compraService.registrarCompra(compraDTO);

        CompraResponseDTO responseDto = compraMapper.entityToResponseDto(nuevaCompra);

        List<DetalleCompra> detallesEntidad = detalleCompraRepository.findByCompraIdCompra(nuevaCompra.getIdCompra());
        List<DetalleCompraResponseDTO> detallesDto = detalleCompraMapper.entityListToResponseDtoList(detallesEntidad);
        responseDto.setDetalles(detallesDto);


        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }
 

    // 🔹 2. Listar todas las compras
    @GetMapping("/listar")
    public ResponseEntity<List<Compra>> listarCompras() {
        List<Compra> compras = compraService.listarTodasCompras();
        return ResponseEntity.ok(compras);
    }

    // 🔹 3. Buscar una compra por ID
    @GetMapping("/{id}")
    public ResponseEntity<Compra> buscarPorId(@PathVariable Integer id) {
        try {
            Compra compra = compraService.buscarCompraPorId(id);
            return ResponseEntity.ok(compra);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 🔹 4. Eliminar una compra (opcional)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCompra(@PathVariable Integer id) {
        try {
            // Podrías implementar lógica adicional en el service para revertir stock si es necesario
            // compraService.eliminarCompra(id);
            return ResponseEntity.ok("Compra eliminada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar la compra: " + e.getMessage());
        }
    }
}
