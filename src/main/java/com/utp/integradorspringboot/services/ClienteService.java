/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.mappers.ClienteMapper;
import com.utp.integradorspringboot.models.Cliente;
import com.utp.integradorspringboot.models.TipoDocumento;
import com.utp.integradorspringboot.repositories.ClienteRepository;
import com.utp.integradorspringboot.repositories.TipoDocumentoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ASUS
 */
@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;
    @Autowired
    private final ClienteMapper mapper = ClienteMapper.INSTANCE;
    
    
    public List<Cliente> listaClientes() {
        return clienteRepository.findAll();
    }
    public Cliente obtenerPorId(Integer id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }
    public Cliente crear(Cliente cliente, Integer idTipoDoc) {
        validarDocumentoDuplicado(cliente.getnDocumento(),null);
        cliente.setTipoDocumento(obtenerTipoDocumento(idTipoDoc));
        
        return clienteRepository.save(cliente);
    }
    public Cliente actualizar(Integer id, Cliente nuevoCliente, Integer idTipoDoc) {
        Cliente existente = obtenerPorId(id);
        
        existente.setNombres(nuevoCliente.getNombres());
        existente.setApellidos(nuevoCliente.getApellidos());
        existente.setCorreo(nuevoCliente.getCorreo());
        existente.setTelefono(nuevoCliente.getTelefono());
        existente.setDireccion(nuevoCliente.getDireccion());
        existente.setTipoDocumento(obtenerTipoDocumento(idTipoDoc));
        existente.setnDocumento(nuevoCliente.getnDocumento());
        
        return clienteRepository.save(existente);   
    }
    
    private TipoDocumento obtenerTipoDocumento(Integer idTipoDoc) {
        return tipoDocumentoRepository.findById(idTipoDoc)
            .orElseThrow(() -> new RuntimeException("Tipo de documento no encontrado con ID: " + idTipoDoc));
    }
     private void validarDocumentoDuplicado(String nDocumento, Integer idExcluir) {
        clienteRepository.findByNDocumento(nDocumento).ifPresent(existente -> {
            // Si es actualización, excluir el ID actual de la validación
            boolean esDuplicado = (idExcluir == null) || (!existente.getTipoDocumento().getId_tipo_doc().equals(idExcluir));
            
            if (esDuplicado) {
                throw new RuntimeException("El número de documento ya existe");
            }
        });
    }
     public void eliminarCliente(Integer id) {
         if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente no encontrado: " + id);
         }
         clienteRepository.deleteById(id);
     }
}
