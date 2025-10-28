/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.repositories.ColorRepository;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ColorService {

    private final ColorRepository colorRepository;
    private final ListaProductosRepository listaProductosRepository; // Inyectar para validación

    @Autowired
    public ColorService(ColorRepository colorRepository, ListaProductosRepository listaProductosRepository) {
        this.colorRepository = colorRepository;
        this.listaProductosRepository = listaProductosRepository;
    }

    @Transactional
    public Color guardarOActualizarColor(Color color) {
        Optional<Color> existente = colorRepository.findByColorIgnoreCase(color.getColor());
        if (existente.isPresent() && !existente.get().getIdColor().equals(color.getIdColor())) {
            throw new RuntimeException("Ya existe un color con el nombre: " + color.getColor());
        }
        return colorRepository.save(color);
    }

    @Transactional
    public List<Color> listarTodosColores() {
        return colorRepository.findAll();
    }

    @Transactional
    public Color buscarColorPorId(Integer id) {
        return colorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Color no encontrado con ID: " + id));
    }

    @Transactional
    public void eliminarColor(Integer id) {
        if (!colorRepository.existsById(id)) {
            throw new RuntimeException("Color no encontrado con ID: " + id);
        }
        // Validar si algún ListaProductos usa este color
        // Necesitas un método countByColorIdColor en ListaProductosRepository
        // if (listaProductosRepository.countByColorIdColor(id) > 0) {
        //     throw new RuntimeException("No se puede eliminar el color, está en uso por productos.");
        // }
        colorRepository.deleteById(id);
    }
}