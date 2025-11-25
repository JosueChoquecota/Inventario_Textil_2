/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.StockResponseDTO;
import com.utp.integradorspringboot.models.Categoria;
import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.models.Proveedor;
import com.utp.integradorspringboot.models.Talla;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StockMapper {
    @Mapping(target = "nombreProducto", source = "producto.nombre")
    @Mapping(target = "marca", source = "producto.marca")
    @Mapping(target = "categoria", source = "producto.categoria")
    @Mapping(target = "talla", source = "talla")
    @Mapping(target = "color", source = "color")
    @Mapping(target = "proveedor", source = "proveedor")
    StockResponseDTO toStockDTO(ListaProductos listaProducto);

    List<StockResponseDTO> toStockDTOList(List<ListaProductos> listaProductos);

    // Métodos para convertir objeto a String
    default String map(Talla talla) {
        return talla != null ? talla.getTalla() : null;
    }
    default String map(Color color) {
        return color != null ? color.getColor() : null;
    }
    default String map(Marca marca) {
        return marca != null ? marca.getMarca() : null;
    }
    default String map(Categoria categoria) {
        return categoria != null ? categoria.getNombre() : null;
    }
    default String map(Producto producto) {
        return producto != null ? producto.getNombre() : null;
    }
    default String map(Proveedor proveedor) {
        return proveedor != null ? proveedor.getNombres() : null;
    }
}