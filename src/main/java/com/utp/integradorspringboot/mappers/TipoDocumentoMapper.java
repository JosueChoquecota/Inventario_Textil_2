/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.TipoDocumentoDTO;
import com.utp.integradorspringboot.models.TipoDocumento;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TipoDocumentoMapper {

    TipoDocumentoMapper INSTANCE = Mappers.getMapper(TipoDocumentoMapper.class);

    // Convierte Entidad -> DTO
    TipoDocumentoDTO entityToDto(TipoDocumento tipoDocumento);

    // Convierte DTO -> Entidad
    TipoDocumento dtoToEntity(TipoDocumentoDTO tipoDocumentoDTO);

    // Para listas
    List<TipoDocumentoDTO> entityListToDtoList(List<TipoDocumento> tipoDocumentos);
}
