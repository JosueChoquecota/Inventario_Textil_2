/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.services.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/trabajadores")
public class TrabajadorApiController {

    private final TrabajadorService trabajadorService;

    @Autowired
    public TrabajadorApiController(TrabajadorService trabajadorService) {
        this.trabajadorService = trabajadorService;
    }

    // Registrar trabajador
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarTrabajador(
            @RequestParam String nombres,
            @RequestParam String apellidos,
            @RequestParam String correo,
            @RequestParam String contrasena,
            @RequestParam String telefono,
            @RequestParam Integer nDocumento,
            @RequestParam Integer tipoDocumentoId,
            @RequestParam Integer rolId
    ) {
        try {
            // Crear la entidad Trabajador con los datos del request
            Trabajador trabajador = new Trabajador();
            trabajador.setNombres(nombres);
            trabajador.setApellidos(apellidos);
            trabajador.setCorreo(correo);
            trabajador.setContrasena(contrasena);
            trabajador.setTelefono(telefono);
            trabajador.setnDocumento(nDocumento);

            // Llamar al service
            Trabajador nuevoTrabajador = trabajadorService.registrarTrabajador(trabajador, tipoDocumentoId, rolId);

            return ResponseEntity.ok(nuevoTrabajador);

        } catch (IllegalArgumentException e) {
            // Errores de validación
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            // Otros errores (correo duplicado, rol/tipoDocumento no encontrado, etc.)
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }
    @PostMapping("/login")
public ResponseEntity<?> login(
        @RequestParam String correo,
        @RequestParam String contrasena
) {
    try {
        Trabajador trabajador = trabajadorService.login(correo, contrasena);

        // Retornar solo datos seguros (sin contraseña)
        trabajador.setContrasena(null);

        return ResponseEntity.ok(trabajador);

    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
    }
}
}
