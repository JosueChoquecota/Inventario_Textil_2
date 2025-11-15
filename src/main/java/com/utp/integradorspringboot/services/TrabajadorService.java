/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;


import com.utp.integradorspringboot.dtos.TrabajadorResponseDTO;
import com.utp.integradorspringboot.mappers.TrabajadorMapper;
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

    private final TrabajadorMapper mapper = TrabajadorMapper.INSTANCE;
    
   public List<Trabajador> listarActivos() {
        return trabajadorRepository.findByEstado(true);
    }
    public List<Trabajador> listarTodos() {
        return trabajadorRepository.findAll();
    }
    public Trabajador obtenerPorId(Integer id) {
        return trabajadorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trabajador no encontrado con ID: " + id));
    }

    
    public Trabajador crear(Trabajador trabajador, Integer idRol, Integer idTipoDoc) {
        // Validar documento duplicado
        validarDocumentoDuplicado(trabajador.getnDocumento(), null);
        
        // ✅ Encriptar contraseña con BCrypt
        String contrasenaEncriptada = passwordEncoder.encode(trabajador.getContrasena());
        trabajador.setContrasena(contrasenaEncriptada);
        
        // Asignar relaciones
        trabajador.setRol(obtenerRol(idRol));
        trabajador.setTipoDocumento(obtenerTipoDocumento(idTipoDoc));
        trabajador.setEstado(true);
        trabajador.setFechaCreacion(LocalDateTime.now());
        
        return trabajadorRepository.save(trabajador);
    }
    
    /**
     * Actualizar trabajador existente
     * Valida documento duplicado, actualiza relaciones y encripta contraseña si viene nueva
     */
    public Trabajador actualizar(Integer id, Trabajador nuevosDatos, Integer idRol, Integer idTipoDoc, String nuevaContrasena) {
        Trabajador existente = obtenerPorId(id);
        
        // Validar documento duplicado (excluyendo el ID actual)
        validarDocumentoDuplicado(nuevosDatos.getnDocumento(), id);
        
        // Actualizar campos básicos
        existente.setNombres(nuevosDatos.getNombres());
        existente.setApellidos(nuevosDatos.getApellidos());
        existente.setnDocumento(nuevosDatos.getnDocumento());
        existente.setTelefono(nuevosDatos.getTelefono());
        existente.setCorreo(nuevosDatos.getCorreo());
        if (nuevosDatos.getEstado() != null) {
        existente.setEstado(nuevosDatos.getEstado());
        }
        // Actualizar relaciones
        existente.setRol(obtenerRol(idRol));
        existente.setTipoDocumento(obtenerTipoDocumento(idTipoDoc));
        
        // ✅ Actualizar contraseña solo si viene nueva (y encriptarla)
        actualizarContrasena(existente, nuevaContrasena);
        
        return trabajadorRepository.save(existente);
    }
    
    /**
     * Desactivar trabajador (soft delete)
     */
    public void desactivar(Integer id) {
        Trabajador trabajador = obtenerPorId(id);
        trabajador.setEstado(false);
        trabajadorRepository.save(trabajador);
    }
    
    // ========================================
    // MÉTODOS AUXILIARES PRIVADOS
    // ========================================
    
    private void validarDocumentoDuplicado(String nDocumento, Integer idExcluir) {
        trabajadorRepository.findByNDocumento(nDocumento).ifPresent(existente -> {
            // Si es actualización, excluir el ID actual de la validación
            boolean esDuplicado = (idExcluir == null) || (!existente.getId_trabajador().equals(idExcluir));
            
            if (esDuplicado) {
                throw new RuntimeException("El número de documento ya existe");
            }
        });
    }
    
    private Rol obtenerRol(Integer idRol) {
        return rolRepository.findById(idRol)
            .orElseThrow(() -> new RuntimeException("Rol no encontrado con ID: " + idRol));
    }
    
    private TipoDocumento obtenerTipoDocumento(Integer idTipoDoc) {
        return tipoDocumentoRepository.findById(idTipoDoc)
            .orElseThrow(() -> new RuntimeException("Tipo de documento no encontrado con ID: " + idTipoDoc));
    }
    
    private void actualizarContrasena(Trabajador trabajador, String nuevaContrasena) {
        // Solo actualizar si viene una nueva contraseña
        if (nuevaContrasena != null && !nuevaContrasena.trim().isEmpty()) {
            trabajador.setContrasena(nuevaContrasena);
        }
    }
}

