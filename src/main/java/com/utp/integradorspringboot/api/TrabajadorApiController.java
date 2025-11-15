/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.TrabajadorRequestDTO;
import com.utp.integradorspringboot.dtos.TrabajadorResponseDTO;
import com.utp.integradorspringboot.mappers.TrabajadorMapper;
import com.utp.integradorspringboot.models.Rol;
import com.utp.integradorspringboot.models.TipoDocumento;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import com.utp.integradorspringboot.services.TrabajadorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;

@RestController 
@RequestMapping("/api/v1/trabajadores") 
public class TrabajadorApiController {

    private final TrabajadorService trabajadorService;
    
    private TrabajadorRepository trabajadorRepository;
    
    private final TrabajadorMapper trabajadorMapper = TrabajadorMapper.INSTANCE;
    @Autowired 
        public TrabajadorApiController(TrabajadorService trabajadorService, TrabajadorRepository trabajadorRepository) {
            this.trabajadorService = trabajadorService;
            this.trabajadorRepository = trabajadorRepository;
        }
    @GetMapping("/listar")
    public ResponseEntity<List<TrabajadorResponseDTO>> listarTrabajadores() {
        try {
            List<Trabajador> trabajadores = trabajadorService.listarTodos();
            List<TrabajadorResponseDTO> response = trabajadorMapper.entityListToResponseDtoList(trabajadores);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.out.println("❌ Error al listar: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // ========================================
    // POST /registrar
    // ========================================
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarTrabajador(@Valid @RequestBody TrabajadorRequestDTO dto) {
        try {
            System.out.println("📥 POST /registrar - Datos: " + dto.getNombres() + " " + dto.getApellidos());
            
            // 1. Convertir DTO → Entidad (MapStruct)
            Trabajador trabajador = trabajadorMapper.requestDtoToEntity(dto);
            
            // 2. Crear en el service (valida y asigna relaciones)
            Trabajador guardado = trabajadorService.crear(
                trabajador, 
                dto.getIdRol(), 
                dto.getIdTipoDoc()
            );
            
            // 3. Convertir Entidad → ResponseDTO
            TrabajadorResponseDTO response = trabajadorMapper.entityToResponseDto(guardado);
            
            System.out.println("✅ Trabajador registrado con ID: " + guardado.getId_trabajador());
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            System.out.println("❌ Error de negocio: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            
        } catch (Exception e) {
            System.out.println("❌ Error interno: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al registrar trabajador");
        }
    }
    
    // ========================================
    // PUT /actualizar/{id}
    // ========================================
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarTrabajador(
            @PathVariable Integer id,
            @Valid @RequestBody TrabajadorRequestDTO dto) {
        
        try {
            System.out.println("📥 PUT /actualizar/" + id + " - Datos: " + dto.getNombres() + " " + dto.getApellidos());
            
            // 1. Convertir DTO → Entidad (MapStruct)
            Trabajador nuevosDatos = trabajadorMapper.requestDtoToEntity(dto);
            
            // 2. Actualizar en el service (valida y actualiza relaciones)
            Trabajador actualizado = trabajadorService.actualizar(
                id,
                nuevosDatos,
                dto.getIdRol(),
                dto.getIdTipoDoc(),
                dto.getContrasena()
            );
            
            // 3. Convertir Entidad → ResponseDTO
            TrabajadorResponseDTO response = trabajadorMapper.entityToResponseDto(actualizado);
            
            System.out.println("✅ Trabajador actualizado ID: " + id);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            System.out.println("❌ Error de negocio: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            
        } catch (Exception e) {
            System.out.println("❌ Error interno: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al actualizar trabajador");
        }
    }
    
    // ========================================
    // DELETE /eliminar/{id}
    // ========================================
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarTrabajador(@PathVariable Integer id) {
        try {
            Trabajador trabajador = trabajadorService.obtenerPorId(id);
            
            boolean nuevoEstado = !trabajador.getEstado();
            trabajador.setEstado(nuevoEstado);
            
            trabajadorRepository.save(trabajador);
                        return ResponseEntity.ok("Trabajador desactivado correctamente");
            
        } catch (RuntimeException e) {
            System.out.println("❌ Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            
        } catch (Exception e) {
            System.out.println("❌ Error interno: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al desactivar trabajador");
        }
    }
}