/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.ClienteRequestDTO;
import com.utp.integradorspringboot.dtos.ClienteResponseDTO;
import com.utp.integradorspringboot.mappers.ClienteMapper;
import com.utp.integradorspringboot.models.Cliente;
import com.utp.integradorspringboot.repositories.ClienteRepository;
import com.utp.integradorspringboot.services.ClienteService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/v1/clientes")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // ✅ AGREGAR ESTO
public class ClienteApiController {
    private final ClienteService clienteService;
    private ClienteRepository clienteRepository;
    
    private final ClienteMapper clienteMapper = ClienteMapper.INSTANCE;
    
    @Autowired
    public ClienteApiController(ClienteService clienteService,ClienteRepository clienteRepository) {
        this.clienteService = clienteService;
        this.clienteRepository = clienteRepository;
    }
    @GetMapping("/listar")
    public ResponseEntity<List<ClienteResponseDTO>> listarClientes() {
        List<Cliente> clientes = clienteService.listaClientes();
        List<ClienteResponseDTO> response = clienteMapper.toDTOList(clientes);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarCliente(@Valid @RequestBody ClienteRequestDTO dto) {
        Cliente cliente = clienteMapper.toEntityRequest(dto);
        Cliente guardado = clienteService.crear(cliente, dto.getIdTipoDoc());
        
        ClienteResponseDTO response = clienteMapper.toDTOResponse(guardado);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarCliente(
        @PathVariable Integer id,
        @Valid @RequestBody ClienteRequestDTO dto) {
              Cliente nuevoDatos = clienteMapper.toEntityRequest(dto);
              Cliente actualizado = clienteService.actualizar(id, nuevoDatos, dto.getIdTipoDoc());
        ClienteResponseDTO response = clienteMapper.toDTOResponse(actualizado);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarCliente(@PathVariable Integer id) {
         try {
        System.out.println("🗑️ Eliminando cliente ID: " + id);
        
        clienteService.eliminarCliente(id);
        
        // ✅ SIEMPRE retornar JSON
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Cliente eliminado exitosamente");
        response.put("id", id);
        
        return ResponseEntity.ok(response);  // Status 200 con JSON
        
    } catch (RuntimeException e) {
        System.err.println("❌ Error: " + e.getMessage());
        
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("status", "error");
        errorResponse.put("message", e.getMessage());
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(errorResponse);
    }
    }
}
