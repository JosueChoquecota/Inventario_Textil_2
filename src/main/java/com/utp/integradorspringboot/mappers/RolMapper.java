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

    RolDTO entityToDto(Rol rol);
    Rol dtoToEntity(RolDTO rolDTO);
    
    List<RolDTO> entityListToDtoList(List<Rol> roles);
}