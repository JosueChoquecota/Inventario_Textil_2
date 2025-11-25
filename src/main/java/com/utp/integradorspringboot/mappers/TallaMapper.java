package com.utp.integradorspringboot.mappers;


import com.utp.integradorspringboot.dtos.TallaRequestDTO;
import com.utp.integradorspringboot.dtos.TallaResponseDTO;
import com.utp.integradorspringboot.models.Talla;
import java.util.List;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;




@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TallaMapper {
    
    TallaMapper INSTANCE = Mappers.getMapper(TallaMapper.class);
    
    @Mapping(target = "idTalla", ignore = true)
    Talla toEntityRequest(TallaRequestDTO dto);
    
    TallaResponseDTO toDTOResponse(Talla entity);
    
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idTalla", ignore = true)
    void updateEntityFromDTO(TallaRequestDTO dto, @MappingTarget Talla entity);
    
    
    List<TallaResponseDTO> toDTOList(List<Talla> entities);
    List<Talla> toEntityList(List<TallaRequestDTO> dtos);
   
}
