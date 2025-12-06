package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.TipoDocumento;
import com.utp.integradorspringboot.repositories.TipoDocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoDocumentoService {

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    public List<TipoDocumento> listarTodos() {
        return tipoDocumentoRepository.findAll();
    }
}
