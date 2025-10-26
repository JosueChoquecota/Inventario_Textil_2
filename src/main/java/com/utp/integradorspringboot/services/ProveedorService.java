/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Proveedor;
import com.utp.integradorspringboot.models.TipoDocumento;
import com.utp.integradorspringboot.repositories.ProveedorRepository;
import com.utp.integradorspringboot.repositories.TipoDocumentoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProveedorService {

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Transactional
    public Proveedor guardarOActualizarProveedor(Proveedor proveedor, Integer tipoDocumentoId) {
        Optional<Proveedor> existente = proveedorRepository.findBynDocumento(proveedor.getnDocumento());
        if (existente.isPresent() && !existente.get().getIdProveedor().equals(proveedor.getIdProveedor())) {
            throw new RuntimeException("El número de documento " + proveedor.getnDocumento() + " ya está registrado.");
        }
        TipoDocumento tipoDoc = tipoDocumentoRepository.findById(tipoDocumentoId)
                .orElseThrow(() -> new RuntimeException("Tipo de Documento no encontrado con ID: " + tipoDocumentoId));
        proveedor.setTipoDocumento(tipoDoc);
        return proveedorRepository.save(proveedor);
    }
    @Transactional
    public List<Proveedor> listarTodosProveedores() {
        return proveedorRepository.findAll();
    }
    @Transactional
    public Proveedor buscarProveedorPorId(Integer id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con ID: " + id));
    }
    @Transactional
    public void eliminarProveedor(Integer id) {
        if (!proveedorRepository.existsById(id)) {
            throw new RuntimeException("Proveedor no encontrado con ID: " + id);
        }
        proveedorRepository.deleteById(id);
    }
}