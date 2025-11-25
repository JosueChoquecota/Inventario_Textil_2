/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.ColorRequestDTO;
import com.utp.integradorspringboot.dtos.ColorResponseDTO;
import com.utp.integradorspringboot.models.Color;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ColorMapper {
    ColorMapper INSTANCE = Mappers.getMapper(ColorMapper.class);
    
    //CON ESTO MAPEO Y MANDO MI INFORMACION
    @Mapping(target ="idColor", ignore =true)
    Color toEntityRequest(ColorRequestDTO dto);
    
    //CON ESTO MAPEO Y RECIBO INFORMACION
    ColorResponseDTO toDTOResponse(Color entity);
    
    //CON ESTO ACTUALIZO INFORMACION
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idColor", ignore = true)
    void updateEntityFromDTO(ColorRequestDTO dto, @MappingTarget Color entity);
    
    //LISTAR INFORMACION
    List<ColorResponseDTO> toDTOList(List<Color> entities);
    List<Color> toEntityList(List<ColorRequestDTO>dtos);
 }
