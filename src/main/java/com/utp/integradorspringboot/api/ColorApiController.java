package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.ColorRequestDTO;
import com.utp.integradorspringboot.dtos.ColorResponseDTO;
import com.utp.integradorspringboot.mappers.ColorMapper;
import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.repositories.ColorRepository;
import com.utp.integradorspringboot.services.ColorService;
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
@RequestMapping("/api/v1/colores")
public class ColorApiController {
    private final ColorService colorService;
    private ColorRepository colorRepository;
    
    private final ColorMapper colorMapper = ColorMapper.INSTANCE;
    @Autowired
    public ColorApiController(ColorService colorService, ColorRepository colorRepository) {
        this.colorService = colorService;
        this.colorRepository = colorRepository;
    }
    
    
    @GetMapping("/listar")
    public ResponseEntity<List<ColorResponseDTO>> listarColores() {
        try {
        List<Color> colores = colorService.listarColores();
        List<ColorResponseDTO> response = colorMapper.toDTOList(colores);
        return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } 
    }

   @PostMapping("/registrar")
   public ResponseEntity<?> registrarColor(@Valid @RequestBody ColorRequestDTO dto) {
       try {
           Color color = colorMapper.toEntityRequest(dto);
           Color guardado = colorService.crear(color);
           
           ColorResponseDTO response = colorMapper.toDTOResponse(guardado);
           return ResponseEntity.ok(response);  
       }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
       }  
   }
   @PutMapping("/actualizar/{id}")
   public ResponseEntity<?> actualizarColor(
        @PathVariable Integer id,
        @Valid @RequestBody ColorRequestDTO dto) 
   {
       try {
           Color nuevosDatos = colorMapper.toEntityRequest(dto);
           Color actualizado = colorService.actualizar(id, nuevosDatos);
           
           ColorResponseDTO response = colorMapper.toDTOResponse(actualizado);
           return ResponseEntity.ok(response);
       }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } 
   }
   @DeleteMapping("/eliminar/{id}")
   public ResponseEntity<?> eliminarColor(
   @PathVariable Integer id) {
       try {
           colorService.eliminarColor(id);
       return ResponseEntity.noContent().build();
       }catch(RuntimeException e) {
            if (e.getMessage().contains("no encontrado")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al eliminar el color.");
        } 
   }
}
