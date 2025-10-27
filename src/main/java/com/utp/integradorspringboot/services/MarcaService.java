/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.repositories.MarcaRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;
 
    @Transactional
    public Marca guardarOActualizarMarca(Marca marca) {
        Optional<Marca> existente = marcaRepository.findByMarcaIgnoreCase(marca.getMarca());
        if (existente.isPresent() && !existente.get().getIdMarca().equals(marca.getIdMarca())) {
            throw new RuntimeException("Ya existe una marca con el nombre: " + marca.getMarca());
        }     
        return marcaRepository.save(marca);
    }

    @Transactional
    public List<Marca> listarTodasMarcas() {
        return marcaRepository.findAll();
    }
    @Transactional
    public Marca buscarMarcaPorId(Integer id) {
        return marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con ID: " + id));
    }
    @Transactional
    public void eliminarMarca(Integer id) {
        if (!marcaRepository.existsById(id)) {
            throw new RuntimeException("Marca no encontrada con ID: " + id);
        }
        marcaRepository.deleteById(id);
    }
}