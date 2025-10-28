/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.TallaDTO;
import com.utp.integradorspringboot.models.Talla;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TallaMapper {
    TallaMapper INSTANCE = Mappers.getMapper(TallaMapper.class);

    TallaDTO entityToDto(Talla talla);
    Talla dtoToEntity(TallaDTO tallaDTO);
    List<TallaDTO> entityListToDtoList(List<Talla> tallas);
}