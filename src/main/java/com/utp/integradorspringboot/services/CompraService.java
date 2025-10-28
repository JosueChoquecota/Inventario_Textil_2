/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.CompraRequestDTO;
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
    public Compra registrarNuevaCompraDetalle(CompraRequestDTO dto) {

       // --- INICIO DE LA MODIFICACIÓN ---
        // 1. Obtener el trabajador logueado desde Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // Verifica si hay un usuario autenticado
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
             throw new RuntimeException("No hay un usuario autenticado para registrar la compra.");
        }
        String correoLogueado = authentication.getName(); // Esto es el 'username' (correo)
        
        // Busca al trabajador en la BD usando el correo de la sesión
        Trabajador trabajador = trabajadorRepository.findByCorreo(correoLogueado)
                .orElseThrow(() -> new RuntimeException("El trabajador logueado (" + correoLogueado + ") no fue encontrado en la base de datos."));
        // --- FIN DE LA MODIFICACIÓN (se elimina el findById(7)) ---

        // 2. Buscar Proveedor
        Proveedor proveedor = proveedorRepository.findById(dto.getIdProveedor())
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado: " + dto.getIdProveedor()));

        // 3. Crear el Encabezado de la Compra (usando el trabajador encontrado)
        Compra compra = new Compra();
        compra.setProveedor(proveedor);
        compra.setFecha(dto.getFecha());
        compra.setTrabajador(trabajador); // <-- ¡Aquí se usa el trabajador logueado!
        compra.setPrecioTotal(BigDecimal.ZERO);

        Compra compraGuardada = compraRepository.save(compra);

        // 4. Buscar la Variación (ListaProducto)
        ListaProductos listaProducto = listaProductosRepository.findById(dto.getIdListaProducto())
                .orElseThrow(() -> new RuntimeException("Variación de producto (lista_producto) no encontrada con ID: " + dto.getIdListaProducto()));

        // 5. Crear el Detalle de la Compra
        DetalleCompra detalle = new DetalleCompra();
        detalle.setCompra(compraGuardada);
        detalle.setListaProducto(listaProducto);
        detalle.setCantidadCompra(dto.getCantidad()); // Asumiendo que el campo/setter se llama 'cantidad'
        detalle.setPrecioUnitario(dto.getPrecioUnitario()); // Asumiendo que el campo/setter se llama 'precioUnitario'
        BigDecimal subTotal = dto.getPrecioUnitario().multiply(BigDecimal.valueOf(dto.getCantidad()));
        detalle.setSubTotal(subTotal);

        detalleCompraRepository.save(detalle);

        // 6. Actualizar Stock
        listaProductoService.actualizarStock(listaProducto.getIdListaProducto(), dto.getCantidad()); // Suma la cantidad comprada

        // 7. Actualizar Precio Total de la Compra
        compraGuardada.setPrecioTotal(subTotal);
        compraRepository.save(compraGuardada);

        return compraGuardada;
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
