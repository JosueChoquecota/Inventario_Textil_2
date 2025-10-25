/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.TrabajadorRequestDTO;
import com.utp.integradorspringboot.dtos.TrabajadorResponseDTO;
import com.utp.integradorspringboot.mappers.TrabajadorMapper;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import com.utp.integradorspringboot.services.TrabajadorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;

@RestController 
@RequestMapping("/api/v1/trabajadores") 
public class TrabajadorApiController {

    private final TrabajadorService trabajadorService;
    private TrabajadorRepository trabajadorRepository;
    
    private final TrabajadorMapper trabajadorMapper = TrabajadorMapper.INSTANCE;
    @Autowired 
        public TrabajadorApiController(TrabajadorService trabajadorService) {
            this.trabajadorService = trabajadorService;
        }
    @PostMapping("/registrar") 
    public ResponseEntity<?> registrarTrabajador(
            @Valid @RequestBody TrabajadorRequestDTO requestDto 
    ) {
        try {
            Trabajador trabajadorParcial = trabajadorMapper.requestDtoToEntity(requestDto);
            Trabajador trabajadorGuardado = trabajadorService.registrarTrabajador(
                    trabajadorParcial,
                    requestDto.getIdTipoDoc(),
                    requestDto.getIdRol()
            );

            TrabajadorResponseDTO responseDto = trabajadorMapper.entityToResponseDto(trabajadorGuardado);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

        } catch (IllegalArgumentException e) { 
            return ResponseEntity.badRequest().body(e.getMessage()); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al registrar trabajador.");
        }
    }
    @GetMapping("/actual")
    public ResponseEntity<?> obtenerTrabajadorActual(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }

        String correo = authentication.getName(); 
        Trabajador trabajador = trabajadorRepository.findByCorreo(correo)
            .orElseThrow(() -> new RuntimeException("No se encontró el trabajador"));

        TrabajadorResponseDTO responseDTO = trabajadorMapper.entityToResponseDto(trabajador);
        return ResponseEntity.ok(responseDTO);
    }




}