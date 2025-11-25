/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.mappers.TallaMapper;
import com.utp.integradorspringboot.models.Talla;
import com.utp.integradorspringboot.repositories.TallaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ASUS
 */

@Service
public class TallaService {
    
        @Autowired
        private TallaRepository tallaRepository;
        @Autowired
        private final TallaMapper mapper = TallaMapper.INSTANCE;
        
        public List<Talla> listarTallas() {
            return tallaRepository.findAll();
        } 
        public Talla obtenerPorId(Integer id) {
            return tallaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Talla no encontrada con ID: " + id));
        }
        public Talla crear(Talla talla) {
            return tallaRepository.save(talla);
        }
        
        public Talla actualizar(Integer id, Talla nuevaTalla) {
            Talla existente = obtenerPorId(id);    
            
            existente.setTalla(nuevaTalla.getTalla());
            existente.setTipo(nuevaTalla.getTipo());
            existente.setDescripcion(nuevaTalla.getDescripcion());
            
            return tallaRepository.save(existente);
        }
        public void eliminarTalla(Integer id) {
            if (!tallaRepository.existsById(id)) {
                throw new RuntimeException("Talla no encontrada: " + id);
            }
            tallaRepository.deleteById(id);       
        }
        
}
