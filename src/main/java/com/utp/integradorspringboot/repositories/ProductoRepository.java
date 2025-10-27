package com.utp.integradorspringboot.repositories;

import com.utp.integradorspringboot.models.Producto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer>{
    Optional<Producto> findByNombreIgnoreCase(String nombre);
    List<Producto> findByNombreContainingIgnoreCase(String nombreFragmento);
    List<Producto> findByCategoriaIdCategoria(Integer idCategoria);
    List<Producto> findByMarcaIdMarca(Integer idMarca);
    boolean existsByNombreIgnoreCase(String nombre);
}
