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

@Mapper(uses = {RolMapper.class, TipoDocumentoMapper.class}) // ¡IMPORTANTE!
public interface TrabajadorMapper {

    TrabajadorMapper INSTANCE = Mappers.getMapper(TrabajadorMapper.class);

    // --- RequestDTO (Entrada) -> Entidad (models.Trabajador) ---
    // Mapea los campos simples. Ignora los que no deben venir del DTO
    // o que se manejarán en el Servicio (como cargar Rol y TipoDocumento por ID).
    @Mapping(target = "id_trabajador", ignore = true) // El ID se genera en la BD
    @Mapping(target = "estado", ignore = true)       // El estado se define en el servicio
    @Mapping(target = "fechaCreacion", ignore = true) // Se genera automáticamente
    @Mapping(target = "rol", ignore = true)           // El servicio lo cargará usando el idRol del DTO
    @Mapping(target = "tipoDocumento", ignore = true) // El servicio lo cargará usando el idTipoDoc del DTO
    Trabajador requestDtoToEntity(TrabajadorRequestDTO dto);

    // Método para actualizar una entidad existente desde un DTO
    // Útil para los métodos de actualización (PUT/PATCH)
    @Mapping(target = "id_trabajador", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "rol", ignore = true)
    @Mapping(target = "tipoDocumento", ignore = true)
    void updateEntityFromRequestDto(TrabajadorRequestDTO dto, @MappingTarget Trabajador entity);


    // --- Entidad (models.Trabajador) -> ResponseDTO (Salida) ---
    // MapStruct usará automáticamente RolMapper y TipoDocumentoMapper
    // para convertir los campos "rol" y "tipoDocumento".
    @Mapping(source = "rol", target = "rol")
    @Mapping(source = "tipoDocumento", target = "tipoDocumento")
    TrabajadorResponseDTO entityToResponseDto(Trabajador entity);

    // Para listas
    List<TrabajadorResponseDTO> entityListToResponseDtoList(List<Trabajador> entityList);
}