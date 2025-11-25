/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.mappers.CategoriaMapper;
import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.repositories.CategoriaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ASUS
 */
@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private final CategoriaMapper mapper = CategoriaMapper.INSTANCE;
    
    public List<Categoria> listarCategoria() {
        return categoriaRepository.findAll();
    }
    
    public Categoria obtenerPorId(Integer id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrado ID: "+ id));
    }
    public Categoria crear(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    public Categoria actualizar(Integer id, Categoria nuevaCategoria){
        Categoria existente = obtenerPorId(id);
        
        existente.setNombre(nuevaCategoria.getNombre());
        existente.setDescripcion(nuevaCategoria.getDescripcion());
        return categoriaRepository.save(existente);
    }
    public void eliminarCategoria(Integer id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoria no encontrado: "+ id);
        }
        categoriaRepository.deleteById(id);
    }
    
}
