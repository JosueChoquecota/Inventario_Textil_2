/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.CompraRequestDTO;
import com.utp.integradorspringboot.dtos.DetalleCompraRequestDTO;
import com.utp.integradorspringboot.dtos.DetalleCompraResponseDTO;
import com.utp.integradorspringboot.models.Compra;
import com.utp.integradorspringboot.models.DetalleCompra;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.models.Proveedor;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.repositories.CompraRepository;
import com.utp.integradorspringboot.repositories.DetalleCompraRepository;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import com.utp.integradorspringboot.repositories.ProveedorRepository;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CompraService {

    @Autowired private CompraRepository compraRepository;
    @Autowired private DetalleCompraRepository detalleCompraRepository;
    @Autowired private ProveedorRepository proveedorRepository;
    @Autowired private TrabajadorRepository trabajadorRepository;
    @Autowired private ListaProductoService listaProductoService; // Inyecta el nuevo servicio
    @Autowired private ListaProductosRepository listaProductosRepository; // <-- AÑADE ESTE
   
   @Transactional
    public Compra registrarCompra(CompraRequestDTO dto) {
        // Obtener usuario logueado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("No hay un usuario autenticado para registrar la compra.");
        }

        String correoLogueado = authentication.getName();
        Trabajador trabajador = trabajadorRepository.findByCorreo(correoLogueado)
                .orElseThrow(() -> new RuntimeException("El trabajador logueado (" + correoLogueado + ") no fue encontrado."));

        Proveedor proveedor = proveedorRepository.findById(dto.getIdProveedor())
            .orElseThrow(() -> new RuntimeException("Proveedor no encontrado: " + dto.getIdProveedor()));

        Compra compra = new Compra();
        compra.setProveedor(proveedor);
        compra.setTrabajador(trabajador);
        compra.setFecha(LocalDate.now());
        compra.setPrecioTotal(BigDecimal.ZERO);
        compraRepository.save(compra);

        // Buscar la variación del producto
        ListaProductos listaProducto = listaProductosRepository.findById(dto.getIdListaProducto())
                .orElseThrow(() -> new RuntimeException("Variación de producto no encontrada con ID: " + dto.getIdListaProducto()));

        DetalleCompra detalle = new DetalleCompra();
        detalle.setCompra(compra);
        detalle.setListaProducto(listaProducto);
        detalle.setCantidadCompra(dto.getCantidad());
        detalle.setPrecioUnitario(dto.getPrecioUnitario());
        BigDecimal subTotal = dto.getPrecioUnitario().multiply(BigDecimal.valueOf(dto.getCantidad()));
        detalle.setSubTotal(subTotal);
        detalleCompraRepository.save(detalle);

        // Actualizar stock
        listaProductoService.actualizarStock(listaProducto.getIdListaProducto(), dto.getCantidad());

        // Guardar precio total
        compra.setPrecioTotal(subTotal);
        compraRepository.save(compra);

        return compra;
    }



    // ... (Métodos listarCompras, buscarCompraPorId, etc.) ...
     @Transactional
     public List<Compra> listarTodasCompras() {
         return compraRepository.findAll();
     }

     @Transactional
     public Compra buscarCompraPorId(Integer id) {
         // Considera cargar los detalles aquí si los necesitas EAGER
         return compraRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Compra no encontrada con ID: " + id));
     }
    
     // ... (Método para eliminar compra, con cuidado de borrar detalles y revertir stock si es necesario) ...
}
