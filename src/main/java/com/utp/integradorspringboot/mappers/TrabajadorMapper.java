/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.TrabajadorRequestDTO;
import com.utp.integradorspringboot.dtos.TrabajadorResponseDTO;
import com.utp.integradorspringboot.models.Trabajador;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;
@Mapper(componentModel = "spring")  // ✅ Cambiado a "spring" para inyección automática
public interface TrabajadorMapper {

    TrabajadorMapper INSTANCE = Mappers.getMapper(TrabajadorMapper.class);

    /**
     * ✅ Convierte DTO → Entidad para CREAR
     * Ignora: id, estado, fechaCreacion, rol, tipoDocumento
     * (Se asignarán manualmente en el controller)
     */
    @Mapping(target = "id_trabajador", ignore = true) 
    @Mapping(target = "estado", ignore = true)     
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "rol", ignore = true)           
    @Mapping(target = "tipoDocumento", ignore = true)
    Trabajador requestDtoToEntity(TrabajadorRequestDTO dto);

    /**
     * ✅ Actualiza entidad existente con datos del DTO
     * Ignora: id, estado, fechaCreacion, rol, tipoDocumento
     * (Se actualizarán manualmente en el controller)
     */
    @Mapping(target = "id_trabajador", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "rol", ignore = true)
    @Mapping(target = "tipoDocumento", ignore = true)
    @Mapping(target = "contrasena", ignore = true)  // ✅ IMPORTANTE: No actualizar contraseña automáticamente
    void updateEntityFromRequestDto(TrabajadorRequestDTO dto, @MappingTarget Trabajador entity);

    /**
     * ✅ Convierte Entidad → ResponseDTO
     * Mapea objetos relacionados a sus IDs y nombres
     */
    @Mapping(source = "id_trabajador", target = "id")
    @Mapping(source = "rol.id_rol", target = "idRol")
    @Mapping(source = "rol.nombreRol", target = "rolNombre")
    @Mapping(source = "tipoDocumento.id_tipo_doc", target = "idTipoDoc")
    @Mapping(source = "tipoDocumento.tipo", target = "nDocumento")
    TrabajadorResponseDTO entityToResponseDto(Trabajador entity);

    /**
     * ✅ Convierte lista de entidades → lista de ResponseDTOs
     */
    List<TrabajadorResponseDTO> entityListToResponseDtoList(List<Trabajador> entityList);
}