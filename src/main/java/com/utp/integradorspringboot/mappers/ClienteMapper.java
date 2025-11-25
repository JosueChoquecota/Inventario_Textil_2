/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.ClienteRequestDTO;
import com.utp.integradorspringboot.dtos.ClienteResponseDTO;
import com.utp.integradorspringboot.models.Cliente;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

/**
 *
 * @author ASUS
 */
@Mapper(componentModel = "spring")
public interface ClienteMapper {
    
    ClienteMapper INSTANCE = Mappers.getMapper(ClienteMapper.class);
    
    @Mapping(target = "idCliente", ignore = true )
    @Mapping(target = "tipoDocumento", ignore=true )        
    Cliente toEntityRequest(ClienteRequestDTO dto);
    
    @Mapping(source = "idCliente", target = "idCliente")
    @Mapping(source = "correo", target = "correo")
    @Mapping(source = "tipoDocumento.id_tipo_doc", target = "idTipoDoc")  // ✅ ID del tipo
    @Mapping(source = "tipoDocumento.tipo", target = "tipoDocumento")
    @Mapping(source = "nDocumento", target = "nDocumento")
    ClienteResponseDTO toDTOResponse(Cliente entity);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idCliente", ignore = true)
    @Mapping(target = "tipoDocumento", ignore=true )        
    void updateEntityFromDTO(ClienteRequestDTO dto, @MappingTarget Cliente entity);
    
    List<ClienteResponseDTO> toDTOList(List<Cliente> entities);
    List<Cliente> toEntityList(List<ClienteRequestDTO> dtos);
}
