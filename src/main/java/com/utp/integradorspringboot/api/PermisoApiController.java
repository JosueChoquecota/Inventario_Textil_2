package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.models.Permiso;
import com.utp.integradorspringboot.models.Recurso;
import com.utp.integradorspringboot.services.PermisoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/permisos")
public class PermisoApiController {

    @Autowired
    private PermisoService permisoService;

    @GetMapping("/recursos")
    public ResponseEntity<List<Recurso>> listarRecursos() {
        return ResponseEntity.ok(permisoService.listarRecursos());
    }

    @GetMapping("/rol/{idRol}")
    public ResponseEntity<List<Permiso>> obtenerPermisosPorRol(@PathVariable Integer idRol) {
        return ResponseEntity.ok(permisoService.obtenerPermisosPorRol(idRol));
    }

    @PostMapping("/rol/{idRol}")
    public ResponseEntity<List<Permiso>> guardarPermisos(@PathVariable Integer idRol,
            @RequestBody List<Permiso> permisos) {
        return ResponseEntity.ok(permisoService.guardarPermisos(idRol, permisos));
    }

    @PostMapping("/init")
    public ResponseEntity<String> inicializarRecursos() {
        permisoService.inicializarRecursos();
        return ResponseEntity.ok("Recursos inicializados correctamente");
    }
}
