/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.MarcaRequestDTO;
import com.utp.integradorspringboot.dtos.MarcaResponseDTO;
import com.utp.integradorspringboot.models.Marca;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface MarcaMapper {
    MarcaMapper INSTANCE = Mappers.getMapper(MarcaMapper.class);
    
    //CON ESTO MAPEO Y MANDO MI INFORMACION
    @Mapping(target ="idMarca", ignore =true)
    @Mapping(target="logo", source="logo" )
    Marca toEntityRequest(MarcaRequestDTO dto);
    
    //CON ESTO MAPEO Y RECIBO INFORMACION    
    MarcaResponseDTO toDTOResponse(Marca entity);
    
    //CON ESTO ACTUALIZO INFORMACION
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idMarca", ignore = true)
    @Mapping(target="logo", source="logo" )
    void updateEntityFromDTO(MarcaRequestDTO dto, @MappingTarget Marca entity);
    
    //LISTAR INFORMACION
    List<MarcaResponseDTO> toDTOList(List<Marca> entities);
    List<Marca> toEntityList(List<MarcaRequestDTO>dtos);

}
