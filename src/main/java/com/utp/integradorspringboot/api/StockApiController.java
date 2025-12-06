/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.StockResponseDTO;
import com.utp.integradorspringboot.services.StockService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/stock")
public class StockApiController {
    @Autowired
    private StockService stockService;
    
    

    @GetMapping("/listar")
    public ResponseEntity<List<StockResponseDTO>> listarStock() {
        return ResponseEntity.ok(stockService.listarStock());
    }
}
