/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.ColorDTO;
import com.utp.integradorspringboot.mappers.ColorMapper;
import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.services.ColorService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/Color")
public class ColorApiController {
   
    private final ColorService colorService;
    private final ColorMapper colorMapper = ColorMapper.INSTANCE;
    @Autowired
    public ColorApiController(ColorService colorService) {
        this.colorService = colorService;
    }
    @PostMapping("/registrar")
    public ResponseEntity<?> guardarColor(@RequestBody Color color) {
        try {
            Color nuevoColor = colorService.guardarOActualizarColor(color);
            return ResponseEntity.ok(nuevoColor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/listar")
        public ResponseEntity<List<ColorDTO>> listarColores() {
            List<Color> colores = colorService.listarTodosColores();
            List<ColorDTO> dtos = colorMapper.entityListToDtoList(colores);
            return ResponseEntity.ok(dtos);
        }  
    }
