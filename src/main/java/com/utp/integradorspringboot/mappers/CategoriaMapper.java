/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.CategoriaDTO;
import com.utp.integradorspringboot.dtos.CategoriaRequestDTO;
import com.utp.integradorspringboot.models.Categoria;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

/**
 *
 * @author ASUS
 */
@Mapper
public interface CategoriaMapper {
    CategoriaMapper INSTANCE = Mappers.getMapper(CategoriaMapper.class);

    CategoriaDTO entityToDto(Categoria categoria);

    @Mapping(target = "idCategoria", ignore = true) 
    Categoria dtoToEntity(CategoriaRequestDTO requestDto); 

    @Mapping(target = "idCategoria", ignore = true)
    void updateEntityFromRequestDto(CategoriaRequestDTO requestDto, @MappingTarget Categoria entity);

    List<CategoriaDTO> entityListToDtoList(List<Categoria> categorias);
}
