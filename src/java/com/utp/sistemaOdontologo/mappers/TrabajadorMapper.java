/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.mappers;

import com.utp.sistemaOdontologo.dtos.TrabajadorDTORequest;
import com.utp.sistemaOdontologo.entities.Trabajador;
import com.utp.sistemaOdontologo.entities.Usuario;
import com.utp.sistemaOdontologo.entities.Contacto;
import com.utp.sistemaOdontologo.entities.TipoDocumento;
import com.utp.sistemaOdontologo.entities.Especialidad;
import com.utp.sistemaOdontologo.entities.enums.Rol;



public class TrabajadorMapper {
   // --- 1. Mapeo para CONTACTO ---
    public static Contacto toContactoEntity(TrabajadorDTORequest request) {
        Contacto contacto = new Contacto();
        // Nota: Asumimos que el DTO tiene los campos de Contacto planos.
        contacto.setCorreo(request.getCorreo());
        contacto.setTelefono(request.getTelefono());
        contacto.setDireccion(request.getDireccion());
        // El tipoContacto (ENUM) lo puedes dejar para asignarlo directamente en la entidad Contacto si es fijo ('EMAIL/PHONE')
        return contacto;
    }

    // --- 2. Mapeo para USUARIO ---
    public static Usuario toUsuarioEntity(TrabajadorDTORequest request) {
        Usuario usuario = new Usuario();
        usuario.setUsuario(request.getUsuario());
        // La CONTRASENA se pasa PLANA. El HASHING se hará en el SERVICE.
        usuario.setContrasena(request.getContrasena()); 
        // El estado y el idEmpresa serán asignados por el SERVICE.
        return usuario;
    }

    // --- 3. Mapeo para TRABAJADOR (Final) ---
    // Recibe los IDs generados por el SERVICE.
    public static Trabajador toTrabajadorEntity(TrabajadorDTORequest request, Integer idContacto, Integer idUsuario) {
        Trabajador entity = new Trabajador();

        // Mapeo de campos directos del Trabajador
        entity.setNombre(request.getNombre());
        entity.setApellido(request.getApellido());
        entity.setColegiatura(request.getColegiatura());
        entity.setFechaRegistro(request.getFechaRegistro()); 

        // -------------------------------------------------------------
        // Asignación de IDs GENERADOS (Stub Entities)
        // -------------------------------------------------------------
        
        // Asigna el ID del Contacto generado
        Contacto contactoStub = new Contacto();
        contactoStub.setIdContacto(idContacto);
        entity.setContacto(contactoStub);

        // Asigna el ID del Usuario generado
        Usuario usuarioStub = new Usuario();
        usuarioStub.setIdUsuario(idUsuario);
        entity.setUsuario(usuarioStub);
        
        // -------------------------------------------------------------
        // Asignación de IDs de Catálogo (Del DTO Request)
        // -------------------------------------------------------------
        
        // Tipo Documento
        TipoDocumento tipoDocStub = new TipoDocumento();
        tipoDocStub.setIdTipoDocumento(request.getIdTipoDocumento());
        entity.setTipoDocumento(tipoDocStub);

        // Especialidad (Se asume que el DTO contiene el ID de Especialidad)
        if (request.getIdEspecialidad() != null) {
            Especialidad especialidadStub = new Especialidad();
            especialidadStub.setIdEspecialidad(request.getIdEspecialidad());
            entity.setEspecialidad(especialidadStub);
        }

        // Rol (Asumiendo que el DTO contiene el ID del Rol)
        entity.setRol(Rol.fromId(request.getIdRol()));

        // El idTrabajador se deja NULL para el INSERT.
        return entity;
    }
}
