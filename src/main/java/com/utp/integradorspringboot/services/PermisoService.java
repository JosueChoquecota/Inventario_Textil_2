package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Permiso;
import com.utp.integradorspringboot.models.Recurso;
import com.utp.integradorspringboot.models.Rol;
import com.utp.integradorspringboot.repositories.PermisoRepository;
import com.utp.integradorspringboot.repositories.RecursoRepository;
import com.utp.integradorspringboot.repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PermisoService {

    @Autowired
    private PermisoRepository permisoRepository;

    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private RolRepository rolRepository;

    public List<Recurso> listarRecursos() {
        return recursoRepository.findAll();
    }

    public List<Permiso> obtenerPermisosPorRol(Integer idRol) {
        return permisoRepository.findByRol_IdRol(idRol); // Ajustado al nombre del método en repositorio
    }

    @Transactional
    public List<Permiso> guardarPermisos(Integer idRol, List<Permiso> permisos) {
        Rol rol = rolRepository.findById(idRol).orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        // Eliminar permisos anteriores para este rol (estrategia simple: borrar y
        // re-crear, o actualizar)
        // Para simplificar y evitar duplicados, aquí actualizaremos o insertaremos.

        List<Permiso> permisosGuardados = new ArrayList<>();

        for (Permiso p : permisos) {
            // Buscar si ya existe el permiso para ese rol y recurso
            Optional<Permiso> existente = permisoRepository.findAll().stream()
                    .filter(perm -> perm.getRol().getId_rol().equals(idRol)
                            && perm.getRecurso().getId_recurso().equals(p.getRecurso().getId_recurso()))
                    .findFirst();

            if (existente.isPresent()) {
                Permiso update = existente.get();
                update.setCanCreate(p.isCanCreate());
                update.setCanRead(p.isCanRead());
                update.setCanUpdate(p.isCanUpdate());
                update.setCanDelete(p.isCanDelete());
                permisosGuardados.add(permisoRepository.save(update));
            } else {
                p.setRol(rol);
                permisosGuardados.add(permisoRepository.save(p));
            }
        }
        return permisosGuardados;
    }

    // Método para inicializar recursos si está vacío (se puede llamar al inicio)
    @Transactional
    public void inicializarRecursos() {
        if (recursoRepository.count() == 0) {
            crearRecurso("Dashboard", "/dashboard/Dashboard");
            crearRecurso("Trabajadores", "/dashboard/trabajadores");
            crearRecurso("Proveedores", "/dashboard/proveedores");
            crearRecurso("Producto", "/dashboard/inventario"); // Agrupa inventario
            crearRecurso("Compras", "/dashboard/compras");
            crearRecurso("Clientes", "/dashboard/clientes");
            crearRecurso("Stock", "/dashboard/stock");
            crearRecurso("Ventas", "/dashboard/ventas");
            crearRecurso("Configuracion", "/dashboard/configuracion");
        }
    }

    private void crearRecurso(String nombre, String ruta) {
        Recurso r = new Recurso();
        r.setNombre(nombre);
        r.setRuta(ruta);
        recursoRepository.save(r);
    }
}
