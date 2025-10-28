/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.DetalleCompraResponseDTO;
import com.utp.integradorspringboot.models.DetalleCompra;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {ListaProductoMapper.class})
public interface DetalleCompraMapper {
    DetalleCompraMapper INSTANCE = Mappers.getMapper(DetalleCompraMapper.class);

    @Mapping(source = "listaProducto", target = "listaProducto")
    @Mapping(source = "cantidadCompra", target = "cantidad")
    @Mapping(source = "precioUnitario", target = "precioUnitario")
    @Mapping(source = "subTotal", target = "subTotal")
    DetalleCompraResponseDTO entityToResponseDto(DetalleCompra entity);

    List<DetalleCompraResponseDTO> entityListToResponseDtoList(List<DetalleCompra> entityList);
}