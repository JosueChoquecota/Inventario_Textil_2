/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Color;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.models.Producto;
import com.utp.integradorspringboot.models.Talla;
import com.utp.integradorspringboot.repositories.ColorRepository;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import com.utp.integradorspringboot.repositories.ProductoRepository;
import com.utp.integradorspringboot.repositories.TallaRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListaProductoService {

    private final ListaProductosRepository listaProductosRepository;
    private final ProductoRepository productoRepository;
    private final TallaRepository tallaRepository;
    private final ColorRepository colorRepository;

    @Autowired
    public ListaProductoService(ListaProductosRepository listaProductosRepository, ProductoRepository productoRepository, TallaRepository tallaRepository, ColorRepository colorRepository) {
        this.listaProductosRepository = listaProductosRepository;
        this.productoRepository = productoRepository;
        this.tallaRepository = tallaRepository;
        this.colorRepository = colorRepository;
    }

    @Transactional
    public ListaProductos buscarOCrearListaProducto(Integer idProducto, Integer idTalla, Integer idColor) {
        // Busca si ya existe la combinación
        Optional<ListaProductos> existente = listaProductosRepository
                .findByProductoIdProductoAndTallaIdTallaAndColorIdColor(idProducto, idTalla, idColor);

        if (existente.isPresent()) {
            return existente.get();
        } else {
            // Si no existe, la crea con stock 0
            Producto producto = productoRepository.findById(idProducto)
                    .orElseThrow(() -> new RuntimeException("Producto base no encontrado: " + idProducto));
            Talla talla = (idTalla != null) ? tallaRepository.findById(idTalla)
                    .orElseThrow(() -> new RuntimeException("Talla no encontrada: " + idTalla)) : null;
            Color color = (idColor != null) ? colorRepository.findById(idColor)
                    .orElseThrow(() -> new RuntimeException("Color no encontrado: " + idColor)) : null;

            ListaProductos nuevaLista = new ListaProductos();
            nuevaLista.setProducto(producto);
            nuevaLista.setTalla(talla);
            nuevaLista.setColor(color);
            nuevaLista.setCantidad(0); // Stock inicial es 0
            nuevaLista.setPrecioUnitario(BigDecimal.ZERO); // Precio de venta inicial (o podrías obtenerlo del producto base)
            
            return listaProductosRepository.save(nuevaLista);
        }
    }

    /**
     * Actualiza el stock de una variación de producto.
     * @param idListaProducto El ID de la variación a actualizar.
     * @param cantidadCambio La cantidad a sumar (positivo para compras) o restar (negativo para ventas).
     * @return La entidad ListaProductos actualizada.
     * @throws RuntimeException Si la variación no existe o si el stock resultante es negativo.
     */
    @Transactional
    public ListaProductos actualizarStock(Integer idListaProducto, int cantidadCambio) {
        ListaProductos listaProducto = listaProductosRepository.findById(idListaProducto)
                .orElseThrow(() -> new RuntimeException("Variación de producto (lista_producto) no encontrada: " + idListaProducto));

        int nuevaCantidad = listaProducto.getCantidad()+ cantidadCambio;
        if (nuevaCantidad < 0) {
            throw new RuntimeException("Stock insuficiente para el producto ID: " + listaProducto.getProducto().getIdProducto());
        }
        listaProducto.setCantidad(nuevaCantidad);
        return listaProductosRepository.save(listaProducto);
    }

    /**
     * Busca una variación específica por su ID.
     */
    @Transactional
    public ListaProductos buscarListaProductoPorId(Integer id) {
         return listaProductosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variación de producto (lista_producto) no encontrada: " + id));
    }

    /**
     * Lista todas las variaciones de un producto específico.
     */
    @Transactional
    public List<ListaProductos> listarVariacionesPorProducto(Integer idProducto) {
        return listaProductosRepository.findByProductoIdProducto(idProducto);
    }
     /**
     * Lista todas las variaciones en inventario.
     */
    @Transactional
    public List<ListaProductos> listarTodoInventario() {
        return listaProductosRepository.findAll();
    }
}
