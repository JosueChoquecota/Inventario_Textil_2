/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Talla;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import com.utp.integradorspringboot.repositories.TallaRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TallaService {

    private final TallaRepository tallaRepository;
    private final ListaProductosRepository listaProductosRepository;

    @Autowired
    public TallaService(TallaRepository tallaRepository, ListaProductosRepository listaProductosRepository) {
        this.tallaRepository = tallaRepository;
        this.listaProductosRepository = listaProductosRepository;
    }

    @Transactional
    public Talla guardarOActualizarTalla(Talla talla) {
        Optional<Talla> existente = tallaRepository.findByTallaIgnoreCase(talla.getTalla());
        if (existente.isPresent() && !existente.get().getIdTalla().equals(talla.getIdTalla())) {
            throw new RuntimeException("Ya existe una talla con el nombre: " + talla.getTalla());
        }
        return tallaRepository.save(talla);
    }

    @Transactional
    public List<Talla> listarTodasTallas() {
        return tallaRepository.findAll();
    }

    @Transactional
    public Talla buscarTallaPorId(Integer id) {
        return tallaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talla no encontrada con ID: " + id));
    }

    @Transactional
    public void eliminarTalla(Integer id) {
        if (!tallaRepository.existsById(id)) {
            throw new RuntimeException("Talla no encontrada con ID: " + id);
        }
        // Validar si algún ListaProductos usa esta talla
        // Necesitas un método countByTallaIdTalla en ListaProductosRepository
        // if (listaProductosRepository.countByTallaIdTalla(id) > 0) {
        //     throw new RuntimeException("No se puede eliminar la talla, está en uso por productos.");
        // }
        tallaRepository.deleteById(id);
    }
}