/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.CategoriaRequestDTO;
import com.utp.integradorspringboot.dtos.CategoriaResponseDTO;
import com.utp.integradorspringboot.models.Categoria;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

/**
 *
 * @author ASUS
 */

@Mapper(componentModel = "spring")
public interface CategoriaMapper {
    CategoriaMapper INSTANCE = Mappers.getMapper(CategoriaMapper.class);
    
    //CON ESTO MAPEO Y MANDO MI INFORMACION
    @Mapping(target ="idCategoria", ignore =true)
    Categoria toEntityRequest(CategoriaRequestDTO dto);
    
    //CON ESTO MAPEO Y RECIBO INFORMACION
    CategoriaResponseDTO toDTOResponse(Categoria entity);
    
    //CON ESTO ACTUALIZO INFORMACION
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idCategoria", ignore = true)
    void updateEntityFromDTO(CategoriaRequestDTO dto, @MappingTarget Categoria entity);
    
    //LISTAR INFORMACION
    List<CategoriaResponseDTO> toDTOList(List<Categoria> entities);
    List<Categoria> toEntityList(List<CategoriaRequestDTO>dtos);
    
}
