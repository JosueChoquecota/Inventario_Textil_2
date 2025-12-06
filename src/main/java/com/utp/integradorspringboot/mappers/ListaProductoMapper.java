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

@Mapper(uses = {ProductoMapper.class, TallaMapper.class, ColorMapper.class, ProveedorMapper.class})
public interface ListaProductoMapper {

    ListaProductoMapper INSTANCE = Mappers.getMapper(ListaProductoMapper.class);

    @Mapping(source = "producto", target = "producto")
    @Mapping(source = "talla", target = "talla")
    @Mapping(source = "color", target = "color")
    @Mapping(source = "proveedor", target = "proveedor")
    ListaProductoResponseDTO entityToResponseDto(ListaProductos entity);

    List<ListaProductoResponseDTO> entityListToResponseDtoList(List<ListaProductos> entityList);
}

