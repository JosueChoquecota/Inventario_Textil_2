/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.mappers.ColorMapper;
import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.repositories.ColorRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ASUS
 */
@Service
public class ColorService {
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private final ColorMapper mapper = ColorMapper.INSTANCE;
    
    public  List<Color> listarColores() {
        return colorRepository.findAll();
    }
    public Color obtenerPorId(Integer id) {
        return colorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Color no encontrado ID: "+ id));
    }
    public Color crear(Color color) {
        return colorRepository.save(color);
    }
    public Color actualizar( Integer id, Color nuevoColor) {
        Color existente = obtenerPorId(id);
    
        existente.setCodigo(nuevoColor.getCodigo());
        existente.setColor(nuevoColor.getColor());
        
        return colorRepository.save(existente);
    }
    public void eliminarColor(Integer id) {
        if (!colorRepository.existsById(id)) {
            throw new RuntimeException("Color no encontrado: "+ id);
        }
        colorRepository.deleteById(id);
    
    }    
}
