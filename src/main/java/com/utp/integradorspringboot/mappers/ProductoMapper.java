/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.CategoriaResponseDTO;
import com.utp.integradorspringboot.dtos.MarcaResponseDTO;
import com.utp.integradorspringboot.dtos.ProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ProductoResponseDTO;
import com.utp.integradorspringboot.dtos.StockItemDTO;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.models.Producto;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
    
    // ✅ CORREGIDO: Especificar mapeos explícitos para StockItemDTO
    @Mapping(target = "idTalla", source = "talla.idTalla") // Ajustar según tu entidad
    @Mapping(target = "idColor", source = "color.idColor") // Ajustar según tu entidad
    @Mapping(target = "cantidad", source = "cantidad")
    @Mapping(target = "precioUnitario", source = "precioUnitario")
    StockItemDTO toStockItemDTO(ListaProductos listaProducto);
    
    // ✅ O si los campos se llaman diferente, usar estos mapeos:
    // @Mapping(target = "idTalla", source = "id_talla")
    // @Mapping(target = "idColor", source = "id_color") 
    // @Mapping(target = "cantidad", source = "cantidad")
    // @Mapping(target = "precioUnitario", source = "precio_unitario")
    
    // ✅ MÉTODO DEFAULT: Para procesar resultados SQL (sin cambios)
    default List<ProductoResponseDTO> toResponseListWithStock(List<Object[]> resultados) {
        Map<Integer, ProductoResponseDTO> productosMap = new LinkedHashMap<>();

        for (Object[] row : resultados) {
            Integer idProducto = (Integer) row[0];
            
            ProductoResponseDTO producto = productosMap.computeIfAbsent(idProducto, k -> {
                ProductoResponseDTO p = new ProductoResponseDTO();
                p.setIdProducto(idProducto);
                p.setNombre((String) row[1]);
                p.setImagen((String) row[2]);
                
                if (row[3] != null) {
                    MarcaResponseDTO marca = new MarcaResponseDTO();
                    marca.setMarca((String) row[3]);
                    p.setMarca(marca);
                }
                
                if (row[4] != null) {
                    CategoriaResponseDTO categoria = new CategoriaResponseDTO();
                    categoria.setNombre((String) row[4]);
                    p.setCategoria(categoria);
                }
                
                p.setStock(new ArrayList<>());
                return p;
            });

            if (row[5] != null && row[6] != null) {
                StockItemDTO stockItem = new StockItemDTO();
                stockItem.setIdTalla((Integer) row[5]);
                stockItem.setIdColor((Integer) row[6]); 
                stockItem.setCantidad((Integer) row[7]);
                stockItem.setPrecioUnitario((BigDecimal) row[8]);
                
                producto.getStock().add(stockItem);
            }
        }

        return new ArrayList<>(productosMap.values());
    }
}