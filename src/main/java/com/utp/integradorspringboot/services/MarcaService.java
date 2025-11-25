/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.MarcaRequestDTO;
import com.utp.integradorspringboot.mappers.MarcaMapper;
import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.repositories.MarcaRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ASUS
 */
@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private ImagenService imagenService;

    private final MarcaMapper mapper = MarcaMapper.INSTANCE;

    @Transactional
    public List<Marca> listarMarcas() {
        return marcaRepository.findAll();
    }

    @Transactional
    public Marca obtenerPorId(Integer id) {
        return marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada. ID: " + id));
    }

    // ✅ CREAR: Recibe la ruta de imagen desde el controlador
    @Transactional
    public Marca crear(MarcaRequestDTO dto) {
        System.out.println("📝 Creando marca: " + dto.getMarca());
        
        Marca marca = mapper.toEntityRequest(dto);
        
        // ✅ La ruta de la imagen ya viene en el DTO desde el controlador
        // No hacer nada más con la imagen aquí
        
        Marca marcaGuardada = marcaRepository.save(marca);
        System.out.println("✅ Marca creada con ID: " + marcaGuardada.getIdMarca());
        
        return marcaGuardada;
    }

    // ✅ ACTUALIZAR: Recibe la ruta de imagen desde el controlador
    @Transactional
    public Marca actualizar(Integer id, MarcaRequestDTO dto) {
        System.out.println("📝 Actualizando marca ID: " + id);
        
        Marca existente = obtenerPorId(id);
        
        // ✅ Guardar la imagen anterior para posible eliminación
        String imagenAnterior = existente.getLogo();
        
        // Actualizar campos básicos
        existente.setMarca(dto.getMarca());
        existente.setDescripcion(dto.getDescripcion());
        
        // ✅ Si hay nueva imagen y es diferente a la anterior, eliminar la vieja
        if (dto.getLogo() != null 
            && !dto.getLogo().isEmpty() 
            && !dto.getLogo().equals(imagenAnterior)
            && imagenAnterior != null) {
            
            imagenService.eliminarImagen(imagenAnterior);
            System.out.println("🗑️ Imagen anterior eliminada: " + imagenAnterior);
        }
        
        // ✅ Actualizar con la nueva ruta (si existe)
        if (dto.getLogo() != null && !dto.getLogo().isEmpty()) {
            existente.setLogo(dto.getLogo());
        }
        
        Marca marcaActualizada = marcaRepository.save(existente);
        System.out.println("✅ Marca actualizada correctamente");
        
        return marcaActualizada;
    }

    @Transactional
    public void eliminarMarca(Integer id) {
        System.out.println("🗑️ Eliminando marca ID: " + id);
        
        Marca marca = obtenerPorId(id);
        
        // ✅ Eliminar imagen física antes de borrar el registro
        if (marca.getLogo() != null && !marca.getLogo().isEmpty()) {
            imagenService.eliminarImagen(marca.getLogo());
            System.out.println("🗑️ Logo eliminado: " + marca.getLogo());
        }
        
        marcaRepository.deleteById(id);
        System.out.println("✅ Marca eliminada correctamente");
    }
}
