/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.TrabajadorRequestDTO;
import com.utp.integradorspringboot.dtos.TrabajadorResponseDTO;
import com.utp.integradorspringboot.mappers.TrabajadorMapper;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.services.TrabajadorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController // Indica que es un controlador REST
@RequestMapping("/api/v1/trabajadores") // URL Base para la API de Trabajadores
@RequiredArgsConstructor // Inyección por constructor (reemplaza @Autowired)
public class TrabajadorApiController {

    private final TrabajadorService trabajadorService;
    // Inyecta el mapper (si lo anotaste con @Mapper(componentModel = "spring"))
    // private final TrabajadorMapper trabajadorMapper; 
    // O usa la instancia estática si no lo hiciste un bean de Spring
    private final TrabajadorMapper trabajadorMapper = TrabajadorMapper.INSTANCE;

    // --- Endpoint para REGISTRAR (Crear) un trabajador ---
    @PostMapping("/registrar") // Cambiado a /registrar para diferenciarlo de un posible PUT
    public ResponseEntity<?> registrarTrabajador(
            @Valid @RequestBody TrabajadorRequestDTO requestDto // 1. Recibe y Valida el DTO
    ) {
        try {
            // 2. Mapea DTO -> Entidad Parcial
            Trabajador trabajadorParcial = trabajadorMapper.requestDtoToEntity(requestDto);

            // 3. Llama al Servicio (pasa entidad parcial y IDs)
            Trabajador trabajadorGuardado = trabajadorService.registrarTrabajador(
                    trabajadorParcial,
                    requestDto.getIdTipoDoc(),
                    requestDto.getIdRol()
            );

            // 4. Mapea Entidad -> ResponseDTO
            TrabajadorResponseDTO responseDto = trabajadorMapper.entityToResponseDto(trabajadorGuardado);

            // 5. Devuelve Éxito (201 Created)
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

        } catch (IllegalArgumentException e) { 
            // Captura errores específicos del servicio (ej. Rol no encontrado, correo duplicado)
            return ResponseEntity.badRequest().body(e.getMessage()); // Devuelve 400 Bad Request
        } catch (Exception e) {
            // Captura errores inesperados
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al registrar trabajador.");
        }
    }
}