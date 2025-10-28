/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.ListaProductoResponseDTO;
import com.utp.integradorspringboot.models.ListaProductos;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {ProductoMapper.class, TallaMapper.class, ColorMapper.class})
public interface ListaProductoMapper {
    ListaProductoMapper INSTANCE = Mappers.getMapper(ListaProductoMapper.class);

    // Entidad -> ResponseDTO
    @Mapping(source = "producto", target = "producto") // Needs ProductoMapper (Entity -> ResponseDTO)
    @Mapping(source = "talla", target = "talla")       // Needs TallaMapper (Entity -> DTO)
    @Mapping(source = "color", target = "color")       // Needs ColorMapper (Entity -> DTO)
    @Mapping(source = "cantidad", target = "cantidad")       // Map stock field
    @Mapping(source = "precioUnitario", target = "precioUnitario") // Map selling price field
    ListaProductoResponseDTO entityToResponseDto(ListaProductos entity);

    List<ListaProductoResponseDTO> entityListToResponseDtoList(List<ListaProductos> entityList);
}
