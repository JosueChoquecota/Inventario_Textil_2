/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.CompraRequestDTO;
import com.utp.integradorspringboot.dtos.DetalleCompraResponseDTO;
import com.utp.integradorspringboot.models.DetalleCompra;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {ListaProductoMapper.class})
public interface DetalleCompraMapper {
    DetalleCompraMapper INSTANCE = Mappers.getMapper(DetalleCompraMapper.class);

    // --- RequestDTO -> Partial DetalleCompra Entity ---
    // The Service will handle setting 'compra' and 'listaProducto' relationships
    @Mapping(target = "idDetalleCompra", ignore = true)
    @Mapping(target = "compra", ignore = true)
    @Mapping(target = "listaProducto", ignore = true)
    @Mapping(target = "subTotal", ignore = true) // Service calculates this
    // MapStruct maps 'cantidad' and 'precioUnitario' automatically if names match
    DetalleCompra requestDtoToEntity(CompraRequestDTO dto);


    // --- Entity -> ResponseDTO ---
    @Mapping(source = "listaProducto", target = "listaProducto") // Uses ListaProductoMapper
    // MapStruct maps idDetalleCompra, cantidad, precioUnitario, subTotal automatically
    DetalleCompraResponseDTO entityToResponseDto(DetalleCompra entity);

    List<DetalleCompraResponseDTO> entityListToResponseDtoList(List<DetalleCompra> entityList);
}
