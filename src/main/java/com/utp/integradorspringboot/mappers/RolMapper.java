/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.RolDTO;
import com.utp.integradorspringboot.models.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface RolMapper {

    RolMapper INSTANCE = Mappers.getMapper(RolMapper.class);

    // Convierte Entidad (models.Rol) -> DTO (dtos.RolDTO)
    RolDTO entityToDto(Rol rol);

    // Convierte DTO (dtos.RolDTO) -> Entidad (models.Rol)
    Rol dtoToEntity(RolDTO rolDTO);
    
    // Para listas
    List<RolDTO> entityListToDtoList(List<Rol> roles);
}