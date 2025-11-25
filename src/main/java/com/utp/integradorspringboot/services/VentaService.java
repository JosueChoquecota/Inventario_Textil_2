/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.DetalleVentaRequestDTO;
import com.utp.integradorspringboot.dtos.DetalleVentaResponseDTO;
import com.utp.integradorspringboot.dtos.VentaRequestDTO;
import com.utp.integradorspringboot.dtos.VentaResponseDTO;
import com.utp.integradorspringboot.mappers.DetalleVentaMapper;
import com.utp.integradorspringboot.mappers.VentaMapper;
import com.utp.integradorspringboot.models.Cliente;
import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.models.DetalleVenta;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.models.Talla;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.models.Venta;
import com.utp.integradorspringboot.repositories.ClienteRepository;
import com.utp.integradorspringboot.repositories.ColorRepository;
import com.utp.integradorspringboot.repositories.DetalleVentaRepository;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import com.utp.integradorspringboot.repositories.ProductoRepository;
import com.utp.integradorspringboot.repositories.TallaRepository;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import com.utp.integradorspringboot.repositories.VentaRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VentaService {
    
    @Autowired private VentaRepository ventaRepository;
    @Autowired private DetalleVentaRepository detalleVentaRepository;
    @Autowired private TrabajadorRepository trabajadorRepository;
    @Autowired private ListaProductosRepository listaProductosRepository;
    @Autowired private ProductoRepository productoRepository;
    @Autowired private ClienteRepository clienteRepository;
    @Autowired private TallaRepository tallaRepository;
    @Autowired private ColorRepository colorRepository;
    @Autowired private VentaMapper ventaMapper;
    @Autowired private DetalleVentaMapper detalleVentaMapper;
    
    @Transactional
    public List<VentaResponseDTO> listaVentas() {
        return ventaRepository.findAll().stream()
                .map(this::mapearVentaConDetalles)
                .collect(Collectors.toList());
    }
    @Transactional
    public VentaResponseDTO obtenerVentaPorId(Integer id) {
        Venta venta = ventaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        return mapearVentaConDetalles(venta);
    
    }
    
    @Transactional
    public VentaResponseDTO registrarVenta(VentaRequestDTO dto) {
        
        Cliente cliente = clienteRepository.findById(dto.getIdCliente())
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Trabajador trabajador = trabajadorRepository.findById(dto.getIdTrabajador())
            .orElseThrow(() -> new RuntimeException("Trabajador no encontrado"));
        
        Venta venta = new Venta();
        
        venta.setCliente(cliente);
        venta.setTrabajador(trabajador);
        venta.setFecha(LocalDate.parse(dto.getFecha()));
        venta.setPrecioTotal(dto.getPrecioTotal());
        venta.setDetalle(dto.getDetalle());
        
        Venta ventaSaved = ventaRepository.save(venta);
        
        for (DetalleVentaRequestDTO detalleReq : dto.getDetalles()) {
            ListaProductos listaProducto = listaProductosRepository
                    .findByProductoAndTallaAndColor(
                            detalleReq.getIdProducto(), 
                            detalleReq.getIdTalla(), 
                            detalleReq.getIdColor()
                    )
                    .orElseGet(() -> {
                        return crearNuevoListaProducto(detalleReq);
                    });
            DetalleVenta detalle = new DetalleVenta();
            detalle.setVenta(ventaSaved);
            detalle.setListaProducto(listaProducto);
            detalle.setPrecioUnitario(detalleReq.getPrecioUnitario());
            detalle.setCantidad(detalleReq.getCantidad());
            detalle.setSubTotal(detalleReq.getSubTotal());
            
            detalleVentaRepository.save(detalle);
            
            int stockAnterior = listaProducto.getCantidad();
            int nuevoStock = stockAnterior - detalleReq.getCantidad();
            if (nuevoStock < 0) {
                throw new RuntimeException("Stock insuficiente para la venta");
            }
            listaProducto.setCantidad(nuevoStock);
            listaProductosRepository.save(listaProducto);  
        }
        return mapearVentaConDetalles(ventaSaved);
    }
    
    
    @Transactional
    public void eliminarVenta(Integer id) {
        Venta venta = ventaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        List<DetalleVenta> detalles = detalleVentaRepository.findByVentaIdVenta(id);

        // Actualiza stock
        for (DetalleVenta detalle : detalles) {
            ListaProductos lp = detalle.getListaProducto();
            int stockActual = lp.getCantidad();
            int cantidadVenta = detalle.getCantidad();
            int nuevoStock = stockActual + cantidadVenta;
            lp.setCantidad(nuevoStock);
            listaProductosRepository.save(lp);
        }

        // Elimina detalles primero
        for (DetalleVenta detalle : detalles) {
            detalleVentaRepository.delete(detalle);
        }

        // Elimina la venta
        ventaRepository.delete(venta);

        System.out.println("VENTA ELIMINADA");
    }
    
    private VentaResponseDTO mapearVentaConDetalles(Venta venta) {
        VentaResponseDTO dto = ventaMapper.toResponseDTO(venta);
        
        List<DetalleVenta> detalles = detalleVentaRepository
                .findByVentaIdVenta(venta.getIdVenta());
        List<DetalleVentaResponseDTO> detallesDTO =
                detalleVentaMapper.toResponseDTOList(detalles);
        
        dto.setDetalles(detallesDTO);
        
        dto.setTotalProductos(detallesDTO.size());
        
        dto.setTotalUnidades(
                detallesDTO.stream()
                .map(d -> d.getCantidad() != null ? new java.math.BigDecimal(d.getCantidad()) : java.math.BigDecimal.ZERO )
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add)
                .intValue()
        );
        return dto;
    }
    
    
    private ListaProductos crearNuevoListaProducto( DetalleVentaRequestDTO dto) {
        if (dto.getIdProducto() == null || dto.getIdTalla() == null || dto.getIdColor() == null) {
            throw new IllegalArgumentException("Producto, talla y color no pueden ser nulos");
        } 
        Producto producto = productoRepository.findById(dto.getIdProducto())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Talla talla = tallaRepository.findById(dto.getIdTalla())
            .orElseThrow(() -> new RuntimeException("Talla no encontrada"));
        Color color = colorRepository.findById(dto.getIdColor())
            .orElseThrow(() -> new RuntimeException("Color no encontrado"));

        ListaProductos nuevo = new ListaProductos();
        nuevo.setProducto(producto);
        nuevo.setTalla(talla);
        nuevo.setColor(color);
        nuevo.setCantidad(0);
        nuevo.setPrecioUnitario(dto.getPrecioUnitario());
   
        
        return listaProductosRepository.save(nuevo); 
    }
    
    
}
