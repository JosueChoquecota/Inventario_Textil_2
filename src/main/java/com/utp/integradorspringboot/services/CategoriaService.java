package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.repositories.CategoriaRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;
    @Transactional
    public Categoria guardarOActualizarCategoria(Categoria categoria) {
        Optional<Categoria> existente = categoriaRepository.findByNombreIgnoreCase(categoria.getNombre());
        if (existente.isPresent() && !existente.get().getIdCategoria().equals(categoria.getIdCategoria())) {
            throw new RuntimeException("Ya existe una categoría con el nombre: " + categoria.getNombre());
        }
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public List<Categoria> listarTodasCategorias() {
        return categoriaRepository.findAll();
    }
    @Transactional
    public Categoria buscarCategoriaPorId(Integer id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
    }
    @Transactional
    public void eliminarCategoria(Integer id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con ID: " + id);
        }
        categoriaRepository.deleteById(id);
    }
}
