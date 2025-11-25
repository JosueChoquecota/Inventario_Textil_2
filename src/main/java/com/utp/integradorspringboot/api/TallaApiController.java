package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.TallaRequestDTO;
import com.utp.integradorspringboot.dtos.TallaResponseDTO;
import com.utp.integradorspringboot.mappers.TallaMapper;
import com.utp.integradorspringboot.models.Talla;
import com.utp.integradorspringboot.repositories.TallaRepository;
import com.utp.integradorspringboot.services.TallaService;
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


@RestController
@RequestMapping("/api/v1/tallas")
public class TallaApiController {
    private final TallaService tallaService;
    private TallaRepository tallaRepository;
    
    private final TallaMapper tallaMapper = TallaMapper.INSTANCE;
    
    @Autowired
    public TallaApiController(TallaService tallaService,TallaRepository tallaRepository) {
        this.tallaService = tallaService;
        this.tallaRepository = tallaRepository;
    }
    @GetMapping("/listar")
    public ResponseEntity<List<TallaResponseDTO>> listarTallas() {
        try {
            List<Talla> tallas = tallaService.listarTallas();
            List<TallaResponseDTO> response = tallaMapper.toDTOList(tallas);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarTalla(@Valid @RequestBody TallaRequestDTO dto) {
        try {
            Talla talla  = tallaMapper.toEntityRequest(dto);
            
            Talla guardado = tallaService.crear(talla);
        
            TallaResponseDTO response = tallaMapper.toDTOResponse(guardado);
            return ResponseEntity.ok(response);
        } catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarTalla(
            @PathVariable Integer id,
            @Valid @RequestBody TallaRequestDTO dto) 
    {
        try {
            Talla nuevosDatos = tallaMapper.toEntityRequest(dto);

            Talla actualizado = tallaService.actualizar(id, nuevosDatos);

            TallaResponseDTO response = tallaMapper.toDTOResponse(actualizado);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } 
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarTalla(
            @PathVariable Integer id) {
        try {
            tallaService.eliminarTalla(id);
        return ResponseEntity.noContent().build();
        } catch(RuntimeException e) {
            if (e.getMessage().contains("no encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al eliminar la talla .");

        } 
    
    }
    
}
