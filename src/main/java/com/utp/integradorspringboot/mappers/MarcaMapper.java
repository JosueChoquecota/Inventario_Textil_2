/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.MarcaDTO;
import com.utp.integradorspringboot.dtos.MarcaRequestDTO;
import com.utp.integradorspringboot.models.Marca;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MarcaMapper {
    MarcaMapper INSTANCE = Mappers.getMapper(MarcaMapper.class);

    @Mapping(target = "idMarca", ignore = true) 

    Marca requestDtoToEntity(MarcaRequestDTO dto);

    @Mapping(target = "idMarca", ignore = true)
    void updateEntityFromRequestDto(MarcaRequestDTO dto, @MappingTarget Marca entity);

    MarcaDTO entityToDto(Marca marca);

    List<MarcaDTO> entityListToDtoList(List<Marca> marcas);
}
