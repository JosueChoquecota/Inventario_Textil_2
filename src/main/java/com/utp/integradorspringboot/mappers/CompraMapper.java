/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.CompraResponseDTO;
import com.utp.integradorspringboot.models.Compra;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CompraMapper {
    
    /**
     * Mapeo de Compra → CompraResponseDTO
     * ✅ Basado en tu model: Compra tiene LocalDate fecha
     */
    @Mapping(target = "idCompra", source = "idCompra")
    @Mapping(target = "fecha", expression = "java(formatearFecha(compra.getFecha()))")
    @Mapping(target = "precioTotal", source = "precioTotal")
    
    // Proveedor (según tu model: proveedor tiene "nombres" no "nombre")
    @Mapping(target = "idProveedor", source = "proveedor.idProveedor")
    @Mapping(target = "nombreProveedor", source = "proveedor.nombres")
    @Mapping(target = "documentoProveedor", source = "proveedor.nDocumento")
    @Mapping(target = "tipoDocumentoProveedor", source = "proveedor.tipoDocumento.tipo")
    
    // Trabajador (según tu model: trabajador tiene "nombres" y "apellidos")
    @Mapping(target = "idTrabajador", source = "trabajador.idTrabajador")
    @Mapping(target = "nombreCompletoTrabajador", expression = "java(obtenerNombreCompleto(compra))")
    
    // Ignorar (se setean manualmente en el Service)
    @Mapping(target = "detalles", ignore = true)
    @Mapping(target = "totalProductos", ignore = true)
    @Mapping(target = "totalUnidades", ignore = true)
    
    CompraResponseDTO toResponseDTO(Compra compra);
    
    /**
     * ✅ Convierte LocalDate → String "2025-11-22"
     */
    default String formatearFecha(LocalDate fecha) {
        if (fecha == null) return null;
        return fecha.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
    
    /**
     * Obtener nombre completo del trabajador
     */
    default String obtenerNombreCompleto(Compra compra) {
        if (compra.getTrabajador() == null) return "";
        String nombres = compra.getTrabajador().getNombres() != null ? 
                         compra.getTrabajador().getNombres() : "";
        String apellidos = compra.getTrabajador().getApellidos() != null ? 
                           compra.getTrabajador().getApellidos() : "";
        return (nombres + " " + apellidos).trim();
    }
}