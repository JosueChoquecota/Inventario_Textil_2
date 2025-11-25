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
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface DetalleCompraMapper {
    
    /**
     * Mapeo de DetalleCompra → DetalleCompraResponseDTO
     * ✅ Basado en tu model:
     *    - DetalleCompra.listaProducto → ListaProductos
     *    - DetalleCompra.cantidad (campo en DB: "cantidad")
     */
    @Mapping(target = "idDetalleCompra", source = "idDetalleCompra")
    @Mapping(target = "idListaProducto", source = "listaProducto.idListaProducto")
    
    // Producto (ListaProductos → Producto)
    @Mapping(target = "nombreProducto", source = "listaProducto.producto.nombre")
    
    // Marca (Producto → Marca)
    @Mapping(target = "marcaProducto", source = "listaProducto.producto.marca.marca")
    
    // Categoría (Producto → Categoria)
    @Mapping(target = "categoriaProducto", source = "listaProducto.producto.categoria.nombre")
    
    // Talla (ListaProductos → Talla)
    @Mapping(target = "talla", source = "listaProducto.talla.talla")
    
    // Color (ListaProductos → Color)
    @Mapping(target = "color", source = "listaProducto.color.color")
    
    // Datos de la compra
    @Mapping(target = "precioUnitario", source = "precioUnitario")
    @Mapping(target = "cantidad", source = "cantidad")
    @Mapping(target = "subTotal", source = "subTotal")
    
    DetalleCompraResponseDTO toResponseDTO(DetalleCompra detalle);
    
    /**
     * Mapeo de lista
     */
    List<DetalleCompraResponseDTO> toResponseDTOList(List<DetalleCompra> detalles);
}