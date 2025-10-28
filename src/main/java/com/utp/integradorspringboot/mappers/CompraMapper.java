/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.CompraRequestDTO;
import com.utp.integradorspringboot.dtos.CompraResponseDTO;
import com.utp.integradorspringboot.models.Compra;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {ProveedorMapper.class, TrabajadorMapper.class, DetalleCompraMapper.class})
public interface CompraMapper {

    CompraMapper INSTANCE = Mappers.getMapper(CompraMapper.class);

    // --- RequestDTO -> Partial Compra Entity ---
    // Service will handle setting 'proveedor', 'trabajador', 'precioTotal', and details
    @Mapping(target = "idCompra", ignore = true)
    @Mapping(target = "proveedor", ignore = true)
    @Mapping(target = "trabajador", ignore = true)
    @Mapping(target = "precioTotal", ignore = true)
    // MapStruct maps 'fecha' automatically
    Compra requestDtoToEntity(CompraRequestDTO dto);


    // --- Entity -> ResponseDTO ---
    @Mapping(source = "proveedor", target = "proveedor")
    @Mapping(source = "trabajador", target = "trabajador")
    // @Mapping(source = "detalleCompras", target = "detalles") // <-- ¡BORRA ESTA LÍNEA!
    CompraResponseDTO entityToResponseDto(Compra entity);

    List<CompraResponseDTO> entityListToResponseDtoList(List<Compra> entityList);
}