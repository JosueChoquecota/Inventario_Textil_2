/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.ProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ProductoResponseDTO;
import com.utp.integradorspringboot.models.Producto;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring", uses = {CategoriaMapper.class, MarcaMapper.class})
public interface ProductoMapper {
   // ✅ Mapeo para Response (incluye relaciones)
    @Mapping(target = "categoria", source = "categoria")
    @Mapping(target = "marca", source = "marca")
    ProductoResponseDTO toDTOResponse(Producto producto);
    
    List<ProductoResponseDTO> toDTOList(List<Producto> productos);
    
    // ✅ Mapeo para Request (solo IDs)
    @Mapping(target = "idProducto", ignore = true)
    @Mapping(target = "categoria", ignore = true)
    @Mapping(target = "marca", ignore = true)
    @Mapping(target = "imagen", source = "imagen")
    Producto toEntityRequest(ProductoRequestDTO dto);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idProducto", ignore = true)
    @Mapping(target = "categoria", ignore = true)
    @Mapping(target = "marca", ignore = true)
    @Mapping(target = "imagen", source = "imagen")
    void updateEntityFromDTO(ProductoRequestDTO dto, @MappingTarget Producto existente);
}

