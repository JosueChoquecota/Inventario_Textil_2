/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.StockResponseDTO;
import com.utp.integradorspringboot.mappers.StockMapper;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockService {
    @Autowired
    private ListaProductosRepository listaProductosRepository;
    @Autowired
    private StockMapper stockMapper; // Si usas MapStruct

    public List<StockResponseDTO> listarStock() {
        List<ListaProductos> lista = listaProductosRepository.findAll();
        return stockMapper.toStockDTOList(lista);
    }
}
