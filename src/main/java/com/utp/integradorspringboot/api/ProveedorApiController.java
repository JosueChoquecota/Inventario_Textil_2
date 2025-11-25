package com.utp.integradorspringboot.api;


import com.utp.integradorspringboot.dtos.ProveedorRequestDTO;
import com.utp.integradorspringboot.dtos.ProveedorResponseDTO;
import com.utp.integradorspringboot.mappers.ProveedorMapper;
import com.utp.integradorspringboot.models.Proveedor;
import com.utp.integradorspringboot.services.ProveedorService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/proveedores") 
public class ProveedorApiController {

    @Autowired
    private ProveedorService proveedorService;
    private final ProveedorMapper proveedorMapper = ProveedorMapper.INSTANCE;

    @PostMapping("/registrar") 
    public ResponseEntity<?> crearProveedor(
            @Valid @RequestBody ProveedorRequestDTO requestDto) {
        try {
            Proveedor proveedorParcial = proveedorMapper.requestDtoToEntity(requestDto);
            Proveedor proveedorGuardado = proveedorService.guardarOActualizarProveedor(
                    proveedorParcial,
                    requestDto.getIdTipoDoc()
            );

            ProveedorResponseDTO responseDto = proveedorMapper.entityToResponseDto(proveedorGuardado);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al crear el proveedor."); 
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProveedorResponseDTO>> listarProveedores() {
        List<Proveedor> proveedores = proveedorService.listarTodosProveedores();
        System.out.println("PRUEBA DOC: " + proveedores.get(0).getnDocumento());
        List<ProveedorResponseDTO> responseDtos = proveedorMapper.entityListToResponseDtoList(proveedores);
        return ResponseEntity.ok(responseDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarProveedorPorId(@PathVariable Integer id) {
         try {
             Proveedor proveedor = proveedorService.buscarProveedorPorId(id);
             ProveedorResponseDTO responseDto = proveedorMapper.entityToResponseDto(proveedor);
             return ResponseEntity.ok(responseDto); // 200 OK
         } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
         }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarProveedor(
            @PathVariable Integer id,
            @Valid @RequestBody ProveedorRequestDTO requestDto) {
         try {
             Proveedor proveedorExistente = proveedorService.buscarProveedorPorId(id);
             proveedorMapper.updateEntityFromRequestDto(requestDto, proveedorExistente);
             Proveedor proveedorActualizado = proveedorService.guardarOActualizarProveedor(
                     proveedorExistente,
                     requestDto.getIdTipoDoc()
             );
             ProveedorResponseDTO responseDto = proveedorMapper.entityToResponseDto(proveedorActualizado);
             return ResponseEntity.ok(responseDto);

         } catch (RuntimeException e) { 
             if (e.getMessage().contains("no encontrado")) {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
             }
             return ResponseEntity.badRequest().body(e.getMessage()); 
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al actualizar el proveedor.");
         }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProveedor(@PathVariable Integer id) {
        try {
            proveedorService.eliminarProveedor(id); 
            return ResponseEntity.noContent().build(); 
        } catch (RuntimeException e) { 
             if (e.getMessage().contains("no encontrado")) {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
             }
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
        } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al eliminar el proveedor.");
        }
    }
}
