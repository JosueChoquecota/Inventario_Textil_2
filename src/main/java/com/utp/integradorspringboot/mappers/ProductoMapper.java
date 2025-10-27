/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.ProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ProductoResponseDTO;
import com.utp.integradorspringboot.models.Producto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import java.util.List;



@Mapper(uses = {CategoriaMapper.class, MarcaMapper.class})
public interface ProductoMapper {
    ProductoMapper INSTANCE = Mappers.getMapper(ProductoMapper.class);
    
    @Mapping(target = "idProducto", ignore=true)
    @Mapping(target = "categoria", ignore=true)
    @Mapping(target = "marca", ignore=true)
    
    Producto requestDtoToEntity(ProductoRequestDTO dto);
    
    @Mapping(target = "idProducto", ignore=true)
    @Mapping(target = "categoria", ignore=true)
    @Mapping(target = "marca", ignore=true)
    void updateEntityFromRequestDto(ProductoRequestDTO dto, @MappingTarget Producto entity);
    
    @Mapping(source = "categoria",target ="categoria")
    @Mapping(source = "marca", target = "marca")
    ProductoResponseDTO entityToResponseDto(Producto entity);
    
    List<ProductoResponseDTO> entityListToResponseDtoList(List<Producto> entityList);

    
    
}
