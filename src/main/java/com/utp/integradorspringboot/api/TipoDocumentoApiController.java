package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.models.TipoDocumento;
import com.utp.integradorspringboot.services.TipoDocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tipos-documento")
public class TipoDocumentoApiController {

    @Autowired
    private TipoDocumentoService tipoDocumentoService;

    @GetMapping
    public ResponseEntity<List<TipoDocumento>> listarTiposDocumento() {
        return ResponseEntity.ok(tipoDocumentoService.listarTodos());
    }
}
