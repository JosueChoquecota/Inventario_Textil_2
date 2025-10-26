package com.utp.integradorspringboot.mappers;

import com.utp.integradorspringboot.dtos.ProveedorRequestDTO;
import com.utp.integradorspringboot.dtos.ProveedorResponseDTO;
import com.utp.integradorspringboot.models.Proveedor;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {TipoDocumentoMapper.class})
public interface ProveedorMapper {

    ProveedorMapper INSTANCE = Mappers.getMapper(ProveedorMapper.class);

    @Mapping(target = "idProveedor", ignore = true)
    @Mapping(target = "tipoDocumento", ignore = true) 
    Proveedor requestDtoToEntity(ProveedorRequestDTO dto);

    @Mapping(target = "idProveedor", ignore = true)
    @Mapping(target = "tipoDocumento", ignore = true)
    void updateEntityFromRequestDto(ProveedorRequestDTO dto, @MappingTarget Proveedor entity);

    @Mapping(source = "tipoDocumento", target = "tipoDocumento")
    ProveedorResponseDTO entityToResponseDto(Proveedor entity);

    List<ProveedorResponseDTO> entityListToResponseDtoList(List<Proveedor> entityList);
}