/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;


import com.utp.integradorspringboot.models.Rol;
import com.utp.integradorspringboot.models.TipoDocumento;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.repositories.RolRepository;
import com.utp.integradorspringboot.repositories.TipoDocumentoRepository;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TrabajadorService {
    @Autowired
    private TrabajadorRepository trabajadorRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    
     // ✅ Registrar un nuevo trabajador
    @Transactional
    public Trabajador registrarTrabajador(Trabajador trabajador, Integer tipoDocumentoId, Integer rolId) {

       // Validaciones básicas
       if (trabajador.getContrasena() == null || trabajador.getContrasena().isEmpty()) {
           throw new IllegalArgumentException("La contraseña no puede estar vacía");
       }

       if (trabajador.getCorreo() == null || trabajador.getCorreo().isEmpty()) {
           throw new IllegalArgumentException("El correo no puede estar vacío");
       }

       if (trabajadorRepository.existsByCorreo(trabajador.getCorreo())) {
           throw new RuntimeException("El correo ya está registrado");
       }

       // Encriptar la contraseña
       trabajador.setContrasena(passwordEncoder.encode(trabajador.getContrasena()));

       // Asignar estado y fecha
       trabajador.setEstado(true);
       trabajador.setFechaCreacion(LocalDateTime.now());

       // Asignar rol
       Rol rol = rolRepository.findById(rolId)
               .orElseThrow(() -> new RuntimeException("No existe el rol"));
       trabajador.setRol(rol);

       // Asignar tipo de documento
       TipoDocumento tipoDocumento = tipoDocumentoRepository.findById(tipoDocumentoId)
               .orElseThrow(() -> new RuntimeException("No existe el tipo de documento"));
       trabajador.setTipoDocumento(tipoDocumento);

       return trabajadorRepository.save(trabajador);
   }

    public Trabajador login(String correo, String contrasena) {
        Trabajador trabajador = trabajadorRepository.findByCorreo(correo)
            .orElseThrow(() -> new RuntimeException("Correo o contraseña incorrectos"));
        if (!passwordEncoder.matches(contrasena, trabajador.getContrasena())) {
                    throw new RuntimeException("Correo o contraseña incorrectos");
        }
        System.out.println("Trabajador encontrado: " + trabajador.getCorreo());
        System.out.println("Contraseña en DB: " + trabajador.getContrasena());

        if (!passwordEncoder.matches(contrasena, trabajador.getContrasena())) {
            System.out.println("Contraseña ingresada: " + contrasena);
            throw new RuntimeException("Correo o contraseña incorrectos");
        }
    return trabajador;
    }


    // ✅ Listar todos los trabajadores
    public List<Trabajador> listarTrabajadores() {
        return trabajadorRepository.findAll();
    }

    // ✅ Buscar trabajador por ID
    public Optional<Trabajador> buscarPorId(Integer id) {
        return trabajadorRepository.findById(id);
    }

    // ✅ Buscar trabajador por correo (para login)
    public Optional<Trabajador> buscarPorCorreo(String correo) {
        return trabajadorRepository.findByCorreo(correo);
    }

    // ✅ Actualizar datos de trabajador (sin afectar la contraseña)
    public Trabajador actualizarTrabajador(Integer id, Trabajador nuevosDatos) {
        return trabajadorRepository.findById(id).map(t -> {
            t.setNombres(nuevosDatos.getNombres());
            t.setApellidos(nuevosDatos.getApellidos());
            t.setTelefono(nuevosDatos.getTelefono());
            t.setCorreo(nuevosDatos.getCorreo());
            t.setRol(nuevosDatos.getRol());
            t.setEstado(nuevosDatos.getEstado());
            return trabajadorRepository.save(t);
        }).orElseThrow(() -> new RuntimeException("Trabajador no encontrado"));
    }

    // ✅ Eliminar trabajador por ID
    public void eliminarTrabajador(Integer id) {
        if (!trabajadorRepository.existsById(id)) {
            throw new RuntimeException("El trabajador no existe");
        }
        trabajadorRepository.deleteById(id);
    }
}

