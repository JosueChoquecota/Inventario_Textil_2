/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.ColorDTO;
import com.utp.integradorspringboot.models.Color;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ColorMapper {
    ColorMapper INSTANCE = Mappers.getMapper(ColorMapper.class);

    // Entidad -> DTO
    ColorDTO entityToDto(Color color);

    // DTO -> Entidad
    Color dtoToEntity(ColorDTO colorDTO);

    // Listas
    List<ColorDTO> entityListToDtoList(List<Color> colores);
}