/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.models.Talla;
import com.utp.integradorspringboot.services.TallaService;
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

/**
 *
 * @author ASUS
 */
@RestController
@RequestMapping("/api/v1/Tallas")
public class TallaApiController {
     private final TallaService tallaService;

    @Autowired
    public TallaApiController(TallaService tallaService) {
        this.tallaService = tallaService;
    }

    // 🔹 Crear o actualizar talla
   @PostMapping("/registrar")
    public ResponseEntity<?> guardarTalla(@RequestBody Talla talla) {
        try {
            Talla nuevaTalla = tallaService.guardarOActualizarTalla(talla);
            return ResponseEntity.ok(nuevaTalla);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // 🔹 Listar todas las tallas
    @GetMapping("/listar")
    public List<Talla> listarTallas() {
        return tallaService.listarTodasTallas();
    }

    // 🔹 Buscar talla por ID
    @GetMapping("/{id}")
    public Talla obtenerTallaPorId(@PathVariable Integer id) {
        return tallaService.buscarTallaPorId(id);
    }

    // 🔹 Eliminar talla
    @DeleteMapping("/eliminar/{id}")
    public void eliminarTalla(@PathVariable Integer id) {
        tallaService.eliminarTalla(id);
    }
}
