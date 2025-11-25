
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.dtos.CompraRequestDTO;
import com.utp.integradorspringboot.dtos.CompraResponseDTO;
import com.utp.integradorspringboot.dtos.DetalleCompraRequestDTO;
import com.utp.integradorspringboot.dtos.DetalleCompraResponseDTO;
import com.utp.integradorspringboot.mappers.CompraMapper;
import com.utp.integradorspringboot.mappers.DetalleCompraMapper;
import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.models.Compra;
import com.utp.integradorspringboot.models.DetalleCompra;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.models.Proveedor;
import com.utp.integradorspringboot.models.Talla;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.repositories.ColorRepository;
import com.utp.integradorspringboot.repositories.CompraRepository;
import com.utp.integradorspringboot.repositories.DetalleCompraRepository;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import com.utp.integradorspringboot.repositories.ProductoRepository;
import com.utp.integradorspringboot.repositories.ProveedorRepository;
import com.utp.integradorspringboot.repositories.TallaRepository;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompraService {

    @Autowired private CompraRepository compraRepository;
    @Autowired private DetalleCompraRepository detalleCompraRepository;
    @Autowired private ProveedorRepository proveedorRepository;
    @Autowired private TrabajadorRepository trabajadorRepository;
    @Autowired private ListaProductosRepository listaProductosRepository;
    @Autowired private ProductoRepository productoRepository;
    @Autowired private TallaRepository tallaRepository;
    @Autowired private ColorRepository colorRepository;
    @Autowired private CompraMapper compraMapper;
    @Autowired private DetalleCompraMapper detalleCompraMapper;

    // ========================================
    // LISTAR COMPRAS
    // ========================================
    @Transactional
    public List<CompraResponseDTO> listarCompras() {
        System.out.println("📋 [SERVICE] Listando compras...");
        return compraRepository.findAll().stream()
            .map(this::mapearCompraConDetalles)
            .collect(Collectors.toList());
    }

    // ========================================
    // OBTENER COMPRA POR ID
    // ========================================
    @Transactional
    public CompraResponseDTO obtenerCompraPorId(Integer id) {
        System.out.println("🔍 [SERVICE] Buscando compra ID: " + id);
        Compra compra = compraRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Compra no encontrada"));
        return mapearCompraConDetalles(compra);
    }

    // ========================================
    // REGISTRAR COMPRA
    // ========================================
    @Transactional
    public CompraResponseDTO registrarCompra(CompraRequestDTO dto) {

        // Validar proveedor
        Proveedor proveedor = proveedorRepository.findById(dto.getIdProveedor())
            .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
        
        // Validar trabajador
        Trabajador trabajador = trabajadorRepository.findById(dto.getIdTrabajador())
            .orElseThrow(() -> new RuntimeException("Trabajador no encontrado"));
        
        // Crear compra
        Compra compra = new Compra();
        compra.setProveedor(proveedor);
        compra.setTrabajador(trabajador);
        compra.setFecha(LocalDate.parse(dto.getFecha())); // ✅ String → LocalDate
        compra.setPrecioTotal(dto.getPrecioTotal());
        
        Compra compraSaved = compraRepository.save(compra);
        
        // Procesar detalles
        for (DetalleCompraRequestDTO detalleReq : dto.getDetalles()) {
            
            // ✅ BUSCAR O CREAR ListaProducto
            ListaProductos listaProducto = listaProductosRepository
                .findByProductoAndTallaAndColor(
                    detalleReq.getIdProducto(),
                    detalleReq.getIdTalla(),
                    detalleReq.getIdColor()
                )
                .orElseGet(() -> {
                    return crearNuevoListaProducto(detalleReq, proveedor);
                });
            
            // Crear detalle de compra
            DetalleCompra detalle = new DetalleCompra();
            detalle.setCompra(compraSaved);
            detalle.setListaProducto(listaProducto);
            detalle.setPrecioUnitario(detalleReq.getPrecioUnitario());
            detalle.setCantidad(detalleReq.getCantidad()); // ✅ Campo "cantidad" en tu DB
            detalle.setSubTotal(detalleReq.getSubTotal());
            
            detalleCompraRepository.save(detalle);
            
            // ✅ ACTUALIZAR STOCK
            int stockAnterior = listaProducto.getCantidad();
            int nuevoStock = stockAnterior + detalleReq.getCantidad();
            listaProducto.setCantidad(nuevoStock);
            listaProductosRepository.save(listaProducto);
            
        }
        return mapearCompraConDetalles(compraSaved);
    }

    // ========================================
    // ELIMINAR COMPRA
    // ========================================
    @Transactional
    public void eliminarCompra(Integer id) {
        System.out.println("🗑️ [SERVICE] Eliminando compra ID: " + id);
        
        Compra compra = compraRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Compra no encontrada"));
        
        // Revertir stock
        List<DetalleCompra> detalles = detalleCompraRepository.findByCompraIdCompra(id);
        System.out.println("   📦 Detalles a revertir: " + detalles.size());
        
        for (DetalleCompra detalle : detalles) {
            ListaProductos lp = detalle.getListaProducto();
            int stockActual = lp.getCantidad();
            int cantidadComprada = detalle.getCantidad();
            int nuevoStock = stockActual - cantidadComprada;
            
            System.out.println("   📊 " + lp.getProducto().getNombre() + 
                             ": " + stockActual + " - " + cantidadComprada + " = " + nuevoStock);
            
            if (nuevoStock < 0) {
                throw new RuntimeException(
                    "No se puede eliminar. Stock quedaría negativo para: " + 
                    lp.getProducto().getNombre()
                );
            }
            
            lp.setCantidad(nuevoStock);
            listaProductosRepository.save(lp);
        }
        
        detalleCompraRepository.deleteByCompraIdCompra(id);
        compraRepository.deleteById(id);
        System.out.println("✅ [SERVICE] Compra eliminada");
    }

    // ========================================
    // MÉTODOS HELPER
    // ========================================
    private CompraResponseDTO mapearCompraConDetalles(Compra compra) {
        // 1. Mapear compra básica con MapStruct
        CompraResponseDTO dto = compraMapper.toResponseDTO(compra);

        // 2. Obtener y mapear detalles
        List<DetalleCompra> detalles = detalleCompraRepository
            .findByCompraIdCompra(compra.getIdCompra());
        List<DetalleCompraResponseDTO> detallesDTO = 
            detalleCompraMapper.toResponseDTOList(detalles);

        dto.setDetalles(detallesDTO);

        // 3. Calcular totales
        dto.setTotalProductos(detallesDTO.size());

        // ✅ CAMBIADO: Usar .intValue() para evitar errores con primitivos
        dto.setTotalUnidades(
            detallesDTO.stream()
                .map(d -> d.getCantidad() != null ? new java.math.BigDecimal(d.getCantidad()) : java.math.BigDecimal.ZERO)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add)
                .intValue() // Si el DTO espera un Integer, conviértelo aquí
        );

        return dto;
    }

    private ListaProductos crearNuevoListaProducto(DetalleCompraRequestDTO dto, Proveedor proveedor) {
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
        nuevo.setProveedor(proveedor);

        return listaProductosRepository.save(nuevo);
    }
}