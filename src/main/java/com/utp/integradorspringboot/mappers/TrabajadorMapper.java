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

@Mapper(uses = {RolMapper.class, TipoDocumentoMapper.class}) 
public interface TrabajadorMapper {

    TrabajadorMapper INSTANCE = Mappers.getMapper(TrabajadorMapper.class);


    @Mapping(target = "id_trabajador", ignore = true) 
    @Mapping(target = "estado", ignore = true)     
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "rol", ignore = true)           
    @Mapping(target = "tipoDocumento", ignore = true) 
    Trabajador requestDtoToEntity(TrabajadorRequestDTO dto);

    @Mapping(target = "id_trabajador", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "rol", ignore = true)
    @Mapping(target = "tipoDocumento", ignore = true)
    void updateEntityFromRequestDto(TrabajadorRequestDTO dto, @MappingTarget Trabajador entity);


    @Mapping(source = "rol", target = "rol")
    @Mapping(source = "tipoDocumento", target = "tipoDocumento")
    TrabajadorResponseDTO entityToResponseDto(Trabajador entity);

    List<TrabajadorResponseDTO> entityListToResponseDtoList(List<Trabajador> entityList);
}