/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.VentaResponseDTO;
import com.utp.integradorspringboot.models.Venta;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface VentaMapper {
    
    @Mapping(target = "idVenta", source = "idVenta")
    @Mapping(target = "fecha", expression = "java(formatearFecha(venta.getFecha()))")
    @Mapping(target = "precioTotal", source = "precioTotal")
    
    @Mapping(target = "nombreCliente", source = "cliente.nombres") // o .razonSocial, según tu entidad
    @Mapping(target = "documentoCliente", source = "cliente.nDocumento") // o .ruc, según tu entidad
    
    @Mapping(target = "idTrabajador", source = "trabajador.idTrabajador")
    @Mapping(target = "nombreCompletoTrabajador", expression = "java(obtenerNombreCompleto(venta))")
    
    // Ignorar (se setean manualmente en el Service)
    @Mapping(target = "detalles", ignore = true)
    @Mapping(target = "totalProductos", ignore = true)
    @Mapping(target = "totalUnidades", ignore = true)
    
    VentaResponseDTO toResponseDTO(Venta venta);
    
    
    default String formatearFecha(LocalDate fecha) {
        if (fecha == null) return null;
        return fecha.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
    
    /**
     * Obtener nombre completo del trabajador
     */
    default String obtenerNombreCompleto(Venta venta) {
        if (venta.getTrabajador() == null) return "";
        String nombres = venta.getTrabajador().getNombres() != null ? 
                         venta.getTrabajador().getNombres() : "";
        String apellidos = venta.getTrabajador().getApellidos() != null ? 
                           venta.getTrabajador().getApellidos() : "";
        return (nombres + " " + apellidos).trim();
    }
    
}
